"use client";

import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { HomePageTypes } from "@/types/HomePageTypes";
import { analytics, logEvent } from "@/lib/firebase";
import { motion } from "motion/react";

const skillTags = [
    { label: "Product Manager", accent: true },
    { label: "IT Project Manager", accent: false },
    { label: "UX Researcher", accent: true },
];

const tickerItems = [
    "Project Manager",
    "Product Manager",
    "IT Project Manager",
    "UX Researcher",
];

function StarIcon({ className = "h-3 w-3" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
            <path d="M8 0l1.4 5.2L14.5 6.5l-4 3.6L11.8 16 8 12.8 4.2 16l1.3-5.9-4-3.6 5.1-1.3L8 0z" />
        </svg>
    );
}

export function FeatureHeroSection({ source }: { source: HomePageTypes | null }) {
    const handleDownloadResume = () => {
        if (source?.resume) {
            analytics && logEvent(analytics, "download_resume", { source: "home" });
            window.open(source.resume, "_blank");
        }
    };

    return (
        <section className="relative w-full overflow-hidden bg-background-cream bg-grid-soft pt-24 md:pt-28">
            <div className="container relative mx-auto px-6 md:px-16">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="mb-6 flex justify-center"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 shadow-sm">
                        <span className="text-accent">
                            <StarIcon className="h-3.5 w-3.5" />
                        </span>
                        <span className="font-dm-sans-medium text-xs text-primary md:text-sm">
                            Project Manager · Indonesia
                        </span>
                    </div>
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.05 }}
                    className="relative z-20 text-center"
                >
                    <h1 className="font-dm-sans-extra-bold text-4xl leading-tight text-primary md:text-6xl lg:text-7xl">
                        I&apos;m{" "}
                        <span className="relative inline-block text-accent">
                            Siti Huwaena M
                            <svg
                                className="absolute -right-7 -top-3 h-5 w-5 text-primary md:-right-9 md:-top-4 md:h-7 md:w-7"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden
                            >
                                <path d="M12 2l1.2 6.5L20 10l-6.8 1.5L12 18l-1.2-6.5L4 10l6.8-1.5L12 2z" />
                            </svg>
                        </span>
                    </h1>
                    <p className="mt-3 font-dm-sans text-base text-texting md:text-lg">
                        Project Manager based in Indonesia
                    </p>
                </motion.div>

                {/* Portrait stage */}
                <div className="relative mx-auto mt-4 flex max-w-5xl flex-col items-center md:mt-2">
                    {/* Side: social */}
                    <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                        className="absolute left-0 top-[18%] z-20 hidden flex-col gap-3 lg:flex"
                    >
                        <p className="font-dm-sans-medium text-xs uppercase tracking-wider text-texting">
                            Follow Me On
                        </p>
                        <div className="flex gap-2">
                            {[
                                { href: "https://www.instagram.com/gadisamaulidiah/", icon: "/assets/icons/sosmed/instagram-logo.svg", alt: "instagram" },
                                { href: "https://www.linkedin.com/in/siti-huwaena/", icon: "/assets/icons/sosmed/linkedin-logo.svg", alt: "linkedin" },
                            ].map((s) => (
                                <Link
                                    key={s.alt}
                                    href={s.href}
                                    target="_blank"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary transition hover:bg-accent"
                                >
                                    <Image src={s.icon} alt={s.alt} width={18} height={18} className="brightness-0 invert" />
                                </Link>
                            ))}
                        </div>
                        <div className="mt-4 max-w-[180px]">
                            <p className="font-dm-sans-bold text-lg text-accent">
                                10+ Projects
                            </p>
                            <p className="font-dm-sans text-xs text-texting">
                                2+ years building products
                            </p>
                        </div>
                    </motion.div>

                    {/* Side: quote + tags */}
                    <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="absolute right-0 top-[14%] z-20 hidden max-w-[220px] flex-col items-end gap-4 lg:flex"
                    >
                        <p className="text-right font-dm-sans-medium text-sm italic leading-snug text-texting">
                            &ldquo;Building digital products with craft, clarity, and care.&rdquo;
                        </p>
                        <div className="flex flex-wrap justify-end gap-2">
                            {skillTags.map((tag) => (
                                <span
                                    key={tag.label}
                                    className={`rounded-full px-3 py-1 font-dm-sans-semi-bold text-xs ${
                                        tag.accent
                                            ? "bg-accent text-accent-foreground"
                                            : "bg-primary text-white"
                                    }`}
                                >
                                    {tag.label}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Photo — full PNG, no crop / no backdrop */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="relative z-10 mt-2 flex w-full justify-center"
                    >
                        <Image
                            src="/assets/image/hero-portrait-transparent.png"
                            alt="Siti Huwaena M"
                            width={1587}
                            height={1054}
                            priority
                            className="h-auto w-full max-w-2xl object-contain md:max-w-3xl"
                            sizes="(max-width: 768px) 95vw, 768px"
                        />
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="relative z-20 mb-8 mt-4 flex flex-wrap items-center justify-center gap-3 md:mb-10 md:mt-6"
                    >
                        <Link
                            href="/project"
                            className="inline-flex items-center gap-2 rounded-full bg-accent py-3 pl-6 pr-2 font-dm-sans-semi-bold text-accent-foreground shadow-md transition hover:brightness-105"
                        >
                            Portfolio
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </Link>
                        <button
                            type="button"
                            onClick={handleDownloadResume}
                            className="rounded-full border-2 border-primary bg-white px-7 py-3 font-dm-sans-semi-bold text-primary transition hover:bg-primary hover:text-white"
                        >
                            Download Resume
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Bottom ticker */}
            <div className="relative z-10 border-y border-primary bg-primary py-3.5">
                <Marquee speed={40} gradient={false}>
                    {tickerItems.concat(tickerItems).map((item, i) => (
                        <div key={`${item}-${i}`} className="mx-6 flex items-center gap-6 md:mx-10">
                            <span className="font-dm-sans-semi-bold text-sm text-white md:text-base">
                                {item}
                            </span>
                            <span className="text-accent-light">
                                <StarIcon className="h-3.5 w-3.5" />
                            </span>
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
}
