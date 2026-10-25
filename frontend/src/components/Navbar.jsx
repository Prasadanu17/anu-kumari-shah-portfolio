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
  const { personalInfo, activeSection, setActiveSection } = usePortfolio();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Telemetry Status Bar */}
      <div className="bg-[#171717]/95 border-b border-[#8E8170]/20 hidden md:block">
        <div className="story-container py-1 flex items-center justify-between text-[10px] font-mono text-[#C8B99F]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            <span className="tracking-wider uppercase text-[#EAD9B8] font-semibold">
              STATUS: OPEN TO AI/ML & FULL-STACK ROLES
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[#F5EBDD]/90">ICFAI UNIV • MCA CGPA: 10.00</span>
            <span className="text-[#8E8170]">|</span>
            <span className="text-[#EAD9B8]">GANGTOK, SIKKIM</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className="bg-[#171717]/90 backdrop-blur-md border-b border-[#8E8170]/25 shadow-lg py-2.5 transition-all duration-300"
      >
        <div className="story-container">
          <div className="flex items-center justify-between h-10">

            {/* Monogram Brand */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 border border-[#8E8170]/40 rounded-lg flex items-center justify-center bg-[#1c1c1c] group-hover:border-[#EAD9B8]/60 group-hover:bg-[#252525] transition-all duration-200 shadow-sm">
                <span className="font-display font-bold text-xs text-[#EAD9B8] tracking-tight">
                  AK
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xs font-display font-semibold text-[#EAD9B8] block tracking-tight">
                  ANU KUMARI SHAH
                </span>
                <span className="text-[10px] font-mono text-[#C8B99F] block -mt-0.5 font-medium">
                  AI/ML & FULL-STACK ENGINEER
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`text-[10px] xl:text-[11px] font-mono transition-colors uppercase tracking-wider relative group py-1 ${
                    activeSection === item.id
                      ? "text-[#EAD9B8] font-bold"
                      : "text-[#C8B99F] hover:text-[#EAD9B8]"
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#EAD9B8] transition-all duration-200 ${
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
                className="inline-flex items-center gap-2 px-3 xl:px-4 py-1.5 xl:py-2 rounded-lg border border-[#8E8170]/40 bg-[#1c1c1c] text-[#EAD9B8] hover:bg-[#EAD9B8] hover:text-[#171717] text-[10px] xl:text-[11px] font-mono font-medium tracking-wider uppercase transition-all duration-200 shadow-sm"
              >
                <span>RESUME</span>
                <span className="text-[#C8B99F] group-hover:text-[#171717]">↓</span>
              </a>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-[#8E8170]/30 bg-[#1c1c1c] text-[#EAD9B8] flex flex-col gap-1.5 justify-center items-center w-10 h-10"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-5 h-[1.5px] bg-[#EAD9B8] block transition-transform origin-center"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-5 h-[1.5px] bg-[#EAD9B8] block"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-5 h-[1.5px] bg-[#EAD9B8] block transition-transform origin-center"
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
              className="xl:hidden overflow-hidden bg-[#171717] border-b border-[#8E8170]/25"
            >
              <div className="px-6 py-6 space-y-3">
                {NAV_ITEMS.map((item, idx) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`flex items-center justify-between text-xs font-mono uppercase tracking-wider py-2 border-b border-[#8E8170]/15 transition-colors ${
                      activeSection === item.id
                        ? "text-[#EAD9B8] font-bold"
                        : "text-[#C8B99F] hover:text-[#EAD9B8]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className={`text-[10px] font-mono ${
                      activeSection === item.id ? "text-[#EAD9B8]" : "text-[#8E8170]"
                    }`}>0{idx + 1}</span>
                  </a>
                ))}
                <a
                  href={personalInfo.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-2.5 bg-[#EAD9B8] text-[#171717] text-xs font-mono tracking-widest rounded-lg uppercase mt-4 transition-colors font-bold shadow-lg"
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

