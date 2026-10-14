import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

const JourneyStory = () => {
  const { journeyTimeline } = usePortfolio();

  return (
    <section
      id="journey"
      className="relative flex flex-col justify-start px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto z-10 pt-8 sm:pt-12 pb-16 w-full"
    >
      <div className="space-y-4 sm:space-y-6">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-1.5 sm:space-y-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="h-px w-10 bg-[#1e6f5c]/40" />
            <span className="text-xs font-mono text-[#10b981] tracking-widest uppercase font-bold">
              03 / MY JOURNEY
            </span>
            <div className="h-px w-10 bg-[#1e6f5c]/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-xl sm:text-3xl text-[#F4F5F4] tracking-tight uppercase"
          >
            PATHWAY TO AI & FULL-STACK
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-[#8E9793] text-xs sm:text-sm font-light max-w-xl leading-relaxed"
          >
            A continuous evolution from undergraduate computer science foundations to real-world web production, advanced MCA studies, and intelligent AI system engineering.
          </motion.p>
        </div>

        {/* Storytelling Timeline Grid */}
        <div className="relative pt-6">
          {/* Central Vertical Connector line */}
          <div className="absolute left-1/2 top-10 bottom-10 w-[2px] bg-gradient-to-b from-[#1e6f5c]/20 via-[#1e6f5c] to-[#1e6f5c]/20 -translate-x-1/2" />

          <div className="space-y-[clamp(1.5rem,4vw,3rem)] relative">
            {journeyTimeline.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`flex flex-row items-center gap-0 ${isEven ? 'flex-row-reverse' : ''}`}
                >
                  {/* Timeline Card */}
                  <div className="w-1/2 px-[clamp(0.5rem,2vw,2rem)]">
                    <div className="p-[clamp(0.75rem,2vw,1.5rem)] rounded-xl sm:rounded-2xl bg-[#0d1310] border border-white/10 hover:border-[#1e6f5c]/50 transition-all duration-300 shadow-xl space-y-1 sm:space-y-2 group">
                      <div className="flex items-center justify-between">
                        <span className="text-[7px] sm:text-[10px] font-mono text-[#1e6f5c] font-bold uppercase tracking-wider">
                          STEP 0{idx + 1}
                        </span>
                        <span className="text-[8px] sm:text-[11px] font-mono text-[#8E9793] bg-white/[0.04] px-1.5 sm:px-2.5 py-0.5 rounded border border-white/10">
                          {item.period}
                        </span>
                      </div>

                      <h3 className="text-xs sm:text-lg font-display font-bold text-[#F4F5F4] group-hover:text-[#1e6f5c] transition-colors leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-[8px] sm:text-xs font-mono text-[#1e6f5c] font-medium">
                        {item.subtitle}
                      </p>

                      <p className="text-[8px] sm:text-xs text-[#8E9793] font-light leading-relaxed pt-0.5 sm:pt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Central Node Badge */}
                  <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full border-2 border-[#1e6f5c] bg-[#070908] flex items-center justify-center shadow-[0_0_15px_rgba(30,111,92,0.5)] z-20">
                      <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-[#1e6f5c]" />
                    </div>
                  </div>

                  {/* Empty Spacer Column for Desktop alternating layout */}
                  <div className="block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default JourneyStory;
