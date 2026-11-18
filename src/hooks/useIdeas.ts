import { API_URL } from "@/constant/apiUrl"
import axios from "@/lib/axios"
import { IdeaTypes } from "@/types/IdeaTypes"

export default async function useIdeas({ params }: { params?: any } = {}): Promise<IdeaTypes[]> {
    try {
        const { data: { data } } = await axios.get(API_URL.ideas, {
            params: { sort: "number:asc", ...params },
        })
        return data as IdeaTypes[]
    } catch (error) {
        console.error("Error fetching ideas:", error)
        return []
    }
}
