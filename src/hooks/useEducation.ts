import { API_URL } from "@/constant/apiUrl"
import axios from "@/lib/axios"

export default async function useEducation({ params }: { params?: any } = {}) {
    try {
        const { data: { data } } = await axios.get(API_URL.education, { params })
        return data
    } catch (error) {
        console.error("Error fetching education:", error)
        return []
    }
}