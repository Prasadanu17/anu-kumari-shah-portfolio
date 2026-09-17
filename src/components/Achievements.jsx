import React from "react";
import { motion } from "framer-motion";
import { achievements } from "../utils/constants";
import { Award, Code } from "lucide-react";

const iconMap = {
  award: Award,
  code: Code,
};

const Achievements = () => {
  return (
    <section id="achievements" className="py-24 sm:py-28 relative border-t border-white/[0.08]">
      <div className="story-container">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span>06 / HONORS // COMPETITIVE RECOGNITION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-tight text-[#F4F4F6]">
              AWARDS & CHALLENGES
            </h2>
          </div>
          <p className="text-xs font-mono text-[#8E95A5] max-w-sm leading-relaxed uppercase">
            Recognitions earned through university code competitions and technical design hackathons.
          </p>
        </div>

        {/* Clean Editorial Numbered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((item, index) => {
            const Icon = iconMap[item.icon] || Award;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl border border-white/[0.08] bg-[#0E1017]/75 backdrop-blur-md hover:border-[#38BDF8]/40 transition-all duration-300 flex items-start gap-6 group shadow-xl"
              >
                {/* Number as primary visual anchor */}
                <div className="text-3xl sm:text-4xl font-mono font-extrabold text-[#38BDF8]/50 group-hover:text-[#38BDF8] transition-colors shrink-0">
                  0{index + 1}
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#5D6473] uppercase tracking-wider">
                      VERIFIED RECOGNITION
                    </span>
                    <Icon className="w-4 h-4 text-[#38BDF8]" />
                  </div>

                  <h3 className="text-xl font-display font-bold text-[#F4F4F6] group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#8E95A5] leading-relaxed font-light">
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

export default Achievements;
