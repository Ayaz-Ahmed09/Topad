import Link from "next/link";
import {
  Search,
  Code,
  ShoppingCart,
  TrendingUp,
  Megaphone,
  Palette,
  Crown,
  Sparkles,
  Layers,
  BarChart2,
  Target,
  ClipboardCheck,
  UsersIcon as Users,
  Smartphone,
} from "lucide-react";
import ServiceCard from "./ServiceCard";

export default function Services() {
  const services = [
    {
      icon: Search,
      title: "Google Ads Mastery",
      description:
        "Elite PPC campaigns with advanced targeting, AI-powered optimization, and premium conversion tracking for maximum ROI.",
      features: [
        "Premium Campaign Setup",
        "AI-Powered Optimization",
        "Advanced Analytics",
        "24/7 Monitoring",
      ],
      link: "https://wa.me/3096194974?text=Hi! I'm interested in Google Ads Mastery services",
      pattern: "pattern-golden-diagonal",
    },
    {
      icon: Code,
      title: "Luxury Web Development",
      description:
        "Bespoke websites crafted with cutting-edge technology, elegant design, and superior performance.",
      features: [
        "Custom Design",
        "Premium Performance",
        "Mobile Excellence",
        "SEO Mastery",
      ],
      link: "https://wa.me/3096194974?text=Hi! I need luxury web development",
      pattern: "pattern-geometric-mesh",
    },
    {
      icon: ShoppingCart,
      title: "Premium Shopify Stores",
      description:
        "High-end e-commerce solutions with luxury design, advanced functionality, and conversion optimization.",
      features: [
        "Luxury Themes",
        "Advanced Features",
        "Payment Excellence",
        "Conversion Focus",
      ],
      link: "https://wa.me/3096194974?text=Hi! I want a premium Shopify store",
      pattern: "pattern-wave-lines",
    },
    {
      icon: Palette,
      title: "Elite Landing Pages",
      description:
        "Conversion-focused landing pages with premium design, A/B testing, and psychological triggers.",
      features: [
        "Premium Design",
        "Conversion Psychology",
        "A/B Testing",
        "Mobile Perfection",
      ],
      link: "https://wa.me/3096194974?text=Hi! I need elite landing pages",
      pattern: "pattern-dotted-grain",
    },
    {
      icon: TrendingUp,
      title: "Strategic Funnel Design",
      description:
        "Sophisticated sales funnels with advanced automation, personalization, and revenue optimization.",
      features: [
        "Strategic Planning",
        "Advanced Automation",
        "Revenue Focus",
        "Performance Analytics",
      ],
      link: "https://wa.me/3096194974?text=Hi! I want strategic funnel design",
      pattern: "pattern-crosshatch",
    },
    {
      icon: Megaphone,
      title: "WordPress Development & optimization",
      description:
        "Enterprise-grade WordPress solutions with custom functionality, security, and performance optimization.",
      features: [
        "Enterprise Features",
        "Security Excellence",
        "Performance Optimization",
        "Custom Solutions",
      ],
      link: "https://wa.me/3096194974?text=Hi! I need premium WordPress development",
      pattern: "pattern-hexagons",
    },
    {
      icon: Layers,
      title: "Custom Web Applications",
      description:
        "Tailor-made web apps built with modern frameworks, optimized for scalability, security, and seamless user experience.",
      features: [
        "Scalable Architecture",
        "Custom Functionality",
        "API Integrations",
        "Advanced Security",
      ],
      link: "https://wa.me/3096194974?text=Hi! I need a custom web application",
      pattern: "pattern-marble-veins",
    },
    {
      icon: Smartphone,
      title: "Cross-Platform & Framework Solutions",
      description:
        "High-performance cross-platform applications using modern frameworks, delivering native-like experiences on all devices.",
      features: [
        "Single Codebase Efficiency",
        "Native-Like UX",
        "Framework Flexibility",
        "App Store + Web Ready",
      ],
      link: "https://wa.me/3096194974?text=Hi! I want cross-platform framework solutions",
      pattern: "pattern-dust-particles",
    },
    {
      icon: BarChart2,
      title: "SEO Excellence",
      description:
        "Premium SEO strategies for top rankings, organic traffic growth, and authority building.",
      features: [
        "On-Page Optimization",
        "Backlink Strategy",
        "Technical SEO",
        "Keyword Domination",
      ],
      link: "https://wa.me/923096194974?text=Hi! I need SEO services",
      pattern: "pattern-geometric-mesh",
    },
    {
      icon: Target,
      title: "Strategic Ads & Media Buying",
      description:
        "Cross-channel paid ads strategy with precision targeting, media attribution, and budget optimization.",
      features: [
        "Cross-Channel Campaigns",
        "Smart Targeting",
        "Attribution Modeling",
        "Budget Optimization",
      ],
      link: "https://wa.me/3096194974?text=Hi! I want strategic ads services",
      pattern: "pattern-wave-lines",
    },
    {
      icon: ClipboardCheck,
      title: "Website Audit & Performance Check",
      description:
        "In-depth website audits covering SEO, UX, speed, and security to reveal growth opportunities.",
      features: [
        "SEO Health Check",
        "Performance Scoring",
        "Security Review",
        "Actionable Recommendations",
      ],
      link: "https://wa.me/923096194974?text=Hi! I need a website audit",
      pattern: "pattern-dust-particles",
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-50/10 to-transparent"></div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-transparent ring-1 ring-white/80 rounded-full px-6 py-3 mb-8">
            <Crown className="mr-2 text-accent-600" size={20} />
            <span className="text-white font-semibold">Premium Services</span>
            <Sparkles className="ml-2 text-accent-500" size={16} />
          </div>

          <h2 className="text-4xl md:text-6xl font-display font-bold text-white/80 mb-8">
            Our Elite <span className="text-warm">Services</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/50 max-w-4xl mx-auto leading-relaxed">
            From Google Ads mastery to luxury web development, we provide
            comprehensive solutions that drive exceptional business growth and
            measurable results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        <div className="text-center">
          <div className="schema-card rounded-3xl p-12 max-w-4xl mx-auto">
            <Crown className="mx-auto mb-6 text-accent-500" size={48} />
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white/80">
              Ready to Join the Elite?
            </h3>
            <p className="text-xl text-white/50 mb-8 leading-relaxed">
              Experience the difference of working with a premium agency. Get a
              complimentary strategy consultation and discover your growth
              potential.
            </p>
            <Link
              href="https://wa.me/923096164674?text=Hi! I want to join the elite with a premium consultation"
              target="_blank"
              className="btn-accent inline-flex items-center space-x-3 text-lg"
            >
              <Crown size={24} />
              <span>Get Premium Consultation</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
