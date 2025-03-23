import { db } from "@/server/db";
import { twoFactorConfirmations } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation =
      await db.query.twoFactorConfirmations.findFirst({
        where: eq(twoFactorConfirmations.userId, userId),
      });
    return twoFactorConfirmation;
  } catch {
    return null;
  }
};

export const deleteTwoFactorConfirmation = async (id: string) => {
  try {
    await db
      .delete(twoFactorConfirmations)
      .where(eq(twoFactorConfirmations.id, id));
    return true;
  } catch {
    return null;
  }
};

export const createTwoFactorConfirmation = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db
      .insert(twoFactorConfirmations)
      .values({
        userId,
      });

    return true;
  } catch {
    return null;
  }
};
