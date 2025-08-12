import Link from "next/link";
import { ArrowRight, Star, Zap, Crown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center  pt-20">
      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Premium Badge */}
          <div className="inline-flex items-center schema-card ring-1 ring-white/80 rounded-full px-6 py-3 mb-8">
            <Crown className="mr-2 text-accent-600" size={20} />
            <span className="text-white font-semibold">
              Premium Digital Marketing Agency
            </span>
            <Star className="ml-2 text-accent-500" size={16} />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl text-white/80 md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-tight ">
            Elevate Your Business with{" "}
            <span className="text-warm block mt-2">Elite Marketing</span>
          </h1>

          {/* Subheading */}
          <p
            className="text-xl md:text-2xl lg:text-3xl mb-12 text-white/25 max-w-5xl mx-auto leading-relaxed  "
            style={{ animationDelay: "0.2s" }}
          >
            Top AD Runner delivers exceptional ROI through masterful Google Ads
            management, luxury web development, and premium Shopify solutions
            that transform visitors into loyal customers.
          </p>

          {/* Elegant Stats */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="schema-card rounded-3xl p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="text-4xl text-ice md:text-5xl font-display font-bold text-gradient mb-2">
                750%
              </div>
              <div className="text-white font-medium">Average ROI Increase</div>
            </div>
            <div className="schema-card rounded-3xl p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="text-4xl text-ice md:text-5xl font-display font-bold text-gradient mb-2">
                $2M+
              </div>
              <div className="text-white font-medium">Ad Spend Managed</div>
            </div>
            <div className="schema-card rounded-3xl p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="text-4xl text-ice md:text-5xl font-display font-bold text-gradient mb-2">
                500+
              </div>
              <div className="text-white font-medium">
                Successful development projects
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center "
            style={{ animationDelay: "0.6s" }}
          >
            <Link
              href="https://wa.me/92328787123?text=Hi TopAD Team! I want to elevate my business with elite marketing. Let's discuss my project."
              target="_blank"
              className="bg-gradient-to-br from-transparent via-white/20 to-transparent group hover:bg-gradient-to-tr hover:from-white/20 hover:via-transparent hover:to-white/30  p-4 rounded-lg flex items-center space-x-3 text-lg"
            >
              <Zap
                className="group-hover:rotate-12 text-white/80 transition-transform"
                size={24}
              />
              <span className="text-ice font-inter">
                Start Your Transformation
              </span>
              <ArrowRight
                className="ml-2 group-hover:translate-x-4 opacity-20 group-hover:opacity-100 group-hover:transition-shadow text-white/80 transition-transform"
                size={20}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
