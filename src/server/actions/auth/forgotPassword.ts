"use server";

import type * as z from "zod";
import bcrypt from "bcryptjs";
import { NewPasswordFromEmailSchema } from "@/schemas/schema";
import {
  deletePasswordRestToken,
  getPasswordRestTokenByToken,
} from "@/data/passwordResetToken";
import { getUserByEmail, updateUserPassword } from "@/data/user";

export const forgotPassword = async (
  values: z.infer<typeof NewPasswordFromEmailSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validatedFields = NewPasswordFromEmailSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedFields.data;
  const existingToken = await getPasswordRestTokenByToken(token);

  // Handle error case from getPasswordRestTokenByToken
  if (existingToken instanceof Error) {
    return { error: existingToken.message };
  }

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  if (!existingToken.email) {
    return { error: "Email not found!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  // Handle error cases from getUserByEmail
  if (existingUser instanceof Error) {
    return { error: existingUser.message };
  }

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const updateResult = await updateUserPassword(
    existingUser.id,
    hashedPassword,
  );

  // Handle error cases from updateUserPassword
  if (updateResult instanceof Error) {
    return { error: updateResult.message };
  }

  const deleteResult = await deletePasswordRestToken(existingToken.id);
  // Handle error case from deletePasswordRestToken
  if (deleteResult instanceof Error) {
    return { error: deleteResult.message };
  }

  return { success: "Password updated!" };
};
