import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Award,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  Copy,
  Check,
  X,
  FileText,
  Building,
  Calendar,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Activity,
  Code2,
  Layers,
  Terminal,
  Compass,
  Cpu
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

/* ==========================================================================
   CATEGORY COLOR AND ICON METADATA
   ========================================================================== */
const CATEGORY_META = {
  'Data Analytics & EDA': {
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    accent: '#10b981',
    icon: Activity,
  },
  'Competitive Coding': {
    badge: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    accent: '#f43f5e',
    icon: Code2,
  },
  'Design Competition': {
    badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    accent: '#f59e0b',
    icon: Sparkles,
  },
  'Academic Exchange': {
    badge: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    accent: '#6366f1',
    icon: Compass,
  },
  'Professional Internship': {
    badge: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    accent: '#a855f7',
    icon: Layers,
  },
  'Technical Training': {
    badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    accent: '#06b6d4',
    icon: Cpu,
  },
  'Leadership & Community': {
    badge: 'bg-pink-500/10 text-pink-300 border-pink-500/30',
    accent: '#ec4899',
    icon: Sparkles,
  },
  'Technical Achievement': {
    badge: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    accent: '#0ea5e9',
    icon: Terminal,
  },
  'Professional Development': {
    badge: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    accent: '#14b8a6',
    icon: Sparkles,
  },
};

/* ==========================================================================
   AUTHENTICATED CREDENTIAL INSPECTION MODAL
   ========================================================================== */
