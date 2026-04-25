import api from "@/lib/axios";
import type { Workspace } from "./workspace.model";
import type { User } from "../signup/signUp.model";






const TABLE_NAME = 'workspace';

export const getWorkspaceApi = async () => {
    const res = await api.get<Workspace[]>(`/${TABLE_NAME}`);
    return res.data;
}


export const getWorkspaceByUserApi = async (user_id: User['user_id']) => {
    const res = await api.get<Workspace[]>(`/${TABLE_NAME}/${user_id}`);
    return res.data;
}