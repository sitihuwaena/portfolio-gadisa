import { API_URL } from "@/constant/apiUrl"
import axios from "@/lib/axios"
import { HomePageTypes } from "@/types/HomePageTypes"

export default async function useHomePage({ params }: { params?: any } = {}) : Promise<HomePageTypes | null> {
    try {
        const { data: { data } } = await axios.get(API_URL.home, { params })
        return data as HomePageTypes
    } catch (error) {
        // 404 just means this page has no metadata in Strapi yet; the page falls back to defaults
        if ((error as any)?.response?.status !== 404) console.error("Error fetching home page data:", error)
        return null
    }
}