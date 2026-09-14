import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Image gently moves up as you scroll through the section
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1.02, 0.98]);

  return (
    <section ref={sectionRef} id="about" className="py-24 relative bg-[#E6E2DD] border-t border-[#D3CEC7]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Image Section — scroll parallax */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-2/5"
          >
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="relative"
            >
              <img
                src="assets/profile.jpeg"
                alt="Anu Kumari Shah"
                className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover object-top border border-[#D3CEC7]"
              />

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-[#FAF8F5] p-4 rounded-xl shadow-lg border border-[#D3CEC7]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2A2825] rounded-full flex items-center justify-center text-[#FAF8F5] font-mono text-xs font-bold">
                    MCA
                  </div>
                  <div>
                    <div className="font-bold text-[#2A2825] text-sm font-display">MCA Student</div>
                    <div className="text-[10px] font-mono text-[#66625C]">ICFAI University, Sikkim</div>
                  </div>
                </div>
              </motion.div>

              {/* CGPA Badge */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -top-4 -left-4 bg-[#2A2825] px-4 py-2 rounded-xl shadow-lg"
              >
                <div className="text-[#FAF8F5] font-mono text-xs font-bold">CGPA 10.00</div>
                <div className="text-[#FAF8F5]/60 text-[9px] font-mono">Current Semester</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-3/5 space-y-6"
          >
            <span className="text-xs font-mono text-[#66625C] uppercase tracking-widest block">
              02 FOCUS // BACKGROUND & ACADEMICS
            </span>

            <h3 className="text-3xl lg:text-4xl font-bold text-[#2A2825] font-display">
              AI/ML ENGINEER & FULL STACK DEVELOPER
            </h3>

            <p className="text-[#66625C] leading-relaxed font-light text-base">
              I am <strong className="text-[#2A2825] font-semibold">Anu Kumari Shah</strong>, currently pursuing my{' '}
              <strong className="text-[#2A2825] font-semibold">MCA at ICFAI University, Sikkim (2025–2027, Current CGPA: 10.00)</strong>, having completed my{' '}
              <strong className="text-[#2A2825] font-semibold">BCA from SRM University, Sikkim (2022–2025, CGPA: 8.16)</strong>.
            </p>

            <p className="text-[#66625C] leading-relaxed font-light text-base">
              My technical interests focus on Machine Learning, Deep Learning, Natural Language Processing (NLP), Computer Vision, Data Science, and Full Stack Web Development. I aim to build intelligent, practical software that solves real-world challenges.
            </p>

            {/* Focus Areas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Artificial Intelligence & Deep Learning',
                'NLP & Computer Vision',
                'Full Stack Web Engineering',
                'Explainable AI (XAI)',
                'Data Science & Analytics',
                'Research & Co-authorship',
              ].map((focus, i) => (
                <motion.div
                  key={focus}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3 p-3 bg-[#FAF8F5] border border-[#D3CEC7] rounded-lg hover:border-[#2A2825] transition-colors"
                >
                  <span className="w-2 h-2 bg-[#2A2825] rounded-full shrink-0" />
                  <span className="text-[#2A2825] text-xs font-mono font-medium">{focus}</span>
                </motion.div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="/assets/Anu Kumari Shah-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2A2825] text-[#FAF8F5] hover:bg-[#1A1918] font-mono text-xs font-bold tracking-wider uppercase rounded transition-colors"
              >
                <span>DOWNLOAD RESUME PDF</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
