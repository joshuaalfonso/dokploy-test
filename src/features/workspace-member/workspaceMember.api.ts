import api from "@/lib/axios";
// import type { User } from "../signup/signUp.model";
// import type { ApiResponse } from "@/shared/model/apiResponse.model";
import type { WorkspaceMember } from "./workspace-member.model";






const TABLE_NAME = 'workspace-member';

export const getWorkspaceMemberApi = async (workspace_id: WorkspaceMember['workspace_id']) => {
    const res = await api.get<WorkspaceMember[]>(`/${TABLE_NAME}/${workspace_id}`);
    return res.data;
}


// export const getWorkspaceByUserApi = async (user_id: User['user_id']) => {
//     const res = await api.get<Workspace[]>(`/${TABLE_NAME}/${user_id}`);
//     return res.data;
// }

// export const createWorkspaceApi = async (newItem: CreateWorkspace) => {
//     const res = await api.post<ApiResponse>(
//         `/${TABLE_NAME}`,
//         newItem
//     );
//     return res.data;
// }
