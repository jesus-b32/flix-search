"use server";

import { getUserByEmail, updateUserEmailVerified } from "@/data/user";
import {
  getVerificationTokenByToken,
  deleteVerificationToken,
} from "@/data/verificationToken";

export const newVerification = async (token: string) => {
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
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await updateUserEmailVerified(existingUser.id, existingToken.email);
  await deleteVerificationToken(existingToken.id);

  return { success: "Email verified!" };
};
