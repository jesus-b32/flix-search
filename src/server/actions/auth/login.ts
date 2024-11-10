"use server";

import type * as z from "zod";
import { LoginSchema } from "@/schemas";

/**
 * Validates the form values and returns a success message or an error message
 *
 * @param values - the form values of the new user
 * @returns an object with a success message or an error message
 */
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  return {
    success: "Email Sent!",
  };
};
