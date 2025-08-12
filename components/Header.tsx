"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Crown, Sparkles } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "../public/logo.png";
import Image from "next/image";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-blend-color-burn backdrop-blur-xl shadow-2xl border-b border-white/20"
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Image
                src={Logo}
                alt="Logo"
                height={40}
                width={40}
                className="hover:animate-glow backdrop-grayscale bg-gradient-to-b from-white/50 to-black/50 rounded-full  p-1"
              />

              {/* <div className="absolute -top-1 -right-1">
                <Sparkles className="text-accent-400 animate-pulse" size={16} />
              </div> */}
            </div>
            <div>
              <span className="text-2xl font-display font-bold text-ice">
                Top AD
              </span>
              {/* <div className="text-xs text-primary-500 font-medium">
                Premium Agency
              </div> */}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-white/80 hover:text-accent-600 transition-all duration-300 font-medium text-lg group"
              >
                {item.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-500 to-rose-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
            ))}
            {/* <LanguageSelector />
            <DarkModeToggle /> */}
          </div>

          <div className="hidden lg:block f4">
            <Link
              href="https://wa.me/1234567890?text=Hi! I'm interested in your premium services"
              target="_blank"
              className="bg-gradient-to-r from-black/50 to-white/60 text-white px-6 py-3 rounded-2xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 font-semibold shadow-xl hover:shadow-2xl flex items-center space-x-2"
            >
              <span>💬</span>
              <span>Chat Now</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-xl bg-white backdrop-blur-sm shadow-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={24} className="text-black" />
            ) : (
              <Menu size={24} className="text-black" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-white/20 shadow-2xl">
            <div className="container-custom py-6">
              <div className="flex flex-col space-y-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-primary-700 hover:text-accent-600 transition-colors font-medium text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <LanguageSelector />
                <Link
                  href="https://wa.me/1234567890?text=Hi! I'm interested in your premium services"
                  target="_blank"
                  className="bg-gradient-to-r from-black/50 to-white/50 text-white px-6 py-3 rounded-2xl hover:from-emerald-600 hover:to-emerald-700 transition-all text-center font-semibold shadow-xl flex items-center justify-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>💬</span>
                  <span>Start Project</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
