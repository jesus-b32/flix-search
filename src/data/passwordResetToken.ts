import { db } from "@/server/db";
import { passwordResetTokens } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const getPasswordRestTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.query.passwordResetTokens.findFirst({
      where: eq(passwordResetTokens.token, token),
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordRestTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.query.passwordResetTokens.findFirst({
      where: eq(passwordResetTokens.email, email),
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const deletePasswordRestToken = async (id: string) => {
  try {
    await db.delete(passwordResetTokens).where(eq(passwordResetTokens.id, id));
    return true;
  } catch {
    return null;
  }
};

export const createPasswordResetToken = async (
  email: string,
  token: string,
  expires: Date,
) => {
  try {
    const passwordResetToken = await db
      .insert(passwordResetTokens)
      .values({
        email,
        token,
        expires,
      })
      .returning({
        email: passwordResetTokens.email,
        token: passwordResetTokens.token,
      });

    return passwordResetToken;
  } catch {
    return null;
  }
};
