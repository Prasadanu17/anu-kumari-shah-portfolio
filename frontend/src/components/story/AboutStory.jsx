import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

// 3D Hover Circular Photo Component
const HoverPhoto = () => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-[220px] sm:min-h-[360px] py-2 sm:py-4">
      {/* Ambient Glow behind circle */}
      <div className="absolute w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] rounded-full bg-[#EAD9B8]/5 blur-[45px] sm:blur-[70px] pointer-events-none" />

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] md:w-[clamp(220px,22vw,300px)] md:h-[clamp(220px,22vw,300px)] rounded-full 
                   border-2 border-[#8E8170]/40 bg-[#171717]/80 backdrop-blur-md 
                   shadow-[0_0_35px_rgba(234,217,184,0.12)] 
                   hover:shadow-[0_0_55px_rgba(234,217,184,0.25)] 
                   hover:border-[#EAD9B8] 
                   transition-all duration-500 cursor-pointer group flex items-center justify-center"
      >
        {/* Inner circle container to hold image */}
        <div className="absolute inset-2 sm:inset-3 rounded-full overflow-hidden border border-white/10">
          <img
            src="/assets/profile.jpeg"
            alt="Anu Kumari Shah"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            onError={(e) => {
              e.target.src = "/assets/hero_img.png";
            }}
          />
        </div>

        {/* Outer Tech Orbit Rings */}
        <div className="absolute -inset-2 sm:-inset-3.5 rounded-full border border-dashed border-[#8E8170]/35 animate-[spin_25s_linear_infinite]" />
        <div className="absolute -inset-4 sm:-inset-6 rounded-full border border-[#8E8170]/20" />

        {/* Floating Mini Badge 1 — CGPA Top Right */}
        <div className="absolute -top-1 -right-1 sm:top-2 sm:right-[-10px] px-2.5 sm:px-3 py-1 rounded-full bg-[#1c1c1c]/95 border border-[#8E8170]/40 backdrop-blur-md shadow-lg flex items-center gap-1.5 z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse shrink-0" />
          <span className="text-[9px] sm:text-[10px] font-mono text-[#EAD9B8] font-bold whitespace-nowrap">
            10.00 CGPA
          </span>
        </div>

        {/* Floating Mini Badge 2 — Focus Bottom Left */}
        <div className="absolute -bottom-1 -left-1 sm:bottom-2 sm:left-[-10px] px-2.5 sm:px-3 py-1 rounded-full bg-[#1c1c1c]/95 border border-[#8E8170]/40 backdrop-blur-md shadow-lg flex items-center gap-1.5 z-20">
          <span className="text-[9px] sm:text-[10px] font-mono text-[#C8B99F] font-semibold whitespace-nowrap">
            AI/ML × FULL-STACK
          </span>
        </div>
      </motion.div>
    </div>
  );
};

const AboutStory = () => {
  const { education } = usePortfolio();
  return (
    <section
      id="about"
      className="relative flex flex-col justify-center px-3 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10 py-2 sm:py-4 w-full"
    >
      {/* Responsive Grid: Stacks on mobile, elegant 50/50 dual column on laptop/desktop */}
      <div className="w-full flex flex-col-reverse md:grid md:grid-cols-2 items-center gap-6 sm:gap-8 lg:gap-12">

        {/* ================= LEFT COLUMN: NARRATIVE & EDUCATION ================= */}
        <div className="w-full space-y-3 sm:space-y-4 md:space-y-5 min-w-0">

          {/* Section Marker */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAD9B8]/15 border border-[#EAD9B8]/40 shadow-[0_0_15px_rgba(234,217,184,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-mono text-[#EAD9B8] tracking-[0.2em] uppercase font-bold">
              02 // ABOUT ME
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="font-display font-extrabold text-[#EAD9B8] text-2xl sm:text-3xl md:text-4xl tracking-tight uppercase leading-snug"
          >
            ENGINEERING INTELLIGENT SYSTEMS
          </motion.h2>

          {/* Clean Storytelling Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-2 text-[#F5EBDD] text-xs sm:text-sm md:text-base font-light leading-relaxed"
          >
            <p>
              I am an MCA student at ICFAI University, Sikkim, with a deep interest in Artificial Intelligence, Machine Learning, and modern full-stack web development.
            </p>
            <p>
              With practical experience built through industry web development internships and client projects, I focus on building intelligent, scalable systems combining NLP, computer vision, and robust full-stack architecture.
            </p>
          </motion.div>

          {/* Education Information visually highlighted */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="pt-2 sm:pt-4 border-t border-[#8E8170]/20 space-y-2 sm:space-y-3"
          >
            <span className="text-[10px] sm:text-xs font-mono text-[#C8B99F] tracking-widest uppercase font-bold block">
              // ACADEMIC EDUCATION
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-3 sm:p-4 rounded-xl bg-[#1c1c1c] border border-[#8E8170]/30 hover:border-[#EAD9B8]/50 transition-all duration-300 space-y-1.5 shadow-lg min-w-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9.5px] sm:text-[11px] font-mono text-[#C8B99F]">
                      {edu.period}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#EAD9B8]/15 border border-[#EAD9B8]/30 text-[#EAD9B8] text-[9.5px] sm:text-xs font-mono font-bold">
                      CGPA: {edu.cgpa}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xs sm:text-sm text-[#EAD9B8] leading-tight">
                    {edu.degree}
                  </h3>

                  <p className="text-[10px] sm:text-xs font-mono text-[#C8B99F]">
                    {edu.institution}
                  </p>

                  <p className="text-[11px] sm:text-xs text-[#F5EBDD]/90 font-light pt-0.5 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* ================= RIGHT COLUMN: 3D HOVER CIRCULAR PHOTO ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full flex items-center justify-center my-2 sm:my-0"
        >
          <HoverPhoto />
        </motion.div>

      </div>
    </section>
  );
};

export default AboutStory;