import WorkspaceForm from "@/components/workspace-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TypographyH2, TypographyH4 } from "@/components/ui/typography";
import { UserButton, currentUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { db } from "@/db/connection";
import { user, workspace } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fetchWorkspaces = async () => {
  const signedInUser = await currentUser();
  const email = signedInUser?.emailAddresses[0].emailAddress;

  if (!email) {
    NextResponse.redirect("/login");
  }

  const users = await db.select().from(user).where(eq(user.email, email!));

  if (users.length === 0) {
    NextResponse.redirect("/login");
  }

  const workspaces = await db
    .select()
    .from(workspace)
    .where(eq(workspace.ownerId, users[0].id));

  return workspaces;
};

export default async function Dashboard() {
  const workspaces = await fetchWorkspaces();

  return (
    <main>
      <nav className="h-16 items-center flex justify-between px-8">
        <TypographyH4>Matter</TypographyH4>
        <UserButton afterSignOutUrl="/" />
      </nav>
      <section className="min-h-[calc(100vh-4rem)] p-8">
        <div className="flex items-center gap-4">
          <TypographyH2>Workspaces</TypographyH2>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="default" className="">
                <Plus />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Create workspace</SheetTitle>
                <SheetDescription>
                  You can create as many workspaces as you want
                </SheetDescription>
              </SheetHeader>
              <div className="py-8">
                <WorkspaceForm />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="p-2"></div>
        {workspaces.length === 0 ? (
          <section className="fixed top-0 bottom-0 left-0 right-0 grid place-items-center">
            <span>You don&apos;t have any workspaces at the moment</span>
          </section>
        ) : (
          <div className="flex flex-wrap gap-8 pt-8">
            {workspaces.map((ws) => (
              <Button
                key={ws.id}
                variant="secondary"
                className="min-w-[200px] min-h-[100px]"
              >
                {ws.name}
              </Button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
