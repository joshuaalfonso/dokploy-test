import {  Flex } from "@chakra-ui/react"
import ChatHeader from "./components/ChatHeader"
import { useMessage } from "../../hooks/useMessage"
import ChatMessage from "./components/ChatMessage"
import ChatInput from "./components/ChatInput"
import { useParams } from "react-router-dom"
import { useConversationDetail } from "../../hooks/useConversation"
import { useUpdateLastSeenMessage } from "../../hooks/useUpdateLastSeenMessage"
import { useEffect } from "react"
import { useConversationSocket } from "../../hooks/useConversationSocket"



const ChatRoom = () => {

    const { conversation_id, receiver_id } = useParams()

    const isNewChat = !conversation_id;

    useConversationSocket(
        isNewChat ? undefined : conversation_id
    )
 
    const { messages, error } = useMessage();

    const { conversation } = useConversationDetail();

    // console.log(conversation)

    const { updateLastSeenMessageMutation } = useUpdateLastSeenMessage();

    const targetReceiverId = isNewChat
    ? receiver_id
    : String(conversation?.user_id);

    useEffect(() => {
        if (!conversation?.last_message_id || !conversation?.conversation_id) return;

        updateLastSeenMessageMutation({
            conversation_id: conversation.conversation_id,
            last_read_message_id: conversation.last_message_id
        });
    }, [
        conversation?.conversation_id,
        conversation?.last_message_id,
        updateLastSeenMessageMutation
    ]);

    if (error) return <p>Failed to load messages</p>

    return (
        <>
        
            <Flex direction={'column'} gap={4} flex={1}>

                <ChatHeader receiver_id={Number(targetReceiverId ?? 0)} />
                <ChatMessage messages={messages ?? []} />

                {targetReceiverId && (
                    <ChatInput receiver_id={targetReceiverId} />
                )}

            </Flex>
        
        </>
    )
}

export default ChatRoom