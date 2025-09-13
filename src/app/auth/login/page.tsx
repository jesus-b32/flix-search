// Next.js
import { type Metadata } from "next";

// Custom Components
import { LoginForm } from "@/components/auth/LoginForm";

/**
 * The metadata for the login page.
 */
export const metadata: Metadata = {
  title: "Login",
};

/**
 * The login page for user logging in.
 *
 * @returns the login page
 */
export default function LoginPage() {
  return <LoginForm />;
}
