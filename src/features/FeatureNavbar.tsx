"use client"

import BaseNavbar from "@/components/base/Navbar";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FeatureMenuMobile from "./FeatureMenuMobile";
import { usePathname, useParams } from "next/navigation";

export default function FeatureNavbar() {
    const param = useParams()
    const [toggle, setToggle] = useState(false)

    const menu = [
        {
            name: param.locale == "id" ? "Tentang" : "About",
            link: "/about"
        },
        // Tech Stack page hidden — uncomment to restore
        // {
        //     name: param.locale == "id" ? "Teknologi" : "Tech Stack",
        //     link: "/tech-stack"
        // },
        {
            name: param.locale == "id" ? "Projek" : "Projects",
            link: "/project"
        },
        {
            name: param.locale == "id" ? "Hubungi Saya" : "Reach Me",
            link: "/reach-me"
        },
    ]

    const pathname = usePathname()

    useEffect(() => {
        setToggle(false)
    }, [pathname])

    function activeLink(link: string) {
        if (param.locale == "id") {
            return pathname.startsWith("/id" + link)
        } else {
            return pathname.startsWith(link)
        }
    }

    return (
        <BaseNavbar>
            <div className="flex w-full items-center justify-between px-4 font-dm-sans md:px-6">
                <Link href="/" className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background">
                        <Image src="/assets/icons/logo.svg" alt="Siti Huwaena logo" width={16} height={16} className="h-4 w-4" />
                    </span>
                    <span className="hidden font-dm-sans-semi-bold text-white sm:inline">Siti Huwaena</span>
                </Link>

                <div className="hidden items-center gap-7 font-dm-sans-medium text-sm md:flex">
                    <Link
                        className={pathname === "/" ? "text-accent-light" : "text-white/80 hover:text-white"}
                        href="/"
                    >
                        {param.locale == "id" ? "Beranda" : "Home"}
                    </Link>
                    {menu.map((item, i) => (
                        <Link
                            key={i}
                            className={activeLink(item.link) ? "text-accent-light" : "text-white/80 hover:text-white"}
                            href={item.link}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/reach-me"
                        className="hidden rounded-full bg-white px-5 py-2 font-dm-sans-semi-bold text-sm text-primary transition hover:bg-accent md:inline-flex"
                    >
                        Let&apos;s Talk
                    </Link>
                    <button
                        type="button"
                        onClick={() => setToggle(!toggle)}
                        className="cursor-pointer rounded-full p-1.5 hover:bg-white/10 md:hidden"
                        aria-label="Toggle menu"
                    >
                        <Image
                            alt="toggle"
                            src={toggle ? "/assets/icons/times-white.svg" : "/assets/icons/more.svg"}
                            width={32}
                            height={32}
                            className={!toggle ? "brightness-0 invert" : ""}
                        />
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {toggle && <FeatureMenuMobile clicked={() => setToggle(false)} menu={menu} />}
            </AnimatePresence>
        </BaseNavbar>
    )
}
