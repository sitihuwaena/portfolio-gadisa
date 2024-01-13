import { Providers } from '@/stores/provider'
import './globals.css'
import './font.css'
import type { Metadata } from 'next'
import { baseURL } from '@/constant/baseUrl'
import { myName } from '@/constant/myName'
import { urlSite } from '@/constant/urlSite'

export const metadata: Metadata = {
  metadataBase: new URL(baseURL),
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: {
    name: myName,
    url: urlSite
  },
  creator: myName,
  publisher: myName
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
