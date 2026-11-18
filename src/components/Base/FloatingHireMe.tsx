"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

export default function FloatingHireMe() {
    const pathname = usePathname()

    // Already on the contact page, so the shortcut is not needed
    const hidden = pathname?.startsWith("/reach-me")

    return (
        <AnimatePresence>
            {
                !hidden && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.35 }}
                        className="fixed bottom-5 right-5 z-50 md:bottom-8 md:right-8"
                    >
                        <Link
                            href="/reach-me"
                            aria-label="Hire me"
                            className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-xl transition hover:scale-105 md:h-24 md:w-24"
                        >
                            <span className="absolute inset-0 animate-[spin_12s_linear_infinite] text-[7px] font-dm-sans-bold uppercase tracking-[0.25em] text-white">
                                <svg viewBox="0 0 100 100" className="h-full w-full">
                                    <defs>
                                        <path id="hireCircle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                                    </defs>
                                    <text fill="currentColor">
                                        <textPath href="#hireCircle" startOffset="0%">
                                            HIRE ME · HIRE ME · HIRE ME ·
                                        </textPath>
                                    </text>
                                </svg>
                            </span>
                            <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground md:h-10 md:w-10">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                                </svg>
                            </span>
                        </Link>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}
