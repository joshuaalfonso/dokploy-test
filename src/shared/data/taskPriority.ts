import type { TaskPriority } from "@/features/project/project-detail/project-task/projectTask.model"

export const getTaskPriorityPalette = (status: TaskPriority) => {

    switch( status) {

        case 'low':
            return 'blue'
        
        case 'medium':
            return 'green'

        case 'high':
            return 'orange'

        case 'urgent':
            return 'red'
        
    }

}


export const taskPriority = [
    {
        label: 'Low',
        value: 'low'
    },
    {
        label: 'Medium',
        value: 'medium'
    },
    {
        label: 'High',
        value: 'high'
    },
    {
        label: 'Urgent',
        value: 'urgent'
    },
]