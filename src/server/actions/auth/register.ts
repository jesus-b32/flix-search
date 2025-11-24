"use server";

import type * as z from "zod";
import { RegisterSchema } from "@/schemas/schema";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { env } from "@/env";

/**
 * Validates the form values and signs up a new user using Better Auth's signUpEmail API.
 * Better Auth handles user creation, password hashing, and email verification automatically.
 * The video list creation is handled by the after hook in auth.ts.
 * Returns a success or error message.
 */
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    // Use Better Auth's signUpEmail API
    // Better Auth handles user creation, password hashing, and email verification
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: `${env.BETTER_AUTH_URL}/`,
      },
      headers: headers(),
    });

    return {
      success: "Confirmation email sent!",
    };
  } catch (error) {
    // Better Auth will throw an error if email already exists or validation fails
    if (error instanceof Error) {
      // Check for common error messages
      if (
        error.message.includes("email") &&
        (error.message.includes("already") || error.message.includes("exists"))
      ) {
        return { error: "Email already in use!" };
      }
      if (error.message.includes("password")) {
        return { error: "Password does not meet requirements." };
      }
      return { error: error.message };
    }
    return { error: "Failed to create account. Please try again." };
  }
};
