import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Footer = () => {
  const { personalInfo } = usePortfolio();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { num: '01', label: 'Home', href: '#home' },
    { num: '02', label: 'About', href: '#about' },
    { num: '03', label: 'Journey', href: '#journey' },
    { num: '04', label: 'Skills', href: '#skills' },
    { num: '05', label: 'Projects', href: '#projects' },
    { num: '06', label: 'Experience', href: '#experience' },
    { num: '07', label: 'Certifications', href: '#certifications' },
    { num: '08', label: 'Contact', href: '#contact' },
  ];

  const socials = [
    { label: 'GITHUB', href: personalInfo.github, icon: Github },
    { label: 'LINKEDIN', href: personalInfo.linkedin, icon: Linkedin },
  ];

  return (
    <footer className="bg-transparent text-[#C8B99F] pt-20 pb-10 border-t border-[#8E8170]/25 relative overflow-hidden">

      {/* Subtle radial glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#EAD9B8]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="story-container relative z-10">

        {/* Big CTA Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="pb-12 border-b border-[#8E8170]/20"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
                </span>
                <span className="text-[10px] font-mono text-[#C8B99F] uppercase tracking-[0.3em] font-bold">
                  Available for opportunities
                </span>
              </div>
              <h2 className="font-display text-xl sm:text-4xl md:text-5xl tracking-tight text-[#EAD9B8]">
                <span className="font-light">Let's build something</span>{' '}
                <span className="font-serif italic text-[#F5EBDD]">meaningful together.</span>
              </h2>
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-[#EAD9B8] text-[#171717] text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider sm:tracking-widest shadow-[0_0_30px_rgba(234,217,184,0.25)] hover:bg-[#d6c39f] transition-all"
            >
              Start a conversation
              <span>→</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-3 sm:gap-10 py-6 sm:py-14 border-b border-[#8E8170]/20">

          {/* Col 1: Identity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="col-span-5 space-y-2 sm:space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 sm:w-9 sm:h-9 rounded-md sm:rounded-lg border border-[#8E8170]/40 bg-white/[0.04] flex items-center justify-center text-[8px] sm:text-xs font-bold text-[#EAD9B8] font-mono">
                AK
              </div>
              <span className="text-xs sm:text-lg font-display font-bold text-[#EAD9B8] tracking-tight">
                ANU KUMARI SHAH
              </span>
            </div>
            <p className="text-[8px] sm:text-xs font-mono text-[#C8B99F] leading-relaxed max-w-sm">
              AI/ML Engineer & Full-Stack Developer building intelligent systems, NLP models, and production web applications.
            </p>

            <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-4 gap-y-1 sm:gap-y-2 text-[8px] sm:text-[11px] font-mono text-[#C8B99F] pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#EAD9B8]" />
                Gangtok, Sikkim
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#EAD9B8]" />
                MCA (ICFAI CGPA: 10.00)
              </span>
            </div>
          </motion.div>

          {/* Col 2: Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-4"
          >
            <span className="text-[8px] sm:text-[10px] font-mono text-[#C8B99F] uppercase tracking-wider sm:tracking-widest block mb-2 sm:mb-5 font-bold">
              // NAVIGATION
            </span>
            <div className="grid grid-cols-2 gap-x-3 sm:gap-x-6 gap-y-1.5 sm:gap-y-3 text-[9px] sm:text-xs font-mono">
              {navLinks.map((link) => (
                <a
                  key={link.num}
                  href={link.href}
                  className="group flex items-center gap-2 text-[#C8B99F] hover:text-[#EAD9B8] transition-colors"
                >
                  <span className="text-[10px] text-[#8E8170] group-hover:text-[#EAD9B8] transition-colors">
                    {link.num}
                  </span>
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#EAD9B8] group-hover:w-full transition-all duration-300" />
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
            className="col-span-3 flex flex-col items-end justify-between space-y-2 sm:space-y-0 h-full"
          >
            <div className="space-y-2 sm:space-y-4 text-right">
              <span className="text-[10px] font-mono text-[#C8B99F] uppercase tracking-widest block font-bold">
                // CONNECT
              </span>
              <div className="flex flex-wrap justify-end gap-1.5 sm:gap-2">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3.5 py-1 sm:py-2 rounded-md sm:rounded-lg border border-[#8E8170]/30 bg-white/[0.02] text-[#F5EBDD] hover:border-[#EAD9B8]/50 hover:bg-[#EAD9B8]/10 hover:text-[#EAD9B8] transition-all text-[8px] sm:text-[11px] font-mono tracking-wider"
                    >
                      <Icon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                      {social.label}
                    </motion.a>
                  );
                })}
                <motion.a
                  href={`mailto:${personalInfo.email}`}
                  whileHover={{ y: -2 }}
                  className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3.5 py-1 sm:py-2 rounded-md sm:rounded-lg border border-[#8E8170]/30 bg-white/[0.02] text-[#F5EBDD] hover:border-[#EAD9B8]/50 hover:bg-[#EAD9B8]/10 hover:text-[#EAD9B8] transition-all text-[8px] sm:text-[11px] font-mono tracking-wider"
                >
                  <Mail className="w-3.5 h-3.5" />
                  EMAIL
                </motion.a>
              </div>
            </div>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-xs font-mono text-[#C8B99F] hover:text-[#EAD9B8] transition-colors group self-end"
            >
              <span>BACK TO TOP</span>
              <div className="w-6 h-6 rounded-full border border-[#8E8170]/30 group-hover:border-[#EAD9B8] flex items-center justify-center transition-all">
                <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.button>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-[#C8B99F] uppercase tracking-wider"
        >
          <p>
            © {currentYear} Anu Kumari Shah
            <span className="text-[#8E8170] mx-2">•</span>
            AI/ML & Full-Stack Engineering Portfolio
          </p>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              Systems Operational
            </span>
          </div>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;
