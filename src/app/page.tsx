import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";

export default function Home() {
  return (
    <main className="h-screen grid place-items-center">
      <div>
        <TypographyH1>A friendly companion for your projects</TypographyH1>
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button size="lg">Get started</Button>
          <Button size="lg" variant="outline">
            Learn more
          </Button>
        </div>
      </div>
    </main>
  );
}
