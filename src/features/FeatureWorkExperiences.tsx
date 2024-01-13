"use client"

import ItemWorkExperiences from "@/components/Item/WorkExperiences"
import { useAppDispatch, useAppSelector } from "@/stores/hooks"
import { getExperiences } from "@/stores/slices/experienceSlice"
import { useEffect } from "react"

export default function FeatureWorkExperiences() {
    const experiences = useAppSelector(state => state.experience)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(getExperiences())
    }, [])

    return (
        <div className="space-y-2 md:space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold">
                Work Experience
            </h2>
            <div className="space-y-4">
                {
                    experiences.source.length > 0 && experiences.source.map((item, i) => (
                        <ItemWorkExperiences
                            key={i}
                            title={item.attributes.title}
                            company={item.attributes.company}
                            startDate={item.attributes.from}
                            endDate={item.attributes.to}
                            location={item.attributes.location}
                            typeWorking={item.attributes.type}
                            responsibilities={item.attributes.responsibilities}
                        />
                    ))
                }
            </div>
        </div>
    )
}