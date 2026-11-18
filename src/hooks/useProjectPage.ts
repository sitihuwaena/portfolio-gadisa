import { API_URL } from "@/constant/apiUrl"
import axios from "@/lib/axios"

import { ProjectPageTypes } from "@/types/ProjectPageTypes"

export default async function useProjectPage({ params }: { params?: any } = {}) : Promise<ProjectPageTypes | null> {
    try {
        const { data: { data } } = await axios.get(API_URL.project, { params })
        return data
    } catch (error) {
        // 404 just means this page has no metadata in Strapi yet; the page falls back to defaults
        if ((error as any)?.response?.status !== 404) console.error("Error fetching project page data:", error)
        return null
    }
}