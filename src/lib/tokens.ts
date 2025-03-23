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

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000); //expires in 1 hour

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await deleteVerificationToken(existingToken.id);
  }

  const verificationToken = await createVerificationToken(
    email,
    token,
    expires,
  );

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000); //expires in 1 hour

  const existingToken = await getPasswordRestTokenByEmail(email);

  if (existingToken) {
    await deletePasswordRestToken(existingToken.id);
  }

  const passwordResetToken = await createPasswordResetToken(
    email,
    token,
    expires,
  );

  return passwordResetToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  //TODO: later change to 15min
  const expires = new Date(new Date().getTime() + 3600 * 1000); //expires in 1 hour

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await deleteTwoFactorToken(existingToken.id);
  }

  const twoFactorToken = await createTwoFactorToken(email, token, expires);

  return twoFactorToken;
};
