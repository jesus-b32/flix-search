"use server";

import type * as z from "zod";
import { TwoFactorSchema } from "@/schemas/schema";
import { updateUserTwoFactorEnabled } from "@/data/user";

/**
 * Validates the form values and returns a success message or an error message
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

  const { twoFactor } = validatedFields.data;

  try {
    const twoFactorUpdated = await updateUserTwoFactorEnabled(
      userId,
      twoFactor,
    );
    if (twoFactorUpdated) {
      return {
        success: "Two factor authentication updated successfully!",
      };
    } else {
      return {
        error: "Failed to update two factor authentication!",
      };
    }
  } catch {
    return {
      error: "Failed to update two factor authentication!",
    };
  }
};
