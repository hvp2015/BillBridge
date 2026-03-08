"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const NAV_SECTIONS = [
  { label: "Features", id: "features" },
  { label: "Benefits", id: "benefits" },
  { label: "Who It's For", id: "for-who" },
];

const LandingHeader = ({ openBookDemo }: { openBookDemo: () => void }) => {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const hero = document.getElementById("hero-section");
    if (!hero) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setScrolledPastHero(!entry.isIntersecting);
      },
      { root: null, threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Scroll to section by id
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle nav click from any page
  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (pathname !== "/") {
      router.push("/#" + id);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <header
      className={`border-b border-border/50 sticky top-0 z-50 backdrop-blur-sm transition-colors duration-300
        ${scrolledPastHero ? "bg-primary text-primary-foreground" : "bg-background text-foreground"}
      `}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-3">
            <img 
              src="/images/logo.png" 
              alt="Bill Bridge Logo" 
              className="h-8 w-8"
            />
            <span className="text-xl font-bold">Bill Bridge</span>
          </Link>
        </div>
        {/* Desktop nav */}
        <nav className="hidden md:flex ml-auto items-center space-x-8">
          {NAV_SECTIONS.map((section) => (
            <button
              key={section.id}
              className={`transition-colors bg-transparent border-0 outline-none cursor-pointer ${scrolledPastHero ? "text-primary-foreground hover:text-white" : "text-muted-foreground hover:text-primary"}`}
              onClick={() => handleNavClick(section.id)}
            >
              {section.label}
            </button>
          ))}
          <Button
            size="sm"
            className={`ml-8 transition-colors ${scrolledPastHero ? "bg-white text-primary hover:bg-white/90 border border-white shadow-none" : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft"}`}
            onClick={openBookDemo}
          >
            Book a Demo
          </Button>
        </nav>
        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Open menu"
        >
          <Menu className="h-7 w-7" />
        </button>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t border-border/50 px-4 py-4 space-y-4 transition-all duration-300 ${scrolledPastHero ? "bg-primary text-primary-foreground" : "bg-background text-foreground"}`}> 
          {NAV_SECTIONS.map((section) => (
            <button
              key={section.id}
              className="block py-2 text-lg w-full text-left transition-colors bg-transparent border-0 outline-none cursor-pointer"
              onClick={() => handleNavClick(section.id)}
            >
              {section.label}
            </button>
          ))}
          <Button
            size="lg"
            className="w-full mt-2"
            onClick={() => { setMobileMenuOpen(false); openBookDemo(); }}
          >
            Book a Demo
          </Button>
        </div>
      )}
    </header>
  );
};

export default LandingHeader;