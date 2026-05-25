import { Flex } from "@chakra-ui/react"
import ChatHeader from "./components/ChatHeader"
import { useMessage } from "../../hooks/useMessage"
import LoadingSpinner from "@/shared/components/LoadingSpinner"
import ChatMessage from "./components/ChatMessage"
import ChatInput from "./components/ChatInput"
import { useParams } from "react-router-dom"
import { useAuthStore } from "@/auth-layout/store/useAuthStore"
import { useChatSocket } from "../../hooks/useChatSocket"



const ChatRoom = () => {

    const { conversation_id } = useParams()
    const user = useAuthStore((s) => s.user)

    useChatSocket(conversation_id, user?.user_id)

    const { messages, isPending, error } = useMessage();

    if (isPending) return <LoadingSpinner />;

    if (error) return <p>Failed to load messages</p>

    return (
        <>
        
            <Flex direction={'column'} gap={4} flex={1}>

                <ChatHeader />
                <ChatMessage messages={messages ?? []} />
                <ChatInput conversation_id={conversation_id ?? ''} />

            </Flex>
        
        </>
    )
}

export default ChatRoom