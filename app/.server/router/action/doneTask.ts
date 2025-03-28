import { z } from "zod";
import { p } from "@/.server/trpc";
import { tasks } from "@/.server/db/schema";
import { eq } from "drizzle-orm";

export const doneTask = p.auth
  .input(
    z.object({
      taskId: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db }, input: { taskId } }) => {
    await db.update(tasks).set({ done: true }).where(eq(tasks.id, taskId));
  });
