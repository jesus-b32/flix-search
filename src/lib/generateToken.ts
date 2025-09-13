import {
  getVerificationTokenByEmail,
  deleteVerificationToken,
  createVerificationToken,
} from "@/data/verificationToken";
import {
  getPasswordRestTokenByEmail,
  deletePasswordRestToken,
  createPasswordResetToken,
} from "@/data/passwordResetToken";
import {
  getTwoFactorTokenByEmail,
  deleteTwoFactorToken,
  createTwoFactorToken,
} from "@/data/twoFactorToken";

import { v4 as uuid } from "uuid";
import crypto from "crypto";

/**
 * Generate a verification token.
 * If a token already exists for the email, it will be deleted and a new one will be created.
 * Used for email verification.
 * @param email - The email address associated with the token
 * @returns - The generated verification token object if successful, null if creation fails, or an Error if the request fails
 */
export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000); //expires in 1 hour

  const existingToken = await getVerificationTokenByEmail(email);

  // Handle error case from getVerificationTokenByEmail
  if (existingToken instanceof Error) {
    return existingToken;
  }

  if (existingToken) {
    const deleteResult = await deleteVerificationToken(existingToken.id);
    // Handle error case from deleteVerificationToken
    if (deleteResult instanceof Error) {
      return deleteResult;
    }
  }

  const verificationToken = await createVerificationToken(
    email,
    token,
    expires,
  );

  return verificationToken;
};

/**
 * Generate a password reset token.
 * If a token already exists for the email, it will be deleted and a new one will be created.
 * Used for password reset.
 * @param email - The email address associated with the token
 * @returns - The generated password reset token object if successful, null if creation fails, or an Error if the request fails
 */
export const generatePasswordResetToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000); //expires in 1 hour

  const existingToken = await getPasswordRestTokenByEmail(email);

  // Handle error case from getPasswordRestTokenByEmail
  if (existingToken instanceof Error) {
    return existingToken;
  }

  if (existingToken) {
    const deleteResult = await deletePasswordRestToken(existingToken.id);
    // Handle error case from deletePasswordRestToken
    if (deleteResult instanceof Error) {
      return deleteResult;
    }
  }

  const passwordResetToken = await createPasswordResetToken(
    email,
    token,
    expires,
  );

  return passwordResetToken;
};

/**
 * Generate a two-factor token.
 * If a token already exists for the email, it will be deleted and a new one will be created.
 * Used for two-factor authentication.
 * @param email - The email address associated with the token
 * @returns - The generated two-factor token object if successful, null if creation fails, or an Error if the request fails
 */
export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 300 * 1000); //expires in 5min

  const existingToken = await getTwoFactorTokenByEmail(email);

  // Handle error case from getTwoFactorTokenByEmail
  if (existingToken instanceof Error) {
    return existingToken;
  }

  if (existingToken) {
    const deleteResult = await deleteTwoFactorToken(existingToken.id);
    // Handle error case from deleteTwoFactorToken
    if (deleteResult instanceof Error) {
      return deleteResult;
    }
  }

  const twoFactorToken = await createTwoFactorToken(email, token, expires);

  return twoFactorToken;
};
