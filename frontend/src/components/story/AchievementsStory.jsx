import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Code2, HeartHandshake } from 'lucide-react';
import { achievements } from '../../utils/constants';

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
  return (
    <section
      id="achievements"
      className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto z-10 py-20"
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
              07 / ACHIEVEMENTS & RECOGNITION
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
            HONORS & COMMUNITY
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#8E9793] text-[10px] sm:text-base font-light max-w-xl leading-relaxed"
          >
            Verified competition milestones and student leadership initiatives during undergraduate and post-graduate studies.
          </motion.p>
        </div>

        {/* Compact Elegant Achievement Cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-[clamp(0.75rem,2vw,1.5rem)]">
          {achievements.map((item, idx) => {
            const IconComponent = getAchievementIcon(item.icon);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="p-2.5 sm:p-6 rounded-xl sm:rounded-2xl bg-[#0d1310] border border-white/10 hover:border-[#1e6f5c]/60 transition-all duration-300 shadow-xl space-y-2 sm:space-y-4 group relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#1e6f5c]/10 border border-[#1e6f5c]/30 flex items-center justify-center text-[#1e6f5c] group-hover:bg-[#1e6f5c] group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-3 h-3 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[7px] sm:text-[10px] font-mono text-[#1e6f5c] font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-[10px] sm:text-lg font-display font-bold text-[#F4F5F4] group-hover:text-[#1e6f5c] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[8px] sm:text-xs text-[#8E9793] font-light leading-relaxed pt-0.5 sm:pt-1 hidden sm:block">
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
