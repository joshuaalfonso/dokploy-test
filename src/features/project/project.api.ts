import api from "@/lib/axios";
import type { ApiResponse } from "@/shared/model/apiResponse.model";
import type { CreateProject, ProjectList, ProjectParams } from "./project.model";
import type { User } from "../signup/signUp.model";

interface ProjectResponse {
  data: ProjectList[]
  page: number,
  limit: number,
  total: number,
  totalPages: number
  hasMore: boolean
}

const TABLE_NAME = 'project';

export const getProjectByUserApi = async (user_id: User['user_id']) => {
    const res = await api.get<ProjectList[]>(`/${TABLE_NAME}/${user_id}`);
    return res.data;
}


export const getPaginatedProjectByUserApi = async (workspace_id: number, params: ProjectParams) => {

    const res = await api.get<ProjectResponse>(`/${TABLE_NAME}/paginated/${workspace_id}`, { params: params});
    return res.data;
}

export const getSingleProjectApi = async (project_id: number) => {

    const res = await api.get<ProjectList>(`/${TABLE_NAME}/detail/${project_id}`);
    return res.data;
}

export const getProjectByWorkspaceApi = async (workspace_id: CreateProject['workspace_id']) => {
    const res = await api.get<ProjectList[]>(`/${TABLE_NAME}/${workspace_id}`);
    return res.data;
}

export const createProjectApi = async (newItem: CreateProject) => {
    const res = await api.post<ApiResponse>(
        `/${TABLE_NAME}`,
        newItem
    );
    return res.data;
}
 