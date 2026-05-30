import { useAuthStore } from "@/auth-layout/store/useAuthStore"
import type { Conversation } from "@/features/chat/chat.model"
import { useChatStore } from "@/features/chat/store/useChatStore"
import { formatMessageDate } from "@/lib/formatDate"
import { Avatar, Box, Circle, Flex, Float, Stack, Status, Text } from "@chakra-ui/react"



interface InboxListProps {
    conversations: Conversation[]
}

const InboxList = ( {conversations}: InboxListProps ) => {


    const userId = useAuthStore(state => state.user)?.user_id;
    const conversationId = useChatStore(state => state.selectedConversationId);


    return (
        <Stack direction={'column'} spaceY={1}>
        
            {conversations?.map(item => {


                return (
                    <Box
                        cursor={'pointer'} 
                        _hover={{background: 'bg.muted'}} 
                        background={conversationId == item.conversation_id ? 'bg.muted' : 'bg'}
                        py={2} 
                        px={3} 
                        rounded={'md'}
                        key={item.conversation_id}
                    >
                        <Flex alignItems={'center'} gap={3} >

                            <Avatar.Root size={'sm'} variant={'solid'} >

                                <Avatar.Fallback name={item.full_name} />

                                <Float placement="bottom-end" offsetX="1" offsetY="1">
                                    {item.is_online && (
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
                                    <Text 
                                        fontSize={'sm'} 
                                        fontWeight={'semibold'}
                                    >
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

                                <Flex 
                                    justifyContent={'space-between'} 
                                    alignItems={'center'}
                                >
                                    {item.unread_count > 1 
                                    ? (
                                        <Text 
                                            fontSize={'xs'} 
                                            color={item.unread_count > 1 ? 'fg' : 'fg.muted'}
                                        >
                                            { item.unread_count + ' new messages' }
                                        </Text>
                                        ) 
                                    : (
                                            <Text 
                                                fontSize={'xs'} 
                                                color={item.unread_count > 0 ? 'fg' : 'fg.muted'}
                                            >
                                                { userId == item.sender_id && 'You: ' } {item.last_message}
                                            </Text>
                                    ) }
                                    {item.unread_count > 0 && (
                                        <Status.Root colorPalette="blue">
                                            <Status.Indicator />
                                        </Status.Root>
                                    )}
                                </Flex>
                            </Flex>

                        </Flex>
                    </Box>
                )
            })}
        </Stack>
    )
}

export default InboxList