import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="min-h-screen grid place-items-center">
      <SignIn />
    </main>
  );
}
