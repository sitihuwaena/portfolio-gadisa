"use client"

import ButtonSolid from "@/components/Button/Solid";
import CardProject from "@/components/Card/Project";
import { Project } from "@/types/projectTypes.interface";
import { useRouter } from 'next-nprogress-bar';


export default function FeatureProject({ source }: {
    source: any
}) {

    const router = useRouter()

    function handleNavigate() {
        router.push("/project")
    }

    function handleDetailProject(link?: string) {
        router.push("/project/" + link)
    }

    return (
        <section className="w-full bg-white py-16">
            <div className="container mx-auto space-y-4 px-5 md:px-16">
                <h2 className="text-2xl md:text-3xl font-poppins-semi-bold text-gray-600 text-center">
                    {source.title}
                </h2>
                <div className="flex justify-center">
                    <p className="text-gray-600 md:text-xl max-w-xl  font-poppins-light md:font-poppins-extra-light text-center">
                        {source.subtitle}
                    </p>
                </div>
                <div className="my-24 w-full flex justify-center font-poppins">
                    <div className="w-full grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 py-8">
                        {
                            source.projects.data.map((item: Project, i: string) => (
                                <CardProject
                                    skills={item.attributes.skills.data}
                                    click={() => handleDetailProject(item.attributes.slug)}
                                    title={item.attributes.title}
                                    subtitle={item.attributes.subtitle}
                                    thumbnail={item.attributes.thumbnail.data.attributes}
                                    previewCode={item.attributes.view_code}
                                    livePreview={item.attributes.live_preview}
                                    key={i} />
                            ))
                        }
                    </div>
                </div>
                <div className="flex justify-center">
                    <ButtonSolid className="!px-8" click={handleNavigate} text="See More" />
                </div>
            </div>
        </section>
    )
}