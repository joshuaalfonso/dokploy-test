import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLastSeenMessageApi } from "../chat.api";







export const useUpdateLastSeenMessage = () => {

    const queryClient = useQueryClient();

    const { mutate: updateLastSeenMessageMutation, isPending: isUpdating } = useMutation({
        mutationFn: updateLastSeenMessageApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['conversations']
            })
        }
    })

    return { updateLastSeenMessageMutation, isUpdating }


}