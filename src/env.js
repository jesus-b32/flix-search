import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
/**
 * This file is compiled into a rollup config file when used with `create-t3-app`.
 * Learn more at: https://create.t3.gg/en/usage/env-variables
 * TLDR:
 *  This files makes our environment variables type safe and consistent in all environments
 *  If you want to add a new environment variable, you must add a validator for it in src/env.js, and then add the KV-pair in .env
 */
export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    POSTGRES_URL: z.string().url(),
    ENV_TYPE: z
      .enum(["development", "test", "production"])
      .default("development"),
    AUTH_SECRET:
      process.env.ENV_TYPE === "production"
        ? z.string()
        : z.string().optional(),
    AUTH_TRUST_HOST: z.enum(["true", "false"]),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    // NEXTAUTH_URL: z.preprocess(
    //   // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
    //   // Since NextAuth.js automatically uses the VERCEL_URL if present.
    //   (str) => process.env.VERCEL_URL ?? str,
    //   // VERCEL_URL doesn't include `https` so it cant be validated as a URL
    //   process.env.VERCEL ? z.string() : z.string().url(),
    // ),
    RESEND_API_KEY: z.string(),
    TMDB_API_KEY: z.string(),
    APP_DOMAIN: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    POSTGRES_URL: process.env.POSTGRES_URL,
    ENV_TYPE: process.env.ENV_TYPE,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
    GITHUB_CLIENT_ID:
      process.env.ENV_TYPE === "production"
        ? process.env.GITHUB_CLIENT_ID_PROD
        : process.env.GITHUB_CLIENT_ID_DEV,
    GITHUB_CLIENT_SECRET:
      process.env.ENV_TYPE === "production"
        ? process.env.GITHUB_CLIENT_SECRET_PROD
        : process.env.GITHUB_CLIENT_SECRET_DEV,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    APP_DOMAIN: process.env.APP_DOMAIN,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
