"use server";

import type * as z from "zod";
import { NewPasswordFromEmailSchema } from "@/schemas/schema";
import { auth } from "@/auth";

/**
 * Validates the form values and resets the password using Better Auth's resetPassword API.
 * Better Auth handles token validation, expiration checking, and password hashing.
 * @param values - The form values containing the new password
 * @param token - The password reset token from the URL
 * @returns - A success or error message
 */
export const resetPassword = async (
  values: z.infer<typeof NewPasswordFromEmailSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validatedFields = NewPasswordFromEmailSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedFields.data;

  try {
    // Use Better Auth's resetPassword API
    // Better Auth handles token validation, expiration, and password hashing
    await auth.api.resetPassword({
      body: {
        newPassword: password,
        token,
      },
    });

    return { success: "Password updated!" };
  } catch (error) {
    // Better Auth will throw an error if the token is invalid or expired
    if (error instanceof Error) {
      // Check for common error messages
      if (
        error.message.includes("token") ||
        error.message.includes("invalid") ||
        error.message.includes("expired")
      ) {
        return {
          error:
            "Invalid or expired token. Please request a new password reset.",
        };
      }
      return { error: error.message };
    }
    return { error: "Failed to reset password. Please try again." };
  }
};
