"use server";

import type * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";

import { getUserByEmail } from "@/data/user";
import { createVideoList } from "@/data/videoList";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

/**
 * Validates the form values and returns a success message or an error message
 *
 * @param values - the form values of the new user
 * @returns an object with a success message or an error message
 */
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { name, email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: "Email already in use!",
    };
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashPassword,
      })
      .returning({
        id: users.id,
      });

    const userId = newUser[0]?.id ?? "";

    await createVideoList(userId, "watchlist");
    // ...
  } catch {
    // Handle the error, for example:
    return {
      error: "Error creating user!",
    };
  }

  const verificationToken = await generateVerificationToken(email);

  if (!verificationToken[0]?.token || !verificationToken[0]?.email) {
    return { error: "Error generating verification token!" };
  }

  await sendVerificationEmail(
    verificationToken[0].email,
    verificationToken[0].token,
  );

  return {
    success: "Confirmation email sent!",
  };
};
