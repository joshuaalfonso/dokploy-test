import api from "@/lib/axios";
import type { ApiResponse } from "@/shared/model/apiResponse.model";
import type { CreateProject, Project, ProjectQuery, ProjectStatus } from "./project.model";
import type { User } from "../signup/signUp.model";



export interface ProjectParams {
    cursor: string | null
    search?: string
    status?: ProjectStatus
    sort?: 'asc' | 'desc'
}

interface ProjectResponse {
  data: Project[]
  next_cursor: string | null
}

const TABLE_NAME = 'project';

// export const getWorkspaceApi = async () => {
//     const res = await api.get<Workspace[]>(`/${TABLE_NAME}`);
//     return res.data;
// }


export const getProjectByUserApi = async (user_id: User['user_id']) => {
    const res = await api.get<Project[]>(`/${TABLE_NAME}/${user_id}`);
    return res.data;
}


export const getPaginatedProjectByUserApi = async (workspace_id: number, params: ProjectQuery) => {
    const res = await api.get<ProjectResponse>(`/${TABLE_NAME}/paginated/${workspace_id}`, { params: params});
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
