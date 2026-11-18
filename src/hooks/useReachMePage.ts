import { API_URL } from "@/constant/apiUrl"
import axios from "@/lib/axios"

import { ReachMePageTypes } from "@/types/ReachMePageTypes"

export default async function useReachMePage({ params }: { params?: any } = {}) : Promise<ReachMePageTypes | null> {
    try {
        const { data: { data } } = await axios.get(API_URL.reachMe, { params })
        return data
    } catch (error) {
        // 404 just means this page has no metadata in Strapi yet; the page falls back to defaults
        if ((error as any)?.response?.status !== 404) console.error("Error fetching reach me page data:", error)
        return null
    }
}