import { socket } from "@/socket/socket"

export const useSendMessage = () => {
  const sendMessage = (payload: {
    sender_id: number
    receiver_id: number
    text: string
  }) => {
    socket.emit("message:send", payload)
  }

  return { sendMessage }
}