import { auth } from "@/auth";

/**
 * Get the current user from the session
 * @returns The current user
 * or null if the user is not logged in
 */
export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};
