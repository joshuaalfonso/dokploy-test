
import { useMutation } from "@tanstack/react-query";
import type { LogIn } from "../logIn.model";
import { logInApi } from "../logIn.api";


export const useLogIn = () => {

    const { mutate: logInMutation, isPending: isLoggingIn, error} = useMutation({
        mutationFn: (credentials: LogIn) => logInApi(credentials)
    })

    return { logInMutation, isLoggingIn, error }

};