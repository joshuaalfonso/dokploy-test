




export type TaskStatus = | 'todo' | 'in progress' | 'for review' | 'completed';
export type TaskPriority = | 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
    task_id: number;
    project_id: number;
    task_title: string;
    task_description: string;
    status: TaskStatus;
    priority: TaskPriority;
    due_date: string;
    created_by: number;
    full_name: string;
    email: string;
    created_at: string
}