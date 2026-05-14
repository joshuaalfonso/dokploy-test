import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTaskApi } from "../projectTask.api";



export const useCreateTask = () => {

    const queryClient = useQueryClient();

    const { mutate: createTaskMutation, isPending: isCreating } = useMutation({
        mutationFn: createTaskApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"]
            })
        }
    })

    return { createTaskMutation, isCreating }

}