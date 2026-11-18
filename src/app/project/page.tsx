import LogAnalytics from "@/components/analytics/log";
import FeatureBackgroundUnion from "@/features/FeatureBackgroundUnion";
import FeatureFilterProject from "@/features/FeatureFilterProject";
import FeatureProjectListSection from "@/features/FeatureProjectListSection";
import FeatureSmallBusinessSection from "@/features/FeatureSmallBusinessSection";
import useCategoryProject from "@/hooks/useCategoryProject";
import useProjectPage from "@/hooks/useProjectPage";
import useProjects from "@/hooks/useProjects";

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
    const data = await useProjectPage();

    return {
        title: data?.metadata?.title || "Project - Siti Huwaena",
        description: data?.metadata?.meta_description || "Welcome to my personal portfolio website.",
        openGraph: {
            title: data?.metadata?.title || "Project - Siti Huwaena",
            description: data?.metadata?.meta_description || "Welcome to my personal portfolio website.",
            images: data?.metadata?.meta_image ? [data.metadata.meta_image.url] : [],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: data?.metadata?.title || "Project - Siti Huwaena",
            description: data?.metadata?.meta_description || "Welcome to my personal portfolio website.",
            images: data?.metadata?.meta_image ? [data.metadata.meta_image.url] : [],
        },
    }
}

export default async function ProjectsPage() {

    const categoriesProject = await useCategoryProject();
    const smallBusinessProjects = await useProjects({
        params: {
            "filters[small_business][$eq]": true,
            "sort": "endDate:desc",
            "pagination[pageSize]": 100,
        }
    });

    return (
        <section className="min-h-screen bg-background pt-16 relative overflow-hidden">
            <LogAnalytics eventName="page_view" eventParams={{ page: "project" }} />
            <FeatureBackgroundUnion className="top-[15vh]" />
            <div className="pt-8 pb-16 md:py-24 min-h-screen bg-background/90 backdrop-blur-xl relative">
                <div className="container mx-auto px-6 md:px-16">
                    <div className='pb-8 md:pb-12 md:text-center'>
                        <div className="mb-3 flex items-center gap-2 md:justify-center">
                            <span className="relative flex h-4 w-7">
                                <span className="absolute left-0 h-4 w-4 rounded-full bg-primary" />
                                <span className="absolute left-3 h-4 w-4 rounded-full bg-accent" />
                            </span>
                            <span className="font-dm-sans-medium text-sm text-texting">Portfolio</span>
                        </div>
                        <h2 className="font-dm-sans-extra-bold text-3xl md:text-5xl text-primary mb-3 md:mb-4">
                            My <span className="text-accent">Projects</span>
                        </h2>
                        <p className='text-texting md:text-center md:mx-auto text-base md:text-lg md:max-w-xl leading-relaxed'>
                            A curated selection of my projects, highlighting my skills, creativity, and dedication to delivering impactful solutions.
                        </p>
                    </div>
                    <FeatureFilterProject source={categoriesProject} />
                    <FeatureProjectListSection />
                    <FeatureSmallBusinessSection source={smallBusinessProjects} />
                </div>
            </div>
        </section>
    );
}
