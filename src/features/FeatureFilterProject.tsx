"use client"

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getProjects, resetParams, setParams } from "@/store/slice/portofolioSlice";
import { CategoryProjectTypes } from "@/types/CategoryProjectTypes"
import { useEffect, useState } from "react";

const activeClass = "border-accent bg-accent text-accent-foreground"
const inactiveClass = "border-border bg-white text-primary hover:border-accent hover:text-accent"

export default function FeatureFilterProject({ source }: { source: CategoryProjectTypes[] }) {

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const dispatch = useAppDispatch()
    const portofolio = useAppSelector(state => state.portofolio)

    useEffect(() => {
        dispatch(getProjects())
    }, [portofolio.params])

    const handleChangeCategory = (id: number) => {
        if (portofolio.loading) return
        setSelectedCategory(id)
        dispatch(setParams({
            "filters[categoryProjects][$eq]": id,
            "pagination[page]": 1,
            "pagination[pageSize]": 9
        }))
    }

    const handleResetCategory = () => {
        setSelectedCategory(null)
        dispatch(resetParams())
    }

    return (
        <div className="w-full pb-8 select-none flex space-x-2 md:space-x-4 items-center md:justify-center overflow-x-auto scrollbar-none">
            <div className={`flex-shrink-0 border px-4 py-2 rounded-full cursor-pointer transition ${selectedCategory === null ? activeClass : inactiveClass}`} onClick={handleResetCategory}>
                <h3 className="font-dm-sans-semi-bold text-sm">All</h3>
            </div>
            {source.map((category, index) => (
                <div key={index} className={`flex-shrink-0 border px-4 py-2 rounded-full cursor-pointer transition ${selectedCategory === category.id ? activeClass : inactiveClass}`} onClick={() => handleChangeCategory(category.id)}>
                    <h3 className="font-dm-sans-semi-bold text-sm">{category.name}</h3>
                </div>
        ))}
        </div>
    )
}