import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react"
import "@aejkatappaja/phantom-ui";



const ConversationLoader = ({ count = 6 }: {count: number}) => {
    return (
        <phantom-ui loading={true}>
            <Stack direction={'column'} spaceY={1}>
                {Array.from({ length: count }).map((_, index) => (
                    <Box
                        cursor={'pointer'} 
                        _hover={{background: 'bg.muted'}} 
                        py={2} 
                        px={3} 
                        rounded={'md'}
                        key={index}
                    >
                        <Flex alignItems={'center'} gap={3} >
                            <Avatar.Root size={'sm'}  >
                                {/* <Avatar.Fallback name={'A'} /> */}
                            </Avatar.Root>
                            
                            <Flex direction={'column'} gap={2} w={'full'}>
                                <Flex justifyContent={'space-between'}>
                                    <Text fontSize={'sm'} fontWeight={'semibold'}>
                                        Lebron James
                                    </Text>
                                    <Text fontSize={'xs'} fontWeight={''} color={'fg.muted'}>
                                        9:00 am
                                    </Text>
                                </Flex>
                                <Text fontSize={'xs'} color={'fg.muted'}>
                                    How are you?
                                </Text>
                            </Flex>

                        </Flex>
                    </Box>
                ))}
            </Stack>
        </phantom-ui>
    )
}

export default ConversationLoader