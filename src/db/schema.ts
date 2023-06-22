import { InferModel } from "drizzle-orm";
import {
  sqliteTable,
  integer,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const user = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey(),
    clerkId: text("clerk_id").notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
  },
  (users) => ({
    clerkIdx: uniqueIndex("users_clerkIdx").on(users.clerkId),
  })
);

export type User = InferModel<typeof user>;
