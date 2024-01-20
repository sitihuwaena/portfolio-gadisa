import { urlSite } from "@/constant/urlSite";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow:"/"
        },
        sitemap: urlSite + '/sitemap.xml'
    }
}