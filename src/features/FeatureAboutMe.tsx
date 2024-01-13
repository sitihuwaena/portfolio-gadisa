"use client"

export default function FeatureAboutMe({ source }: {
    source: any
}) {

    return (
        <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold">
                About Me
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
                {source?.about_me}
            </p>
        </div>
    )
}