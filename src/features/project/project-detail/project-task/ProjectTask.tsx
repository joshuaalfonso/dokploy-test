import LoadingSpinner from "@/shared/components/LoadingSpinner"
import ProjectTaskDialog from "./components/dialog/ProjectTaskDialog"
import ProjectTaskTable from "./components/table/ProjectTaskTable"
import ProjectTaskToolbar from "./components/toolbar/ProjectTaskToolbar"
import { usePaginatedTaskByProject } from "./hooks/useTask"
import Empty from "@/shared/components/EmptyState"
import PaginationControls from "@/shared/components/PaginationControls"
import { useTaskParams } from "./hooks/useTaskParams"



const ProjectTask = () => {

    const { setFilters } = useTaskParams();

    const { data, isPending, error: paginatedTasksError } = usePaginatedTaskByProject();

    if (paginatedTasksError) return <p>Failed to load tasks</p>;


    return (
        <>

            <ProjectTaskToolbar />
        
            { isPending ? (
                <LoadingSpinner />
            ): (
                <>
                    {
                        data!.data?.length > 0 ? (
                            <>
                                <ProjectTaskTable tasks={data?.data ?? []} />
                                <PaginationControls
                                    page={data!.page}
                                    totalPages={data!.totalPages}
                                    total={data!.total}
                                    onPageChange={(page) => {
                                        setFilters({ page })
                                    }}
                                />
                            </>
                        ) : (
                            <Empty />
                        )
                    }
                </>
            ) }

            <ProjectTaskDialog />
        
        </>
    )
}

export default ProjectTask