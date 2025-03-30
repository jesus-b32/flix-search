import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });
    return user;
  } catch {
    return null;
  }
};

/**
 * Used to update email verified status for all users. Update email as well so this function can be reused when a user wants to modify their email. When user changes email, token is generated with that new email and send verification email to user. Once email is confirmed, then email is updated in db
 */
export const updateUserEmailVerified = async (id: string, email: string) => {
  try {
    await db
      .update(users)
      .set({
        emailVerified: new Date(),
        email: email,
      })
      .where(eq(users.id, id));
    return true;
  } catch {
    return null;
  }
};

export const createNewUser = async (
  name: string,
  email: string,
  hashedPassword: string,
) => {
  try {
    const newUser = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
      });

    return newUser;
  } catch {
    return null;
  }
};

export const deleteUserById = async (id: string) => {
  try {
    await db.delete(users).where(eq(users.id, id));
    return true;
  } catch {
    return null;
  }
};

export const updateUserImage = async (id: string, imageUrl: string) => {
  try {
    await db.update(users).set({ image: imageUrl }).where(eq(users.id, id));
    return true;
  } catch {
    return null;
  }
};

export const updateUserName = async (id: string, name: string) => {
  try {
    await db.update(users).set({ name: name }).where(eq(users.id, id));
    return true;
  } catch {
    return null;
  }
};

export const updateUserEmail = async (id: string, email: string) => {
  try {
    await db
      .update(users)
      .set({ email: email, emailVerified: null })
      .where(eq(users.id, id));
    return true;
  } catch {
    return null;
  }
};

export const updateUserPassword = async (
  id: string,
  hashedPassword: string,
) => {
  try {
    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, id));
    return true;
  } catch {
    return null;
  }
};
