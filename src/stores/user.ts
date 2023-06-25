import { db } from "@/db/connection";
import { User, users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { atom, onMount, task } from "nanostores";

export const $user = atom<User | null>(null);

async function fetchCurrentUser() {
  const user = await currentUser();

  if (!user) return null;

  const dbUser = await db
    .select()
    .from(users)
    .where(eq(users.email, user.emailAddresses[0].emailAddress))
    .limit(1);

  return dbUser.length > 0 ? dbUser[0] : null;
}

onMount($user, () => {
  task(async () => {
    const user = await fetchCurrentUser();
    $user.set(user);
  });
});

export function setUser(user: User | null) {
  $user.set(user);
}

export function getUser() {
  return $user.get();
}
