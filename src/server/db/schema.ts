import {
  integer,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  pgEnum,
  unique,
  uuid,
  uniqueIndex,
  boolean,
} from "drizzle-orm/pg-core";
// Removed NextAuth adapter type - using Better Auth now

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `flix_search_${name}`);

export const users = createTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    // Password moved to account table (Better Auth stores passwords there)
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    isTwoFactorEnabled: boolean("isTwoFactorEnabled").default(false),
  },
  (t) => {
    return {
      // create an unique index on the email column to make queries faster
      emailIndex: uniqueIndex("email_index").on(t.email),
    };
  },
);

/**
 * Accounts table - keeping NextAuth structure for migration
 * Better Auth will map fields via adapter configuration
 * According to migration guide: map provider -> providerId, providerAccountId -> accountId, etc.
 */
export const accounts = createTable(
  "account",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: timestamp("expires_at"),
    scope: text("scope"),
    id_token: text("id_token"),
    password: text("password"), // Better Auth stores passwords here with providerId = 'credential'
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

/**
 * Sessions table - keeping NextAuth structure for migration
 * Better Auth will map: sessionToken -> token, expires -> expiresAt
 * According to migration guide: only add createdAt and updatedAt
 */
export const sessions = createTable("session", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

/**
 * Tables for videos, video lists, and the many-many relationship between them
 */
//junction table for videos to video lists tables
export const videosToVideoLists = createTable(
  "video_to_video_list",
  {
    videoListId: uuid("video_list_id")
      .references(() => videoLists.id, { onDelete: "cascade" })
      .notNull(),
    videoId: uuid("video_id")
      .references(() => videos.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => {
    return {
      pk: primaryKey({
        columns: [t.videoListId, t.videoId],
      }),
    };
  },
);

// custom enum type for media type column in videos table
export const mediaTypeEnum = pgEnum("media_type", ["movie", "tv"]);

// videos table
export const videos = createTable(
  "videos",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tmdbId: integer("tmdb_id").notNull(),
    mediaType: mediaTypeEnum("media_type").notNull(),
    title: text("title").notNull(),
    overview: text("overview").notNull(),
    releaseDate: text("release_date").notNull(),
    posterPath: text("poster_path").notNull(),
  },
  (t) => ({
    unq: unique().on(t.tmdbId, t.mediaType),
  }),
);

// video lists table
export const videoLists = createTable(
  "video_lists",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
  },
  (t) => ({
    unq: unique().on(t.userId, t.name),
  }),
);

export const verificationTokens = createTable(
  "verification_tokens",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email"),
    token: text("token").unique(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (t) => ({
    unq: unique().on(t.email, t.token),
  }),
);

export const passwordResetTokens = createTable(
  "password_reset_tokens",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email"),
    token: text("token").unique(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (t) => ({
    unq: unique().on(t.email, t.token),
  }),
);

export const twoFactorTokens = createTable(
  "two-factor-tokens",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email"),
    token: text("token").unique(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (t) => ({
    unq: unique().on(t.email, t.token),
  }),
);

export const twoFactorConfirmations = createTable("two-factor-confirmations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
});
