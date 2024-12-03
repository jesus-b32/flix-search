//Next-auth imports
import NextAuth from "next-auth";
import type { NextAuthConfig, DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { encode as defaultEncode } from "next-auth/jwt";

//database imports
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server/db";
import { users, accounts, sessions } from "@/server/db/schema";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { updateUserEmailVerified } from "@/data/user";
import { createVideoList } from "@/data/videoList";

//other imports
import { env } from "@/env";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";

const adapter = DrizzleAdapter(db, {
  usersTable: users,
  accountsTable: accounts,
  sessionsTable: sessions,
});

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    // default User session has property of: id, name, email, image
    // https://next-auth.js.org/getting-started/typescript
    user: DefaultSession["user"];
  }
}

const authConfig: NextAuthConfig = {
  adapter,
  // needed for localhost build
  trustHost: env.AUTH_TRUST_HOST === "true" ? true : false,
  providers: [
    // Can see callback url using http://localhost:3000/api/auth/providers or [domain]/api/auth/providers
    GitHub({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      /**
       * Checks if the user is authorized to log in.
       * If the user's credentials are valid, it will return the user object.
       * If the credentials are invalid, it will return null.
       * The user object must have a password or it will not be authorized.
       * @param credentials - The credentials of the user (email and password).
       * @returns The user object if the credentials are valid, null if not.
       */
      authorize: async (credentials) => {
        //validate credentials from login page
        const validatedFields = LoginSchema.safeParse(credentials);

        //if credentials are valid
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);

          //if user does not exist or user does not have a password, do not authorize
          //user can not have password if they logged in using google or github
          if (!user?.password || !user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  /**
   * Events are asynchronous functions that do not return a response, they are useful for audit logs / reporting or handling any other side-effects.
   * https://next-auth.js.org/configuration/events
   */
  events: {
    /**
     * Event handler that is triggered when an account is linked to a user.
     * This function updates the user's email verification status in the database.
     * Used to update the user's email verification status when new user logs in with a social media provider.
     * Also creates a watchlist for new users
     *
     * @param user - The user object containing the user's details.
     */
    async linkAccount({ user }) {
      if (!user.id) return;
      await updateUserEmailVerified(user.id);
      await createVideoList(user.id, "watchlist");
    },
  },
  /**
   * Callbacks are asynchronous functions you can use to control what happens when an action is performed.
   * Callbacks are extremely powerful, especially in scenarios involving JSON Web Tokens as they allow you to implement access controls without a database and to integrate with external databases or APIs.
   * https://next-auth.js.org/configuration/callbacks
   */
  callbacks: {
    /**
     * Called whenever a user signs in.
     * Verifies that the user exists in the database and has a verified email.
     * If the user does not exist or email is not verified, returns false to prevent signin.
     * @param user - The user object containing the user's details.
     * @returns boolean indicating whether signin was successful.
     */
    async signIn({ user }) {
      //check if user exists
      if (!user.id) return false;
      // const existingUser = await getUserById(user.id);
      // if (!existingUser?.emailVerified || !existingUser) return false;
      return true;
    },

    /**
     * This is a custom `jwt` function that adds a `credentials` key to the `token` object when the user logs in with the credentials provider.
     * @param params - The parameters passed to the `jwt` function
     * @returns The updated token object
     */
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },

    /**
     * This is a custom `session` function that adds the desired user's data to the session.
     * @param session - The session object
     * @param user - The user object
     * @returns The updated session object
     */
    session({ session, user }) {
      return {
        ...session,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
      };
    },
  },

  /**
   * JSON Web Tokens can be used for session tokens if enabled with session: { strategy: "jwt" } option.
   * JSON Web Tokens are enabled by default if you have not specified an adapter.
   * JSON Web Tokens are encrypted (JWE) by default. We recommend you keep this behaviour.
   * https://next-auth.js.org/configuration/options#jwt
   */
  jwt: {
    /**
     * This is a custom `encode` function that replaces the default `encode`
     * function from NextAuth.js.
     * If the `token` object has a `credentials` key, it will create a new session
     * in the database and return the session token. If the `token` object doesn't
     * have a `credentials` key, it will call the default `encode` function.
     * @param params - The parameters passed to the `encode` function
     * @returns The JWT token
     */
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
