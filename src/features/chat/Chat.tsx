import LoadingTyping from "@/shared/components/LoadingTyping";
import { socket } from "@/socket/socket";
import { Flex, Input, Stack, Box, Heading, InputGroup, Avatar, Text, Group, Button, ScrollArea } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";


type Message = {
  senderId: string
  text: string
}

const Chat = () => {


    const [messages, setMessages] = useState<Message[]>([])
    const [message, setMessage] = useState('')
    const [onlineUsers, setOnlineUsers] = useState<string[]>([])
    const [typing, setTyping] = useState(false);

    console.log(onlineUsers)

    // const user = useAuthStore(state => state.user)

    const my_id = 'user-456';
    const receiver_id = 'user-123';
    // const my_id = 'user-123';
    // const receiver_id = 'user-456';


    const chats = [
        {
            "id": 1,
            "name": "Alice",
            "last_message": "See you soon",
            "time": "11:45 AM",
            "unread": 3
        },
        {
            "id": 2,
            "name": "Lebrom James",
            "last_message": "Meeting starts now",
            "time": "10:12 AM",
            "unread": 0
        },
        {
            "id": 3,
            "name": "Kobe Bryant",
            "last_message": "Let's play ball",
            "time": "10:12 AM",
            "unread": 0
        },
        {
            "id": 4,
            "name": "Si kuwan",
            "last_message": "Are you crazy?",
            "time": "10:12 AM",
            "unread": 0
        },
    ];

    useEffect(() => {
        socket.connect();


        socket.emit('user:online', my_id);

        socket.on('message:receive', (data: Message) => {
            setMessages((prev) => [...prev, data])
        });

        socket.on('users:online', (users: string[]) => {
            setOnlineUsers(users)
        });

        socket.on('typing:start', () => {
            setTyping(true)
        });

        socket.on('typing:stop', () => {
            setTyping(false)
        });

        return () => {
            socket.disconnect()

            socket.off('message:receive')
            socket.off('users:online')
            socket.off('typing:start')
            socket.off('typing:stop')
        }

    }, []);

    const sendMessage = () => {
        if (!message.trim()) return

        // const newMessage = {
        //     senderId: my_id,
        //     text: message,
        // }

        // setMessages((prev) => [...prev, newMessage])

        socket.emit('message:send', {
            senderId: my_id,
            receiverId: receiver_id,
            text: message,
        })

        setMessage('');
    };

    const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)

        socket.emit('typing:start', {
            senderId: my_id,
            receiverId: receiver_id,
        })

        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current)
        }

        typingTimeout.current = setTimeout(() => {
            socket.emit('typing:stop', {
                senderId: my_id,
                receiverId: receiver_id,
            })
        }, 5000)
    }

    return (
        
        <>
        
            <Flex 
                gap={8} 
                // borderWidth={'1px'}
                rounded={'md'}
                height={'85vh'}
            >

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
                        <InputGroup endElement={<LuSearch />}>
                            <Input 
                                variant={'subtle'} 
                                size={'md'} 
                                placeholder="Search contacts"
                                _placeholder={{color: 'fg.muted'}} 
                                rounded={'md'}
                            />
                        </InputGroup>
                    </div>

                    <Stack direction={'column'} spaceY={1}>
                        {chats?.map(item => (
                            <Box 
                                cursor={'pointer'} 
                                _hover={{background: 'bg.muted'}} 
                                py={2} 
                                px={3} 
                                rounded={'md'}
                            >
                                <Flex alignItems={'center'} gap={3} >
                                    <Avatar.Root size={'sm'} variant={'solid'} >
                                         <Avatar.Fallback name={item.name} />
                                    </Avatar.Root>
                                    
                                    <Flex direction={'column'} gap={0}>
                                        <Text fontSize={'sm'} fontWeight={'semibold'}>
                                            {item.name}
                                        </Text>
                                        <Text fontSize={'xs'} color={'fg.muted'}>
                                            {item.last_message}
                                        </Text>
                                    </Flex>

                                </Flex>
                            </Box>
                        ))}
                    </Stack>

                </Flex>

                <Flex direction={'column'} gap={4} flex={1}>

                    <Box>
                        <div className="flex items-center gap-3!">
                            <Avatar.Root size={'sm'} variant={'solid'} >
                                    <Avatar.Fallback name={'Alice'} />
                            </Avatar.Root>
                            <Text fontWeight={'semibold'}>Alice</Text>
                        </div>
                    </Box>


                    {/* <Box className="space-y-4! p-4 h-full overflow-y-auto!">

                        <div className="flex justify-start">
                            
                            <Flex alignItems={'center'} gap={3}>
                                <div className="max-w-xs rounded-2xl rounded-bl-md bg-(--chakra-colors-bg-muted)! px-4! py-2!">
                                    Hey, are you free later?
                                </div>
                            </Flex>


                        </div>

                        <div className="flex justify-end! ">
                            
                            <Flex alignItems={'center'} gap={3}>
                                <div className="max-w-xs rounded-2xl rounded-br-md bg-(--chakra-colors-bg-inverted)! text-(--chakra-colors-fg-inverted)! px-4! py-2!">
                                    Yeah, sure! What’s up?
                                </div>
                            </Flex>


                        </div>

                        <div className="flex justify-start">
                            
                            <Flex alignItems={'center'} gap={3}>
                                <div className="max-w-xs rounded-2xl rounded-bl-md bg-(--chakra-colors-bg-muted)! px-4! py-2!">
                                    Wanna play some games tonight?
                                </div>
                            </Flex>


                        </div>

                        {messages.map((msg, index) => {
                            const isMine = msg.senderId === my_id

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
                            <Text fontSize={'sm'} color={'fg.muted'}>
                                Typing...
                            </Text>
                        )}


                    </Box> */}

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
                                        const isMine = msg.senderId === my_id

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
                                        // <Text fontSize={'sm'} color={'fg.muted'}>
                                        //     Typing...
                                        // </Text>
                                        // <LoadingTyping />
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
                    

                </Flex>

            </Flex>
        
        </>


    )


}

export default Chat