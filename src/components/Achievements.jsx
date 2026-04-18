import React from "react";
import { motion } from "framer-motion";
import { achievements } from "../utils/constants";
import { Award, Code, Briefcase, Users } from "lucide-react";

const iconMap = {
  award: Award,
  code: Code,
  briefcase: Briefcase,
  users: Users,
};

const AchievementCard = ({ item, index }) => {
  const Icon = iconMap[item.icon] || Award;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group p-[1px] rounded-3xl overflow-hidden shadow-xl hover:shadow-primary-500/20 transition-all duration-500"
    >
      {/* Animated Border Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-secondary-500 to-purple-500 opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative bg-white dark:bg-slate-900 p-8 rounded-[calc(1.5rem-1px)] h-full flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-950/60 dark:to-slate-900 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-inner">
          <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary-500 transition-colors">
          {item.title}
        </h4>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

const Achievements = () => {
  return (
    <section id="achievements" className="py-28 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-500/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 rounded-full mb-6">
            Hall of Fame
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-8">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">Achievements</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-medium">
            A testament to my commitment to excellence, continuous learning, and competitive drive in the world of technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item, index) => (
            <AchievementCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
