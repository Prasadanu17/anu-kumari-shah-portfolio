import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { education } from '../../utils/constants';

// 1. Component for the 3D Hover Circular Photo
const HoverPhoto = () => {
  const ref = useRef(null);

  // Mouse tracking for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[400px]">
      {/* Ambient Glow behind the circle */}
      <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full bg-[#38BDF8]/10 blur-[80px] pointer-events-none" />

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full 
                   border-2 border-white/10 bg-white/[0.03] backdrop-blur-md 
                   shadow-[0_0_30px_rgba(56,189,248,0.1)] 
                   hover:shadow-[0_0_50px_rgba(56,189,248,0.3)] 
                   hover:border-[#38BDF8]/50 
                   transition-all duration-500 cursor-pointer group"
      >
        {/* Inner circle container to hold the image */}
        <div className="absolute inset-2 rounded-full overflow-hidden border border-white/5">
          {/* REPLACE THE SRC BELOW WITH YOUR PHOTO */}
          <img 
            src="public/assets/profile.jpeg" 
            alt="Anu Kumari Shah" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Decorative Ring (Optional - adds a tech feel) */}
        <div className="absolute -inset-4 rounded-full border border-dashed border-[#38BDF8]/20 animate-[spin_20s_linear_infinite]" />
        <div className="absolute -inset-8 rounded-full border border-[#38BDF8]/10" />
      </motion.div>
    </div>
  );
};

const AboutStory = () => {
  return (
    <section
      id="about"
      className="min-h-screen relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto z-10 py-24"
    >
      {/* Grid Layout: Left Text, Right Photo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* ================= LEFT COLUMN: TEXT CONTENT ================= */}
        <div className="space-y-6 sm:space-y-8">

          {/* Chapter marker */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="text-xs font-mono text-[#38BDF8] tracking-widest uppercase font-bold">01 / ABOUT</span>
            <div className="h-px w-12 bg-[#38BDF8]/40" />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-[#F4F4F6] text-4xl sm:text-6xl tracking-tight uppercase"
          >
            WHO I AM
          </motion.h2>

          {/* Primary identity badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm font-mono tracking-wider"
          >
            <span className="px-3 py-1.5 rounded bg-white/[0.05] border border-white/10 text-[#F4F4F6] font-medium">
              MCA GRADUATE STUDENT
            </span>
            <span className="px-3 py-1.5 rounded bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-[#38BDF8] font-bold">
              AI / ML ENGINEER
            </span>
            <span className="px-3 py-1.5 rounded bg-white/[0.05] border border-white/10 text-[#F4F4F6] font-medium">
              FULL-STACK DEVELOPER
            </span>
          </motion.div>

          {/* Editorial Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#8E95A5] text-base sm:text-xl font-light leading-relaxed max-w-2xl"
          >
            I specialize in building intelligent systems at the intersection of Machine Learning, Deep Learning, and modern Web Architecture. Based in Gangtok, Sikkim, I combine rigorous theoretical foundations with practical full-stack execution.
          </motion.p>

          {/* Education & Detail Editorial Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.08] max-w-3xl origin-left"
          >
            {education.map((edu) => (
              <div key={edu.id} className="p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 hover:border-[#38BDF8]/40 transition-colors">
                <span className="text-[10px] font-mono text-[#38BDF8] uppercase tracking-wider block font-bold">
                  {edu.period} • CGPA: {edu.cgpa}
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-[#F4F4F6]">
                  {edu.degree}
                </h3>
                <p className="text-xs font-mono text-[#8E95A5]">
                  {edu.institution}
                </p>
              </div>
            ))}
          </motion.div>

        </div>

        {/* ================= RIGHT COLUMN: 3D HOVER PHOTO ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative w-full flex items-center justify-center"
        >
          <HoverPhoto />
        </motion.div>

      </div>
    </section>
  );
};

export default AboutStory;