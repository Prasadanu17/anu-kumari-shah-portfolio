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
    <div className="relative rounded-xl sm:rounded-2xl bg-[#070b09] border border-[#1e6f5c]/40 p-2.5 sm:p-8 shadow-2xl overflow-hidden group">
      {/* Background Decorative Ambient Radial Gradient */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#1e6f5c]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-[#28967d]/10 blur-3xl pointer-events-none" />

      {/* Double Certificate Guilloche Frame Motif */}
      <div className="border border-[#1e6f5c]/30 rounded-lg sm:rounded-xl p-2.5 sm:p-7 relative bg-[#0a0f0d]/90 backdrop-blur-md space-y-3 sm:space-y-6">
        
        {/* Top Header: Issuing Organization Badge & Verified Seal */}
        <div className="flex items-start justify-between border-b border-[#1e6f5c]/20 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#1e6f5c]" />
              <span className="text-[8px] sm:text-xs font-mono font-bold uppercase tracking-wider sm:tracking-widest text-[#1e6f5c]">
                {cert.organization}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#8E9793] uppercase tracking-wider block">
              ACCREDITED TECHNICAL CREDENTIAL
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e6f5c]/15 border border-[#1e6f5c]/30 text-[10px] font-mono font-semibold text-[#6bb2a0]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1e6f5c]" />
            <span>VERIFIED</span>
          </div>
        </div>

        {/* Certificate Body: Presentee & Title */}
        <div className="text-center space-y-2 sm:space-y-4 py-1 sm:py-3">
          <div className="inline-flex items-center justify-center p-1.5 sm:p-3 rounded-full bg-[#1e6f5c]/10 border border-[#1e6f5c]/30 mb-0.5">
            <Award className="w-4 h-4 sm:w-7 sm:h-7 text-[#1e6f5c]" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono text-[#8E9793] uppercase tracking-[0.2em] block">
              THIS CERTIFIES THAT
            </span>
            <h3 className="text-sm sm:text-2xl font-display font-extrabold text-[#F4F5F4] tracking-tight uppercase">
              ANU KUMARI SHAH
            </h3>
          </div>

          <div className="w-16 h-0.5 bg-[#1e6f5c]/50 mx-auto rounded-full" />

          <div className="space-y-1 max-w-md mx-auto">
            <span className="text-[10px] font-mono text-[#8E9793] uppercase tracking-widest block">
              HAS SUCCESSFULLY COMPLETED
            </span>
            <h4 className="text-[10px] sm:text-lg font-display font-bold text-[#6bb2a0] leading-snug">
              {cert.title}
            </h4>
          </div>
        </div>

        {/* Certificate Footer: Credential ID & Signatures */}
        <div className="pt-4 border-t border-[#1e6f5c]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div className="space-y-0.5 text-center sm:text-left">
            <span className="text-[9px] font-mono text-[#8E9793] uppercase tracking-wider block">
              CREDENTIAL ID: <span className="text-[#F4F5F4]">{cert.credentialId || 'CRED-2026-VERIFIED'}</span>
            </span>
            <span className="text-[9px] font-mono text-[#8E9793] uppercase tracking-wider block">
              DATE OF ISSUANCE: <span className="text-[#1e6f5c]">{cert.date}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onFullscreen}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-lg bg-[#1e6f5c] text-white text-[9px] sm:text-xs font-mono font-semibold hover:bg-[#28967d] transition-all duration-300 shadow-md shadow-[#1e6f5c]/20 group/btn"
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
      className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto z-10 pt-24 sm:pt-28 pb-12 sm:pb-20"
    >
      <div className="space-y-14">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="h-px w-10 bg-[#1e6f5c]/40" />
            <span className="text-xs font-mono text-[#1e6f5c] tracking-widest uppercase font-bold">
              06 / CERTIFICATIONS & ACCREDITATIONS
            </span>
            <div className="h-px w-10 bg-[#1e6f5c]/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-xl sm:text-5xl text-[#F4F5F4] tracking-tight uppercase"
          >
            CONTINUOUS LEARNING & CREDENTIALS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#8E9793] text-[10px] sm:text-base font-light max-w-xl leading-relaxed"
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
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-mono text-[#8E9793] uppercase tracking-wider font-semibold">
                SELECT CREDENTIAL ({certifications.length})
              </span>
              <span className="text-[10px] font-mono text-[#1e6f5c]">INLINE PREVIEW</span>
            </div>

            <div className="space-y-3">
              {certifications.map((cert, idx) => {
                const isActive = cert.id === activeCertId;
                const indexNum = (idx + 1).toString().padStart(2, '0');

                return (
                  <button
                    key={cert.id}
                    onClick={() => setActiveCertId(cert.id)}
                    className={`w-full text-left p-2 sm:p-5 rounded-lg sm:rounded-xl transition-all duration-300 relative group flex items-center justify-between gap-2 sm:gap-4 border ${
                      isActive
                        ? 'bg-[#0d1310] border-[#1e6f5c] shadow-lg shadow-[#1e6f5c]/10'
                        : 'bg-[#0d1310]/60 border-white/10 hover:border-white/25 hover:bg-[#0d1310]'
                    }`}
                  >
                    {/* Active Accent Bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activeCertBar"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-[#1e6f5c] rounded-l-xl"
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    <div className="flex items-start gap-1.5 sm:gap-3.5 pl-0.5 sm:pl-1">
                      <span className={`text-[9px] sm:text-xs font-mono font-bold mt-0.5 ${isActive ? 'text-[#1e6f5c]' : 'text-[#8E9793]'}`}>
                        {indexNum}
                      </span>

                      <div className="space-y-1">
                        <h4 className={`text-[9px] sm:text-sm font-display font-bold leading-snug transition-colors ${
                          isActive ? 'text-[#F4F5F4]' : 'text-[#8E9793] group-hover:text-[#F4F5F4]'
                        }`}>
                          {cert.title}
                        </h4>

                        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-[#8E9793]">
                          <span className={isActive ? 'text-[#1e6f5c] font-semibold' : ''}>
                            {cert.organization}
                          </span>
                          <span>•</span>
                          <span>{cert.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center shrink-0">
                      <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                        isActive ? 'text-[#1e6f5c] translate-x-1' : 'text-[#8E9793] group-hover:translate-x-0.5'
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
                className="p-5 sm:p-6 rounded-xl bg-[#0d1310] border border-white/10 space-y-4 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.08] pb-3 gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-[#1e6f5c] uppercase tracking-wider block font-bold">
                      SELECTED CREDENTIAL METADATA
                    </span>
                    <h3 className="text-sm sm:text-base font-display font-bold text-[#F4F5F4]">
                      {activeCert.title}
                    </h3>
                  </div>

                  <span className="self-start sm:self-auto text-xs font-mono text-[#8E9793] px-3 py-1 rounded bg-white/[0.04] border border-white/10">
                    {activeCert.date}
                  </span>
                </div>

                <p className="text-xs text-[#8E9793] font-light leading-relaxed">
                  {activeCert.description}
                </p>

                {/* Skills Acquired */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono text-[#8E9793] uppercase tracking-wider block">
                    KEY TECHNICAL COMPETENCIES:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeCert.skills.map((sk) => (
                      <span
                        key={sk}
                        className="px-2.5 py-1 text-xs font-mono rounded-md bg-[#1e6f5c]/10 border border-[#1e6f5c]/30 text-[#6bb2a0] font-medium"
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
          className="p-6 sm:p-8 rounded-2xl bg-[#0d1310]/80 border border-[#1e6f5c]/30 space-y-4 backdrop-blur-md relative overflow-hidden"
        >
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#1e6f5c] animate-spin" style={{ animationDuration: '12s' }} />
            <h3 className="text-xs font-mono text-[#1e6f5c] uppercase tracking-widest font-bold">
              CURRENTLY EXPLORING & DEEP-DIVING
            </h3>
          </div>

          <p className="text-xs text-[#8E9793] font-light max-w-xl leading-relaxed">
            Continuously staying ahead of technical advancements in generative artificial intelligence, agentic architectures, and modern machine learning deployment frameworks.
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-2">
            {currentlyExploring.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg bg-[#1e6f5c]/10 border border-[#1e6f5c]/30 text-xs font-mono text-[#F4F5F4] hover:bg-[#1e6f5c]/25 transition-all duration-300 font-medium hover:scale-105"
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
              className="relative w-full max-w-3xl bg-[#070b09] border border-[#1e6f5c]/50 rounded-2xl p-5 sm:p-10 shadow-2xl space-y-6"
            >
              {/* Header Bar with Close Button */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-[#1e6f5c]" />
                  <span className="text-xs font-mono text-[#F4F5F4] font-bold uppercase tracking-wider">
                    {activeCert.title}
                  </span>
                </div>

                <button
                  onClick={() => setIsFullscreen(false)}
                  className="p-2 rounded-lg bg-white/10 text-[#8E9793] hover:text-white hover:bg-white/20 transition-colors"
                  title="Close Fullscreen View"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Fullscreen High-Resolution Certificate Document */}
              <div className="border-2 border-[#1e6f5c]/40 rounded-xl p-6 sm:p-12 bg-[#0a0f0d] space-y-6 sm:space-y-8 text-center relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#1e6f5c]/20 pb-4">
                  <span className="text-xs font-mono text-[#1e6f5c] font-bold tracking-widest">
                    OFFICIAL ACCREDITATION
                  </span>
                  <span className="text-xs font-mono text-[#8E9793]">
                    {activeCert.organization}
                  </span>
                </div>

                <div className="space-y-3 sm:space-y-4 py-4">
                  <span className="text-xs font-mono text-[#8E9793] tracking-widest block uppercase">
                    THIS CERTIFICATE IS AWARDED TO
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-[#F4F5F4] tracking-tight uppercase">
                    ANU KUMARI SHAH
                  </h2>
                  <div className="w-24 h-1 bg-[#1e6f5c] mx-auto rounded-full" />
                  <span className="text-xs font-mono text-[#8E9793] tracking-widest block uppercase pt-2">
                    IN RECOGNITION OF SUCCESSFUL COMPLETION OF
                  </span>
                  <h3 className="text-lg sm:text-2xl font-display font-bold text-[#6bb2a0]">
                    {activeCert.title}
                  </h3>
                </div>

                <div className="pt-6 border-t border-[#1e6f5c]/20 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#8E9793] gap-2">
                  <span>ISSUED: {activeCert.date}</span>
                  <span className="text-[#1e6f5c]">VERIFICATION ID: {activeCert.credentialId}</span>
                </div>
              </div>

              {/* Close Action */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="px-5 py-2.5 rounded-lg bg-white/10 text-xs font-mono text-white hover:bg-white/20 transition-colors"
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
