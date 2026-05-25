import { useEffect } from "react"
import { socket } from "@/socket/socket"
import { useQueryClient } from "@tanstack/react-query"
import { useChatStore } from "@/features/chat/store/useChatStore"
import type { Message } from "../chat.model"

export const useChatSocket = (conversationId?: string, userId?: number) => {
  const queryClient = useQueryClient()
  const setTyping = useChatStore((s) => s.setTyping)
  const setOnlineUsers = useChatStore((s) => s.setOnlineUsers)

  useEffect(() => {
    if (!conversationId || !userId) return

    socket.connect()
    socket.emit("user:online", userId)

    // 📩 incoming message → update React Query
    socket.on("message:receive", (message) => {
      queryClient.setQueryData(
        ["messages", conversationId],
        (old: Message[] = []) => [...old, message]
      )
    })

    // 👥 online users
    socket.on("users:online", setOnlineUsers)

    // ✍️ typing
    socket.on("typing:start", ({ sender_id }) => {
      setTyping(sender_id, true)
    })

    socket.on("typing:stop", ({ sender_id }) => {
      setTyping(sender_id, false)
    })

    return () => {
      socket.off("message:receive")
      socket.off("users:online")
      socket.off("typing:start")
      socket.off("typing:stop")
    }
  }, [conversationId, userId])
}