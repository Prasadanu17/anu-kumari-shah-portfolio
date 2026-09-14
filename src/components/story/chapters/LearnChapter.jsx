import React from 'react';
import { motion } from 'framer-motion';

const LearnChapter = () => {
  const education = [
    {
      degree: 'Master of Computer Applications (MCA)',
      institution: 'ICFAI University, Sikkim',
      period: '2025 — 2027',
      focus: 'Advanced Artificial Intelligence, Machine Learning, Deep Learning & System Design',
      status: 'Current Academic Focus'
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'SRM University, Sikkim',
      period: '2022 — 2025',
      focus: 'Computer Science Core, Data Structures, Web Architecture & Database Engineering',
      status: 'Graduated'
    }
  ];

  return (
    <section id="learn" className="min-h-screen flex items-center justify-center relative px-6 py-28">
      <div className="max-w-5xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-xs font-mono text-[#63D8B5] tracking-widest uppercase block mb-2">
            CHAPTER 02 — LEARN
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#F5F7FA]">
            Foundations & Academic Rigor
          </h2>
          <p className="text-[#A5ACB8] text-base sm:text-lg max-w-2xl mt-3 font-light">
            Every breakthrough starts with structured understanding. My academic journey provided the mathematical & theoretical bedrock for modern AI.
          </p>
        </motion.div>

        {/* Education Timeline */}
        <div className="grid md:grid-cols-2 gap-8">
          {education.map((item, idx) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-[#63D8B5]/10 transition-colors" />
              
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 rounded-full bg-[#11152A] border border-white/10 text-xs font-mono text-[#63D8B5]">
                  {item.period}
                </span>
                <span className="text-xs font-mono text-[#A5ACB8]/70">
                  {item.status}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-[#F5F7FA] mb-2 group-hover:text-[#63D8B5] transition-colors">
                {item.degree}
              </h3>
              <div className="text-sm font-semibold text-indigo-400 mb-4">
                {item.institution}
              </div>
              <p className="text-sm text-[#A5ACB8] leading-relaxed">
                {item.focus}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearnChapter;
