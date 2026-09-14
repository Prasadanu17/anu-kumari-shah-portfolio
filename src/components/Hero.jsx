import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/* ─── Tech Logos (matching reference's floating icon style) ─── */
const TECH_LOGOS = [
  /* Background scattered — lower opacity, larger spread */
  {
    id: 'py',     label: 'Py',  bg: '#EBF3FD', color: '#3776AB', border: '#C5DCF5',
    size: 54, left: '6%',  top: '18%', delay: 0,    dur: 3.8, amplitude: 12,
  },
  {
    id: 'js',     label: 'JS',  bg: '#FEFBDD', color: '#B8980C', border: '#F0E080',
    size: 48, left: '12%', top: '62%', delay: 0.6,  dur: 4.2, amplitude: 10,
  },
  {
    id: 'react',  label: '⚛',   bg: '#E8FAFE', color: '#00A8C6', border: '#B3ECF8',
    size: 50, left: '22%', top: '78%', delay: 1.0,  dur: 3.6, amplitude: 14,
  },
  {
    id: 'gh',     label: 'GH',  bg: '#F0F0EE', color: '#333',    border: '#DDDBD8',
    size: 46, left: '30%', top: '12%', delay: 0.3,  dur: 4.5, amplitude: 9,
  },
  /* Right side — around the photo */
  {
    id: 'ts',     label: 'TS',  bg: '#E8EFF8', color: '#2F74C0', border: '#B8D0EE',
    size: 58, left: '56%', top: '8%',  delay: 0.2,  dur: 3.4, amplitude: 13,
  },
  {
    id: 'ml',     label: 'ML',  bg: '#FEF0E8', color: '#C94F1A', border: '#F5CDB0',
    size: 52, left: '88%', top: '14%', delay: 0.8,  dur: 4.0, amplitude: 11,
  },
  {
    id: 'node',   label: 'N',   bg: '#EAF7EC', color: '#2E7D32', border: '#B3DEBA',
    size: 46, left: '90%', top: '55%', delay: 0.4,  dur: 3.9, amplitude: 12,
  },
  {
    id: 'nlp',    label: 'NLP', bg: '#F5EBF8', color: '#7B1FA2', border: '#DDB8EE',
    size: 48, left: '60%', top: '76%', delay: 1.2,  dur: 4.3, amplitude: 10,
  },
  {
    id: 'aws',    label: 'AI',  bg: '#FFF8E8', color: '#A07020', border: '#EED98A',
    size: 44, left: '78%', top: '82%', delay: 0.5,  dur: 3.7, amplitude: 9,
  },
  {
    id: 'fast',   label: 'API', bg: '#E8F8F8', color: '#009688', border: '#A8DDD9',
    size: 44, left: '46%', top: '90%', delay: 0.9,  dur: 4.1, amplitude: 11,
  },
  {
    id: 'py2',    label: '🔥',  bg: '#FEF0EB', color: '#E8450A', border: '#F5C4B0',
    size: 50, left: '74%', top: '10%', delay: 0.7,  dur: 3.5, amplitude: 14,
  },
  {
    id: 'cv',     label: 'CV',  bg: '#EAEAF8', color: '#3949AB', border: '#BEBEF0',
    size: 42, left: '42%', top: '6%',  delay: 1.4,  dur: 4.4, amplitude: 8,
  },
];

