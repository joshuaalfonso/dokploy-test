import { Center, Flex } from "@chakra-ui/react"
import ChatHeader from "./components/ChatHeader"
import { useMessage } from "../../hooks/useMessage"
import LoadingSpinner from "@/shared/components/LoadingSpinner"
import ChatMessage from "./components/ChatMessage"
import ChatInput from "./components/ChatInput"
import { useParams } from "react-router-dom"
// import { useAuthStore } from "@/auth-layout/store/useAuthStore"
import { useChatSocket } from "../../hooks/useChatSocket"
import { useConversationDetail } from "../../hooks/useConversation"



const ChatRoom = () => {

    const { conversation_id, receiver_id } = useParams()
    // const user = useAuthStore((s) => s.user)

    const isNewChat = !conversation_id;

    useChatSocket(
        isNewChat ? undefined : conversation_id,
        // user?.user_id
    )

    const { messages, isPending, error } = useMessage();

    const { conversation } = useConversationDetail();

        const targetReceiverId = isNewChat
        ? receiver_id
        : String(conversation?.user_id);

    // if (isPending) return (
    //     <Center w={'full'}>
    //         <LoadingSpinner />
    //     </Center>
    // );

    if (error) return <p>Failed to load messages</p>

    return (
        <>
        
            <Flex direction={'column'} gap={4} flex={1}>

                <ChatHeader />
                <ChatMessage messages={messages ?? []} />

                {targetReceiverId && (
                    <ChatInput receiver_id={targetReceiverId} />
                )}

            </Flex>
        
        </>
    )
}

export default ChatRoom