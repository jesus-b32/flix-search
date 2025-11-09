import { auth } from "@/auth";
import { headers } from "next/headers";

/**
 * Get the current user from the session
 * @returns The current user
 * or null if the user is not logged in
 */
export const currentUser = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  return session?.user || null;
};
