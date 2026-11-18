import LogAnalytics from "@/components/analytics/log";
import FeatureBackgroundUnion from "@/features/FeatureBackgroundUnion";
import FeatureEducationSection from "@/features/FeatureEducationSection";
import FeatureOrganizationSection from "@/features/FeatureOrganizationSection";
import FeatureSectionTimeline from "@/features/FeatureSectionTimeline";
import useAboutPage from "@/hooks/useAboutPage";
import useEducation from "@/hooks/useEducation";
import useExperience from "@/hooks/useExperience";
import useOrganization from "@/hooks/useOrganization";

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
    const data = await useAboutPage();

    return {
        title: data?.metadata?.title || "About - Siti Huwaena",
        description: data?.metadata?.meta_description || "Welcome to my personal portfolio website.",
        openGraph: {
            title: data?.metadata?.title || "About - Siti Huwaena",
            description: data?.metadata?.meta_description || "Welcome to my personal portfolio website.",
            images: data?.metadata?.meta_image ? [data.metadata.meta_image.url] : [],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: data?.metadata?.title || "About - Siti Huwaena",
            description: data?.metadata?.meta_description || "Welcome to my personal portfolio website.",
            images: data?.metadata?.meta_image ? [data.metadata.meta_image.url] : [],
        },
    }
}

export default async function AboutPage() {

    const experiences = await useExperience()
    const educations = await useEducation();
    const organizations = await useOrganization();

    return (
        <div className="min-h-screen bg-gray-50 pt-16 relative">
            <LogAnalytics eventName="page_view" eventParams={{ page: "about" }} />
            <FeatureBackgroundUnion className="top-[15vh]" />
            <FeatureSectionTimeline source={experiences} />
            <FeatureEducationSection source={educations} />
            <FeatureOrganizationSection source={organizations} />
        </div>
    );
}
