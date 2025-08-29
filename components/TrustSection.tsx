import { Shield, Award, Users, Clock, CheckCircle, Star } from "lucide-react";
import Link from "next/link";

export default function TrustSection() {
  const trustFactors = [
    {
      icon: Shield,
      title: "100% Transparent Reporting",
      description:
        "Real-time access to all campaign data and performance metrics. No hidden fees, no surprises.",
    },
    {
      icon: Award,
      title: "Google Premier Partner",
      description:
        "Certified Google Ads experts with proven track record of managing $2M+ in ad spend successfully.",
    },
    {
      icon: Users,
      title: "200+ Happy Clients",
      description:
        "From startups to enterprises, we've helped businesses across industries achieve explosive growth.",
    },
    {
      icon: Clock,
      title: "24/7 Support & Monitoring",
      description:
        "Round-the-clock campaign monitoring and instant support via WhatsApp for urgent optimizations.",
    },
  ];

  const guarantees = [
    "30-day money-back guarantee",
    "No long-term contracts required",
    "Free campaign audit included",
    "Dedicated account manager",
    "Weekly performance reports",
    "ROI improvement guarantee",
  ];

  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%22100%22 height%3D%22100%22 viewBox%3D%220 0 100 100%22 xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cpath d%3D%22M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.79 3-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c1.657 0 3-1.79 3-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z%22 fill%3D%22%23000%22 fillOpacity%3D%220.1%22 fillRule%3D%22evenodd%22/%3E%3C/svg%3E')]"></div>
      </div> */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center schema-card text-white ring-1 ring-white/80 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="mr-2 text-orange-500" size={26} />
            Trusted by 200+ Businesses
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white/80 mb-6">
            Why Top AD Runner is Your
            <span className="text-warm">Trusted Partner</span>
          </h2>
          <p className="text-xl text-white/30 font-sans max-w-3xl mx-auto">
            We don't just run ads - we build lasting partnerships based on
            transparency, results, and unwavering commitment to your success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustFactors.map((factor, index) => (
            <div key={index} className="text-center font-sans group">
              <div className="schema-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-gradient-to-br from-black-600 to-orange-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <factor.icon className="text-white" size={30} />
                </div>
                <h3 className="text-lg font-bold font-display text-white/80 mb-3">
                  {factor.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {factor.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="schema-card rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white font-display mb-6">
                Our Iron-Clad Guarantees
              </h3>
              <p className="text-white/80 mb-8 font-sans text-lg">
                We're so confident in our ability to deliver results that we
                back every project with these guarantees. Your success is our
                success, and we're committed to proving it.
              </p>

              <div className="grid gap-4">
                {guarantees.map((guarantee, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle
                      className="text-orange-500 bg-black rounded-full mr-3 flex-shrink-0"
                      size={20}
                    />
                    <span className="text-white/80 font-sans font-medium">
                      {guarantee}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-black-600 to-orange-600 bg-noise rounded-2xl p-8 text-white text-center">
              <div className="text-6xl font-bold mb-4">500%</div>
              <div className="text-display font- font-semibold mb-2">
                Average ROI Increase
              </div>
              <div className="text-blue-100 mb-6">
                Our clients typically see 5x return on their advertising
                investment within the first 90 days.
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-xl font-sans p-4 mb-6">
                <div className="text-2xl font-bold">$2,000,000+</div>
                <div className="text-sm text-blue-100">
                  Total Ad Spend Managed
                </div>
              </div>

              <Link
                href="https://wa.me/923096194974?text=Hi! I want to see case studies of your 500% ROI results"
                target="_blank"
                className="inline-block bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-500 hover:text-black transition-colors"
              >
                See Case Studies
              </Link>
            </div>
          </div>
        </div>

        {/* <Link
          href="https://wa.me/923096194974?text=Hi! I'm ready to experience the Top AD Runner difference. Let's start with a free consultation."
          target="_blank"
          className="place-self-center bg-gradient-to-r mt-4 place-items-center from-orange-500 to-black-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-black-600 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg"
        >
          🚀 Start Your Success Story
        </Link> */}
      </div>
    </section>
  );
}
