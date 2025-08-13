import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title:
    "About Us - Expert Digital Marketing Team & Experienced Web Developers",
  description:
    "Discover our journey as a trusted digital marketing and web development agency. Learn how our mission, expertise, and innovation help businesses grow online.",
  openGraph: {
    title: "About Us - Expert Digital Marketing Team",
    description:
      "Discover our journey as a trusted digital marketing and web development agency.",
    url: "https://topad.site/about",
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-display text-fire leading-tight mb-8 text-center">
          About Our Digital Marketing Agency
        </h1>

        <div className="prose prose-lg mx-auto mb-12">
          <p className="text-xl text-gray-200 leading-relaxed">
            Founded with a vision to bridge creativity and technology, our
            agency has grown from a small team of innovators into a trusted
            partner for brands worldwide. For over a decade, we’ve been helping
            businesses not only establish their digital presence but also
            dominate their industries through precision marketing, high-impact
            design, and cutting-edge web solutions.
          </p>
          <p className="text-xl text-gray-200 leading-relaxed">
            Today, we are proud to serve clients across diverse sectors —
            delivering measurable growth, boosting online visibility, and
            building digital strategies that last. Every project we take on is
            guided by our core values: innovation, transparency, and results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-4">
              We believe every business, regardless of size, deserves the power
              of a world-class online presence. Our mission is to provide
              tailored digital marketing and web development solutions that
              deliver tangible results and long-term growth.
            </p>
            <p className="text-gray-600">
              Whether crafting a bespoke website, optimizing a complex ad
              campaign, or engineering a high-converting sales funnel, we blend
              creative storytelling with data-driven decision-making — ensuring
              every investment you make with us works harder for your success.
            </p>
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden">
            <Image
              src="/OurCompanyView.jpg?height=400&width=600"
              alt="Our team collaborating on strategic marketing solutions"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Our Expertise
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Web Development
              </h3>
              <p className="text-gray-600">
                Custom, scalable websites built for speed, security, and
                conversion-focused performance.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Google Ads
              </h3>
              <p className="text-gray-600">
                Data-driven ad strategies that consistently deliver
                industry-leading ROI for our clients.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Funnel Strategy
              </h3>
              <p className="text-gray-600">
                Optimized sales funnels that guide your audience seamlessly from
                interest to conversion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
