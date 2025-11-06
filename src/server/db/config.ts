import { env } from "@/env";

/**
 * Configure process.env.POSTGRES_URL before @vercel/postgres reads it.
 * This module must be imported before any @vercel/postgres imports.
 *
 * @vercel/postgres reads process.env.POSTGRES_URL at module initialization,
 * so we need to set it based on VERCEL_ENV before that happens.
 */
const databaseUrl =
  env.VERCEL_ENV === "production" ? env.POSTGRES_URL : env.DEV_DATABASE_URL;

// Set process.env.POSTGRES_URL so @vercel/postgres uses the correct database
process.env.POSTGRES_URL = databaseUrl;

export {};
