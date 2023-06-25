import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";
import { db } from "@/db/connection";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Matter",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // await migrate(db, {
  //   migrationsFolder: "src/drizzle",
  // });

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
        <head>
          <link rel="preconnect" href="https://rsms.me/" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </head>
        <body className="bg-zinc-900">
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
