import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { accounts } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const updateUserEmailVerified = async (id: string) => {
  try {
    await db
      .update(users)
      .set({ emailVerified: new Date() })
      .where(eq(users.id, id));
    return true;
  } catch (error) {
    return null;
  }
};

export const deleteUserById = async (id: string) => {
  try {
    await db.delete(users).where(eq(users.id, id));
    return true;
  } catch (error) {
    return null;
  }
};

export const isOauthUser = async (id: string) => {
  try {
    const account = await db.query.accounts.findFirst({
      where: eq(accounts.userId, id),
    });

    if (!account) return false;

    return true;
  } catch (error) {
    return null;
  }
};

export const updateUserImage = async (id: string, imageUrl: string) => {
  try {
    await db.update(users).set({ image: imageUrl }).where(eq(users.id, id));
    return true;
  } catch (error) {
    return null;
  }
};
