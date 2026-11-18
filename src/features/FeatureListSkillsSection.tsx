"use client"

import getImage from "@/lib/getImage";
import { Skill } from "@/types/SkillTypes";
import Image from "next/image";

export default function FeatureListSkillsSection({ source }: { source: Skill[] }) {

    return (
        <section className="pt-8 md:py-16 bg-background-blue/90 backdrop-blur-xl relative">
            <div className="container mx-auto px-6 md:px-16">
                <div className='pb-8 md:pb-16 md:text-center'>
                    <h2 className="font-dm-sans-bold text-2xl lg:text-3xl text-secondary mb-2 md:mb-4">
                        My Tech Stack
                    </h2>
                    <p className='text-gray-500 md:text-center md:mx-auto text-lg md:max-w-xl'>
                        A showcase of the technologies and tools I excel in, highlighting my technical expertise and versatility in the ever-evolving tech landscape.
                    </p>
                </div>
                <div className="grid grid-cols-12 gap-6 justify-items-center">
                    {source.map((data, index) => (
                        <div key={index} className="flex col-span-4 md:col-span-3 flex-col items-center">
                            <Image className="w-14 h-14 md:w-24 md:h-24" alt={data.title} src={data.source ? getImage(data.source.url) : "/assets/icons/logo.svg"} width={80} height={80} />
                            <div className="mt-2 text-center text-sm md:text-base font-dm-sans-semi-bold text-gray-700">
                                {data.title}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}