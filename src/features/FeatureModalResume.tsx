"use client"

import InputText from "@/components/Input/text";
import ModalReguler from "@/components/Modal/Reguler";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getResume } from "@/stores/slices/resumeSlice";
import { useEffect, useState } from "react";

export default function FeatureModalResume({
    close
}: {
    close?: () => void
    submit?: () => void
}) {

    const dispatch = useAppDispatch()
    const [form, setForm] = useState<any>(null)
    const resume = useAppSelector((state) => state.resume)

    function handleChange(e: any) {
        setForm({
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit() {
        dispatch(getResume(form))
    }

    return (
        <ModalReguler disableSubmit={resume.loading} close={close} submit={handleSubmit} title="Download Resume">
            <div className="px-2">
                <p className="text-gray-500">Let me know who you are, please input your email to confirm you are not robot</p>
                <p className="text-sm text-secondary">The resume will be sent to your email automatically!</p>
            </div>
            <div className="px-1 space-y-2">
                <InputText change={handleChange} name="email" className="focus:border-secondary" placeholder="Eg: johndoe@gmail.com" />
                {
                    resume.error ? (
                        <p className="text-sm px-2 text-red-600">
                            {resume.message}
                        </p>
                    ) : (
                        <p className="text-sm px-2 text-green-600">
                            {resume.message}
                        </p>
                    )
                }
            </div>
        </ModalReguler>
    )
}