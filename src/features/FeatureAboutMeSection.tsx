"use client"

import { HomePageTypes } from "@/types/HomePageTypes";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export default function FeatureAboutMeSection({ source }: { source: HomePageTypes | null }) {
    return (
        <section className="relative w-full overflow-hidden bg-primary text-primary-foreground">
            <div className="container relative mx-auto px-6 py-16 md:px-16 md:py-24">
                <div className="grid grid-cols-12 items-center gap-10 md:gap-14">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5 }}
                        className="col-span-12 md:col-span-6"
                    >
                        <div className="mx-auto flex w-full max-w-xl justify-center md:mx-0 md:max-w-none">
                            <Image
                                src="/assets/image/who-is-siti-huwaena.png"
                                alt="Siti Huwaena Maulidiah"
                                width={1920}
                                height={1080}
                                className="h-auto w-full object-contain md:scale-110"
                                sizes="(max-width: 768px) 95vw, 50vw"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, delay: 0.08 }}
                        className="col-span-12 space-y-6 md:col-span-6 md:space-y-8"
                    >
                        <p className="font-dm-sans-medium text-sm tracking-[0.18em] uppercase text-accent-light">
                            About Me
                        </p>
                        <h2 className="font-dm-sans-extra-bold text-3xl leading-tight md:text-5xl">
                            Who is{" "}
                            <span className="text-accent-light">Siti Huwaena Maulidiah</span>?
                        </h2>
                        <p className="max-w-2xl font-dm-sans text-base leading-relaxed text-white/75 md:text-lg">
                            {source?.about}
                        </p>
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-dm-sans-semi-bold text-accent-foreground transition hover:brightness-105"
                        >
                            View my Story
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>

                <div className="mt-14 grid grid-cols-2 gap-4 border-t border-white/10 pt-10 md:grid-cols-4 md:gap-6">
                    {[
                        { value: `${source?.experiences ?? 0}+`, label: "Years Experience" },
                        { value: `${source?.projects ?? 0}+`, label: "Projects Done" },
                        { value: "IT Project / Product Manager", label: "Focus Area" },
                        { value: "Remote / Onsite", label: "Availability" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5"
                        >
                            <div className="break-words font-dm-sans-bold text-xl leading-tight text-accent-light md:text-2xl">
                                {stat.value}
                            </div>
                            <div className="mt-1 font-dm-sans-medium text-sm text-white/65">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
