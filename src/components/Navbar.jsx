import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About",      href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Work",       href: "#projects" },
    { label: "Skills",     href: "#skills" },
    { label: "Playground", href: "#playground" },
    { label: "Research",   href: "#research" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#E6E2DD]/90 backdrop-blur-md border-b border-[#D3CEC7] shadow-sm py-3"
          : "bg-[#E6E2DD]/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-10">

          {/* Logo — initials box matching reference "KK" box style */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-9 h-9 border-2 border-[#2A2825] rounded flex items-center justify-center group-hover:bg-[#2A2825] transition-colors duration-200">
              <span className="font-display font-bold text-xs text-[#2A2825] group-hover:text-[#FAF8F5] transition-colors tracking-tight">
                AK
              </span>
            </div>
          </a>

          {/* Desktop Nav — plain text like reference */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[12px] font-mono text-[#4A4641] hover:text-[#2A2825] transition-colors uppercase tracking-wider relative group"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#2A2825] group-hover:w-full transition-all duration-200" />
              </a>
            ))}
          </div>

          {/* HIRE ME button — matching reference's dark pill button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2A2825] text-[#FAF8F5] text-[11px] font-mono font-bold tracking-widest uppercase rounded-lg hover:bg-[#1A1918] transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
            >
              HIRE ME →
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 group"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-[#2A2825] block transition-transform origin-center"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-[#2A2825] block"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-[#2A2825] block transition-transform origin-center"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-[#FAF8F5] border-b border-[#D3CEC7]"
          >
            <div className="px-6 py-6 space-y-5">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-sm font-mono text-[#2A2825] hover:text-[#4A4641] uppercase tracking-wider"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="block text-center py-3 bg-[#2A2825] text-[#FAF8F5] text-xs font-mono tracking-widest rounded-lg uppercase mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HIRE ME →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
