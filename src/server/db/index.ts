// IMPORTANT: Import config first to set process.env.POSTGRES_URL
// before @vercel/postgres reads it
import "./config";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";

// Use this object to send drizzle queries to your DB
// @vercel/postgres will now use the correct database URL set in config.ts
export const db = drizzle(sql, { schema });
