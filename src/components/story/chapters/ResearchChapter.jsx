import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Award, Eye, Network, CheckCircle } from 'lucide-react';

const ResearchChapter = () => {
  const highlights = [
    {
      label: 'Model Architecture',
      value: 'Bi-LSTM + Attention Mechanism',
      desc: 'Captures long-range contextual semantic dependencies in informal social text.',
    },
    {
      label: 'Explainable AI (XAI)',
      value: 'LIME & SHAP Integration',
      desc: 'Provides transparent token-level feature attribution for clinical interpretability.',
    },
    {
      label: 'Benchmark Accuracy',
      value: '94.0% Metric Performance',
      desc: 'Outperformed baseline NLP models on standardized mental health benchmark datasets.',
    },
  ];

  return (
    <section id="research" className="min-h-screen flex items-center justify-center relative px-6 py-28">
      <div className="max-w-5xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-xs font-mono text-[#63D8B5] tracking-widest uppercase block mb-2">
            CHAPTER 06 — RESEARCH
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#F5F7FA]">
            Machine Learning Research & XAI
          </h2>
          <p className="text-[#A5ACB8] text-base sm:text-lg max-w-2xl mt-3 font-light">
            Investigating explainable neural networks to ensure AI models are not black boxes, but interpretable diagnostics.
          </p>
        </motion.div>

        {/* Featured Research Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-card p-8 sm:p-10 rounded-3xl relative overflow-hidden mb-8 border border-indigo-500/20"
        >
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11152A] border border-indigo-500/30 text-xs font-mono text-[#63D8B5]">
              <FileText className="w-3.5 h-3.5" />
              <span>CO-AUTHOR — RESEARCH PAPER</span>
            </div>
            <span className="text-xs font-mono text-[#A5ACB8]">
              2026 — PRESENT
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F7FA] mb-4 leading-snug">
            Depression Detection from Social Media via Explainable Deep Learning
          </h3>

          <p className="text-sm sm:text-base text-[#A5ACB8] leading-relaxed mb-8 max-w-3xl">
            Developing end-to-end deep learning pipelines for early detection of depressive signals in user social media text. Combining Bi-directional LSTMs with attention mechanisms to weigh key linguistic markers, paired with LIME and SHAP for model transparency.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((h) => (
              <div key={h.label} className="p-5 rounded-xl bg-[#0B0D12]/60 border border-white/5">
                <span className="text-[11px] font-mono text-indigo-400 block mb-1">
                  {h.label}
                </span>
                <div className="font-display text-lg font-bold text-[#F5F7FA] mb-2">
                  {h.value}
                </div>
                <p className="text-xs text-[#A5ACB8]">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchChapter;
