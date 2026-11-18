"use client"

import FormatDate from "@/lib/date";
import { useAppDispatch } from "@/store/hooks";
import { resetParams } from "@/store/slice/portofolioSlice";
import { ProjectTypes } from "@/types/ProjectTypes";
import { useEffect } from "react";

export default function FeatureProjectHeroSection({ source }: { source: ProjectTypes }) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(resetParams())
    }, [])

    return (
        <div className="container mx-auto px-6 pt-10 pb-8 md:px-16 md:pt-16 md:pb-12">
            <div className="mb-3 flex items-center gap-2">
                <span className="relative flex h-4 w-7">
                    <span className="absolute left-0 h-4 w-4 rounded-full bg-primary" />
                    <span className="absolute left-3 h-4 w-4 rounded-full bg-accent" />
                </span>
                <span className="font-dm-sans-medium text-sm text-texting">Project Detail</span>
            </div>
            <h1 className="max-w-4xl font-dm-sans-extra-bold text-3xl leading-tight text-primary md:text-5xl">
                {source?.title}
            </h1>
            <div className="mt-4 flex items-center gap-2 text-accent">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p className="font-dm-sans-semi-bold text-sm md:text-base">
                    Published at {FormatDate(source?.publishedAt, true)}
                </p>
            </div>
        </div>
    )
}
