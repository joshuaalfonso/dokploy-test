import { PasswordInput } from "@/components/ui/password-input"
import { Button, Center, Field, Fieldset, Input, Stack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"


const LogIn = () => {

    return (
        <Center h={'svh'}>

            <Fieldset.Root size="lg" maxW="md">
                
                <Stack>
                    <Fieldset.Legend fontSize={'xl'}>Welcome!</Fieldset.Legend>
                    <Fieldset.HelperText>
                    Please provide your details below.
                    </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                    <Field.Root>
                        <Field.Label>Email</Field.Label>
                        <Input name="name" />
                    </Field.Root>

                    <Field.Root>
                    <Field.Label>Password</Field.Label>
                    <PasswordInput placeholder="" size="md" />
                    </Field.Root>
                </Fieldset.Content>

                <Button type="submit" >
                    Log In
                </Button>

                <Stack direction={'row'} alignSelf={'center'}>
                    <Text 
                        fontSize={'sm'} 
                        color={'fg.muted'}
                    >
                        Don't have an account yet?
                    </Text>
                    <Text fontSize={'sm'}>
                        <Link to="/sign-up">Sign up</Link>
                    </Text>
                </Stack>

            </Fieldset.Root>

        </Center>
    )

}

export default LogIn