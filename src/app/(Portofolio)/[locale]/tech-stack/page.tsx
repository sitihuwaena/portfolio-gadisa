import { baseURL } from "@/constant/baseUrl"
import FeatureSkill from "@/features/FeatureSkill"
import useTechStackPage from "@/hooks/useTechStackPage"
import { Metadata } from "next"

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
            <section className="w-full py-10">
                <div className="container mx-auto font-poppins px-5 md:px-16">
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