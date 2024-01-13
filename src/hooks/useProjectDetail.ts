import axios from "@/libraries/axios"

export default async function useProjectDetail(slug: string) {
    const data = await axios.get(`/api/projects/${slug}`, {
        headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
        }
    })
    return data.data
}