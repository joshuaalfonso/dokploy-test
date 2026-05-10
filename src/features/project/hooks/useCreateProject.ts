import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProjectApi } from "../project.api"



export const useCreateProject = () => {

    const queryClient = useQueryClient();

    const { mutate: createProjectMutation, isPending: isCreating } = useMutation({
        mutationFn: createProjectApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['projects']
            })
        }
    })

    return { createProjectMutation, isCreating }


}