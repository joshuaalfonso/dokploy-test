import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProjectApi } from "../project.api"



export const useUpdateProject = () => {

    const queryClient = useQueryClient();

    const { mutate: updateProjectMutation, isPending: isUpdating } = useMutation({
        mutationFn: updateProjectApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['projects']
            })
        }
    })

    return { updateProjectMutation, isUpdating }


}