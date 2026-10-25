import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

const JourneyStory = () => {
  const { journeyTimeline } = usePortfolio();

  return (
    <section
      id="journey"
      className="relative flex flex-col justify-start px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto z-10 py-2 sm:py-4 pb-16 w-full"
    >
      <div className="space-y-4 sm:space-y-6">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-2 pb-1">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAD9B8]/15 border border-[#EAD9B8]/40 shadow-[0_0_15px_rgba(234,217,184,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-mono text-[#EAD9B8] tracking-[0.2em] uppercase font-bold">
              03 // MY CAREER JOURNEY
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#F5EBDD] tracking-tight uppercase"
          >
            PATHWAY TO AI & FULL-STACK
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="text-[#EAD9B8]/90 text-xs sm:text-sm font-light max-w-xl leading-relaxed"
          >
            A continuous evolution from undergraduate computer science foundations to real-world web production, advanced MCA studies, and intelligent AI system engineering.
          </motion.p>
        </div>

        {/* Storytelling Timeline Grid: Left-aligned on mobile, alternating on desktop */}
        <div className="relative pt-4 sm:pt-6">
          {/* Vertical Connector line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#8E8170]/20 via-[#8E8170] to-[#8E8170]/20 -translate-x-1/2" />

          <div className="space-y-4 sm:space-y-6 md:space-y-8 relative">
            {journeyTimeline.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`flex flex-col sm:flex-row items-start sm:items-center relative ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Card */}
                  <div className="w-full pl-9 pr-1 sm:pl-0 sm:pr-0 sm:w-1/2 sm:px-4 md:px-6">
                    <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#1c1c1c] border border-[#8E8170]/25 hover:border-[#EAD9B8]/40 transition-all duration-300 shadow-xl space-y-1.5 sm:space-y-2 group">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] sm:text-[10px] font-mono text-[#C8B99F] font-bold uppercase tracking-wider">
                          STEP 0{idx + 1}
                        </span>
                        <span className="text-[9.5px] sm:text-[11px] font-mono text-[#EAD9B8] bg-white/[0.04] px-2 py-0.5 rounded border border-[#8E8170]/20">
                          {item.period}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-lg font-display font-bold text-[#EAD9B8] group-hover:text-[#F5EBDD] transition-colors leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-[10px] sm:text-xs font-mono text-[#C8B99F] font-medium">
                        {item.subtitle}
                      </p>

                      <p className="text-xs sm:text-sm text-[#F5EBDD] font-light leading-relaxed pt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Node Badge */}
                  <div className="absolute left-4 sm:left-1/2 top-4 sm:top-auto sm:-translate-y-0 -translate-x-1/2 flex items-center justify-center">
                    <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full border-2 border-[#8E8170] bg-[#171717] flex items-center justify-center shadow-[0_0_15px_rgba(234,217,184,0.25)] z-20">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#EAD9B8]" />
                    </div>
                  </div>

                  {/* Empty Spacer Column for Desktop alternating layout */}
                  <div className="hidden sm:block sm:w-1/2" />
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
