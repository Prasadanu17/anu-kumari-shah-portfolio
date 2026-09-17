import React from "react";
import { motion } from "framer-motion";
import { experience } from "../utils/constants";
import { MapPin } from "lucide-react";

/* ── Reusable reveal preset ── */
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const Experience = () => {
  return (
    <section id="experience" className="py-28 sm:py-36 relative">

      {/* ── Cinematic section divider ── */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

      <div className="story-container">

        {/* Section Header */}
        <motion.div
          {...reveal()}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span>02 / EXPERIENCE // INDUSTRY PRACTICE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-tight text-[#F4F4F6]">
              WORK & INTERNSHIPS
            </h2>
          </div>
          <p className="text-xs font-mono text-[#8E95A5] max-w-sm leading-relaxed uppercase">
            Practical engineering experience spanning full-stack production deployments, cybersecurity, and data analytics.
          </p>
        </motion.div>

        {/* Clean Editorial Timeline */}
        <div className="relative border-l border-white/[0.1] ml-4 sm:ml-6 space-y-14 pl-6 sm:pl-10">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              {...reveal(index * 0.1)}
              className="relative group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#07080B] border-2 border-[#38BDF8] group-hover:bg-[#38BDF8] transition-colors duration-300 shadow-sm shadow-[#38BDF8]/40" />

              {/* Experience Card */}
              <div className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#0E1017]/75 backdrop-blur-md hover:border-[#38BDF8]/40 transition-all duration-300 space-y-4 shadow-xl">
                {/* Period & Location Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <span className="px-3 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[#38BDF8] font-bold uppercase tracking-wider">
                    {exp.period}
                  </span>
                  {exp.location && (
                    <span className="flex items-center gap-1.5 text-[#8E95A5]">
                      <MapPin className="w-3.5 h-3.5 text-[#5D6473]" />
                      <span>{exp.location}</span>
                    </span>
                  )}
                </div>

                {/* Role & Company Header */}
                <div className="space-y-1 border-b border-white/[0.06] pb-4">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#F4F4F6] group-hover:text-white transition-colors">
                    {exp.title}
                  </h3>
                  <div className="text-sm font-mono text-[#8E95A5] font-medium uppercase tracking-wide">
                    {exp.company}
                  </div>
                </div>

                {/* Detailed Description */}
                <p className="text-xs sm:text-sm text-[#8E95A5] leading-relaxed font-light">
                  {exp.description}
                </p>

                {/* Technology Badges */}
                {exp.technologies && (
                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-[#5D6473] uppercase tracking-wider block mb-2">
                      CORE TECHNOLOGIES:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded text-[11px] font-mono text-[#E4E4E7] bg-white/[0.03] border border-white/[0.06] hover:border-white/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
