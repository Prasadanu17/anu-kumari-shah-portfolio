import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const ResumeSection = () => {
  const { personalInfo } = usePortfolio();
  return (
    <section
      id="resume"
      className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto z-10 py-16"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="p-4 sm:p-12 rounded-2xl sm:rounded-3xl bg-[#0d1310] border-2 border-[#1e6f5c]/50 shadow-2xl relative overflow-hidden text-center space-y-3 sm:space-y-6"
      >
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1e6f5c]/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex items-center justify-center gap-2 text-[#1e6f5c]">
          <FileText className="w-5 h-5" />
          <span className="text-xs font-mono font-bold tracking-widest uppercase">
            CURRICULUM VITAE // RESUME
          </span>
        </div>

        <div className="relative z-10 space-y-2">
          <h2 className="font-display font-extrabold text-lg sm:text-4xl text-[#F4F5F4] tracking-tight uppercase">
            WANT TO KNOW MORE ABOUT MY JOURNEY?
          </h2>
          <p className="text-[9px] sm:text-sm text-[#8E9793] font-light max-w-lg mx-auto leading-relaxed">
            Download or view my complete technical resume detailing education, project architecture, machine learning stack, and work experience.
          </p>
        </div>

        {/* CTAs */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-1 sm:pt-2">
          <a
            href={personalInfo.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2.5 bg-[#1e6f5c] hover:bg-[#28967d] text-white px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider sm:tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(30,111,92,0.35)]"
          >
            <span>VIEW RESUME</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href={personalInfo.resume}
            download="Anu Kumari Shah-Resume.pdf"
            className="inline-flex items-center gap-1.5 sm:gap-2.5 bg-white/[0.04] hover:bg-white/[0.09] text-[#F4F5F4] border border-white/15 hover:border-white/30 px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider sm:tracking-widest transition-all duration-300"
          >
            <Download className="w-4 h-4 text-[#1e6f5c]" />
            <span>DOWNLOAD PDF</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default ResumeSection;
