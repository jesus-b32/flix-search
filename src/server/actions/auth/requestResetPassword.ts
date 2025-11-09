"use server";

import { ResetPasswordSchema } from "@/schemas/schema";
import type * as z from "zod";
import { auth } from "@/auth";
import { env } from "@/env";

/**
 * Validates the form values from a password reset request.
 * Uses Better Auth's requestPasswordReset API to send a password reset email.
 * Better Auth handles token generation and calls the sendResetPassword function configured in auth.ts.
 * Returns a success or error message.
 */
export const requestResetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid email!",
    };
  }

  const { email } = validatedFields.data;

  try {
    // Use Better Auth's requestPasswordReset API
    // Better Auth will check if the user exists, generate a token, and call sendResetPassword
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: `${env.BETTER_AUTH_URL}/auth/reset-password`,
      },
    });

    // Always return success to prevent email enumeration
    // Better Auth handles the case where the email doesn't exist silently
    return { success: "Reset email sent!" };
  } catch (error) {
    // Better Auth may throw errors, but we still return success to prevent email enumeration
    // In production, you might want to log the error for debugging
    console.error("Error requesting password reset:", error);
    return { success: "Reset email sent!" };
  }
};
