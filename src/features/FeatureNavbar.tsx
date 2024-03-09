"use client"

import BaseNavbar from "@/components/Base/Navbar";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FeatureMenuMobile from "./FeatureMenuMobile";
import { usePathname, useParams } from "next/navigation";
// import FeatureMenuMobile from "./FeatureMenuMobile";

export default function FeatureNavbar() {
    const param = useParams()


    const [toggle, setToggle] = useState(false)

    const menu = [
        {
            name: param.locale == "id" ? "Tentang Saya" : "About Me",
            link: "/about"
        },
        {
            name: param.locale == "id" ? "Teknologi" : "Tech Stack",
            link: "/tech-stack"
        },
        {
            name: param.locale == "id" ? "Projek" : "Projects",
            link: "/project"
        },
        {
            name: param.locale == "id" ? "Kontak" : "Contact",
            link: "/contact"
        }
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
            <div className="w-full flex justify-between items-center font-poppins px-8 lg:px-16">
                <Link href="/">
                    <Image src={require("@/assets/icons/logo.svg")} alt="af2.tech" />
                </Link>
                <div className="hidden md:flex space-x-8 items-center">
                    <Link className={`bg-clip-text bg-gradient-to-r from-primary to-secondary text-gray-600 hover:text-transparent transition-all ${pathname == "/" && "text-transparent"}`} href={"/"} >
                        {param.locale == "id" ? "Beranda" : "Home"}
                    </Link>
                    {
                        menu.map((item, i) => (
                            <Link className={`bg-clip-text bg-gradient-to-r from-primary to-secondary text-gray-600 hover:text-transparent transition-all ${activeLink(item.link) && "text-transparent"}`} key={i} href={item.link} >
                                {item.name}
                            </Link>
                        ))
                    }
                </div>
                <div className="flex items-center space-x-4">
                    <a className="cursor-pointer h-10" href={pathname.startsWith("/id") ? pathname.replace("id", "en") : "/id" + pathname}>
                        {param.locale == "en" ? (
                            <div className="flex h-full items-center space-x-2">
                                <Image alt="toggle" className="h-9 w-9 object-contain drop-shadow-md" src={require("@/assets/icons/uk.svg")} />
                                <Image alt="toggle" className="h-4 w-4 object-contain" src={require("@/assets/icons/switch.svg")} />
                                <Image alt="toggle" className="h-7 w-7 object-contain" src={require("@/assets/icons/id.svg")} />
                            </div>
                        ) : (
                            <div className="flex h-full items-center space-x-2">
                                <Image alt="toggle" className="h-9 w-9 object-contain drop-shadow-md" src={require("@/assets/icons/id.svg")} />
                                <Image alt="toggle" className="h-4 w-4 object-contain" src={require("@/assets/icons/switch.svg")} />
                                <Image alt="toggle" className="h-7 w-7 object-contain" src={require("@/assets/icons/uk.svg")} />
                            </div>
                        )}
                    </a>
                    <div onClick={() => setToggle(!toggle)} className="md:hidden transition-all cursor-pointer hover:bg-gray-200 rounded-full">
                        {
                            toggle ? (
                                <Image alt="toggle" src={require("@/assets/icons/times.svg")} />
                            ) : (
                                <Image alt="toggle" src={require("@/assets/icons/more.svg")} />
                            )
                        }
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {
                    toggle && <FeatureMenuMobile clicked={() => setToggle(false)} menu={menu} />
                }
            </AnimatePresence>
        </BaseNavbar>
    )
}