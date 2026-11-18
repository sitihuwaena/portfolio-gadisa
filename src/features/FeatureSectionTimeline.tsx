"use client";

import Timeline from '@/components/timeline';
import { ExperiencesTypes } from '@/types/ExperiencesTypes';
import { motion } from 'motion/react';

export default function FeatureSectionTimeline({ source }: { source: ExperiencesTypes[] }) {
    return (
        <section className="relative w-full overflow-hidden bg-secondary text-primary-foreground">
            <div className="container relative mx-auto px-6 py-16 md:px-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 md:mx-auto md:max-w-2xl md:text-center"
                >
                    <p className="font-dm-sans-medium text-sm tracking-[0.18em] uppercase text-accent-light">
                        Career Journey
                    </p>
                    <h2 className="mt-3 font-dm-sans-extra-bold text-3xl leading-tight lg:text-5xl">
                        My Experience
                    </h2>
                    <p className="mt-4 font-dm-sans text-base leading-relaxed text-white/70 md:text-lg">
                        A journey through my professional milestones, showcasing roles,
                        responsibilities, and achievements in the tech industry.
                    </p>
                </motion.div>

                <Timeline timeline={source} />
            </div>
        </section>
    );
}
