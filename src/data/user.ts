import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

/**
 * Get a user by their email address
 * @param email - The email address to search for
 * @returns - The user object if found, null if not found, or an Error if the request fails
 */
export const getUserByEmail = async (email: string) => {
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
    const user = await db.query.users.findFirst({
      where: eq(users.email, email.trim().toLowerCase()),
    });
    return user;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in getUserByEmail:", {
      email: email.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching user by email. Please try again later.",
    );
  }
};

/**
 * Get a user by their ID
 * @param id - The user ID to search for
 * @returns - The user object if found, null if not found, or an Error if the request fails
 */
export const getUserById = async (id: string) => {
  // Input validation
  if (!id || typeof id !== "string" || id.trim().length === 0) {
    return new Error("User ID is required and must be a non-empty string");
  }

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id.trim()),
    });
    return user;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in getUserById:", {
      id: id.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching user by ID. Please try again later.",
    );
  }
};

/**
 * Used to update email verified status for all users. Update email as well so this function can be reused when a user wants to modify their email. When user changes email, token is generated with that new email and send verification email to user. Once email is confirmed, then email is updated in db
 * @param id - The user ID to update
 * @param email - The new email address
 * @returns - true if successful, null if user not found, or an Error if the request fails
 */
export const updateUserEmailVerified = async (id: string, email: string) => {
  // Input validation
  if (!id || typeof id !== "string" || id.trim().length === 0) {
    return new Error("User ID is required and must be a non-empty string");
  }

  if (!email || typeof email !== "string" || email.trim().length === 0) {
    return new Error("Email is required and must be a non-empty string");
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return new Error("Email must be in a valid format");
  }

  try {
    await db
      .update(users)
      .set({
        emailVerified: new Date(),
        email: email.trim().toLowerCase(),
      })
      .where(eq(users.id, id.trim()));
    return true;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in updateUserEmailVerified:", {
      id: id.trim(),
      email: email.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while updating user email verification. Please try again later.",
    );
  }
};

/**
 * Create a new user in the database
 * @param name - The user's name
 * @param email - The user's email address
 * @param hashedPassword - The hashed password
 * @returns - The new user object if successful, null if user already exists, or an Error if the request fails
 */
export const createNewUser = async (
  name: string,
  email: string,
  hashedPassword: string,
) => {
  // Input validation
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return new Error("Name is required and must be a non-empty string");
  }

  if (!email || typeof email !== "string" || email.trim().length === 0) {
    return new Error("Email is required and must be a non-empty string");
  }

  if (
    !hashedPassword ||
    typeof hashedPassword !== "string" ||
    hashedPassword.trim().length === 0
  ) {
    return new Error(
      "Hashed password is required and must be a non-empty string",
    );
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return new Error("Email must be in a valid format");
  }

  // Name length validation
  if (name.trim().length < 2) {
    return new Error("Name must be at least 2 characters long");
  }

  if (name.trim().length > 100) {
    return new Error("Name must be less than 100 characters");
  }

  try {
    const newUser = await db
      .insert(users)
      .values({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
      })
      .returning({
        id: users.id,
      });

    return newUser;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in createNewUser:", {
      name: name.trim(),
      email: email.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    // Check for specific database errors
    if (error instanceof Error && error.message.includes("unique")) {
      return new Error("A user with this email already exists");
    }

    return new Error(
      "An unexpected error occurred while creating user. Please try again later.",
    );
  }
};

/**
 * Delete a user by their ID
 * @param id - The user ID to delete
 * @returns - true if successful, null if user not found, or an Error if the request fails
 */
export const deleteUserById = async (id: string) => {
  // Input validation
  if (!id || typeof id !== "string" || id.trim().length === 0) {
    return new Error("User ID is required and must be a non-empty string");
  }

  try {
    await db.delete(users).where(eq(users.id, id.trim()));
    return true;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in deleteUserById:", {
      id: id.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while deleting user. Please try again later.",
    );
  }
};

/**
 * Update a user's profile image
 * @param id - The user ID to update
 * @param imageUrl - The new image URL
 * @returns - true if successful, null if user not found, or an Error if the request fails
 */
