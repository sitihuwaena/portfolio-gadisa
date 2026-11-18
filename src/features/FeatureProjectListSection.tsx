"use client"

import { ProjectCard, ProjectCardPlaceholder } from "@/components/card/ProjectCard";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setParams } from "@/store/slice/portofolioSlice";

export default function FeatureProjectListSection() {

    const dispatch = useAppDispatch();
    const portofolio = useAppSelector((state) => state.portofolio)

    const handleLoadMore = () => {
        dispatch(setParams({
            "pagination[page]": portofolio.meta.pagination.page + 1
        }))
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {!portofolio.loading && portofolio.source.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
                {
                    portofolio.loading && Array.from({ length: 6 }).map((_, index) => (
                        <ProjectCardPlaceholder key={index} />
                    ))
                }
            </div>
            {
                (portofolio.meta.pagination.pageCount > portofolio.meta.pagination.page) && (!portofolio.loading || !portofolio.loadingMore) && (
                    <div className="w-full flex justify-center mt-14">
                        <Button
                            disabled={portofolio.loading || portofolio.loadingMore}
                            className="h-11 px-8 font-dm-sans-bold text-primary-foreground rounded-full bg-primary hover:bg-accent"
                            onClick={handleLoadMore}
                        >
                            Load More
                        </Button>
                    </div>
                )
            }
        </>
    )
}