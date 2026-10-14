import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

const ExperienceStory = () => {
  const { experience } = usePortfolio();
  const [activeExpIndex, setActiveExpIndex] = useState(0);
  const activeExp = experience[activeExpIndex] || experience[0];

  return (
    <section
      id="experience"
      className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto z-10 py-4 sm:py-6 w-full min-h-[calc(100vh-6rem)]"
    >
      <div className="space-y-6 sm:space-y-8">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 mb-2 sm:mb-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="h-px w-10 bg-[#8E8170]/40" />
            <span className="text-xs font-mono text-[#C8B99F] tracking-widest uppercase font-bold">
              06 / WORK EXPERIENCE
            </span>
            <div className="h-px w-10 bg-[#8E8170]/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-xl sm:text-5xl text-[#EAD9B8] tracking-tight uppercase"
          >
            PRACTICAL INDUSTRY ROLES
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#F5EBDD] text-[10px] sm:text-base font-light max-w-xl leading-relaxed"
          >
            Hands-on web engineering experience delivering production software for client platforms and security solutions.
          </motion.p>
        </div>

        {/* Timeline Navigation + Details */}
        <div className="grid grid-cols-[2fr_3fr] sm:grid-cols-[5fr_7fr] items-start gap-2 sm:gap-[clamp(1.5rem,4vw,3rem)]">

          {/* Left: Role Selection Cards */}
          <div className="space-y-2 sm:space-y-4">
            {experience.map((exp, idx) => {
              const isActive = activeExpIndex === idx;
              return (
                <motion.div
                  key={exp.id}
                  onClick={() => setActiveExpIndex(idx)}
                  whileHover={{ x: 4 }}
                  className={`p-2.5 sm:p-6 rounded-xl sm:rounded-2xl border cursor-pointer transition-all duration-300 space-y-1 sm:space-y-2 ${isActive
                      ? 'bg-[#1c1c1c] border-[#EAD9B8] shadow-[0_0_25px_rgba(234,217,184,0.12)]'
                      : 'bg-white/[0.02] border-[#8E8170]/25 hover:border-[#8E8170]/50'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[7px] sm:text-[10px] font-mono text-[#C8B99F] font-bold uppercase tracking-wider">
                      PHASE 0{idx + 1} // {exp.type}
                    </span>
                    <span className="text-[8px] sm:text-xs font-mono text-[#C8B99F] hidden sm:inline">
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="text-[10px] sm:text-lg font-display font-bold text-[#EAD9B8] leading-snug">
                    {exp.title}
                  </h3>

                  <p className="text-[8px] sm:text-xs font-mono text-[#C8B99F] hidden sm:block">
                    {exp.company} <span className="text-[#C8B99F]/70">({exp.location})</span>
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Detailed Experience View */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExpIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-3 sm:p-8 rounded-xl sm:rounded-2xl bg-[#171717] border border-[#8E8170]/40 shadow-2xl space-y-2.5 sm:space-y-6 relative overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-[#8E8170]/25 pb-4">
                  <div>
                    <h3 className="font-display font-extrabold text-sm sm:text-2xl text-[#EAD9B8]">
                      {activeExp.title}
                    </h3>
                    <p className="text-[8px] sm:text-xs font-mono text-[#C8B99F] mt-0.5">
                      {activeExp.company} • {activeExp.location}
                    </p>
                  </div>
                  <span className="px-1.5 sm:px-3 py-0.5 sm:py-1 rounded bg-[#EAD9B8]/10 border border-[#8E8170]/40 text-[#EAD9B8] text-[8px] sm:text-xs font-mono font-bold hidden sm:inline">
                    {activeExp.period}
                  </span>
                </div>

                {/* Key Accomplishments Bullets */}
                <div className="space-y-3">
                  <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-wider sm:tracking-widest text-[#EAD9B8] font-bold block">
                    KEY RESPONSIBILITIES & DELIVERABLES:
                  </span>
                  <ul className="space-y-2">
                    {activeExp.highlights.map((h, i) => (
                      <li key={i} className="text-[9px] sm:text-sm text-[#F5EBDD] font-light flex items-start gap-1.5 sm:gap-2.5">
                        <span className="text-[#EAD9B8] font-bold mt-0.5">➢</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Client Projects Shipped */}
                {activeExp.projectsMentioned && activeExp.projectsMentioned.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono text-[#EAD9B8] uppercase font-bold block">
                      CLIENT PROJECTS DELIVERED:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeExp.projectsMentioned.map((proj) => (
                        <span key={proj} className="px-1.5 sm:px-3 py-0.5 sm:py-1 rounded bg-white/[0.04] border border-[#8E8170]/30 text-[8px] sm:text-xs font-mono text-[#F5EBDD]">
                          📁 {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies Stack */}
                <div className="space-y-2 pt-4 border-t border-[#8E8170]/25">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8B99F] font-bold block">
                    TECHNOLOGIES USED
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeExp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] sm:text-xs font-mono px-1.5 sm:px-3 py-0.5 sm:py-1 rounded bg-white/[0.04] border border-[#8E8170]/25 text-[#F5EBDD]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ExperienceStory;