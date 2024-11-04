import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `flix_search_${name}`);

// export const posts = createTable(
//   "post",
//   {
//     id: serial("id").primaryKey(),
//     name: varchar("name", { length: 256 }),
//     createdById: varchar("created_by", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     createdAt: timestamp("created_at", { withTimezone: true })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
//       () => new Date(),
//     ),
//   },
//   (example) => ({
//     createdByIdIdx: index("created_by_idx").on(example.createdById),
//     nameIndex: index("name_idx").on(example.name),
//   }),
// );

export const users = createTable("users", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: varchar("username", { length: 255 }),
  passwordHash: varchar("password_hash", { length: 255 }),
  // email: varchar("email", { length: 255 }).notNull(),
  // emailVerified: timestamp("email_verified", {
  //   mode: "date",
  //   withTimezone: true,
  // }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  videoLists: many(videoLists),
}));

/**
 * Tables for videos, video lists, and the many-many relationship between them
 */
//junction table for videos to video lists tables
export const videosToVideoLists = createTable(
  "video_to_video_list",
  {
    videoListId: integer("video_list_id")
      .notNull()
      .references(() => videoLists.id),
    videoId: integer("video_id")
      .notNull()
      .references(() => videos.id),
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
    tmdb_id: integer("id").notNull(),
    mediaType: mediaTypeEnum("mediaType").notNull(),
  },
  // (videos) => ({
  //   pk: primaryKey({ columns: [videos.id, videos.mediaType] }),
  // }),
);

// one to many relationship between videos and videosToVideoLists tables
export const videosRelations = relations(videos, ({ many }) => ({
  videosToVideoLists: many(videosToVideoLists),
}));

// video lists table
export const videoLists = createTable("video_lists", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  name: varchar("name", { length: 255 }).notNull(),
});

// many to one relationship between videoLists and users table
// one to many relationship between videoLists and videosToVideoLists tables
export const videoListsRelations = relations(videoLists, ({ one, many }) => ({
  user: one(users, { fields: [videoLists.userId], references: [users.id] }),
  videosToVideoLists: many(videosToVideoLists),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
