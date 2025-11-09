import { createAuthClient } from "better-auth/react";
import { twoFactorClient } from "better-auth/client/plugins";
import { emailOTPClient } from "better-auth/client/plugins";
import { env } from "@/env";

export const authClient = createAuthClient({
  baseURL: env.BETTER_AUTH_URL,
  plugins: [twoFactorClient(), emailOTPClient()],
});

// Export commonly used methods for convenience
export const { signIn, signOut, useSession } = authClient;
