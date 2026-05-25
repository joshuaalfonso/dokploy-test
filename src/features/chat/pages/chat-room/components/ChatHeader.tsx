import { Avatar, Box, Text } from "@chakra-ui/react"






const ChatHeader = () => {
    return (
        <Box>
            <div className="flex items-center gap-3!">
                <Avatar.Root size={'sm'} variant={'solid'} >
                        <Avatar.Fallback name={'Alice'} />
                </Avatar.Root>
                <Text fontWeight={'semibold'}>Alice</Text>
            </div>
        </Box>
    )
}

export default ChatHeader