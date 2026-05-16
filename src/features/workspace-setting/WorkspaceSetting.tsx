import { useParams } from "react-router-dom"
import { useWorkspaceByUser } from "../workspace/hooks/useWorkspace";
import { Avatar, Badge, Box, Button, Field, Fieldset, Heading, Input, Separator, Stack, Text, Textarea } from "@chakra-ui/react";
import { useWorkspaceMember } from "../workspace-member/hooks/useWorkspaceMember";



const WorkspaceSetting = () => {


    const { workspace_id } = useParams();

    const { user_workspaces } = useWorkspaceByUser();

    const { workspaceMembers } = useWorkspaceMember();

    const selectedWorkspace = user_workspaces?.find(item => item.workspace_id == (workspace_id || 0));

    if (!selectedWorkspace) return <p>Workspace not found</p>

    return (
        <div className="space-y-10!">

            {/* <div className="max-w-5xl mx-auto!">
                <h1 className="text-xl! font-bold!">
                    { selectedWorkspace.workspace_name }
                </h1>
            </div>

            <Separator /> */}

            <div className="max-w-5xl mx-auto!">
                <Stack mb={8}>
                    <Heading fontSize={'xl'} fontWeight={'medium'}>
                        Details
                    </Heading>
                    <Text fontSize={'sm'} color={'fg.muted'}>
                        Manage workspace details
                    </Text>
                </Stack>
            </div>

            {/* <Separator /> */}

            <Box maxW={'5xl'} mx={'auto'}>

                {/* <Stack mb={8}>
                    <Heading fontSize={'md'} fontWeight={'medium'}>
                        Details
                    </Heading>
                </Stack> */}

                <Fieldset.Root>
                
                    <Fieldset.Content>
                    
                        <Field.Root 
                            required 
                        >
                            <Field.Label>
                                Name
                                <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                            
                            />
                        
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

                    <div className="flex justify-end mt-8!">
                        <Button type="submit">
                            Update Details
                        </Button>
                    </div>

                </Fieldset.Root>


            </Box>

            <Separator />

            <Box maxW={'5xl'} mx={'auto'}>

               <Stack mb={8}>
                    <Heading fontSize={'xl'} fontWeight={'medium'}>
                        Members
                    </Heading>
                    <Text fontSize={'sm'} color={'fg.muted'}>
                        Manage workspace members
                    </Text>
                </Stack>

                <ul className="divide-y! divide-dashed ">
                    { workspaceMembers?.map(item => (
                        <li key={item.user_id} className="flex items-center! justify-between gap-4! py-3!">

                            <div className="flex items-center gap-3!">
                                <Avatar.Root size={'sm'} variant={'solid'}>
                                    <Avatar.Fallback name={item.full_name} />
                                </Avatar.Root>
                                <div className="space-y-0.5!">
                                    <h1 className="text-sm!">
                                        { item.full_name }
                                    </h1>
                                    <p className="text-(--chakra-colors-fg-muted) text-xs!">{ item.email }</p>
                                </div>
                            </div>

                            <div>
                                { item.role }
                            </div>

                        </li>
                    )) }
                </ul>

            </Box> 

            <Separator />

            <Box maxW={'5xl'} mx={'auto'}>

               <Stack mb={8}>
                    <Heading fontSize={'xl'} fontWeight={'medium'}>
                        Delete Workspace
                    </Heading>
                    <Text fontSize={'sm'} color={'fg.muted'}>
                        This action will permanently remove the workspace, including all projects, tasks, files, and activity history associated with it. This action cannot be undone. Please confirm before proceeding.
                    </Text>
                </Stack>

                <div className="flex justify-end mt-8!">
                    <Button type="submit" colorPalette={'red'}>
                        Delete Workspace
                    </Button>
                </div>

            </Box> 


        </div>
    )
}

export default WorkspaceSetting