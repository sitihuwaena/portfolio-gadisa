"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { IdeaTypes } from "@/types/IdeaTypes"

// Accepts ["A","B"], [{name|label|title|tag: "A"}], {tags: [...]}, or "A, B".
function parseTags(value: unknown): string[] {
    if (value == null) return []
    if (typeof value === "string") {
        const trimmed = value.trim()
        if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
            try {
                return parseTags(JSON.parse(trimmed))
            } catch {
                return []
            }
        }
        return trimmed.split(",").map((t) => t.trim()).filter(Boolean)
    }
    if (Array.isArray(value)) {
        return value.flatMap((item) => {
            if (typeof item === "string") return [item.trim()]
            if (item && typeof item === "object") {
                const obj = item as Record<string, unknown>
                const label = obj.name ?? obj.label ?? obj.title ?? obj.tag
                return typeof label === "string" ? [label.trim()] : []
            }
            return []
        }).filter(Boolean)
    }
    if (typeof value === "object") {
        const obj = value as Record<string, unknown>
        return parseTags(obj.tags ?? obj.tag ?? obj.items)
    }
    return []
}

export default function FeatureServicesSection({ source }: { source: IdeaTypes[] }) {
    const [active, setActive] = useState(0)
    const services = source.map((idea, index) => ({
        key: idea.documentId || String(idea.id),
        number: String(idea.number ?? index + 1).padStart(2, "0"),
        title: idea.judul,
        description: idea.deskripsi,
        tags: parseTags(idea.tag),
    }))

    return (
        <section className="relative w-full overflow-hidden bg-background-cream py-16 md:py-24">
            <div className="container mx-auto px-6 md:px-16">
                <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="relative flex h-4 w-7">
                                <span className="absolute left-0 h-4 w-4 rounded-full bg-primary" />
                                <span className="absolute left-3 h-4 w-4 rounded-full bg-accent" />
                            </span>
                            <span className="font-dm-sans-medium text-sm text-texting">My Services</span>
                        </div>
                        <h2 className="font-dm-sans-extra-bold text-3xl text-primary md:text-5xl">
                            How I Make{" "}
                            <span className="text-accent">Ideas Happen</span>
                            <svg
                                className="ml-2 inline-block h-5 w-5 align-super text-primary md:h-6 md:w-6"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden
                            >
                                <path d="M12 2l1.2 6.5L20 10l-6.8 1.5L12 18l-1.2-6.5L4 10l6.8-1.5L12 2z" />
                            </svg>
                        </h2>
                    </div>

                    <Link
                        href="/about"
                        className="group inline-flex w-fit items-center gap-2 font-dm-sans-semi-bold text-sm"
                    >
                        <span className="flex h-12 items-center rounded-full bg-accent px-6 text-accent-foreground transition-colors group-hover:bg-secondary">
                            View All Experience
                        </span>
                        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-white text-primary transition-colors group-hover:border-secondary group-hover:bg-secondary group-hover:text-secondary-foreground">
                            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </Link>
                </div>

                <ul className="space-y-4">
                    {services.map((service, index) => {
                        const isOpen = active === index
                        return (
                            <li key={service.key}>
                                <button
                                    type="button"
                                    onClick={() => setActive(index)}
                                    className={`group relative w-full text-left transition-all duration-300 ${
                                        isOpen
                                            ? "clip-service-active bg-primary text-white"
                                            : "clip-service bg-white text-primary hover:shadow-md"
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-4 p-5 md:items-center md:p-6">
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
                                                <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center">
                                                    <span
                                                        className={`absolute inset-0 rounded-full border border-dashed ${
                                                            isOpen ? "border-accent-light/70" : "border-accent"
                                                        }`}
                                                    />
                                                    <span className={`font-dm-sans-bold ${isOpen ? "text-accent-light" : "text-accent"}`}>
                                                        {service.number}.
                                                    </span>
                                                </span>
                                                <h3 className="font-dm-sans-bold text-xl md:text-2xl">
                                                    {service.title}
                                                </h3>
                                            </div>

                                            <AnimatePresence initial={false}>
                                                {isOpen && (service.description || service.tags.length > 0) && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.28 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="mt-5 space-y-4 pl-0 md:pl-[4.5rem]">
                                                            {service.tags.length > 0 && (
                                                                <div className="flex flex-wrap gap-2">
                                                                    {service.tags.map((tag, i) => (
                                                                        <span
                                                                            key={`${tag}-${i}`}
                                                                            className="rounded-full border border-white/30 px-3 py-1 font-dm-sans-medium text-xs text-white/90"
                                                                        >
                                                                            {tag}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                            {service.description && (
                                                                <p className="max-w-2xl whitespace-pre-line font-dm-sans text-sm leading-relaxed text-white/75 md:text-base">
                                                                    {service.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <span
                                            className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition md:mt-0 ${
                                                isOpen
                                                    ? "bg-accent text-accent-foreground"
                                                    : "bg-accent text-accent-foreground group-hover:scale-105"
                                            }`}
                                        >
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                                            </svg>
                                        </span>
                                    </div>
                                </button>
                            </li>
                        )
                    })}
                </ul>

                <div className="mt-10 h-1.5 w-full rounded-full bg-accent" />
            </div>
        </section>
    )
}
