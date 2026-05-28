import { useAuthStore } from "@/auth-layout/store/useAuthStore";
import { useWorkspaceMember } from "@/features/workspace-member/hooks/useWorkspaceMember"
import { Avatar, Box, defineStyle, Flex, Heading, ScrollArea, Stack, Text, Float, Circle, Badge } from "@chakra-ui/react"
import { useConversation } from "../../hooks/useConversation";
// import LoadingSpinner from "@/shared/components/LoadingSpinner";
import Empty from "@/shared/components/EmptyState";
import { LuMessageCircleQuestion } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { formatMessageDate } from "@/lib/formatDate";
// import "@aejkatappaja/phantom-ui";
import ConversationLoader from "./components/ConversationLoader";
import { useChatStore } from "../../store/useChatStore";


const ringCss = defineStyle({
    outlineWidth: "2px",
    outlineColor: "colorPalette.500",
    outlineOffset: "2px",
    outlineStyle: "solid",
})


const ChatSidebar = () => {


    const { workspaceMembers } = useWorkspaceMember();

    const { conversation_id } = useParams();

    const user = useAuthStore(state => state.user);
    const onlineUsers = useChatStore(state => state.onlineUsers);

    // console.log(onlineUsers)

    const members = workspaceMembers ? workspaceMembers.filter(item => +item.user_id != user?.user_id) : [];

    const { conversations, isPending: isConversationLoading, error: conversationError } = useConversation();

    // console.log(conversations)

    const enrichedConversations = conversations?.map(conv => ({
        ...conv,
        isOnline: onlineUsers.includes(conv.user_id),
    }));

    const navigate = useNavigate();


    return (
        <Flex
            direction={'column'} 
            gap={4} 
            maxW={'350px'} 
            w={'full'}
            // borderRight={'1px solid var(--chakra-colors-border)'}
            // p={6}
        >

            <div className="space-y-4!">
                <Heading>Chat</Heading>
                <ScrollArea.Root height="auto" size="xs">
                    <ScrollArea.Viewport>
                        <ScrollArea.Content py={4} px={4}>
                            <Flex gap="4" flexWrap="nowrap" alignItems={'center'}>
                                {members?.map(item => (
                                    <Avatar.Root css={ringCss} key={item.user_id}>
                                        <Avatar.Fallback name={item.full_name} />
                                    </Avatar.Root>
                                ))}
                            </Flex>
                        </ScrollArea.Content>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar orientation="horizontal" />
                    <ScrollArea.Corner />
                </ScrollArea.Root>
                
            </div>

            {/* <phantom-ui loading={true}>
                <div className="card">
                    <img src={ "/placeholder.png"} className="avatar" />
                    <h3>{"Placeholder Name"}</h3>
                    <p>{"A short bio goes here for measurement."}</p>
                </div>
            </phantom-ui> */}

            { isConversationLoading ? (
                <>
                    {/* <LoadingSpinner /> */}
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
                        <Stack direction={'column'} spaceY={1}>

                            {enrichedConversations?.map(item => {

                                const unreadCount =
                                    item.last_message_id -
                                    item.last_read_message_id;

                                return (
                                    <Box
                                        cursor={'pointer'} 
                                        _hover={{background: 'bg.muted'}} 
                                        background={Number(conversation_id) == item.conversation_id ? 'bg.muted' : 'bg'}
                                        py={2} 
                                        px={3} 
                                        rounded={'md'}
                                        key={item.user_id}
                                        onClick={() => navigate(`${item.conversation_id}`)}
                                    >
                                        <Flex alignItems={'center'} gap={3} >

                                            <Avatar.Root size={'sm'} variant={'solid'} >
                                                <Avatar.Fallback name={item.full_name} />
                                                <Float placement="bottom-end" offsetX="1" offsetY="1">
                                                    {item.isOnline && (
                                                        <Circle
                                                            bg="green.500"
                                                            size="8px"
                                                            outline="0.2em solid"
                                                            outlineColor="bg"
                                                        />
                                                    )}
                                            </Float>
                                            </Avatar.Root>
                                            
                                            <Flex direction={'column'} gap={0} w={'full'}>
                                                <Flex justifyContent={'space-between'}>
                                                    <Text fontSize={'sm'} fontWeight={'semibold'}>
                                                        {item.full_name}
                                                    </Text>
                                                    <Text 
                                                        fontSize={'xs'} 
                                                        fontWeight={''} 
                                                        color={'fg.muted'}
                                                    >
                                                        { formatMessageDate(new Date(item.last_message_at)) }
                                                    </Text>
                                                </Flex>
                                                <Flex justifyContent={'space-between'} alignItems={'center'}>
                                                    <Text 
                                                        fontSize={'xs'} 
                                                        color={unreadCount > 0 ? 'fg' : 'fg.muted'}
                                                    >
                                                        { user?.user_id == item.sender_id && 'You: ' } {item.last_message}
                                                    </Text>
                                                    {unreadCount >= 1 && (
                                                        <Badge variant={'solid'} rounded={'full'}>
                                                            {unreadCount}
                                                        </Badge>
                                                    )}
                                                </Flex>
                                            </Flex>

                                        </Flex>
                                    </Box>
                                )
                            })}
                        </Stack>
                    ) }

                    { conversationError && (
                        <>
                            Failed to load conversations
                        </>
                    ) }
                </>
            ) }

        </Flex>
    )
}

export default ChatSidebar