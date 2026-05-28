// import { useChatStore } from "@/features/chat/store/useChatStore"
import { useWorkspaceMember } from "@/features/workspace-member/hooks/useWorkspaceMember"
import { Avatar, Box, Text } from "@chakra-ui/react"






const ChatHeader = ({receiver_id}: {receiver_id: number}) => {


    // const {} = useChatStore();

    const { workspaceMembers } = useWorkspaceMember()

    const user = workspaceMembers?.find(item => +item.user_id == receiver_id);

    if (!user) return;

    return (
        <Box>
            <div className="flex items-center gap-3!">
                <Avatar.Root size={'sm'} variant={'solid'} >
                        <Avatar.Fallback name={user.full_name} />
                </Avatar.Root>
                <Text fontWeight={'semibold'}>{user.full_name}</Text>
            </div>
        </Box>
    )
}

export default ChatHeader