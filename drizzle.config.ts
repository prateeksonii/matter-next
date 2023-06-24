import type { Config } from "drizzle-kit";

import dotenv from "dotenv";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./src/db/connection";

dotenv.config();

export default {
  schema: "./src/db/schema.ts",
  out: "./src/drizzle",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  driver: "mysql2",
} satisfies Config;
