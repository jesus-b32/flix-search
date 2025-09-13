import { z } from "zod";

/**
 * Login schema.
 * Used for user login.
 * @returns - The login schema
 */
export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.optional(z.string()),
});

/**
 * Register schema.
 * Used for user registration.
 * @returns - The register schema
 */
export const RegisterSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Email is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/**
 * Reset password schema.
 * Used for password reset.
 * @returns - The reset password schema
 */
export const ResetPasswordSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

/**
 * New password from email schema.
 * Used for password reset.
 * @returns - The new password from email schema
 */
export const NewPasswordFromEmailSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/**
 * New image schema.
 * Used for updating user image.
 * @returns - The new image schema
 */
export const NewImageSchema = z.object({
  image: z.string().url({ message: "Invalid image url" }),
});

/**
 * New email schema.
 * Used for updating user email.
 * @returns - The new email schema
 */
export const NewEmailSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

/**
 * New name schema.
 * Used for updating user name.
 * @returns - The new name schema
 */
export const NewNameSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

/**
 * New password schema.
 * Used for updating user password.
 * @returns - The new password schema
 */
export const NewPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: "Password is required" }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmNewPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

/**
 * Two factor schema.
 * Used for updating user two factor.
 * @returns - The two factor schema
 */
export const TwoFactorSchema = z.object({
  twoFactor: z.boolean(),
});

/**
 * Delete account schema.
 * Used for deleting user account.
 * @returns - The delete account schema
 */
export const DeleteAccountSchema = z.object({
  password: z.string().optional(),
});
