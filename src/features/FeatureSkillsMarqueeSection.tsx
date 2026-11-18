"use client";

import { tools } from "@/data/tools";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { motion } from "motion/react";

export default function FeatureSkillsMarqueeSection() {
    const midpoint = Math.ceil(tools.length / 2);
    const rows = [tools.slice(0, midpoint), tools.slice(midpoint)];

    return (
        <section className="w-full bg-background-cream py-16 md:py-24">
            <div className="container mx-auto px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 max-w-2xl md:mb-14"
                >
                    <div className="mb-3 flex items-center gap-2">
                        <span className="relative flex h-4 w-7">
                            <span className="absolute left-0 h-4 w-4 rounded-full bg-primary" />
                            <span className="absolute left-3 h-4 w-4 rounded-full bg-accent" />
                        </span>
                        <span className="font-dm-sans-medium text-sm text-texting">Tools</span>
                    </div>
                    <h2 className="font-dm-sans-extra-bold text-3xl text-primary md:text-5xl">
                        Exploring the tools{" "}
                        <span className="text-accent">Behind My Work</span>
                    </h2>
                </motion.div>
            </div>

            <div className="space-y-5">
                {rows.map((row, rowIndex) => (
                    <Marquee
                        key={rowIndex}
                        speed={32}
                        direction={rowIndex === 0 ? "left" : "right"}
                        gradient
                        gradientColor="#F3F4F4"
                        gradientWidth={80}
                    >
                        {row.map((tool) => (
                            <div
                                key={tool.id}
                                className="mx-3 flex h-20 w-44 items-center justify-center overflow-hidden rounded-2xl border border-border bg-white p-3 shadow-sm md:mx-4 md:h-24 md:w-52"
                            >
                                <Image
                                    src={tool.image}
                                    alt={tool.title}
                                    width={200}
                                    height={96}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        ))}
                    </Marquee>
                ))}
            </div>
        </section>
    );
}
