import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { education } from '../../utils/constants';

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
      <div className="absolute w-[140px] h-[140px] sm:w-[360px] sm:h-[360px] rounded-full bg-[#1e6f5c]/15 blur-[40px] sm:blur-[80px] pointer-events-none" />

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-[clamp(120px,22vw,330px)] h-[clamp(120px,22vw,330px)] rounded-full 
                   border-2 border-white/15 bg-[#0d1310]/80 backdrop-blur-md 
                   shadow-[0_0_40px_rgba(30,111,92,0.2)] 
                   hover:shadow-[0_0_60px_rgba(30,111,92,0.4)] 
                   hover:border-[#1e6f5c] 
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
        <div className="absolute -inset-2 sm:-inset-3.5 rounded-full border border-dashed border-[#1e6f5c]/35 animate-[spin_25s_linear_infinite]" />
        <div className="absolute -inset-4 sm:-inset-7 rounded-full border border-[#1e6f5c]/20" />
      </motion.div>
    </div>
  );
};

const AboutStory = () => {
  return (
    <section
      id="about"
      className="min-h-screen relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10 py-24"
    >
      {/* Grid Layout: Left Text & Education, Right 3D Photo */}
      <div className="grid grid-cols-[3fr_2fr] sm:grid-cols-[7fr_5fr] items-center gap-3 sm:gap-[clamp(2rem,5vw,4rem)]">
        
        {/* ================= LEFT COLUMN: NARRATIVE CONTENT ================= */}
        <div className="space-y-3 sm:space-y-7">

          {/* Section Marker */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="text-[9px] sm:text-xs font-mono text-[#1e6f5c] tracking-wider sm:tracking-widest uppercase font-bold">01 / ABOUT ME</span>
            <div className="h-px w-12 bg-[#1e6f5c]/40" />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-[#F4F5F4] text-lg sm:text-5xl tracking-tight uppercase"
          >
            ENGINEERING INTELLIGENT SYSTEMS
          </motion.h2>

          {/* Clean Storytelling Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-2 sm:space-y-4 text-[#8E9793] text-[10px] sm:text-lg font-light leading-relaxed"
          >
            <p>
              I am an MCA student at ICFAI University, Sikkim, with a deep interest in Artificial Intelligence, Machine Learning, and modern full-stack web development.
            </p>
            <p>
              With practical experience built through industry web development internships and client projects, I focus on building intelligent, scalable systems that solve real-world problems. My work combines machine learning models (NLP, Computer Vision, Deep Learning) with robust full-stack software architecture.
            </p>
          </motion.div>

          {/* Education Information visually highlighted */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-4 border-t border-white/[0.08] space-y-3"
          >
            <span className="text-[11px] font-mono text-[#1e6f5c] tracking-widest uppercase font-bold block">
              // ACADEMIC EDUCATION
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-2.5 sm:p-5 rounded-lg sm:rounded-xl bg-[#0d1310] border border-white/10 hover:border-[#1e6f5c]/50 transition-all duration-300 space-y-1 sm:space-y-2 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] sm:text-[10px] font-mono text-[#1e6f5c] font-bold uppercase tracking-wider">
                      {edu.period}
                    </span>
                    <span className="px-1.5 sm:px-2.5 py-0.5 rounded bg-[#1e6f5c]/15 border border-[#1e6f5c]/30 text-[#1e6f5c] text-[9px] sm:text-xs font-mono font-bold">
                      CGPA: {edu.cgpa}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-base font-display font-bold text-[#F4F5F4] leading-snug">
                    {edu.degree}
                  </h3>

                  <p className="text-[9px] sm:text-xs font-mono text-[#8E9793]">
                    {edu.institution}
                  </p>

                  <p className="text-[9px] sm:text-xs text-[#8E9793]/80 font-light pt-1 leading-relaxed hidden sm:block">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* ================= RIGHT COLUMN: 3D HOVER CIRCULAR PHOTO ================= */}
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