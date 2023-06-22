import { UserButton } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <main>
      <nav className="h-16 items-center flex justify-end px-8">
        <UserButton afterSignOutUrl="/" />
      </nav>
    </main>
  );
}
