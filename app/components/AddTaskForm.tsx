import { Plus } from "lucide-react";
import { Controller } from "react-hook-form";
import { clsx } from "@/common/clsx";
import { addTaskFormSchema } from "@/common/formSchema";
import { useZodForm } from "@/hooks/useZodForm";
import { LuIcon } from "./LuIcon";
import { trpc } from "@/common/trpc/react";
import { Link, useLocation } from "react-router";

export const AddTaskForm = () => {
  const { form } = useZodForm(addTaskFormSchema);
  const addTaskMutation = trpc.action.addTask.useMutation()
  const location = useLocation()
  return (
    <form
      className="flex flex-col gap-2"
      autoComplete="off"
      onSubmit={form.handleSubmit(async (data) => {
        await addTaskMutation.mutateAsync(data);
        form.reset();
      })}
    >
      <Controller
        name="content"
        defaultValue=""
        control={form.control}
        render={({ field, fieldState }) => (
          <>
            <input
              {...field}
              className={clsx(
                "input input-bordered w-[300px]",
                fieldState.invalid && "input-error",
              )}
              placeholder="input task content"
              required
              min={1}
              max={100}
            />
            <small className="text-error">{fieldState.error?.message}</small>
          </>
        )}
      />

      <Link to={`add`} state={{ backgroundLocation: location }}>
        <button
          className="btn"
          type="button"
        >
          <LuIcon icon={Plus} />
          Add Task
        </button>
      </Link>
    </form>
  );
};
