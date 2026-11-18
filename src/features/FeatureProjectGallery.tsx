"use client"

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import getImage from "@/lib/getImage";
import { Thumbnail } from "@/types/ThumbnailTypes";
import { useEffect, useState } from "react";

export default function FeatureProjectGallery({ images }: { images: Thumbnail[] | null }) {
    const [api, setApi] = useState<CarouselApi>()
    const [snaps, setSnaps] = useState(0)
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        if (!api) return
        // Several photos share one view on wide screens, so one radio = one scroll position, not one photo
        const sync = () => {
            setSnaps(api.scrollSnapList().length)
            setSelected(api.selectedScrollSnap())
        }
        sync()
        api.on("select", sync).on("reInit", sync)
        return () => { api.off("select", sync).off("reInit", sync) }
    }, [api])

    if (!images?.length) return null

    return (
        <div className="mb-8">
            <Carousel setApi={setApi} opts={{ align: "start", containScroll: "trimSnaps" }}>
                <CarouselContent>
                    {images.map((image) => (
                        <CarouselItem key={image.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
                            <a href={getImage(image.url)} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={getImage(image.formats?.medium?.url ?? image.url)}
                                    alt={image.name}
                                    loading="lazy"
                                    className="aspect-[4/3] w-full rounded-xl border border-border object-cover"
                                />
                            </a>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {snaps > 1 && (
                <div role="radiogroup" aria-label="Gallery page" className="mt-4 flex justify-center gap-3">
                    {Array.from({ length: snaps }).map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            role="radio"
                            aria-checked={selected === index}
                            aria-label={`Page ${index + 1}`}
                            onClick={() => api?.scrollTo(index)}
                            className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary transition hover:bg-primary/10"
                        >
                            <span className={`h-2.5 w-2.5 rounded-full bg-primary transition-transform ${selected === index ? "scale-100" : "scale-0"}`} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
