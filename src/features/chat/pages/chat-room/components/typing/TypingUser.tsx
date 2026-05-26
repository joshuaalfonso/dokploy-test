


import { useChatStore } from "@/features/chat/store/useChatStore";
import React from "react";

interface UserStatusProps {
  userId: number;
  userName: string;
}

export const TypingUser: React.FC<UserStatusProps> = ({ userId, userName }) => {
  // Select only this specific user's typing state
  const isTyping = useChatStore((state) => !!state.typingUsers[userId]);

  return (
      <>
        {isTyping && <span className="typing-indicator"> {userName} is typing...</span>}
      </>
  )
};