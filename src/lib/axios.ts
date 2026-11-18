
import _axios from "axios";

// In the browser, API requests go through the website's own /strapi-api path,
// which Next.js rewrites to Strapi. The browser then only talks to the same
// origin, so Strapi's CORS allow-list is not involved. On the server, requests
// call Strapi directly because relative URLs do not work there.
const isServer = typeof window === "undefined";
const apiUrl = process.env.NEXT_PUBLIC_RELEASE_STAGE == "production" ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION : process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT;

const axios = _axios.create({
    baseURL: isServer ? apiUrl : "/strapi-api",
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
    }
})
axios.interceptors.request.use(async (config) => {
    return config
}, err => {
    return Promise.reject(err)
})

axios.interceptors.response.use((response) => {
    return response
}, async err => {

    if (err.response?.status == 401) {
        // const response = await getRefreshToken(user?.access_token) as any
        // console.log("Update TOKEN", response?.access_token);
        // const { update } = useSession()

        // update({ access_token: response?.access_token })
        // return axios(err.config)
    }
    return Promise.reject(err);
})

export default axios