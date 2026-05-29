// import { Conversation } from './../chat.model';
import { useAuthStore } from "@/auth-layout/store/useAuthStore"
import { socket } from "@/socket/socket"
import { useEffect } from "react"
import type { Conversation, Message } from "../chat.model"
import { useQueryClient } from "@tanstack/react-query"
import { useChatStore } from "../store/useChatStore"
import { useParams } from "react-router-dom"



export const useChatSocket = () => {

    const { conversation_id } = useParams();
    const user_id = useAuthStore(state => state.user?.user_id);
    const setOnlineUsers = useChatStore((s) => s.setOnlineUsers)
    const queryClient = useQueryClient()

    console.log(conversation_id)

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
            // console.log(old)
            if (!Array.isArray(old)) return [];

            if (conversation.sender_id != user_id) {
                const audio = new Audio('/src/assets/message.mp3');
                audio.play();
            }

            const oldConversation = old.find(c => c.conversation_id == conversation.conversation_id);
            if (!oldConversation) {
                console.log('no conversation found')
                return
            }
            const last_read_message_id = oldConversation?.last_read_message_id;
            
            const unread_count = 
              conversation.sender_id === user_id
                ? oldConversation.unread_count
                : oldConversation.unread_count + 1

            if (oldConversation) {
                return old.map(c =>
                oldConversation?.conversation_id === c.conversation_id
                    ? {
                        ...c,
                        last_read_message_id,
                        last_message_id: conversation.last_message_id,
                        last_message: conversation.last_message,
                        last_message_at: conversation.last_message_at,
                        unread_count
                    }
                    : c
                );
            } else {
                return [{...conversation, last_read_message_id, unread_count}, ...old]
            }

            // return [{...conversation, last_read_message_id, unread_count}, ...filtered]

            }
        )

        // queryClient.setQueryData(
        //     ["conversation", String(conversation_id), user_id],
        //     (old: Conversation | undefined) => {
        //         if (!old) return
        //         return {
        //             ...old, 
        //             last_message_id: conversation.last_message_id,
        //             last_message: conversation.last_message
        //         }
        //     }
        // )


        if (conversation_id) {
            queryClient.setQueryData(
                ["conversation", String(conversation_id), user_id],
                (old: Conversation | undefined) => {
                    if (!old) return

                    return {
                        ...old, 
                        last_message: conversation.last_message, 
                        last_message_id: conversation.last_message_id,
                    }
                }
            )
        }

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
    }, [user_id, setOnlineUsers])


}