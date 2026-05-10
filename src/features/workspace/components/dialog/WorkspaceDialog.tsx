import { Badge, Button, Dialog, Field, Fieldset, Input, Portal, Stack, Textarea } from "@chakra-ui/react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { LuPlus } from "react-icons/lu"
import { useCreateWorkspace } from "../../hooks/useCreateWorkspace"
import type { CreateWorkspace } from "../../workspace.model"
import { toaster } from "@/components/ui/toaster"
import { getApiErrorMessage } from "@/lib/errorMessage"




type WorkspaceFormValues = {
    workspace_name: CreateWorkspace['workspace_name'],
    description: CreateWorkspace['description']
}


const WorkspaceDialog = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<WorkspaceFormValues>({
        defaultValues: {
            workspace_name: '',
            description: ''
        }
    });

    const { createWorkspaceMutation, isCreating } = useCreateWorkspace();

    const onSubmit: SubmitHandler<WorkspaceFormValues> = (data) => {
        console.log(data)
        createWorkspaceMutation(
            data,
            {
                onSuccess: (response) => {
                    toaster.create({
                        title: 'Success',
                        description: response.message ?? 'Successfully created'
                    })
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
        <Dialog.Root initialFocusEl={() => null}>
            <Dialog.Trigger asChild>
                <Button 
                    size={'xs'}                                                                                
                    variant={'ghost'}
                    color={'fg.muted'}
                >
                    <LuPlus />
                    Add workspace
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>

                        <Dialog.Header>
                            {/* <Dialog.Title>Workspace Form</Dialog.Title> */}
                        </Dialog.Header>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Dialog.Body>

                                <Fieldset.Root size="lg" maxW="md">

                                    <Stack>
                                        <Fieldset.Legend>Workspace Form</Fieldset.Legend>
                                        <Fieldset.HelperText>
                                            Fields with * are required.
                                         </Fieldset.HelperText>
                                    </Stack>

                                    <Fieldset.Content>

                                        <Field.Root 
                                            required 
                                            invalid={Boolean(errors.workspace_name)}
                                        >
                                            <Field.Label>
                                                Name
                                                <Field.RequiredIndicator />
                                            </Field.Label>
                                            <Input 
                                                {...register("workspace_name", {
                                                    required: "This field is required",
                                                })}
                                            />
                                            { errors.workspace_name && (
                                                <Field.ErrorText>
                                                    { errors.workspace_name?.message }
                                                </Field.ErrorText>
                                            )}
                                        </Field.Root>

                                        <Field.Root>
                                            <Field.Label>
                                                Description
                                                <Field.RequiredIndicator
                                                    fallback={
                                                        <Badge size="xs" variant="surface">
                                                            Optional
                                                        </Badge>
                                                    }
                                                />
                                            </Field.Label>
                                            <Textarea placeholder="" />
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

export default WorkspaceDialog