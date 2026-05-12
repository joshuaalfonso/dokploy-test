



export type ProjectStatus =  | 'planning' | 'active' | 'inactive' | 'completed';

export interface CreateProject {
    workspace_id: number
    project_name: string
    project_description: string,
    status: ProjectStatus
}


export interface Project {
    project_id: number
    workspace_id: number
    workspace_name: string
    project_name: string
    project_description: string
    status: ProjectStatus
    created_by: number
    created_at: string
}



export type ProjectParams = {
  limit?: number
  search?: string
  status?: string
  sort?: 'asc' | 'desc'
//   cursor?: string | null
  page: number
}