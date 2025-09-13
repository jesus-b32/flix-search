"use server";

import { ResetPasswordSchema } from "@/schemas/schema";
import { getUserByEmail } from "@/data/user";
import type * as z from "zod";
import { sendPasswordResetEmail } from "@/lib/sendEmail";
import { generatePasswordResetToken } from "@/lib/generateToken";

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid email!",
    };
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  // Handle error case from getUserByEmail
  if (existingUser instanceof Error) {
    return { error: existingUser.message };
  }

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  // Handle error case from generatePasswordResetToken
  if (passwordResetToken instanceof Error) {
    return { error: passwordResetToken.message };
  }

  if (!passwordResetToken?.[0]?.token || !passwordResetToken?.[0]?.email) {
    return { error: "Error generating password reset token!" };
  }

  await sendPasswordResetEmail(
    passwordResetToken[0].email,
    passwordResetToken[0].token,
  );

  return { success: "Reset email sent!" };
};
