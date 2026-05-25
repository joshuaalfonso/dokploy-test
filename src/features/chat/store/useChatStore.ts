import { create } from "zustand"

type ChatStore = {
  typingUsers: Record<number, boolean>
  onlineUsers: number[]

  setTyping: (userId: number, value: boolean) => void
  setOnlineUsers: (users: number[]) => void
}

export const useChatStore = create<ChatStore>((set) => ({
  typingUsers: {},
  onlineUsers: [],

  setTyping: (userId, value) =>
    set((state) => ({
      typingUsers: {
        ...state.typingUsers,
        [userId]: value,
      },
    })),

  setOnlineUsers: (users) => set({ onlineUsers: users }),
}))