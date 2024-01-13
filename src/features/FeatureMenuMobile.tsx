"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function FeatureMenuMobile({ menu, clicked }: {
    menu: Array<any>,
    clicked: Function
}) {

    const path = usePathname()

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])

    function samePage(link: any) {
        link == path && clicked()
    }

    return (
        <motion.div
            initial={{
                top: -100,
                opacity: 0.2,
            }}
            transition={{
                duration: 0.4
            }}
            animate={{
                top: 0,
                opacity: 1,
            }}
            exit={{
                top: -100,
                opacity: 0,
            }}
            className="w-full pt-[1.5rem] h-[calc(100vh-10rem)] font-poppins">
            <div className="fixed z-30 overflow-hidden h-full w-full bg-white px-8 lg:px-16">
                <div className="flex flex-col overflow-y-auto relative space-y-12 h-full w-full text-lg py-16">
                    <Link onClick={() => samePage("/")} href={"/"} className={`font-semibold text-2xl bg-clip-text bg-gradient-to-r from-primary to-secondary hover:opacity-80 cursor-pointer transition-all ${path == "/" ? "text-transparent" : "text-gray-400"}`}>
                        Home
                    </Link>
                    {
                        menu.length > 0 && menu.map((item, i) => (
                            <Link onClick={() => samePage(item.link)} key={i} href={item.link} className={`font-semibold text-2xl bg-clip-text bg-gradient-to-r from-primary to-secondary hover:opacity-80 cursor-pointer transition-all ${path.startsWith(item.link) ? "text-transparent" : "text-gray-400"}`}>
                                {item.name}
                            </Link>
                        ))
                    }
                </div>
            </div>
        </motion.div>
    )
}