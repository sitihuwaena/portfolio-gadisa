import axios from "@/libraries/axios"

export default async function useHomePage(locale: string) {
    const { data } = await axios.get(`/api/home-page${locale ? "?locale=" + locale : ""}`)
    return data
}