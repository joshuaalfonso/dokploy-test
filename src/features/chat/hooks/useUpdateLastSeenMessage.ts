import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLastSeenMessageApi } from "../chat.api";
import { useAuthStore } from "@/auth-layout/store/useAuthStore";
import type { Conversation } from "../chat.model";



export const useUpdateLastSeenMessage = () => {

    const user_id = useAuthStore(state => state.user)?.user_id;

    const queryClient = useQueryClient();

    const { mutate: updateLastSeenMessageMutation, isPending: isUpdating } = useMutation({
        mutationFn: updateLastSeenMessageApi,
        onSuccess: (_, variables) => {
            
            const { conversation_id, last_read_message_id } = variables

            queryClient.setQueryData(
                ["conversations", user_id],
                (old: Conversation[] | undefined) => {
                // console.log(old)
                if (!Array.isArray(old)) return [];

                const data = old.find(c => c.conversation_id == conversation_id);
                if (!data) return old;
                return old.map(c =>
                c.conversation_id === conversation_id
                    ? {
                        ...c,
                        unread_count: 0,
                    }
                    : c
                );

                }
            )

            if (conversation_id && user_id) {
                queryClient.setQueryData(
                    ["conversation", String(conversation_id), user_id],
                    (old: Conversation | undefined) => {
                        if (!old) return
    
                        return {
                            ...old, 
                            last_read_message_id
                        }
                    }
                )
            }
            

        }
    })

    return { updateLastSeenMessageMutation, isUpdating }


}

