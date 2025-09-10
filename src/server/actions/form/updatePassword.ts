"use server";

import type * as z from "zod";
import { NewPasswordSchema } from "@/schemas/schema";
import { getUserById, updateUserPassword } from "@/data/user";

import bcrypt from "bcryptjs";

/**
 * Validates the form values and returns a success message or an error message
 *
 * @param values - the form values of a new image
 * @returns an object with a success message or an error message
 */
export const updatePassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  userId: string,
) => {
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { currentPassword, newPassword, confirmNewPassword } =
    validatedFields.data;

  try {
    const user = await getUserById(userId);

    // Handle error cases from getUserById
    if (user instanceof Error) {
      return { error: user.message };
    }

    if (!user?.password || !user)
      return { error: "Failed to retrieve user data!" };
    const passwordsMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordsMatch) return { error: "Invalid current password!" };
    if (passwordsMatch && newPassword === confirmNewPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const passwordUpdated = await updateUserPassword(userId, hashedPassword);

      // Handle error cases from updateUserPassword
      if (passwordUpdated instanceof Error) {
        return { error: passwordUpdated.message };
      }

      if (passwordUpdated) {
        return {
          success: "Password updated successfully!",
        };
      } else {
        return {
          error: "Failed to update password!",
        };
      }
    } else {
      return {
        error: "New passwords do not match!",
      };
    }
  } catch {
    return {
      error: "Something went wrong!",
    };
  }
};
