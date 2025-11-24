"use server";

import type * as z from "zod";
import { TwoFactorSchema } from "@/schemas/schema";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { currentUser } from "@/lib/currentUser";
import { db } from "@/server/db";
import { accounts } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";

/**
 * Validates the update two factor form values and enables/disables 2FA using Better Auth's 2FA API.
 * Better Auth requires a password to enable or disable 2FA for security reasons.
 *
 * Note: According to Better Auth docs, 2FA can only be enabled for credential accounts.
 * OAuth accounts are not supported - the provider handles 2FA.
 *
 * @param values - the form values of an update two factor form
 * @param userId - the user id (not used by Better Auth, but kept for backward compatibility)
 * @returns an object with a success message or an error message
 */
export const updateTwoFactor = async (
  values: z.infer<typeof TwoFactorSchema>,
  userId: string,
) => {
  const validatedFields = TwoFactorSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { twoFactor: enable2FA, password } = validatedFields.data;

  // Type guard: password is validated by Zod schema
  if (typeof password !== "string" || password.length === 0) {
    return {
      error: "Password is required!",
    };
  }

  try {
    // Get current user from session
    const user = await currentUser();

    if (!user || typeof user !== "object") {
      return { error: "Unauthorized!" };
    }

    // Check if user has a credential account (required for 2FA)
    // Better Auth only allows 2FA for credential accounts, not OAuth accounts
    const credentialAccount = await db.query.accounts.findFirst({
      where: and(
        eq(accounts.userId, user.id),
        eq(accounts.provider, "credential"),
      ),
    });

    // If user doesn't have a credential account with password, they're OAuth-only
    // Better Auth doesn't support 2FA for OAuth accounts (provider handles 2FA)
    if (!credentialAccount?.password) {
      return {
        error:
          "Two factor authentication is only available for accounts with email and password. OAuth accounts rely on the provider's 2FA.",
      };
    }

    // Check current 2FA status
    // Better Auth uses 'twoFactorEnabled' property
    const isCurrentlyEnabled =
      "twoFactorEnabled" in user && user.twoFactorEnabled === true;

    // If the status is not changing, return early
    if (enable2FA === isCurrentlyEnabled) {
      return {
        success: `Two factor authentication is already ${enable2FA ? "enabled" : "disabled"}.`,
      };
    }

    // Use Better Auth's 2FA API
    // Better Auth requires password to enable/disable 2FA for security
    if (enable2FA) {
      // Enable 2FA
      // Better Auth will generate TOTP secret and backup codes
      // The user will need to verify their TOTP code to complete setup
      await auth.api.enableTwoFactor({
        body: {
          password,
          // issuer is optional, defaults to appName in auth config
        },
        headers: headers(),
      });

      // Note: enableTwoFactor returns totpURI and backupCodes that can be displayed to the user
      // For now, we'll just return success message
      // TODO: Consider returning totpURI and backupCodes to display to user

      return {
        success:
          "Two factor authentication enabled successfully! Please verify your TOTP code to complete setup.",
      };
    } else {
      // Disable 2FA
      await auth.api.disableTwoFactor({
        body: {
          password,
        },
        headers: headers(),
      });

      return {
        success: "Two factor authentication disabled successfully!",
      };
    }
  } catch (error) {
    // Better Auth will throw an error if password is incorrect or other validation fails
    if (error instanceof Error) {
      // Check for common error messages
      if (
        error.message.includes("password") &&
        (error.message.includes("invalid") ||
          error.message.includes("incorrect") ||
          error.message.includes("wrong"))
      ) {
        return { error: "Incorrect password!" };
      }
      if (
        error.message.includes("2FA") ||
        error.message.includes("two factor")
      ) {
        return { error: error.message };
      }
      return { error: error.message };
    }
    return {
      error: "Failed to update two factor authentication. Please try again.",
    };
  }
};
