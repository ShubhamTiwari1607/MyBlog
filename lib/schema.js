import {
  boolean,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/** Better Auth core models — export keys must be: user, session, account, verification */

export const user = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: varchar("image", { length: 500 }),
  createdAt: timestamp("created_at", { mode: "date", fsp: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", fsp: 3 })
    .defaultNow()
    .notNull(),
});

export const session = mysqlTable("sessions", {
  id: varchar("id", { length: 36 }).primaryKey(),
  expiresAt: timestamp("expires_at", { mode: "date", fsp: 3 }).notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { mode: "date", fsp: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", fsp: 3 })
    .defaultNow()
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: varchar("user_id", { length: 36 }).notNull(),
});

export const account = mysqlTable("account", {
  id: varchar("id", { length: 36 }).primaryKey(),
  accountId: varchar("account_id", { length: 255 }).notNull(),
  providerId: varchar("provider_id", { length: 255 }).notNull(),
  userId: varchar("user_id", { length: 36 }).notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", {
    mode: "date",
    fsp: 3,
  }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
    mode: "date",
    fsp: 3,
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at", { mode: "date", fsp: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", fsp: 3 })
    .defaultNow()
    .notNull(),
});

export const verification = mysqlTable("verification", {
  id: varchar("id", { length: 36 }).primaryKey(),
  identifier: varchar("identifier", { length: 255 }).notNull(),
  value: varchar("value", { length: 255 }).notNull(),
  expiresAt: timestamp("expires_at", { mode: "date", fsp: 3 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date", fsp: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", fsp: 3 })
    .defaultNow()
    .notNull(),
});
