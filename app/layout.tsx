import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { AdSenseScript } from "@/components/AdSenseScript";
import CookieConsent from "@/components/CookieConsent";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "500", "600", "700", "400", "900"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Top AD Runner | Premium Digital Marketing & Web Development",
    template: "%s | Top AD Runner",
  },
  description:
    "Top AD Runner - Elite digital marketing agency specializing in Google Ads management, premium web development, Shopify stores, and conversion optimization. Transform your business with our proven strategies.",
  keywords:
    "premium digital marketing, Google Ads management, web development, Shopify development, conversion optimization, PPC advertising, search engine marketing, e-commerce development, responsive web design, Google Ads expert, Facebook Ads, digital advertising, online marketing agency",
  authors: [{ name: "Top AD Runner" }],
  creator: "Top AD Runner",
  publisher: "Top AD Runner",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://topad.site",
    siteName: "Top AD Runner",
    title: "Top AD Runner | Premium Digital Marketing & Web Development",
    description:
      "Elite digital marketing agency specializing in Google Ads management and premium web development services.",
    images: [
      {
        url: "https://topad.site/og-image.png",
        width: 1200,
        height: 630,
        alt: "Top AD Runner -  Digital Marketing",
      },
    ],
  },

  generator: "NextJs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable} ${playfair.variable} `}
    >
      <head>
        <meta name="google-adsense-account" content="ca-pub-1241486495309147" />
        <meta name="google-site-verification" content="your-verification-code" />
        
        <Script
          {`src=https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1241486495309147`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <AdSenseScript />
        <GoogleAnalytics />
      </head>
      <body
        className={`${inter.variable} antialiased min-h-screen bg-theme-gradient backdrop-brightness-75  text-foreground`}
      >
        <div className="flex flex-col min-h-screen relative">
          <SEOOptimization />
          <BotProtection />
          <Suspense
            fallback={
              <div className="h-20 bg-white/80 backdrop-blur-xl shadow-sm animate-pulse"></div>
            }
          >
            <Header />
            <main className=" relative pt-24  ">
              {children}
              <Analytics />
              <Footer />
              {/* <FloatingButtons /> */}
            </main>
          </Suspense>
        </div>
        <CookieConsent />
      </body>
    </html>
  );
}
