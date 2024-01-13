import axios from "@/libraries/axios"

export default async function useContactPage() {
    const data = await axios.get("/api/contact-page")
    return data.data
}