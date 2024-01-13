import axios from "@/libraries/axios"

export default async function useTechStackPage() {
    const data = await axios.get("/api/tech-stack-page")
    return data.data
}