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
import { v4 as uuid } from "uuid";

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
