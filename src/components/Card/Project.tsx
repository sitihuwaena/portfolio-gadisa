"use client"

import { baseURL } from "@/constant/baseUrl";
import Image from "next/image";
import ChipLogo from "../Chip/Logo";
import { Skill } from "@/types/skillTypes.interface";

export default function CardProject({ title, subtitle, livePreview, thumbnail, previewCode, click, skills }: {
    title?: string,
    subtitle?: string,
    thumbnail: any,
    livePreview?: string,
    previewCode?: string,
    skills: Array<Skill>
    click?: () => void
}) {

    function goToLivePreview() {
        if (!livePreview) return
        window.open(livePreview, "_blank")
    }

    function goToPreviewCode() {
        if (!previewCode) return
        window.open(previewCode, "_blank")
    }

    return (
        <div onClick={click} className="bg-white transition-all hover:opacity-70 cursor-pointer overflow-hidden rounded-xl drop-shadow-xl h-[26rem] w-full">
            <div className="w-full bg-gray-100 h-[13rem] relative">
                <Image alt="link" layout="fill" objectFit="cover" className="w-full h-full object-contain"
                    src={baseURL + thumbnail.formats.large.url}
                    placeholder="blur"
                    blurDataURL={thumbnail.placeholder}
                />
                <div className="absolute bottom-2 left-2">
                    <ChipLogo data={skills} />
                </div>
            </div>
            <div className="w-full p-4 space-y-3">
                <div className="w-full text-xl h-[3.5rem] font-semibold line-clamp-2">
                    {title}
                </div>
                <div className="text-gray-600 h-[5.2rem] text-sm font-poppins-light line-clamp-4">
                    {subtitle}
                </div>
                <div className="flex justify-between items-center">
                    <div onClick={goToLivePreview} className="flex space-x-1 cursor-pointer items-center">
                        <div className="h-4 w-4">
                            <Image alt="link" height={16} width={16} className="w-full h-full object-contain" src={require("@/assets/icons/link-chain.svg")} />
                        </div>
                        <div className="text-xs underline">
                            Live Preview
                        </div>
                    </div>
                    <div onClick={goToPreviewCode} className="flex space-x-1 cursor-pointer items-center">
                        <div className="h-4 w-4">
                            <Image alt="link" height={16} width={16} className="w-full h-full object-contain" src={require("@/assets/icons/small-github.svg")} />
                        </div>
                        <div className="text-xs underline">
                            View Code
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}