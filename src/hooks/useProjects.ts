import { API_URL } from "@/constant/apiUrl"
import axios from "@/lib/axios"

export default async function useProjects({ params }: { params?: any } = {}) {
    try {
        const { data: { data } } = await axios.get(API_URL.projects, { params })
        return data
    } catch (error) {
        console.error("Error fetching projects:", error)
        return []
    }
}