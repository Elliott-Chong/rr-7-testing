import { tasks } from "@/.server/db/schema";
import { p } from "@/.server/trpc";
import { addTaskFormSchema } from "@/common/formSchema";

export const addTask = p.auth.input(addTaskFormSchema).mutation(async ({ ctx: { db, userId }, input: { content } }) => {
  if (!userId) {
    return;
  }

  await db.insert(tasks).values({
    content,
    userId
  })
});
