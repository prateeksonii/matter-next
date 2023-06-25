import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TypographyH1,
  TypographyH2,
  TypographyLead,
} from "@/components/ui/typography";
import { db } from "@/db/connection";
import { User, workspaces } from "@/db/schema";
import { Workspace } from "@/models/workspace";
import { $user, getUser } from "@/stores/user";
import { eq } from "drizzle-orm";
import { allTasks } from "nanostores";
import Link from "next/link";
import { redirect } from "next/navigation";

async function fetchWorkspaceByName(
  name: string,
  user: User | null
): Promise<Workspace[]> {
  // if (!user) {
  //   throw redirect("/");
  // }

  return db
    .select()
    .from(workspaces)
    .where(eq(workspaces.name, name))
    .where(eq(workspaces.ownerId, user!.id))
    .limit(1);
}

export default async function WorkspacePage({
  params,
}: {
  params: {
    name: string;
  };
}) {
  $user.listen(() => {});
  await allTasks();
  const user = getUser();
  const workspaces = await fetchWorkspaceByName(params.name, user);

  if (workspaces.length === 0) {
    redirect("/dashboard");
  }

  const workspace = workspaces[0];

  return (
    <main className="grid grid-cols-[20%_80%] gap-8 px-8">
      <aside>
        <Card>
          <CardHeader>
            <CardTitle>{workspace.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={`/workspace/${workspace.name}`}>Overview</Link>
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={`/workspace/${workspace.name}`}>Projects</Link>
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={`/workspace/${workspace.name}`}>Issues</Link>
                </Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </aside>
      <section>
        <TypographyLead>
          <span className="text-sm">Workspace</span>
        </TypographyLead>
        <TypographyH2>{workspace.name}</TypographyH2>
      </section>
    </main>
  );
}
