export interface Skill {
    id?: string,
    attributes: {
        title: string,
        source: {
            data: {
                attributes: {
                    name: string,
                    url: string
                }
            }
        }        
        createdAt?: string,
        updatedAt?: string,
        publishedAt?: string,
    }
}

export interface Skills {
    source: Array<Skill>,
    loading: boolean
}


export const InitialSkill: Skills = {
    source: [],
    loading: false
}