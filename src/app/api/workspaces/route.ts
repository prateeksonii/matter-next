import { db } from "@/db/connection";
import { user, workspace } from "@/db/schema";
import { insertWorkspaceSchema } from "@/models/workspace";
import { auth, currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  const signedInUser = await currentUser();
  const { name } = (await request.json()) as z.infer<
    typeof insertWorkspaceSchema
  >;

  const email = signedInUser?.emailAddresses[0].emailAddress;

  if (!email) {
    return NextResponse.json(
      {
        ok: false,
        error: "Email not found",
      },
      {
        status: 500,
      }
    );
  }

  const users = await db.select().from(user).where(eq(user.email, email));

  if (users.length === 0) {
    return NextResponse.redirect("/login");
  }
  const insertedWorkspace = await db.insert(workspace).values({
    name,
    ownerId: users[0].id!,
  });

  return NextResponse.json(
    {
      ok: true,
      // workspace: insertedWorkspace.
    },
    {
      status: 201,
    }
  );
}
