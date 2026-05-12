import type { ProjectStatus } from "@/features/project/project.model"


export interface ProjectStatusSelect {
    label: string,
    value: ProjectStatus
}

export const getProjectPallete = (status: ProjectStatus) => {

    switch( status) {

        case 'planning':
            return 'yellow'
        
        case 'active':
            return 'green'

        case 'inactive':
            return 'red'

        case 'completed':
            return 'blue'
        
    }

}

export const projectStatus = [
    {
        label: 'All',
        value: ''
    },
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