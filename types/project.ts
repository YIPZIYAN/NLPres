import type {User} from "~/types/user";

export interface Project {
    id: number,
    name: string,
    description: string,
    category: string,
    created_at: Date,
    updated_at: Date,
    collaborators: Collaborator[]
}

export interface Collaborator {
    id: number
    user: User
    role: string
}

export const getProjectsUrl = () => (
    useRuntimeConfig().public.baseUrl + 'project/'
)