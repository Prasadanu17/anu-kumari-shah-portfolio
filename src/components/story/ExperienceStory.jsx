import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experience } from '../../utils/constants';

const ExperienceStory = () => {
  const [activeExpIndex, setActiveExpIndex] = useState(0);

  const activeExp = experience[activeExpIndex];

  return (
    <section
      id="experience"
      className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto z-10 pt-24 pb-12"
    >
      <div className="space-y-12">

        {/* ================= CHAPTER TITLE ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#38BDF8] tracking-widest uppercase font-bold">02 / EXPERIENCE</span>
            <div className="h-px w-12 bg-[#38BDF8]/40" />
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#F4F4F6] tracking-tight uppercase">
            WORK & LEARNING JOURNEY
          </h2>
        </motion.div>

        {/* ================= MAIN CONTENT: TIMELINE + DETAILS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* --- LEFT: ANIMATED VERTICAL TIMELINE --- */}
          <div className="lg:col-span-4 relative">
            {/* The vertical line */}
            <div className="absolute left-[15px] top-0 bottom-0 w-px bg-white/10" />
            
            <div className="space-y-6 relative">
              {experience.map((exp, idx) => {
                const isActive = activeExpIndex === idx;
                return (
                  <motion.button
                    key={exp.id}
                    onClick={() => setActiveExpIndex(idx)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="relative flex items-start gap-4 w-full text-left group"
                  >
                    {/* Timeline Node */}
                    <div className="relative flex-shrink-0 mt-1">
                      <div className={`w-[30px] h-[30px] rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? 'border-[#38BDF8] bg-[#38BDF8]/20 shadow-[0_0_15px_rgba(56,189,248,0.5)]' 
                          : 'border-white/20 bg-[#0B0F19] group-hover:border-[#38BDF8]/50'
                      }`}>
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isActive ? 'bg-[#38BDF8]' : 'bg-white/30'
                        }`} />
                      </div>
                    </div>

                    {/* Timeline Text */}
                    <div className={`pt-1 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-80'}`}>
                      <span className="text-[10px] font-mono text-[#38BDF8] font-bold block mb-1">
                        PHASE 0{idx + 1} // {exp.period}
                      </span>
                      <h4 className={`text-sm font-semibold transition-colors ${isActive ? 'text-[#F4F4F6]' : 'text-[#8E95A5]'}`}>
                        {exp.title}
                      </h4>
                      <p className="text-[11px] font-mono text-[#8E95A5] mt-0.5">
                        {exp.company}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* --- RIGHT: ACTIVE EXPERIENCE DETAILS --- */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExpIndex}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-md space-y-6 shadow-2xl relative overflow-hidden"
              >
                {/* Decorative top-left glow */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-[#38BDF8]/10 blur-[60px] rounded-full pointer-events-none" />

                {/* Header Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
                  <span className="text-xs font-mono text-[#38BDF8] font-bold tracking-widest uppercase">
                    PHASE 0{activeExpIndex + 1} // 0{experience.length}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[#38BDF8] text-xs font-mono font-semibold">
                    {activeExp.period}
                  </span>
                </div>

                {/* Title & Org */}
                <div className="space-y-1 relative z-10">
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F4F4F6] tracking-tight">
                    {activeExp.title}
                  </h3>
                  <p className="text-sm sm:text-base font-mono text-[#38BDF8]">
                    {activeExp.company}{' '}
                    <span className="text-xs text-[#8E95A5]">({activeExp.location})</span>
                  </p>
                </div>

                {/* Description */}
                <p className="text-[#8E95A5] text-sm sm:text-base leading-relaxed font-light relative z-10">
                  {activeExp.description}
                </p>

                {/* Technologies */}
                <div className="space-y-3 pt-4 border-t border-white/[0.08] relative z-10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#5D6473] font-bold block">
                    CORE TECHNOLOGIES & STACK
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeExp.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-[#F4F4F6] hover:border-[#38BDF8]/50 hover:text-[#38BDF8] transition-colors cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ================= SUMMARY CARDS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {experience.map((exp, idx) => {
            const isActive = activeExpIndex === idx;
            return (
              <motion.div
                key={exp.id}
                onClick={() => setActiveExpIndex(idx)}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`cursor-pointer p-5 rounded-xl border transition-all duration-300 ${
                  isActive
                    ? 'bg-[#38BDF8]/10 border-[#38BDF8]/50 shadow-[0_0_20px_rgba(56,189,248,0.1)]'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/20'
                }`}
              >
                <span className="text-[10px] font-mono text-[#38BDF8] font-bold block mb-2">
                  0{idx + 1} // {exp.period}
                </span>
                <h4 className="text-sm font-semibold text-[#F4F4F6] truncate">
                  {exp.title}
                </h4>
                <p className="text-xs font-mono text-[#8E95A5] truncate mt-1">
                  {exp.company}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ExperienceStory;