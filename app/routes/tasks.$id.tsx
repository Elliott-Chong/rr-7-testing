import { Link, Outlet, useLocation, useNavigate, useOutlet } from "react-router";
import { clsx } from "@/common/clsx";
import { trpcServer } from "@/common/trpc";
import { Trash2Icon, LogIn } from "lucide-react";
import { Title } from "@/components/Title";
import { LuIcon } from "@/components/LuIcon";
import { AddTaskForm } from "@/components/AddTaskForm";
import { Route } from "./+types/tasks.$id";
import { trpc } from "@/common/trpc/react";

export const meta: Route.MetaFunction = ({
  params: { id },
  data: { myTaskList, isSelf, user },
}) => {
  if (!user) {
    return [{ title: "page need login | remix-t3-stack" }];
  }
  if (!isSelf) {
    return [{ title: "no view permission | remix-t3-stack" }];
  }

  const unDoneTasksLength = myTaskList?.filter((e) => !e.done).length || 0;
  return [
    {
      title: `${unDoneTasksLength ? `(${unDoneTasksLength}) ` : ""}${id}'s Tasks | remix-t3-stack`,
    },
  ];
};

export const loader = async ({
  params: { id },
  request,
}: Route.LoaderArgs) => {
  const user = await trpcServer(request).user.getMyUserInfo.query();

  const isSelf = !!user && id === user.id;

  if (isSelf) {
    const { myTaskList } =
      await trpcServer(request).loader.getMyTaskList.query();
    return { myTaskList, isSelf, user };
  }

  return { myTaskList: [], isSelf, user };
};

export default function PageMyTasks({
  params: { id },
  loaderData: { myTaskList, isSelf, user },
}: Route.ComponentProps) {
  const unDoneTaskMutation = trpc.action.unDoneTask.useMutation()
  const doneTaskMutation = trpc.action.doneTask.useMutation()
  const deleteTaskMutation = trpc.action.deleteTask.useMutation()

  if (!user) {
    return (
      <>
        <Title>Page Need Login</Title>
        <Link to="/login">
          <button className="btn">
            <LuIcon icon={LogIn} />
            Login
          </button>
        </Link>
      </>
    );
  }

  if (!isSelf) {
    return (
      <>
        <Title>
          No Permission To Access Todolist Of Other User ({user.firstName} {user.lastName})
        </Title>
        <Link to={`/tasks/${user?.id}`}>
          <button className="btn">View My Tasks</button>
        </Link>
      </>
    );
  }

  if (!myTaskList.length) {
    return (
      <>
        <Title>No One Task Yet</Title>
        <AddTaskForm />
      </>
    );
  }

  const doneTaskList = myTaskList.filter((e) => !!e.done);

  return (
    <>
      <Title>
        Done ({doneTaskList.length}) / Tasks ({myTaskList.length})
      </Title>
      <div className="my-2 flex max-h-[70vh] flex-col gap-4 overflow-scroll p-4">
        {myTaskList.map((task) => {
          const { id: taskId, content, done, createAt, updatedAt } = task;

          return (
            <label key={taskId}>
              <div
                className={clsx(
                  "border-base-300 hover:bg-base-200 flex cursor-pointer justify-between gap-4 rounded-lg border px-4 py-2",
                  done && "bg-base-200 line-through opacity-60",
                )}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox-success checkbox"
                    defaultChecked={done}
                    disabled={
                      unDoneTaskMutation.isLoading || doneTaskMutation.isLoading
                    }
                    onClick={async () => {
                      if (done) {
                        await unDoneTaskMutation.mutateAsync({ taskId });
                      } else {
                        await doneTaskMutation.mutateAsync({ taskId });
                      }
                    }}
                  />
                  <div className="text-lg">{content}</div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <div className="text-sm font-light text-gray-400">
                      create at {new Date(createAt).toLocaleString()}
                    </div>
                    <div className="text-sm font-light text-gray-400">
                      update at {new Date(updatedAt).toLocaleString()}
                    </div>
                  </div>
                  <button
                    className="btn btn-circle btn-ghost btn-sm"
                    disabled={deleteTaskMutation.isLoading}
                    onClick={async (e) => {
                      e.stopPropagation();
                      await deleteTaskMutation.mutateAsync({ taskId });
                    }}
                  >
                    <Trash2Icon
                      size={20}
                      strokeWidth={1.5}
                      className="text-gray-500"
                    />
                  </button>
                </div>
              </div>
            </label>
          );
        })}
      </div>
      <AddTaskForm />

      <Outlet />
    </>
  );
}
