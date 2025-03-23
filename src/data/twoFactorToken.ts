import { db } from "@/server/db";
import { twoFactorTokens } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.query.twoFactorTokens.findFirst({
      where: eq(twoFactorTokens.token, token),
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.query.twoFactorTokens.findFirst({
      where: eq(twoFactorTokens.email, email),
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};

export const deleteTwoFactorToken = async (id: string) => {
  try {
    await db.delete(twoFactorTokens).where(eq(twoFactorTokens.id, id));
    return true;
  } catch {
    return null;
  }
};

export const createTwoFactorToken = async (
  email: string,
  token: string,
  expires: Date,
) => {
  try {
    const twoFactorToken = await db
      .insert(twoFactorTokens)
      .values({
        email,
        token,
        expires,
      })
      .returning({
        email: twoFactorTokens.email,
        token: twoFactorTokens.token,
      });

    return twoFactorToken;
  } catch {
    return null;
  }
};
