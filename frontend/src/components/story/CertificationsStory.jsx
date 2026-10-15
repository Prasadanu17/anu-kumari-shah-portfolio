import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Compass,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Activity,
  Terminal,
  Layers,
  Cpu,
  Play,
  Pause,
  RotateCw
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

/* ==========================================================================
   METALLIC HOLOGRAPHIC THEMES PER CATEGORY
   ========================================================================== */
const CATEGORY_META = {
  'Data Analytics & EDA': {
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    foilGlow: 'rgba(16, 185, 129, 0.22)',
    accent: '#10b981',
    icon: Activity,
  },
  'Design Competition': {
    badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    foilGlow: 'rgba(245, 158, 11, 0.22)',
    accent: '#f59e0b',
    icon: Sparkles,
  },
  'Technical Achievement': {
    badge: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    foilGlow: 'rgba(14, 165, 233, 0.22)',
    accent: '#0ea5e9',
    icon: Terminal,
  },
  'Professional Internship': {
    badge: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    foilGlow: 'rgba(168, 85, 247, 0.22)',
    accent: '#a855f7',
    icon: Layers,
  },
};

const RADAR_DOMAINS = [
  { name: 'Deep Learning', icon: Cpu, accent: '#10b981' },
  { name: 'MLOps', icon: Layers, accent: '#0ea5e9' },
  { name: 'NLP', icon: Terminal, accent: '#a855f7' },
  { name: 'Computer Vision', icon: Activity, accent: '#f59e0b' },
  { name: 'LLMs', icon: Sparkles, accent: '#ec4899' },
  { name: 'AI Agents', icon: Compass, accent: '#EAD9B8' },
];

/* ==========================================================================
   3D HOLOGRAPHIC COVERFLOW CARD
   ========================================================================== */
