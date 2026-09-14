import React from "react";
import { motion } from "framer-motion";
import { achievements } from "../utils/constants";
import { Award, Code } from "lucide-react";

const iconMap = {
  award: Award,
  code: Code,
};

const AchievementCard = ({ item, index }) => {
  const Icon = iconMap[item.icon] || Award;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-[#FAF8F5] p-8 rounded-2xl h-full flex flex-col items-center text-center border border-[#D3CEC7] shadow-sm hover:border-[#2A2825] transition-colors"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#E6E2DD] border border-[#D3CEC7] flex items-center justify-center mb-6 text-[#2A2825]">
        <Icon className="w-6 h-6 text-[#2A2825]" />
      </div>
      <h4 className="text-lg font-bold text-[#2A2825] font-display mb-2">
        {item.title}
      </h4>
      <p className="text-[#66625C] text-xs font-mono leading-relaxed">
        {item.description}
      </p>
    </motion.div>
  );
};

const Achievements = () => {
  return (
    <section id="achievements" className="py-24 relative bg-[#E6E2DD] border-t border-[#D3CEC7]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-[#66625C] uppercase tracking-widest block mb-2">
            05 PLAYGROUND // HONORS & AWARDS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2A2825] uppercase font-display">
            VERIFIED ACHIEVEMENTS
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto gap-8">
          {achievements.map((item, index) => (
            <AchievementCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
