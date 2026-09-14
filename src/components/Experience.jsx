import React from "react";
import { motion } from "framer-motion";
import { experience } from "../utils/constants";

const ExperienceItem = ({ exp, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative mb-12"
    >
      <div className="grid md:grid-cols-2 items-center gap-8">
        {/* LEFT COLUMN */}
        <div className={`${isEven ? "md:text-right" : "md:order-2"}`}>
          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#D3CEC7] shadow-sm relative overflow-hidden space-y-3">
            <span className="text-xs font-mono text-[#FAF8F5] px-2.5 py-1 rounded bg-[#2A2825] inline-block font-bold">
              {exp.period}
            </span>
            <h4 className="text-xl font-bold text-[#2A2825] font-display">
              {exp.title}
            </h4>
            <p className="font-mono text-[#66625C] text-xs font-semibold">
              {exp.company} {exp.location ? `• ${exp.location}` : ""}
            </p>
            <p className="text-[#66625C] text-xs sm:text-sm leading-relaxed font-light">
              {exp.description}
            </p>
            {exp.technologies && (
              <div className={`flex flex-wrap gap-1.5 pt-2 ${isEven ? "md:justify-end" : "justify-start"}`}>
                {exp.technologies.map((t) => (
                  <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#E6E2DD] text-[#2A2825] border border-[#D3CEC7]">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN EMPTY SPACER */}
        <div className={`hidden md:block ${isEven ? "md:order-2" : "md:order-1"}`} />
      </div>

      {/* CENTER DOT */}
      <div className="hidden md:block absolute left-1/2 top-6 transform -translate-x-1/2 z-10">
        <div className="w-3.5 h-3.5 bg-[#2A2825] rounded-full border-4 border-[#ECE8E3]" />
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-[#ECE8E3] border-t border-[#D3CEC7]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-xs font-mono text-[#66625C] uppercase tracking-widest block mb-2">
            02 FOCUS // EXPERIENCE & RESEARCH
          </span>

          <h3 className="text-3xl lg:text-4xl font-bold text-[#2A2825] uppercase font-display">
            Professional & Academic Timeline
          </h3>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 transform -translate-x-1/2 h-full w-0.5 bg-[#D3CEC7]"></div>

          {experience.map((exp, index) => (
            <ExperienceItem key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
