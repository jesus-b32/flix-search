import { relations } from "drizzle-orm";
import {
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  pgEnum,
  unique,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

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
  name: text("name"),
  // username: text("username").unique(),
  email: text("email").unique(),
  password: text("password"),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
});

// one to many relationship between users and accounts tables
// one to many relationship between users and video lists tables
export const usersRelations = relations(users, ({ many }) => ({
  // accounts: many(accounts),
  videoLists: many(videoLists),
}));

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

// export const accountsRelations = relations(accounts, ({ one }) => ({
//   user: one(users, { fields: [accounts.userId], references: [users.id] }),
// }));

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

// export const sessionsRelations = relations(sessions, ({ one }) => ({
//   user: one(users, { fields: [sessions.userId], references: [users.id] }),
// }));

/**
 * Tables for videos, video lists, and the many-many relationship between them
 */
//junction table for videos to video lists tables
export const videosToVideoLists = createTable(
  "video_to_video_list",
  {
    videoListId: integer("video_list_id")
      .notNull()
      .references(() => videoLists.id, { onDelete: "cascade" }),
    videoId: integer("video_id")
      .notNull()
      .references(() => videos.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.videoListId, t.videoId],
    }),
  }),
);

// many to one relationship between videosToVideoLists table and video table
// many to one relationship between videosToVideoLists table and videoList table
export const videosToVideoListsRelations = relations(
  videosToVideoLists,
  ({ one }) => ({
    videoList: one(videoLists, {
      fields: [videosToVideoLists.videoListId],
      references: [videoLists.id],
    }),
    video: one(videos, {
      fields: [videosToVideoLists.videoId],
      references: [videos.id],
    }),
  }),
);

// custom enum type for media type column in videos table
export const mediaTypeEnum = pgEnum("media_type", ["movie", "tv"]);

// videos table
export const videos = createTable(
  "videos",
  {
    id: serial("id").primaryKey(),
    tmdbId: integer("tmdb_id").notNull(),
    mediaType: mediaTypeEnum("media_type").notNull(),
    title: text("title").notNull(),
    overview: text("overview"),
    releaseDate: text("release_date"),
    posterPath: text("poster_path"),
  },
  (t) => ({
    unq: unique().on(t.tmdbId, t.mediaType),
  }),
);

// one to many relationship between videos and videosToVideoLists tables
export const videosRelations = relations(videos, ({ many }) => ({
  videosToVideoLists: many(videosToVideoLists),
}));

// video lists table
export const videoLists = createTable(
  "video_lists",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
  },
  (t) => ({
    unq: unique().on(t.userId, t.name),
  }),
);

// many to one relationship between videoLists and users table
// one to many relationship between videoLists and videosToVideoLists tables
export const videoListsRelations = relations(videoLists, ({ one, many }) => ({
  user: one(users, { fields: [videoLists.userId], references: [users.id] }),
  videosToVideoLists: many(videosToVideoLists),
}));
