import { db } from "@/db/connection";
import { user } from "@/db/schema";
import { UserCreatedEvent } from "@/model/dto/user-created-event";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as UserCreatedEvent;

  if (!body.data) {
    return NextResponse.error();
  }

  if (body.type === "user.created") {
    const { id, first_name, last_name, email_addresses } = body.data;

    await db
      .insert(user)
      .values({
        clerkId: id,
        firstName: first_name,
        lastName: last_name,
        email: email_addresses[0].email_address,
      })
      .run();
  }

  return NextResponse.json({
    ok: true,
  });
}
