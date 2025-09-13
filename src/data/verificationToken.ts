import { db } from "@/server/db";
import { verificationTokens } from "@/server/db/schema";
import { eq } from "drizzle-orm";

/**
 * Get a verification token by token value
 * @param token - The token value to search for
 * @returns - The verification token object if found, null if not found, or an Error if the request fails
 */
export const getVerificationTokenByToken = async (token: string) => {
  // Input validation
  if (!token || typeof token !== "string" || token.trim().length === 0) {
    return new Error("Token is required and must be a non-empty string");
  }

  try {
    const verificationToken = await db.query.verificationTokens.findFirst({
      where: eq(verificationTokens.token, token.trim()),
    });

    return verificationToken;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in getVerificationTokenByToken:", {
      token: token.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching verification token. Please try again later.",
    );
  }
};

/**
 * Get a verification token by email address
 * @param email - The email address to search for
 * @returns - The verification token object if found, null if not found, or an Error if the request fails
 */
export const getVerificationTokenByEmail = async (email: string) => {
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
    const verificationToken = await db.query.verificationTokens.findFirst({
      where: eq(verificationTokens.email, email.trim().toLowerCase()),
    });

    return verificationToken;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in getVerificationTokenByEmail:", {
      email: email.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching verification token by email. Please try again later.",
    );
  }
};

/**
 * Delete a verification token by ID
 * @param id - The token ID to delete
 * @returns - true if successful, null if token not found, or an Error if the request fails
 */
export const deleteVerificationToken = async (id: string) => {
  // Input validation
  if (!id || typeof id !== "string" || id.trim().length === 0) {
    return new Error("Token ID is required and must be a non-empty string");
  }

  try {
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.id, id.trim()));
    return true;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in deleteVerificationToken:", {
      id: id.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while deleting verification token. Please try again later.",
    );
  }
};

/**
 * Create a new verification token
 * @param email - The email address associated with the token
 * @param token - The token value
 * @param expires - The expiration date for the token
 * @returns - The created verification token object if successful, null if creation fails, or an Error if the request fails
 */
export const createVerificationToken = async (
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
    const verificationToken = await db
      .insert(verificationTokens)
      .values({
        email: email.trim().toLowerCase(),
        token: token.trim(),
        expires,
      })
      .returning({
        email: verificationTokens.email,
        token: verificationTokens.token,
      });

    return verificationToken;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in createVerificationToken:", {
      email: email.trim(),
      token: token.trim(),
      expires: expires.toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while creating verification token. Please try again later.",
    );
  }
};
