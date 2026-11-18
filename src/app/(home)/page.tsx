import FeatureAboutMeSection from "@/features/FeatureAboutMeSection";
import { FeatureHeroSection } from "@/features/FeatureHeroSection";
import FeatureServicesSection from "@/features/FeatureServicesSection";
import FeatureSkillsMarqueeSection from "@/features/FeatureSkillsMarqueeSection";
import FeaturePortfolioSection from "@/features/FeaturePortfolioSection";
import useProjects from "@/hooks/useProjects";
import useHomePage from "@/hooks/useHomePage";
import useIdeas from "@/hooks/useIdeas";

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const home = await useHomePage();

  return {
    title: home?.metadata?.title || "Home - Siti Huwaena",
    description: home?.metadata?.meta_description || "Welcome to my personal portfolio website.",
    openGraph: {
      title: home?.metadata?.title || "Home - Siti Huwaena",
      description: home?.metadata?.meta_description || "Welcome to my personal portfolio website.",
      images: home?.metadata?.meta_image ? [home.metadata.meta_image.url] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: home?.metadata?.title || "Home - Siti Huwaena",
      description: home?.metadata?.meta_description || "Welcome to my personal portfolio website.",
      images: home?.metadata?.meta_image ? [home.metadata.meta_image.url] : [],
    },
  }
}


export default async function Home() {

  const home = await useHomePage();
  const ideas = await useIdeas();
  const projects = await useProjects({
    params: {
      "pagination[pageSize]": 3,
      "filters[featured][$eq]": true,
      "sort": "endDate:desc"
    }
  });

  return (
    <div className="w-full h-full">
      <FeatureHeroSection source={home} />
      <FeatureServicesSection source={ideas} />
      <FeatureAboutMeSection source={home} />
      <FeatureSkillsMarqueeSection />
      <FeaturePortfolioSection source={projects} />
    </div>
  );
}
