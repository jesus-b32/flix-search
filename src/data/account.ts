import { db } from "@/server/db";
import { accounts } from "@/server/db/schema";
import { eq } from "drizzle-orm";

/**
 * Get an account by user ID
 * @param userId - The user ID to search for
 * @returns - The account object if found, null if not found, or an Error if the request fails
 */
export const getAccountByUserId = async (userId: string) => {
  // Input validation
  if (!userId || typeof userId !== "string" || userId.trim().length === 0) {
    return new Error("User ID is required and must be a non-empty string");
  }

  try {
    const account = await db.query.accounts.findFirst({
      where: eq(accounts.userId, userId.trim()),
    });

    return account;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in getAccountByUserId:", {
      userId: userId.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching account by user ID. Please try again later.",
    );
  }
};
