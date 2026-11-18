"use client";

import { motion } from "motion/react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { FlipWords } from "@/components/ui/flip-word";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export function FeatureHeroProjectSection() {
    const words = ["Web Developer", "Mobile Developer"];

    return (
        <div className="h-[75vh] relative overflow-hidden w-full flex items-center justify-center bg-background-blue">
            <Image src={"/assets/image/background/union-project.svg"} className="bottom-0 right-0 h-[80dvh] absolute" alt="bg" fill />
            <div className="container mx-auto md:px-8 px-16 relative h-full">
                <div className="h-full relative flex flex-col justify-center">
                    <div className="flex flex-col space-y-16 items-start">
                        <h2 className="font-dm-sans-extra-bold text-7xl text-solid">
                            Project
                        </h2>
                        <p className="max-w-lg text-solid leading-loose text-lg">
                            A selection of projects I've worked on, showcasing my skills in frontend, backend, and full-stack development.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}