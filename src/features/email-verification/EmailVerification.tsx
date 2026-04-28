import { Box, Button, Center, Heading, PinInput, Stack, Text } from "@chakra-ui/react"









const EmailVerification = () => {
  return (
    <Center 
        h={'full'}
    >


        <Box
            display={'flex'}
            flexDirection={'column'}
            gap={6}
        >

            <Stack>
                <Heading>
                    Verification Code
                </Heading>

                <Text color={'fg.muted'} fontSize={'sm'}>
                    We have sent the verification to your email address
                </Text>
            </Stack>

            <PinInput.Root size={'lg'}>
                <PinInput.HiddenInput />
                <PinInput.Control w={'full'} display={'flex'} gap={4}>
                    <PinInput.Input index={0} />
                    <PinInput.Input index={1} />
                    <PinInput.Input index={2} />
                    <PinInput.Input index={3} />
                    <PinInput.Input index={4} />
                    <PinInput.Input index={5} />
                </PinInput.Control>
            </PinInput.Root>

            <Button>
                Confirm
            </Button>


        </Box>
        
    </Center>
  )
}

export default EmailVerification