export const updateUserImage = async (id: string, imageUrl: string) => {
  // Input validation
  if (!id || typeof id !== "string" || id.trim().length === 0) {
    return new Error("User ID is required and must be a non-empty string");
  }

  if (
    !imageUrl ||
    typeof imageUrl !== "string" ||
    imageUrl.trim().length === 0
  ) {
    return new Error("Image URL is required and must be a non-empty string");
  }

  // Basic URL validation
  try {
    new URL(imageUrl.trim());
  } catch {
    return new Error("Image URL must be a valid URL format");
  }

  try {
    await db
      .update(users)
      .set({ image: imageUrl.trim() })
      .where(eq(users.id, id.trim()));
    return true;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in updateUserImage:", {
      id: id.trim(),
      imageUrl: imageUrl.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while updating user image. Please try again later.",
    );
  }
};

/**
 * Update a user's name
 * @param id - The user ID to update
 * @param name - The new name
 * @returns - true if successful, null if user not found, or an Error if the request fails
 */
export const updateUserName = async (id: string, name: string) => {
  // Input validation
  if (!id || typeof id !== "string" || id.trim().length === 0) {
    return new Error("User ID is required and must be a non-empty string");
  }

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return new Error("Name is required and must be a non-empty string");
  }

  // Name length validation
  if (name.trim().length < 2) {
    return new Error("Name must be at least 2 characters long");
  }

  if (name.trim().length > 100) {
    return new Error("Name must be less than 100 characters");
  }

  try {
    await db
      .update(users)
      .set({ name: name.trim() })
      .where(eq(users.id, id.trim()));
    return true;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in updateUserName:", {
      id: id.trim(),
      name: name.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while updating user name. Please try again later.",
    );
  }
};

/**
 * Update a user's email address
 * @param id - The user ID to update
 * @param email - The new email address
 * @returns - true if successful, null if user not found, or an Error if the request fails
 */
export const updateUserEmail = async (id: string, email: string) => {
  // Input validation
  if (!id || typeof id !== "string" || id.trim().length === 0) {
    return new Error("User ID is required and must be a non-empty string");
  }

  if (!email || typeof email !== "string" || email.trim().length === 0) {
    return new Error("Email is required and must be a non-empty string");
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return new Error("Email must be in a valid format");
  }

  try {
    await db
      .update(users)
      .set({ email: email.trim().toLowerCase(), emailVerified: null })
      .where(eq(users.id, id.trim()));
    return true;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in updateUserEmail:", {
      id: id.trim(),
      email: email.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    // Check for specific database errors
    if (error instanceof Error && error.message.includes("unique")) {
      return new Error("A user with this email already exists");
    }

    return new Error(
      "An unexpected error occurred while updating user email. Please try again later.",
    );
  }
};

/**
 * Update a user's password
 * @param id - The user ID to update
 * @param hashedPassword - The new hashed password
 * @returns - true if successful, null if user not found, or an Error if the request fails
 */
export const updateUserPassword = async (
  id: string,
  hashedPassword: string,
) => {
  // Input validation
  if (!id || typeof id !== "string" || id.trim().length === 0) {
    return new Error("User ID is required and must be a non-empty string");
  }

  if (
    !hashedPassword ||
    typeof hashedPassword !== "string" ||
    hashedPassword.trim().length === 0
  ) {
    return new Error(
      "Hashed password is required and must be a non-empty string",
    );
  }

  try {
    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, id.trim()));
    return true;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in updateUserPassword:", {
      id: id.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while updating user password. Please try again later.",
    );
  }
};

/**
 * Update a user's two-factor authentication status
 * @param id - The user ID to update
 * @param isTwoFactorEnabled - Whether two-factor authentication is enabled
 * @returns - true if successful, null if user not found, or an Error if the request fails
 */
export const updateUserTwoFactorEnabled = async (
  id: string,
  isTwoFactorEnabled: boolean,
) => {
  // Input validation
  if (!id || typeof id !== "string" || id.trim().length === 0) {
    return new Error("User ID is required and must be a non-empty string");
  }

  if (typeof isTwoFactorEnabled !== "boolean") {
    return new Error("Two-factor enabled status must be a boolean value");
  }

  try {
    await db
      .update(users)
      .set({ isTwoFactorEnabled: isTwoFactorEnabled })
      .where(eq(users.id, id.trim()));
    return true;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in updateUserTwoFactorEnabled:", {
      id: id.trim(),
      isTwoFactorEnabled,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while updating two-factor authentication status. Please try again later.",
    );
  }
};
