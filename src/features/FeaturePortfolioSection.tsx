"use client";

import { ProjectCard } from "@/components/card/ProjectCard";
import { ProjectTypes } from "@/types/ProjectTypes";
import Link from "next/link";
import { motion } from "motion/react";

export default function FeaturePortfolioSection({ source }: { source: ProjectTypes[] }) {
  return (
    <section className="relative w-full overflow-hidden bg-primary py-16 md:py-24">
      <div className="container relative z-10 mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl space-y-3">
            <p className="font-dm-sans-medium text-sm tracking-[0.18em] uppercase text-accent-light">
              Selected Work
            </p>
            <h2 className="font-dm-sans-extra-bold text-3xl leading-tight text-white md:text-5xl">
              Take a closer look at my{" "}
              <span className="text-accent-light">Portfolio</span>
            </h2>
          </div>

          <Link
            href="/project"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 font-dm-sans-semi-bold text-accent-foreground transition hover:brightness-105"
          >
            View all Projects
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>

        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-3 md:gap-8">
          {source.map((data, index) => (
            <motion.div
              key={data.documentId || index}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <ProjectCard project={data} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
