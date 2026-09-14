import React from 'react';
import { motion } from 'framer-motion';

const CuriousChapter = () => {
  return (
    <section id="curious" className="min-h-screen flex items-center justify-center relative px-6 py-32">
      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#11152A]/80 border border-indigo-500/30 text-xs font-mono text-[#63D8B5] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#63D8B5] animate-ping" />
          CHAPTER 01 — CURIOUS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-[#F5F7FA] mb-8 leading-[1.08]"
        >
          Curiosity became code.
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#63D8B5]">
            Code became intelligence.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl text-[#A5ACB8] max-w-2xl mx-auto font-light leading-relaxed mb-12"
        >
          I am <strong className="text-[#F5F7FA] font-medium">Anu Kumari Shah</strong> — an AI/ML Engineer and Full Stack Developer exploring how intelligent algorithms transform raw curiosity into real-world impact.
        </motion.p>

        {/* Story Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3 text-xs font-mono text-[#A5ACB8]/60"
        >
          <span>SCROLL TO TRAVEL THROUGH THE STORY</span>
          <div className="w-5 h-9 rounded-full border border-white/20 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-2 rounded-full bg-[#63D8B5]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CuriousChapter;
