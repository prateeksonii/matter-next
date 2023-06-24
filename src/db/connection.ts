import mysql from "mysql2";
import { drizzle, MySql2Database } from "drizzle-orm/mysql2";

const dbConn = mysql.createPool(process.env.DATABASE_URL!);

export const db: MySql2Database = drizzle(dbConn, {
  logger: true,
});
