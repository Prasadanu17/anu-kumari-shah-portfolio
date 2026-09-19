import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "HOME",       href: "#home",       id: "home"       },
  { label: "ABOUT",      href: "#about",      id: "about"      },
  { label: "EXPERIENCE", href: "#experience", id: "experience" },
  { label: "SKILLS",     href: "#skills",     id: "skills"     },
  { label: "PROJECTS",   href: "#projects",   id: "projects"   },
  { label: "CONTACT",    href: "#contact",    id: "contact"    },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to accurately track active section in viewport
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -40% 0px",
      threshold: 0.1,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Telemetry Status Bar */}
      <div className="bg-[#07080B]/90 border-b border-white/[0.05] hidden md:block">
        <div className="story-container py-1.5 flex items-center justify-between text-[10px] font-mono text-[#8E95A5]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-wider uppercase text-[#E4E4E7]">
              STATUS: OPEN TO AI/ML & FULL-STACK ROLES
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[#8E95A5]">ICFAI UNIV • MCA CGPA: 10.00</span>
            <span className="text-[#5D6473]">|</span>
            <span className="text-[#8E95A5]">GANGTOK, SIKKIM</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-[#07080B]/90 backdrop-blur-md border-b border-white/[0.08] shadow-2xl py-3.5"
            : "bg-[#07080B]/60 backdrop-blur-sm py-4 border-b border-white/[0.04]"
        }`}
      >
        <div className="story-container">
          <div className="flex items-center justify-between h-10">

            {/* Monogram Brand */}
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-9 h-9 border border-white/20 rounded-lg flex items-center justify-center bg-white/[0.03] group-hover:border-white/50 group-hover:bg-white/[0.08] transition-all duration-200 shadow-sm">
                <span className="font-display font-bold text-xs text-[#F4F4F6] tracking-tight">
                  AK
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xs font-display font-semibold text-[#F4F4F6] block tracking-tight">
                  ANU KUMARI SHAH
                </span>
                <span className="text-[10px] font-mono text-[#8E95A5] block -mt-0.5">
                  AI/ML & WEB ENGINEER
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-[12px] font-mono transition-colors uppercase tracking-wider relative group py-1 ${
                    activeSection === item.id
                      ? "text-[#F4F4F6]"
                      : "text-[#8E95A5] hover:text-[#F4F4F6]"
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#38BDF8] transition-all duration-200 ${
                    activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </a>
              ))}
            </div>

            {/* Action CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 bg-white/[0.04] text-[#F4F4F6] hover:bg-white/[0.1] hover:border-white/30 text-[11px] font-mono font-medium tracking-wider uppercase transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
              >
                <span>INITIATE CONTACT</span>
                <span className="text-[#38BDF8]">→</span>
              </a>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-white/10 bg-white/[0.03] text-[#F4F4F6] flex flex-col gap-1.5 justify-center items-center w-10 h-10"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-5 h-[1.5px] bg-[#F4F4F6] block transition-transform origin-center"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-5 h-[1.5px] bg-[#F4F4F6] block"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-5 h-[1.5px] bg-[#F4F4F6] block transition-transform origin-center"
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden bg-[#0B0D13] border-b border-white/[0.08]"
            >
              <div className="px-6 py-6 space-y-4">
                {NAV_ITEMS.map((item, idx) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`flex items-center justify-between text-sm font-mono uppercase tracking-wider py-2 border-b border-white/[0.04] transition-colors ${
                      activeSection === item.id
                        ? "text-[#F4F4F6]"
                        : "text-[#8E95A5] hover:text-[#F4F4F6]"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span className={`text-xs font-mono ${
                      activeSection === item.id ? "text-[#38BDF8]" : "text-[#5D6473]"
                    }`}>0{idx + 1}</span>
                  </a>
                ))}
                <a
                  href="#contact"
                  className="block text-center py-3 bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-[#F4F4F6] text-xs font-mono tracking-widest rounded-lg uppercase mt-4 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  CONTACT →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
