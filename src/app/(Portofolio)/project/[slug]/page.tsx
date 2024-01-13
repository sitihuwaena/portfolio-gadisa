import { baseURL } from "@/constant/baseUrl"
import useProjectDetail from "@/hooks/useProjectDetail"
import { Project } from "@/types/projectTypes.interface"
import dayjs from "dayjs"
import { Metadata } from "next"
import Head from "next/head"
import Image from "next/image"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { data } = await useProjectDetail(params.slug)
    const images = data.attributes.meta.meta_image.data.attributes.formats

    const newImages = Object.values(images).map((item: any) => {
        return {
            url: baseURL + item.url,
            width: item.width,
            height: item.height
        }
    })

    return {
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

export default async function ProjectDetail({ params }: { params: { slug: string } }) {

    const project = await useProjectDetail(params.slug)
    const data = project.data as Project
    const thumbnail = data.attributes.thumbnail.data.attributes

    return (
        <>
            <Head>
                <meta property="og:image" itemProp="image" content={baseURL + data.attributes.meta.meta_image.data.attributes.formats.thumbnail.url} />
                <meta property="og:image:width" content="256" />
                <meta property="og:image:height" content="256" />
            </Head>
            <section className="relative w-full py-10">
                <div className="container relative mx-auto font-poppins px-8 space-y-8 md:px-16">
                    <div className="w-full relative grid h-[24rem] grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="relative h-[12rem] md:h-[24rem] w-full bg-white lg:col-span-2 drop-shadow-md rounded-lg overflow-hidden">
                            <Image className="w-full h-full object-contain md:object-cover" layout="fill" 
                            src={baseURL + thumbnail.url}
                            placeholder="blur"
                            blurDataURL={thumbnail.placeholder}
                            alt={data.attributes.title} />
                        </div>
                        <div className="bg-white rounded-lg p-3 space-y-3 drop-shadow-md text-gray-500">
                            <div className="bg-gray-50 rounded-lg py-2 px-4">
                                <div className="font-semibold">Timeline</div>
                                <div className="text-sm">
                                    {dayjs(data.attributes.startDate).format("DD MMMM YYYY")} - {dayjs(data.attributes.endDate).format("DD MMMM YYYY")}
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg py-2 px-4 flex items-center justify-between">
                                <div className="font-semibold">Project</div>
                                <div className={`
                                text-sm
                                py-1
                                px-2
                                rounded-lg
                                justify-start
                                text-white
                                ${data.attributes.type_project == "Office" && "bg-primary"
                                    }
                                ${data.attributes.type_project == "Freelance" && "bg-secondary"
                                    }
                            `}>
                                    {data.attributes.type_project}
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg py-2 px-4 flex items-center justify-between">
                                <div className="font-semibold">Complexity</div>
                                <div className={`
                                text-sm
                                py-1
                                px-2
                                rounded-lg
                                justify-start
                                text-white
                                ${data.attributes.complexity == "Basic" && "bg-green-500"
                                    }
                                ${data.attributes.complexity == "Intermediate" && "bg-blue-500"
                                    }
                                ${data.attributes.complexity == "Advanced" && "bg-orange-500"
                                    }
                            `}>
                                    {data.attributes.complexity}
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg py-2 px-4">
                                <div className="font-semibold">Tech Stack</div>
                                <div className="w-full flex gap-2 py-1 flex-wrap items-center">
                                    {
                                        data.attributes.skills.data.map((item, i) => (
                                            <div className="w-8 h-8 relative">
                                                <Image alt={item.attributes.title} objectFit="container" layout="fill" key={i} src={baseURL + item.attributes.source.data.attributes.url} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg py-2 px-4">
                                <div className="font-semibold">Live Preview</div>
                                <div className="text-sm text-secondary">
                                    {
                                        data.attributes.live_preview ? (
                                            <a href={data.attributes.live_preview} target="_blank">
                                                {data.attributes.live_preview}
                                            </a>
                                        ) : "Private"
                                    }
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg py-2 px-4">
                                <div className="font-semibold">Code Preview</div>
                                <div className="text-sm text-secondary">
                                    {
                                        data.attributes.view_code ? (
                                            <a href={data.attributes.view_code} target="_blank">
                                                {data.attributes.view_code}
                                            </a>
                                        ) : "Private"
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4 relative py-64 md:py-[29rem] lg:py-0">
                        <div className="space-y-1">
                            <h2 className="text-xl md:text-2xl font-poppins-semi-bold text-gray-600">
                                {data.attributes.title}
                            </h2>
                            <p className="text-sm text-gray-400">
                                Published on {dayjs(data.attributes.publishedAt).format("DD MMMM YYYY")}
                            </p>
                        </div>
                        <div className="text-gray-500 max-w-4xl">
                            <h4 className="font-bold text-lg">
                                Ringkasan
                            </h4>
                            <p className="md:font-poppins-light font-poppins-light">
                                {data.attributes.subtitle}
                            </p>
                        </div>
                        <div className="text-gray-500">
                            {
                                data.attributes.description?.map((item: any, i) => (
                                    <>
                                        {
                                            item.type == "heading" && item.children.map((head: any, hi: any) => (
                                                <h4 className="font-bold text-lg" key={hi}>
                                                    {head.text}
                                                </h4>
                                            ))
                                        }
                                        {
                                            item.type == "list" &&
                                            item.children.map((list: any, li: any) => (
                                                <ul className="list-disc px-4" key={li}>
                                                    {
                                                        list.children.map((clist: any, cli: any) => (
                                                            <li key={cli} className="font-poppins-light">
                                                                {clist.text}
                                                            </li>

                                                        ))
                                                    }
                                                </ul>
                                            ))

                                        }
                                        {
                                            item.type == "paragraph" && item.children.map((p: any, pi: any) => (
                                                <p className="font-poppins-light" key={pi}>
                                                    {p.text}
                                                </p>
                                            ))
                                        }
                                    </>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}