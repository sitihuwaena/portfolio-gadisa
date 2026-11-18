import { ProjectCard } from "@/components/card/ProjectCard";
import { ProjectTypes } from "@/types/ProjectTypes";

export default function FeatureSmallBusinessSection({ source }: { source: ProjectTypes[] }) {
    if (!source?.length) return null

    return (
        <div className="mt-16 border-t border-border pt-16 md:mt-24 md:pt-24">
            <div className='pb-8 md:pb-12 md:text-center'>
                <div className="mb-3 flex items-center gap-2 md:justify-center">
                    <span className="relative flex h-4 w-7">
                        <span className="absolute left-0 h-4 w-4 rounded-full bg-primary" />
                        <span className="absolute left-3 h-4 w-4 rounded-full bg-accent" />
                    </span>
                    <span className="font-dm-sans-medium text-sm text-texting">After 9 to 5</span>
                </div>
                <h2 className="font-dm-sans-extra-bold text-3xl md:text-5xl text-primary mb-3 md:mb-4">
                    Small <span className="text-accent">Business</span>
                </h2>
                <p className='text-texting md:text-center md:mx-auto text-base md:text-lg md:max-w-xl leading-relaxed'>
                    Small business that I built to express my passion and fill my after 9 to 5.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {source.map((project) => (
                    <ProjectCard key={project.documentId || project.id} project={project} />
                ))}
            </div>
        </div>
    )
}
