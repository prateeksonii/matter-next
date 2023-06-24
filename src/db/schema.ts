import { InferModel, sql } from "drizzle-orm";
import {
  mysqlTable,
  int,
  varchar,
  uniqueIndex,
  serial,
  datetime,
} from "drizzle-orm/mysql-core";

export const user = mysqlTable(
  "users",
  {
    id: int("id").autoincrement().primaryKey(),
    clerkId: varchar("clerk_id", { length: 50 }).notNull(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
  },
  (users) => ({
    clerkIdx: uniqueIndex("users_clerkIdx").on(users.clerkId),
  })
);

export type User = InferModel<typeof user>;

export const workspace = mysqlTable(
  "workspaces",
  {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    ownerId: int("owner_id")
      .notNull()
      .references(() => user.id),
    createdAt: datetime("created_at").default(sql`NOW()`),
  },
  (workspaces) => ({
    nameIdx: uniqueIndex("workspaces_nameIdx").on(workspaces.name),
  })
);
