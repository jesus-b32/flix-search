"use server";

import type * as z from "zod";
import { NewImageSchema } from "@/schemas/schema";
import { updateUserImage } from "@/data/user";

/**
 * Validates the update image form values and returns a success message or an error message.
 * Used for updating user image.
 *
 * @param values - the form values of a update image
 * @param userId - the user id
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
    const updated = await updateUserImage(userId, image);
    if (updated) {
      return {
        success: "Profile image updated successfully!",
      };
    } else {
      return {
        error: "Failed to update profile image!",
      };
    }
  } catch {
    return {
      error: "Something went wrong!",
    };
  }
};
