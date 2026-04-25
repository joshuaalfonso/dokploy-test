import type { ApiResponse } from "@/shared/model/apiResponse.model";
import type { User } from "../signup/signUp.model";



export interface LogIn {
    email: string;
    password: string
};


export interface LogInResponse extends ApiResponse {
    token: string,
    user: User,
}