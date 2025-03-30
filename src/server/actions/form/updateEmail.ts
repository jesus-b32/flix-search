"use server";

import type * as z from "zod";
import { NewEmailSchema } from "@/schemas";
import { getUserById, getUserByEmail, updateUserEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

/**
 * Validates the form values and returns a success message or an error message
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

  const { email, password } = validatedFields.data;

  try {
    const user = await getUserById(userId);

    if (!user?.password || !user) {
      return { error: "Failed to retrieve user info!" };
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
      if (email === user.email) {
        return { error: "Email entered is the same as existing email!" };
      }

      const existingUser = await getUserByEmail(email);

      if (existingUser) {
        return { error: "Email already being used!" };
      }

      const isEmailUpdated = await updateUserEmail(userId, email);

      if (isEmailUpdated) {
        const verificationToken = await generateVerificationToken(email);
        if (!verificationToken)
          return { error: "Error generating verification token!" };
        if (!verificationToken[0]?.token || !verificationToken[0]?.email) {
          return { error: "Error generating verification token!" };
        }
        await sendVerificationEmail(
          verificationToken[0]?.email,
          verificationToken[0]?.token,
        );
        return {
          success: "Email updated! Verification email sent.",
        };
      } else {
        return {
          error: "Failed to update email!",
        };
      }
    } else {
      return {
        error: "Incorrect password!",
      };
    }
  } catch {
    return {
      error: "Failed to update email!",
    };
  }
};
