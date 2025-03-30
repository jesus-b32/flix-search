"use server";

import type * as z from "zod";
import { LoginSchema } from "@/schemas/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/lib/generateToken";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail, sendTwoFactorEmail } from "@/lib/sendEmail";
import {
  getTwoFactorTokenByEmail,
  deleteTwoFactorToken,
} from "@/data/twoFactorToken";
import {
  getTwoFactorConfirmationByUserId,
  deleteTwoFactorConfirmation,
  createTwoFactorConfirmation,
} from "@/data/twoFactorConfirmation";

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

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser?.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  // prevent user from logging in if email not verified and email verification
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );
    if (!verificationToken)
      return { error: "Error generating verification token!" };
    if (!verificationToken[0]?.token || !verificationToken[0]?.email) {
      return { error: "Error generating verification token!" };
    }

    await sendVerificationEmail(
      verificationToken[0].email,
      verificationToken[0].token,
    );

    return { success: "Confirmation email sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Invalid code!" };
      }

      //check if token generated matches code user entered
      if (twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        return { error: "Code expired!" };
      }

      await deleteTwoFactorToken(twoFactorToken.id);

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      );
      if (existingConfirmation) {
        await deleteTwoFactorConfirmation(existingConfirmation.id);
      }

      await createTwoFactorConfirmation(existingUser.id);
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      if (!twoFactorToken) return { error: "Error generating 2FA token!" };
      if (!twoFactorToken[0]?.token || !twoFactorToken[0]?.email) {
        return { error: "Error generating 2FA token!" };
      }
      await sendTwoFactorEmail(
        twoFactorToken[0].email,
        twoFactorToken[0].token,
      );

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials!",
          };
        default:
          return {
            error: "Something went wrong!",
          };
      }
    }
    //need to throw the error in order to redirect
    throw error;
  }
};
