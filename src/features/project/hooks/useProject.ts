import {  useQuery, useQueryClient } from "@tanstack/react-query";
import { getPaginatedProjectByUserApi, getProjectByWorkspaceApi, getProjectMemberApi, getSingleProjectApi } from "../project.api";
import { useParams } from "react-router-dom";
import { useProjectParams } from "./useProjectParams";
import { useEffect } from "react";
// import type { ProjectStatus } from "../project.model";
// import type { ProjectStatus } from "../project.model";


// export const useProjectByUser = () => {

//     const user_id = useAuthStore((state) => state.user?.user_id);


//     const { data: user_project, isPending, error } = useQuery({
//         queryKey: ['projects', workspace_id, user_id],
//         queryFn: () => getProjectByUserApi(user_id!),
//         enabled: !!user_id
//     })

//     return { user_project, isPending, error }

// }


export const useProjectByWorkspace = () => {

    const { workspace_id } = useParams();

    const { data: user_project, isPending, error } = useQuery({
        queryKey: ['projects', workspace_id],
        queryFn: () => getProjectByWorkspaceApi(Number(workspace_id!)),
        enabled: !!workspace_id,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    })

    return { user_project, isPending, error }

}


export const useSingleProject = () => {

    const { project_id } = useParams();

    const { data: project, isPending, error } = useQuery({
        queryKey: ['projects', project_id],
        queryFn: () => getSingleProjectApi(Number(project_id!)),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        enabled: !!project_id
    })

    return { project, isPending, error }

}

export const useProjectMember = () => {

    const { project_id } = useParams();

    const { data: projectMembers, isPending, error } = useQuery({
        queryKey: ['project_members', project_id],
        queryFn: () => getProjectMemberApi(Number(project_id!)),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        enabled: !!project_id
    })

    return { projectMembers, isPending, error }

}



export function usePaginatedProject() {

    const queryClient = useQueryClient();

    const { workspace_id } = useParams();

    const { filters } = useProjectParams();

    const { data, isPending, error } = useQuery({
        queryKey: ['projects', workspace_id, filters],
        queryFn: () => 
            getPaginatedProjectByUserApi(Number(workspace_id || 0), filters),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        enabled: !!workspace_id
    } )

    useEffect(() => {
        
        if (!data?.hasMore) return;

        queryClient.prefetchQuery({
            queryKey: [
                'projects',
                workspace_id,
                {
                    ...filters,
                    page: filters.page + 1
                },
            ],

            queryFn: () =>
                getPaginatedProjectByUserApi(
                    Number(workspace_id || 0),
                    {
                        ...filters,
                        page: filters.page + 1
                    }
                ),
            
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 10,
        });

    }, [data, filters, workspace_id, queryClient]);

    return { data, isPending, error }

}