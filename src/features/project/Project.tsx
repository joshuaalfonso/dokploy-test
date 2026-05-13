import {  Button, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import { useProjectDialogStore } from "./store/projectDialogStore"
import ProjectDialog from "./components/dialog/ProjectDialog";
import { usePaginatedProject } from "./hooks/useProject";
import ProjectCardList from "./components/card/ProjectCardList";
import ProjectToolbar from "./components/toolbar/ProjectToolbar";
import { useProjectParams } from "./hooks/useProjectParams";
import Empty from "@/shared/components/EmptyState";
import PaginationControls from "@/shared/components/PaginationControls";
import ProjectCardSkeleton from "./components/card/ProjectCardSkeleton";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import ProjectTable from "./components/table/ProjectTable";



const Project = () => {

    const setOpen  = useProjectDialogStore(state => state.setCreateModalOpen);


    const { filters, setFilters } = useProjectParams();

    console.log('project')

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
                <>  
                    {
                        filters.view === 'table'
                        ? <LoadingSpinner />
                        : <ProjectCardSkeleton />
                    }
                </>
            ) : (

                <>

                    { projects?.length === 0 && (<Empty />) }

                    { projects.length > 0 && (
                        <>  
                            
                            {filters.view === 'table' ? (
                                <ProjectTable items={projects} />
                            ) : (
                                <ProjectCardList items={projects} />
                            )}

                            <PaginationControls 
                                page={data!.page}
                                totalPages={data!.totalPages}
                                total={data!.total}
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