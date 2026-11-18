import { API_URL } from "@/constant/apiUrl"
import axios from "@/lib/axios"
import { AboutPageTypes } from "@/types/AboutPageTypes"

export default async function useAboutPage({ params }: { params?: any } = {}) : Promise<AboutPageTypes | null> {
    try {
        const { data: { data } } = await axios.get(API_URL.about, { params })
        return data
    } catch (error) {
        // 404 just means this page has no metadata in Strapi yet; the page falls back to defaults
        if ((error as any)?.response?.status !== 404) console.error("Error fetching about page data:", error)
        return null
    }
}