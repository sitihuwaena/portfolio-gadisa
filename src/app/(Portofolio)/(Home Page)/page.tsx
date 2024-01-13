import { baseURL } from "@/constant/baseUrl";
import FeatureHero from "@/features/FeatureHero";
import FeatureProject from "@/features/FeatureProject";
import FeatureTechStack from "@/features/FeatureTechStack";
import useHomePage from "@/hooks/useHomePage";
import { Metadata } from "next";
import Head from "next/head";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await useHomePage()
  const images = data.attributes.meta.meta_image.data.attributes.formats

  const newImages = Object.values(images).map((item: any) => {
    return {
      url: baseURL + item.url,
      width: item.width,
      height: item.height
    }
  })

  return {
    title: data.attributes.meta.title,
    description: data.attributes.meta.meta_description,
    twitter: {
      title: data.attributes.meta.title,
      description: data.attributes.meta.meta_description,
      images: baseURL + images.small.url
    },
    openGraph: {
      title: data.attributes.meta.title,
      description: data.attributes.meta.meta_description,
      images: newImages
    }
  }
}

export default async function Home() {
  const { data } = await useHomePage()

  return (
    <>
      <Head>
        <meta property="og:image" itemProp="image" content={baseURL + data.attributes.meta.meta_image.data.attributes.formats.thumbnail.url} />
        <meta property="og:image:width" content="256"/>
        <meta property="og:image:height" content="256"/>
      </Head>
      {
        data.attributes.blocks.map((item: any, i: any) => {
          if (item.__component == "section.hero") return <FeatureHero source={item} key={i} />
          if (item.__component == "section.tech-stack-section") return <FeatureTechStack source={item} key={i} />
          if (item.__component == "section.project-section") return <FeatureProject source={item} key={i} />
        })
      }
    </>
  )
}
