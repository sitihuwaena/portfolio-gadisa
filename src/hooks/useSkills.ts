import { API_URL } from "@/constant/apiUrl"
import axios from "@/lib/axios"

export default async function useSkills({ params }: { params?: any } = {}) {
    try {
        const { data: { data } } = await axios.get(API_URL.skills, { params })
        return data
    } catch (error) {
        console.error("Error fetching skills:", error)
        return []
    }
}