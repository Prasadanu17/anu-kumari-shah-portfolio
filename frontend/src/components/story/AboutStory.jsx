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
    <div className="relative flex items-center justify-center w-full min-h-[180px] sm:min-h-[380px]">
      {/* Ambient Glow behind circle */}
      <div className="absolute w-[140px] h-[140px] sm:w-[360px] sm:h-[360px] rounded-full bg-[#EAD9B8]/5 blur-[40px] sm:blur-[80px] pointer-events-none" />

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-[clamp(120px,22vw,330px)] h-[clamp(120px,22vw,330px)] rounded-full 
                   border-2 border-[#8E8170]/40 bg-[#171717]/80 backdrop-blur-md 
                   shadow-[0_0_40px_rgba(234,217,184,0.1)] 
                   hover:shadow-[0_0_60px_rgba(234,217,184,0.2)] 
                   hover:border-[#EAD9B8] 
                   transition-all duration-500 cursor-pointer group"
      >
        {/* Inner circle container to hold image */}
        <div className="absolute inset-1.5 sm:inset-2.5 rounded-full overflow-hidden border border-white/10">
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
        <div className="absolute -inset-1.5 sm:-inset-3.5 rounded-full border border-dashed border-[#8E8170]/35 animate-[spin_25s_linear_infinite]" />
        <div className="absolute -inset-3 sm:-inset-7 rounded-full border border-[#8E8170]/20" />
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
      {/* Equal 2-Column Responsive Grid (50% / 50%) */}
      <div className="w-full grid grid-cols-2 items-center gap-2.5 sm:gap-6 lg:gap-12">

        {/* ================= LEFT COLUMN: NARRATIVE & EDUCATION (50%) ================= */}
        <div className="space-y-2 sm:space-y-3.5 md:space-y-4">

          {/* Section Marker */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <span className="text-[7.5px] sm:text-xs font-mono text-[#C8B99F] tracking-wider sm:tracking-widest uppercase font-bold">02 / ABOUT ME</span>
            <div className="h-px w-8 sm:w-12 bg-[#8E8170]/40" />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-[#EAD9B8] text-[clamp(0.95rem,2.8vw,2rem)] sm:text-2xl md:text-3xl tracking-tight uppercase leading-snug"
          >
            ENGINEERING INTELLIGENT SYSTEMS
          </motion.h2>

          {/* Clean Storytelling Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-1 sm:space-y-2.5 text-[#F5EBDD] text-[8px] sm:text-sm md:text-base font-light leading-relaxed"
          >
            <p>
              I am an MCA student at ICFAI University, Sikkim, with a deep interest in Artificial Intelligence, Machine Learning, and modern full-stack web development.
            </p>
            <p className="hidden xs:block">
              With practical experience built through industry web development internships and client projects, I focus on building intelligent, scalable systems combining NLP, computer vision, and robust full-stack architecture.
            </p>
          </motion.div>

          {/* Education Information visually highlighted */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-2 sm:pt-4 border-t border-[#8E8170]/20 space-y-1.5 sm:space-y-2.5"
          >
            <span className="text-[7.5px] sm:text-[11px] font-mono text-[#C8B99F] tracking-widest uppercase font-bold block">
              // ACADEMIC EDUCATION
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-3">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-1.5 sm:p-3.5 rounded-lg sm:rounded-xl bg-[#1c1c1c] border border-[#8E8170]/25 hover:border-[#EAD9B8]/40 transition-all duration-300 space-y-0.5 sm:space-y-1.5 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[6.5px] sm:text-[10px] font-mono text-[#C8B99F]">
                      {edu.period}
                    </span>
                    <span className="px-1 sm:px-2 py-0.5 rounded bg-[#EAD9B8]/15 border border-[#EAD9B8]/30 text-[#EAD9B8] text-[7px] sm:text-xs font-mono font-bold">
                      CGPA: {edu.cgpa}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-[8.5px] sm:text-sm text-[#EAD9B8] leading-tight">
                    {edu.degree}
                  </h3>

                  <p className="text-[7px] sm:text-xs font-mono text-[#C8B99F]">
                    {edu.institution}
                  </p>

                  <p className="text-[7px] sm:text-xs text-[#F5EBDD]/90 font-light pt-0.5 leading-relaxed hidden sm:block">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* ================= RIGHT COLUMN: 3D HOVER CIRCULAR PHOTO (50%) ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full flex items-center justify-center"
        >
          <HoverPhoto />
        </motion.div>

      </div>
    </section>
  );
};

export default AboutStory;