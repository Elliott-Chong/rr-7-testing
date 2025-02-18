import { p } from "@/.server/trpc";
import { tasks } from "@/.server/db/schema";
import { desc, eq } from "drizzle-orm";
import db from "@/.server/db/drizzle";

export const getMyTaskList = p.public.query(async ({ ctx: { userId } }) => {
  // get userId from context
  if (!userId) {
    return { myTaskList: [] };
  }

  const myTaskList = await db.query.tasks.findMany({
    where: eq(tasks.userId, userId),
    orderBy: [desc(tasks.createdAt)],
  });

  return { myTaskList };
});
