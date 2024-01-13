import axios from "@/libraries/axios"

export default async function useHomePage() {
    const data = await axios.get("/api/home-page")
    return data.data
}