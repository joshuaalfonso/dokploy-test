import { useEffect } from "react"
import { socket } from "@/socket/socket"
import { useQueryClient, type InfiniteData } from "@tanstack/react-query"
import { useChatStore } from "@/features/chat/store/useChatStore"
import type {  Conversation, Message } from "../chat.model"
// import { useAuthStore } from "@/auth-layout/store/useAuthStore"

interface MessagePage {
  data: Message[]
  nextCursor?: string
}

export const useConversationSocket = (
  conversationId?: string
) => {

  const queryClient = useQueryClient();


  // const user_id = useAuthStore(state => state.user?.user_id)

  const setTyping = useChatStore((s) => s.setTyping)
  // const setOnlineUsers = useChatStore((s) => s.setOnlineUsers)

  const handler = ({message}: {message: Message, conversation: Conversation}) => {
    // console.log(message)
    // console.log(conversation)

    try {

      queryClient.setQueryData<InfiniteData<MessagePage>>(["messages", conversationId], (old) => {
        if (!old?.pages?.length) return old;

        const firstPage = old.pages[0]

        return {
          ...old,
          pages: [
            {
              ...firstPage,
              data: [message, ...firstPage.data],
            },
            ...old.pages.slice(1),
          ],
        }
      })

      // queryClient.setQueryData(
      //   ["conversations", user_id],
      //   (old: Conversation[] | undefined) => {
      //     // console.log('old inbox: ' + old)
      //     if (!Array.isArray(old)) return [];

      //     const filtered = old.filter(
      //       c => c.conversation_id != conversation.conversation_id
      //     )

      //     return [conversation, ...filtered]

      //   }
      // )

    } catch (e) {
      console.error("setQueryData error:", e)
    }

  }

  // JOIN CONVERSATION ROOM
  useEffect(() => {
    if (!conversationId) return;

    socket.on("typing:start", ({ sender_id }) => {
      setTyping(sender_id, true)
    })

    socket.on("typing:stop", ({ sender_id }) => {
      setTyping(sender_id, false)
    })

    socket.emit("conversation:join", conversationId)

    socket.on("message:receive", handler)

    return () => {
      socket.emit("conversation:leave", conversationId)
      socket.off("message:receive")
      socket.off("typing:start")
      socket.off("typing:stop");
    }
  }, [conversationId, queryClient])
}

