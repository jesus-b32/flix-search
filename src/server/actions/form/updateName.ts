"use server";

import type * as z from "zod";
import { NewNameSchema } from "@/schemas/schema";
import { auth } from "@/auth";
import { headers } from "next/headers";

/**
 * Validates the update name form values and updates the user's name using Better Auth's updateUser API.
 * Better Auth handles updating the user information in the database automatically.
 *
 * @param values - the form values of an update name form
 * @param userId - the user id (not used by Better Auth, but kept for backward compatibility)
 * @returns an object with a success message or an error message
 */
export const updateName = async (
  values: z.infer<typeof NewNameSchema>,
  userId: string,
) => {
  const validatedFields = NewNameSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { name } = validatedFields.data;

  try {
    // Use Better Auth's updateUser API
    // Better Auth handles updating the user information in the database
    await auth.api.updateUser({
      body: {
        name,
      },
      headers: headers(),
    });

    return {
      success: "Name updated successfully!",
    };
  } catch (error) {
    // Better Auth will throw an error if validation fails or user is not authenticated
    if (error instanceof Error) {
      // Check for common error messages
      if (
        error.message.includes("unauthorized") ||
        error.message.includes("session")
      ) {
        return { error: "Unauthorized! Please sign in again." };
      }
      return { error: error.message };
    }
    return { error: "Failed to update name. Please try again." };
  }
};
