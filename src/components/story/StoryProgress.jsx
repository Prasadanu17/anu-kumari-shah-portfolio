import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CHAPTER_LIST = [
  { id: 'curious', label: '01 CURIOUS', name: 'Curious' },
  { id: 'learn', label: '02 LEARN', name: 'Learn' },
  { id: 'build', label: '03 BUILD', name: 'Build' },
  { id: 'discover', label: '04 DISCOVER', name: 'Discover' },
  { id: 'create', label: '05 CREATE', name: 'Create' },
  { id: 'research', label: '06 RESEARCH', name: 'Research' },
  { id: 'evolve', label: '07 EVOLVE', name: 'Evolve' },
  { id: 'next', label: '08 NEXT', name: 'Next' },
  { id: 'meet-anu', label: 'MEET ANU', name: 'Contact' },
];

const StoryProgress = ({ currentChapter = 0, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleItemClick = (idx, id) => {
    onNavigate(idx, id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Fixed Story Navigation Rail (Left Side) */}
      <nav className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 pointer-events-auto">
        <div className="text-[10px] font-mono text-[#A5ACB8]/50 uppercase tracking-widest mb-2 pl-2">
          CHAPTERS
        </div>
        {CHAPTER_LIST.map((chap, idx) => {
          const isActive = currentChapter === idx;
          return (
            <button
              key={chap.id}
              onClick={() => handleItemClick(idx, chap.id)}
              className={`group text-left transition-all duration-300 flex items-center gap-3 py-1 focus:outline-none`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-[#63D8B5] scale-150 shadow-[0_0_10px_#63D8B5]'
                    : 'bg-[#A5ACB8]/30 group-hover:bg-[#6366f1]'
                }`}
              />
              <span
                className={`font-mono text-xs tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'text-[#F5F7FA] font-semibold text-emerald-glow pl-1'
                    : 'text-[#A5ACB8]/60 group-hover:text-[#F5F7FA] group-hover:translate-x-1'
                }`}
              >
                {chap.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Top Fixed Brand / Story Badge */}
      <header className="fixed top-6 left-6 right-6 z-40 flex justify-between items-center pointer-events-auto">
        <button
          onClick={() => handleItemClick(0, 'curious')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#63D8B5] animate-pulse shadow-[0_0_12px_#63D8B5]" />
          <div>
            <span className="font-display font-bold text-sm tracking-wider text-[#F5F7FA] group-hover:text-[#63D8B5] transition-colors">
              ANU KUMARI SHAH
            </span>
            <span className="block text-[10px] font-mono text-[#A5ACB8]/70">
              AI / ML & FULL STACK
            </span>
          </div>
        </button>

        {/* Minimal Progress Status Indicator & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0D12]/80 backdrop-blur-md border border-white/10 text-xs font-mono text-[#A5ACB8]">
            <span className="text-[#63D8B5]">
              {CHAPTER_LIST[currentChapter]?.label}
            </span>
            <span className="opacity-40">/ 08</span>
          </div>

          <a
            href="assets/profile.jpeg"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#11152A]/80 border border-indigo-500/30 text-xs font-mono text-[#F5F7FA] hover:border-[#63D8B5] hover:text-[#63D8B5] transition-all duration-300"
          >
            RESUME
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#0B0D12]/80 backdrop-blur-md border border-white/10 text-[#F5F7FA] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-20 bg-[#050608]/95 backdrop-blur-xl z-30 flex flex-col p-6 pointer-events-auto lg:hidden"
          >
            <div className="font-mono text-xs text-[#A5ACB8] uppercase mb-4 tracking-widest">
              STORY CHAPTERS
            </div>
            <div className="flex flex-col gap-4">
              {CHAPTER_LIST.map((chap, idx) => (
                <button
                  key={chap.id}
                  onClick={() => handleItemClick(idx, chap.id)}
                  className={`text-left font-display text-lg py-2 border-b border-white/5 flex justify-between items-center ${
                    currentChapter === idx
                      ? 'text-[#63D8B5] font-semibold'
                      : 'text-[#F5F7FA]/70'
                  }`}
                >
                  <span>{chap.label}</span>
                  {currentChapter === idx && (
                    <span className="text-xs font-mono text-[#63D8B5]">
                      Active
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StoryProgress;
