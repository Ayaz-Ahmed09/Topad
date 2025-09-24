import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Ad Evaluator Tool - Free Ad Analysis | TopAd Digital",
  description: "Get professional-grade ad analysis with our advanced evaluation tool. Analyze creativity, platform fit, audience alignment, and conversion potential. Free daily evaluations available.",
  keywords: "ad evaluator, ad analysis tool, advertising analysis, ad performance, creative evaluation, platform optimization, audience targeting, conversion optimization",
  openGraph: {
    title: "Professional Ad Evaluator Tool - Free Ad Analysis",
    description: "Analyze your ads like a pro with our advanced evaluation engine. Get detailed insights and recommendations.",
    url: "https://topad.site/tools/ad-evaluator",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AdEvaluatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}