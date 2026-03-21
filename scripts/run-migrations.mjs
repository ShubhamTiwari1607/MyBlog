import { config } from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { createPool } from "mysql2/promise";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
config({ path: resolve(root, ".env.local") });
config({ path: resolve(root, ".env") });

const pool = createPool({
  host: process.env.DB_HOST ?? "localhost",
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "blog",
  dateStrings: false,
});

const db = drizzle(pool);
await migrate(db, { migrationsFolder: resolve(root, "drizzle") });
await pool.end();
console.log("Migrations applied.");
