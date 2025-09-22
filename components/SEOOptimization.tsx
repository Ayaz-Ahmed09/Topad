"use client";

import { useEffect } from "react";

export function SEOOptimization() {
  useEffect(() => {
    // Prevent content scraping
    const preventRightClick = (e: MouseEvent) => {
      e.preventDefault();
    };

    const preventKeyboardShortcuts = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.key === "u") ||
        (e.ctrlKey && e.key === "s")
      ) {
        e.preventDefault();
      }
    };

    // Add protection
    document.addEventListener("contextmenu", preventRightClick);
    document.addEventListener("keydown", preventKeyboardShortcuts);

    // Add structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "TopAd Digital",
      "url": "https://topad.site",
      "logo": "https://topad.site/logo.png",
      "description": "Premium digital marketing agency specializing in Google Ads management and web development",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Global"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+923096194974",
        "contactType": "customer service"
      }
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.removeEventListener("contextmenu", preventRightClick);
      document.removeEventListener("keydown", preventKeyboardShortcuts);
      document.head.removeChild(script);
    };
  }, []);

  return null;
}

// Anti-bot protection
export function BotProtection() {
  useEffect(() => {
    // Simple bot detection
    const userAgent = navigator.userAgent.toLowerCase();
    const botPatterns = [
      'bot', 'crawler', 'spider', 'scraper', 'wget', 'curl'
    ];
    
    const isBot = botPatterns.some(pattern => userAgent.includes(pattern));
    
    if (isBot) {
      // Redirect bots to a simple page
      window.location.href = '/robots.txt';
    }
  }, []);

  return null;
}