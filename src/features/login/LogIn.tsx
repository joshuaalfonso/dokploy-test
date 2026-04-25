import { PasswordInput } from "@/components/ui/password-input"
import { Button, Center, Field, Fieldset, Input, Stack, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { useLogIn } from "./hooks/useLogIn"
import { toaster } from "@/components/ui/toaster"
import { getApiErrorMessage } from "@/lib/errorMessage"
import { useAuthStore } from "@/auth-layout/store/useAuthStore"



interface FormValues {
    email: string
    password: string
}


const LogIn = () => {

    const { logInMutation, isLoggingIn } = useLogIn();

    const { setUser, setToken } = useAuthStore();

    // const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = handleSubmit((data: FormValues) => {

        logInMutation(
            data,
            {
                onSuccess: (response) => {
                    reset();
                    setUser(response.user)
                    setToken(response.token)
                    console.log(response)
                },
                onError: (err) => {
                    console.log(err);
                    toaster.create({
                        title: 'Error',
                        description: getApiErrorMessage(err),
                        type: 'error'
                    })
                }
            }
        );

    })

    return (
        <Center h={'svh'}>

            <form className="max-w-md w-full" onSubmit={onSubmit}>
            
                <Fieldset.Root>
                    
                    <Stack>
                        <Fieldset.Legend fontSize={'xl'}>Welcome!</Fieldset.Legend>
                        <Fieldset.HelperText>
                        Please provide your details below.
                        </Fieldset.HelperText>
                    </Stack>

                    <Fieldset.Content>

                        <Field.Root>
                            <Field.Label>Email</Field.Label>
                            <Input 
                                variant={'subtle'}
                                autoComplete="off"
                                {
                                    ...register(
                                        "email", 
                                        { 
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Invalid email format",
                                            },
                                         }
                                        
                                        
                                    )
                                } 
                            />
                            {errors.email && (
                                <Text fontSize="xs" color="red.400">
                                    {errors.email.message}
                                </Text>
                            )}
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Password</Field.Label>
                            <PasswordInput 
                                placeholder="" 
                                size="md" 
                                variant={'subtle'}
                                {
                                    ...register(
                                        "password", 
                                        { 
                                            required: "Password is required" 
                                        }
                                    )
                                } 
                            />
                            {errors.password && (
                                <Text fontSize="xs" color="red.400">
                                    {errors.password.message}
                                </Text>
                            )}
                        </Field.Root>

                    </Fieldset.Content>

                    <Button type="submit" loading={isLoggingIn}>
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

            </form>

        </Center>
    )

}

export default LogIn