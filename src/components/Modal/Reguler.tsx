"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import ButtonSolid from "../Button/Solid";
import { useEffect } from "react";

export default function ModalReguler({ children, disableSubmit = false, title, close, className, submit, buttonClose = false }: {
    children?: any,
    title?: string,
    close?: () => void,
    className?: string,
    submit?: Function,
    buttonClose?: boolean,
    disableSubmit?: boolean
}) {

    
    useEffect(() => {
        const handleEsc = (event: any) => {
            if (event.keyCode === 27) {
                close && close()
            }
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        }
    }, [])

    return (
        <div className="fixed z-20 m-auto inset-0 overflow-hidden h-full w-full flex justify-center items-center">
            <div className="absolute -z-10 w-full h-full backdrop-blur-lg" onClick={close} />
            <motion.div
                key="modal"
                initial={{
                    opacity: 0.2,
                    scale: 0
                }}
                transition={{
                    duration: 0.1
                }}
                animate={{
                    opacity: 1,
                    scale: 1
                }}
                exit={{
                    opacity: 0,
                    scale: 0
                }}
                className={`shadow-xl flex flex-col rounded-xl mx-4 md:mx-0 bg-white w-[90vh] max-w-[90vh] 2xl:w-[100vh] h-auto max-h-[95vh] overflow-hidden ${className}`}>
                <div className="flex items-center px-5 justify-between bg-gradient-to-r from-primary to-secondary w-full py-4">
                    <div className="text-white pl-2 text-lg font-semibold">
                        {title}
                    </div>
                    <div onClick={close} className="transition-all h-8 w-8 text-white hover:rounded-full hover:bg-transparent/20 cursor-pointer">
                        <Image alt="times" src={require("@/assets/icons/times-white.svg")} className="w-full h-full fill-white" />
                    </div>
                </div>
                <form onSubmit={(e) => (e.preventDefault(), submit && submit())}>
                    <div className="w-full max-h-[70vh] px-6 pt-6 pb-2 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-info scrollbar-track-secondary">
                        {children}
                    </div>
                </form>
                <div className={`w-full flex justify-center ${buttonClose ? "sm:justify-end" : "" } p-2.5 space-x-2`}>
                    <div className={`w-full justify-center flex px-4 ${buttonClose ? "sm:justify-end space-x-2" : ""}  pb-2`}>
                        {
                            buttonClose && (<ButtonSolid className="text-sm bg-danger text-white w-full sm:w-20" text="Close" click={close} />)
                        }
                        <ButtonSolid loading={disableSubmit} disable={disableSubmit} className="text-sm bg-info rounded-lg text-white w-full" text="Submit" click={() => (submit && submit())} />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}