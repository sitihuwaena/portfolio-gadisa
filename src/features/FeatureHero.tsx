"use client"

import ButtonSolid from "@/components/Button/Solid";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FeatureHero({ source }: {
    source: any
}) {

    const param = useParams()

    const text = [
        "web",
        "apps"
    ]
    const [renderText, setRenderText] = useState(true)
    const [currentPointer, setCurrentPointer] = useState(0)
    const fullPath = process.env.NEXT_PUBLIC_API_URL + source.photo_profile.data.attributes.formats.medium.url
    const imgBlurUrl = source.photo_profile.data.attributes.placeholder

    useEffect(() => {
        const interval = setInterval(() => {
            setRenderText(false)
            setCurrentPointer((item) => item + 1)
        }, 3000);

        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setRenderText(true)
        }, 500);
        currentPointer == text.length && setCurrentPointer(0)
    }, [currentPointer])

    function downloadResume() {
        const link = document.createElement('a')
        link.href = source.resume.link
        link.target = "_blank"
        link.download = "Resume - Choirul Affan Adi Putra.pdf"
        link.click();
    }

    return (
        <section className="container mx-auto px-6 md:px-16">
            <div className="w-full flex md:items-center h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)]">
                <div className="flex flex-col-reverse md:flex-row justify-end pt-[8vh] md:pt-0 md:justify-around w-full md:space-x-8">
                    <div className="flex flex-col justify-center md:px-8 font-poppins">
                        <div className="text-3xl md:text-4xl lg:text-5xl flex flex-col space-y-2 font-poppins-bold max-w-2xl">
                            <div>{param.locale == "id" ? "Hallo" : "Hi"} 👋 </div>
                            <div>{param.locale == "id" ? "Nama saya" : "My name is"}</div>
                            <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                {source.name}
                            </h2>
                            <div className="flex space-x-2 md:space-x-4 whitespace-nowrap max-w-xl">
                                <span>
                                    {param.locale == "id" ? "Saya bisa membuat" : "I build things for"}
                                </span>
                                <span className="w-36">
                                    <AnimatePresence>
                                        {
                                            renderText && (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.5
                                                    }}
                                                    animate={{
                                                        opacity: 1
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                    }}
                                                >
                                                    <span key="modal" className={`text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary`}>
                                                        {text[currentPointer]}
                                                    </span>
                                                </motion.div>
                                            )
                                        }
                                    </AnimatePresence>
                                </span>
                            </div>
                            <div className="py-8">
                                <ButtonSolid click={downloadResume} text="Download Resume" className="w-full drop-shadow-lg bg-gradient-to-r transition-all py-4 from-primary to-secondary lg:w-1/2 text-sm" />
                            </div>
                        </div>
                    </div>
                    <div className="p-4 flex justify-center lg:p-16">
                        <Image src={fullPath} priority placeholder="blur" blurDataURL={imgBlurUrl} alt="Choirul Affan Adi Putra" width={600} height={600} className="border-8 border-x-primary aspect-square rounded-full max-w-none w-[16rem] md:w-[20rem] xl:w-[25rem] object-contain" />
                    </div>
                </div>
            </div>
        </section>
    )
}