const CertModal = ({ cert, onClose, onCopyId, copiedId }) => {
  if (!cert) return null;

  const meta = CATEGORY_META[cert.category] || {
    badge: 'bg-[#EAD9B8]/10 text-[#EAD9B8] border-[#8E8170]/30',
    accent: '#EAD9B8',
    icon: Award,
  };
  const CategoryIcon = meta.icon;
  const docUrl = cert.link || cert.image;
  const isPdf = docUrl && docUrl.toLowerCase().endsWith('.pdf');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none"
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 15 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-2xl bg-[#171717] border-2 border-[#EAD9B8]/60 p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(234,217,184,0.15)] space-y-4 my-auto max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#C8B99F] hover:text-[#EAD9B8] transition-colors"
          aria-label="Close Inspector Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Top Header */}
        <div className="flex items-center gap-3 border-b border-[#8E8170]/25 pb-3 pr-8">
          <div
            className="p-2.5 rounded-xl border flex items-center justify-center"
            style={{
              backgroundColor: `${meta.accent}15`,
              borderColor: `${meta.accent}50`,
              color: meta.accent,
            }}
          >
            <CategoryIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border font-bold ${meta.badge}`}>
                {cert.category}
              </span>
              <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                VERIFIED CREDENTIAL
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-display font-extrabold text-[#EAD9B8] mt-1">
              {cert.title}
            </h3>
          </div>
        </div>

        {/* Certificate Visual Image */}
        {cert.image ? (
          <div className="relative rounded-xl overflow-hidden border border-[#8E8170]/40 max-h-[320px] bg-black/50 group flex items-center justify-center">
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-full max-h-[320px] object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent opacity-60" />
            {docUrl && (
              <a
                href={docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-[#171717]/90 border border-[#EAD9B8]/60 text-xs font-mono text-[#EAD9B8] hover:bg-[#EAD9B8] hover:text-[#171717] transition-all flex items-center gap-1.5 shadow-lg backdrop-blur-md font-bold"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>EXPAND FULL VIEW</span>
              </a>
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-[#8E8170]/30 bg-white/[0.02] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#EAD9B8]/10 border border-[#EAD9B8]/30 flex items-center justify-center text-[#EAD9B8]">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#C8B99F] uppercase tracking-wider block">
                  ISSUING AUTHORITY
                </span>
                <span className="text-sm font-display font-bold text-[#F5EBDD]">
                  {cert.organization}
                </span>
                <span className="text-xs font-mono text-[#8E8170] block mt-0.5">
                  Conferred: {cert.date}
                </span>
              </div>
            </div>
            {docUrl && (
              <a
                href={docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[#EAD9B8] text-[#171717] font-mono text-xs font-bold flex items-center gap-1.5 hover:bg-[#d6c39f] transition-all shadow-md shrink-0"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>VIEW OFFICIAL PDF</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            )}
          </div>
        )}

        {/* Verification Telemetry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <span className="text-[#8E8170]">ORGANIZATION:</span>
            <span className="text-[#EAD9B8] font-bold text-right truncate max-w-[200px]">{cert.organization}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <span className="text-[#8E8170]">DATE ISSUED:</span>
            <span className="text-[#EAD9B8] font-bold">{cert.date}</span>
          </div>
        </div>

        {/* Credential ID with Copy Action */}
        {cert.credentialId && (
          <div className="p-3 rounded-xl bg-black/40 border border-[#8E8170]/30 flex items-center justify-between gap-3">
            <div className="overflow-hidden">
              <span className="text-[9px] font-mono text-[#8E8170] uppercase tracking-wider block">
                AUTHENTICATED SERIAL / CREDENTIAL ID
              </span>
              <span className="text-xs font-mono text-[#EAD9B8] font-bold truncate block">
                {cert.credentialId}
              </span>
            </div>
            <button
              onClick={() => onCopyId(cert.credentialId)}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#EAD9B8]/20 border border-[#8E8170]/40 text-[#EAD9B8] text-xs font-mono font-bold flex items-center gap-1.5 transition-all shrink-0"
              title="Copy Credential ID"
            >
              {copiedId === cert.credentialId ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY ID</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Description */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-mono text-[#C8B99F] uppercase tracking-wider block font-semibold">
            CREDENTIAL SYLLABUS & OVERVIEW
          </span>
          <p className="text-[#F5EBDD] text-xs sm:text-sm leading-relaxed font-light bg-black/25 p-3 rounded-xl border border-white/5">
            {cert.description}
          </p>
        </div>

        {/* Evaluated Skills */}
        {cert.skills && cert.skills.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[9px] font-mono text-[#C8B99F] uppercase tracking-wider block font-semibold">
              EVALUATED TECHNICAL COMPETENCIES
            </span>
            <div className="flex flex-wrap gap-1.5">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-[10px] font-mono rounded bg-white/[0.04] border border-[#8E8170]/30 text-[#EAD9B8]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-[#8E8170]/25 gap-3">
          <div className="flex items-center gap-2">
            {docUrl && (
              <a
                href={docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#EAD9B8] hover:bg-[#d6c39f] text-[#171717] text-xs font-mono font-bold transition-all shadow-md hover:scale-105 active:scale-95"
              >
                <span>{isPdf ? 'OPEN DOCUMENT (PDF)' : 'OPEN ATTESTATION'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#C8B99F] hover:text-[#EAD9B8] transition-colors"
          >
            CLOSE
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ==========================================================================
   MAIN EDITORIAL LUXURY CERTIFICATIONS STORY COMPONENT
   Inspired by editorial accommodation design:
   - Left side: Eyebrow, Large Serif Headline, Divider, Paragraph, Outline CTA Button, Prev/Next Arrows
   - Right side: Smooth horizontal card carousel with peek effect & high-res cards
   ========================================================================== */
const CertificationsStory = () => {
  const { certifications } = usePortfolio();
  const [activeIndex, setActiveIndex] = useState(0);
  const [inspectedCert, setInspectedCert] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [cardWidth, setCardWidth] = useState(380);
  const containerRef = useRef(null);

  // Filter important/featured certifications for homepage luxury showcase
  const featuredCerts = useMemo(() => {
    const list = certifications.filter((c) => c.isImportant);
    return list.length > 0 ? list : certifications;
  }, [certifications]);

  const total = featuredCerts.length;

  // Responsive card width calculation
  useEffect(() => {
    const updateWidth = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth < 640) {
        setCardWidth(window.innerWidth - 64);
      } else if (window.innerWidth < 1024) {
        setCardWidth(340);
      } else {
        setCardWidth(390);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleCopyId = (id) => {
    if (!id) return;
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Keyboard navigation & Escape key dismiss
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (inspectedCert) {
        if (e.key === 'Escape') setInspectedCert(null);
        return;
      }
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inspectedCert, handleNext, handlePrev]);

  // Peek calculation: when activeIndex > 0, previous card peeks from left
  const gap = 20;
  const peekOffset = activeIndex > 0 ? (typeof window !== 'undefined' && window.innerWidth < 640 ? 40 : 80) : 0;
  const translateX = -activeIndex * (cardWidth + gap) + peekOffset;

  return (
    <section
      id="certifications"
      className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10 py-6 sm:py-10 w-full select-none"
    >
      <div className="w-full flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8 sm:gap-12 lg:gap-14">

        {/* =========================================================================
            LEFT COLUMN: Editorial Intro, Serif Heading, Divider, CTA & Controls
            ========================================================================= */}
        <div className="w-full lg:w-[36%] xl:w-[34%] shrink-0 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            {/* Small Eyebrow */}
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#C8B99F] font-semibold block">
              AUTHENTICATED HONORS
            </span>

            {/* Big Serif Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#F5EBDD] font-normal tracking-tight leading-[1.12]">
              Our <br />
              <span className="italic font-light text-[#EAD9B8]">Certifications</span>
            </h2>

            {/* Subtle Divider Line */}
            <div className="w-14 h-[2px] bg-[#8E8170]/50 my-4" />

            {/* Descriptive Paragraph */}
            <p className="text-xs sm:text-sm text-[#C8B99F] font-light leading-relaxed max-w-sm">
              Verified academic milestones, competitive coding honors, and industry job simulations reflecting continuous technical dedication across AI, data analytics, and modern web systems.
            </p>
          </div>

          {/* Action & Carousel Controls */}
          <div className="space-y-4 pt-2">
            {/* View All Button */}
            <div>
              <Link
                to="/certifications"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#8E8170]/60 text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#F5EBDD] hover:bg-[#EAD9B8] hover:text-[#171717] hover:border-[#EAD9B8] transition-all duration-300 shadow-sm group/btn"
              >
                <span>VIEW ALL CERTIFICATES</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Slider Navigation Arrows & Page Indicator */}
            <div className="flex items-center gap-4 pt-2 text-xs font-mono text-[#C8B99F]">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-full border border-[#8E8170]/40 hover:border-[#EAD9B8] text-[#C8B99F] hover:text-[#EAD9B8] hover:bg-white/[0.04] transition-all active:scale-95"
                  aria-label="Previous Certificate"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-full border border-[#8E8170]/40 hover:border-[#EAD9B8] text-[#C8B99F] hover:text-[#EAD9B8] hover:bg-white/[0.04] transition-all active:scale-95"
                  aria-label="Next Certificate"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <span className="text-[11px] tracking-widest text-[#8E8170]">
                <span className="text-[#EAD9B8] font-bold">0{activeIndex + 1}</span> / 0{total}
              </span>

              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5 ml-auto">
                {featuredCerts.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? 'w-6 bg-[#EAD9B8]'
                        : 'w-1.5 bg-[#8E8170]/40 hover:bg-[#8E8170]'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT AREA: Horizontal Card Carousel with Peek Effect
            ========================================================================= */}
        <div
          ref={containerRef}
          className="w-full lg:w-[64%] xl:w-[66%] flex-1 overflow-hidden relative py-2"
        >
          {/* Subtle gradient shadow on left edge when peeking */}
          {activeIndex > 0 && (
            <div className="absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-[#171717] to-transparent z-10 pointer-events-none" />
          )}

          {/* Sliding Track */}
          <motion.div
            animate={{ x: translateX }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            className="flex gap-5 items-stretch"
          >
            {featuredCerts.map((cert, index) => {
              const isActive = index === activeIndex;
              const meta = CATEGORY_META[cert.category];

              return (
                <div
                  key={cert.id}
                  onClick={() => setInspectedCert(cert)}
                  style={{ width: `${cardWidth}px` }}
                  className={`shrink-0 cursor-pointer group flex flex-col justify-between transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-70 hover:opacity-90 scale-[0.98]'
                  }`}
                >
                  {/* Certificate Image Frame */}
                  <div className="relative w-full h-[210px] sm:h-[240px] md:h-[260px] rounded-2xl overflow-hidden bg-black/50 border border-[#8E8170]/30 group-hover:border-[#EAD9B8]/60 transition-all duration-500 shadow-xl group-hover:shadow-[0_16px_40px_rgba(234,217,184,0.12)]">
                    {cert.image ? (
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#1b1b1b] to-[#121212]">
                        <Award className="w-12 h-12 text-[#EAD9B8] mb-2" />
                        <span className="text-xs font-mono text-[#8E8170]">{cert.organization}</span>
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent opacity-60" />

                    {/* Category pill on top-left of image */}
                    {cert.category && (
                      <span className="absolute top-3 left-3 text-[9px] font-mono uppercase px-2.5 py-1 rounded bg-[#171717]/85 border border-[#8E8170]/40 text-[#EAD9B8] font-semibold backdrop-blur-md">
                        {cert.category}
                      </span>
                    )}

                    {/* Hover Inspect Specs Badge */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-3.5 py-1.5 rounded-lg bg-[#EAD9B8] text-[#171717] font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-3.5 h-3.5" />
                        <span>INSPECT CREDENTIAL</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Editorial Info Below Image (Matching Reference Screenshot) */}
                  <div className="pt-3.5 pb-1 space-y-1">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#F5EBDD] group-hover:text-[#EAD9B8] transition-colors leading-snug line-clamp-1">
                      {cert.title}
                    </h3>

                    <div className="flex items-center justify-between text-xs font-mono text-[#C8B99F]">
                      <span className="truncate max-w-[240px] text-[#C8B99F]/90">
                        {cert.organization}
                      </span>
                      <span className="text-[#8E8170] shrink-0 font-light">
                        {cert.date}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

      </div>

      {/* =========================================================================
          FULLSCREEN HIGH-RESOLUTION INSPECTOR MODAL
          ========================================================================= */}
      <AnimatePresence>
        {inspectedCert && (
          <CertModal
            cert={inspectedCert}
            onClose={() => setInspectedCert(null)}
            onCopyId={handleCopyId}
            copiedId={copiedId}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificationsStory;
