import axios from "@/libraries/axios"

export default async function useProjectPage() {
    const data = await axios.get("/api/project-page")
    return data.data
}