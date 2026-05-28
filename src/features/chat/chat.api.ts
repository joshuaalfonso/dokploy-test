import api from "@/lib/axios";
import type { Conversation, Message } from "./chat.model";
import type { User } from "../signup/signUp.model";
import type { ApiResponse } from "@/shared/model/apiResponse.model";

interface LastSeenMessageUpdate {
    conversation_id: Conversation['conversation_id'], 
    last_read_message_id: Message['message_id']
}


const TABLE_NAME = 'chat/conversation';

export const getConversationByUserApi = async (user_id: User['user_id']) => {
    const res = await api.get<Conversation[]>(`/${TABLE_NAME}/${user_id}`);
    return res.data;
}

export const getMessageApi = async (conversation_id: Conversation['conversation_id'], before: number | null) => {
    const res = await api.get<{data: Message[], has_more: boolean}>(`/${TABLE_NAME}/${conversation_id}/message?before=${before}`);
    return res.data;
}

export const getConversationDetailApi = async (conversation_id: Conversation['conversation_id']) => {
    const res = await api.get<Conversation>(`/${TABLE_NAME}/${conversation_id}/detail`);
    return res.data;
}

export const updateLastSeenMessageApi = async (data: LastSeenMessageUpdate) => 
{
    const res = await api.put<ApiResponse>(`/${TABLE_NAME}/last-seen`, data);
    return res.data;
}