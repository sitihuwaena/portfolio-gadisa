import { baseURL } from "@/constant/baseUrl"
import useContactPage from "@/hooks/useContactPage"
import { Metadata } from "next"
import Head from "next/head"

export async function generateMetadata(): Promise<Metadata> {
    const { data } = await useContactPage()
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

export default async function Contact() {
    const { data } = await useContactPage()

    return (
        <>
            <Head>
                <meta property="og:image" itemProp="image" content={baseURL + data.attributes.meta.meta_image.data.attributes.formats.thumbnail.url} />
                <meta property="og:image:width" content="256" />
                <meta property="og:image:height" content="256" />
            </Head>
            <section className="w-full py-16">
                <div className="container mx-auto font-poppins px-6 md:px-16">
                    <div className="w-full h-[60vh] md:space-y-4 flex flex-col items-center justify-center">
                        <h2 className="text-2xl text-center md:text-5xl font-bold text-gray-800">For any questions please mail us:</h2>
                        <p className="text-2xl md:text-5xl text-center py-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-semibold">
                            {data.attributes.email}
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}