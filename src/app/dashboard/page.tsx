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
import { UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";

export default function Dashboard() {
  return (
    <main>
      <nav className="h-16 items-center flex justify-between px-8">
        <TypographyH4>Matter</TypographyH4>
        <UserButton afterSignOutUrl="/" />
      </nav>
      <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
        <span>You don&apos;t have any workspaces at the moment</span>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" className="mt-4 flex gap-2">
              <Plus size={16} /> Create Workspace
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
      </section>
    </main>
  );
}
