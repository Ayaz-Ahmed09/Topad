import { 
  Trophy, 
  Shield, 
  Users, 
  Clock, 
  Target, 
  Award,
  CheckCircle,
  Star,
  Zap,
  Crown
} from "lucide-react";
import Link from "next/link";
import { DisplayAd } from "./AdSenseComponents";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Trophy,
      title: "Proven Track Record",
      description: "Over 500 successful projects delivered with measurable results. Our portfolio speaks for itself with documented ROI improvements averaging 300% for our clients.",
      stats: "500+ Projects"
    },
    {
      icon: Shield,
      title: "Transparent Reporting",
      description: "Complete transparency with real-time dashboards, detailed analytics, and weekly performance reports. You'll always know exactly how your campaigns are performing.",
      stats: "100% Transparency"
    },
    {
      icon: Users,
      title: "Dedicated Team",
      description: "Your success is managed by a dedicated team of certified Google Ads specialists, web developers, and digital strategists who understand your business goals.",
      stats: "Dedicated Support"
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Round-the-clock campaign monitoring ensures optimal performance. Our automated systems and expert oversight prevent budget waste and maximize opportunities.",
      stats: "24/7 Active"
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Advanced audience segmentation and behavioral targeting ensure your ads reach the right people at the right time, maximizing conversion potential.",
      stats: "Laser-Focused"
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Google Premier Partner status and multiple industry awards validate our expertise and commitment to delivering exceptional results for our clients.",
      stats: "Award-Winning"
    }
  ];

  const guarantees = [
    "30-day money-back guarantee on all services",
    "No long-term contracts - month-to-month flexibility",
    "Free initial strategy consultation and audit",
    "Dedicated account manager for personalized service",
    "Weekly performance reports with actionable insights",
    "ROI improvement guarantee or we work for free"
  ];

  return (
    <section className="py-20 bg-theme-gradient relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center schema-card ring-1 ring-white/80 rounded-full px-6 py-3 mb-8">
            <Crown className="mr-2 text-orange-500" size={20} />
            <span className="text-white font-semibold">Why Choose TopAd Digital</span>
            <Star className="ml-2 text-orange-400" size={16} />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white/80 mb-8">
            The TopAd <span className="text-warm">Advantage</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/60 max-w-4xl mx-auto leading-relaxed">
            When you partner with TopAd Digital, you're not just hiring a service provider – 
            you're gaining a strategic partner committed to your long-term success and growth.
          </p>
        </div>

        {/* Main Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <div key={index} className="schema-card rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <reason.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-accent-readable mb-4">
                {reason.title}
              </h3>
              <p className="text-readable leading-relaxed mb-4">
                {reason.description}
              </p>
              <div className="text-orange-400 font-bold text-lg">
                {reason.stats}
              </div>
            </div>
          ))}
        </div>

        <DisplayAd className="mb-16" />

        {/* Guarantees Section */}
        <div className="schema-card rounded-3xl p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white/80 mb-6">
              Our Iron-Clad Guarantees
            </h3>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              We stand behind our work with comprehensive guarantees that protect your investment 
              and ensure your complete satisfaction with our services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="flex items-center space-x-4">
                <CheckCircle className="text-orange-500 flex-shrink-0" size={24} />
                <span className="text-readable font-medium text-lg">
                  {guarantee}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="schema-card rounded-3xl p-12 mb-16">
          <h3 className="text-3xl font-display font-bold text-white/80 text-center mb-12">
            Real Results from Real Clients
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="small-card text-center p-6">
              <div className="text-4xl font-bold text-orange-500 mb-2">750%</div>
              <div className="text-white font-medium">ROI Increase</div>
              <div className="text-gray-300 text-sm mt-2">E-commerce Client</div>
            </div>
            <div className="small-card text-center p-6">
              <div className="text-4xl font-bold text-orange-500 mb-2">$2M+</div>
              <div className="text-white font-medium">Ad Spend Managed</div>
              <div className="text-gray-300 text-sm mt-2">Across All Clients</div>
            </div>
            <div className="small-card text-center p-6">
              <div className="text-4xl font-bold text-orange-500 mb-2">98%</div>
              <div className="text-white font-medium">Client Retention</div>
              <div className="text-gray-300 text-sm mt-2">Long-term Partnerships</div>
            </div>
          </div>
        </div>

        {/* Process Excellence */}
        <div className="schema-card rounded-3xl p-12">
          <h3 className="text-3xl font-display font-bold text-white/80 text-center mb-12">
            Our Proven Process
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Strategic Analysis",
                description: "Comprehensive audit of your current digital presence and competitive landscape analysis."
              },
              {
                step: "02", 
                title: "Custom Strategy",
                description: "Tailored strategy development based on your specific goals, budget, and target audience."
              },
              {
                step: "03",
                title: "Expert Implementation", 
                description: "Professional execution by certified specialists using industry best practices and cutting-edge tools."
              },
              {
                step: "04",
                title: "Continuous Optimization",
                description: "Ongoing monitoring, testing, and refinement to ensure maximum performance and ROI."
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{process.step}</span>
                </div>
                <h4 className="text-lg font-bold text-accent-readable mb-3">
                  {process.title}
                </h4>
                <p className="text-readable text-sm leading-relaxed">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-display font-bold text-white/80 mb-6">
            Ready to Experience the TopAd Advantage?
          </h3>
          <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful businesses that have transformed their digital presence with our expert services.
          </p>
          <Link
            href="https://wa.me/923096194974?text=Hi! I want to experience the TopAd advantage. Let's discuss my project."
            target="_blank"
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
          >
            <Zap size={24} />
            <span>Start Your Transformation</span>
          </Link>
        </div>
      </div>
    </section>
  );
}