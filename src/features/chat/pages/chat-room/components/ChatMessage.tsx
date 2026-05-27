import { useAuthStore } from "@/auth-layout/store/useAuthStore"
import type { Message } from "@/features/chat/chat.model"
import { Box, Flex, ScrollArea, Text } from "@chakra-ui/react"
import { TypingIndicatorSummary } from "./typing/TypingIndicatorSummary"
import { useEffect, useLayoutEffect, useRef } from "react"
import { useMessage } from "@/features/chat/hooks/useMessage"
import { formatMessageDate } from "@/lib/formatDate"
// import { TypingUser } from "./TypingUser"







interface Props {
    messages: Message[]
}

const ChatMessage = ({ messages }: Props) => {

    const user = useAuthStore(state => state.user);

    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useMessage();

    const viewportRef = useRef<HTMLDivElement>(null);
    const loadingOlderRef = useRef(false);
    const prevScrollHeightRef = useRef<number>(0);
    const isAtBottomRef = useRef(true);

    useLayoutEffect(() => {
        const el = viewportRef.current;
            if (!el) return;

            requestAnimationFrame(() => {
                el.scrollTop = el.scrollHeight;
            });
    }, []);

    useEffect(() => {
        const el = viewportRef.current;
        if (!el) return;

        if (!isAtBottomRef.current) return;

        requestAnimationFrame(() => {
            el.scrollTop = el.scrollHeight;
        });
    }, [messages]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const el = e.currentTarget;

        const threshold = 100;

        isAtBottomRef.current =
            el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

        // reached top → fetch older
        if (
            el.scrollTop <= 0 &&
            hasNextPage &&
            !isFetchingNextPage &&
            !loadingOlderRef.current
        ) {
            loadingOlderRef.current = true;

            prevScrollHeightRef.current = el.scrollHeight;

            fetchNextPage();
        }
    };

    useLayoutEffect(() => {
        const el = viewportRef.current;
        if (!el) return;


        // restoring position after loading older messages
        if (loadingOlderRef.current) {
            const newHeight = el.scrollHeight;
            const heightDiff = newHeight - prevScrollHeightRef.current;

            el.scrollTop = heightDiff;

            loadingOlderRef.current = false;
            return;
        }

        // auto scroll for new messages only
        if (isAtBottomRef.current) {
            el.scrollTop = el.scrollHeight;
        }
    }, [messages]);


    return (
        <ScrollArea.Root style={{ height: "100%" }}  >
            <ScrollArea.Viewport
                // css={{
                //     "--scroll-shadow-size": "4rem",
                //     maskImage: "linear-gradient(#000, #000)",
                //     "&[data-overflow-y]": {
                //         maskImage:
                //         "linear-gradient(#000,#000,transparent 0,#000 var(--scroll-shadow-size),#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                //         "&[data-at-top]": {
                //         maskImage:
                //             "linear-gradient(180deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                //         },
                //         "&[data-at-bottom]": {
                //         maskImage:
                //             "linear-gradient(0deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                //         },
                //     },
                // }}
                ref={viewportRef}
                onScroll={handleScroll}
                style={{
                    height: "100%",
                    padding: 16,
                }}
            >
                <ScrollArea.Content spaceY="4" textStyle="sm">
                    <Box className="space-y-4! p-4 " pr={6}>
                        {messages.map((msg) => {
                            const isMine = msg.sender_id == user?.user_id

                            return (
                                <div
                                    key={msg.message_id}
                                    className={`flex ${
                                        isMine ? 'justify-end' : 'justify-start'
                                    }`}
                                >
                                    <Flex alignItems={'center'} gap={3}>

                                        {isMine && (<Text fontSize={'xs'} color={'fg.muted'}>{ formatMessageDate(new Date(msg.created_at)) }</Text>)}
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
                                        {!isMine && (<Text fontSize={'xs'} color={'fg.muted'}>{ formatMessageDate(new Date(msg.created_at)) }</Text>)}
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