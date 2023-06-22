import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const { userId } = auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="h-screen grid place-items-center">
      <div>
        <TypographyH1>A friendly companion for your projects</TypographyH1>
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button asChild size="lg">
            <Link href="/sign-up">Get started</Link>
          </Button>
          <Button size="lg" variant="outline">
            Learn more
          </Button>
        </div>
      </div>
    </main>
  );
}
