import LogAnalytics from "@/components/analytics/log"
import FeatureContactSection from "@/features/FeatureContactSection";
import useReachMePage from "@/hooks/useReachMePage";

export async function generateMetadata() {
    const data = await useReachMePage();

    return {
        title: data?.metadata?.title || "Reach Me - Siti Huwaena",
        description: data?.metadata?.meta_description || "Welcome to my personal portfolio website.",
        openGraph: {
            title: data?.metadata?.title || "Reach Me - Siti Huwaena",
            description: data?.metadata?.meta_description || "Welcome to my personal portfolio website.",
            images: data?.metadata?.meta_image ? [data.metadata.meta_image.url] : [],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: data?.metadata?.title || "Reach Me - Siti Huwaena",
            description: data?.metadata?.meta_description || "Welcome to my personal portfolio website.",
            images: data?.metadata?.meta_image ? [data.metadata.meta_image.url] : [],
        },
    }
}

export default function ReachMePage() {
    return (
        <div className="relative overflow-hidden w-full pt-14 flex items-center justify-center bg-white">
            <LogAnalytics eventName="page_view" eventParams={{ page: "reach_me" }} />
            <div className="container mx-auto px-2 md:px-16 py-8 md:py-16 relative h-full">
                <FeatureContactSection />
            </div>
        </div>
    );
}
