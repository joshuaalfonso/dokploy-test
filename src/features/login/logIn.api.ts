import api from "@/lib/axios";
import type { LogIn, LogInResponse } from "./logIn.model";




const TABLE_NAME = 'log-in';

export const logInApi = async (newItem: LogIn) => {
    const res = await api.post<LogInResponse>(`/${TABLE_NAME}`, newItem);
  return res.data;
}