import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateProject, ProjectStatus } from "../../project.model";
import { useCreateProject } from "../../hooks/useCreateProject";
import { toaster } from "@/components/ui/toaster";
import { getApiErrorMessage } from "@/lib/errorMessage";
import { Button, Dialog, Field, Fieldset, Input, Portal, Stack, Textarea } from "@chakra-ui/react";
import { useProjectDialogStore } from "../../store/projectDialogStore";
import { useParams } from "react-router-dom";
import { projectStatus } from "@/shared/data/projectStatus";
import { RHFSelect } from "@/shared/components/RFHSelect";


type ProjectFormValues = {
    project_name: CreateProject['project_name'],
    project_description: CreateProject['project_description'],
    status: ProjectStatus
}


const ProjectDialog = () => {

    const open = useProjectDialogStore(state => state.isCreateModalOpen);
    const setOpen = useProjectDialogStore(state => state.setCreateModalOpen);

    const { workspace_id } = useParams();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<ProjectFormValues>({
        defaultValues: {
            project_name: '',
            project_description: '',
            status: 'active'
        }
    });
    
    const { createProjectMutation, isCreating } = useCreateProject();


    
    const onSubmit: SubmitHandler<ProjectFormValues> = (data) => {

        if (!workspace_id) return;

        const newData = {
            ...data,
            workspace_id: Number(workspace_id)
        }

        createProjectMutation(
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
            onOpenChange={(e) => setOpen(e.open)}
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
                                        <Fieldset.Legend>Project Form</Fieldset.Legend>
                                        <Fieldset.HelperText>
                                            Fields with * are required.
                                            </Fieldset.HelperText>
                                    </Stack>

                                    <Fieldset.Content>

                                        <Field.Root 
                                            required 
                                            invalid={Boolean(errors.project_name)}
                                        >
                                            <Field.Label>
                                                Name
                                                <Field.RequiredIndicator />
                                            </Field.Label>
                                            <Input 
                                                {...register("project_name", {
                                                    required: "This field is required",
                                                })}
                                            />
                                            { errors.project_name && (
                                                <Field.ErrorText>
                                                    { errors.project_name?.message }
                                                </Field.ErrorText>
                                            )}
                                        </Field.Root>

                                        <Field.Root 
                                            required
                                            invalid={Boolean(errors.project_description)}
                                        >
                                            <Field.Label>
                                                Description
                                                <Field.RequiredIndicator />
                                            </Field.Label>
                                            <Textarea 
                                                placeholder="" 
                                                {...register("project_description", {
                                                    required: "This field is required",
                                                    minLength: {
                                                        value: 10,
                                                        message: "At least 10 characters"
                                                    }
                                                })}
                                            />
                                            { errors.project_description && (
                                                <Field.ErrorText>
                                                    { errors.project_description?.message }
                                                </Field.ErrorText>
                                            )}
                                        </Field.Root>
                                        
                                        <Field.Root 
                                            required
                                            invalid={Boolean(errors.project_description)}
                                        >
                                            <Field.Label>
                                                Status
                                                <Field.RequiredIndicator />
                                            </Field.Label>
                                            <RHFSelect<ProjectFormValues>
                                                name="status"
                                                control={control}
                                                options={projectStatus}
                                                placeholder="Select status"
                                                error={errors.status?.message}
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



export default ProjectDialog