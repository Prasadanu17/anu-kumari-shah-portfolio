import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Code2, HeartHandshake } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const getAchievementIcon = (iconName) => {
  switch (iconName) {
    case 'award':
      return Trophy;
    case 'code':
      return Code2;
    case 'heart':
      return HeartHandshake;
    default:
      return Trophy;
  }
};

const AchievementsStory = () => {
  const { achievements } = usePortfolio();
  return (
    <section
      id="achievements"
      className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto z-10 py-2 sm:py-4 w-full"
    >
      <div className="space-y-4 sm:space-y-6">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-1.5 sm:space-y-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="h-px w-10 bg-[#8E8170]/40" />
            <span className="text-xs font-mono text-[#C8B99F] tracking-widest uppercase font-bold">
              08 / ACHIEVEMENTS & RECOGNITION
            </span>
            <div className="h-px w-10 bg-[#8E8170]/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-xl sm:text-3xl text-[#EAD9B8] tracking-tight uppercase"
          >
            HONORS & COMMUNITY
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-[#F5EBDD] text-xs sm:text-sm font-light max-w-xl leading-relaxed"
          >
            Verified competition milestones and student leadership initiatives during undergraduate and post-graduate studies.
          </motion.p>
        </div>

        {/* Responsive Achievement Cards: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
          {achievements.map((item, idx) => {
            const IconComponent = getAchievementIcon(item.icon);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="p-4 sm:p-6 rounded-2xl bg-[#1c1c1c] border border-[#8E8170]/30 hover:border-[#EAD9B8]/60 transition-all duration-300 shadow-xl space-y-3 group relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/[0.04] border border-[#8E8170]/40 flex items-center justify-center text-[#EAD9B8] group-hover:bg-[#EAD9B8] group-hover:text-[#171717] transition-all duration-300">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#C8B99F] font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm sm:text-base md:text-lg font-display font-bold text-[#EAD9B8] group-hover:text-[#F5EBDD] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#F5EBDD]/90 font-light leading-relaxed pt-0.5">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AchievementsStory;
