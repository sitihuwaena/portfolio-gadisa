import { API_URL } from "@/constant/apiUrl"
import axios from "@/lib/axios"

import { TechStackPageTypes } from "@/types/TechStackPageTypes"

export default async function useTechStackPage({ params }: { params?: any } = {}) : Promise<TechStackPageTypes | null> {
    try {
        const { data: { data } } = await axios.get(API_URL.techStack, { params })
        return data
    } catch (error) {
        // 404 just means this page has no metadata in Strapi yet; the page falls back to defaults
        if ((error as any)?.response?.status !== 404) console.error("Error fetching tech stack page data:", error)
        return null
    }
}