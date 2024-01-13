export interface Education {
    id?: string,
    attributes: {
        school?: string,
        major?: string,
        from?: string,
        to?: string,
        type?: string,
        createdAt?: string,
        updatedAt?: string,
        publishedAt?: string,
    }
}

export interface Educations {
    source: Array<Education>,
    loading: boolean
}


export const InitialEducation: Educations = {
    source: [],
    loading: false
}