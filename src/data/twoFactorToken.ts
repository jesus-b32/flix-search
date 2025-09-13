import { db } from "@/server/db";
import { twoFactorTokens } from "@/server/db/schema";
import { eq } from "drizzle-orm";

/**
 * Get a two-factor token by token value
 * @param token - The token value to search for
 * @returns - The two-factor token object if found, null if not found, or an Error if the request fails
 */
export const getTwoFactorTokenByToken = async (token: string) => {
  // Input validation
  if (!token || typeof token !== "string" || token.trim().length === 0) {
    return new Error("Token is required and must be a non-empty string");
  }

  try {
    const twoFactorToken = await db.query.twoFactorTokens.findFirst({
      where: eq(twoFactorTokens.token, token.trim()),
    });
    return twoFactorToken;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in getTwoFactorTokenByToken:", {
      token: token.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching two-factor token. Please try again later.",
    );
  }
};

/**
 * Get a two-factor token by email address
 * @param email - The email address to search for
 * @returns - The two-factor token object if found, null if not found, or an Error if the request fails
 */
export const getTwoFactorTokenByEmail = async (email: string) => {
  // Input validation
  if (!email || typeof email !== "string" || email.trim().length === 0) {
    return new Error("Email is required and must be a non-empty string");
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return new Error("Email must be in a valid format");
  }

  try {
    const twoFactorToken = await db.query.twoFactorTokens.findFirst({
      where: eq(twoFactorTokens.email, email.trim().toLowerCase()),
    });
    return twoFactorToken;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in getTwoFactorTokenByEmail:", {
      email: email.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching two-factor token by email. Please try again later.",
    );
  }
};

/**
 * Delete a two-factor token by ID
 * @param id - The token ID to delete
 * @returns - true if successful, null if token not found, or an Error if the request fails
 */
export const deleteTwoFactorToken = async (id: string) => {
  // Input validation
  if (!id || typeof id !== "string" || id.trim().length === 0) {
    return new Error("Token ID is required and must be a non-empty string");
  }

  try {
    await db.delete(twoFactorTokens).where(eq(twoFactorTokens.id, id.trim()));
    return true;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in deleteTwoFactorToken:", {
      id: id.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while deleting two-factor token. Please try again later.",
    );
  }
};

/**
 * Create a new two-factor token
 * @param email - The email address associated with the token
 * @param token - The token value
 * @param expires - The expiration date for the token
 * @returns - The created two-factor token object if successful, null if creation fails, or an Error if the request fails
 */
export const createTwoFactorToken = async (
  email: string,
  token: string,
  expires: Date,
) => {
  // Input validation
  if (!email || typeof email !== "string" || email.trim().length === 0) {
    return new Error("Email is required and must be a non-empty string");
  }

  if (!token || typeof token !== "string" || token.trim().length === 0) {
    return new Error("Token is required and must be a non-empty string");
  }

  if (!expires || !(expires instanceof Date) || isNaN(expires.getTime())) {
    return new Error("Expires must be a valid Date object");
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return new Error("Email must be in a valid format");
  }

  // Check if token is expired
  if (expires < new Date()) {
    return new Error("Token expiration date must be in the future");
  }

  try {
    const twoFactorToken = await db
      .insert(twoFactorTokens)
      .values({
        email: email.trim().toLowerCase(),
        token: token.trim(),
        expires,
      })
      .returning({
        email: twoFactorTokens.email,
        token: twoFactorTokens.token,
      });

    return twoFactorToken;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in createTwoFactorToken:", {
      email: email.trim(),
      token: token.trim(),
      expires: expires.toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while creating two-factor token. Please try again later.",
    );
  }
};
