import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Lightbulb, Rocket, Zap } from 'lucide-react';

const NextChapter = () => {
  const directions = [
    {
      title: 'Scalable Autonomous AI Agents',
      desc: 'Developing multi-agent orchestration systems that connect LLMs with custom enterprise databases and execution APIs.',
      icon: Zap,
    },
    {
      title: 'Computer Vision & Multimodal Learning',
      desc: 'Exploring real-time spatial vision algorithms for automated medical diagnostics and video telemetry.',
      icon: Compass,
    },
    {
      title: 'Interpretable Medical AI Models',
      desc: 'Expanding XAI research to create clinical decision-support systems that healthcare professionals can audit and trust.',
      icon: Lightbulb,
    },
  ];

  return (
    <section id="next" className="min-h-screen flex items-center justify-center relative px-6 py-28">
      <div className="max-w-5xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-xs font-mono text-[#63D8B5] tracking-widest uppercase block mb-2">
            CHAPTER 08 — NEXT
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#F5F7FA]">
            Future Horizon & Vision
          </h2>
          <p className="text-[#A5ACB8] text-base sm:text-lg max-w-2xl mt-3 font-light">
            Learning never stops. The next chapter focuses on building intelligent systems that solve real human challenges with precision.
          </p>
        </motion.div>

        {/* Future Focus Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {directions.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-2xl relative overflow-hidden group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#11152A] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#63D8B5] transition-colors">
                <item.icon className="w-6 h-6 text-[#63D8B5]" />
              </div>

              <h3 className="font-display text-xl font-bold text-[#F5F7FA] mb-3">
                {item.title}
              </h3>
              <p className="text-xs text-[#A5ACB8] leading-relaxed">
                {item.description || item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NextChapter;
