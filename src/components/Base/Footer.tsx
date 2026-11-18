"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-20 w-full bg-primary py-12 text-white">
            <div className="container mx-auto px-4 lg:px-16">
                <div className="space-y-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background">
                            <Image src="/assets/icons/logo.svg" alt="Siti Huwaena logo" width={20} height={20} className="h-5 w-5" />
                        </span>
                        <span className="font-dm-sans-semi-bold text-lg">Siti Huwaena</span>
                    </div>
                    <p className="font-dm-sans text-white/60">
                        I appreciate your time and interest in my work.
                    </p>

                    <div className="flex items-center justify-center space-x-3">
                        <Link href={"https://www.instagram.com/gadisamaulidiah/"} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent" target="_blank">
                            <Image src="/assets/icons/sosmed/instagram-logo.svg" alt="Instagram" className="h-5 w-5 brightness-0 invert" width={20} height={20} />
                        </Link>
                        <Link href={"https://www.linkedin.com/in/siti-huwaena/"} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent" target="_blank">
                            <Image src="/assets/icons/sosmed/linkedin-logo.svg" alt="LinkedIn" className="h-5 w-5 brightness-0 invert" width={20} height={20} />
                        </Link>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <p className="font-dm-sans text-sm text-white/45">
                        © {currentYear} Siti Huwaena. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
