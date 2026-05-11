import api from "@/lib/axios";
import type { ApiResponse } from "@/shared/model/apiResponse.model";
import type { CreateProject, Project } from "./project.model";
import type { User } from "../signup/signUp.model";






const TABLE_NAME = 'project';

// export const getWorkspaceApi = async () => {
//     const res = await api.get<Workspace[]>(`/${TABLE_NAME}`);
//     return res.data;
// }


export const getProjectByUserApi = async (user_id: User['user_id']) => {
    const res = await api.get<Project[]>(`/${TABLE_NAME}/${user_id}`);
    return res.data;
}

export const getProjectByWorkspaceApi = async (workspace_id: CreateProject['workspace_id']) => {
    const res = await api.get<Project[]>(`/${TABLE_NAME}/${workspace_id}`);
    return res.data;
}

export const createProjectApi = async (newItem: CreateProject) => {
    const res = await api.post<ApiResponse>(
        `/${TABLE_NAME}`,
        newItem
    );
    return res.data;
}
