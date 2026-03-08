import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../src/server/db/schema";

// Type for any table in the schema
type SchemaTable =
  | typeof schema.users
  | typeof schema.accounts
  | typeof schema.sessions
  | typeof schema.videos
  | typeof schema.videoLists
  | typeof schema.videosToVideoLists
  | typeof schema.verificationTokens
  | typeof schema.twoFactor;

/**
 * Script to copy all tables and data from production database to development database.
 *
 * Usage:
 * 1. Set POSTGRES_URL_PROD environment variable to your production database URL
 * 2. Set POSTGRES_URL_DEV environment variable to your development database URL
 * 3. Run: npm run db:copy-prod-to-dev
 *
 * Or set environment variables inline:
 * POSTGRES_URL_PROD="your-prod-url" POSTGRES_URL_DEV="your-dev-url" npm run db:copy-prod-to-dev
 *
 * Note: You can also use POSTGRES_URL for production and POSTGRES_URL_DEV for development
 */

// Read from environment variables directly (more flexible for utility scripts)
const POSTGRES_URL_PROD = process.env.POSTGRES_URL;
const POSTGRES_URL_DEV = process.env.POSTGRES_URL_DEV;

if (!POSTGRES_URL_PROD || !POSTGRES_URL_DEV) {
  console.error(
    "❌ Error: Both production and development database URLs must be set",
  );
  console.error("");
  console.error("Required environment variables:");
  console.error(
    "  - POSTGRES_URL_PROD (or POSTGRES_URL) - Production database URL",
  );
  console.error("  - POSTGRES_URL_DEV - Development database URL");
  console.error("");
  console.error("Usage examples:");
  console.error(
    "  POSTGRES_URL_PROD='...' POSTGRES_URL_DEV='...' npm run db:copy-prod-to-dev",
  );
  console.error(
    "  POSTGRES_URL='...' POSTGRES_URL_DEV='...' npm run db:copy-prod-to-dev",
  );
  process.exit(1);
}

// At this point, TypeScript knows these are defined, but we need to assert for type safety
const PROD_URL: string = POSTGRES_URL_PROD;
const DEV_URL: string = POSTGRES_URL_DEV;

// Create database connections using postgres package
const prodClient = postgres(PROD_URL, { max: 1 });
const devClient = postgres(DEV_URL, { max: 1 });

const prodDb = drizzle(prodClient, { schema });
const devDb = drizzle(devClient, { schema });

// Define tables in order of dependencies (parent tables first)
const tables = [
  { name: "users", table: schema.users },
  { name: "videos", table: schema.videos },
  { name: "account", table: schema.accounts },
  { name: "session", table: schema.sessions },
  { name: "video_lists", table: schema.videoLists },
  { name: "verification_tokens", table: schema.verificationTokens },
  { name: "two_factor", table: schema.twoFactor },
  { name: "video_to_video_list", table: schema.videosToVideoLists },
] as const;

async function copyTable(tableName: string, table: SchemaTable) {
  console.log(`\n📋 Copying table: ${tableName}...`);

  try {
    // First, get all data from production
    const prodData = await prodDb.select().from(table);

    if (prodData.length === 0) {
      console.log(
        `  ⚠️  Table ${tableName} is empty in production, skipping...`,
      );
      return;
    }

    console.log(`  ✅ Found ${prodData.length} rows in production`);

    // Clear existing data in development (optional - comment out if you want to append)
    await devDb.delete(table);
    console.log(`  🗑️  Cleared existing data in development`);

    // Insert data into development in batches to avoid memory issues
    // Type assertion needed because select() returns a different shape than insert() expects
    // The data structures are compatible at runtime, but TypeScript types differ
    const batchSize = 100;
    for (let i = 0; i < prodData.length; i += batchSize) {
      const batch = prodData.slice(i, i + batchSize);
      // Type assertion: select() data is compatible with insert() at runtime
      await devDb
        .insert(table)
        .values(
          batch as unknown as Parameters<
            typeof devDb.insert
          >[0]["$inferInsert"][],
        );
      console.log(
        `  📥 Inserted batch ${Math.floor(i / batchSize) + 1} (${batch.length} rows)`,
      );
    }

    console.log(
      `  ✅ Successfully copied ${prodData.length} rows to development`,
    );
  } catch (error) {
    console.error(`  ❌ Error copying table ${tableName}:`, error);
    throw error;
  }
}

async function main() {
  console.log("🚀 Starting database copy from production to development...");
  console.log(`📊 Production DB: ${PROD_URL.substring(0, 30)}...`);
  console.log(`📊 Development DB: ${DEV_URL.substring(0, 30)}...`);

  try {
    // Copy tables in order
    for (const { name, table } of tables) {
      await copyTable(name, table);
    }

    console.log(
      "\n✅ Successfully copied all tables and data from production to development!",
    );
    console.log(
      "\n⚠️  Note: Make sure your development database schema is up to date.",
    );
    console.log("   Run: npm run db:push");
  } catch (error) {
    console.error("\n❌ Error during copy operation:", error);
    process.exit(1);
  } finally {
    // Close connections
    await prodClient.end();
    await devClient.end();
    process.exit(0);
  }
}

main();
