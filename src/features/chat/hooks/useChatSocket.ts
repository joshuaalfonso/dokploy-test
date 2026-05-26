import { useEffect } from "react"
import { socket } from "@/socket/socket"
import { useQueryClient } from "@tanstack/react-query"
import { useChatStore } from "@/features/chat/store/useChatStore"
import type {  Message } from "../chat.model"

export const useChatSocket = (
  conversationId?: string
) => {

  const queryClient = useQueryClient()

  const setTyping = useChatStore((s) => s.setTyping)
  // const setOnlineUsers = useChatStore((s) => s.setOnlineUsers)



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

    const handler = (message: Message) => {
      // console.log(message)

      try {
        queryClient.setQueryData(
          ["messages", conversationId],
          (old: Message[] = []) => [...old, message]
        )
      } catch (e) {
        console.error("setQueryData error:", e)
      }

      // console.log("conversation id is:", conversationId)
    }

    socket.on("message:receive", handler)

    return () => {
      socket.emit("conversation:leave", conversationId)
      socket.off("message:receive", handler)
      socket.off("typing:start")
      socket.off("typing:stop");
    }
  }, [conversationId, queryClient])
}


  // CONNECT SOCKET
  // useEffect(() => {
  //   if (!userId) return

  //   if (!socket.connected) {
  //     socket.connect()
  //   }

  //   socket.emit("user:online", userId)

  //   socket.on("users:online", setOnlineUsers)

  //   socket.on("conversation:new", (conv: Message) => {
  //     queryClient.setQueryData(["conversations"], (old: Conversation[] = []) => [
  //       conv,
  //       ...old
  //     ])
  //   })

  //   socket.on("conversation:update", (conv) => {
  //      console.log("conversation:update received:", conv)

  //     queryClient.setQueryData(["conversations"], (old: Conversation[] = []) =>
  //       old.map(c =>
  //         c.conversation_id == conv.conversation_id
  //           ? { ...c, ...conv }
  //           : c
  //       )
  //     )
  //   })

  //   return () => {
  //     socket.off("users:online")
  //     socket.off("conversation:new")
  //     socket.off("conversation:update")
  //   }
  // }, [userId])


//  queryClient.setQueryData(
      //   ["conversation"],
      //   (oldInbox: Conversation[] = []) =>
      //     oldInbox.map(conv =>
      //       conv.conversation_id == +conversationId
      //         ? {
      //             ...conv,
      //             last_message: new Date(),
      //             text: message.text
      //           }
      //         : conv
      //     )
      // )