"use server";

import type * as z from "zod";
import { NewImageSchema } from "@/schemas/schema";
import { auth } from "@/auth";
import { headers } from "next/headers";

/**
 * Validates the update image form values and updates the user's profile image using Better Auth's updateUser API.
 * Better Auth handles updating the user information in the database automatically.
 *
 * @param values - the form values of an update image form
 * @param userId - the user id (not used by Better Auth, but kept for backward compatibility)
 * @returns an object with a success message or an error message
 */
export const updateImage = async (
  values: z.infer<typeof NewImageSchema>,
  userId: string,
) => {
  const validatedFields = NewImageSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { image } = validatedFields.data;

  try {
    // Use Better Auth's updateUser API
    // Better Auth handles updating the user information in the database
    await auth.api.updateUser({
      body: {
        image,
      },
      headers: headers(),
    });

    return {
      success: "Profile image updated successfully!",
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
    return { error: "Failed to update profile image. Please try again." };
  }
};
