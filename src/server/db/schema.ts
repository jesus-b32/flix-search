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

export const users = createTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  twoFactorEnabled: boolean("twoFactorEnabled").default(false),
});

/**
 * Accounts table - keeping NextAuth structure for migration
 * Better Auth will map fields via adapter configuration
 * According to migration guide: map provider -> providerId, providerAccountId -> accountId, etc.
 */
export const accounts = createTable("account", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  providerAccountId: text("provider_account_id").notNull(),
  provider: text("provider").notNull(),
  access_token: text("access_token"),
  refresh_token: text("refresh_token"),
  expires_at: timestamp("expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  id_token: text("id_token"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

/**
 * Sessions table - keeping NextAuth structure for migration
 * Better Auth will map: sessionToken -> token, expires -> expiresAt
 * According to migration guide: only add createdAt and updatedAt
 */
export const sessions = createTable("session", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  sessionToken: text("session_token"),
  expires: timestamp("expires").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
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

/**
 * Verification table - Better Auth structure
 * Maps from NextAuth verificationTokens:
 * - email -> identifier
 * - token -> value
 * - expires -> expiresAt
 * - Added createdAt field (required by Better Auth)
 */
export const verificationTokens = createTable("verification_tokens", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  identifier: text("identifier").notNull(), //email?
  token: text("token").notNull().unique(),
  expires: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// export const passwordResetTokens = createTable(
//   "password_reset_tokens",
//   {
//     id: uuid("id").primaryKey().defaultRandom(),
//     email: text("email"),
//     token: text("token").unique(),
//     expires: timestamp("expires", { mode: "date" }).notNull(),
//   },
//   (t) => ({
//     unq: unique().on(t.email, t.token),
//   }),
// );

// export const twoFactorTokens = createTable(
//   "two-factor-tokens",
//   {
//     id: uuid("id").primaryKey().defaultRandom(),
//     email: text("email"),
//     token: text("token").unique(),
//     expires: timestamp("expires", { mode: "date" }).notNull(),
//   },
//   (t) => ({
//     unq: unique().on(t.email, t.token),
//   }),
// );

// export const twoFactorConfirmations = createTable("two-factor-confirmations", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   userId: text("user_id")
//     .notNull()
//     .unique()
//     .references(() => users.id, { onDelete: "cascade" }),
// });

export const twoFactor = createTable("two_factor", {
  id: uuid("id").primaryKey().defaultRandom(),
  secret: text("secret").notNull(),
  backupCodes: text("backup_codes").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
