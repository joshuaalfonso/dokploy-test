
import { useWorkspaceMember } from '@/features/workspace-member/hooks/useWorkspaceMember';
import { Flex, Heading, ScrollArea, Avatar, Alert } from '@chakra-ui/react';
import { useChatStore } from '../store/useChatStore';
// import { useConversation } from '../hooks/useConversation';
import { useAuthStore } from '@/auth-layout/store/useAuthStore';



const ChatInbox = () => {


    const user = useAuthStore(state => state.user);
    const { workspaceMembers, isPending: isWorkspaceMembersLoading, error: workspaceMemberError } = useWorkspaceMember();
    // const { conversations, isPending: isConversationLoading, error: conversationError } = useConversation();

    const onlineUsers = useChatStore(state => state.onlineUsers);

    const filteredMembers = workspaceMembers ? workspaceMembers.filter(item => +item.user_id != user?.user_id) : [];

    // const enrichedConversations = conversations?.map(conv => ({
    //     ...conv,
    //     isOnline: onlineUsers.includes(conv.user_id),
    // }));

    // console.log(workspaceMembers)
    console.log(onlineUsers)


    return (
        <Flex
            direction={'column'} 
            gap={4} 
            maxW={'350px'} 
            w={'full'}
        >

            <div className="space-y-4!">

                <Heading>Chat</Heading>

                { isWorkspaceMembersLoading ? (
                    <>
                        <p>Loading...</p>
                    </>
                ): (
                    <>
                        { workspaceMemberError && (
                            <Alert.Root status="error">
                                <Alert.Indicator />
                                <Alert.Title>Failed to load members</Alert.Title>
                            </Alert.Root>
                        ) }

                        { !workspaceMemberError && (
                            <ScrollArea.Root height="auto" size="xs">
                                <ScrollArea.Viewport>
                                    <ScrollArea.Content py={4} px={4}>
                                        <Flex gap="4" flexWrap="nowrap" alignItems={'center'}>
                                            {filteredMembers?.map(item => (
                                                <Avatar.Root  key={item.user_id}>
                                                    <Avatar.Fallback name={item.full_name} />
                                                </Avatar.Root>
                                            ))}
                                        </Flex>
                                    </ScrollArea.Content>
                                </ScrollArea.Viewport>
                                <ScrollArea.Scrollbar orientation="horizontal" />
                                <ScrollArea.Corner />
                            </ScrollArea.Root>
                        ) }

                    </>
                ) }

                

            </div>

            Sidebar
            
        </Flex>
    )
}

export default ChatInbox