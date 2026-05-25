





export interface Conversation {
    conversation_id: number,
    user_id: number,
    full_name: string,
    last_message: string,
    last_message_at: string
    created_at: string
}


export interface Message {
    message_id: number
    conversation_id: number
    sender_id: number
    body: string
    text: string
    is_del: number
    created_at: string
    full_name: string
    email: string
}