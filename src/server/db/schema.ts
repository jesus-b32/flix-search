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
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

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
    name: text("name"),
    email: text("email"),
    password: text("password"),
    emailVerified: timestamp("email_verified", { mode: "date" }),
    image: text("image"),
  },
  (t) => {
    return {
      // create an unique index on the email column to make queries faster
      emailIndex: uniqueIndex("email_index").on(t.email),
    };
  },
);

/**
 * Accounts table for NextAuth authentication
 */
export const accounts = createTable(
  "account",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

/**
 * Sessions table for NextAuth authentication
 */
export const sessions = createTable("session", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
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
