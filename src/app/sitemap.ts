import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseURL = process.env.NEXT_PUBLIC_SITE_URL!
    return [
        {
            url: baseURL,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseURL}/project`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseURL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // Tech Stack page hidden — uncomment to restore
        // {
        //     url: `${baseURL}/tech-stack`,
        //     lastModified: new Date(),
        //     changeFrequency: 'monthly',
        //     priority: 0.7,
        // },
        {
            url: `${baseURL}/reach-me`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ]
}