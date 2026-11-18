export default function getImage(url: string) {
    const baseUrl = process.env.NEXT_PUBLIC_RELEASE_STAGE == "production" ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION : process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT
    return baseUrl + url;
}