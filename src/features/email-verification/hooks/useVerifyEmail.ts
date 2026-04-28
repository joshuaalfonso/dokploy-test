import { useMutation } from "@tanstack/react-query";
import type { CreateUser } from "../../signup/signUp.model";
import { verifyEmailApi } from "../emailVerify.api";


export const useVerifyEmail = () => {

    const { mutate: verifyEmailMutation, isPending: isVerifying, error} = useMutation({
        mutationFn: (credentials: { email: CreateUser['email'], code: string }) => verifyEmailApi(credentials)
    })

    return { verifyEmailMutation, isVerifying, error }

};