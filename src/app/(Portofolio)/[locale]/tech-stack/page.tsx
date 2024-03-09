import { baseURL } from "@/constant/baseUrl"
import FeatureSkill from "@/features/FeatureSkill"
import useTechStackPage from "@/hooks/useTechStackPage"
import { Metadata } from "next"
import Head from "next/head"

interface Params {
    params: {
        locale: string
    }
}

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
    const { data } = await useTechStackPage(locale)
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
        keywords: data.attributes.meta.keyword,
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

export default async function TechStack({ params: { locale } }: Params) {
    const { data } = await useTechStackPage(locale)

    return (
        <>
            <Head>
                <meta property="og:image" itemProp="image" content={baseURL + data.attributes.meta.meta_image.data.attributes.formats.thumbnail.url} />
                <meta property="og:image:width" content="256" />
                <meta property="og:image:height" content="256" />
            </Head>
            <section className="w-full py-10">
                <div className="container mx-auto font-poppins px-6 md:px-16">
                    <div className="space-y-16">
                        <div className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-poppins-semi-bold text-gray-600 text-center">
                                {data.attributes.title}
                            </h2>
                            <div className="flex justify-center">
                                <p className="text-gray-600 md:text-xl max-w-xl  font-poppins-light md:font-poppins-extra-light text-center">
                                    {data.attributes.subtitle}
                                </p>
                            </div>
                        </div>
                        <FeatureSkill />
                    </div>
                </div>
            </section>
        </>
    )
}