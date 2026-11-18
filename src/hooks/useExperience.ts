import { API_URL } from "@/constant/apiUrl"
import axios from "@/lib/axios"
import { ExperiencesTypes } from "@/types/ExperiencesTypes"

// Ongoing roles (no end date) first, then by most recent end date, then by most recent start date
function byLatest(a: ExperiencesTypes, b: ExperiencesTypes) {
    const end = (e: ExperiencesTypes) => e.to ? new Date(e.to).getTime() : Infinity
    const start = (e: ExperiencesTypes) => e.from ? new Date(e.from).getTime() : 0
    return (end(b) - end(a)) || (start(b) - start(a))
}

export default async function useExperience({ params }: { params?: any } = {}) {
    try {
        const { data: { data } } = await axios.get(API_URL.experiences, { params })
        return [...(data as ExperiencesTypes[])].sort(byLatest)
    } catch (error) {
        console.error("Error fetching experiences:", error)
        return []
    }
}
