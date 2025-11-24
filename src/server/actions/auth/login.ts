"use server";

import type * as z from "zod";
import { LoginSchema } from "@/schemas/schema";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { auth } from "@/auth";
import { headers } from "next/headers";

/**
 * Authentication server action for credential user login with email and password.
 * Uses Better Auth's standard authentication flow which handles:
 * - Email verification checks
 * - Password verification
 * - Two-factor authentication (2FA) via the twoFactor plugin
 *
 * Returns success/error messages or a 2FA flag if 2FA is required.
 * Will redirect to callback URL after successful login.
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

  const { email, password } = validatedFields.data;

  try {
    // Use Better Auth's signInEmail API
    // Better Auth handles:
    // - Email verification checks
    // - Password verification
    // - 2FA flow (returns twoFactorRedirect if 2FA is enabled)
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: callbackUrl || DEFAULT_LOGIN_REDIRECT,
      },
      headers: headers(),
    });

    // Check if Better Auth's 2FA plugin requires 2FA verification
    if ("twoFactorRedirect" in result && result.twoFactorRedirect) {
      return { twoFactor: true };
    }

    // Sign-in successful
    return {
      success: true,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    };
  } catch (error) {
    // Better Auth handles all error cases:
    // - Invalid credentials
    // - Email not verified (if requireEmailVerification is enabled)
    // - Other authentication errors
    if (error instanceof Error) {
      // Provide user-friendly error messages
      if (error.message.includes("email") && error.message.includes("verify")) {
        return { error: "Please verify your email before signing in." };
      }
      if (
        error.message.includes("password") ||
        error.message.includes("credentials") ||
        error.message.includes("invalid")
      ) {
        return { error: "Invalid credentials!" };
      }
      return { error: error.message };
    }
    return { error: "Something went wrong!" };
  }
};
