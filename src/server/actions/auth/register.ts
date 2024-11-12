"use server";

import type * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
// import { eq } from "drizzle-orm";

import { getUserByEmail } from "@/data/user";

/**
 * Validates the form values and returns a success message or an error message
 *
 * @param values - the form values of the new user
 * @returns an object with a success message or an error message
 */
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { name, email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: "Email already in use!",
    };
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      password: hashPassword,
    });
    // ...
  } catch {
    // Handle the error, for example:
    return {
      error: "Error creating user!",
    };
  }

  //TODO: send verification token email

  return {
    success: "User created!",
  };
};
