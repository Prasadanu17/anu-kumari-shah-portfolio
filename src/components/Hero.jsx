import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const phrases = [
    'Full Stack Developer',
    'AI Enthusiast',
    'Problem Solver',
    'Tech Enthusiast'
  ];

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    
    const timer = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(currentPhrase.substring(0, currentText.length - 1));
        setTypingSpeed(50);
      } else {
        setCurrentText(currentPhrase.substring(0, currentText.length + 1));
        setTypingSpeed(100);
      }

      if (!isDeleting && currentText === currentPhrase) {
        setIsDeleting(true);
        setTypingSpeed(2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setTypingSpeed(500);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        />
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            delay: 2,
            ease: "linear"
          }}
          className="absolute top-0 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        />
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            delay: 4,
            ease: "linear"
          }}
          className="absolute -bottom-32 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 text-center lg:text-left space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Available for opportunities
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-400">Anu Kumari Shah</span>
            </h1>
            
            <div className="h-16 lg:h-20 overflow-hidden">
              <span id="typewriter" className="text-2xl lg:text-4xl font-light text-slate-600 dark:text-slate-300">
                {currentText}
              </span>
              <span className="animate-pulse text-primary-500">|</span>
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0">
             MCA student & passionate Web Developer focused on creating modern,
              responsive websites and learning Artificial Intelligence to build
              smarter applications.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#projects" className="group relative px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
              <a href="#contact" className="px-8 py-4 border-2 border-slate-300 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                Let's Talk
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 pt-4">
              <a href="#" className="text-slate-400 hover:text-primary-500 transition-colors duration-300 hover:scale-110 transform">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-primary-500 transition-colors duration-300 hover:scale-110 transform">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-primary-500 transition-colors duration-300 hover:scale-110 transform">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-primary-500 transition-colors duration-300 hover:scale-110 transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative w-64 h-64 lg:w-72 lg:h-72 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-secondary-400 rounded-full opacity-20 blur-2xl animate-pulse"></div>
              <img 
                src="/assets/profile.jpeg"
                alt="Anu Kumari Shah" 
                className="relative w-full h-full object-cover rounded-full border-4 border-white dark:border-slate-800 shadow-2xl hover:scale-105 transition-transform duration-500"
              />
              
              {/* Floating Tech Icons */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-lg flex items-center justify-center"
              >
                <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-lg flex items-center justify-center"
              >
                <svg className="w-8 h-8 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;