import { Resend } from "resend";
import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);
const domain = env.APP_DOMAIN;

/**
 * Send a verification email.
 * Used for email verification.
 * Token is the verification token.
 * @param email - The email address to send the email to
 * @param token - The token to send in the email
 */
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "mail@theflixsearch.com",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

/**
 * Send a password reset email
 * Used for password reset.
 * Token is the password reset token.
 * @param email - The email address to send the email to
 * @param token - The token to send in the email
 */
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "mail@theflixsearch.com",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

/**
 * Send a two-factor email
 * Used for two-factor authentication.
 * Token is the 2FA code.
 * @param email - The email address to send the email to
 * @param token - The token to send in the email
 */
export const sendTwoFactorEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "mail@theflixsearch.com",
    to: email,
    subject: "2FA code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};
