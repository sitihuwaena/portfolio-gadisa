import { API_URL } from "@/constant/apiUrl"
import axios from "@/lib/axios"

export default async function useBlog({ params }: { params?: any }) {
    try {
        const { data: { data } } = await axios.get(API_URL.blog, { params })
        return data
    } catch (error) {
        console.error("Error fetching blog:", error)
        return []
    }
}