const CylindricalCard = ({
  cert,
  index,
  activeIndex,
  total,
  onSelect,
  onInspect,
  onCopyId,
  copiedId,
}) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 240, damping: 22 });
  const mouseY = useSpring(y, { stiffness: 240, damping: 22 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-16deg', '16deg']);
  const sheenX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const sheenY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  // Calculate cylindrical position relative to activeIndex (-1, 0, 1, 2)
  let offset = (index - activeIndex) % total;
  if (offset < -1) offset += total;
  if (offset > 2) offset -= total;

  const isCenter = offset === 0;
  const isLeft = offset === -1 || (offset === total - 1 && total > 2);
  const isRight = offset === 1 || (offset === -(total - 1) && total > 2);
  const isHidden = !isCenter && !isLeft && !isRight;

  const handleMouseMove = (e) => {
    if (!isCenter || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Cylindrical transforms
  let cylinderX = 0;
  let cylinderZ = 0;
  let cylinderRotateY = 0;
  let scale = 1;
  let opacity = 1;
  let zIndex = 30;

  if (isCenter) {
    cylinderX = 0;
    cylinderZ = 70;
    cylinderRotateY = 0;
    scale = 1;
    opacity = 1;
    zIndex = 30;
  } else if (isLeft) {
    cylinderX = -270;
    cylinderZ = -60;
    cylinderRotateY = 32;
    scale = 0.82;
    opacity = 0.35;
    zIndex = 10;
  } else if (isRight) {
    cylinderX = 270;
    cylinderZ = -60;
    cylinderRotateY = -32;
    scale = 0.82;
    opacity = 0.35;
    zIndex = 10;
  } else {
    cylinderX = 0;
    cylinderZ = -140;
    cylinderRotateY = 180;
    scale = 0.65;
    opacity = 0;
    zIndex = 0;
  }

  const meta = CATEGORY_META[cert.category] || {
    badge: 'bg-[#EAD9B8]/10 text-[#EAD9B8] border-[#8E8170]/30',
    foilGlow: 'rgba(234, 217, 184, 0.15)',
    accent: '#EAD9B8',
    icon: Award,
  };
  const CategoryIcon = meta.icon;
  const isCopied = copiedId === cert.credentialId;

  return (
    <motion.div
      ref={cardRef}
      onClick={() => {
        if (!isCenter) onSelect(index);
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: cylinderX,
        z: cylinderZ,
        rotateY: cylinderRotateY,
        scale,
        opacity,
      }}
      transition={{
        duration: 1.15,
        ease: [0.16, 1, 0.3, 1], // Slow, luxurious, continuous cylindrical deceleration
      }}
      style={{
        zIndex,
        rotateX: isCenter ? rotateX : 0,
        rotateY: isCenter ? rotateY : cylinderRotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`absolute w-[320px] sm:w-[480px] md:w-[520px] rounded-2xl p-4 sm:p-5 select-none transition-all duration-300 ${
        isCenter
          ? 'bg-[#1b1b1b]/95 border-2 border-[#EAD9B8]/70 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(234,217,184,0.18)] backdrop-blur-xl cursor-default pointer-events-auto'
          : 'bg-[#161616]/75 border border-[#8E8170]/30 shadow-xl backdrop-blur-md cursor-pointer hover:border-[#EAD9B8]/50 hover:opacity-55'
      }`}
    >
      {/* 3D Holographic Foil Sheen & Circuit Watermark */}
      <motion.div
        className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 ${
          isCenter ? 'opacity-35' : 'opacity-10'
        }`}
        style={{
          background: isCenter
            ? `radial-gradient(circle 320px at ${sheenX} ${sheenY}, rgba(234, 217, 184, 0.35), rgba(99, 216, 181, 0.1) 40%, transparent 75%)`
            : `linear-gradient(135deg, rgba(234, 217, 184, 0.12), transparent)`,
        }}
      />

      {/* Gold Beveled Corner Markers */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-[#EAD9B8]/60 rounded-tl" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#EAD9B8]/60 rounded-tr" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[#EAD9B8]/60 rounded-bl" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-[#EAD9B8]/60 rounded-br" />

      {/* Card Body with 3D Depth */}
      <div
        className="relative z-10 flex flex-col justify-between space-y-3"
        style={{ transform: isCenter ? 'translateZ(20px)' : 'none' }}
      >
        {/* Header: Category Badge + Verified Pulse */}
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-semibold uppercase tracking-wider border ${meta.badge}`}>
            <CategoryIcon className="w-3 h-3" />
            {cert.category}
          </span>

          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[9px] sm:text-[10px] font-mono font-semibold text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <ShieldCheck className="w-3 h-3" />
            <span>VERIFIED</span>
          </div>
        </div>

        {/* Title, Organization & Date */}
        <div className="space-y-0.5">
          <h3 className="text-sm sm:text-lg font-display font-bold text-[#EAD9B8] leading-tight tracking-tight line-clamp-1">
            {cert.title}
          </h3>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-[#C8B99F]">
            <span className="text-[#F5EBDD] font-medium">{cert.organization}</span>
            <span>•</span>
            <span className="text-[#EAD9B8]">{cert.date}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-[10px] sm:text-[11px] text-[#C8B99F] font-light leading-relaxed line-clamp-2">
          {cert.description}
        </p>

        {/* Skills Chips */}
        <div className="flex flex-wrap gap-1">
          {cert.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 text-[9px] font-mono rounded bg-white/[0.04] border border-[#8E8170]/25 text-[#F5EBDD]"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Footer Actions (Visible on Active Card) */}
        <div className="pt-2 border-t border-[#8E8170]/20 flex items-center justify-between gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCopyId(cert.credentialId);
            }}
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-black/40 border border-[#8E8170]/30 hover:border-[#EAD9B8]/50 text-[10px] font-mono text-[#C8B99F] hover:text-[#EAD9B8] transition-colors"
            title="Click to copy credential ID"
          >
            {isCopied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-bold">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span className="truncate max-w-[120px] sm:max-w-[160px]">{cert.credentialId || 'VERIFIED-ID'}</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            {cert.link && (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.03] hover:bg-white/[0.08] border border-[#8E8170]/30 text-[10px] font-mono text-[#F5EBDD] hover:text-[#EAD9B8] transition-colors"
              >
                <span>PORTAL</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onInspect(cert);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#EAD9B8] hover:bg-[#F5EBDD] text-[#171717] text-[10px] sm:text-xs font-mono font-bold transition-all shadow-sm hover:scale-105"
            >
              <span>INSPECT</span>
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

/* ==========================================================================
   3D CYLINDRICAL COVERFLOW MAIN COMPONENT
   ========================================================================== */
export default function CertificationsStory() {
  const { certifications } = usePortfolio();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [inspectedCert, setInspectedCert] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const total = certifications.length;
  const activeCert = certifications[activeIndex] || certifications[0];

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleSelect = (idx) => {
    setActiveIndex(idx);
  };

  const handleCopyId = (id) => {
    if (!id) return;
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Continuous automatic slow 3D cylinder rotation every 5.0 seconds
  useEffect(() => {
    if (!isAutoPlaying || inspectedCert) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, inspectedCert, handleNext]);

  // Keyboard navigation (< & >) and Escape modal dismiss
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

  return (
    <section
      id="certifications"
      className="relative flex flex-col justify-center items-center px-4 sm:px-6 max-w-5xl mx-auto z-10 py-1 sm:py-2 w-full select-none"
    >
      <div className="w-full space-y-2.5 sm:space-y-3.5">

        {/* ── Compact Header ── */}
        <div className="flex flex-col items-center text-center space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-px w-6 sm:w-10 bg-[#8E8170]/40" />
            <span className="text-[10px] sm:text-xs font-mono text-[#C8B99F] tracking-widest uppercase font-bold">
              07 / CREDENTIALS & RADAR
            </span>
            <div className="h-px w-6 sm:w-10 bg-[#8E8170]/40" />
          </div>

          <h2 className="font-display font-extrabold text-xl sm:text-3xl text-[#EAD9B8] tracking-tight uppercase">
            CONTINUOUS LEARNING & CREDENTIALS
          </h2>

          <p className="text-[#C8B99F] text-[10px] sm:text-xs font-light max-w-md">
            Interactive 3D cylindrical coverflow of verified credentials and active R&D radar.
          </p>
        </div>

        {/* ── Cylinder Navigation Tabs with Auto-Play Progress ── */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
          {certifications.map((cert, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={cert.id}
                onClick={() => handleSelect(idx)}
                className={`relative px-2.5 py-1 rounded-lg text-[9px] sm:text-[11px] font-mono transition-all duration-300 border flex items-center gap-1.5 overflow-hidden ${
                  isActive
                    ? 'bg-[#EAD9B8] text-[#171717] border-[#EAD9B8] font-bold shadow-md scale-105'
                    : 'bg-[#1c1c1c]/70 text-[#C8B99F] border-[#8E8170]/30 hover:border-[#EAD9B8]/40 hover:text-[#F5EBDD]'
                }`}
              >
                <span>0{idx + 1}</span>
                <span className="hidden sm:inline truncate max-w-[130px]">{cert.organization}</span>

                {/* Slow Continuous Progress Bar on Active Tab */}
                {isActive && isAutoPlaying && !inspectedCert && (
                  <motion.div
                    key={`bar-${activeIndex}`}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5.0, ease: 'linear' }}
                    className="absolute bottom-0 left-0 h-[2.5px] bg-[#171717] rounded-full"
                  />
                )}
              </button>
            );
          })}

          {/* Auto-Play Toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-2 py-1 rounded-lg text-[9px] font-mono border transition-all duration-200 flex items-center gap-1 ${
              isAutoPlaying
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-white/5 text-[#C8B99F] border-[#8E8170]/30 hover:text-white'
            }`}
            title={isAutoPlaying ? 'Pause Auto-Cylinder' : 'Resume Auto-Cylinder'}
          >
            {isAutoPlaying ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
            <span>{isAutoPlaying ? 'AUTO' : 'PAUSED'}</span>
          </button>
        </div>

        {/* ── 3D CYLINDRICAL COVERFLOW ARENA (Height ~280px) ── */}
        <div
          className="relative w-full h-[255px] sm:h-[285px] flex items-center justify-center overflow-visible"
          style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
        >
          {/* Navigation Chevron Left */}
          <button
            onClick={handlePrev}
            className="absolute left-0 sm:left-4 z-40 p-2 sm:p-2.5 rounded-full bg-[#1c1c1c]/90 border border-[#8E8170]/40 hover:border-[#EAD9B8] text-[#C8B99F] hover:text-[#EAD9B8] shadow-lg transition-all hover:scale-110 active:scale-95"
            aria-label="Previous Credential"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* 3D Cylindrical Cards Matrix */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {certifications.map((cert, index) => (
              <CylindricalCard
                key={cert.id}
                cert={cert}
                index={index}
                activeIndex={activeIndex}
                total={total}
                onSelect={handleSelect}
                onInspect={(c) => setInspectedCert(c)}
                onCopyId={handleCopyId}
                copiedId={copiedId}
              />
            ))}
          </div>

          {/* Navigation Chevron Right */}
          <button
            onClick={handleNext}
            className="absolute right-0 sm:right-4 z-40 p-2 sm:p-2.5 rounded-full bg-[#1c1c1c]/90 border border-[#8E8170]/40 hover:border-[#EAD9B8] text-[#C8B99F] hover:text-[#EAD9B8] shadow-lg transition-all hover:scale-110 active:scale-95"
            aria-label="Next Credential"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* ── Compact Autonomous Learning Radar Bar ── */}
        <div className="w-full max-w-[680px] mx-auto rounded-xl bg-[#171717]/90 border border-[#8E8170]/30 px-3 py-2 sm:px-4 sm:py-2 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center justify-center w-5 h-5 rounded-md bg-[#EAD9B8]/10 text-[#EAD9B8]">
              <Compass className="w-3 h-3 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <span className="text-[10px] font-mono text-[#EAD9B8] font-bold tracking-wider uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ACTIVE RADAR:
            </span>
          </div>

          {/* 6 High-Tech Learning Vectors */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-end">
            {RADAR_DOMAINS.map((item) => {
              const Icon = item.icon;
              return (
                <span
                  key={item.name}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.03] border border-[#8E8170]/25 text-[9px] sm:text-[10px] font-mono text-[#F5EBDD] hover:border-[#EAD9B8]/50 hover:bg-[#222] transition-colors"
                >
                  <Icon className="w-2.5 h-2.5" style={{ color: item.accent }} />
                  <span>{item.name}</span>
                </span>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── Fullscreen High-Resolution Credential Modal ── */}
      <AnimatePresence>
        {inspectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setInspectedCert(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl rounded-2xl bg-[#171717] border border-[#EAD9B8]/50 p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(234,217,184,0.12)] space-y-4"
            >
              <button
                onClick={() => setInspectedCert(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#C8B99F] hover:text-[#EAD9B8] transition-colors"
                aria-label="Close Inspector"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2.5 border-b border-[#8E8170]/25 pb-3 pr-8">
                <Award className="w-5 h-5 text-[#EAD9B8]" />
                <div>
                  <span className="text-[9px] font-mono text-[#C8B99F] uppercase tracking-wider block">
                    AUTHENTICATED CREDENTIAL INSPECTOR
                  </span>
                  <h3 className="text-sm sm:text-base font-display font-extrabold text-[#EAD9B8]">
                    {inspectedCert.title}
                  </h3>
                </div>
              </div>

              {/* Certificate Frame */}
              <div className="border border-[#8E8170]/40 rounded-xl p-4 sm:p-6 bg-[#1c1c1c]/90 text-center space-y-3">
                <div className="flex items-center justify-between text-[9px] font-mono text-[#C8B99F] border-b border-[#8E8170]/20 pb-2">
                  <span className="text-[#EAD9B8] font-bold uppercase">{inspectedCert.category}</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> VERIFIED
                  </span>
                </div>

                <div className="space-y-1.5 py-1">
                  <span className="text-[9px] font-mono text-[#C8B99F] tracking-widest uppercase block">
                    RECIPIENT
                  </span>
                  <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[#EAD9B8] uppercase">
                    ANU KUMARI SHAH
                  </h2>
                  <div className="w-16 h-0.5 bg-[#8E8170]/40 mx-auto rounded-full" />
                  <h4 className="text-xs sm:text-sm font-display font-bold text-[#F5EBDD] pt-1">
                    {inspectedCert.title}
                  </h4>
                </div>

                <p className="text-[11px] text-[#C8B99F] font-light leading-relaxed bg-black/20 p-2.5 rounded border border-white/5">
                  {inspectedCert.description}
                </p>

                <div className="pt-3 border-t border-[#8E8170]/20 flex flex-col sm:flex-row items-center justify-between text-[9px] font-mono text-[#C8B99F] gap-1.5">
                  <span>ISSUER: <strong className="text-[#EAD9B8]">{inspectedCert.organization}</strong></span>
                  <span>ID: <strong className="text-[#F5EBDD]">{inspectedCert.credentialId}</strong></span>
                  <span>DATE: <strong className="text-[#EAD9B8]">{inspectedCert.date}</strong></span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[9px] font-mono text-[#C8B99F]">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">ESC</kbd> to exit
                </span>
                <button
                  onClick={() => setInspectedCert(null)}
                  className="px-4 py-1 rounded bg-[#EAD9B8] hover:bg-[#F5EBDD] text-[#171717] text-xs font-mono font-bold transition-colors"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
