import { db } from "@/server/db";
import { verificationTokens } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.query.verificationTokens.findFirst({
      where: eq(verificationTokens.token, token),
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.query.verificationTokens.findFirst({
      where: eq(verificationTokens.email, email),
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const deleteVerificationToken = async (id: string) => {
  try {
    await db.delete(verificationTokens).where(eq(verificationTokens.id, id));
    return true;
  } catch {
    return null;
  }
};

export const createVerificationToken = async (
  email: string,
  token: string,
  expires: Date,
) => {
  try {
    const verificationToken = await db
      .insert(verificationTokens)
      .values({
        email,
        token,
        expires,
      })
      .returning({
        email: verificationTokens.email,
        token: verificationTokens.token,
      });

    return verificationToken;
  } catch {
    return null;
  }
};
