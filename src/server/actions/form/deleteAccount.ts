"use server";

import type * as z from "zod";
import { DeleteAccountSchema } from "@/schemas/schema";
import { auth } from "@/auth";
import { headers } from "next/headers";

/**
 * Validates the delete account form values and deletes the user account using Better Auth's deleteUser API.
 * Better Auth handles authentication requirements automatically:
 * - For users with password: password verification is required
 * - For OAuth users: fresh session or email verification (if configured)
 *
 * @param values - the form values of a delete account form
 * @param isOauth - whether the user is an OAuth account (not used by Better Auth, but kept for backward compatibility)
 * @param userId - the user id (not used by Better Auth, but kept for backward compatibility)
 * @returns an object with a success message or an error message
 */
export const deleteAccount = async (
  values: z.infer<typeof DeleteAccountSchema>,
  isOauth: boolean | undefined,
  userId: string,
) => {
  const validatedFields = DeleteAccountSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { password } = validatedFields.data;

  try {
    // Use Better Auth's deleteUser API
    // Better Auth handles:
    // - Password verification (if password is provided and user has password)
    // - Fresh session check (if password not provided and user is OAuth)
    // - User deletion from database
    // - Session cleanup (user is automatically signed out after deletion)
    await auth.api.deleteUser({
      body: password ? { password } : {},
      headers: headers(),
    });

    // Better Auth automatically signs out the user after deletion
    // No need to manually call signOut

    return {
      success: "Account deleted successfully!",
    };
  } catch (error) {
    // Better Auth will throw an error if:
    // - Password is incorrect (for users with password)
    // - Session is not fresh (for OAuth users without password)
    // - User is not authenticated
    if (error instanceof Error) {
      // Check for common error messages
      if (
        error.message.includes("password") &&
        (error.message.includes("invalid") ||
          error.message.includes("incorrect") ||
          error.message.includes("wrong"))
      ) {
        return { error: "Incorrect password!" };
      }
      if (
        error.message.includes("session") &&
        (error.message.includes("fresh") || error.message.includes("expired"))
      ) {
        return {
          error:
            "Session expired. Please sign in again to delete your account.",
        };
      }
      if (
        error.message.includes("unauthorized") ||
        error.message.includes("not authenticated")
      ) {
        return { error: "Unauthorized! Please sign in again." };
      }
      return { error: error.message };
    }
    return { error: "Failed to delete account. Please try again." };
  }
};
