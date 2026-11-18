"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function FeatureMenuMobile({ menu, clicked }: {
    menu: Array<any>,
    clicked: Function
}) {

    const path = usePathname()
    const param = useParams()

    function activeLink(link: string) {
        if (param.locale == "id") {
            return path.startsWith("/id" + link)
        } else {
            return path.startsWith(link)
        }
    }

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
            className="w-full h-[100vh] bg-background-blue font-dm-sans">
            <div className="fixed z-30 overflow-hidden h-full w-full px-8 lg:px-16">
                <div className="flex flex-col justify-start items-start overflow-y-auto relative bg-transparent font-dm-sans-medium space-y-12 h-full w-full text-lg py-16">
                    <div className="space-y-1 text-2xl flex flex-col">
                        <Link className={`text-texting`} href={"/"} >
                            {param.locale == "id" ? "Beranda" : "Home"}
                        </Link>
                        {
                            path == "/" ? (
                                <div className="h-1 w-full bg-primary rounded-full" />
                            ) : (
                                <div className="h-1 w-full" />
                            )
                        }
                    </div>
                    {
                        menu.length > 0 && menu.map((item, i) => (
                            <div onClick={() => samePage(item.link)} key={i} className="space-y-1 flex flex-col items-start justify-start">
                                <Link className={`text-texting text-2xl`} href={item.link} >
                                    {item.name}
                                </Link>
                                {
                                    activeLink(item.link) ? (
                                        <div className="h-1 w-full bg-primary rounded-full" />
                                    ) : (
                                        <div className="h-1 w-full" />
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </motion.div>
    )
}