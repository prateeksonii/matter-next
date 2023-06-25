import { db } from "@/db/connection";
import { workspaces } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { name: string } }
) {
  const { name } = params;

  const existingWorkspace = await db
    .select({
      name: workspaces.name,
    })
    .from(workspaces)
    .where(eq(workspaces.name, name))
    .limit(1);

  if (existingWorkspace.length === 0) {
    return NextResponse.json(
      {
        ok: false,
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    ok: true,
    workspace: existingWorkspace.values(),
  });
}
