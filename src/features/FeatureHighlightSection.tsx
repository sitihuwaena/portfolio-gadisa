"use client"

import { WobbleCard } from "@/components/ui/wobble-card";
import Image from "next/image";

export default function FeatureHighlightSection() {


    return (
        <div className="min-h-screen w-full bg-zinc-50">
            <div className="container mx-auto px-8 py-8 md:px-16">
                <div className="flex flex-col space-y-2 pb-8">
                    <div className="font-bold text-center text-3xl lg:text-5xl md:text-left text-balance">
                        Highlight Projects
                    </div>
                    <div className="text-center max-w-xl block text-base md:text-left text-neutral-500">
                        Showcasing innovative solutions and real contributions in developing applications and digital platforms
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4  mx-auto w-full">
                    <WobbleCard
                        containerClassName="col-span-1 lg:col-span-2 h-full bg-[#005199] min-h-[500px] lg:min-h-[300px]"
                        className=""
                    >
                        <div className="max-w-xs">
                            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                PIJI BIZ Application
                            </h2>
                            <p className="mt-4 text-left text-base/6 text-neutral-200">
                                PIJI BIZ is a platform that connects local businesses with
                                customers, allowing them to discover and support local products and
                                services.
                            </p>
                        </div>
                        <Image
                            src={"/assets/image/project/piji_biz.png"}
                            width={500}
                            height={300}
                            alt="yayasan"
                            className="absolute -right-4 lg:-right-[10%] -bottom-24 object-contain object-bottom"
                        />
                    </WobbleCard>
                    <WobbleCard containerClassName="bg-yellow-600 col-span-1 min-h-[300px]">
                        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                            No shirt, no shoes, no weapons.
                        </h2>
                        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                            If someone yells “stop!”, goes limp, or taps out, the fight is over.
                        </p>
                    </WobbleCard>
                    <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-[#2ab9b3] min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
                        <div className="max-w-sm">
                            <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Signup for blazing-fast cutting-edge state of the art Gippity AI
                                wrapper today!
                            </h2>
                            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                                With over 100,000 mothly active bot users, Gippity AI is the most
                                popular AI platform for developers.
                            </p>
                        </div>
                        <Image
                            src={"/assets/image/project/piji_landing.png"}
                            width={600}
                            height={600}
                            alt="yayasan 2"
                            className="absolute -right-10 md:-right-[40%] lg:right-0 top-5 object-contain"
                        />
                    </WobbleCard>
                </div>
            </div>
        </div>
    )
}