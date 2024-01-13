export interface Experience {
    id?: string,
    attributes: {
        title?: string,
        company?: string,
        location?: string,
        from?: string,
        to?: string,
        type?: string,
        createdAt?: string,
        updatedAt?: string,
        publishedAt?: string,
        responsibilities?: Array<Responsibilities>
    }
}

export interface Responsibilities {
    id?: string,
    job_desc: string
}

export interface Experiences {
    source: Array<Experience>,
    loading: boolean
}


export const InitialExperience: Experiences = {
    source: [],
    loading: false
}