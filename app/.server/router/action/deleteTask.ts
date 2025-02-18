import { z } from "zod";
import { p } from "@/.server/trpc";
import { tasks } from "@/.server/db/schema";
import { eq } from "drizzle-orm";

export const deleteTask = p.auth
  .input(
    z.object({
      taskId: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db }, input: { taskId } }) => {
    await db.delete(tasks).where(eq(tasks.id, taskId));
  });
