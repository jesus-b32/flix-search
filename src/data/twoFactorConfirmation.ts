import { db } from "@/server/db";
import { twoFactorConfirmations } from "@/server/db/schema";
import { eq } from "drizzle-orm";

/**
 * Get a two-factor confirmation by user ID
 * @param userId - The user ID to search for
 * @returns - The two-factor confirmation object if found, null if not found, or an Error if the request fails
 */
export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  // Input validation
  if (!userId || typeof userId !== "string" || userId.trim().length === 0) {
    return new Error("User ID is required and must be a non-empty string");
  }

  try {
    const twoFactorConfirmation =
      await db.query.twoFactorConfirmations.findFirst({
        where: eq(twoFactorConfirmations.userId, userId.trim()),
      });
    return twoFactorConfirmation;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in getTwoFactorConfirmationByUserId:", {
      userId: userId.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching two-factor confirmation. Please try again later.",
    );
  }
};

/**
 * Delete a two-factor confirmation by ID
 * @param id - The confirmation ID to delete
 * @returns - true if successful, null if confirmation not found, or an Error if the request fails
 */
export const deleteTwoFactorConfirmation = async (id: string) => {
  // Input validation
  if (!id || typeof id !== "string" || id.trim().length === 0) {
    return new Error(
      "Confirmation ID is required and must be a non-empty string",
    );
  }

  try {
    await db
      .delete(twoFactorConfirmations)
      .where(eq(twoFactorConfirmations.id, id.trim()));
    return true;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in deleteTwoFactorConfirmation:", {
      id: id.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while deleting two-factor confirmation. Please try again later.",
    );
  }
};

/**
 * Create a new two-factor confirmation
 * @param userId - The user ID to create confirmation for
 * @returns - true if successful, null if creation fails, or an Error if the request fails
 */
export const createTwoFactorConfirmation = async (userId: string) => {
  // Input validation
  if (!userId || typeof userId !== "string" || userId.trim().length === 0) {
    return new Error("User ID is required and must be a non-empty string");
  }

  try {
    await db.insert(twoFactorConfirmations).values({
      userId: userId.trim(),
    });

    return true;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in createTwoFactorConfirmation:", {
      userId: userId.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while creating two-factor confirmation. Please try again later.",
    );
  }
};
