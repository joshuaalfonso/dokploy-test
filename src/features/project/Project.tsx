import {  Button, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import { useProjectDialogStore } from "./store/projectDialogStore"
import ProjectDialog from "./components/dialog/ProjectDialog";
import { usePaginatedProject } from "./hooks/useProject";
// import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import ProjectCardList from "./components/card/ProjectCardList";
import ProjectToolbar from "./components/toolbar/ProjectToolbar";
import { useProjectParams } from "./hooks/useProjectParams";
import Empty from "@/shared/components/EmptyState";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import PaginationControls from "@/shared/components/PaginationControls";


const Project = () => {

    const setOpen  = useProjectDialogStore(state => state.setCreateModalOpen);


    const { setFilters } = useProjectParams();

    const { data, isPending, error } = usePaginatedProject();

    if (error) return <p>Failed to load project</p>;

    const projects =
        data?.data ?? [];

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

            <ProjectToolbar />

            { isPending ? (
                <LoadingSpinner />
            ) : (

                <>

                    { projects?.length === 0 && (<Empty />) }

                    { projects.length > 0 && (
                        <>  
                            <ProjectCardList 
                                items={ projects ?? [] } 
                            />

                            <PaginationControls 
                                page={data!.page}
                                totalPages={data!.totalPages}
                                onPageChange={(page) => {
                                    setFilters({ page })
                                }}
                            />

                        </>
                    ) }

                </>

            ) }

            <ProjectDialog />
        
        </>
    )
}

export default Project