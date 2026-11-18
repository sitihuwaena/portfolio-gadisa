import { API_URL } from "@/constant/apiUrl"
import axios from "@/lib/axios"
import { OrganizationTypes } from "@/types/OrganizationTypes"

export default async function useOrganization({ params }: { params?: any } = {}): Promise<OrganizationTypes[]> {
    try {
        const { data: { data } } = await axios.get(API_URL.organizations, {
            params: { populate: "media", sort: "awal:desc", ...params },
        })
        return data as OrganizationTypes[]
    } catch (error) {
        console.error("Error fetching organizations:", error)
        return []
    }
}
