import { useAuthStore } from "@/auth-layout/store/useAuthStore"
import { socket } from "@/socket/socket"
import { useEffect } from "react"
import type { Conversation, Message } from "../chat.model"
import { useQueryClient } from "@tanstack/react-query"
import { useChatStore } from "../store/useChatStore"



export const useInboxSocket = () => {

    const user_id = useAuthStore(state => state.user?.user_id);
    const setOnlineUsers = useChatStore((s) => s.setOnlineUsers)
    const queryClient = useQueryClient()

    useEffect(() => {
    if (!user_id) return

    if (!socket.connected) {
        socket.connect()
    }

    socket.emit("user:online", user_id)

    socket.on("users:online", setOnlineUsers);

    const conversationUpdateHandler = (message: Conversation) => {
    //   console.log(message)

        queryClient.setQueryData(
            ["conversations", user_id],
            (old: Conversation[] | undefined) => {
                if (!Array.isArray(old)) return [];

                return old.map(c =>
                c.conversation_id == message.conversation_id
                    ? { 
                        ...c, 
                        last_message: 
                        message.last_message,
                        last_message_at: message.last_message_at
                    }
                    : c
                );
            }
        );

    }

    socket.on("conversation:new", (conv: Message) => {
        queryClient.setQueryData(["conversations"], (old: Conversation[] = []) => [
            conv,
            ...old
        ])
    })

    socket.on("conversation:update", conversationUpdateHandler)

    return () => {
        socket.off("users:online")
        socket.off("conversation:new")
        socket.off("conversation:update")
    }
    }, [user_id])


}