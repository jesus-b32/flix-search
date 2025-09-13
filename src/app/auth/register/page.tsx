// Next.js
import { type Metadata } from "next";

// Custom Components
import { RegisterForm } from "@/components/auth/RegisterForm";

/**
 * The metadata for the register page.
 */
export const metadata: Metadata = {
  title: "Register",
};

/**
 * The register page for new users registering.
 *
 * @returns the register page
 */
export default function RegisterPage() {
  return <RegisterForm />;
}
