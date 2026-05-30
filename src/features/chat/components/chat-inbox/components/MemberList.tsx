import { toaster } from "@/components/ui/toaster"
import { useCreateConversation } from "@/features/chat/hooks/useCreateConversation"
import { useChatStore } from "@/features/chat/store/useChatStore"
import type { WorkspaceMember } from "@/features/workspace-member/workspace-member.model"
import { getApiErrorMessage } from "@/lib/errorMessage"
import { Avatar, Flex, ScrollArea } from "@chakra-ui/react"


interface MemberListProps {
    members: WorkspaceMember[]
}

const MemberList = ({ members }: MemberListProps) => {


    const { createConversationMutation, isCreating } = useCreateConversation();
    const setConversation = useChatStore(state => state.setSelectedConversationId);

    const handleClick = (receiver_id: number) => {

        if (!receiver_id) return;

        createConversationMutation(
            receiver_id,
            {
                onSuccess: (response) => {
                    if (response.conversation_id) {
                        setConversation(response.conversation_id);
                    }
                },
                onError: (err) => {
                    console.log(err)
                    toaster.create({
                        title: 'Unavailable',
                        description: getApiErrorMessage(err)
                    })
                }
            }
        )


    }


    return (
        <ScrollArea.Root 
            height="auto" 
            size="xs"
        >
            <ScrollArea.Viewport>
                <ScrollArea.Content py={4} px={4}>
                    <Flex 
                        gap="4" 
                        flexWrap="nowrap" 
                        alignItems={'center'}
                    >
                        {members?.map(item => (
                            <Avatar.Root  
                                key={item.user_id} 
                                cursor={ isCreating ? 'not-allowed': 'pointer'}
                                opacity={isCreating ? 0.6: 1}
                                onClick={() => handleClick(Number(item.user_id))}
                            >
                                <Avatar.Fallback 
                                    name={item.full_name} 
                                />
                            </Avatar.Root>
                        ))}
                    </Flex>
                </ScrollArea.Content>

            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation="horizontal" />
            <ScrollArea.Corner />

        </ScrollArea.Root>
    )
}

export default MemberList