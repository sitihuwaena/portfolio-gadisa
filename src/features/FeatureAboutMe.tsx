"use client"

import { useParams } from "next/navigation"

export default function FeatureAboutMe({ source }: {
    source: any
}) {

    const param = useParams()

    return (
        <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold">
                {param.locale == "id" ? "Tentang Saya" : "About Me"}
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
                {source?.about_me}
            </p>
        </div>
    )
}