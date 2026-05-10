





export interface Workspace {
  workspace_id: number
  workspace_name: string
  description: string | null
  owner_id: number
  created_at: string
  role: string
}



export interface CreateWorkspace {
  workspace_name: Workspace['workspace_name'],
  description: Workspace['description']
}