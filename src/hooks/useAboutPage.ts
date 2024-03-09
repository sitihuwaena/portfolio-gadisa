import axios from "@/libraries/axios"

export default async function useAboutPage(locale?: string) {
    const { data } = await axios.get(`/api/about-page${locale ? "?locale=" + locale : ""}`)
    return data
}