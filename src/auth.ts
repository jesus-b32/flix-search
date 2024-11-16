import NextAuth, { type DefaultSession } from "next-auth";
import bcrypt from "bcryptjs";
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server/db";
import { users, accounts, sessions } from "@/server/db/schema";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { v4 as uuid } from "uuid";
import type { NextAuthConfig } from "next-auth";
import { encode as defaultEncode } from "next-auth/jwt";

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
    user: DefaultSession["user"];
  }
}

const authConfig: NextAuthConfig = {
  adapter,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        //validate credentials from login page
        const validatedFields = LoginSchema.safeParse(credentials);

        //if credentials are valid
        if (validatedFields.success) {
          console.log("validation success!");
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);

          //if user does not exist or user does not have a password, do not authorize
          //user can not have password if they logged in using google or github
          if (!user?.password || !user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            console.log("user: ", user);
            return user;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    /**
     * This is a custom `jwt` function that adds a `credentials` key to the `token` object when the user logs in with the credentials provider.
     * @param params - The parameters passed to the `jwt` function
     * @returns The updated token object
     */
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      console.log("token after adding credentials: ", { token });
      return token;
    },
    /**
     * This is a custom `session` function that adds the user's data to the session.
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
      console.log("params: ", params);
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
