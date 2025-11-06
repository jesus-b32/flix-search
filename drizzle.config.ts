import { type Config } from "drizzle-kit";

import { env } from "@/env";

const databaseUrl =
  env.VERCEL_ENV === "production" ? env.POSTGRES_URL : env.DEV_DATABASE_URL;

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
  tablesFilter: ["flix_search_*"],
} satisfies Config;
