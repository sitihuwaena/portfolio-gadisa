"use client"

import { useEffect, useState } from "react"

export default function BaseNavbar({ children }: { children: React.ReactNode }) {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        function updatePosition() {
            setScrolled(window.scrollY > 12)
        }
        window.addEventListener("scroll", updatePosition)
        updatePosition()
        return () => window.removeEventListener("scroll", updatePosition)
    }, [])

    return (
        <nav className="fixed top-0 z-40 w-full px-4 pt-4 md:px-6 md:pt-5">
            <div
                className={`container mx-auto rounded-full border transition-all duration-300 ${
                    scrolled
                        ? "border-white/10 bg-primary/95 py-2 shadow-lg backdrop-blur-xl md:py-2.5"
                        : "border-primary/80 bg-primary py-2 md:py-2.5"
                }`}
            >
                {children}
            </div>
        </nav>
    )
}
