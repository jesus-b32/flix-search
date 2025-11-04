#!/bin/bash

# Script to copy database from production to development using pg_dump
# Following Neon guide: https://neon.com/postgresql/postgresql-administration/postgresql-copy-database
# Usage: ./copy-prod-to-dev.sh

set -e

if [ -z "$POSTGRES_URL" ] || [ -z "$POSTGRES_URL_DEV" ]; then
  echo "❌ Error: Both production and development database URLs must be set"
  echo ""
  echo "Required environment variables:"
  echo "  - POSTGRES_URL - Production database URL (from Neon)"
  echo "  - POSTGRES_URL_DEV - Development database URL (from Neon)"
  echo ""
  echo "Usage:"
  echo "  POSTGRES_URL='...' POSTGRES_URL_DEV='...' ./scripts/copy-prod-to-dev.sh"
  exit 1
fi

echo "🚀 Starting database copy from production to development..."
echo "📊 Production DB: ${POSTGRES_URL:0:50}..."
echo "📊 Development DB: ${POSTGRES_URL_DEV:0:50}..."
echo ""

# Create a temporary dump file
DUMP_FILE=$(mktemp --suffix=.sql)
trap "rm -f $DUMP_FILE" EXIT

echo "📥 Step 1: Dumping production database..."
echo "   This may take a few minutes depending on database size..."
echo ""

# Use pg_dump with connection string
# -Fp: plain text format (default)
# -O: no owner (don't include ownership commands)
# -x: no privileges (don't include grant/revoke commands)
# -C: include CREATE DATABASE statement (will be ignored since DB exists)
pg_dump -d "$POSTGRES_URL" \
  -Fp \
  -O \
  -x \
  --verbose \
  > "$DUMP_FILE"

if [ $? -ne 0 ]; then
  echo "❌ Error: Failed to dump production database"
  echo "   Make sure:"
  echo "   1. POSTGRES_URL is correct and accessible"
  echo "   2. You have read permissions on the production database"
  echo "   3. No active connections are blocking the dump"
  exit 1
fi

DUMP_SIZE=$(du -h "$DUMP_FILE" | cut -f1)
echo "✅ Dump completed (size: $DUMP_SIZE)"
echo ""

echo "📤 Step 2: Restoring to development database..."
echo "   This may take a few minutes depending on database size..."
echo ""
echo "   ⚠️  Note: If the development database already has tables, you may see"
echo "      'already exists' errors. These are safe to ignore if you're updating"
echo "      an existing database. For a fresh copy, drop existing tables first."
echo ""

# Use psql with connection string to restore
# Note: If tables already exist, CREATE TABLE statements will fail
# but INSERT statements will still work, so we continue even with some errors
set +e  # Temporarily allow errors for restore
psql -d "$POSTGRES_URL_DEV" \
  -f "$DUMP_FILE" \
  --quiet \
  > /dev/null 2>&1
RESTORE_STATUS=$?
set -e  # Re-enable error checking

# Check if restore was successful
# Exit code 0 = success, 1 = some errors (like "already exists") but may still be OK
if [ $RESTORE_STATUS -ne 0 ] && [ $RESTORE_STATUS -ne 1 ]; then
  echo "❌ Error: Failed to restore to development database (exit code: $RESTORE_STATUS)"
  echo "   Make sure:"
  echo "   1. POSTGRES_URL_DEV is correct and accessible"
  echo "   2. The development database exists"
  echo "   3. You have write permissions on the development database"
  echo "   4. The development database schema matches production"
  exit 1
fi

# If we got here, restore completed (even if there were "already exists" warnings)
if [ $RESTORE_STATUS -eq 1 ]; then
  echo "   ⚠️  Some warnings occurred (likely 'table already exists'), but data should be copied"
fi

echo ""
echo "✅ Successfully copied database from production to development!"
echo ""
echo "⚠️  Note: Make sure your development database schema is up to date:"
echo "   npm run db:push"

