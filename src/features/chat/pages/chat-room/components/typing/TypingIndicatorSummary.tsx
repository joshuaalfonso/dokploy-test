







import { useChatStore } from '@/features/chat/store/useChatStore';

export const TypingIndicatorSummary = () => {
  // Get the entire typingUsers object
  const typingUsers = useChatStore((state) => state.typingUsers);

  // Filter out the IDs where the value is true
  const typingUserIds = Object.keys(typingUsers)
    .filter((id) => typingUsers[Number(id)])
    .map(Number);

    console.log(typingUserIds)

  if (typingUserIds.length === 0) return null;

  return (
    <div className="typing-summary text-gray-500 italic text-sm">
      {typingUserIds.length === 1
        ? `User ${typingUserIds[0]} is typing...`
        : `${typingUserIds.length} users are typing...`}
    </div>
  );
};