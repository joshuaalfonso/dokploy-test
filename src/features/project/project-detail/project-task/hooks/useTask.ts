import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPaginatedTaskByProjectApi, getTaskByProjectApi } from "../projectTask.api";
import { useTaskParams } from "./useTaskParams";
import { useEffect } from "react";




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

export function usePaginatedTaskByProject() {

    const queryClient = useQueryClient();

    const { project_id } = useParams();

    const { filters } = useTaskParams();

    const { data, isPending, error } = useQuery({
        queryKey: ['tasks', project_id, filters],
        queryFn: () => 
            getPaginatedTaskByProjectApi(Number(project_id || 0), filters),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        enabled: !!project_id
    } )

    useEffect(() => {
        
        if (!data?.hasMore) return;

        queryClient.prefetchQuery({
            queryKey: [
                'tasks',
                project_id,
                {
                    ...filters,
                    page: filters.page + 1
                },
            ],

            queryFn: () =>
                getPaginatedTaskByProjectApi(
                    Number(project_id || 0),
                    {
                        ...filters,
                        page: filters.page + 1
                    }
                ),
            
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 10,
        });

    }, [data, filters, project_id, queryClient]);

    return { data, isPending, error }

}