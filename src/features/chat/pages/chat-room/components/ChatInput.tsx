import { useAuthStore } from "@/auth-layout/store/useAuthStore"
// import { useConversation } from "@/features/chat/hooks/useConversation"
import { useSendMessage } from "@/features/chat/hooks/useSendMessage"
import { useTyping } from "@/features/chat/hooks/useTyping"
import { Button, Group, Input } from "@chakra-ui/react"
import { useState } from "react"



const ChatInput = ({ receiver_id }: { receiver_id: string }) => {

    const user = useAuthStore((s) => s.user);

    const [text, setText] = useState("")
    const { sendMessage } = useSendMessage()

    const { emitTyping } = useTyping(
        user!.user_id,
        Number(receiver_id)
    )

    const handleSend = () => {
        if (!text.trim()) return

        sendMessage({
            sender_id: user!.user_id,
            receiver_id: Number(receiver_id),
            text,
        })

        setText("")
    }

    return (
        <Group attached>
            <Input
                value={text}
                onChange={(e) => {
                    setText(e.target.value)
                    emitTyping()
                }}
                onKeyDown={(e) => { 
                    if (e.key === "Enter") handleSend()
                }}
            />

            <Button onClick={handleSend}>Send</Button>
        </Group>
    )
}

export default ChatInput