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

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="h-px w-10 bg-[#1e6f5c]/40" />
            <span className="text-xs font-mono text-[#1e6f5c] tracking-widest uppercase font-bold">
              05 / WORK EXPERIENCE
            </span>
            <div className="h-px w-10 bg-[#1e6f5c]/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-xl sm:text-5xl text-[#F4F5F4] tracking-tight uppercase"
          >
            PRACTICAL INDUSTRY ROLES
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#8E9793] text-[10px] sm:text-base font-light max-w-xl leading-relaxed"
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
                  className={`p-2.5 sm:p-6 rounded-xl sm:rounded-2xl border cursor-pointer transition-all duration-300 space-y-1 sm:space-y-2 ${
                    isActive
                      ? 'bg-[#0d1310] border-[#1e6f5c] shadow-[0_0_25px_rgba(30,111,92,0.2)]'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[7px] sm:text-[10px] font-mono text-[#1e6f5c] font-bold uppercase tracking-wider">
                      PHASE 0{idx + 1} // {exp.type}
                    </span>
                    <span className="text-[8px] sm:text-xs font-mono text-[#8E9793] hidden sm:inline">
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="text-[10px] sm:text-lg font-display font-bold text-[#F4F5F4] leading-snug">
                    {exp.title}
                  </h3>

                  <p className="text-[8px] sm:text-xs font-mono text-[#1e6f5c] hidden sm:block">
                    {exp.company} <span className="text-[#8E9793]">({exp.location})</span>
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
                className="p-3 sm:p-8 rounded-xl sm:rounded-2xl bg-[#0d1310] border border-[#1e6f5c]/50 shadow-2xl space-y-2.5 sm:space-y-6 relative overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div>
                    <h3 className="font-display font-extrabold text-sm sm:text-2xl text-[#F4F5F4]">
                      {activeExp.title}
                    </h3>
                    <p className="text-[8px] sm:text-xs font-mono text-[#1e6f5c] mt-0.5">
                      {activeExp.company} • {activeExp.location}
                    </p>
                  </div>
                  <span className="px-1.5 sm:px-3 py-0.5 sm:py-1 rounded bg-[#1e6f5c]/15 border border-[#1e6f5c]/30 text-[#1e6f5c] text-[8px] sm:text-xs font-mono font-bold hidden sm:inline">
                    {activeExp.period}
                  </span>
                </div>

                {/* Key Accomplishments Bullets */}
                <div className="space-y-3">
                  <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-wider sm:tracking-widest text-[#1e6f5c] font-bold block">
                    KEY RESPONSIBILITIES & DELIVERABLES:
                  </span>
                  <ul className="space-y-2">
                    {activeExp.highlights.map((h, i) => (
                      <li key={i} className="text-[9px] sm:text-sm text-[#8E9793] font-light flex items-start gap-1.5 sm:gap-2.5">
                        <span className="text-[#1e6f5c] font-bold mt-0.5">➢</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Client Projects Shipped */}
                {activeExp.projectsMentioned && activeExp.projectsMentioned.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono text-[#1e6f5c] uppercase font-bold block">
                      CLIENT PROJECTS DELIVERED:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeExp.projectsMentioned.map((proj) => (
                        <span key={proj} className="px-1.5 sm:px-3 py-0.5 sm:py-1 rounded bg-[#1e6f5c]/15 border border-[#1e6f5c]/30 text-[8px] sm:text-xs font-mono text-[#F4F5F4]">
                          📁 {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies Stack */}
                <div className="space-y-2 pt-4 border-t border-white/[0.08]">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E9793] font-bold block">
                    TECHNOLOGIES USED
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeExp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] sm:text-xs font-mono px-1.5 sm:px-3 py-0.5 sm:py-1 rounded bg-white/[0.04] border border-white/10 text-[#F4F5F4]"
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