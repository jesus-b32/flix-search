"use server";

import type * as z from "zod";
import bcrypt from "bcryptjs";
import { NewPasswordSchema } from "@/schemas";
import {
  deletePasswordRestToken,
  getPasswordRestTokenByToken,
} from "@/data/passwordResetToken";
import { getUserByEmail, updateUserPassword } from "@/data/user";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedFields.data;
  const existingToken = await getPasswordRestTokenByToken(token);

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
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await updateUserPassword(existingUser.id, hashedPassword);
  await deletePasswordRestToken(existingToken.id);

  return { success: "Password updated!" };
};
