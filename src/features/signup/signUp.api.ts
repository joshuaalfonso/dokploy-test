import api from "@/lib/axios";
import type { CreateUser } from "./signUp.model";
import type { ApiResponse } from "@/shared/model/apiResponse.model";




const TABLE_NAME = 'sign-up';

export const signUpApi = async (newItem: CreateUser) => {
    const res = await api.post<ApiResponse>(`/${TABLE_NAME}`, newItem);
  return res.data;
}



// export const getUser = async (id: number): Promise<User> => {
//   const res = await api.get(`/users/${id}`);
//   return res.data;
// };