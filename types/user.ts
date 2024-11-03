export interface User {
    pk: number,
    username: string,
    email: string,
    profile: Profile,
}

export interface Profile {
    avatar: string,
    category: string,
}