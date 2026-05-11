import type { ProjectStatus } from "@/features/project/project.model"



export interface ProjectStatusSelect {
    label: string,
    value: ProjectStatus
}


export const projectStatus = [
    {
        label: 'Planning',
        value: 'planning'
    },
    {
        label: 'Active',
        value: 'active'
    },
    {
        label: 'Inactive',
        value: 'inactive'
    },
    {
        label: 'Completed',
        value: 'completed'
    },
]