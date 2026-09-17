import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-transparent text-[#8E95A5] py-16 border-t border-white/[0.08] relative overflow-hidden">
      <div className="story-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b border-white/[0.06]">
          {/* Col 1: Identity */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded border border-white/20 flex items-center justify-center bg-white/[0.04] text-[11px] font-bold text-white font-mono">
                AK
              </div>
              <span className="text-base font-display font-bold text-[#F4F4F6] tracking-tight">
                ANU KUMARI SHAH
              </span>
            </div>
            <p className="text-xs font-mono text-[#8E95A5] leading-relaxed max-w-sm">
              AI / ML Engineer & Full Stack Developer specializing in intelligent deep learning systems, NLP, Explainable AI, and high-performance web architecture.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#5D6473] pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>MCA Candidate (ICFAI Univ) • BCA (SRM Univ)</span>
            </div>
          </div>

          {/* Col 2: Navigation Index */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-[10px] font-mono text-[#5D6473] uppercase tracking-widest block mb-3">
              DIRECTORY // NAVIGATION
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <a href="#home"       className="text-[#8E95A5] hover:text-[#38BDF8] transition-colors">01 // Home</a>
              <a href="#about"      className="text-[#8E95A5] hover:text-[#38BDF8] transition-colors">02 // About</a>
              <a href="#experience" className="text-[#8E95A5] hover:text-[#38BDF8] transition-colors">03 // Experience</a>
              <a href="#skills"     className="text-[#8E95A5] hover:text-[#38BDF8] transition-colors">04 // Skills</a>
              <a href="#projects"   className="text-[#8E95A5] hover:text-[#38BDF8] transition-colors">05 // Projects</a>
              <a href="#contact"    className="text-[#8E95A5] hover:text-[#38BDF8] transition-colors">06 // Contact</a>
            </div>
          </div>

          {/* Col 3: Direct Connect & Back-to-top */}
          <div className="md:col-span-3 flex flex-col md:items-end justify-between h-full space-y-4">
            <span className="text-[10px] font-mono text-[#5D6473] uppercase tracking-widest block">
              VERIFIED CHANNELS
            </span>
            <div className="flex flex-wrap md:justify-end gap-2 text-xs font-mono">
              <a
                href="https://github.com/Prasadanu17"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded border border-white/10 bg-white/[0.02] text-[#F4F4F6] hover:bg-white/[0.08] hover:border-white/20 transition-all text-[11px]"
              >
                GITHUB ↗
              </a>
              <a
                href="https://linkedin.com/in/anu-shah-102594348"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded border border-white/10 bg-white/[0.02] text-[#F4F4F6] hover:bg-white/[0.08] hover:border-white/20 transition-all text-[11px]"
              >
                LINKEDIN ↗
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-mono text-[#8E95A5] hover:text-[#F4F4F6] transition-colors group pt-2"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-[#38BDF8]" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-[#5D6473] gap-4">
          <p>© {currentYear} ANU KUMARI SHAH • DESIGNED & ENGINEERED FOR HIGH IMPACT.</p>
          <p className="flex items-center gap-2">
            <span>LATENCY: ZERO</span>
            <span>•</span>
            <span>GANGTOK, SIKKIM</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;