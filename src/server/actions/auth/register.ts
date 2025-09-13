"use server";

import type * as z from "zod";
import { RegisterSchema } from "@/schemas/schema";
import bcrypt from "bcryptjs";
import { getUserByEmail, createNewUser } from "@/data/user";
import { createVideoList } from "@/data/videoList";
import { generateVerificationToken } from "@/lib/generateToken";
import { sendVerificationEmail } from "@/lib/sendEmail";

/**
 * Validates the form values from a new registered user. Returns a success or error message.
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

  // Handle error cases from getUserByEmail
  if (existingUser instanceof Error) {
    return { error: existingUser.message };
  }

  if (existingUser) {
    return {
      error: "Email already in use!",
    };
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await createNewUser(name, email, hashPassword);

  // Handle error cases from createNewUser
  if (newUser instanceof Error) {
    return { error: newUser.message };
  }

  if (!newUser?.[0]?.id) {
    return { error: "Error creating user!" };
  }

  const userId = newUser[0].id;

  await createVideoList(userId, "watchlist");

  const verificationToken = await generateVerificationToken(email);

  // Handle error case from generateVerificationToken
  if (verificationToken instanceof Error) {
    return { error: verificationToken.message };
  }

  if (!verificationToken?.[0]?.token || !verificationToken?.[0]?.email) {
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
