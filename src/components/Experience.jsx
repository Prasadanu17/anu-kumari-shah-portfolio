import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experience } from "../utils/constants";

const ExperienceItem = ({ exp, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="relative mb-16 last:mb-0"
    >
      <div className="grid md:grid-cols-2 items-center gap-8 md:gap-12">
        {/* LEFT / RIGHT CARD */}
        <div className={`${isEven ? "md:text-right md:order-1" : "md:order-2"}`}>
          <motion.div
            whileHover={{ y: -4, borderColor: "#2A2825" }}
            className="bg-[#FAF8F5] p-7 rounded-2xl border border-[#D3CEC7] shadow-sm relative overflow-hidden space-y-3 transition-all duration-300"
          >
            <div className={`flex items-center gap-2 ${isEven ? "md:justify-end" : "justify-start"}`}>
              <span className="text-xs font-mono text-[#FAF8F5] px-3 py-1 rounded bg-[#2A2825] font-bold uppercase tracking-wider">
                {exp.period}
              </span>
            </div>
            <h4 className="text-xl font-bold text-[#2A2825] font-display">
              {exp.title}
            </h4>
            <p className="font-mono text-[#66625C] text-xs font-semibold uppercase tracking-wider">
              {exp.company} {exp.location ? `• ${exp.location}` : ""}
            </p>
            <p className="text-[#66625C] text-xs sm:text-sm leading-relaxed font-light">
              {exp.description}
            </p>
            {exp.technologies && (
              <div className={`flex flex-wrap gap-1.5 pt-2 ${isEven ? "md:justify-end" : "justify-start"}`}>
                {exp.technologies.map((t) => (
                  <span key={t} className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-[#E6E2DD] text-[#2A2825] border border-[#D3CEC7]">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* SPACER COLUMN FOR OPPOSITE SIDE */}
        <div className={`hidden md:block ${isEven ? "md:order-2" : "md:order-1"}`} />
      </div>

      {/* CENTER TIMELINE MARKER DOT */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 18, delay: index * 0.15 + 0.2 }}
        className="hidden md:flex absolute left-1/2 top-8 transform -translate-x-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-[#FAF8F5] border-2 border-[#2A2825] items-center justify-center shadow-md"
      >
        <div className="w-2.5 h-2.5 bg-[#2A2825] rounded-full animate-pulse" />
      </motion.div>
    </motion.div>
  );
};

const Experience = () => {
  const containerRef = useRef(null);

  // Scroll progress for vertical line growth
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-24 bg-[#ECE8E3] border-t border-[#D3CEC7]">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6"
        >
          <div>
            <span className="text-xs font-mono tracking-widest text-[#66625C] uppercase block mb-2">
              06 EXPERIENCE // INDUSTRY & ACADEMICS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2A2825] uppercase font-display">
              CAREER TIMELINE
            </h2>
          </div>
          <p className="text-xs font-mono text-[#66625C] max-w-xs uppercase leading-relaxed">
            Scroll-linked timeline reveal • industry internships & simulations
          </p>
        </motion.div>

        {/* Timeline Wrapper */}
        <div ref={containerRef} className="max-w-5xl mx-auto relative pt-4 pb-8">
          
          {/* Background Line */}
          <div className="hidden md:block absolute left-1/2 top-0 transform -translate-x-1/2 h-full w-0.5 bg-[#D3CEC7]" />

          {/* Animated Scroll Line (Progressive scaleY grow) */}
          <motion.div
            style={{ scaleY, transformOrigin: "top center" }}
            className="hidden md:block absolute left-1/2 top-0 transform -translate-x-1/2 h-full w-0.5 bg-[#2A2825] z-0"
          />

          {experience.map((exp, index) => (
            <ExperienceItem key={exp.id} exp={exp} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
