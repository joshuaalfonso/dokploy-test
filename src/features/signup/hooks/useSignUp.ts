import { useMutation } from "@tanstack/react-query";
import { signUpApi } from "../signUp.api";
import type { CreateUser } from "../signUp.model";


export const useSignUp = () => {

    const { mutate: signUpMutation, isPending: isSigningUp, error} = useMutation({
        mutationFn: (newItem: CreateUser) => signUpApi(newItem)
    })

    return { signUpMutation, isSigningUp, error }

};