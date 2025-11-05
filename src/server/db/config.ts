import { env } from "@/env";

/**
 * Configure process.env.POSTGRES_URL before @vercel/postgres reads it.
 * This module must be imported before any @vercel/postgres imports.
 *
 * @vercel/postgres reads process.env.POSTGRES_URL at module initialization,
 * so we need to set it based on ENV_TYPE before that happens.
 */
const databaseUrl =
  env.ENV_TYPE === "production" ? env.POSTGRES_URL : env.POSTGRES_URL_DEV!;

// Set process.env.POSTGRES_URL so @vercel/postgres uses the correct database
process.env.POSTGRES_URL = databaseUrl;

export {};
