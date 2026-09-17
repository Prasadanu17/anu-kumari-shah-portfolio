import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Download, BookOpen } from 'lucide-react';
import { education, research } from '../utils/constants';

const DOMAINS = [
  {
    title: 'Deep Learning & Neural Architectures',
    desc: 'Sequence modeling with Bi-LSTM, attention mechanisms, and deep classification networks.',
    tag: 'DL / PYTORCH',
  },
  {
    title: 'NLP & Explainable AI (XAI)',
    desc: 'Contextual sentence embeddings, ATS semantic matching, and interpretability using LIME & SHAP.',
    tag: 'NLP / SBERT / XAI',
  },
  {
    title: 'Computer Vision & Human Pose',
    desc: 'Real-time spatial coordinate tracking, posture analysis, and motion estimation using OpenCV & MediaPipe.',
    tag: 'VISION / MEDIAPIPE',
  },
  {
    title: 'Full-Stack Software Architecture',
    desc: 'Production-ready web systems with React, Node.js, FastAPI, REST interfaces, and SQL/NoSQL databases.',
    tag: 'REACT / FASTAPI / SQL',
  },
];

/* ── Reusable reveal preset ── */
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const About = () => {
  const researchItem = research?.[0]; // first research entry

  return (
    <section id="about" className="py-28 sm:py-36 relative">

      {/* ── Cinematic section divider line ── */}
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
              <span>01 / ABOUT // EDITORIAL INTRODUCTION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-tight text-[#F4F4F6]">
              ENGINEERING FOUNDATION
            </h2>
          </div>
          <p className="text-xs font-mono text-[#8E95A5] max-w-sm leading-relaxed uppercase">
            Bridging theoretical mathematical algorithms with deployable, production-ready software systems.
          </p>
        </motion.div>

        {/* Main Grid: Narrative & Education (Left 5 cols) + Specialization Domains (Right 7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ── LEFT: Narrative & Education (5 cols) ── */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div {...reveal(0.05)} className="space-y-4 text-sm sm:text-base text-[#8E95A5] leading-relaxed font-light">
              <p className="text-lg sm:text-xl font-display text-[#F4F4F6] font-normal leading-snug">
                I am <strong className="text-[#38BDF8] font-semibold">Anu Kumari Shah</strong>, an AI/ML Engineer and Full-Stack Developer currently based in Gangtok, Sikkim.
              </p>
              <p>
                My work centers at the intersection of deep sequence modeling, Explainable AI, and resilient web application architecture.
              </p>
              <p>
                Currently pursuing my Master of Computer Applications with a flawless academic record (<strong className="text-emerald-400 font-mono font-semibold">10.00 CGPA</strong>),
                I combine rigorous computer science fundamentals with hands-on industrial internship experience across production web applications.
              </p>
            </motion.div>

            {/* Academic Credentials Strip */}
            <motion.div {...reveal(0.1)} className="space-y-4 pt-2">
              <span className="text-[11px] font-mono text-[#8E95A5] uppercase tracking-wider block">
                FORMAL ACADEMIC DEGREES
              </span>

              <div className="space-y-3">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-5 rounded-xl border border-white/[0.08] bg-[#0E1017]/75 backdrop-blur-md hover:border-white/20 transition-all duration-300 space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#38BDF8]" />
                        <h4 className="text-sm font-display font-bold text-[#F4F4F6]">
                          {edu.degree}
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded font-semibold">
                        {edu.cgpa}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-[#8E95A5]">
                      <span>{edu.institution}</span>
                      <span className="text-[#5D6473]">{edu.period}</span>
                    </div>

                    <p className="text-xs text-[#8E95A5] font-light leading-relaxed pt-1">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Research Highlight Card */}
            {researchItem && (
              <motion.div
                {...reveal(0.15)}
                className="p-5 rounded-xl border border-[#38BDF8]/20 bg-[#38BDF8]/[0.04] backdrop-blur-md space-y-2"
              >
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#38BDF8] uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>ONGOING RESEARCH</span>
                </div>
                <h4 className="text-sm font-display font-bold text-[#F4F4F6] leading-snug">
                  {researchItem.title}
                </h4>
                <p className="text-xs text-[#8E95A5] leading-relaxed font-light">
                  {researchItem.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {researchItem.methodology.map((m) => (
                    <span key={m} className="px-2 py-0.5 rounded text-[10px] font-mono text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/20">
                      {m}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Resume Action */}
            <motion.div {...reveal(0.2)} className="pt-2">
              <a
                href="/assets/Anu Kumari Shah-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 bg-white/[0.04] text-[#F4F4F6] hover:bg-white/[0.08] hover:border-white/30 text-xs font-mono font-medium tracking-wider uppercase transition-all duration-200"
              >
                <Download className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>DOWNLOAD COMPLETE RESUME (PDF)</span>
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT: Technical Focus Domains (7 cols) ── */}
          <div className="lg:col-span-7 space-y-4">
            <motion.span {...reveal(0.05)} className="text-[11px] font-mono text-[#8E95A5] uppercase tracking-wider block mb-2">
              CORE SPECIALIZATIONS & PILLARS
            </motion.span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DOMAINS.map((domain, i) => (
                <motion.div
                  key={domain.title}
                  {...reveal(0.08 + i * 0.06)}
                  className="p-5 rounded-xl border border-white/[0.08] bg-[#0E1017]/75 backdrop-blur-md hover:border-[#38BDF8]/40 transition-all duration-300 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#38BDF8] tracking-widest uppercase block">
                      {domain.tag}
                    </span>
                    <h3 className="text-sm font-display font-bold text-[#F4F4F6] group-hover:text-white transition-colors">
                      {domain.title}
                    </h3>
                    <p className="text-xs text-[#8E95A5] leading-relaxed font-light">
                      {domain.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-[#5D6473]">
                    <span>FOCUS AREA</span>
                    <span>0{i + 1}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Industrial Philosophy Card */}
            <motion.div
              {...reveal(0.3)}
              className="p-6 rounded-xl border border-white/[0.08] bg-gradient-to-r from-[#0E1017]/90 to-[#131622]/90 backdrop-blur-md space-y-2 mt-4"
            >
              <div className="text-[11px] font-mono text-[#38BDF8] uppercase tracking-wider">
                ENGINEERING PHILOSOPHY
              </div>
              <p className="text-xs sm:text-sm text-[#8E95A5] leading-relaxed italic font-light">
                "An intelligent model is only as valuable as its transparency, explainability, and real-world deployment reliability.
                I engineer systems that bridge statistical learning with high-concurrency production interfaces."
              </p>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
