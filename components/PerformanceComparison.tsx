"use client";

import { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  Users,
  Target,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";
import Link from "next/link";

export default function PerformanceComparison() {
  const [activeTab, setActiveTab] = useState("roi");

  const roiData = [
    {
      platform: "Google Ads",
      roi: 520,
      cost: 1000,
      revenue: 5200,
      color: "#3B82F6",
    },
    {
      platform: "Meta Ads",
      roi: 380,
      cost: 1000,
      revenue: 3800,
      color: "#8B5CF6",
    },
    {
      platform: "TikTok Ads",
      roi: 290,
      cost: 1000,
      revenue: 2900,
      color: "#EF4444",
    },
    {
      platform: "LinkedIn Ads",
      roi: 240,
      cost: 1000,
      revenue: 2400,
      color: "#10B981",
    },
  ];

  const conversionData = [
    { platform: "Google Ads", rate: 8.5, leads: 850, color: "#3B82F6" },
    { platform: "Meta Ads", rate: 4.2, leads: 420, color: "#8B5CF6" },
    { platform: "TikTok Ads", rate: 3.1, leads: 310, color: "#EF4444" },
    { platform: "LinkedIn Ads", rate: 2.8, leads: 280, color: "#10B981" },
  ];

  const costData = [
    { platform: "Google Ads", cpc: 2.5, cpl: 12.5, color: "#3B82F6" },
    { platform: "Meta Ads", cpc: 1.8, cpl: 18.2, color: "#8B5CF6" },
    { platform: "TikTok Ads", cpc: 1.2, cpl: 22.8, color: "#EF4444" },
    { platform: "LinkedIn Ads", cpc: 4.5, cpl: 35.7, color: "#10B981" },
  ];

  const insights = [
    {
      title: "Google Ads Dominance",
      description:
        "Google Ads consistently delivers 37% higher ROI than the next best platform",
      icon: TrendingUp,
      stat: "+37%",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Cost Efficiency",
      description:
        "Despite higher CPC, Google Ads provides the lowest cost per lead at $12.50",
      icon: DollarSign,
      stat: "$12.50",
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "Quality Traffic",
      description:
        "Google Ads users show 2x higher purchase intent compared to social platforms",
      icon: Users,
      stat: "2x",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "Conversion Rate",
      description:
        "Google Ads achieves 8.5% conversion rate vs 3.5% average across other platforms",
      icon: Target,
      stat: "8.5%",
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case "roi":
        return roiData;
      case "conversion":
        return conversionData;
      case "cost":
        return costData;
      default:
        return roiData;
    }
  };

  const getDataKey = () => {
    switch (activeTab) {
      case "roi":
        return "roi";
      case "conversion":
        return "rate";
      case "cost":
        return "cpc";
      default:
        return "roi";
    }
  };

  const getChartTitle = () => {
    switch (activeTab) {
      case "roi":
        return "Return on Investment (%)";
      case "conversion":
        return "Conversion Rates (%)";
      case "cost":
        return "Cost Per Click ($)";
      default:
        return "Return on Investment (%)";
    }
  };

  const currentData = getCurrentData();
  const dataKey = getDataKey();
  const maxValue = Math.max(
    ...currentData.map((item) => Number(item[dataKey as keyof typeof item]))
  );

  return (
    <section className="py-16 md:py-24  relative overflow-hidden">
      {/* Background Elements */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex font-sans items-center schema-card backdrop-blur-sm ring-1 ring-white/80 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
            <BarChart3 className="mr-2 text-orange-500" size={16} />
            Real Performance Data
          </div>
          <h2 className="text-3xl sm:text-4xl font-display md:text-5xl lg:text-6xl font-bold text-white/80 mb-6 leading-tight">
            Platform Performance
            <span className="block text-transparent font-display text-warm">
              Analysis
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/50 max-w-5xl mx-auto leading-relaxed">
            Real data from our $2M+ ad spend across platforms. See why Google
            Ads consistently outperforms other advertising channels for our
            clients.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col schema-card sm:flex-row justify-center mb-12 md:mb-16  rounded-3xl p-2 max-w-3xl mx-auto shadow-xl ring ring-orange-500/20">
          {[
            { key: "roi", label: "ROI Comparison", icon: TrendingUp },
            { key: "conversion", label: "Conversion Rates", icon: Target },
            { key: "cost", label: "Cost Analysis", icon: DollarSign },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex items-center justify-center px-4 sm:px-4 py-3 sm:py-4 rounded-2xl font-medium transition-all duration-300 text-sm sm:text-base ${
                activeTab === key
                  ? "bg-gradient-to-r from-orange-500 via-transparent to-transparent text-white "
                  : "text-white/20 hover:text-orange-500 hover:bg-black/30 hover:shadow-lg"
              }`}
            >
              <Icon className="mr-2" size={20} />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{key.toUpperCase()}</span>
            </button>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-5 gap-6 md:gap-8 mb-12 md:mb-20 group-hover:ring-0 group-hover:ring-orange-500">
          {/* Bar Chart */}
          <div className="lg:col-span-3">
            <div className="schema-card  rounded-3xl shadow-2xl p-6 md:p-8  h-full">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {getChartTitle()}
                </h3>
                <Activity className="text-teal-1100" size={24} />
              </div>

              <div className="space-y-6">
                {currentData.map((item, index) => {
                  const value = Number(item[dataKey as keyof typeof item]);
                  const percentage = (value / maxValue) * 100;

                  return (
                    <div key={index} className="group">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-4 h-4 rounded-full shadow-lg"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="font-semibold text-white text-sm md:text-base">
                            {item.platform}
                          </span>
                        </div>
                        <span className="font-bold text-white text-lg md:text-xl">
                          {activeTab === "cost" ? `$${value}` : `${value}%`}
                        </span>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-gray-200/10 backdrop-blur-lg rounded-full h-4 md:h-6 shadow-inner">
                          <div
                            className="h-4 md:h-6 rounded-full transition-all duration-1000 ease-out shadow-lg group-hover:shadow-xl"
                            style={{
                              width: `${percentage}%`,
                              background: `linear-gradient(90deg, ${item.color}, ${item.color}dd)`,
                            }}
                          ></div>
                        </div>
                        <div
                          className="absolute top-1/2 transform -translate-y-1/2 text-white text-xs font-bold px-2"
                          style={{ left: `${Math.max(percentage - 15, 5)}%` }}
                        >
                          {activeTab === "cost" ? `$${value}` : `${value}%`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="lg:col-span-2">
            <div className="schema-card backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 group-hover:ring-1 group-hover:ring-white/80 h-full">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-white/80 font-sans">
                  Market Share
                </h3>
                <PieChart className="text-teal-500" size={24} />
              </div>

              {/* Custom Pie Chart */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mx-auto mb-8">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full transform text-white -rotate-90"
                >
                  <defs>
                    <filter
                      id="shadow"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feDropShadow
                        dx="2"
                        dy="2"
                        stdDeviation="3"
                        floodOpacity="0.5"
                      />
                    </filter>
                  </defs>

                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="25"
                  />

                  {/* Google Ads - 45% */}
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="25"
                    strokeDasharray={`${45 * 4.4} ${(100 - 45) * 4.4}`}
                    strokeDashoffset="0"
                    filter="url(#shadow)"
                    className="hover:stroke-blue-500 transition-colors duration-300"
                  />

                  {/* Meta Ads - 25% */}
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="25"
                    strokeDasharray={`${25 * 4.4} ${(100 - 25) * 4.4}`}
                    strokeDashoffset={`-${45 * 4.4}`}
                    filter="url(#shadow)"
                    className="hover:stroke-purple-500 transition-colors duration-300"
                  />

                  {/* TikTok Ads - 20% */}
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="25"
                    strokeDasharray={`${20 * 4.4} ${(100 - 20) * 4.4}`}
                    strokeDashoffset={`-${(45 + 25) * 4.4}`}
                    filter="url(#shadow)"
                    className="hover:stroke-red-500 transition-colors duration-300"
                  />

                  {/* LinkedIn Ads - 10% */}
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="25"
                    strokeDasharray={`${10 * 4.4} ${(100 - 10) * 4.4}`}
                    strokeDashoffset={`-${(45 + 25 + 20) * 4.4}`}
                    filter="url(#shadow)"
                    className="hover:stroke-green-500 transition-colors duration-300"
                  />
                </svg>

                {/* Center Label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white/80 font-sans ">
                      100%
                    </div>
                    <div className="text-xs md:text-sm text-gray-400">
                      Coverage
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Google Ads", value: 45, color: "#3B82F6" },
                  { name: "Meta Ads", value: 25, color: "#8B5CF6" },
                  { name: "TikTok Ads", value: 20, color: "#EF4444" },
                  { name: "LinkedIn Ads", value: 10, color: "#10B981" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 small-card rounded-xl hover:shadow-2xl transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full shadow-sm"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-xs md:text-sm text-gray-300 font-medium">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-sm md:text-base font-bold text-gray-500">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-20">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="group small-card backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`bg-gradient-to-r ${insight.gradient} w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <insight.icon className="text-white" size={24} />
                </div>
                <span className="text-2xl md:text-3xl font-bold text-white/80">
                  {insight.stat}
                </span>
              </div>
              <h4 className="font-bold text-white/80 mb-3 text-lg md:text-xl">
                {insight.title}
              </h4>
              <p className="text-white/50 text-sm md:text-base leading-relaxed">
                {insight.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {/* <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl md:rounded-[2rem] p-8 md:p-12 lg:p-16 text-center text-white shadow-2xl border border-blue-500/20">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Ready to Dominate Google Ads?
            </h3>
            <p className="text-blue-100 mb-8 md:mb-10 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              Our data speaks for itself. Let us replicate these results for
              your business with our proven Google Ads strategies and expert
              campaign management.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="https://wa.me/1234567890?text=Hi! I want to dominate Google Ads like your case studies show. Let's discuss my campaign."
                target="_blank"
                className="group bg-white text-blue-600 px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl text-lg flex items-center"
              >
                🚀 Get My Google Ads Strategy
                <TrendingUp
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </Link>

              <Link
                href="/contact"
                className="group border-2 border-white/30 text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center text-lg"
              >
                📊 View More Case Studies
                <BarChart3
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
