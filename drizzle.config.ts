import { type Config } from "drizzle-kit";

import { env } from "@/env";

const databaseUrl =
  env.ENV_TYPE === "production" ? env.POSTGRES_URL : env.POSTGRES_URL_DEV!;

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
  tablesFilter: ["flix_search_*"],
} satisfies Config;
