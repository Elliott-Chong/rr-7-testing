import RouteModal from '@/components/route-modal'
import { Controller } from "react-hook-form";
import { clsx } from "@/common/clsx";
import { addTaskFormSchema } from "@/common/formSchema";
import { useZodForm } from "@/hooks/useZodForm";
import { trpc } from "@/common/trpc/react";
import { useActionData, useNavigate } from 'react-router';

const AddTaskModal = () => {
    const { form } = useZodForm(addTaskFormSchema);
    const addTaskMutation = trpc.action.addTask.useMutation()
    const nav = useNavigate()
    const abortController = new AbortController()
    return (
        <>
            <RouteModal title="Add Task" description="Add a new task" abortController={abortController}>
                <form
                    className="flex flex-col gap-2"
                    autoComplete="off"
                    onSubmit={form.handleSubmit(async (data) => {
                        await addTaskMutation.mutateAsync(data);
                        abortController.abort()
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

                </form>
            </RouteModal>
        </>
    )
}

export default AddTaskModal