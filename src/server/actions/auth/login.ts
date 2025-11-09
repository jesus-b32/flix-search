"use server";

import type * as z from "zod";
import { LoginSchema } from "@/schemas/schema";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateTwoFactorToken } from "@/lib/generateToken";
import { getUserByEmail } from "@/data/user";
import { sendTwoFactorEmail } from "@/lib/sendEmail";
import {
  getTwoFactorTokenByEmail,
  deleteTwoFactorToken,
} from "@/data/twoFactorToken";
import {
  getTwoFactorConfirmationByUserId,
  deleteTwoFactorConfirmation,
  createTwoFactorConfirmation,
} from "@/data/twoFactorConfirmation";
import { auth } from "@/auth";
import { headers } from "next/headers";

/**
 * Authentication server action for credential user login with email, password, and optional 2FA code. Returns a success/error messages or a 2FA flag. Will redirect to callback URL after successful login.
 *
 * This file implements a server-side login action that:
 * 1. Validates user credentials against the database
 * 2. Handles email verification flow for unverified accounts
 * 3. Supports two-factor authentication (2FA) when enabled
 * 4. Manages authentication tokens and confirmations
 */
export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  // Handle error cases from getUserByEmail
  if (existingUser instanceof Error) {
    return { error: existingUser.message };
  }

  if (!existingUser?.email) {
    return { error: "Email does not exist!" };
  }

  // Handle custom 2FA flow if enabled
  // Check 2FA BEFORE verifying password to avoid signing in prematurely
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (!code) {
      // 2FA enabled but no code provided, send 2FA code
      // But first, we should verify password is correct before sending 2FA code
      // However, Better Auth's signInEmail will sign the user in if password is correct
      // So we'll verify password first, and if correct, send 2FA code
      // If password is wrong, Better Auth will throw an error
      try {
        // Try to sign in to verify password
        // If password is wrong, this will throw an error
        await auth.api.signInEmail({
          body: {
            email,
            password,
            callbackURL: callbackUrl || DEFAULT_LOGIN_REDIRECT,
          },
          headers: headers(),
        });

        // Password is valid, but user needs 2FA
        // Sign out the user since we haven't verified 2FA yet
        await auth.api.signOut({ headers: headers() });

        // Generate and send 2FA token
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);

        // Handle error case from generateTwoFactorToken
        if (twoFactorToken instanceof Error) {
          return { error: twoFactorToken.message };
        }

        if (!twoFactorToken?.[0]?.token || !twoFactorToken?.[0]?.email) {
          return { error: "Error generating 2FA token!" };
        }

        await sendTwoFactorEmail(
          twoFactorToken[0].email,
          twoFactorToken[0].token,
        );

        return { twoFactor: true };
      } catch (error) {
        // Password is invalid
        if (error instanceof Error) {
          if (
            error.message.includes("email") &&
            error.message.includes("verify")
          ) {
            return { error: "Please verify your email before signing in." };
          }
          return { error: "Invalid credentials!" };
        }
        return { error: "Something went wrong!" };
      }
    } else {
      // 2FA code provided, verify it first
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      // Handle error case from getTwoFactorTokenByEmail
      if (twoFactorToken instanceof Error) {
        return { error: twoFactorToken.message };
      }

      if (!twoFactorToken) {
        return { error: "Invalid code!" };
      }

      //check if token generated matches code user entered
      if (twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        return { error: "Code expired!" };
      }

      const deleteResult = await deleteTwoFactorToken(twoFactorToken.id);
      // Handle error case from deleteTwoFactorToken
      if (deleteResult instanceof Error) {
        return { error: deleteResult.message };
      }

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      );

      // Handle error case from getTwoFactorConfirmationByUserId
      if (existingConfirmation instanceof Error) {
        return { error: existingConfirmation.message };
      }

      if (existingConfirmation) {
        const deleteConfirmationResult = await deleteTwoFactorConfirmation(
          existingConfirmation.id,
        );
        // Handle error case from deleteTwoFactorConfirmation
        if (deleteConfirmationResult instanceof Error) {
          return { error: deleteConfirmationResult.message };
        }
      }

      const createConfirmationResult = await createTwoFactorConfirmation(
        existingUser.id,
      );
      // Handle error case from createTwoFactorConfirmation
      if (createConfirmationResult instanceof Error) {
        return { error: createConfirmationResult.message };
      }

      // 2FA verified, now sign in with Better Auth
      // Better Auth will verify password from account table
      try {
        await auth.api.signInEmail({
          body: {
            email,
            password,
            callbackURL: callbackUrl || DEFAULT_LOGIN_REDIRECT,
          },
          headers: headers(),
        });

        return {
          success: true,
          redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        };
      } catch (error) {
        // Password might be invalid (shouldn't happen if flow is correct)
        if (error instanceof Error) {
          return { error: "Invalid credentials!" };
        }
        return { error: "Failed to sign in after 2FA verification." };
      }
    }
  }

  // No 2FA enabled, sign in directly with Better Auth
  // Better Auth will verify password from account table automatically
  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: callbackUrl || DEFAULT_LOGIN_REDIRECT,
      },
      headers: headers(),
    });

    // Check if Better Auth's 2FA plugin requires 2FA
    if ("twoFactorRedirect" in result && result.twoFactorRedirect) {
      return { twoFactor: true };
    }

    // Sign-in successful
    return {
      success: true,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    };
  } catch (error) {
    // Better Auth will throw an error if password is invalid
    if (error instanceof Error) {
      // Check for email verification error (shouldn't happen since we checked above)
      if (error.message.includes("email") && error.message.includes("verify")) {
        return { error: "Please verify your email before signing in." };
      }
      return { error: "Invalid credentials!" };
    }
    return { error: "Something went wrong!" };
  }
};
