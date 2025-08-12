"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  company: string;
  content: string;
  rating: number;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Simulate fetching testimonials from a third-party service
    const fetchTestimonials = async () => {
      // In a real app, this would be an API call
      const mockTestimonials: Testimonial[] = [
        {
          id: 1,
          name: "Sarah Johnson",
          company: "TechStart Inc.",
          content:
            "Their Google Ads management increased our leads by 300% in just 3 months. Incredible results!",
          rating: 5,
        },
        {
          id: 2,
          name: "Mike Chen",
          company: "E-commerce Plus",
          content:
            "The Shopify store they built for us is beautiful and converts amazingly well. Highly recommended!",
          rating: 5,
        },
        {
          id: 3,
          name: "Lisa Rodriguez",
          company: "Local Services Co.",
          content:
            "Professional team that delivered exactly what we needed. Our website traffic doubled!",
          rating: 5,
        },
      ];
      setTestimonials(mockTestimonials);
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl display-font font-bold text-white/80 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-white/60">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="schema-card rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="text-iconic fill-current" size={22} />
              ))}
            </div>
            <blockquote className="text-xl text-white/80 mb-6 italic">
              "{currentTestimonial.content}"
            </blockquote>
            <div>
              <div className="font-semibold text-real">
                {currentTestimonial.name}
              </div>
              <div className="text-warm">{currentTestimonial.company}</div>
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-teal-1100" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
