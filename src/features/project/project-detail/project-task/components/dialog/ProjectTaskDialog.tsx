import { useParams } from "react-router-dom";
import { useProjectTaskDialogStore } from "../../store/projectTaskStore";
import type { Task } from "../../projectTask.model";
import {  useForm, type SubmitHandler } from "react-hook-form";
import { Button, Dialog, Field, Fieldset, Input, Portal, Stack, Textarea } from "@chakra-ui/react";
import { RHFSelect } from "@/shared/components/RFHSelect";
import { taskStatus } from "@/shared/data/taskStatus";
import { taskPriority } from "@/shared/data/taskPriority";
import { RHFDatePicker } from "@/shared/components/RFHDatePicker";
import { useCreateTask } from "../../hooks/useCreateTask";
import { toaster } from "@/components/ui/toaster";
import { getApiErrorMessage } from "@/lib/errorMessage";
import { useProjectMember } from "@/features/project/hooks/useProject";
import { RHFMultiSelect } from "@/shared/components/RFHMultiSelect";


type TaskFormValues = {
    project_id: Task['project_id'],
    task_title: Task['task_title'],
    task_description: Task['task_description'],
    status: Task['status'],
    priority: Task['priority'],
    due_date: Task['due_date'],
    task_assignee: number[]
}


const ProjectTaskDialog = () => {
     const open = useProjectTaskDialogStore(state => state.isCreateModalOpen);
    const setOpen = useProjectTaskDialogStore(state => state.setCreateModalOpen);

    const { project_id } = useParams();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<TaskFormValues>({
        defaultValues: {
            project_id: Number(project_id || 0),
            task_title: '',
            task_description: '',
            status: 'todo',
            priority: 'low',
            due_date: '',
            task_assignee: []
        }
    });

    // const { fields, append, remove } = useFieldArray({
    //     control,
    //     name: 'task_assignee'
    // });
    
    const { createTaskMutation, isCreating } = useCreateTask();

    const { projectMembers } = useProjectMember();

    const members = projectMembers?.map(item => ({
        label: `${item.full_name} | ${item.role}`,
        value: String(item.user_id),
        description: item.email
    }))
    
    const onSubmit: SubmitHandler<TaskFormValues> = (data) => {

        if (!project_id) return;

        const newData = {
            ...data
        }

        // console.log(newData)

        createTaskMutation(
            newData,
            {
                onSuccess: (response) => {
                    toaster.create({
                        title: 'Success',
                        description: response.message ?? 'Successfully created'
                    });
                    reset();
                    setOpen(false)
                },
                onError: (err) => {
                    toaster.create({
                        title: 'Error',
                        description: getApiErrorMessage(err)
                    })
                }
            }
        )

    }
    
     
    return (
        <Dialog.Root 
            open={open} 
            onOpenChange={(e) => {
                setOpen(e.open);
                reset();
            }}
            lazyMount 
            placement={'center'}
            // initialFocusEl={() => null}
        >
            {/* <Dialog.Trigger asChild>
                <Button
                    size={'xs'}                                                                                
                    variant={'ghost'}
                    color={'fg.muted'}
                >
                    <LuPlus />
                    Add workspace
                </Button>
            </Dialog.Trigger> */}
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>

                        <Dialog.Header>
                            {/* <Dialog.Title>Workspace Form</Dialog.Title> */}
                        </Dialog.Header>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Dialog.Body>

                                <Fieldset.Root>

                                    <Stack>
                                        <Fieldset.Legend fontSize={'xl'}>Task Form</Fieldset.Legend>
                                        <Fieldset.HelperText>
                                            Fields with * are required.
                                            </Fieldset.HelperText>
                                    </Stack>

                                    <Fieldset.Content>

                                        <Field.Root 
                                            required 
                                            invalid={Boolean(errors.task_title)}
                                        >
                                            <Field.Label>
                                                Title
                                                <Field.RequiredIndicator />
                                            </Field.Label>
                                            <Input
                                                {...register("task_title", {
                                                    required: "This field is required",
                                                })}
                                            />
                                            { errors.task_title && (
                                                <Field.ErrorText>
                                                    { errors.task_title?.message }
                                                </Field.ErrorText>
                                            )}
                                        </Field.Root>

                                        <Field.Root 
                                            required
                                            invalid={Boolean(errors.task_description)}
                                        >
                                            <Field.Label>
                                                Description
                                                <Field.RequiredIndicator />
                                            </Field.Label>
                                            <Textarea
                                                placeholder="" 
                                                {...register("task_description", {
                                                    required: "This field is required",
                                                    minLength: {
                                                        value: 10,
                                                        message: "At least 10 characters"
                                                    }
                                                })}
                                            />
                                            { errors.task_description && (
                                                <Field.ErrorText>
                                                    { errors.task_description?.message }
                                                </Field.ErrorText>
                                            )}
                                        </Field.Root>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4!">

                                            <Field.Root 
                                            required
                                            invalid={Boolean(errors.status)}
                                        >
                                            <Field.Label>
                                                Status
                                                <Field.RequiredIndicator />
                                            </Field.Label>
                                            <RHFSelect<TaskFormValues>
                                                name="status"
                                                control={control}
                                                rules={{
                                                    required: "Status is required",
                                                }}
                                                required
                                                options={taskStatus}
                                                placeholder="Select"
                                                error={errors.status?.message}
                                            />
                                        </Field.Root>

                                        <Field.Root 
                                            required
                                            invalid={Boolean(errors.priority)}
                                        >
                                            <Field.Label>
                                                Priority
                                                <Field.RequiredIndicator />
                                            </Field.Label>
                                            <RHFSelect<TaskFormValues>
                                                name="priority"
                                                control={control}
                                                rules={{
                                                    required: "Priority is required",
                                                }}
                                                required
                                                options={taskPriority}
                                                placeholder="Select"
                                                error={errors.priority?.message}
                                            />
                                        </Field.Root>

                                        </div>

                                        <Field.Root 
                                            required
                                            invalid={Boolean(errors.priority)}
                                        >
                                            <Field.Label>
                                                Due Date
                                                <Field.RequiredIndicator />
                                            </Field.Label>
                                            <RHFDatePicker<TaskFormValues>
                                                name="due_date"
                                                control={control}
                                                placeholder="Select"
                                                error={errors.due_date?.message}
                                            />
                                        </Field.Root>

                                        <Field.Root 
                                            required
                                            invalid={Boolean(errors.priority)}
                                        >
                                            <Field.Label>
                                                Assignee
                                                <Field.RequiredIndicator />
                                            </Field.Label>
                                            <RHFMultiSelect
                                                name="task_assignee"
                                                control={control}
                                                rules={{
                                                    minLength: {
                                                        value: 1,
                                                        message: "This field is required"
                                                    },
                                                }}
                                                        required
                                                options={members ?? []}
                                            />
                                        </Field.Root>

                                    </Fieldset.Content>

                                </Fieldset.Root>
                                
                            </Dialog.Body>

                            <Dialog.Footer>

                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>

                            <Button 
                                type="submit"
                                loading={isSubmitting || isCreating}
                            >
                                Create 
                            </Button>

                            </Dialog.Footer>

                        </form>

                        {/* <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger> */}

                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default ProjectTaskDialog