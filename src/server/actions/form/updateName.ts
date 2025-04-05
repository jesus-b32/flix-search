"use server";

import type * as z from "zod";
import { NewNameSchema } from "@/schemas/schema";
import { updateUserName } from "@/data/user";

/**
 * Validates the form values and returns a success message or an error message
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
    const updated = await updateUserName(userId, name);
    if (updated) {
      return {
        success: "Name updated successfully!",
      };
    } else {
      return {
        error: "Failed to update name!",
      };
    }
  } catch {
    return {
      error: "Failed to update name!",
    };
  }
};
