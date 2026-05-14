import LoadingSpinner from "@/shared/components/LoadingSpinner"
import ProjectTaskDialog from "./components/dialog/ProjectTaskDialog"
import ProjectTaskTable from "./components/table/ProjectTaskTable"
import ProjectTaskToolbar from "./components/toolbar/ProjectTaskToolbar"
import { useTaskByProject } from "./hooks/useTask"
import Empty from "@/shared/components/EmptyState"



const ProjectTask = () => {


    const { tasks, isPending, error } = useTaskByProject();

    if (error) return <p>Failed to load project</p>;


    return (
        <>

            <ProjectTaskToolbar />
        
            { isPending ? (
                <LoadingSpinner />
            ): (
                <>
                    {
                        tasks!.length > 0 ? (
                            <ProjectTaskTable tasks={tasks ?? []} />
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