import ChatEmpty from "../../pages/chat-empty/ChatEmpty";
import { useChatStore } from "../../store/useChatStore"








const ChatMessagePannel = () => {

    const conversationId = useChatStore(state => state.selectedConversationId);

    if (!conversationId) return <ChatEmpty /> 

    return (
        <div>ChatMessagePannel {conversationId}</div>
    )
}

export default ChatMessagePannel