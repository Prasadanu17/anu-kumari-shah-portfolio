import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { num: '01', label: 'Home', href: '#home' },
    { num: '02', label: 'About', href: '#about' },
    { num: '03', label: 'Experience', href: '#experience' },
    { num: '04', label: 'Skills', href: '#skills' },
    { num: '05', label: 'Projects', href: '#projects' },
    { num: '06', label: 'Contact', href: '#contact' },
  ];

  const socials = [
    { label: 'GITHUB', href: 'https://github.com/Prasadanu17', icon: Github },
    { label: 'LINKEDIN', href: 'https://linkedin.com/in/anu-shah-102594348', icon: Linkedin },
  ];

  return (
    <footer className="bg-transparent text-[#8E95A5] pt-20 pb-10 border-t border-white/[0.08] relative overflow-hidden">

      {/* Subtle radial glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#38BDF8]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="story-container relative z-10">

        {/* ============================================ */}
        {/* BIG CTA HEADLINE                             */}
        {/* ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="pb-12 border-b border-white/[0.06]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.3em] font-bold">
                  Available for work
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#F4F4F6]">
                <span className="font-light">Let's build something</span>{' '}
                <span className="font-serif italic text-[#38BDF8]">great together.</span>
              </h2>
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="self-start sm:self-auto inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#38BDF8] text-[#07080B] text-xs font-mono font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:shadow-[0_0_40px_rgba(56,189,248,0.5)] transition-all"
            >
              Start a conversation
              <span>→</span>
            </motion.a>
          </div>
        </motion.div>

        {/* ============================================ */}
        {/* MAIN GRID — 3 COLUMNS                        */}
        {/* ============================================ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-14 border-b border-white/[0.06]">

          {/* Col 1: Identity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="md:col-span-5 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg border border-[#38BDF8]/30 bg-[#38BDF8]/10 flex items-center justify-center text-xs font-bold text-[#38BDF8] font-mono">
                AK
              </div>
              <span className="text-lg font-display font-bold text-[#F4F4F6] tracking-tight">
                ANU KUMARI SHAH
              </span>
            </div>
            <p className="text-xs font-mono text-[#8E95A5] leading-relaxed max-w-sm">
              AI / ML Engineer & Full Stack Developer specializing in intelligent
              deep learning systems, NLP, Explainable AI, and high-performance web
              architecture.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-mono text-[#5D6473] pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#38BDF8]" />
                Gangtok, Sikkim
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#5D6473]" />
                MCA • ICFAI University
              </span>
            </div>
          </motion.div>

          {/* Col 2: Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-4"
          >
            <span className="text-[10px] font-mono text-[#5D6473] uppercase tracking-widest block mb-5">
              // Navigation
            </span>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs font-mono">
              {navLinks.map((link) => (
                <a
                  key={link.num}
                  href={link.href}
                  className="group flex items-center gap-2 text-[#8E95A5] hover:text-[#F4F4F6] transition-colors"
                >
                  <span className="text-[10px] text-[#5D6473] group-hover:text-[#38BDF8] transition-colors">
                    {link.num}
                  </span>
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#38BDF8] group-hover:w-full transition-all duration-300" />
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Col 3: Social + Back to top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3 flex flex-col md:items-end justify-between space-y-5 md:space-y-0 h-full"
          >
            <div className="space-y-4 md:text-right">
              <span className="text-[10px] font-mono text-[#5D6473] uppercase tracking-widest block">
                // Connect
              </span>
              <div className="flex flex-wrap md:justify-end gap-2">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/10 bg-white/[0.02] text-[#F4F4F6] hover:border-[#38BDF8]/50 hover:bg-[#38BDF8]/5 hover:text-[#38BDF8] transition-all text-[11px] font-mono tracking-wider"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {social.label}
                    </motion.a>
                  );
                })}
                <motion.a
                  href="mailto:contact@anushah.dev"
                  whileHover={{ y: -2 }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/10 bg-white/[0.02] text-[#F4F4F6] hover:border-[#38BDF8]/50 hover:bg-[#38BDF8]/5 hover:text-[#38BDF8] transition-all text-[11px] font-mono tracking-wider"
                >
                  <Mail className="w-3.5 h-3.5" />
                  EMAIL
                </motion.a>
              </div>
            </div>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              className="inline-flex items-center gap-2 text-xs font-mono text-[#8E95A5] hover:text-[#38BDF8] transition-colors group self-start md:self-end"
            >
              <span>BACK TO TOP</span>
              <div className="w-6 h-6 rounded-full border border-white/10 group-hover:border-[#38BDF8]/50 flex items-center justify-center transition-all">
                <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.button>
          </motion.div>

        </div>

        {/* ============================================ */}
        {/* BOTTOM BAR                                   */}
        {/* ============================================ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-[#5D6473] uppercase tracking-wider"
        >
          <p>
            © {currentYear} Anu Kumari Shah
            <span className="text-[#38BDF8] mx-2">•</span>
            Designed & Engineered for Impact
          </p>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              Systems Online
            </span>
            <span className="text-[#5D6473]/40">|</span>
            <span>Latency: 0ms</span>
          </div>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;