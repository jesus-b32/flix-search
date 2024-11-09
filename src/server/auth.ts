//database imports
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server/db";

// NextAuth imports
import NextAuth, { type User } from "next-auth";
import type { NextAuthConfig } from "next-auth";
import { encode as defaultEncode } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { v4 as uuid } from "uuid";
import { env } from "@/env";

const adapter = DrizzleAdapter(db);

const authConfig: NextAuthConfig = {
  adapter,
  providers: [
    Credentials({
      // name: "Credentials",
      credentials: {
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        // logic to verify if the user exists
        const result = await getUserFromDb(email, password);

        if (!result.success) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        }

        // return user object with their profile data
        return result.data as User;
      },
    }),
  ],
  callbacks: {
    /**
     * Custom `jwt` function that adds a `credentials` key to the `token` object
     * when the user logs in with the credentials provider.
     *
     * @param {Object} params - The parameters passed to the `jwt` function
     *
     * @returns {Promise<Object>} The updated token object
     */
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  jwt: {
    /**
     * This is a custom `encode` function that replaces the default `encode`
     * function from NextAuth.js.
     *
     * If the `token` object has a `credentials` key, it will create a new session
     * in the database and return the session token. If the `token` object doesn't
     * have a `credentials` key, it will call the default `encode` function.
     *
     * @param {Object} params - The parameters passed to the `encode` function
     *
     * @returns {Promise<string>} The JWT token
     */
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        // if (!sessionToken) {
        //   throw new Error("Failed to generate session token");
        // }

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
  // secret: process.env.AUTH_SECRET!,
  secret: env.AUTH_SECRET,
  // experimental: { enableWebAuthn: true },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
