"use client"

import { baseURL } from "@/constant/baseUrl"
import { useAppDispatch, useAppSelector } from "@/stores/hooks"
import { getSkills } from "@/stores/slices/skillSlice"
import Image from "next/image"
import { useEffect } from "react"

export default function FeatureSkill() {
    const skills = useAppSelector(state => state.skill)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getSkills())
    }, [])

    return (
        <div className="w-full flex justify-center">
            <div className="w-full justify-items-center grid gap-12 md:gap-12 grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
                {
                    skills.source.length > 0 && skills.source.map((item, i) => (
                        <div key={i} className="w-16 h-16 md:w-28 md:h-28">
                            <Image width={64} height={64} src={baseURL + item.attributes.source.data.attributes.url} className="w-full h-full object-contain" alt={item.attributes.source.data.attributes.name} />
                            <div className="w-full text-center text-sm md:text-base font-poppins text-gray-500 font-semibold">
                                {item.attributes.title}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}