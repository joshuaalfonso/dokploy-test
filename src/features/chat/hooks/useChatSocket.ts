import { useEffect } from "react"
import { socket } from "@/socket/socket"
import { useQueryClient } from "@tanstack/react-query"
import { useChatStore } from "@/features/chat/store/useChatStore"
import type { Message } from "../chat.model"

export const useChatSocket = (
  conversationId?: string,
  userId?: number
) => {

  const queryClient = useQueryClient()

  const setTyping = useChatStore((s) => s.setTyping)
  const setOnlineUsers = useChatStore((s) => s.setOnlineUsers)

  // CONNECT SOCKET
  useEffect(() => {
    if (!userId) return

    socket.connect()

    socket.emit("user:online", userId)

    socket.on("users:online", setOnlineUsers)

    socket.on("typing:start", ({ sender_id }) => {
      setTyping(sender_id, true)
    })

    socket.on("typing:stop", ({ sender_id }) => {
      setTyping(sender_id, false)
    })

    return () => {
      socket.off("users:online")
      socket.off("typing:start")
      socket.off("typing:stop")
    }
  }, [userId])

  // JOIN CONVERSATION ROOM
  useEffect(() => {
    if (!conversationId) return

    socket.emit("conversation:join", conversationId)

    socket.on("message:receive", (message: Message) => {
      queryClient.setQueryData(
        ["messages", conversationId],
        (old: Message[] = []) => [...old, message]
      )
    })

    return () => {
      socket.emit("conversation:leave", conversationId)

      socket.off("message:receive")
    }
  }, [conversationId])
}