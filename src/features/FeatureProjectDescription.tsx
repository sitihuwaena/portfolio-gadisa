"use client"

import { ProjectTypes } from "@/types/ProjectTypes";
import Markdown, { Components } from 'react-markdown'
import { Children, isValidElement } from "react";
// A paragraph with several images is laid out as a grid of max 2 per row.
// Any text in the same paragraph (no blank line before the images in the CMS) stays above the grid.
const components: Components = {
    p({ children }) {
        const items = Children.toArray(children)
        const images = items.filter((child) => isValidElement(child) && child.type === "img")

        if (images.length < 2) return <p>{children}</p>

        const text = items.filter((child) => !images.includes(child))
        const hasText = text.some((child) => typeof child !== "string" || child.trim())

        return (
            <>
                {hasText && <p>{text}</p>}
                {/* CMS images are small (mostly 150–600px wide): cap columns at a medium width and never upscale, or they blur */}
                <div className="my-5 grid grid-cols-[repeat(2,minmax(0,320px))] items-start gap-4 [&>img]:my-0 [&>img]:h-auto [&>img]:max-w-full">
                    {images}
                </div>
            </>
        )
    },
}


export default function FeatureProjectDescription({ source }: { source: ProjectTypes }) {

    return (
        <div className="w-full">
            <div className="border-b md:px-4 px-2 border-border mb-4">
                <h2 className="text-2xl text-primary font-dm-sans-bold mb-4">Project Description</h2>
            </div>
            <div className="md:px-4 px-2 pb-6">
                <h2 className="text-xl text-accent font-dm-sans-semi-bold pb-1">Summary</h2>
                <div className="text-texting font-dm-sans">{source.subtitle}</div>
            </div>
            <div className="prose max-w-none md:px-4 px-2 pb-8 font-dm-sans text-texting prose-headings:text-xl prose-headings:mb-1 prose-headings:text-accent prose-strong:text-primary prose-a:text-accent prose-li:marker:text-accent [&_h5]:font-dm-sans-bold">
                <Markdown components={components}>
                    {source.description}
                </Markdown>
            </div>
        </div>
    )
}