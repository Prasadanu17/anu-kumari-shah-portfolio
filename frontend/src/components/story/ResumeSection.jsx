import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const ResumeSection = () => {
  const { personalInfo } = usePortfolio();
  return (
    <section
      id="resume"
      className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto z-10 py-2 sm:py-4 w-full"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#171717] border border-[#8E8170]/40 shadow-2xl relative overflow-hidden text-center space-y-3 sm:space-y-5"
      >
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#EAD9B8]/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex items-center justify-center gap-2 text-[#C8B99F]">
          <FileText className="w-5 h-5 text-[#EAD9B8]" />
          <span className="text-xs font-mono font-bold tracking-widest uppercase">
            CURRICULUM VITAE // RESUME
          </span>
        </div>

        <div className="relative z-10 space-y-2">
          <h2 className="font-display font-extrabold text-lg sm:text-4xl text-[#EAD9B8] tracking-tight uppercase">
            WANT TO KNOW MORE ABOUT MY JOURNEY?
          </h2>
          <p className="text-[9px] sm:text-sm text-[#F5EBDD] font-light max-w-lg mx-auto leading-relaxed">
            Download or view my complete technical resume detailing education, project architecture, machine learning stack, and work experience.
          </p>
        </div>

        {/* CTAs */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-1 sm:pt-2">
          <a
            href={personalInfo.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2.5 bg-[#EAD9B8] hover:bg-[#d6c39f] text-[#171717] px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider sm:tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(234,217,184,0.25)]"
          >
            <span>VIEW RESUME</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href={personalInfo.resume}
            download="Anu Kumari Shah-Resume.pdf"
            className="inline-flex items-center gap-1.5 sm:gap-2.5 bg-white/[0.04] hover:bg-white/[0.09] text-[#F5EBDD] border border-[#8E8170]/40 hover:border-[#EAD9B8]/50 px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider sm:tracking-widest transition-all duration-300"
          >
            <Download className="w-4 h-4 text-[#EAD9B8]" />
            <span>DOWNLOAD PDF</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default ResumeSection;
