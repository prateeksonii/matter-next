import type { Config } from "drizzle-kit";

import dotenv from "dotenv";

dotenv.config();

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  driver: "better-sqlite",
} satisfies Config;
