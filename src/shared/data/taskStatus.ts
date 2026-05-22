import type { TaskStatus } from "@/features/project/project-detail/project-task/projectTask.model"


export const getTaskStatusPalette = (status: TaskStatus) => {

    if (!status) return 'bg'

    switch( status) {

        case 'todo':
            return 'red'
        
        case 'in progress':
            return 'yellow'

        case 'for review':
            return 'green'

        case 'completed':
            return 'blue'
        
    }

}


export const taskStatus = [
    // {
    //     label: 'All',
    //     value: ''
    // },
    {
        label: 'To Do',
        value: 'todo'
    },
    {
        label: 'In Progress',
        value: 'in progress'
    },
    {
        label: 'For Review',
        value: 'for review'
    },
    {
        label: 'Completed',
        value: 'completed'
    },
]