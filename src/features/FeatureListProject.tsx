"use client"

import CardProject from "@/components/Card/Project"
import { useAppDispatch, useAppSelector } from "@/stores/hooks"
import { getProjects } from "@/stores/slices/projectSlice"
import { useRouter } from 'next-nprogress-bar';
import { useEffect } from "react"

export default function FeatureListProject() {
    const projects = useAppSelector(state => state.project)
    const dispatch = useAppDispatch()
    const router = useRouter()

    function handleDetailProject(link?: string) {
        router.push("/project/" + link)
    }

    useEffect(() => {
        dispatch(getProjects())
    }, [])

    return (
        <div className="w-full flex justify-center">
            <div className="w-full grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {
                    projects.source.map((item, i) => (
                        <CardProject
                            skills={item.attributes.skills.data}
                            click={() => handleDetailProject(item.attributes.slug)}
                            title={item.attributes.title}
                            subtitle={item.attributes.subtitle}
                            thumbnail={item.attributes.thumbnail.data.attributes}
                            previewCode={item.attributes.view_code}
                            livePreview={item.attributes.live_preview}
                            key={i} />
                    ))
                }
            </div>
        </div>
    )

}