import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import QuoteGenerator from "@/components/QuoteGenerator";
import BlogPreview from "@/components/BlogPreview";
import TrustSection from "@/components/TrustSection";
import PerformanceComparison from "@/components/PerformanceComparison";
import Counter from "@/components/Counter";
import FoundersSection from "@/components/FoundersSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import { DisplayAd } from "@/components/AdSenseComponents";
import AdSenseScript from '@/components/AdSenseScript'
export const metadata: Metadata = {
  title: "Top AD Runner | Google Ads Expert & Web Development Services",
  description:
    "Transform your business with Top AD Runner's expert Google Ads management, web development, Shopify stores, and conversion-focused strategies. Proven results that drive ROI.",
  openGraph: {
    title: "Top AD Runner | Google Ads Expert & Web Development Services",
    description:
      "Transform your business with expert Google Ads management, web development, Shopify stores, and conversion-focused strategies.",
    url: "https://topad.site",
  },
};

export default function HomePage() {
  return (
    <main>
      <title>topad</title>
      <AdSenseScript/>
      <Hero />
      <Services />
      <TrustSection />
      <DisplayAd />
      <Counter />
      <WhyChooseUs />
      <PerformanceComparison />
      <DisplayAd />
      <QuoteGenerator />
      <Testimonials />
      <DisplayAd />
      <FoundersSection />
      <BlogPreview />
    </main>
  );
}
