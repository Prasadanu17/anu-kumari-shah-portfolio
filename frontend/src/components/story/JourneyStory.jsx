import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

const JourneyStory = () => {
  const { journeyTimeline } = usePortfolio();

  return (
    <section
      id="journey"
      className="relative flex flex-col justify-start px-2 sm:px-6 lg:px-12 max-w-6xl mx-auto z-10 py-2 sm:py-4 pb-16 w-full"
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

        {/* Storytelling Timeline Grid: Identical Alternating Center Timeline on BOTH Mobile & Laptop */}
        <div className="relative pt-4 sm:pt-6">
          {/* Vertical Connector line: Centered on all screen sizes */}
          <div className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#8E8170]/20 via-[#8E8170] to-[#8E8170]/20 -translate-x-1/2" />

          <div className="space-y-4 sm:space-y-6 md:space-y-8 relative">
            {journeyTimeline.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isEven ? -25 : 25, y: 15 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-row items-center relative ${
                    isEven ? 'flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Card */}
                  <div className="w-1/2 px-2 sm:px-4 md:px-6">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#1c1c1c] border border-[#8E8170]/25 hover:border-[#EAD9B8]/50 transition-all duration-300 shadow-xl space-y-1.5 sm:space-y-2 group"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] sm:text-xs font-mono text-[#EAD9B8] font-bold uppercase tracking-wider bg-white/5 border border-white/10 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          STEP 0{idx + 1}
                        </span>
                        <span className="text-[9px] sm:text-xs font-mono font-bold text-[#F5EBDD] bg-white/[0.06] px-2 py-0.5 rounded-md border border-[#8E8170]/30 shadow-sm shrink-0">
                          {item.period}
                        </span>
                      </div>

                      <h3 className="text-xs sm:text-base md:text-lg font-display font-bold text-[#EAD9B8] group-hover:text-[#F5EBDD] transition-colors leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-[9.5px] sm:text-xs font-mono text-[#C8B99F] font-medium leading-tight">
                        {item.subtitle}
                      </p>

                      <p className="text-[10px] sm:text-sm text-[#F5EBDD]/90 font-light leading-snug sm:leading-relaxed pt-0.5">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Node Badge: Centered on vertical line */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-20">
                    <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full border-2 border-[#8E8170] bg-[#171717] flex items-center justify-center shadow-[0_0_15px_rgba(234,217,184,0.3)]">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#EAD9B8]" />
                    </div>
                  </div>

                  {/* Empty Spacer Column: Balances alternating layout on both Mobile & Laptop */}
                  <div className="w-1/2 block" />
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
