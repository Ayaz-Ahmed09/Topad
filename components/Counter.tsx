"use client";

import { useEffect, useRef, useState } from "react";

interface CounterCardProps {
  title: string;
  value: number;
  suffix?: string;
}

function CounterCard({ title, value, suffix = "" }: CounterCardProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(value / (duration / 16));

    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        start = value;
        clearInterval(timer);
      }
      setCount(start);
    }, 16);

    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <div
      ref={ref}
      className="bg-white/10 backdrop-blur-md font-display border border-white/20 rounded-2xl p-6 text-center shadow-lg hover:scale-105 transition-transform duration-300"
    >
      <div className="text-4xl font-bold text-orange-500">
        {count}
        {suffix}
      </div>
      <p className="mt-2 text-lg text-white">{title}</p>
    </div>
  );
}

export default function CounterSection() {
  return (
    <section className="py-20  font-display text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center lg:text-5xl text-3xl md:text-4xl font-bold mb-12 text-warm">
          Our Achievements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 schema-card lg:grid-cols-4 gap-8">
          <CounterCard title="Projects Delivered" value={120} suffix="" />
          <CounterCard title="Happy Clients" value={95} suffix="+" />
          <CounterCard title="SEO Campaigns" value={60} suffix="+" />
          <CounterCard title="Years Experience" value={8} />
        </div>
      </div>
    </section>
  );
}
