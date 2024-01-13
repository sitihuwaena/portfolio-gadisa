import axios from "@/libraries/axios"

export default async function useAboutPage() {
    const data = await axios.get("/api/about-page")
    return data.data
}