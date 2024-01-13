import { baseURL } from "@/constant/baseUrl"
import FeatureAboutMe from "@/features/FeatureAboutMe"
import FeatureEducation from "@/features/FeatureEducation"
import FeatureWorkExperiences from "@/features/FeatureWorkExperiences"
import useAboutPage from "@/hooks/useAboutPage"
import { Metadata } from "next"
import Head from "next/head"

export async function generateMetadata(): Promise<Metadata> {
    const { data } = await useAboutPage()
    const images = data.attributes.meta.meta_image.data.attributes.formats

    const newImages = Object.values(images).map((item: any) => {
        return {
            url: baseURL + item.url,
            width: item.width,
            height: item.height
        }
    })

    return {
        title: data.attributes.meta.title,
        description: data.attributes.meta.meta_description,
        twitter: {
            title: data.attributes.meta.title,
            description: data.attributes.meta.meta_description,
            images: baseURL + images.small.url
        },
        openGraph: {
            title: data.attributes.meta.title,
            description: data.attributes.meta.meta_description,
            images: newImages
        }
    }
}

export default async function About() {
    const { data } = await useAboutPage()

    return (
        <>
            <Head>
                <meta property="og:image" itemProp="image" content={baseURL + data.attributes.meta.meta_image.data.attributes.formats.thumbnail.url} />
                <meta property="og:image:width" content="256" />
                <meta property="og:image:height" content="256" />
            </Head>
            <section className="w-full py-10">
                <div className="container mx-auto font-poppins px-6 md:px-16">
                    <div className="max-w-2xl space-y-16">
                        <FeatureAboutMe source={data.attributes} />
                        <FeatureWorkExperiences />
                        <FeatureEducation />
                    </div>
                </div>
            </section>
        </>
    )
}
