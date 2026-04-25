


export interface User {
    user_id: number;
    full_name: string;
    email: string;
    default_workspace: number
};

export interface CreateUser {
    full_name: User['full_name'];
    email: User['email'];
    password: string
}