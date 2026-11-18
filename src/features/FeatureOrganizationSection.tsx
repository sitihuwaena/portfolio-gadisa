"use client"

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { formatMonthYear } from "@/lib/date";
import getImage from "@/lib/getImage";
import { OrganizationMedia, OrganizationTypes } from "@/types/OrganizationTypes";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Markdown from "react-markdown";
import { useCallback, useEffect, useState } from "react";

function mediaUrl(url: string) {
    return url.startsWith("http") ? url : getImage(url)
}

function isVideo(media: OrganizationMedia) {
    return media.mime?.startsWith("video")
}

// Plain-text excerpt of the markdown description for the card preview
function markdownExcerpt(markdown: string) {
    return markdown
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, "")
        .replace(/[*_~`]/g, "")
        .replace(/\s+/g, " ")
        .trim()
}

function RoleBadge({ role }: { role: string }) {
    return (
        <span className="inline-flex w-fit items-center rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 font-dm-sans-semi-bold text-xs text-secondary">
            {role}
        </span>
    )
}

function periodLabel(data: OrganizationTypes) {
    if (!data.awal) return null
    return `${formatMonthYear(data.awal)} - ${data.akhir ? formatMonthYear(data.akhir) : "Present"}`
}

function OrganizationCard({ data, onClick }: { data: OrganizationTypes, onClick: () => void }) {
    const cover = data.media?.find((m) => !isVideo(m))
    const period = periodLabel(data)

    return (
        <button
            type="button"
            onClick={onClick}
            className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg"
        >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary">
                {
                    cover ? (
                        <Image
                            src={mediaUrl(cover.url)}
                            alt={cover.alternativeText || data.Judul}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center font-dm-sans-extra-bold text-4xl text-secondary-foreground/80">
                            {data.Judul?.charAt(0)}
                        </div>
                    )
                }
                {
                    !!data.media?.length && (
                        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-primary/80 px-3 py-1 font-dm-sans-medium text-xs text-primary-foreground backdrop-blur-sm">
                            <Images className="h-3.5 w-3.5" />
                            {data.media.length}
                        </span>
                    )
                }
            </div>

            <div className="flex flex-1 flex-col p-4">
                {
                    period && (
                        <p className="font-dm-sans-medium text-xs uppercase tracking-[0.14em] text-accent">
                            {period}
                        </p>
                    )
                }
                <h3 className="mt-1 line-clamp-1 font-dm-sans-bold text-lg text-primary">
                    {data.Judul}
                </h3>
                {
                    data.Role && (
                        <div className="mt-2">
                            <RoleBadge role={data.Role} />
                        </div>
                    )
                }
                {
                    data.deskripsi && (
                        <p className="mt-2 line-clamp-2 font-dm-sans text-sm leading-relaxed text-texting">
                            {markdownExcerpt(data.deskripsi)}
                        </p>
                    )
                }
                <span className="mt-auto inline-flex items-center gap-1 pt-3 font-dm-sans-semi-bold text-sm text-secondary transition-colors group-hover:text-accent">
                    View details
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
            </div>
        </button>
    )
}

function OrganizationModal({ data, onClose }: { data: OrganizationTypes, onClose: () => void }) {
    const period = periodLabel(data)

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose()
        }
        const overflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        window.addEventListener("keydown", onKeyDown)

        return () => {
            document.body.style.overflow = overflow
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [onClose])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/70 p-4 backdrop-blur-sm"
        >
            <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="organization-modal-title"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                onClick={(event) => event.stopPropagation()}
                className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            >
                <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-white px-6 py-5 md:px-8">
                    <div>
                        {
                            period && (
                                <p className="font-dm-sans-medium text-xs uppercase tracking-[0.14em] text-accent">
                                    {period}
                                </p>
                            )
                        }
                        <h3 id="organization-modal-title" className="mt-1 font-dm-sans-extra-bold text-2xl text-primary md:text-3xl">
                            {data.Judul}
                        </h3>
                        {
                            data.Role && (
                                <div className="mt-3">
                                    <RoleBadge role={data.Role} />
                                </div>
                            )
                        }
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="shrink-0 cursor-pointer rounded-full border border-border p-2 text-primary transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="px-6 py-6 md:px-8">
                    {
                        data.deskripsi && (
                            <div className="prose max-w-none font-dm-sans text-texting prose-headings:font-dm-sans-bold prose-headings:text-primary prose-strong:text-primary prose-a:text-accent prose-li:marker:text-accent">
                                <Markdown>
                                    {data.deskripsi}
                                </Markdown>
                            </div>
                        )
                    }

                    {
                        !!data.media?.length && (
                            <div className="mt-8">
                                <p className="mb-4 font-dm-sans-semi-bold text-sm uppercase tracking-[0.14em] text-secondary">
                                    Documentation
                                </p>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {
                                        data.media.map((media) => (
                                            <div key={media.id} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-background">
                                                {
                                                    isVideo(media) ? (
                                                        <video src={mediaUrl(media.url)} controls className="h-full w-full object-cover" />
                                                    ) : (
                                                        <Image
                                                            src={mediaUrl(media.url)}
                                                            alt={media.alternativeText || data.Judul}
                                                            fill
                                                            sizes="(min-width: 640px) 50vw, 100vw"
                                                            className="object-cover object-center"
                                                        />
                                                    )
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function FeatureOrganizationSection({ source }: { source: OrganizationTypes[] }) {
    const [api, setApi] = useState<CarouselApi>()
    const [snaps, setSnaps] = useState<number[]>([])
    const [selected, setSelected] = useState(0)
    const [active, setActive] = useState<OrganizationTypes | null>(null)

    useEffect(() => {
        if (!api) return

        const onUpdate = () => {
            setSnaps(api.scrollSnapList())
            setSelected(api.selectedScrollSnap())
        }

        onUpdate()
        api.on("select", onUpdate)
        api.on("reInit", onUpdate)

        return () => {
            api.off("select", onUpdate)
            api.off("reInit", onUpdate)
        }
    }, [api])

    const closeModal = useCallback(() => setActive(null), [])

    if (!source?.length) return null

    return (
        <section className="relative w-full overflow-hidden bg-background-cream py-16 md:py-24">
            <div className="container mx-auto px-6 md:px-16">
                <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
                    <div className="md:max-w-2xl">
                        <div className="mb-3 flex items-center gap-2">
                            <span className="relative flex h-4 w-7">
                                <span className="absolute left-0 h-4 w-4 rounded-full bg-primary" />
                                <span className="absolute left-3 h-4 w-4 rounded-full bg-accent" />
                            </span>
                            <span className="font-dm-sans-medium text-sm text-texting">Beyond Work</span>
                        </div>
                        <h2 className="font-dm-sans-extra-bold text-3xl text-primary md:text-5xl">
                            Organization &{" "}
                            <span className="text-accent">Social Volunteer</span>
                        </h2>
                        <p className="mt-4 font-dm-sans text-base leading-relaxed text-texting md:text-lg">
                            Communities and social initiatives I have been part of, where I grew through collaboration and giving back.
                        </p>
                    </div>

                    {
                        snaps.length > 1 && (
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => api?.scrollPrev()}
                                    disabled={!api?.canScrollPrev()}
                                    aria-label="Previous organizations"
                                    className="cursor-pointer rounded-full border border-primary p-3 text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-primary"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => api?.scrollNext()}
                                    disabled={!api?.canScrollNext()}
                                    aria-label="Next organizations"
                                    className="cursor-pointer rounded-full border border-accent bg-accent p-3 text-accent-foreground transition-colors hover:bg-secondary hover:border-secondary disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-accent disabled:hover:border-accent"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        )
                    }
                </div>

                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "start",
                        slidesToScroll: "auto",
                        dragThreshold: 3,
                    }}
                >
                    <CarouselContent className="py-2">
                        {
                            source.map((data) => (
                                <CarouselItem key={data.documentId || data.id} className="basis-full md:basis-1/2 lg:basis-1/3">
                                    <OrganizationCard data={data} onClick={() => setActive(data)} />
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                </Carousel>

                {
                    snaps.length > 1 && (
                        <div className="mt-8 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                {
                                    snaps.map((_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => api?.scrollTo(index)}
                                            aria-label={`Go to slide ${index + 1}`}
                                            aria-current={selected === index}
                                            className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${selected === index ? "w-8 bg-accent" : "w-2 bg-border hover:bg-secondary-light"}`}
                                        />
                                    ))
                                }
                            </div>
                            <p className="font-dm-sans-medium text-sm text-texting-muted">
                                <span className="text-primary">{String(selected + 1).padStart(2, "0")}</span>
                                {" / "}
                                {String(snaps.length).padStart(2, "0")}
                            </p>
                        </div>
                    )
                }
            </div>

            <AnimatePresence>
                {active && <OrganizationModal data={active} onClose={closeModal} />}
            </AnimatePresence>
        </section>
    )
}
