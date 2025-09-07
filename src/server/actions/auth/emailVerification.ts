"use server";

import { getUserByEmail, updateUserEmailVerified } from "@/data/user";
import {
  getVerificationTokenByToken,
  deleteVerificationToken,
} from "@/data/verificationToken";

export const emailVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
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

  const updateResult = await updateUserEmailVerified(
    existingUser.id,
    existingToken.email,
  );

  // Handle error cases from updateUserEmailVerified
  if (updateResult instanceof Error) {
    return { error: updateResult.message };
  }
  await deleteVerificationToken(existingToken.id);

  return { success: "Email verified!" };
};
