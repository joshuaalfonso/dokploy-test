import api from "@/lib/axios";
import type { VerifyEmail } from "./verifyEmail.model";
import type { ApiResponse } from "@/shared/model/apiResponse.model";


const TABLE_NAME = 'verify';


export const verifyEmailApi = async (credentials: VerifyEmail) => {
    const res = await api.post<ApiResponse>(`/${TABLE_NAME}`, credentials);
  return res.data;
}