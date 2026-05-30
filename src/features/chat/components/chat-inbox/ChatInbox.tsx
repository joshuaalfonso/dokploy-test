
import { useWorkspaceMember } from '@/features/workspace-member/hooks/useWorkspaceMember';
import { Flex, Heading, Alert } from '@chakra-ui/react';
import { useChatStore } from '../../store/useChatStore';
import { useAuthStore } from '@/auth-layout/store/useAuthStore';
import { useConversation } from '../../hooks/useConversation';
import Empty from '@/shared/components/EmptyState';
import { LuMessageCircleQuestion } from 'react-icons/lu';
import ConversationLoader from '../chat-sidebar/components/ConversationLoader';
// import { formatMessageDate } from '@/lib/formatDate';
import { useMemo } from 'react';
import MemberList from './components/MemberList';
import InboxList from './components/InboxList';



const ChatInbox = () => {

    const user = 
        useAuthStore(state => state.user);

    // const conversationId = 
    //     useChatStore(state => state.selectedConversationId);

    const { 
        workspaceMembers, 
        isPending: isWorkspaceMembersLoading, 
        error: workspaceMemberError 
    } = useWorkspaceMember();

    const { 
        conversations, 
        isPending: isConversationLoading, 
        error: conversationError 
    } = useConversation();

    const onlineUsers = 
        useChatStore(state => state.onlineUsers);

    const filteredMembers = 
        workspaceMembers ? workspaceMembers.filter(item => +item.user_id != user?.user_id) : [];

   const enrichedConversations = useMemo(() => {
        return conversations?.map(conv => ({
            ...conv,
            isOnline: onlineUsers.includes(conv.user_id),
        }));
    }, [conversations, onlineUsers]);


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
                            <MemberList members={filteredMembers ?? []} />
                        ) }

                    </>
                ) }

                { isConversationLoading ? (
                    <>
                        <ConversationLoader count={6} />
                    </>
                ) : (
                    <>
                        { conversations?.length === 0 && !conversationError ? (
                            <Empty
                                title="Chat is empty" 
                                description="Click workspace member above to begin chatting with someone."
                                icon={<LuMessageCircleQuestion />}
                            />
                        ) : (
                            <InboxList conversations={enrichedConversations ?? []}  />
                        ) }

                        { conversationError && (
                            <Alert.Root status="error">
                                <Alert.Indicator />
                                <Alert.Title>Failed to load chats</Alert.Title>
                            </Alert.Root>
                        ) }

                    </>
                ) }

                

            </div>

        </Flex>
    )
}

export default ChatInbox