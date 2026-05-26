// hooks/useTyping.ts

import { useRef } from 'react'
import { socket } from '@/socket/socket'

export const useTyping = (
    sender_id: number,
    receiver_id: number,
) => {
const timeoutRef  = useRef<ReturnType<typeof setTimeout> | null>(null)

    const emitTyping = () => {

        socket.emit('typing:start', {
            sender_id,
            receiver_id,
        })

        if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            socket.emit('typing:stop', {
                sender_id,
                receiver_id,
            })
        }, 1000)
    }

  return { emitTyping }

}