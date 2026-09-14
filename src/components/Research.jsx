import React from "react";
import { motion } from "framer-motion";
import { research } from "../utils/constants";

const methodChipVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 18,
      delay: 0.3 + i * 0.07,
    },
  }),
};

const Research = () => {
  const paper = research[0];

  return (
    <section id="research" className="py-24 bg-[#E6E2DD] relative border-t border-[#D3CEC7]">
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <span className="text-xs font-mono tracking-widest text-[#66625C] uppercase block mb-2">
              07 RESEARCH // CO-AUTHORSHIP
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2A2825] uppercase font-display">
              RESEARCH WORK
            </h2>
          </div>
          <p className="text-xs font-mono text-[#66625C] max-w-xs uppercase leading-relaxed">
            Current academic research in AI / ML & Explainable AI
          </p>
        </motion.div>

        {/* Research Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-[#FAF8F5] border border-[#D3CEC7] rounded-2xl overflow-hidden shadow-sm"
        >
          {/* Card Top Bar */}
          <div className="border-b border-[#D3CEC7] px-8 py-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#2A2825] rounded-full animate-pulse" />
              <span className="text-xs font-mono text-[#66625C] uppercase tracking-wider">
                {paper.role}
              </span>
            </div>
            <span className="text-xs font-mono text-[#2A2825] bg-[#E6E2DD] px-3 py-1 rounded border border-[#D3CEC7]">
              {paper.period}
            </span>
          </div>

          <div className="p-8 md:p-12 space-y-10">

            {/* Paper Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-[#2A2825] font-display leading-snug max-w-3xl">
                "{paper.title}"
              </h3>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#66625C] leading-relaxed font-light text-base max-w-3xl"
            >
              {paper.description}
            </motion.p>

            {/* Methodology Chips */}
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="text-xs font-mono text-[#2A2825] uppercase tracking-wider font-bold block mb-4"
              >
                METHODOLOGY & TOOLS
              </motion.span>

              <div className="flex flex-wrap gap-3">
                {paper.methodology.map((method, i) => (
                  <motion.span
                    key={method}
                    custom={i}
                    variants={methodChipVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "#2A2825",
                      color: "#FAF8F5",
                      borderColor: "#2A2825",
                    }}
                    className="px-4 py-2 rounded-full bg-[#E6E2DD] border border-[#D3CEC7] text-[#2A2825] text-xs font-mono font-semibold tracking-wide cursor-default transition-colors"
                  >
                    {method}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Bottom note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="pt-4 border-t border-[#D3CEC7] flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#2A2825] rounded-full" />
                <span className="text-xs font-mono text-[#66625C] uppercase tracking-wider">
                  Under active research
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#2A2825] rounded-full" />
                <span className="text-xs font-mono text-[#66625C] uppercase tracking-wider">
                  Focus: Social media NLP + Explainability
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#2A2825] rounded-full" />
                <span className="text-xs font-mono text-[#66625C] uppercase tracking-wider">
                  Bi-LSTM Attention Architecture
                </span>
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Research;
