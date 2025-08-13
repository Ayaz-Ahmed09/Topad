"use client";

import { Phone, MessageCircle, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // This container should be inside a relative parent container (like your layout)
    <div className="absolute bottom-24 right-8 flex flex-col gap-4 z-50">
      {/* Call button */}
      <a
        href="tel:+923328787123"
        className="w-14 h-14 bg-gradient-to-tr from-white/20 via-transparent to-black/30 rounded-full shadow-lg flex items-center justify-center text-orange hover:scale-110 transition-transform"
        aria-label="Call Us"
        onClick={() => track("Call Clicked")}
      >
        <Phone className="w-7 h-7" />
      </a>

      {/* WhatsApp Chat button */}
      <a
        href="https://wa.me/923328787123"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-gradient-to-tr from-white/20 via-transparent to-black/30 rounded-full shadow-lg flex items-center justify-center text-orange hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
        onClick={() => track("WhatsApp Chat Clicked")}
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-14 h-14 bg-gradient-to-tr from-white/20 via-transparent to-black/30 rounded-full shadow-lg flex items-center justify-center text-orange hover:scale-110 transition-transform"
          aria-label="Scroll to Top"
          type="button"
        >
          <ArrowUp className="w-7 h-7" />
        </button>
      )}
    </div>
  );
}
