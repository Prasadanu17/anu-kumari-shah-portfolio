import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

const JourneyStory = () => {
  const { journeyTimeline } = usePortfolio();
  return (
    <section
      id="journey"
      className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto z-10 pt-24 sm:pt-28 pb-12 sm:pb-20"
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
              02 / MY JOURNEY
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
            PATHWAY TO AI & FULL-STACK
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#8E9793] text-[10px] sm:text-base font-light max-w-xl leading-relaxed"
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
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`flex flex-row items-center gap-0 ${isEven ? 'flex-row-reverse' : ''
                    }`}
                >
                  {/* Timeline Card */}
                  <div className="w-1/2 px-[clamp(0.5rem,2vw,2rem)]">
                    <div className="p-[clamp(0.5rem,2vw,1.5rem)] rounded-xl sm:rounded-2xl bg-[#0d1310] border border-white/10 hover:border-[#1e6f5c]/50 transition-all duration-300 shadow-xl space-y-1 sm:space-y-2 group">
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

                      <p className="text-[8px] sm:text-xs text-[#8E9793] font-light leading-relaxed pt-0.5 sm:pt-1 hidden sm:block">
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
