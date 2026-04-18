import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-2/5"
          >
            <div className="relative">
              <img
                src="assets/profile.jpeg"
                alt="Anu Kumari Shah"
                className="rounded-2xl shadow-2xl w-full aspect-[4/3] object-cover object-top"
              />

              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm">MCA Student</div>
                    <div className="text-[10px] text-slate-500">Web Developer & AI</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-3/5 space-y-6"
          >
            <h2 className="text-sm font-bold text-primary-500 uppercase tracking-wider">
              About Me
            </h2>

            <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
              Passionate about building modern web & AI solutions
            </h3>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              I’m Anu Kumari Shah, an MCA student with a strong interest in Web Development and Artificial Intelligence. 
              I enjoy designing responsive, user-friendly websites and building interactive applications 
              using modern technologies like React, Tailwind CSS, and JavaScript.
            </p>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Along with frontend development, I am actively learning Machine Learning and data-driven 
              technologies to expand my skills in AI. I focus on writing clean code, understanding 
              core concepts deeply, and continuously improving through real-world projects.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-700 dark:text-slate-300">Problem Solver</span>
              </div>

              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-700 dark:text-slate-300">Frontend Developer</span>
              </div>

              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-700 dark:text-slate-300">Machine Learning Enthusiast</span>
              </div>

              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-700 dark:text-slate-300">Continuous Learner</span>
              </div>
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mt-4 group"
            >
              Download CV
              <svg className="w-4 h-4 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
