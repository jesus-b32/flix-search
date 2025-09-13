"use server";

import { signOut } from "@/auth";

/**
 * Logout action.
 * Used for logging out the user.
 * Redirects to login page.
 * @returns - A success or error message
 */
export const logout = async () => {
  await signOut({
    redirectTo: "/auth/login",
  });
};
