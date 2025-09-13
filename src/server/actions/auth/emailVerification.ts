"use server";

import { getUserByEmail, updateUserEmailVerified } from "@/data/user";
import {
  getVerificationTokenByToken,
  deleteVerificationToken,
} from "@/data/verificationToken";

/**
 * Verify an email address using a verification token.
 * Verification token is retrieved from the database.
 * Used for email verification.
 * @param token - The verification token
 * @returns - A success or error message
 */
export const emailVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  // Handle error case from getVerificationTokenByToken
  if (existingToken instanceof Error) {
    return { error: existingToken.message };
  }

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

  const deleteResult = await deleteVerificationToken(existingToken.id);
  // Handle error case from deleteVerificationToken
  if (deleteResult instanceof Error) {
    return { error: deleteResult.message };
  }

  return { success: "Email verified!" };
};
