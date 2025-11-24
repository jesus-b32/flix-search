"use server";

import type * as z from "zod";
import { NewPasswordSchema } from "@/schemas/schema";
import { auth } from "@/auth";
import { headers } from "next/headers";

/**
 * Validates the update password form values and updates the user's password using Better Auth's changePassword API.
 * Better Auth handles password verification (supports both bcrypt and scrypt) and hashing (scrypt) automatically.
 *
 * @param values - the form values of an update password form
 * @param userId - the user id (not used by Better Auth, but kept for backward compatibility)
 * @returns an object with a success message or an error message
 */
export const updatePassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  userId: string,
) => {
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { currentPassword, newPassword, confirmNewPassword } =
    validatedFields.data;

  // Validate that new password and confirm password match
  if (newPassword !== confirmNewPassword) {
    return {
      error: "New passwords do not match!",
    };
  }

  try {
    // Use Better Auth's changePassword API
    // Better Auth handles:
    // - Current password verification (using our custom verifyPassword that supports both bcrypt and scrypt)
    // - New password hashing with scrypt (Better Auth's default)
    // - Updating password in accounts table
    await auth.api.changePassword({
      body: {
        currentPassword,
        newPassword,
        revokeOtherSessions: false, // Keep other sessions active
      },
      headers: headers(),
    });

    return {
      success: "Password updated successfully!",
    };
  } catch (error) {
    // Better Auth will throw an error if current password is invalid or other validation fails
    if (error instanceof Error) {
      // Check for common error messages
      if (
        error.message.includes("password") &&
        (error.message.includes("invalid") ||
          error.message.includes("incorrect") ||
          error.message.includes("wrong"))
      ) {
        return { error: "Invalid current password!" };
      }
      if (
        error.message.includes("password") &&
        error.message.includes("length")
      ) {
        return { error: "Password does not meet requirements." };
      }
      return { error: error.message };
    }
    return { error: "Failed to update password. Please try again." };
  }
};
