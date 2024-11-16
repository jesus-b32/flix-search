import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server/db";
import { users, accounts, sessions } from "@/server/db/schema";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

const authConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
  }),
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
};

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
