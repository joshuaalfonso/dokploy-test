import type { User } from "../signup/signUp.model";
import type { SortOrder, ViewMode } from "./hooks/useProjectParams";




export type ProjectStatus =  | 'planning' | 'active' | 'inactive' | 'completed';
export type ProjectMemberRole =  | 'admin' | 'member' | 'viewer';

export interface ProjectMember {
  user_id: User['user_id'],
  role: ProjectMemberRole | ''
}

export interface CreateProject {
    workspace_id: number
    project_name: string
    project_description: string,
    status: ProjectStatus
}


export interface ProjectList {
    project_id: number
    workspace_id: number
    workspace_name: string
    project_name: string
    project_description: string
    status: ProjectStatus
    created_by: number
    full_name: string
    email: string
    total_task: number
    completed_task: number
    created_at: string
}



export type AllowedSort = | 'created_at' | 'status' | 'project_name'

export type ProjectParams = {
  limit?: number
  search?: string
  status?: string
  sort?: AllowedSort
  order?: SortOrder
//   cursor?: string | null
  page: number
  view?: ViewMode
}