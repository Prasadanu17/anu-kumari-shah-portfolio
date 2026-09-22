import React from 'react';
import { motion } from 'framer-motion';
import { skillsCategorized } from '../../utils/constants';

const SkillsStory = () => {
  return (
    <section
      id="skills"
      className="relative flex flex-col px-4 sm:px-6 lg:px-12 pt-16 pb-24 max-w-7xl mx-auto z-10"
    >
      <div className="w-full space-y-12">

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
              03 / WHAT I BUILD
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
            TECHNICAL CAPABILITIES
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#8E9793] text-[10px] sm:text-base font-light max-w-xl leading-relaxed"
          >
            Categorized technical stack focused on building intelligent algorithms, scalable frontend architectures, and reliable database backends.
          </motion.p>
        </div>

        {/* 3 Categorized Layout Columns */}
        <div className="grid grid-cols-3 pt-4 gap-2 sm:gap-[clamp(0.75rem,2vw,1.5rem)]">
          {skillsCategorized.map((cat, idx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="p-2.5 sm:p-7 rounded-xl sm:rounded-2xl bg-[#0d1310] border border-white/10 hover:border-[#1e6f5c]/60 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-2 sm:space-y-6 group"
            >
              <div className="space-y-1.5 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[7px] sm:text-[10px] font-mono text-[#1e6f5c] font-bold uppercase tracking-wider sm:tracking-widest">
                    CATEGORY 0{idx + 1}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#1e6f5c]/60 group-hover:bg-[#1e6f5c] transition-colors" />
                </div>

                <h3 className="text-xs sm:text-xl font-display font-bold text-[#F4F5F4] tracking-tight group-hover:text-[#1e6f5c] transition-colors">
                  {cat.category}
                </h3>

                <p className="text-[8px] sm:text-xs font-mono text-[#8E9793] font-light hidden sm:block">
                  {cat.description}
                </p>

                <div className="h-px w-full bg-white/[0.06] pt-2" />
              </div>

              {/* Skill Items Pills */}
              <div className="flex flex-wrap gap-1 sm:gap-2 pt-1 sm:pt-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg bg-white/[0.04] border border-white/10 text-[7px] sm:text-xs font-mono text-[#F4F5F4] hover:bg-[#1e6f5c]/15 hover:border-[#1e6f5c]/40 hover:text-[#1e6f5c] transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkillsStory;