
import _axios from "axios";

const axios = _axios.create({
    baseURL: process.env.NEXT_PUBLIC_RELEASE_STAGE == "production" ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION : process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT,
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