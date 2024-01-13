"use client"

import ItemEducation from "@/components/Item/Education";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getEducations } from "@/stores/slices/educationSlice";
import { useEffect } from "react";

export default function FeatureEducation() {
    const educations = useAppSelector(state => state.education)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(getEducations())
    }, [])

    return (
        <div className="space-y-2 md:space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold">
                Education
            </h2>
            <div className="space-y-4">
                {
                    educations.source.length > 0 && educations.source.map((item, i) => (
                        <ItemEducation
                            key={i}
                            department={item?.attributes.major}
                            typeEducation={item?.attributes.type}
                            university={item?.attributes.school}
                            startDate={item?.attributes.from}
                            endDate={item?.attributes.to}
                        />
                    ))
                }
            </div>
        </div>
    )
}