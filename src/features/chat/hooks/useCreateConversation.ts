



import { useMutation } from "@tanstack/react-query"
import { createConversationApi } from "../chat.api";



export const useCreateConversation = () => {

    // const queryClient = useQueryClient();

    const { mutate: createConversationMutation, isPending: isCreating } = useMutation({
        mutationFn: createConversationApi,
        onSuccess: () => {
            // queryClient.invalidateQueries({
            //     queryKey: ['projects']
            // })

        }
    })

    return { createConversationMutation, isCreating }


}