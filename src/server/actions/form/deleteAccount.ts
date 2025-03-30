"use server";

import type * as z from "zod";
import { DeleteAccountSchema } from "@/schemas/schema";
import { getUserById, deleteUserById } from "@/data/user";
import { signOut } from "@/auth";

import bcrypt from "bcryptjs";

/**
 * Validates the form values and returns a success message or an error message
 *
 * @param values - the form values of a new image
 * @returns an object with a success message or an error message
 */
export const deleteAccount = async (
  values: z.infer<typeof DeleteAccountSchema>,
  isOauth: boolean | null,
  userId: string,
) => {
  const validatedFields = DeleteAccountSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { password } = validatedFields.data;

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
        const deleted = await deleteUserById(userId);
        if (deleted) {
          await signOut({ redirect: false });
          return {
            success: "Account deleted successfully!",
          };
        } else {
          return {
            error: "Failed to delete account with password match!",
          };
        }
      } else {
        return {
          error: "Incorrect password!",
        };
      }
    } else {
      const deleted = await deleteUserById(userId);
      if (deleted) {
        await signOut({ redirect: false });
        return {
          success: "Account deleted successfully!",
        };
      } else {
        return {
          error: "Failed to delete account for Oauth account!",
        };
      }
    }
  } catch (error) {
    console.log("error: ", error);
    return {
      error: "Error: Failed to delete account!",
    };
  }
};
