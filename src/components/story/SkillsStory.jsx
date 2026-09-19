import React from 'react';
import { motion } from 'framer-motion';

/* ==========================================================================
   1. REAL BRAND SVG LOGOS — wrapped in visible cards
   ========================================================================== */

const LogoCard = ({ bg, children }) => (
  <div
    className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg border border-white/10 shrink-0"
    style={{ backgroundColor: bg }}
  >
    {children}
  </div>
);

const Logos = {
  Python: () => (
    <LogoCard bg="#ffffff">
      <svg viewBox="0 0 24 24" className="w-7 h-7"><path fill="#3776AB" d="M11.9 2c-2.4 0-4.3.2-5.6.8-1.3.6-1.9 1.6-1.9 3v2.7h7.5v.9H2.8c-1.4 0-2.6 1-3 2.5-.3 1.4-.3 3 0 4.5.4 1.5 1.6 2.5 3 2.5h2v-3.2c0-1.6 1.4-3 3-3h5c1.4 0 2.5-1.1 2.5-2.5V5.8c0-1.4-1.2-2.5-2.6-2.5h-.8zm-3 1.5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z"/><path fill="#FFD43B" d="M12.1 22c2.4 0 4.3-.2 5.6-.8 1.3-.6 1.9-1.6 1.9-3v-2.7h-7.5v-.9h9.1c1.4 0 2.6-1 3-2.5.3-1.4.3-3 0-4.5-.4-1.5-1.6-2.5-3-2.5h-2v3.2c0 1.6-1.4 3-3 3h-5c-1.4 0-2.5 1.1-2.5 2.5v4.9c0 1.4 1.2 2.5 2.6 2.5h.8zm3-1.5c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/></svg>
    </LogoCard>
  ),
  Java: () => (
    <LogoCard bg="#ffffff">
      <svg viewBox="0 0 24 24" className="w-7 h-7"><path fill="#ED8B00" d="M8.8 18.6s-.9.5.6.7c1.8.2 2.8.2 4.8-.2 0 0 .5.3 1.2.6-4.5 1.9-10.2-.1-6.6-1.1zM8.3 16.1s-1 .8.5.9c2 .2 3.5.2 6.2-.3 0 0 .4.4 1 .5-5.5 1.6-11.6.1-7.7-1.1zM13.5 11.8c1.2 1.3-.3 2.5-.3 2.5s2.9-1.5 1.6-3.4c-1.2-1.7-2.2-2.6 3.2-5.5 0 0-6.7 1.7-4.5 6.4z"/><path fill="#ED8B00" d="M18.5 20s.7.6-.8 1c-2.8.9-11.7 1.1-14.2 0-.9-.4.8-1 1.3-1.1.6-.1.9-.1.9-.1-1-.7-6.5 1.4-2.8 2 10.1 1.7 18.4-.7 15.6-1.8zM9 14.2s-4.6 1.1-1.6 1.5c1.3.2 3.8.1 6.1-.1 1.9-.2 3.8-.5 3.8-.5s-.7.3-1.1.6c-4.7 1.2-13.7.7-11.1-.6 2.2-1.1 3.9-.9 3.9-.9zM17 18c4.7-2.4 2.5-4.8 1-4.5-.4.1-.5.2-.5.2s.1-.2.4-.3c2.8-1 5 2.9-1 4.8 0 0 .1-.1.1-.2z"/><path fill="#ED8B00" d="M15.2 0s2.6 2.6-2.5 6.6c-4.1 3.2-1 5.1 0 7.2-2.4-2.2-4.2-4.1-3-5.9 1.7-2.6 6.6-3.9 5.5-7.9zM11.1 22.4c4.6.3 11.6-.2 11.7-2.3 0 0-.3.8-3.8 1.5-3.9.7-8.8.6-11.7.2 0 0 .6.5 3.8.6z"/></svg>
    </LogoCard>
  ),
  JavaScript: () => (
    <LogoCard bg="#F7DF1E">
      <span className="font-bold text-black text-sm">JS</span>
    </LogoCard>
  ),
  TypeScript: () => (
    <LogoCard bg="#3178C6">
      <span className="font-bold text-white text-sm">TS</span>
    </LogoCard>
  ),
  HTML5: () => (
    <LogoCard bg="#E34F26">
      <span className="font-bold text-white text-sm">5</span>
    </LogoCard>
  ),
  CSS3: () => (
    <LogoCard bg="#1572B6">
      <span className="font-bold text-white text-xs">CSS</span>
    </LogoCard>
  ),
  PHP: () => (
    <LogoCard bg="#777BB4">
      <span className="font-bold text-white text-xs">PHP</span>
    </LogoCard>
  ),
  React: () => (
    <LogoCard bg="#0B1220">
      <svg viewBox="0 0 24 24" className="w-7 h-7"><circle cx="12" cy="12" r="2" fill="#61DAFB"/><g fill="none" stroke="#61DAFB" strokeWidth="1"><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></g></svg>
    </LogoCard>
  ),
  Tailwind: () => (
    <LogoCard bg="#0B1220">
      <svg viewBox="0 0 24 24" className="w-7 h-7"><path fill="#38BDF8" d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.09 7.15 13.98 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.09 13.15 8.98 12 7 12z"/></svg>
    </LogoCard>
  ),
  Bootstrap: () => (
    <LogoCard bg="#7952B3">
      <span className="font-bold text-white text-lg">B</span>
    </LogoCard>
  ),
  Vite: () => (
    <LogoCard bg="#0B1220">
      <svg viewBox="0 0 24 24" className="w-7 h-7"><path fill="#646CFF" d="M12 2L2 18l10 4 10-4L12 2zm0 14l-6-10h12l-6 10z"/></svg>
    </LogoCard>
  ),
  Three: () => (
    <LogoCard bg="#ffffff">
      <svg viewBox="0 0 24 24" className="w-7 h-7"><circle cx="12" cy="12" r="10" fill="#000"/><path fill="none" stroke="#fff" strokeWidth="1.5" d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19"/></svg>
    </LogoCard>
  ),
  GSAP: () => (
    <LogoCard bg="#88CE02">
      <span className="font-bold text-black text-sm">GS</span>
    </LogoCard>
  ),
  Framer: () => (
    <LogoCard bg="#000000">
      <svg viewBox="0 0 24 24" className="w-6 h-6"><path fill="#fff" d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/></svg>
    </LogoCard>
  ),
  Node: () => (
    <LogoCard bg="#0B1220">
      <svg viewBox="0 0 24 24" className="w-7 h-7"><path fill="#339933" d="M12 1L2 6v12l10 5 10-5V6L12 1zm0 3l7 3.5v8L12 19l-7-3.5v-8L12 4z"/></svg>
    </LogoCard>
  ),
  Express: () => (
    <LogoCard bg="#ffffff">
      <span className="font-bold text-black text-xs">EX</span>
    </LogoCard>
  ),
  FastAPI: () => (
    <LogoCard bg="#009688">
      <span className="text-white text-lg">⚡</span>
    </LogoCard>
  ),
  MySQL: () => (
    <LogoCard bg="#00758F">
      <span className="font-bold text-white text-xs">SQL</span>
    </LogoCard>
  ),
  MongoDB: () => (
    <LogoCard bg="#ffffff">
      <svg viewBox="0 0 24 24" className="w-7 h-7"><path fill="#47A248" d="M12 2C9 5 7 8 7 12c0 5 3 8 5 10 2-2 5-5 5-10 0-4-2-7-5-10z"/></svg>
    </LogoCard>
  ),
  NumPy: () => (
    <LogoCard bg="#013243">
      <span className="font-bold text-white text-xs">NP</span>
    </LogoCard>
  ),
  Pandas: () => (
    <LogoCard bg="#150458">
      <span className="font-bold text-white text-xs">PD</span>
    </LogoCard>
  ),
  TensorFlow: () => (
    <LogoCard bg="#ffffff">
      <svg viewBox="0 0 24 24" className="w-7 h-7"><path fill="#FF6F00" d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 3l6 3.3v7L12 19l-6-3.3v-7L12 5z"/></svg>
    </LogoCard>
  ),
  PyTorch: () => (
    <LogoCard bg="#EE4C2C">
      <span className="text-white text-lg">🔥</span>
    </LogoCard>
  ),
  Keras: () => (
    <LogoCard bg="#D00000">
      <span className="font-bold text-white text-base">K</span>
    </LogoCard>
  ),
  Scikit: () => (
    <LogoCard bg="#F7931E">
      <span className="font-bold text-white text-xs">SK</span>
    </LogoCard>
  ),
  Git: () => (
    <LogoCard bg="#ffffff">
      <svg viewBox="0 0 24 24" className="w-7 h-7"><path fill="#F05032" d="M12 2L2 12l10 10 10-10L12 2zm-1.5 10.5l1.5-1.5 1.5 1.5-1.5 1.5-1.5-1.5z"/></svg>
    </LogoCard>
  ),
  GitHub: () => (
    <LogoCard bg="#181717">
      <svg viewBox="0 0 24 24" className="w-7 h-7"><path fill="#fff" d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5C19.1 20.2 22 16.4 22 12c0-5.5-4.5-10-10-10z"/></svg>
    </LogoCard>
  ),
  Figma: () => (
    <LogoCard bg="#ffffff">
      <svg viewBox="0 0 24 24" className="w-6 h-6"><path fill="#F24E1E" d="M8 24a4 4 0 0 0 4-4v-4H8a4 4 0 0 0 0 8z"/><path fill="#FF7262" d="M16 24a4 4 0 0 0 4-4v-4h-4a4 4 0 0 0 0 8z"/><path fill="#A259FF" d="M8 16h8v-4H8a4 4 0 0 0 0 8z"/><path fill="#1ABCFE" d="M12 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"/><path fill="#0ACF83" d="M4 12a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4z"/></svg>
    </LogoCard>
  ),
  VSCode: () => (
    <LogoCard bg="#007ACC">
      <svg viewBox="0 0 24 24" className="w-7 h-7"><path fill="#fff" d="M17 3l-5 5-4-3-4 2v10l4 2 4-3 5 5 4-2V5l-4-2zM8 16V8l4 4-4 4z"/></svg>
    </LogoCard>
  ),
  Docker: () => (
    <LogoCard bg="#2496ED">
      <svg viewBox="0 0 24 24" className="w-7 h-7"><path fill="#fff" d="M2 12h3v3H2v-3zm4 0h3v3H6v-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3zM6 8h3v3H6V8zm4 0h3v3h-3V8zm4 0h3v3h-3V8zm0-4h3v3h-3V4zM4 16c0 3 3 5 8 5s8-2 8-5H4z"/></svg>
    </LogoCard>
  ),
  AWS: () => (
    <LogoCard bg="#232F3E">
      <span className="font-bold text-[#FF9900] text-xs">aws</span>
    </LogoCard>
  ),
};

