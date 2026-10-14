import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  ShieldCheck,
  Maximize2,
  X,
  Compass,
  CheckCircle2,
  Building2,
  ChevronRight
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

/* ─── Premium Certificate Visual Frame Component ─── */
const CertificateVisualFrame = ({ cert, onFullscreen }) => {
  return (
    <div className="relative rounded-xl sm:rounded-2xl bg-[#171717] border border-[#8E8170]/40 p-2.5 sm:p-8 shadow-2xl overflow-hidden group">
      {/* Background Decorative Ambient Radial Gradient */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#EAD9B8]/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-[#C8B99F]/5 blur-3xl pointer-events-none" />

      {/* Double Certificate Guilloche Frame Motif */}
      <div className="border border-[#8E8170]/30 rounded-lg sm:rounded-xl p-2.5 sm:p-7 relative bg-[#1c1c1c]/90 backdrop-blur-md space-y-3 sm:space-y-6">

        {/* Top Header: Issuing Organization Badge & Verified Seal */}
        <div className="flex items-start justify-between border-b border-[#8E8170]/20 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#EAD9B8]" />
              <span className="text-[8px] sm:text-xs font-mono font-bold uppercase tracking-wider sm:tracking-widest text-[#EAD9B8]">
                {cert.organization}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#C8B99F] uppercase tracking-wider block">
              ACCREDITED TECHNICAL CREDENTIAL
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAD9B8]/10 border border-[#8E8170]/40 text-[10px] font-mono font-semibold text-[#EAD9B8]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
            <span>VERIFIED</span>
          </div>
        </div>

        {/* Certificate Body: Presentee & Title */}
        <div className="text-center space-y-2 sm:space-y-4 py-1 sm:py-3">
          <div className="inline-flex items-center justify-center p-1.5 sm:p-3 rounded-full bg-[#EAD9B8]/10 border border-[#8E8170]/40 mb-0.5">
            <Award className="w-4 h-4 sm:w-7 sm:h-7 text-[#EAD9B8]" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono text-[#C8B99F] uppercase tracking-[0.2em] block">
              THIS CERTIFIES THAT
            </span>
            <h3 className="text-sm sm:text-2xl font-display font-extrabold text-[#EAD9B8] tracking-tight uppercase">
              ANU KUMARI SHAH
            </h3>
          </div>

          <div className="w-16 h-0.5 bg-[#8E8170]/50 mx-auto rounded-full" />

          <div className="space-y-1 max-w-md mx-auto">
            <span className="text-[10px] font-mono text-[#C8B99F] uppercase tracking-widest block">
              HAS SUCCESSFULLY COMPLETED
            </span>
            <h4 className="text-[10px] sm:text-lg font-display font-bold text-[#F5EBDD] leading-snug">
              {cert.title}
            </h4>
          </div>
        </div>

        {/* Certificate Footer: Credential ID & Signatures */}
        <div className="pt-4 border-t border-[#8E8170]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div className="space-y-0.5 text-center sm:text-left">
            <span className="text-[9px] font-mono text-[#C8B99F] uppercase tracking-wider block">
              CREDENTIAL ID: <span className="text-[#F5EBDD]">{cert.credentialId || 'CRED-2026-VERIFIED'}</span>
            </span>
            <span className="text-[9px] font-mono text-[#C8B99F] uppercase tracking-wider block">
              DATE OF ISSUANCE: <span className="text-[#EAD9B8]">{cert.date}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onFullscreen}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-lg bg-[#1c1c1c] border border-[#8E8170]/40 text-[#EAD9B8] text-[9px] sm:text-xs font-mono font-semibold hover:bg-[#EAD9B8] hover:text-[#171717] transition-all duration-300 shadow-md group/btn"
              title="View Fullscreen Preview"
            >
              <Maximize2 className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
              <span>VIEW FULLSCREEN</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

/* ─── Main Certifications Story Component (DRY Single Layout) ─── */
const CertificationsStory = () => {
  const { certifications, currentlyExploring } = usePortfolio();
  const [activeCertId, setActiveCertId] = useState(certifications[0]?.id || 1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activeCert = certifications.find((c) => c.id === activeCertId) || certifications[0] || {};

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  return (
    <section
      id="certifications"
      className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto z-10 py-2 sm:py-4 w-full"
    >
      <div className="space-y-4 sm:space-y-6">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-1.5 sm:space-y-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="h-px w-10 bg-[#8E8170]/40" />
            <span className="text-xs font-mono text-[#C8B99F] tracking-widest uppercase font-bold">
              07 / CERTIFICATIONS & ACCREDITATIONS
            </span>
            <div className="h-px w-10 bg-[#8E8170]/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-xl sm:text-3xl text-[#EAD9B8] tracking-tight uppercase"
          >
            CONTINUOUS LEARNING & CREDENTIALS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-[#F5EBDD] text-xs sm:text-sm font-light max-w-xl leading-relaxed"
          >
            Industry simulations, technical competition recognitions, and professional skill accreditations showcased inline.
          </motion.p>
        </div>

        {/* Interactive Digital Credential Gallery Layout (Single Layout Component) */}
        <div className="grid grid-cols-[2fr_3fr] sm:grid-cols-[5fr_7fr] items-start gap-2 sm:gap-[clamp(1.5rem,4vw,2rem)]">

          {/* LEFT COLUMN: Vertical Certificate Selector List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#8E8170]/25">
              <span className="text-xs font-mono text-[#C8B99F] uppercase tracking-wider font-semibold">
                SELECT CREDENTIAL ({certifications.length})
              </span>
              <span className="text-[10px] font-mono text-[#EAD9B8]">INLINE PREVIEW</span>
            </div>

            <div className="space-y-3">
              {certifications.map((cert, idx) => {
                const isActive = cert.id === activeCertId;
                const indexNum = (idx + 1).toString().padStart(2, '0');

                return (
                  <button
                    key={cert.id}
                    onClick={() => setActiveCertId(cert.id)}
                    className={`w-full text-left p-2 sm:p-5 rounded-lg sm:rounded-xl transition-all duration-300 relative group flex items-center justify-between gap-2 sm:gap-4 border ${isActive
                        ? 'bg-[#1c1c1c] border-[#EAD9B8] shadow-lg shadow-[#EAD9B8]/10'
                        : 'bg-[#171717]/60 border-[#8E8170]/25 hover:border-[#8E8170]/50 hover:bg-[#1c1c1c]'
                      }`}
                  >
                    {/* Active Accent Bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activeCertBar"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-[#EAD9B8] rounded-l-xl"
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    <div className="flex items-start gap-1.5 sm:gap-3.5 pl-0.5 sm:pl-1">
                      <span className={`text-[9px] sm:text-xs font-mono font-bold mt-0.5 ${isActive ? 'text-[#EAD9B8]' : 'text-[#C8B99F]'}`}>
                        {indexNum}
                      </span>

                      <div className="space-y-1">
                        <h4 className={`text-[9px] sm:text-sm font-display font-bold leading-snug transition-colors ${isActive ? 'text-[#EAD9B8]' : 'text-[#C8B99F] group-hover:text-[#F5EBDD]'
                          }`}>
                          {cert.title}
                        </h4>

                        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-[#C8B99F]">
                          <span className={isActive ? 'text-[#EAD9B8] font-semibold' : ''}>
                            {cert.organization}
                          </span>
                          <span>•</span>
                          <span>{cert.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center shrink-0">
                      <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'text-[#EAD9B8] translate-x-1' : 'text-[#C8B99F] group-hover:translate-x-0.5'
                        }`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Certificate Frame Preview & Metadata */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Animated Swappable Certificate Frame */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCert.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <CertificateVisualFrame
                  cert={activeCert}
                  onFullscreen={() => setIsFullscreen(true)}
                />
              </motion.div>
            </AnimatePresence>

            {/* Detailed Certificate Metadata Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`meta-${activeCert.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-5 sm:p-6 rounded-xl bg-[#171717] border border-[#8E8170]/30 space-y-4 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#8E8170]/25 pb-3 gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-[#EAD9B8] uppercase tracking-wider block font-bold">
                      SELECTED CREDENTIAL METADATA
                    </span>
                    <h3 className="text-sm sm:text-base font-display font-bold text-[#EAD9B8]">
                      {activeCert.title}
                    </h3>
                  </div>

                  <span className="self-start sm:self-auto text-xs font-mono text-[#C8B99F] px-3 py-1 rounded bg-white/[0.04] border border-[#8E8170]/30">
                    {activeCert.date}
                  </span>
                </div>

                <p className="text-xs text-[#F5EBDD] font-light leading-relaxed">
                  {activeCert.description}
                </p>

                {/* Skills Acquired */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono text-[#C8B99F] uppercase tracking-wider block">
                    KEY TECHNICAL COMPETENCIES:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeCert.skills.map((sk) => (
                      <span
                        key={sk}
                        className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/[0.04] border border-[#8E8170]/30 text-[#F5EBDD] font-medium"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>

        {/* CURRENTLY EXPLORING Subsection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-6 sm:p-8 rounded-2xl bg-[#1c1c1c]/80 border border-[#8E8170]/30 space-y-4 backdrop-blur-md relative overflow-hidden"
        >
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#EAD9B8] animate-spin" style={{ animationDuration: '12s' }} />
            <h3 className="text-xs font-mono text-[#EAD9B8] uppercase tracking-widest font-bold">
              CURRENTLY EXPLORING & DEEP-DIVING
            </h3>
          </div>

          <p className="text-xs text-[#F5EBDD] font-light max-w-xl leading-relaxed">
            Continuously staying ahead of technical advancements in generative artificial intelligence, agentic architectures, and modern machine learning deployment frameworks.
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-2">
            {currentlyExploring.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg bg-white/[0.04] border border-[#8E8170]/30 text-xs font-mono text-[#F5EBDD] hover:border-[#EAD9B8]/50 transition-all duration-300 font-medium hover:scale-105"
              >
                🔮 {topic}
              </span>
            ))}
          </div>
        </motion.div>

      </div>

      {/* ── INLINE FULLSCREEN LIGHTBOX OVERLAY ── */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-[#171717] border border-[#8E8170]/50 rounded-2xl p-5 sm:p-10 shadow-2xl space-y-6"
            >
              {/* Header Bar with Close Button */}
              <div className="flex items-center justify-between border-b border-[#8E8170]/25 pb-4">
                <div className="flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-[#EAD9B8]" />
                  <span className="text-xs font-mono text-[#EAD9B8] font-bold uppercase tracking-wider">
                    {activeCert.title}
                  </span>
                </div>

                <button
                  onClick={() => setIsFullscreen(false)}
                  className="p-2 rounded-lg bg-white/10 text-[#C8B99F] hover:text-[#EAD9B8] hover:bg-white/20 transition-colors"
                  title="Close Fullscreen View"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Fullscreen High-Resolution Certificate Document */}
              <div className="border-2 border-[#8E8170]/40 rounded-xl p-6 sm:p-12 bg-[#1c1c1c] space-y-6 sm:space-y-8 text-center relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#8E8170]/25 pb-4">
                  <span className="text-xs font-mono text-[#EAD9B8] font-bold tracking-widest">
                    OFFICIAL ACCREDITATION
                  </span>
                  <span className="text-xs font-mono text-[#C8B99F]">
                    {activeCert.organization}
                  </span>
                </div>

                <div className="space-y-3 sm:space-y-4 py-4">
                  <span className="text-xs font-mono text-[#C8B99F] tracking-widest block uppercase">
                    THIS CERTIFICATE IS AWARDED TO
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-[#EAD9B8] tracking-tight uppercase">
                    ANU KUMARI SHAH
                  </h2>
                  <div className="w-24 h-1 bg-[#8E8170] mx-auto rounded-full" />
                  <span className="text-xs font-mono text-[#C8B99F] tracking-widest block uppercase pt-2">
                    IN RECOGNITION OF SUCCESSFUL COMPLETION OF
                  </span>
                  <h3 className="text-lg sm:text-2xl font-display font-bold text-[#F5EBDD]">
                    {activeCert.title}
                  </h3>
                </div>

                <div className="pt-6 border-t border-[#8E8170]/25 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#C8B99F] gap-2">
                  <span>ISSUED: {activeCert.date}</span>
                  <span className="text-[#EAD9B8]">VERIFICATION ID: {activeCert.credentialId}</span>
                </div>
              </div>

              {/* Close Action */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="px-5 py-2.5 rounded-lg bg-white/10 text-xs font-mono text-[#F5EBDD] hover:bg-white/20 transition-colors"
                >
                  CLOSE PREVIEW
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default CertificationsStory;
