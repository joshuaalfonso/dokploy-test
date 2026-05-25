import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMessageApi } from "../chat.api";



export const useConversation = () => {
    // const user_id = useAuthStore((state) => state.user?.user_id);

    const { conversation_id } = useParams();

    const query = useQuery({
        queryKey: ["messages", conversation_id],
        queryFn: async () => {
        if (!conversation_id) {
            throw new Error("User ID is required");
        }
        return getMessageApi(Number(conversation_id));
        },
        enabled: !!conversation_id,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });

    return {
        conversations: query.data,
        isPending: query.isPending,
        error: query.error,
    };
};