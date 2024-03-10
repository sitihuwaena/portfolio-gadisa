export interface Resume {
    message?: string
    loading: boolean,
    error: boolean
}


export const InitialResume: Resume = {
    loading: false,
    error: false
}