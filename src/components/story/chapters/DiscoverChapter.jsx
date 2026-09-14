import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, LineChart, Binary, Sparkles } from 'lucide-react';

const DiscoverChapter = () => {
  const milestones = [
    {
      title: 'Deloitte Data Analytics Simulation',
      organization: 'Forage Virtual Experience (2026)',
      description: 'Applied data cleaning, exploratory data analysis (EDA), and data storytelling to extract actionable intelligence from complex corporate datasets.',
      icon: LineChart,
    },
    {
      title: 'Transition to Machine Learning',
      organization: 'Python AI Ecosystem',
      description: 'Bridged full stack web development with machine learning algorithms, mastering NumPy, Pandas, Scikit-learn, and feature engineering.',
      icon: Binary,
    },
    {
      title: 'Intelligent System Architecture',
      organization: 'Full-Stack + AI Integration',
      description: 'Moving beyond static interfaces to build dynamic applications powered by real-time predictive models and natural language pipelines.',
      icon: Cpu,
    },
  ];

  return (
    <section id="discover" className="min-h-screen flex items-center justify-center relative px-6 py-28">
      <div className="max-w-5xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-xs font-mono text-[#63D8B5] tracking-widest uppercase block mb-2">
            CHAPTER 04 — DISCOVER
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#F5F7FA]">
            The Pivot Toward Intelligence
          </h2>
          <p className="text-[#A5ACB8] text-base sm:text-lg max-w-2xl mt-3 font-light">
            Web development taught me how to present information. Data science & machine learning taught me how to generate intelligence from it.
          </p>
        </motion.div>

        {/* Pivot Nodes */}
        <div className="grid md:grid-cols-3 gap-6">
          {milestones.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-2xl relative overflow-hidden group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#11152A] border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:border-[#63D8B5] transition-colors">
                <item.icon className="w-6 h-6 text-[#63D8B5]" />
              </div>

              <h3 className="font-display text-xl font-bold text-[#F5F7FA] mb-1">
                {item.title}
              </h3>
              <div className="text-xs font-mono text-indigo-400 mb-3">
                {item.organization}
              </div>
              <p className="text-xs text-[#A5ACB8] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverChapter;
