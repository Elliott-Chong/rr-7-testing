import { getAuth } from "@clerk/react-router/ssr.server";
import { redirect } from "react-router";
import { Route } from "./+types/sync-user";
import { clerkClient } from "@/lib/clerkClient";
import db from "@/.server/db/drizzle";
import { users } from "@/.server/db/schema";

export const loader = async (loaderArgs: Route.LoaderArgs) => {
  const { userId } = await getAuth(loaderArgs);

  if (!userId) {
    return redirect("/not-found");
  }

  const user = await clerkClient.users.getUser(userId);
  await db
    .insert(users)
    .values({
      id: userId,
      emailAddress: user.emailAddresses[0].emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
    })
    .onConflictDoUpdate({
      target: users.id,
      set: {
        emailAddress: user.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });

  return redirect("/");
};
