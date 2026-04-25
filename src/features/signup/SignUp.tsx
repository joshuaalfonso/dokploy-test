import { PasswordInput } from "@/components/ui/password-input"
import { Button, Center, Field, Fieldset, Input, Stack, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"


interface FormValues {
    full_name: string
    email: string
    password: string
}

const SignUp = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();


    const onSubmit = handleSubmit((data: FormValues) => {
        console.log(data)
    })


    return (
        <Center h={'svh'}>
        
            <form onSubmit={onSubmit} className="max-w-md w-full">

                <Fieldset.Root size="lg" maxW="md">
                    
                    <Stack>
                        <Fieldset.Legend fontSize={'xl'}>Welcome!</Fieldset.Legend>
                        <Fieldset.HelperText>
                        Please provide your contact details below.
                        </Fieldset.HelperText>
                    </Stack>

                    <Fieldset.Content>

                        <Field.Root>
                            <Field.Label>Full Name</Field.Label>
                            <Input 
                                {
                                    ...register(
                                        "full_name", 
                                        { 
                                            required: "Name is required",
                                            minLength: {
                                                value: 5,
                                                message: "Full name must be at least 5 characters",
                                            }, 
                                        }
                                    )
                                } 
                            />
                            {errors.full_name && (
                                <Text fontSize="xs" color="red.400">
                                {errors.full_name.message}
                                </Text>
                            )}
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Email</Field.Label>
                            <Input 
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

                    <Button type="submit" >
                        Register
                    </Button>

                    <Stack direction={'row'} alignSelf={'center'}>
                        <Text 
                            fontSize={'sm'} 
                            color={'fg.muted'}
                        >
                            Already have an account?
                        </Text>
                        <Text fontSize={'sm'}>
                            <Link to="/log-in">Log in</Link>
                        </Text>
                    </Stack>

                </Fieldset.Root>

            </form>

        </Center>
    )
}

export default SignUp