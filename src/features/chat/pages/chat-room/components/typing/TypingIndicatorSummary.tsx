
import { useChatStore } from '@/features/chat/store/useChatStore';
import LoadingTyping from '@/shared/components/LoadingTyping';
import { Flex } from "@chakra-ui/react"

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
    // <div className="typing-summary text-gray-500 italic text-sm">
    //   {typingUserIds.length === 1
    //     ? `User ${typingUserIds[0]} is typing...`
    //     : `${typingUserIds.length} users are typing...`}
    // </div>
    <>
      <div
                                             
        className={`flex justify-start!`}
      >
        <Flex alignItems={'center'} gap={3}>
            <div
                className={`
                    max-w-xs rounded-2xl px-4! py-2! rounded-bl-md bg-(--chakra-colors-bg-muted)!
                `}
            >
                <LoadingTyping />
            </div>
        </Flex>
      </div>
    </>
  );
};