import { createAuthClient } from "better-auth/react";
import { twoFactorClient } from "better-auth/client/plugins";
import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [twoFactorClient(), emailOTPClient()],
});

// Export commonly used methods for convenience
export const { signIn, signOut, useSession } = authClient;
