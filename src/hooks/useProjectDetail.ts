import axios from "@/libraries/axios"

export default async function useProjectDetail(slug: string, locale?: string) {
    const a = `/api/projects/${slug}${locale ? "?locale=" + locale : ""}`
    console.log(a);
    
    const { data } = await axios.get(`/api/projects/${slug}${locale ? "?locale=" + locale : ""}`, {
        headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
        }
    })
    return data
}