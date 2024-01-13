import { baseURL } from "@/constant/baseUrl";
import FeatureListProject from "@/features/FeatureListProject";
import useProjectPage from "@/hooks/useProjectPage";
import { Metadata } from "next";
import Head from "next/head";

export async function generateMetadata(): Promise<Metadata> {
    const { data } = await useProjectPage()
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

export default async function Project() {
    const { data } = await useProjectPage()

    return (
        <>
            <Head>
                <meta property="og:image" itemProp="image" content={baseURL + data.attributes.meta.meta_image.data.attributes.formats.thumbnail.url} />
        <meta property="og:image:width" content="256"/>
        <meta property="og:image:height" content="256"/>
            </Head>
            <section className="w-full py-10">
                <div className="container mx-auto font-poppins px-8 md:px-16">
                    <div className="space-y-12">
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
                        <FeatureListProject />
                    </div>
                </div>
            </section>
        </>
    )
}