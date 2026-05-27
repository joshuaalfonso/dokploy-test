import { useAuthStore } from "@/auth-layout/store/useAuthStore"
import type { Message } from "@/features/chat/chat.model"
import { Box, Flex, ScrollArea, Text } from "@chakra-ui/react"
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

    console.log(messages)

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

    //   Initial scroll to bottom
    useLayoutEffect(() => {
        const el = viewportRef.current
        if (!el) return

        requestAnimationFrame(() => {
            el.scrollTop = el.scrollHeight
        })
    }, [])

    //  Maintain scroll position
    useLayoutEffect(() => {
        const el = viewportRef.current
        if (!el) return

        //   Restoring after loading older messages
        if (loadingOlderRef.current) {
            requestAnimationFrame(() => {
                const newScrollHeight = el.scrollHeight

                const heightDiff =
                    newScrollHeight - previousScrollHeightRef.current

                el.scrollTop =
                    previousScrollTopRef.current + heightDiff

                loadingOlderRef.current = false
            })

            return
        }

        //  Auto-scroll for new incoming messages
        if (isAtBottomRef.current) {
            requestAnimationFrame(() => {
                el.scrollTop = el.scrollHeight
            })
        }
    }, [])

    const handleScroll = async (
        e: React.UIEvent<HTMLDivElement>
    ) => {
        const el = e.currentTarget

        //   Detect if user near bottom
        isAtBottomRef.current =
            el.scrollHeight - el.scrollTop - el.clientHeight <
            BOTTOM_THRESHOLD

        //   Load older messages
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
                    <Box className="space-y-4! p-4" pr={6}>
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