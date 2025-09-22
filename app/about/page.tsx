import type { Metadata } from "next";
import Image from "next/image";
import {
  Trophy,
  Users,
  Target,
  Rocket,
  Award,
  Star,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { DisplayAd } from "@/components/AdSenseComponents";

export const metadata: Metadata = {
  title: "About TopAd - Digital Marketing Experts & Web Development Leaders",
  description:
    "Meet the founders and team behind TopAd - Ayaz Ahmad and Nazim Abbas. Discover our journey from startup to industry leader in digital marketing and web development.",
  openGraph: {
    title: "About TopAd - Digital Marketing & Web Development Agency",
    description:
      "Meet our founders and learn about TopAd's mission to transform businesses through innovative digital solutions.",
    url: "https://topad.site/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-theme-gradient min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold font-display text-heading-readable leading-tight mb-6">
              About TopAd Digital
            </h1>
            <p className="text-xl md:text-2xl text-readable max-w-4xl mx-auto">
              Transforming businesses through innovative digital solutions,
              creative excellence, and data-driven strategies since 2019.
            </p>
          </div>

          {/* Company Story */}
          <div className="schema-card mb-16">
            <h2 className="text-3xl font-bold text-heading-readable mb-6">
              Our Journey
            </h2>
            <p className="text-readable text-lg leading-relaxed mb-4">
              TopAd Digital began as a bold vision shared by two passionate
              entrepreneurs who recognized the growing need for comprehensive
              digital solutions. What started as a small venture has evolved
              into a full-service digital agency that empowers businesses to
              thrive in the digital landscape.
            </p>
            <p className="text-readable text-lg leading-relaxed mb-4">
              Our commitment to excellence and innovation has established us as
              a trusted partner for businesses ranging from startups to
              established enterprises. We've built our reputation on delivering
              measurable results, fostering long-term partnerships, and staying
              ahead of digital trends.
            </p>
            <p className="text-readable text-lg leading-relaxed">
              Today, TopAd Digital stands as a comprehensive solution provider,
              offering everything from cutting-edge web development and
              strategic digital marketing to creative graphic design and
              professional video production.
            </p>
          </div>

          {/* Founders Section */}
          <DisplayAd />
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-heading-readable text-center mb-12">
              Meet Our Founders
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Founder 1 */}
              <div className="schema-card text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">AA</span>
                </div>
                <h3 className="text-2xl font-bold text-accent-readable mb-2">
                  Ayaz Ahmad
                </h3>
                <p className="text-orange-300 font-semibold mb-4">
                  Founder & Lead Web Developer
                </p>
                <p className="text-readable leading-relaxed mb-4">
                  With over 8 years of experience in web development and
                  technical architecture, Ayaz brings deep expertise in modern
                  web technologies and scalable solutions. His vision for TopAd
                  focuses on creating digital experiences that not only look
                  exceptional but perform flawlessly.
                </p>
                <p className="text-readable leading-relaxed">
                  Ayaz's technical leadership has been instrumental in
                  developing our proprietary development frameworks and ensuring
                  every project meets the highest standards of quality and
                  performance.
                </p>
              </div>

              {/* Founder 2 */}
              <div className="schema-card text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-teal-600 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">NA</span>
                </div>
                <h3 className="text-2xl font-bold text-accent-readable mb-2">
                  Nazim Abbas
                </h3>
                <p className="text-orange-300 font-semibold mb-4">
                  Co-Founder & Digital Marketing Strategist
                </p>
                <p className="text-readable leading-relaxed mb-4">
                  Nazim brings 7+ years of digital marketing expertise,
                  specializing in data-driven strategies that deliver
                  exceptional ROI. His deep understanding of consumer behavior
                  and market dynamics has helped hundreds of businesses achieve
                  breakthrough growth.
                </p>
                <p className="text-readable leading-relaxed">
                  Under Nazim's strategic guidance, TopAd has developed
                  innovative marketing methodologies that consistently
                  outperform industry benchmarks and drive sustainable business
                  growth.
                </p>
              </div>
            </div>
          </div>

          {/* Vision & Mission */}
          <DisplayAd />
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="schema-card">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-orange-400 mr-3" />
                <h3 className="text-2xl font-bold text-accent-readable">
                  Our Vision
                </h3>
              </div>
              <p className="text-readable leading-relaxed">
                To become the leading digital transformation partner that
                empowers businesses to achieve unprecedented growth through
                innovative technology solutions, creative excellence, and
                strategic marketing insights. We envision a future where every
                business, regardless of size, can leverage world-class digital
                capabilities to compete and win in their markets.
              </p>
            </div>

            <div className="schema-card">
              <div className="flex items-center mb-6">
                <Rocket className="w-8 h-8 text-orange-400 mr-3" />
                <h3 className="text-2xl font-bold text-accent-readable">
                  Our Mission
                </h3>
              </div>
              <p className="text-readable leading-relaxed">
                To deliver comprehensive digital solutions that combine
                technical excellence with creative innovation, ensuring our
                clients achieve measurable results and sustainable growth. We
                are committed to transparency, continuous learning, and building
                long-term partnerships that drive mutual success.
              </p>
            </div>
          </div>

          {/* Services Overview */}
          <div className="schema-card mb-16">
            <h2 className="text-3xl font-bold text-heading-readable text-center mb-12">
              Comprehensive Digital Solutions
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="small-card text-center">
                <h4 className="font-semibold text-accent-readable mb-2">
                  Web Development
                </h4>
                <p className="text-readable text-sm">
                  Custom websites, e-commerce platforms, and web applications
                  built with modern technologies
                </p>
              </div>
              <div className="small-card text-center">
                <h4 className="font-semibold text-accent-readable mb-2">
                  Digital Marketing
                </h4>
                <p className="text-readable text-sm">
                  Strategic campaigns, SEO optimization, and performance
                  marketing that drives results
                </p>
              </div>
              <div className="small-card text-center">
                <h4 className="font-semibold text-accent-readable mb-2">
                  Graphic Design
                </h4>
                <p className="text-readable text-sm">
                  Brand identity, marketing materials, and visual content that
                  captivates audiences
                </p>
              </div>
              <div className="small-card text-center">
                <h4 className="font-semibold text-accent-readable mb-2">
                  Video Production
                </h4>
                <p className="text-readable text-sm">
                  Professional video content, editing, and post-production for
                  all digital platforms
                </p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="schema-card mb-16">
            <div className="flex items-center justify-center mb-8">
              <Trophy className="w-10 h-10 text-orange-400 mr-4" />
              <h2 className="text-3xl font-bold text-heading-readable">
                Our Achievements
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="small-card text-center">
                <TrendingUp className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-accent-readable mb-2">
                  500+
                </h4>
                <p className="text-readable">Successful Projects Delivered</p>
              </div>

              <div className="small-card text-center">
                <Users className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-accent-readable mb-2">
                  200+
                </h4>
                <p className="text-readable">Satisfied Clients Worldwide</p>
              </div>

              <div className="small-card text-center">
                <Award className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-accent-readable mb-2">
                  98%
                </h4>
                <p className="text-readable">Client Retention Rate</p>
              </div>

              <div className="small-card text-center">
                <Star className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-accent-readable mb-2">
                  4.9/5
                </h4>
                <p className="text-readable">Average Client Rating</p>
              </div>

              <div className="small-card text-center">
                <CheckCircle className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-accent-readable mb-2">
                  24/7
                </h4>
                <p className="text-readable">Dedicated Support</p>
              </div>

              <div className="small-card text-center">
                <Target className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-accent-readable mb-2">
                  150%
                </h4>
                <p className="text-readable">Average ROI Improvement</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-accent-readable mb-4">
                  Industry Recognition
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-readable">
                      Top Digital Agency Award 2023 - Regional Excellence
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-readable">
                      Best Web Development Portfolio - Industry Summit 2023
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-readable">
                      Google Premier Partner Status - Marketing Excellence
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-readable">
                      Client Choice Award 2022 & 2023 - Outstanding Service
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-accent-readable mb-4">
                  Performance Milestones
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-readable">
                      Generated $10M+ in client revenue through our campaigns
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-readable">
                      Improved average website performance by 300%
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-readable">
                      Reduced client acquisition costs by average of 45%
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-readable">
                      Achieved 99.9% project delivery success rate
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Team Authors */}
          <div className="schema-card mb-16">
            <h2 className="text-3xl font-bold text-heading-readable text-center mb-12">
              Our Content Team
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="small-card text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">SM</span>
                </div>
                <h4 className="font-bold text-accent-readable mb-1">
                  Sarah Mitchell
                </h4>
                <p className="text-orange-300 text-sm mb-2">
                  Senior Content Strategist
                </p>
                <p className="text-readable text-xs">
                  Specializes in digital marketing insights and industry trends
                  analysis
                </p>
              </div>

              <div className="small-card text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">MR</span>
                </div>
                <h4 className="font-bold text-accent-readable mb-1">
                  Michael Rodriguez
                </h4>
                <p className="text-orange-300 text-sm mb-2">
                  Technical Content Writer
                </p>
                <p className="text-readable text-xs">
                  Expert in web development tutorials and technology guides
                </p>
              </div>

              <div className="small-card text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">EC</span>
                </div>
                <h4 className="font-bold text-accent-readable mb-1">
                  Emma Chen
                </h4>
                <p className="text-orange-300 text-sm mb-2">
                  Creative Content Lead
                </p>
                <p className="text-readable text-xs">
                  Focuses on design trends and creative industry insights
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center schema-card">
            <h2 className="text-3xl font-bold text-heading-readable mb-6">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-readable text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of successful businesses that have partnered with
              TopAd Digital to achieve their growth objectives. Let's discuss
              how we can help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105">
                Start Your Project
              </button>
              <button className="border-2 border-orange-500 text-accent-readable px-8 py-3 rounded-lg font-semibold hover:bg-orange-500/10 transition-all duration-300">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
