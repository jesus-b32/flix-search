// Better Auth imports
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { twoFactor } from "better-auth/plugins";
import { emailOTP } from "better-auth/plugins";
import { createAuthMiddleware } from "better-auth/api";

// Database imports
import { db } from "@/server/db";
import {
  users,
  accounts,
  sessions,
  verificationTokens,
} from "@/server/db/schema";
import { eq, and, sql } from "drizzle-orm";

// Data functions
import { createVideoList } from "@/data/videoList";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendTwoFactorEmail,
} from "@/lib/sendEmail";

// Password hashing
import { scrypt } from "node:crypto";
import { promisify } from "node:util";
import bcrypt from "bcryptjs";

// Other imports
import { env } from "@/env";

// Promisify scrypt for async/await usage
const scryptAsync = promisify(scrypt);

/**
 * Verify password - supports both scrypt (Better Auth default) and bcrypt (legacy NextAuth)
 *
 * Migration Strategy:
 * - Better Auth uses scrypt by default for hashing (no custom hash function needed)
 * - Legacy bcrypt passwords are copied from users table to accounts table (as-is, no decryption)
 * - This function verifies both formats seamlessly
 * - When users change/reset their password, Better Auth will hash it with scrypt (default behavior)
 * - This allows gradual migration without forcing password resets
 *
 * Better Auth passes an object with { hash, password }
 */
async function verifyPassword({
  hash: hashedPassword,
  password,
}: {
  hash: string;
  password: string;
}): Promise<boolean> {
  // First, try scrypt (Better Auth's default format: "hash.salt")
  // This is the format for new passwords created by Better Auth
  if (hashedPassword.includes(".")) {
    const [hash, salt] = hashedPassword.split(".");
    if (hash && salt) {
      try {
        const buf = (await scryptAsync(password, salt, 64)) as Buffer;
        return buf.toString("hex") === hash;
      } catch {
        // If scrypt fails, continue to bcrypt check
      }
    }
  }

  // If scrypt fails or format doesn't match, try bcrypt (legacy NextAuth)
  // Bcrypt format: "$2a$10$..." or "$2b$10$..." or "$2y$10$..."
  // This supports legacy passwords that were migrated from users table
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch {
    return false;
  }
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true, // Our tables use plural form (users, accounts, sessions)
    schema: {
      user: users,
      account: accounts,
      session: sessions,
      verification: verificationTokens,
    },
  }),
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendPasswordResetEmail({ user, url, token });
    },
    password: {
      // No custom hash function needed - Better Auth uses scrypt by default
      // We only need custom verify to support legacy bcrypt passwords
      verify: verifyPassword,
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendVerificationEmail({ user, url, token });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async afterEmailVerification(user, request) {
      // Create watchlist after email verification (for email/password sign-up)
      try {
        await createVideoList(user.id, "watchlist");
      } catch (error) {
        // Handle error silently or log it
        console.error(
          "Error creating watchlist after email verification:",
          error,
        );
      }
    },
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // 1 day
    // Map your existing fields to Better Auth's fields (according to migration guide)
    fields: {
      expiresAt: "expires",
      token: "sessionToken",
    },
  },
  user: {
    changeEmail: {
      enabled: true,
      // By default, Better Auth sends verification email to the new email address
      // The email is only updated after the user verifies the new email
    },
    deleteUser: {
      enabled: true,
      // Better Auth handles user deletion with authentication requirements:
      // - Password verification (if user has password)
      // - Fresh session check (if password not provided)
      // - Email verification (for OAuth users, if configured)
    },
  },
  account: {
    // Map your existing fields to Better Auth's fields (according to migration guide)
    fields: {
      providerId: "provider",
      accountId: "providerAccountId",
      refreshToken: "refresh_token",
      accessToken: "access_token",
      accessTokenExpiresAt: "expires_at",
      idToken: "id_token",
    },
  },
  verification: {
    fields: {
      identifier: "email", //?????email?
      value: "token",
      expiresAt: "expires",
    },
  },
  plugins: [
    twoFactor({
      otpOptions: {
        async sendOTP({ user, otp }) {
          if (user.email) {
            await sendTwoFactorEmail(user.email, otp);
          }
        },
      },
    }),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          // For email verification, we'll use the existing token-based system
          // Better Auth will handle the OTP flow, but we can also integrate with existing system
        } else if (type === "forget-password") {
          // Password reset with OTP
          // The OTP will be sent via this function
        }
        // For sign-in OTP, it's handled by 2FA plugin
      },
    }),
  ],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      // Before sign-in, ensure password exists in accounts table for Better Auth
      // This handles the migration from NextAuth (users table) to Better Auth (accounts table)
      // Passwords are copied as-is (bcrypt hashes cannot be decrypted)
      // The verifyPassword function handles both bcrypt and scrypt formats
      if (ctx.path === "/sign-in/email") {
        try {
          const body = ctx.body as { email?: string } | undefined;
          const email = body?.email;

          if (email && typeof email === "string") {
            await ensurePasswordInAccountTable(email);
          }
        } catch (error) {
          // Silently handle errors - migration is not critical for sign-in
          // If migration fails, user can still sign in if password already exists in accounts table
          console.error("Error in before hook (password migration):", error);
        }
      }
    }),
    after: createAuthMiddleware(async (ctx) => {
      // Handle post-sign-in actions for social providers
      const newSession = ctx.context.newSession;

      if (newSession?.user?.id) {
        try {
          // Handle social sign-up/sign-in - create watchlist
          // Note: Better Auth automatically handles email verification status for OAuth providers
          // It reads the verification status from the SSO provider (GitHub, Google, etc.)
          if (
            ctx.path === "/sign-in/social" ||
            ctx.path === "/sign-up/social" ||
            ctx.path === "/callback/github" ||
            ctx.path === "/callback/google"
          ) {
            await createVideoList(newSession.user.id, "watchlist");
          }
        } catch (error) {
          // Handle error silently or log it
          console.error("Error in after hook:", error);
        }
      }
    }),
  },
});

