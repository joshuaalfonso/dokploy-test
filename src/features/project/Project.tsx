import {  Button, EmptyState, Flex, Heading, Stack, Text, VStack } from "@chakra-ui/react"
import { useProjectDialogStore } from "./store/projectDialogStore"
import ProjectDialog from "./components/dialog/ProjectDialog";
import { useProjectByWorkspace } from "./hooks/useProject";
import ProjectCardList from "./components/card/ProjectCardList";
import { LuFolderArchive } from "react-icons/lu";



const Project = () => {

    const setOpen  = useProjectDialogStore(state => state.setCreateModalOpen);

    const { user_project, isPending, error } = useProjectByWorkspace();

    if (isPending) return <p>Loading...</p>;
    if (error) return <p>Failed to load project</p>;

    return (
        <>
            
            <Flex justifyContent={'space-between'} alignItems={'center'} mb={10}>
                <Stack>
                    <Heading>
                        Project
                    </Heading>
                    <Text fontSize={'sm'} color={'fg.muted'}>List of all project for this workspace</Text>
                </Stack>
                <Button onClick={() => setOpen(true)}>Create</Button>
            </Flex>

            { user_project?.length === 0 ? (
                <EmptyState.Root>
                    <EmptyState.Content>
                        <EmptyState.Indicator>
                        <LuFolderArchive />
                        </EmptyState.Indicator>
                        <VStack textAlign="center">
                            <EmptyState.Title>List is empty</EmptyState.Title>
                            <EmptyState.Description>
                                Add item to get started
                        </EmptyState.Description>
                        </VStack>
                    </EmptyState.Content>
                </EmptyState.Root>
            ) :  <ProjectCardList items={ user_project ?? [] } /> }

            <ProjectDialog />
        
        </>
    )
}

export default Project