import { t } from "../trpc";

// loaders
import { getMyTaskList } from "./loader/getMyTaskList";

// actions
import { deleteTask } from "./action/deleteTask";
import { unDoneTask } from "./action/unDoneTask";
import { doneTask } from "./action/doneTask";
import { addTask } from "./action/addTask";
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
