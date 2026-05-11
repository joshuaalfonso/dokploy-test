import { useQuery } from "@tanstack/react-query";
import { getWorkspaceApi, getWorkspaceByUserApi } from "../workspace.api";
import { useAuthStore } from "@/auth-layout/store/useAuthStore";



export const useWorkspaces = () => {

    const { data: workspaces, isPending, error } = useQuery({
        queryKey: ['workspaces'],
        queryFn: getWorkspaceApi
    })

    return { workspaces, isPending, error }

}


export const useWorkspaceByUser = () => {

    const user_id = useAuthStore((state) => state.user?.user_id);

    const { data: user_workspaces, isPending, error } = useQuery({
        queryKey: ['workspaces', user_id],
        queryFn: () => getWorkspaceByUserApi(user_id!),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        enabled: !!user_id
    })

    return { user_workspaces, isPending, error }

}