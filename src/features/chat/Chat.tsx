
import { Flex} from "@chakra-ui/react"

import ChatSidebar from "./components/chat-sidebar/ChatSidebar";
import { Outlet } from "react-router-dom";
// import { useAuthStore } from "@/auth-layout/store/useAuthStore";
// import { useChatSocket } from "./hooks/useChatSocket";


const Chat = () => {

    // const user = useAuthStore(state => state.user)

    // useChatSocket()


    // const [messages, setMessages] = useState<Message[]>([])
    // const [message, setMessage] = useState('')
    // const [onlineUsers, setOnlineUsers] = useState<string[]>([])
    // const [typing, setTyping] = useState(false);

    // console.log(onlineUsers);

    // const { messages: userMessages } = useMessage();

    // console.log(userMessages)

    // const my_id = 1;
    // const receiver_id = 6;

    // useEffect(() => {
    //     socket.connect();

    //     socket.emit('user:online', my_id);

    //     socket.on('message:receive', (data: Message) => {
    //         setMessages((prev) => [...prev, data])
    //     });

    //     socket.on('users:online', (users: string[]) => {
    //         setOnlineUsers(users)
    //     });

    //     socket.on('typing:start', () => {
    //         setTyping(true)
    //     });

    //     socket.on('typing:stop', () => {
    //         setTyping(false)
    //     });

    //     return () => {
    //         socket.disconnect()

    //         socket.off('message:receive')
    //         socket.off('users:online')
    //         socket.off('typing:start')
    //         socket.off('typing:stop')
    //     }

    // }, []);

    // const sendMessage = () => {
    //     if (!message.trim()) return

    //     socket.emit('message:send', {
    //         sender_id: my_id,
    //         receiver_id: receiver_id,
    //         text: message,
    //     })

    //     setMessage('');
    // };

    // const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

    // const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setMessage(e.target.value)

    //     socket.emit('typing:start', {
    //         sender_id: my_id,
    //         receiver_id,
    //     })

    //     if (typingTimeout.current) {
    //         clearTimeout(typingTimeout.current)
    //     }

    //     typingTimeout.current = setTimeout(() => {
    //         socket.emit('typing:stop', {
    //             sender_id: my_id,
    //             receiver_id: receiver_id,
    //         })
    //     }, 1000)
    // }


    return (
        
        <>
        
            <Flex 
                gap={8} 
                // borderWidth={'1px'}
                rounded={'md'}
                height={'85vh'}
            >

                <ChatSidebar />

                <Outlet />

                {/* <Flex 
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
                                        <Avatar.Root css={ringCss}>
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

                    { isConversationLoading ? (
                        <>
                            <LoadingSpinner />
                        </>
                    ) : (
                        <>
                            { conversations?.length == 0 ? (
                                <Empty 
                                    title="Chat is empty" 
                                    description="Click workspace member above to begin chatting with someone."
                                    icon={<LuMessageCircleQuestion />}
                                />
                            ) : (
                                <Stack direction={'column'} spaceY={1}>
                                    {conversations?.map(item => (
                                        <Box 
                                            cursor={'pointer'} 
                                            _hover={{background: 'bg.muted'}} 
                                            py={2} 
                                            px={3} 
                                            rounded={'md'}
                                            key={item.user_id}
                                            onClick={() => navigate(`?chat_id=${item.conversation_id}`)}
                                        >
                                            <Flex alignItems={'center'} gap={3} >
                                                <Avatar.Root size={'sm'} variant={'solid'} >
                                                    <Avatar.Fallback name={item.full_name} />
                                                </Avatar.Root>
                                                
                                                <Flex direction={'column'} gap={0} w={'full'}>
                                                    <Flex justifyContent={'space-between'}>
                                                        <Text fontSize={'sm'} fontWeight={'semibold'}>
                                                            {item.full_name}
                                                        </Text>
                                                        <Text fontSize={'xs'} fontWeight={''} color={'fg.muted'}>
                                                            { formatMessageDate(new Date(item.last_message_at)) }
                                                        </Text>
                                                    </Flex>
                                                    <Text fontSize={'xs'} color={'fg.muted'}>
                                                        {item.last_message}
                                                    </Text>
                                                </Flex>

                                            </Flex>
                                        </Box>
                                    ))}
                                </Stack>
                            ) }

                            { conversationError && (
                                <>
                                    Failed to load conversations
                                </>
                            ) }
                        </>
                    ) }

                </Flex> */}

                {/* <Flex direction={'column'} gap={4} flex={1}>

                    <Box>
                        <div className="flex items-center gap-3!">
                            <Avatar.Root size={'sm'} variant={'solid'} >
                                    <Avatar.Fallback name={'Alice'} />
                            </Avatar.Root>
                            <Text fontWeight={'semibold'}>Alice</Text>
                        </div>
                    </Box>


                     <ScrollArea.Root height="full" >
                        <ScrollArea.Viewport
                            css={{
                                "--scroll-shadow-size": "4rem",
                                maskImage: "linear-gradient(#000, #000)",
                                "&[data-overflow-y]": {
                                    maskImage:
                                    "linear-gradient(#000,#000,transparent 0,#000 var(--scroll-shadow-size),#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                                    "&[data-at-top]": {
                                    maskImage:
                                        "linear-gradient(180deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                                    },
                                    "&[data-at-bottom]": {
                                    maskImage:
                                        "linear-gradient(0deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                                    },
                                },
                            }}
                        >
                            <ScrollArea.Content spaceY="4" textStyle="sm">
                                <Box className="space-y-4! p-4 h-full overflow-y-auto!" pr={6}>
                                    {messages.map((msg, index) => {
                                        const isMine = msg.sender_id == my_id

                                        return (
                                            <div
                                                key={index}
                                                className={`flex ${
                                                    isMine ? 'justify-end' : 'justify-start'
                                                }`}
                                            >
                                                <Flex alignItems={'center'} gap={3}>
                                                    <div
                                                        className={`
                                                            max-w-xs rounded-2xl px-4! py-2!
                                                            ${
                                                                isMine
                                                                    ? 'rounded-br-md bg-(--chakra-colors-bg-inverted)! text-(--chakra-colors-fg-inverted)!'
                                                                    : 'rounded-bl-md bg-(--chakra-colors-bg-muted)!'
                                                            }
                                                        `}
                                                    >
                                                        {msg.text}
                                                    </div>
                                                </Flex>
                                            </div>
                                        )
                                    })}

                                    {typing && (
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
                                    )}
                                </Box>
                            </ScrollArea.Content>
                        </ScrollArea.Viewport>
                        <ScrollArea.Scrollbar>
                            <ScrollArea.Thumb />
                        </ScrollArea.Scrollbar>
                        <ScrollArea.Corner />
                    </ScrollArea.Root>

                    <Box>
                        <Group attached w="full" maxW="">
                            <Input
                                value={message}
                                onChange={handleTyping}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        sendMessage()
                                    }
                                }}
                                placeholder="Your message"
                                variant={'subtle'}
                                _placeholder={{ color: 'fg.muted' }}
                            />
                            <Button variant="solid" onClick={sendMessage}>
                                Send
                            </Button>
                        </Group>
                    </Box>
                    

                </Flex> */}

            </Flex>
        
        </>


    )


}

export default Chat