import axios from "@/libraries/axios"

export default async function useContactPage(locale?: string) {
    const { data } = await axios.get(`/api/contact-page${locale ? "?locale=" + locale : ""}`)
    return data
}