"use server";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import type * as z from "zod";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid email!",
    };
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  if (!passwordResetToken)
    return { error: "Error generating password reset token!" };
  if (!passwordResetToken[0]?.token || !passwordResetToken[0]?.email) {
    return { error: "Error generating password reset token!" };
  }
  await sendPasswordResetEmail(
    passwordResetToken[0].email,
    passwordResetToken[0].token,
  );

  return { success: "Reset email sent!" };
};
