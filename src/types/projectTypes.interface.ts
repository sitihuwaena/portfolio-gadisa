import { Skill } from "./skillTypes.interface"

export interface Project {
    id?: string,
    attributes: {
        title: string,
        subtitle?: string,
        slug?: string,
        live_preview?: string,
        view_code?: string,
        description?: Array<any>,
        complexity: string,
        type_project: string,
        startDate: string,
        endDate: string,
        thumbnail: {
            data: {
                attributes: {
                    formats: any,
                    name: string,
                    url: string,
                    placeholder: string
                }
            }
        }
        skills: {
            data: Array<Skill>
        },
        meta: any,
        createdAt?: string,
        updatedAt?: string,
        publishedAt?: string
    }
}

export interface Projects {
    source: Array<Project>,
    loading: boolean
}

export const InitialProject: Projects = {
    source: [],
    loading: false
}



