"use server";

import type * as z from "zod";
import { NewImageSchema } from "@/schemas";
import { getUserById, updateUserImage } from "@/data/user";

import bcrypt from "bcryptjs";

/**
 * Validates the form values and returns a success message or an error message
 *
 * @param values - the form values of a new image
 * @returns an object with a success message or an error message
 */
export const image = async (
  values: z.infer<typeof NewImageSchema>,
  isOauth: boolean | null,
  userId: string,
) => {
  const validatedFields = NewImageSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { image, password } = validatedFields.data;

  try {
    //if not Oauth account check if password matches database password
    if (!isOauth) {
      const user = await getUserById(userId);
      if (!user?.password || !user) return null;
      const passwordsMatch = await bcrypt.compare(
        password ?? "",
        user.password,
      );
      if (passwordsMatch) {
        const updated = await updateUserImage(userId, image);
        if (updated) {
          return {
            success: "Image updated successfully!",
          };
        } else {
          return {
            error: "Failed to update image!",
          };
        }
      } else {
        return {
          error: "Incorrect password!",
        };
      }
    } else {
      const updated = await updateUserImage(userId, image);
      if (updated) {
        return {
          success: "Image updated successfully!",
        };
      } else {
        return {
          error: "Failed to update image!",
        };
      }
    }
  } catch {
    return {
      error: "Failed to update image!",
    };
  }
};
