import { io } from 'socket.io-client'

// export const socket = io('http://10.10.2.117:3000', {
export const socket = io('http://192.168.1.31:3000', {
  autoConnect: false,
})