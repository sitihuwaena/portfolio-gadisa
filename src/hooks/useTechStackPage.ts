import axios from "@/libraries/axios"

export default async function useTechStackPage(locale: string) {
    const { data } = await axios.get(`/api/tech-stack-page${locale ? "?locale=" + locale : ""}`)
    return data
}