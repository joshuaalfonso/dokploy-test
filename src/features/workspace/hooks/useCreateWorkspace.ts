import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createWorkspaceApi } from "../workspace.api"



export const useCreateWorkspace = () => {

    const queryClient = useQueryClient();

    const { mutate: createWorkspaceMutation, isPending: isCreating } = useMutation({
        mutationFn: createWorkspaceApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["workspaces"]
            })
        }
    })

    return { createWorkspaceMutation, isCreating }

}