"use server";

import type * as z from "zod";
import { NewEmailSchema } from "@/schemas/schema";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { currentUser } from "@/lib/currentUser";
import { db } from "@/server/db";
import { accounts } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";
import { scrypt } from "crypto";
import { promisify } from "util";
import bcrypt from "bcryptjs";

// Promisify scrypt for async/await usage
const scryptAsync = promisify(scrypt);

/**
 * Verify password - supports both scrypt (Better Auth) and bcrypt (legacy NextAuth)
 * This is a helper function to verify passwords directly from the account table
 */
async function verifyPasswordDirectly(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  // First, try scrypt (Better Auth format: "hash.salt")
  if (hashedPassword.includes(".")) {
    const [hash, salt] = hashedPassword.split(".");
    if (hash && salt) {
      try {
        const buf = (await scryptAsync(password, salt, 64)) as Buffer;
        return buf.toString("hex") === hash;
      } catch {
        // If scrypt fails, continue to bcrypt check
      }
    }
  }

  // If scrypt fails or format doesn't match, try bcrypt (legacy NextAuth)
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch {
    return false;
  }
}

/**
 * Validates the update email form values and initiates email change using Better Auth's changeEmail API.
 * Better Auth handles email uniqueness checks and sends verification email to the new email address.
 * The email is only updated after the user verifies the new email.
 *
 * Note: Better Auth's changeEmail doesn't require password verification by default.
 * We verify the password first to maintain the same security level as the old implementation.
 *
 * @param values - the form values of an update email form
 * @param userId - the user id (not used by Better Auth, but kept for backward compatibility)
 * @returns an object with a success message or an error message
 */
export const updateEmail = async (
  values: z.infer<typeof NewEmailSchema>,
  userId: string,
) => {
  const validatedFields = NewEmailSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { email: newEmail, password } = validatedFields.data;

  try {
    // Get current user from session
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized!" };
    }

    // Check if new email is the same as current email
    if (newEmail === user.email) {
      return { error: "Email entered is the same as existing email!" };
    }

    // Verify password before allowing email change
    // Get the credential account to verify the password
    const credentialAccount = await db.query.accounts.findFirst({
      where: and(
        eq(accounts.userId, user.id),
        eq(accounts.provider, "credential"),
      ),
    });

    if (!credentialAccount?.password) {
      return { error: "No password found for this account!" };
    }

    // Verify password using the same logic as Better Auth (supports both bcrypt and scrypt)
    const passwordValid = await verifyPasswordDirectly(
      password,
      credentialAccount.password,
    );

    if (!passwordValid) {
      return { error: "Incorrect password!" };
    }

    // Use Better Auth's changeEmail API
    // Better Auth handles:
    // - Email uniqueness checks
    // - Sending verification email to the new email address
    // - Updating email only after verification
    await auth.api.changeEmail({
      body: {
        newEmail,
        callbackURL: "/", // Redirect URL after email verification
      },
      headers: headers(),
    });

    return {
      success:
        "Verification email sent to new email address. Please verify to complete the change.",
    };
  } catch (error) {
    // Better Auth will throw an error if email already exists or other validation fails
    if (error instanceof Error) {
      // Check for common error messages
      if (
        error.message.includes("email") &&
        (error.message.includes("already") || error.message.includes("exists"))
      ) {
        return { error: "Email already being used!" };
      }
      if (error.message.includes("email") && error.message.includes("same")) {
        return { error: "Email entered is the same as existing email!" };
      }
      return { error: error.message };
    }
    return { error: "Failed to update email. Please try again." };
  }
};