function FloatingLogo({ logo }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none z-10"
      style={{ left: logo.left, top: logo.top }}
      animate={{
        y: [-logo.amplitude / 2, logo.amplitude / 2, -logo.amplitude / 2],
        rotate: [-3, 3, -3],
        scale: [1, 1.04, 1],
      }}
      transition={{
        duration: logo.dur,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: logo.delay,
      }}
    >
      {/* 3D perspective tilt on hover */}
      <motion.div
        whileHover={{
          rotateY: 25,
          rotateX: -10,
          scale: 1.18,
          boxShadow: '6px 6px 20px rgba(42,40,37,0.18)',
          transition: { type: 'spring', stiffness: 300, damping: 18 },
        }}
        style={{
          width: logo.size,
          height: logo.size,
          background: logo.bg,
          border: `1.5px solid ${logo.border}`,
          transformStyle: 'preserve-3d',
          perspective: 600,
        }}
        className="rounded-2xl shadow-md flex items-center justify-center font-bold text-xs cursor-pointer"
      >
        <span style={{ color: logo.color, fontSize: logo.size * 0.32, lineHeight: 1 }}>
          {logo.label}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ─── Typewriter ─── */
function Typewriter() {
  const phrases = ['AI / ML Engineer', 'Full Stack Developer', 'MCA Student & Researcher', 'Problem Solver'];
  const [text, setText] = useState('');
  const [phrase, setPhrase] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [speed, setSpeed] = useState(90);

  useEffect(() => {
    const cur = phrases[phrase];
    const t = setTimeout(() => {
      if (deleting) {
        setText(cur.substring(0, text.length - 1));
        setSpeed(45);
      } else {
        setText(cur.substring(0, text.length + 1));
        setSpeed(90);
      }
      if (!deleting && text === cur) { setDeleting(true); setSpeed(2200); }
      else if (deleting && text === '') { setDeleting(false); setPhrase((p) => (p + 1) % phrases.length); setSpeed(400); }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, phrase]);

  return (
    <span className="text-[#4A4641] font-light">
      {text}<span className="animate-pulse text-[#2A2825] ml-0.5">|</span>
    </span>
  );
}

/* ─── Hero ─── */
const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#E6E2DD] overflow-hidden"
      style={{ paddingTop: '72px' }} // navbar height
    >
      {/* All floating logos scattered across full section */}
      <div className="absolute inset-0 overflow-hidden">
        {TECH_LOGOS.map((logo) => (
          <FloatingLogo key={logo.id} logo={logo} />
        ))}
      </div>

      {/* Main content grid */}
      <div className="relative z-20 container mx-auto px-6 lg:px-10 min-h-[calc(100vh-72px)] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* ── LEFT: Text Content ── */}
          <div className="flex flex-col justify-center space-y-6 py-12 lg:py-0">

            {/* Sub-label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <span className="w-8 h-0.5 bg-[#C94F1A]" />
              <span className="text-[11px] font-mono text-[#C94F1A] tracking-widest uppercase font-semibold">
                AI / ML ENGINEER — FULL STACK DEVELOPER
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="font-display font-bold leading-[1.08] text-[#2A2825]"
                style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)' }}
              >
                Anu Kumari Shah
              </h1>
              <h2 className="font-display leading-tight mt-2"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', color: '#2A2825' }}
              >
                Building,{' '}
                <em className="not-italic font-bold text-[#C94F1A]">AI-driven</em>
                {' '}systems.
              </h2>
            </motion.div>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-light text-[#66625C] font-sans h-7 flex items-center"
            >
              <Typewriter />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-[#66625C] text-[15px] leading-relaxed font-light max-w-md"
            >
              I'm an MCA student passionate about building intelligent systems with Machine Learning, NLP, and Computer Vision — and high-performance web applications with modern full-stack technologies.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="/assets/Anu Kumari Shah-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#2A2825] text-[#FAF8F5] text-xs font-mono font-bold tracking-widest uppercase rounded-lg hover:bg-[#1A1918] transition-all duration-300 shadow-md hover:-translate-y-0.5 hover:shadow-lg"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                DOWNLOAD RESUME
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#2A2825] text-[#2A2825] text-xs font-mono font-bold tracking-widest uppercase rounded-lg hover:bg-[#2A2825] hover:text-[#FAF8F5] transition-all duration-300 hover:-translate-y-0.5"
              >
                VIEW WORK →
              </a>
            </motion.div>

            {/* Socials row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-5 pt-1"
            >
              {[
                { href: 'https://github.com/Prasadanu17', label: 'GitHub' },
                { href: 'https://linkedin.com/in/anu-shah-102594348', label: 'LinkedIn' },
                { href: 'mailto:anu705545@gmail.com', label: 'Email' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-[#66625C] hover:text-[#2A2825] transition-colors uppercase tracking-wider"
                >
                  {s.label} ↗
                </a>
              ))}
            </motion.div>

          </div>

          {/* ── RIGHT: Profile Image ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative flex items-end justify-center lg:justify-end"
          >
            {/* Image container */}
            <div className="relative w-full max-w-sm lg:max-w-md">
              {/* Subtle warm glow behind image */}
              <div
                className="absolute inset-x-8 bottom-0 top-16 rounded-3xl opacity-60"
                style={{ background: 'radial-gradient(ellipse at center, #D8D0C8 0%, transparent 70%)' }}
              />

              {/* Profile photo */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <img
                  src="/assets/profile.jpeg"
                  alt="Anu Kumari Shah"
                  className="w-full rounded-2xl shadow-2xl object-cover object-top"
                  style={{
                    maxHeight: '520px',
                    objectPosition: 'center top',
                    maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                    border: '1px solid rgba(211,206,199,0.5)',
                  }}
                />

                {/* Floating badge — MCA CGPA */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
                  className="absolute -left-8 top-12 bg-[#FAF8F5] rounded-xl shadow-xl border border-[#D3CEC7] px-4 py-3"
                >
                  <div className="text-xs font-mono text-[#66625C] uppercase tracking-wider">MCA CGPA</div>
                  <div className="text-2xl font-bold font-display text-[#2A2825]">10.00</div>
                  <div className="text-[10px] font-mono text-[#66625C]">ICFAI University, Sikkim</div>
                </motion.div>

                {/* Floating badge — Available */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1, type: 'spring', stiffness: 200 }}
                  className="absolute -right-6 top-1/3 bg-[#2A2825] rounded-xl shadow-xl px-4 py-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-mono text-[#FAF8F5] uppercase tracking-wider">Available</span>
                  </div>
                  <div className="text-xs font-mono text-[#FAF8F5]/70 mt-0.5">For Opportunities</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* ── Stats Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-8 pb-10 border-t border-[#D3CEC7] pt-8"
        >
          {[
            { value: '10.00', label: 'Current CGPA, MCA' },
            { value: '7+',    label: 'Projects Built' },
            { value: '10+',   label: 'ML Models Trained' },
            { value: '4',     label: 'Live Production Sites' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 + i * 0.1 }}
              className={`py-4 px-6 ${i < 3 ? 'border-r border-[#D3CEC7]' : ''}`}
            >
              <div className="font-display font-bold text-[#2A2825]"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
              >
                {stat.value}
              </div>
              <div className="text-[10px] font-mono text-[#66625C] uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;