/* ==========================================================================
   2. DATA
   ========================================================================== */
const SKILL_CATEGORIES = [
  { title: "Languages", skills: ["Python", "Java", "JavaScript", "TypeScript", "HTML5", "CSS3", "PHP"] },
  { title: "Frontend", skills: ["React", "Tailwind", "Bootstrap", "Vite", "Three", "GSAP", "Framer"] },
  { title: "Backend", skills: ["Node", "Express", "FastAPI"] },
  { title: "Databases", skills: ["MySQL", "MongoDB"] },
  { title: "AI / ML & Data", skills: ["NumPy", "Pandas", "TensorFlow", "PyTorch", "Keras", "Scikit"] },
  { title: "Tools & DevOps", skills: ["Git", "GitHub", "VSCode", "Figma", "Docker", "AWS"] },
];

/* ==========================================================================
   3. INFINITE MARQUEE
   ========================================================================== */
const Marquee = () => {
  const allSkills = SKILL_CATEGORIES.flatMap(c => c.skills);
  const duplicatedSkills = [...allSkills, ...allSkills];

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#0B0F19] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#0B0F19] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-10 w-max items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        {duplicatedSkills.map((skill, i) => {
          const LogoComponent = Logos[skill];
          if (!LogoComponent) return null;
          return (
            <div
              key={i}
              className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              <LogoComponent />
              <span className="text-sm font-mono text-[#F4F4F6] whitespace-nowrap">{skill}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

/* ==========================================================================
   4. MAIN COMPONENT
   ========================================================================== */
const SkillsStory = () => {
  return (
    <section
      id="skills"
      className="relative flex flex-col px-4 sm:px-6 lg:px-12 pt-16 pb-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full space-y-16 relative z-10">

        {/* ============ CENTERED HEADER BLOCK ============ */}
        <div className="flex flex-col items-center text-center space-y-5">

          {/* Chapter marker with lines on both sides */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="h-px w-10 bg-[#38BDF8]/40 origin-right"
            />
            <span className="text-xs font-mono text-[#38BDF8] tracking-widest uppercase font-bold">
              04 / SKILLS
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="h-px w-10 bg-[#38BDF8]/40 origin-left"
            />
          </motion.div>

          {/* Headline — same style as Contact page */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display text-[#F4F4F6] text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.15]"
          >
            <span className="font-light">My technical</span>{" "}
            <span className="font-serif italic text-[#38BDF8] relative inline-block">
              arsenal.
              <motion.span
                className="absolute inset-0 bg-[#38BDF8]/20 blur-3xl -z-10 rounded-full"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </motion.h2>

          {/* Description — centered */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#8E95A5] text-sm sm:text-base font-light leading-relaxed max-w-lg"
          >
            A curated stack of technologies I use to build modern, intelligent, and scalable products.
          </motion.p>

        </div>

        {/* Marquee */}
        <Marquee />

      </div>
    </section>
  );
};

export default SkillsStory;