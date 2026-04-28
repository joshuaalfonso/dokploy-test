import { Alert, Box, Button, Center, Heading, PinInput, Stack, Text } from "@chakra-ui/react"
import { useState } from "react";
import { useVerifyEmail } from "./hooks/useVerifyEmail";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "@/lib/errorMessage";




const EmailVerification = () => {

    const { verifyEmailMutation, isVerifying } = useVerifyEmail();

    const email = localStorage.getItem("verifyEmail") as string;

    const [value, setValue] = useState(["", "", "", "", "", ""]);

    const isValid = value.every(v => v.trim() !== "");

    const navigate = useNavigate();

    const onSubmit = () => {

        if (!isValid) return;

        const code = value.join("");

        verifyEmailMutation(
            {email, code},
            {
                onSuccess: (response) => {
                    toaster.create({
                        title: 'Success',
                        description: response.message 
                    })
                    navigate('/log-in')
                },
                onError: (err) => {
                    toaster.create({
                        title: 'Error',
                        description: getApiErrorMessage(err),
                        type: 'error'
                    })
                }
            }
        )


    }


    if (!email) return (
        <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
                <Alert.Title>Error</Alert.Title>
                <Alert.Description>
                    Something went wrong, no email found.
                </Alert.Description>
            </Alert.Content>
        </Alert.Root>
    )


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

                <PinInput.Root otp size={'lg'} value={value} onValueChange={(e) => setValue(e.value)}>
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

                <Button disabled={!isValid} loading={isVerifying} onClick={onSubmit}>
                    Confirm
                </Button>


            </Box>
            
        </Center>
    )
}

export default EmailVerification