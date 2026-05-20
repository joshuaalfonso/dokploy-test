import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import type { CreateProject, CreateProjectMember, ProjectList, ProjectStatus } from "../../project.model";
import { useCreateProject } from "../../hooks/useCreateProject";
import { toaster } from "@/components/ui/toaster";
import { getApiErrorMessage } from "@/lib/errorMessage";
import { Button, Dialog, Field, Fieldset, Flex, Input, Portal, Stack, Textarea } from "@chakra-ui/react";
import { useProjectDialogStore } from "../../store/projectDialogStore";
import { useParams } from "react-router-dom";
import { projectStatus } from "@/shared/data/projectStatus";
import { RHFSelect } from "@/shared/components/RFHSelect";
import { useWorkspaceMember } from "@/features/workspace-member/hooks/useWorkspaceMember";
import { projectRole } from "@/shared/data/projectRole";
import { LuTrash2 } from "react-icons/lu";
import Empty from "@/shared/components/EmptyState";
import { useEffect } from "react";
import { useUpdateProject } from "../../hooks/useUpdateProject";


type ProjectFormValues = {
    project_id: ProjectList['project_id'];
    project_name: CreateProject['project_name'],
    project_description: CreateProject['project_description'],
    status: ProjectStatus,
    project_member: CreateProjectMember[] 
}


const ProjectDialog = () => {

    const open = useProjectDialogStore(state => state.isCreateModalOpen);
    const setOpen = useProjectDialogStore(state => state.setCreateModalOpen);
    const selectedProject = useProjectDialogStore(state => state.selectedProject);
    const setProject = useProjectDialogStore(state => state.setSelectedProject);

    const { workspace_id } = useParams();

    console.log(selectedProject)


    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<ProjectFormValues>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'project_member'
    });
    
    const { createProjectMutation, isCreating } = useCreateProject();
    const { updateProjectMutation, isUpdating } = useUpdateProject();

    const { workspaceMembers } = useWorkspaceMember();

    // const members = workspaceMembers
    // ?.filter(
    //     item => !fields.some(field => field.user_id === +item.user_id)
    // )
    // ?.map(item => ({
    //     label: item.full_name,
    //     value: item.user_id,
    //     description: item.email
    // }));

    const selectedUserIds = new Set(
        fields.map(field => Number(field.user_id))
    );


    const onSubmit: SubmitHandler<ProjectFormValues> = (data) => {

        if (!workspace_id) return;

        const newData = {
            ...data,
            workspace_id: Number(workspace_id)
        }

        const mutate = selectedProject ? updateProjectMutation : createProjectMutation;

        mutate(
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

    useEffect(() => {
        if (selectedProject) {
            reset({
                project_id: selectedProject.project_id,
                project_name: selectedProject.project_name,
                project_description: selectedProject.project_description,
                status: selectedProject.status,
                project_member: Array.isArray(selectedProject.project_member)
                    ? selectedProject.project_member
                    : [{ user_id: 0, role: '' }]
            });
        } else {
            reset({
                project_id: 0,
                project_name: '',
                project_description: '',
                status: 'active',
                project_member: [
                    {
                        project_member_id: 0,
                        user_id: 0,
                        role: ''
                    }
                ]
            })
        }
    }, [selectedProject, reset]);
    
     
    return (
        <Dialog.Root 
            open={open} 
            onOpenChange={(e) => {
                setOpen(e.open);
                reset();
                setProject(null);
            }}
            lazyMount 
            placement={'center'}
            size={{ mdDown: "full", md: "lg" }}
            initialFocusEl={() => null}
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
                                        <Fieldset.Legend fontSize={'xl'}>Project Form</Fieldset.Legend>
                                        <Fieldset.HelperText>
                                            Fields with * are required.
                                            </Fieldset.HelperText>
                                    </Stack>

                                    <Fieldset.Content gap={7}>

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

                                        <Field.Root 
                                            required
                                            // invalid={Boolean(errors.project_description)}
                                        >
                                            <Field.Label>
                                                Member
                                                <Field.RequiredIndicator/>
                                            </Field.Label>
                                            
                                            {fields.map((field, index) => {

                                                const currentUserId = Number(field.user_id);

                                                const options = workspaceMembers
                                                    ?.filter(member => {
                                                        const memberId = Number(member.user_id);

                                                        return (
                                                            memberId === currentUserId ||
                                                            !selectedUserIds.has(memberId)
                                                        );
                                                    })
                                                    ?.map(member => ({
                                                        label: member.full_name,
                                                        value: member.user_id,
                                                        description: member.email
                                                    }));


                                                return (
                                                    <Flex key={field.id} w="full" gap={4} mb={4}>
                                                        <RHFSelect<ProjectFormValues>
                                                            name={`project_member.${index}.user_id`}
                                                            control={control}
                                                            rules={{
                                                                required: "User is required",
                                                            }}
                                                            required
                                                            options={options ?? []}
                                                            placeholder="Select user"
                                                            error={errors.project_member?.[index]?.user_id?.message}
                                                        />

                                                        <RHFSelect<ProjectFormValues>
                                                            name={`project_member.${index}.role`}
                                                            control={control}
                                                            rules={{
                                                                required: "Role is required",
                                                            }}
                                                            required
                                                            options={projectRole ?? []}
                                                            placeholder="Select role"
                                                            error={errors.project_member?.[index]?.role?.message}
                                                        />

                                                        <Button 
                                                            variant={'subtle'} 
                                                            colorPalette={'red'} 
                                                            type="button" 
                                                            onClick={() => remove(index)}
                                                        >
                                                            <LuTrash2 />
                                                        </Button>

                                                    </Flex>
                                                )
                                            })}
                                            

                                            { fields.length === 0 ? (
                                                <Empty 
                                                    description="Click add member to start"
                                                    buttons={
                                                        <>
                                                            <Button
                                                                variant={'subtle'}
                                                                type="button"
                                                                onClick={() =>
                                                                    append({
                                                                        project_member_id: 0,
                                                                        user_id: 0,
                                                                        role: ''
                                                                    })
                                                                }
                                                            >
                                                                Add Member
                                                            </Button>
                                                        </>
                                                    } 
                                                />
                                            ) : (
                                                <Button
                                                    variant={'subtle'}
                                                    type="button"
                                                    onClick={() =>
                                                        append({
                                                            project_member_id: 0,
                                                            user_id: 0,
                                                            role: 'member'
                                                        })
                                                    }
                                                >
                                                    Add Member
                                                </Button>
                                            ) }

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
                                loading={isSubmitting || isCreating || isUpdating}
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