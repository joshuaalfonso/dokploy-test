import { useAuthStore } from "@/auth-layout/store/useAuthStore"
import type { Message } from "@/features/chat/chat.model"
import { Box, Flex, ScrollArea, Spinner, Text } from "@chakra-ui/react"
import { TypingIndicatorSummary } from "./typing/TypingIndicatorSummary"
import { useLayoutEffect, useRef } from "react"
import { useMessage } from "@/features/chat/hooks/useMessage"
import { formatMessageDate } from "@/lib/formatDate"

interface Props {
    messages: Message[]
}

const TOP_THRESHOLD = 50
const BOTTOM_THRESHOLD = 100

const ChatMessage = ({ messages }: Props) => {
    const user = useAuthStore((state) => state.user)

    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useMessage()

    const viewportRef = useRef<HTMLDivElement>(null)

    const loadingOlderRef = useRef(false)

    const previousScrollHeightRef = useRef(0)
    const previousScrollTopRef = useRef(0)

    const isAtBottomRef = useRef(true)

    // Initial scroll to bottom
    useLayoutEffect(() => {
        const el = viewportRef.current
        if (!el) return

        el.scrollTop = el.scrollHeight
    }, [])

    // Handle scroll retention + auto scroll
    useLayoutEffect(() => {
        const el = viewportRef.current
        if (!el) return

        requestAnimationFrame(() => {
            // Restore scroll position after loading old messages
            if (loadingOlderRef.current) {
                const newScrollHeight = el.scrollHeight

                const heightDiff =
                    newScrollHeight -
                    previousScrollHeightRef.current

                el.scrollTop =
                    previousScrollTopRef.current +
                    heightDiff

                loadingOlderRef.current = false

                return
            }

            // Auto scroll when already near bottom
            if (isAtBottomRef.current) {
                el.scrollTop = el.scrollHeight
            }
        })
    }, [messages])

    const handleScroll = async (
        e: React.UIEvent<HTMLDivElement>
    ) => {
        const el = e.currentTarget

        // Track if user is near bottom
        isAtBottomRef.current =
            el.scrollHeight -
                el.scrollTop -
                el.clientHeight <
            BOTTOM_THRESHOLD

        // Load older messages
        if (
            el.scrollTop <= TOP_THRESHOLD &&
            hasNextPage &&
            !isFetchingNextPage &&
            !loadingOlderRef.current
        ) {
            loadingOlderRef.current = true

            previousScrollHeightRef.current =
                el.scrollHeight

            previousScrollTopRef.current =
                el.scrollTop

            await fetchNextPage()
        }
    }

    return (
        <ScrollArea.Root style={{ height: "100%" }}>
            <ScrollArea.Viewport
                ref={viewportRef}
                onScroll={handleScroll}
                style={{
                    height: "100%",
                    padding: 16,
                }}
            >
                <ScrollArea.Content>
                    <Box className="space-y-4! p-4 relative" pr={6}>
                        {isFetchingNextPage && (
                            <Box position="absolute" top={0} w="100%" py={2} textAlign="center">
                                {/* <Text fontSize="sm" color="fg.muted">
                                    Loading older messages...
                                </Text> */}
                                <Spinner size="md" />
                            </Box>
                        )}
                        {!hasNextPage && messages.length > 30 && (
                            <Box textAlign="center" py={2}>
                                <Text fontSize="sm" color="fg.muted">
                                    No more messages
                                </Text>
                            </Box>
                        )}
                        {messages.map((msg) => {
                            const isMine =
                                msg.sender_id === user?.user_id

                            return (
                                
                                <div
                                    key={msg.message_id}
                                    className={`flex ${
                                        isMine
                                            ? "justify-end" 
                                            : "justify-start"
                                    }`}
                                >
                                    <Flex
                                        alignItems="center"
                                        gap={3}
                                    >
                                        {isMine && (
                                            <Text
                                                fontSize="xs"
                                                color="fg.muted"
                                            >
                                                {formatMessageDate(
                                                    new Date(
                                                        msg.created_at
                                                    )
                                                )}
                                            </Text>
                                        )}

                                        <div
                                            className={`
                                                max-w-xs rounded-2xl px-4! py-2!
                                                ${
                                                    isMine
                                                        ? "rounded-br-md bg-(--chakra-colors-bg-inverted)! text-(--chakra-colors-fg-inverted)!"
                                                        : "rounded-bl-md bg-(--chakra-colors-bg-muted)!"
                                                }
                                            `}
                                        >
                                            {msg.text}
                                        </div>

                                        {!isMine && (
                                            <Text
                                                fontSize="xs"
                                                color="fg.muted"
                                            >
                                                {formatMessageDate(
                                                    new Date(
                                                        msg.created_at
                                                    )
                                                )}
                                            </Text>
                                        )}
                                    </Flex>
                                </div>
                            )
                        })}

                        <TypingIndicatorSummary />
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