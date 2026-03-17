import { betterAuth } from "better-auth";
import { createPool } from "mysql2/promise";
import { mysqlAdapter } from "better-auth/adapters/mysql";

const pool = createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "database",
  timezone: "Z",
  waitForConnections: true,
  connectionLimit: 10,
});

export const auth = betterAuth({
  database: mysqlAdapter(pool),

  experimental: { joins: true },

  emailAndPassword: {
    enabled: true,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
  },
});