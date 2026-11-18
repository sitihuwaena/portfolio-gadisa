import LogAnalytics from "@/components/analytics/log";
import FeatureProjectDescription from "@/features/FeatureProjectDescription";
import FeatureProjectGallery from "@/features/FeatureProjectGallery";
import FeatureProjectHeroSection from "@/features/FeatureProjectHeroSection";
import FeatureProjectInformation from "@/features/FeatureProjectInformation";
import useProjects from "@/hooks/useProjects";
import getImage from "@/lib/getImage";
import { ProjectTypes } from "@/types/ProjectTypes";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const projectDetail = await useProjects({
        params: {
            "filters[slug][$eq]": slug
        }
    }) as ProjectTypes[]

    const detail = projectDetail[0];
    if (!detail) notFound();

    return {
        title: detail.metadata?.title || detail.title,
        description: detail.metadata?.meta_description || detail.subtitle,
        openGraph: {
            title: detail.metadata?.title || detail.title,
            description: detail.metadata?.meta_description || detail.subtitle,
            images: detail.metadata?.meta_image ? [getImage(detail.metadata.meta_image.url)] : [],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: detail.metadata?.title || detail.title,
            description: detail.metadata?.meta_description || detail.subtitle,
            images: detail.metadata?.meta_image ? [getImage(detail.metadata.meta_image.url)] : [],
        },
    }
}


export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;
    const projectDetail = await useProjects({
        params: {
            "filters[slug][$eq]": slug
        }
    }) as ProjectTypes[]

    const detail = projectDetail[0];
    if (!detail) notFound();

    return (
        <div className="min-h-screen pt-20 relative bg-background w-full">
            <LogAnalytics eventName="page_view" eventParams={{ page: "project_detail", slug }} />
            <FeatureProjectHeroSection source={detail} />
            <div className="container pb-16 mx-auto px-2 md:px-16">
                <FeatureProjectGallery images={detail.gallery} />
                <div className="grid grid-cols-12 gap-8 md:gap-12 border border-border bg-white p-2 md:p-5 rounded-[1rem] md:rounded-[2rem] shadow-md">
                    <div className="col-span-12 order-last lg:order-first lg:col-span-8">
                        <FeatureProjectDescription source={detail} />
                    </div>
                    <div className="col-span-12 order-first lg:order-last lg:col-span-4">
                        <FeatureProjectInformation source={detail} />
                    </div>
                </div>
            </div>
        </div>
    );
}
