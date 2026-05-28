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

    const conversationUpdateHandler = ({conversation}: {conversation: Conversation}) => {
        //   console.log(conversation)

        queryClient.setQueryData(
            ["conversations", user_id],
            (old: Conversation[] | undefined) => {
            // console.log('old inbox: ' + old)
            if (!Array.isArray(old)) return [];

            const filtered = old.filter(
                c => c.conversation_id != conversation.conversation_id
            )

            return [conversation, ...filtered]

            }
        )

        if (document.visibilityState === "visible") return;

        if ("Notification" in window && Notification.permission === "granted") {
            new Notification("New Message", {
                body: conversation.last_message,
                icon: "/vite.svg", 
            });
        }

    }

    socket.on("conversation:new", (conv: Message) => {
        // queryClient.setQueryData(["conversations"], (old: Conversation[] = []) => [
        //     conv,
        //     ...old
        // ])

        console.log(conv)
    })
    

    socket.on("conversation:update", conversationUpdateHandler)

    return () => {
        socket.off("users:online")
        socket.off("conversation:new")
        socket.off("conversation:update")
        socket.disconnect()
    }
    }, [user_id])


}