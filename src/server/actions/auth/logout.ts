"use server";

import { auth } from "@/auth";
import { headers } from "next/headers";

/**
 * Logout action.
 * Used for logging out the user.
 * According to Better Auth docs: https://www.better-auth.com/docs/authentication/email-password#sign-out
 * Server-side sign out uses auth.api.signOut() with headers.
 *
 * @returns - A success or error message
 */
export const logout = async () => {
  try {
    await auth.api.signOut({
      headers: headers(),
    });
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { error: "Failed to logout" };
  }
};
