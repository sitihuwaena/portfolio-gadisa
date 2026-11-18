import { notFound } from "next/navigation";
import LogAnalytics from "@/components/analytics/log";
import useSkills from "@/hooks/useSkills";
import FeatureBackgroundUnion from "@/features/FeatureBackgroundUnion";
import FeatureListSkillsSection from "@/features/FeatureListSkillsSection";
import useTechStackPage from "@/hooks/useTechStackPage";

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
    const data = await useTechStackPage();

    return {
        title: data?.metadata?.title || "Tech Stack - Siti Huwaena",
        description: data?.metadata?.meta_description || "Welcome to my personal portfolio website.",
        openGraph: {
            title: data?.metadata?.title || "Tech Stack - Siti Huwaena",
            description: data?.metadata?.meta_description || "Welcome to my personal portfolio website.",
            images: data?.metadata?.meta_image ? [data.metadata.meta_image.url] : [],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: data?.metadata?.title || "Tech Stack - Siti Huwaena",
            description: data?.metadata?.meta_description || "Welcome to my personal portfolio website.",
            images: data?.metadata?.meta_image ? [data.metadata.meta_image.url] : [],
        },
    }
}

export default async function TechStackPage() {
    // Tech Stack page hidden — remove this line to restore
    notFound();

    const skills = await useSkills();

    return (
        <div className="min-h-screen bg-gray-50 pt-16 relative overflow-hidden">
            <LogAnalytics eventName="page_view" eventParams={{ page: "tech-stack" }} />
            <FeatureBackgroundUnion className="top-[15vh]" />
            <FeatureListSkillsSection source={skills} />
        </div>
    );
}
