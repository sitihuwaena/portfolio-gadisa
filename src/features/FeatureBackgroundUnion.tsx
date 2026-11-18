"use client";

import Image from "next/image";

export default function FeatureBackgroundUnion({ className }: { className?: string }) {
    return (
        <Image alt="bg" src={"/assets/image/background/union-project.svg"} className={`w-full absolute ${className}`} fill />
    );
}
