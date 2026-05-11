import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPaginatedProjectByUserApi, getProjectByWorkspaceApi } from "../project.api";
import { useParams } from "react-router-dom";
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
        enabled: !!workspace_id
    })

    return { user_project, isPending, error }

}


export function usePaginatedProject(filters: {
    search: string
    status: string
    sort: 'asc' | 'desc'
}) {

    const { workspace_id } = useParams();

    return useInfiniteQuery({
        queryKey: ['projects', filters],

        initialPageParam: null as string | null,

        queryFn: ({ pageParam }) =>
        getPaginatedProjectByUserApi(Number(workspace_id), {
            ...filters,
            cursor: pageParam,
        }),

        getNextPageParam: (lastPage) =>
        lastPage.next_cursor ?? undefined,
    })
}