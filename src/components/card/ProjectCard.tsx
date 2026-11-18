"use client"

import getImage from "@/lib/getImage";
import { ProjectTypes } from "@/types/ProjectTypes";
import Image from "next/image";
import Link from "next/link";

export function ProjectCard({ project }: {
    project: ProjectTypes,
}) {
    const imageUrl = project.thumbnail?.url ? getImage(project.thumbnail.url) : project.thumbnail?.url;

    return (
        <Link href={`/project/${project.slug}`} className="group block cursor-pointer">
            {/* Background only, in softened brand purples: sides fade to accent-light #D48AA5 at ~70%,
                bottom darkens to accent #853953 at 75% opacity behind the text */}
            <article className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[linear-gradient(to_bottom,transparent_50%,#853953bf_100%),radial-gradient(130%_100%_at_50%_0%,#ffffff_35%,#E1ADC0_100%)] shadow-lg transition-transform duration-500 group-hover:-translate-y-1">
                {project.featured && (
                    <div className="absolute right-0 top-0 z-10 rounded-bl-2xl bg-accent px-3 py-1 font-dm-sans-bold text-xs text-accent-foreground">
                        Featured
                    </div>
                )}
                {imageUrl && (
                    <div className="absolute inset-0">
                        <Image
                            src={imageUrl || "/images/placeholder.png"}
                            alt={project.title}
                            fill
                            className="object-contain object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                    </div>
                )}
                <div className="absolute inset-0 flex flex-col justify-end text-white">
                    {/* No overlay over the photo, so a soft text shadow keeps the white text readable */}
                    <div className="relative space-y-1 p-5 [text-shadow:0_1px_6px_rgba(80,30,50,0.85)]">
                        <h3 className="line-clamp-1 font-dm-sans-bold text-xl">
                            {project.title}
                        </h3>
                        <p className="line-clamp-2 text-sm text-white/85">
                            {project.subtitle}
                        </p>
                        <div className="flex items-start -space-x-2 pt-2">
                            {project.skills?.filter((skill) => skill.source).slice(0, 3).map((skill, index) => (
                                <div
                                    key={index}
                                    className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white p-0.5"
                                >
                                    <Image
                                        alt={skill.title}
                                        src={getImage(skill.source!.url)}
                                        className="h-7 w-7"
                                        width={28}
                                        height={28}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}

export function ProjectCardPlaceholder() {
    return (
        <div className="relative aspect-[4/3] animate-pulse overflow-hidden rounded-3xl border border-border/40 bg-white/40">
            <div className="h-full w-full bg-border/20" />
        </div>
    );
}
