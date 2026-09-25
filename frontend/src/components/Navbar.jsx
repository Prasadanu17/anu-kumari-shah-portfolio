import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";

const NAV_ITEMS = [
  { label: "HOME",           href: "#home",           id: "home"           },
  { label: "ABOUT",          href: "#about",          id: "about"          },
  { label: "JOURNEY",        href: "#journey",        id: "journey"        },
  { label: "SKILLS",         href: "#skills",         id: "skills"         },
  { label: "PROJECTS",       href: "#projects",       id: "projects"       },
  { label: "EXPERIENCE",     href: "#experience",     id: "experience"     },
  { label: "CERTIFICATIONS", href: "#certifications", id: "certifications" },
  { label: "CONTACT",        href: "#contact",        id: "contact"        },
];

const Navbar = () => {
  const { personalInfo } = usePortfolio();
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
      <div className="bg-[#070908]/90 border-b border-white/[0.05] hidden md:block">
        <div className="story-container py-1.5 flex items-center justify-between text-[10px] font-mono text-[#8E9793]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1e6f5c] animate-pulse" />
            <span className="tracking-wider uppercase text-[#F4F5F4]">
              STATUS: OPEN TO AI/ML & FULL-STACK ROLES
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[#8E9793]">ICFAI UNIV • MCA CGPA: 10.00</span>
            <span className="text-[#4E5753]">|</span>
            <span className="text-[#8E9793]">GANGTOK, SIKKIM</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-[#070908]/92 backdrop-blur-md border-b border-white/[0.08] shadow-2xl py-3"
            : "bg-[#070908]/60 backdrop-blur-sm py-4 border-b border-white/[0.04]"
        }`}
      >
        <div className="story-container">
          <div className="flex items-center justify-between h-10">

            {/* Monogram Brand */}
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-9 h-9 border border-[#1e6f5c]/40 rounded-lg flex items-center justify-center bg-[#1e6f5c]/10 group-hover:border-[#1e6f5c] group-hover:bg-[#1e6f5c]/20 transition-all duration-200 shadow-sm">
                <span className="font-display font-bold text-xs text-[#F4F5F4] tracking-tight">
                  AK
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xs font-display font-semibold text-[#F4F5F4] block tracking-tight">
                  ANU KUMARI SHAH
                </span>
                <span className="text-[10px] font-mono text-[#1e6f5c] block -mt-0.5 font-medium">
                  AI/ML & FULL-STACK ENGINEER
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-[11px] font-mono transition-colors uppercase tracking-wider relative group py-1 ${
                    activeSection === item.id
                      ? "text-[#F4F5F4]"
                      : "text-[#8E9793] hover:text-[#F4F5F4]"
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#1e6f5c] transition-all duration-200 ${
                    activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </a>
              ))}
            </div>

            {/* Action CTA Resume Button */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1e6f5c]/40 bg-[#1e6f5c]/15 text-[#F4F5F4] hover:bg-[#1e6f5c] hover:text-white text-[11px] font-mono font-medium tracking-wider uppercase transition-all duration-200 shadow-sm"
              >
                <span>RESUME</span>
                <span className="text-[#1e6f5c] group-hover:text-white">↓</span>
              </a>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg border border-white/10 bg-white/[0.03] text-[#F4F5F4] flex flex-col gap-1.5 justify-center items-center w-10 h-10"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-5 h-[1.5px] bg-[#F4F5F4] block transition-transform origin-center"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-5 h-[1.5px] bg-[#F4F5F4] block"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-5 h-[1.5px] bg-[#F4F5F4] block transition-transform origin-center"
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
              className="xl:hidden overflow-hidden bg-[#0d1310] border-b border-white/[0.08]"
            >
              <div className="px-6 py-6 space-y-3">
                {NAV_ITEMS.map((item, idx) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`flex items-center justify-between text-xs font-mono uppercase tracking-wider py-2 border-b border-white/[0.04] transition-colors ${
                      activeSection === item.id
                        ? "text-[#F4F5F4]"
                        : "text-[#8E9793] hover:text-[#F4F5F4]"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span className={`text-[10px] font-mono ${
                      activeSection === item.id ? "text-[#1e6f5c]" : "text-[#4E5753]"
                    }`}>0{idx + 1}</span>
                  </a>
                ))}
                <a
                  href={personalInfo.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-2.5 bg-[#1e6f5c] text-white text-xs font-mono tracking-widest rounded-lg uppercase mt-4 transition-colors font-bold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  VIEW RESUME (PDF) ↓
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

