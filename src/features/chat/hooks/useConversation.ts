import { useAuthStore } from "@/auth-layout/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { getConversationByUserApi, getConversationDetailApi } from "../chat.api";
import { useParams } from "react-router-dom";






export const useConversation = () => {
    const user_id = useAuthStore((state) => state.user?.user_id);

    const query = useQuery({
        queryKey: ["conversations", user_id],
        queryFn: async () => {
            if (!user_id) {
                throw new Error("User ID is required");
            }
            return getConversationByUserApi(Number(user_id));
        },
        enabled: !!user_id,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });

    return {
        conversations: query.data,
        isPending: query.isPending,
        error: query.error,
    };
};

export const useConversationDetail = () => {

    const { conversation_id } = useParams();

    const query = useQuery({
        queryKey: ["conversation", conversation_id],
        queryFn: async () => {
            if (!conversation_id) {
                throw new Error("ID is required");
            }
            return getConversationDetailApi(Number(conversation_id));
        },
        enabled: !!conversation_id,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });

    return {
        conversation: query.data,
        isPending: query.isPending,
        error: query.error,
    };
};
