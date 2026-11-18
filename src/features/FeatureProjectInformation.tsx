import FormatDate from "@/lib/date";
import { ProjectTypes } from "@/types/ProjectTypes";

export default function FeatureProjectInformation({ source }: { source: ProjectTypes }) {

    return (
        <div className="border border-border bg-background px-4 py-3 rounded-[0.65rem] md:rounded-[calc(1.5rem)]">
            <div className="grid grid-cols-2 gap-y-3 w-full h-full">
                <div className="flex flex-col col-span-2">
                    <div className="text-texting-muted font-dm-sans-semi-bold text-sm">Website</div>
                    {
                        source?.live_preview ? (
                            <a href={source.live_preview} className="text-accent font-dm-sans-extra-bold break-all hover:underline">
                                {source?.live_preview}
                                <svg className="inline-block ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        ) : (
                            <div className="text-primary font-dm-sans-extra-bold">Private Link</div>
                        )
                    }
                </div>
                <div className="flex flex-col col-span-1">
                    <div className="text-texting-muted font-dm-sans-semi-bold text-sm">Category</div>
                    <div className="text-primary font-dm-sans-extra-bold">{source?.categoryProjects?.[0]?.name ?? "-"}</div>
                </div>
                <div className="flex flex-col col-span-1">
                    <div className="text-texting-muted font-dm-sans-semi-bold text-sm">Type Project</div>
                    <div className="text-primary font-dm-sans-extra-bold">{source?.type}</div>
                </div>
                <div className="flex flex-col col-span-1">
                    <div className="text-texting-muted font-dm-sans-semi-bold text-sm">Complexity</div>
                    <div className="text-primary font-dm-sans-extra-bold">{source?.complexity}</div>
                </div>
                <div className="flex flex-col col-span-1">
                    <div className="text-texting-muted font-dm-sans-semi-bold text-sm">View Code</div>
                    {
                        source?.view_code ? (
                            <a href={source.view_code} className="text-accent font-dm-sans-extra-bold break-all hover:underline">
                                {source?.view_code}
                                <svg className="inline-block ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        ) : (
                            <div className="text-primary font-dm-sans-extra-bold">Private Link</div>
                        )
                    }
                </div>
                <div className="flex flex-col col-span-2">
                    <div className="text-texting-muted font-dm-sans-semi-bold text-sm">Timeline</div>
                    <div className="text-primary font-dm-sans-extra-bold">
                        {source?.startDate && FormatDate(source.startDate, false, true)} - {source?.endDate ? FormatDate(source.endDate, false, true) : "Present"}
                    </div>
                </div>
                <div className="flex flex-col col-span-2">
                    <div className="text-texting-muted font-dm-sans-semi-bold text-sm">Technologies</div>
                    <div className="flex items-center flex-wrap gap-2 pt-1">
                        {source?.skills?.map((tech, index) => (
                            <div key={index} className="text-secondary font-dm-sans-bold text-sm bg-secondary/10 px-3 py-0.5 rounded-full">
                                {tech.title}
                            </div>
                        )) ?? "-"}
                    </div>
                </div>
            </div>
        </div>
    )
}