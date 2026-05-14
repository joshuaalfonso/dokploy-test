import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTaskByProjectApi } from "../projectTask.api";




export const useTaskByProject = () => {

    const { project_id } = useParams();

    const { data: tasks, isPending, error } = useQuery({
        queryKey: ['tasks', project_id],
        queryFn: () => getTaskByProjectApi(Number(project_id!)),
        enabled: !!project_id,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    })

    return { tasks, isPending, error }

}