/**
 * Ensure password exists in accounts table for Better Auth
 *
 * Migration Strategy:
 * 1. Check if password already exists in accounts table (already migrated)
 * 2. If not, check if password exists in users table (legacy NextAuth)
 * 3. If found, copy bcrypt hash to accounts table (as-is, no decryption possible)
 * 4. The verifyPassword function will handle verification of both formats
 *
 * Note: This is a runtime migration that happens on-demand during sign-in.
 * After the full database migration, passwords will already be in accounts table
 * and this function will return early (no work needed).
 *
 * Password Format Migration:
 * - Legacy passwords: bcrypt format ($2a$10$...) in accounts table
 * - New passwords: scrypt format (hash.salt) via hashPassword()
 * - Migration to scrypt happens automatically when user changes/resets password
 */
async function ensurePasswordInAccountTable(email: string) {
  try {
    // Find user by email
    const user = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase()),
    });

    if (!user) {
      return;
    }

    // Check if account with credential provider exists (Better Auth format)
    const credentialAccount = await db.query.accounts.findFirst({
      where: and(
        eq(accounts.userId, user.id),
        eq(accounts.provider, "credential"),
        eq(accounts.providerAccountId, email.toLowerCase()),
      ),
    });

    // If credential account exists and has password, migration already done
    // This will be the case after full database migration
    if (credentialAccount?.password) {
      return;
    }

    // Check if user has password in users table (legacy NextAuth format)
    // Note: The schema doesn't include password column, but the database might still have it
    // This is a temporary state during migration period
    // After full database migration, this column will be removed
    const userResult = await db.execute(
      sql`SELECT password FROM flix_search_users WHERE id = ${user.id}`,
    );

    const userPassword = (userResult.rows[0] as { password?: string })
      ?.password;

    if (!userPassword) {
      // No password to migrate (user might be OAuth-only)
      return;
    }

    // Check if password is bcrypt format (starts with $2a$, $2b$, or $2y$)
    const isBcrypt = /^\$2[ayb]\$/.test(userPassword);

    if (!isBcrypt) {
      // Password is already in a different format (shouldn't happen, but handle gracefully)
      return;
    }

    // Copy bcrypt password from users table to accounts table
    // We cannot decrypt bcrypt hashes, so we copy as-is
    // The verifyPassword function will handle both bcrypt and scrypt formats
    if (credentialAccount) {
      // Update existing account entry (shouldn't happen, but handle it)
      await db
        .update(accounts)
        .set({ password: userPassword })
        .where(
          and(
            eq(accounts.userId, user.id),
            eq(accounts.provider, "credential"),
            eq(accounts.providerAccountId, email.toLowerCase()),
          ),
        );
    } else {
      // Create new account entry with bcrypt password
      await db.insert(accounts).values({
        userId: user.id,
        provider: "credential",
        providerAccountId: email.toLowerCase(),
        password: userPassword, // Bcrypt hash copied as-is
      });
    }
  } catch (error) {
    // Silently handle errors - migration is not critical
    // If this fails, user can still sign in if password already exists in accounts table
    // After full database migration, this function will rarely be needed
    console.error("Error ensuring password in account table:", error);
  }
}

// Export types for use in other files
export type Session = Awaited<ReturnType<typeof auth.api.getSession>>;

// Extended user type for Better Auth (matches your existing ExtendedUser interface)
export type ExtendedUser = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  twoFactorEnabled: boolean;
};
