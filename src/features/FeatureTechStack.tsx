"use client"

import ButtonSolid from "@/components/Button/Solid"
import { baseURL } from "@/constant/baseUrl"
import Image from "next/image"
import { useRouter } from 'next-nprogress-bar';


export default function FeatureTechStack({ source }: {
    source: any
}) {
    const router = useRouter()

    function handleNavigate() {
        router.push("/tech-stack")
    }

    return (
        <section className="w-full bg-gray-50 mt-20 py-16">
            <div className="container mx-auto space-y-4 px-8 md:px-16">
                <h2 className="text-2xl md:text-3xl font-poppins-semi-bold text-gray-600 text-center">
                    {source.title}
                </h2>
                <div className="flex justify-center">
                    <p className="text-gray-600 md:text-xl max-w-xl  font-poppins-light md:font-poppins-extra-light text-center">
                        {source.subtitle}
                    </p>
                </div>
                <div className="my-24 w-full md:px-16 flex justify-center">
                    <div className="w-full pb-14 pt-7 justify-items-center grid gap-8 grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
                        {
                            source.skills.data.length > 0 && source.skills.data.map((item: any, i: any) => (
                                <div key={i} className="w-16 h-16 md:w-28 md:h-28">
                                    <Image width={64} height={64}
                                        src={baseURL + item.attributes.source.data.attributes.url}
                                        className="w-full h-full object-contain" alt={item.attributes.title}
                                    />
                                    <div className="w-full text-center text-sm md:text-base font-poppins text-gray-500 font-semibold">
                                        {item.attributes.title}
                                    </div>
                                </div>
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