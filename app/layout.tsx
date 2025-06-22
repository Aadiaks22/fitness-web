import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BalancePro - Transform Your Life Through Fitness",
  description:
    "Transform your life through accessible, online fitness services that restore posture, manage weight, and alleviate pain. Expert-led personalized solutions for a healthier you.",
  keywords:
    "fitness, posture restoration, weight management, pain management, nutrition counseling, online fitness, personal training",
  authors: [{ name: "BalancePro" }],
  openGraph: {
    title: "BalancePro - Transform Your Life Through Fitness",
    description:
      "Transform your life through accessible, online fitness services that restore posture, manage weight, and alleviate pain.",
    url: "https://balancepro.com",
    siteName: "BalancePro",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BalancePro Fitness",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <meta name="google-site-verification" content="Y8kF_Zz7PySGhI6CNJ5Ra29pvjTH0cB61vXbAYcfIPE" />
        {/* Ahrefs Analytics Script */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="DJnS89hs9Gm2fBkcbyJULg"
          strategy="afterInteractive"
        />

        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-944SVSSWLQ" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-944SVSSWLQ');
          `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
