import { useQuery } from "@tanstack/react-query";
import { getMessageApi } from "../chat.api";
import { useParams } from "react-router-dom";



export const useMessage = () => {

    const { conversation_id } = useParams();

    const query = useQuery({
        queryKey: ["messages", conversation_id],
        queryFn: async () => {
            if (!conversation_id) {
                throw new Error("Missing ID is required");
            }
            return getMessageApi(Number(conversation_id));
        },
        enabled: !!conversation_id,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });

    return {
        messages: query.data,
        isPending: query.fetchStatus === 'fetching',
        error: query.error,
    };
};