import { t } from "../trpc";

// loaders
import { addTask } from "./action/addTask";
import { deleteTask } from "./action/deleteTask";
import { doneTask } from "./action/doneTask";
import { unDoneTask } from "./action/unDoneTask";
import { getMyTaskList } from "./loader/getMyTaskList";

// actions
import { userRouter } from "./user";

export const appRouter = t.router({
  user: userRouter,
  loader: t.router({
    getMyTaskList,
  }),
  action: t.router({
    addTask,
    doneTask,
    unDoneTask,
    deleteTask,
  }),
});

export type AppRouter = typeof appRouter;
