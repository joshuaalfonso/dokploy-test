





export interface CreateProject {
    workspace_id: number
    project_name: string
    project_description: string
}


export type ProjectStatus = | 'draft' | 'planning' | 'active' | 'on hold' | 'completed'

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