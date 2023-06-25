import { db } from "@/db/connection";
import { users } from "@/db/schema";
import { UserCreatedEvent } from "@/model/dto/user-created-event";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as UserCreatedEvent;

  if (!body.data) {
    return NextResponse.error();
  }

  if (body.type === "user.created") {
    const { id, first_name, last_name, email_addresses } = body.data;

    const emailAddress = email_addresses[0].email_address;

    const existingUser = await db
      .select({
        email: users.email,
      })
      .from(users)
      .where(eq(users.email, emailAddress))
      .limit(1);

    if (existingUser.length > 0) {
      await db.update(users).set({
        clerkId: id,
        firstName: first_name,
        lastName: last_name,
      });
    } else {
      await db.insert(users).values({
        clerkId: id,
        firstName: first_name,
        lastName: last_name,
        email: emailAddress,
      });
    }
  }

  return NextResponse.json({
    ok: true,
  });
}
