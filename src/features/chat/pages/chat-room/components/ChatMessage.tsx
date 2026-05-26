import { useAuthStore } from "@/auth-layout/store/useAuthStore"
import type { Message } from "@/features/chat/chat.model"
import { Box, Flex, ScrollArea } from "@chakra-ui/react"
import { TypingIndicatorSummary } from "./typing/TypingIndicatorSummary"
// import { TypingUser } from "./TypingUser"







interface Props {
    messages: Message[]
}

const ChatMessage = ({ messages }: Props) => {

    const user = useAuthStore(state => state.user);


    return (
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
                            const isMine = msg.sender_id == user?.user_id

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

                        {/* <TypingUser userId={} /> */}

                        <TypingIndicatorSummary />

                        {/* {typing && (
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
                        )} */}
                    </Box>
                </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar>
                <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
        </ScrollArea.Root>
    )
}

export default ChatMessage