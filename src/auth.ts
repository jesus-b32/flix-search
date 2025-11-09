// Better Auth imports
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { twoFactor } from "better-auth/plugins";
import { emailOTP } from "better-auth/plugins";
import { createAuthMiddleware } from "better-auth/api";

// Database imports
import { db } from "@/server/db";
import { users, accounts, sessions } from "@/server/db/schema";

// Data functions
import { updateUserEmailVerified } from "@/data/user";
import { createVideoList } from "@/data/videoList";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendTwoFactorEmail,
} from "@/lib/sendEmail";

// Other imports
import { env } from "@/env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true, // Our tables use plural form (users, accounts, sessions)
    schema: {
      user: users,
      account: accounts,
      session: sessions,
    },
  }),
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendPasswordResetEmail({ user, url, token });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendVerificationEmail({ user, url, token });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
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
    after: createAuthMiddleware(async (ctx) => {
      // Handle post-sign-in actions (equivalent to NextAuth events.linkAccount)
      if (
        ctx.path === "/sign-in/social" ||
        ctx.path === "/sign-up/social" ||
        ctx.path === "/callback/github" ||
        ctx.path === "/callback/google"
      ) {
        try {
          const newSession = ctx.context.newSession;
          if (newSession?.user?.id && newSession?.user?.email) {
            await updateUserEmailVerified(
              newSession.user.id,
              newSession.user.email,
            );
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

// Export types for use in other files
export type Session = Awaited<ReturnType<typeof auth.api.getSession>>;

// Extended user type for Better Auth (matches your existing ExtendedUser interface)
export type ExtendedUser = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  emailVerified: Date | null;
};
