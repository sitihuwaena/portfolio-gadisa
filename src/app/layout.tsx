import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import Providers from "./provider";
import FeatureNavbar from "@/features/FeatureNavbar";
import Footer from "@/components/Base/Footer";
import FloatingHireMe from "@/components/Base/FloatingHireMe";


export const metadata: Metadata = {
  title: "Siti Huwaena",
  description: "A passionate developer with experience in building web applications and digital platforms.",
  openGraph: {
    title: "Siti Huwaena",
    description: "A passionate developer with experience in building web applications and digital platforms.",
    url: "https://gadisamaulidiah.my.id",
    siteName: "Siti Huwaena",
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-dm-sans antialiased`}>
        <Providers>
          <FeatureNavbar />
          {children}
        </Providers>
        <Footer />
        <FloatingHireMe />
      </body>
    </html>
  );
}
