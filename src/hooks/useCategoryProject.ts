import { API_URL } from "@/constant/apiUrl"
import axios from "@/lib/axios"

export default async function useCategoryProject({ params }: { params?: any } = {}) {
    try {
        const { data: { data } } = await axios.get(API_URL.categoryProject, { params })
        return data
    } catch (error) {
        console.error("Error fetching category project:", error)
        return []
    }
}