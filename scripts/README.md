# Database Copy Scripts

This directory contains scripts to copy data from your production database to your development database.

## Method 1: TypeScript Script (Used this)

This script uses Drizzle ORM to copy all tables and data while respecting foreign key relationships.

### Prerequisites

1. Install dependencies (if you haven't already):

   ```bash
   npm install
   ```

2. Make sure your development database schema is up to date:
   ```bash
   npm run db:push
   ```

### Usage

Set the environment variables and run the script:

```bash
POSTGRES_URL_PROD="your-production-database-url" \
POSTGRES_URL_DEV="your-development-database-url" \
npm run db:copy-prod-to-dev
```

Or export them first:

```bash
export POSTGRES_URL_PROD="your-production-database-url"
export POSTGRES_URL_DEV="your-development-database-url"
npm run db:copy-prod-to-dev
```

### What it does

1. Connects to both production and development databases
2. Copies all tables in the correct order (respecting foreign key dependencies)
3. Clears existing data in development tables before copying
4. Inserts data in batches to avoid memory issues

**Note:** The script will delete all existing data in the development database tables before copying. Make sure you're okay with this!

## Method 2: PostgreSQL pg_dump (Recommended for Neon)

Following the [Neon guide for copying databases](https://neon.com/postgresql/postgresql-administration/postgresql-copy-database), this method uses PostgreSQL's native `pg_dump` and `psql` tools to copy the entire database from one Neon server to another.

### Prerequisites

- `pg_dump` and `psql` installed on your system (usually included with PostgreSQL)
- Local pg_dumb version and PostgreSQL version on Neon must match major version
- Access to both Neon database connection strings
- Development database must already exist (create it in Neon dashboard first)

### Usage

**Important:** Make sure your development database schema is up to date before copying data:

```bash
npm run db:push
```

Then run the shell script:

```bash
POSTGRES_URL="your-production-neon-url" \
POSTGRES_URL_DEV="your-development-neon-url" \
./scripts/copy-prod-to-dev.sh
```

Or export the variables first:

```bash
export POSTGRES_URL="your-production-neon-url"
export POSTGRES_URL_DEV="your-development-neon-url"
./scripts/copy-prod-to-dev.sh
```

### What the script does

Following the Neon guide, the script performs these steps:

1. **Step 1: Dump production database**

   - Uses `pg_dump -d "$POSTGRES_URL"` to create a SQL dump file
   - Includes schema and data
   - Saves to a temporary file

2. **Step 2: Restore to development database**
   - Uses `psql -d "$POSTGRES_URL_DEV" -f dump_file.sql` to restore
   - Restores both schema and data to the development database

### Manual Process (if you prefer)

If you want to do it manually following the [Neon guide](https://neon.com/postgresql/postgresql-administration/postgresql-copy-database):

1. **Dump the production database:**

   ```bash
   pg_dump -d "$POSTGRES_URL" -O -x > prod_dump.sql
   ```

2. **Restore to development database:**

   ```bash
   psql -d "$POSTGRES_URL_DEV" -f prod_dump.sql
   ```

3. **Clean up:**
   ```bash
   rm prod_dump.sql
   ```

### For Fast Connections (Pipe Method)

If both databases are on fast connections, you can use the pipe method from the Neon guide:

```bash
pg_dump -C -d "$POSTGRES_URL" | psql -d "$POSTGRES_URL_DEV"
```

Note: The `-C` flag includes CREATE DATABASE, but since your development database already exists, this will show an error that can be ignored.

## Getting Your Database URLs

### From Vercel Dashboard

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Find `POSTGRES_URL` for both production and development environments

### From Neon Dashboard

1. Go to your Neon project dashboard
2. Select your database
3. Go to **Connection Details**
4. Copy the connection string (it will look like: `postgresql://user:password@host:port/database`)

## Troubleshooting

### "Table does not exist" errors

Make sure your development database schema is up to date:

```bash
npm run db:push
```

### Connection errors

- Verify your database URLs are correct
- Check that both databases are accessible from your network
- For Neon databases, make sure your IP is allowed (or use connection pooling)

### Foreign key constraint errors

The TypeScript script should handle this automatically by copying tables in the correct order. If you encounter issues, try running `npm run db:push` again to ensure the schema is correct.
