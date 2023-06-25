import { TypographyH4 } from "@/components/ui/typography";
import { UserButton, currentUser } from "@clerk/nextjs";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="h-16 items-center flex justify-between px-8">
        <TypographyH4>Matter</TypographyH4>
        <UserButton afterSignOutUrl="/" />
      </nav>
      <main>{children}</main>
    </>
  );
}
