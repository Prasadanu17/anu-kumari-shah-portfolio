import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Building2,
  Calendar,
  MapPin,
  CheckCircle2,
  FolderGit2,
  Sparkles,
  ShieldCheck,
  Code2,
  Award,
  X,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ExternalLink
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

/* ==========================================================================
   ROLE CERTIFICATE METADATA MAPPING
   ========================================================================== */
const ROLE_CERTIFICATES = {
  2: {
    title: 'Web Development Internship Certificate',
    organization: 'Groveus Informatics Pvt. Ltd.',
    period: 'March 2025 – May 2025',
    category: 'Professional Industry Internship',
    credentialId: 'GRC20297',
    skills: ['PHP', 'CodeIgniter', 'MySQL', 'Full-Stack Web Dev', 'Bootstrap', 'AJAX'],
    description:
      'Successfully completed intensive full-stack web engineering internship, architecting commercial client platforms, server-side CodeIgniter MVC backends, and responsive database systems.',
    image: '/assets/certificate/groveus_certificate.jpeg',
  },
};

/* ==========================================================================
   MINIMALIST 3D GLASS CARD (Responsive for Desktop & Mobile)
   ========================================================================== */
const LuxuryGlassCard = ({ role, index, onOpenCertificate }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 220, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 220, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isCurrent = role.type === 'PART-TIME';
  const roleNumber = `0${index + 1}`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative w-full max-w-[640px] rounded-3xl p-4 sm:p-6 transition-all duration-300 backdrop-blur-2xl flex flex-col justify-between select-none bg-[#151515]/90 border border-[#EAD9B8]/40 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(234,217,184,0.12)] ring-1 ring-[#EAD9B8]/25 overflow-hidden"
    >
      {/* ── Top Specular Glass Line Highlight ── */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* ── Giant Metallic Numeral Watermark in Background ── */}
      <div
        className="absolute -right-2 -bottom-5 pointer-events-none font-display font-black text-8xl sm:text-9xl tracking-tighter leading-none select-none transition-all duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(234, 217, 184, 0.16) 0%, rgba(234, 217, 184, 0.02) 60%, transparent 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transform: 'translateZ(0px)',
        }}
      >
        {roleNumber}
      </div>

      {/* ── Subtle Ambient Light Gradient ── */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-25"
        style={{
          background: isCurrent
            ? 'radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.22), transparent 70%)'
            : 'radial-gradient(circle at 10% 20%, rgba(234, 217, 184, 0.22), transparent 70%)',
        }}
      />

      {/* ── Foreground Content ── */}
      <div className="relative z-10 flex flex-col h-full justify-between space-y-3" style={{ transform: 'translateZ(20px)' }}>

        {/* ── Card Header: Numeral Badge, Company, Status & Optional Certificate ── */}
        <div className="flex items-start justify-between gap-2 border-b border-white/[0.06] pb-2.5 flex-wrap">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[11px] font-bold text-[#EAD9B8] px-2 py-0.5 rounded-lg bg-[#EAD9B8]/10 border border-[#EAD9B8]/20 tracking-wider">
              {roleNumber}
            </span>
            <div>
              <h3 className="text-xs sm:text-sm font-display font-bold text-[#F5EBDD] tracking-tight">
                {role.company}
              </h3>
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#C8B99F] mt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 text-[#EAD9B8]" /> {role.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-2.5 h-2.5 text-[#EAD9B8]" /> {role.period}
                </span>
              </div>
            </div>
          </div>

          {/* Action Row: Status & Optional Certificate Button */}
          <div className="flex items-center gap-2">
            {isCurrent ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ACTIVE NOW
              </span>
            ) : (
              <>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-mono font-semibold uppercase tracking-wider bg-white/[0.05] text-[#C8B99F] border border-white/[0.1]">
                  <ShieldCheck className="w-2.5 h-2.5 text-[#EAD9B8]" />
                  COMPLETED
                </span>

                {/* Only completed role has certificate */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenCertificate(role.id);
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold bg-[#EAD9B8]/15 border border-[#EAD9B8]/40 text-[#EAD9B8] hover:bg-[#EAD9B8] hover:text-[#171717] transition-all duration-200 shadow-sm hover:shadow-[0_0_15px_rgba(234,217,184,0.3)] active:scale-95 cursor-pointer"
                  title="View Authenticated Internship Certificate"
                >
                  <Award className="w-3 h-3" />
                  <span>CERTIFICATE</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* ── Designation ── */}
        <div>
          <span className="text-[8.5px] font-mono text-[#C8B99F] uppercase tracking-widest block font-medium">
            DESIGNATION
          </span>
          <h4 className="text-sm sm:text-base font-display font-extrabold text-[#EAD9B8] tracking-tight">
            {role.title}
          </h4>
        </div>

        {/* ── Key Deliverables ── */}
        <div className="space-y-1 bg-black/30 p-2.5 rounded-xl border border-white/[0.05]">
          <span className="text-[8.5px] font-mono text-[#C8B99F] uppercase tracking-wider block font-semibold">
            KEY PRODUCTION DELIVERABLES
          </span>
          <div className="space-y-1">
            {role.highlights.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-start gap-1.5">
                <CheckCircle2 className={`w-3 h-3 mt-0.5 shrink-0 ${isCurrent ? 'text-emerald-400' : 'text-[#EAD9B8]'}`} />
                <p className="text-[10px] sm:text-[11px] text-[#F5EBDD] font-light leading-snug">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Shipped Commercial Projects ── */}
        {role.projectsMentioned && role.projectsMentioned.length > 0 && (
          <div className="space-y-1">
            <span className="text-[8.5px] font-mono text-[#EAD9B8] uppercase tracking-wider flex items-center gap-1 font-bold">
              <FolderGit2 className="w-2.5 h-2.5 text-[#EAD9B8]" />
              SHIPPED CLIENT PLATFORMS ({role.projectsMentioned.length}):
            </span>
            <div className="flex flex-wrap gap-1">
              {role.projectsMentioned.map((proj) => (
                <span
                  key={proj}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] sm:text-[9.5px] font-mono bg-white/[0.04] border border-[#8E8170]/30 text-[#F5EBDD] hover:border-[#EAD9B8] hover:bg-[#EAD9B8]/10 transition-colors"
                >
                  <Sparkles className="w-2 h-2 text-[#EAD9B8]" />
                  {proj}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Tech Stack Chips ── */}
        <div className="pt-1.5 border-t border-white/[0.06] flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[8.5px] font-mono text-[#C8B99F] uppercase font-semibold">
            TECH STACK:
          </span>
          <div className="flex flex-wrap gap-1">
            {role.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-1.5 py-0.5 rounded text-[8.5px] sm:text-[9px] font-mono bg-white/[0.03] border border-white/[0.08] text-[#C8B99F]"
              >
                {tech}
              </span>
            ))}
            {role.technologies.length > 5 && (
              <span className="px-1 py-0.5 text-[8px] font-mono text-[#8E8170]">
                +{role.technologies.length - 5}
              </span>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

/* ==========================================================================
   AUTHENTICATED EXPERIENCE CERTIFICATE MODAL
   ========================================================================== */
const ExperienceCertificateModal = ({ certData, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!certData) return null;

  const handleCopyId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(certData.credentialId);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none"
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 15 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl bg-[#171717] border-2 border-[#EAD9B8]/60 p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(234,217,184,0.18)] space-y-3.5"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#C8B99F] hover:text-[#EAD9B8] transition-colors"
          aria-label="Close Certificate Modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 border-b border-[#8E8170]/25 pb-3 pr-8">
          <div className="p-2 rounded-xl bg-[#EAD9B8]/15 border border-[#EAD9B8]/40 text-[#EAD9B8]">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#C8B99F] uppercase tracking-wider block">
              OFFICIAL INDUSTRY CERTIFICATE
            </span>
            <h3 className="text-sm sm:text-base font-display font-extrabold text-[#EAD9B8]">
              {certData.title}
            </h3>
          </div>
        </div>

        {certData.image && !imageError ? (
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden border-2 border-[#EAD9B8]/70 shadow-[0_15px_40px_rgba(0,0,0,0.85)] bg-black/40 group">
              <img
                src={certData.image}
                alt={certData.title}
                onError={() => setImageError(true)}
                className="w-full max-h-[360px] object-contain mx-auto rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
              />
              <div className="absolute top-2 right-2 flex items-center gap-2">
                <a
                  href={certData.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-[#171717]/85 border border-[#EAD9B8]/50 text-[10px] font-mono text-[#EAD9B8] hover:bg-[#EAD9B8] hover:text-[#171717] transition-all flex items-center gap-1 shadow-lg backdrop-blur-md"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>FULL VIEW</span>
                </a>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-black/30 border border-[#8E8170]/30 flex flex-col sm:flex-row items-center justify-between text-[9px] font-mono text-[#C8B99F] gap-1.5">
              <span>ISSUER: <strong className="text-[#EAD9B8]">{certData.organization}</strong></span>
              <span>ID: <strong className="text-[#F5EBDD]">{certData.credentialId}</strong></span>
              <span>PERIOD: <strong className="text-[#EAD9B8]">{certData.period}</strong></span>
            </div>
          </div>
        ) : (
          <div className="border border-[#8E8170]/40 rounded-xl p-4 sm:p-5 bg-[#1b1b1b]/95 text-center space-y-3 shadow-inner relative overflow-hidden">
            <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-[#EAD9B8]/60" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#EAD9B8]/60" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[#EAD9B8]/60" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-[#EAD9B8]/60" />

            <div className="flex items-center justify-between text-[9px] font-mono text-[#C8B99F] border-b border-[#8E8170]/20 pb-2">
              <span className="text-[#EAD9B8] font-bold uppercase">{certData.category}</span>
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3 h-3" /> VERIFIED CREDENTIAL
              </span>
            </div>

            <div className="space-y-1 py-1">
              <span className="text-[8.5px] font-mono text-[#C8B99F] tracking-widest uppercase block">
                THIS IS PROUDLY CONFERRED TO
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[#EAD9B8] uppercase tracking-wide">
                ANU KUMARI SHAH
              </h2>
              <div className="w-16 h-0.5 bg-[#8E8170]/40 mx-auto rounded-full" />
              <p className="text-xs sm:text-sm font-display font-semibold text-[#F5EBDD] pt-1">
                For distinguished engineering contributions at {certData.organization}
              </p>
            </div>

            <p className="text-[10.5px] sm:text-[11px] text-[#C8B99F] font-light leading-relaxed bg-black/25 p-2.5 rounded-lg border border-white/5">
              {certData.description}
            </p>

            <div className="pt-2 border-t border-[#8E8170]/20 flex flex-wrap gap-1 justify-center">
              {certData.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded text-[8.5px] font-mono bg-white/[0.04] border border-[#8E8170]/30 text-[#F5EBDD]"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-[#8E8170]/20 flex flex-col sm:flex-row items-center justify-between text-[9px] font-mono text-[#C8B99F] gap-1.5">
              <span>ISSUER: <strong className="text-[#EAD9B8]">{certData.organization}</strong></span>
              <span>PERIOD: <strong className="text-[#F5EBDD]">{certData.period}</strong></span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
          <button
            onClick={handleCopyId}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono bg-white/5 border border-white/10 hover:border-[#EAD9B8]/50 text-[#F5EBDD] transition-colors"
          >
            {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-[#EAD9B8]" />}
            <span>ID: {certData.credentialId}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-[10px] font-mono font-bold bg-[#EAD9B8] text-[#171717] hover:bg-white transition-colors"
          >
            DONE
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ==========================================================================
   MAIN EXPERIENCE STORY (Auto-Movable / Mobile-Responsive Showcase)
   ========================================================================== */
export default function ExperienceStory() {
  const { experience } = usePortfolio();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedCertId, setSelectedCertId] = useState(null);

  const touchStartX = useRef(0);
  const total = experience.length;
  const activeRole = experience[activeIndex] || experience[0];
  const activeCertData = selectedCertId ? ROLE_CERTIFICATES[selectedCertId] : null;

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleSelect = (idx) => {
    if (idx === activeIndex) return;
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  // Touch Swipe for Mobile Experience
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  // Continuous auto-advance: moves slowly every 5.5s
  useEffect(() => {
    if (!isAutoPlaying || selectedCertId) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5500);

    return () => clearInterval(timer);
  }, [isAutoPlaying, selectedCertId, handleNext]);

  // Slide Animation Variants
  const slideVariants = {
    enter: (dir) => ({
      opacity: 0,
      scale: 0.94,
      x: dir > 0 ? 60 : -60,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
    },
    exit: (dir) => ({
      opacity: 0,
      scale: 0.94,
      x: dir > 0 ? -60 : 60,
    }),
  };

  return (
    <section
      id="experience"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative flex flex-col justify-center items-center px-3 sm:px-6 max-w-5xl mx-auto z-10 pt-5 sm:pt-7 pb-2 w-full select-none"
    >
      <div className="w-full space-y-2.5 sm:space-y-3">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-px w-6 sm:w-10 bg-[#8E8170]/40" />
            <span className="text-[10px] sm:text-xs font-mono text-[#C8B99F] tracking-widest uppercase font-bold">
              06 / WORK EXPERIENCE
            </span>
            <div className="h-px w-6 sm:w-10 bg-[#8E8170]/40" />
          </div>

          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#EAD9B8] tracking-tight uppercase">
            PRACTICAL INDUSTRY ROLES
          </h2>

          <p className="text-[#C8B99F] text-[10px] sm:text-xs font-light max-w-lg leading-relaxed">
            Delivering production software architectures, commercial client platforms, and high-performance web systems.
          </p>

          {/* ── Role Switcher Tabs with Slow Auto-Progress Bar & Auto/Pause Toggle ── */}
          <div className="flex items-center justify-center gap-1.5 pt-0.5 flex-wrap">
            {experience.map((exp, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={exp.id}
                  onClick={() => handleSelect(idx)}
                  className={`relative px-3 py-1 rounded-full text-[9.5px] sm:text-[10px] font-mono transition-all duration-300 border flex items-center gap-1.5 overflow-hidden ${
                    isActive
                      ? 'bg-[#EAD9B8] text-[#171717] border-[#EAD9B8] font-bold shadow-md scale-105'
                      : 'bg-white/[0.04] text-[#C8B99F] border-white/[0.1] hover:border-[#EAD9B8]/40 hover:text-white'
                  }`}
                >
                  <span>0{idx + 1}</span>
                  <span className="truncate max-w-[130px] sm:max-w-[160px]">{exp.company}</span>

                  {/* Active Auto-Advance Progress Line */}
                  {isActive && isAutoPlaying && (
                    <motion.div
                      key={`progress-${activeIndex}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 5.5, ease: 'linear' }}
                      className="absolute bottom-0 left-0 h-[2px] bg-[#171717] rounded-full"
                    />
                  )}
                </button>
              );
            })}

            {/* Auto-Play Toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-2 py-1 rounded-full text-[9px] font-mono border transition-all duration-200 flex items-center gap-1 ${
                isAutoPlaying
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-white/5 text-[#C8B99F] border-white/[0.1] hover:text-white'
              }`}
              title={isAutoPlaying ? 'Pause Auto-Advancing' : 'Resume Auto-Advancing'}
            >
              {isAutoPlaying ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
              <span>{isAutoPlaying ? 'AUTO' : 'PAUSED'}</span>
            </button>
          </div>
        </div>

        {/* ── Auto-Movable & Mobile-Optimized 3D Stage ── */}
        <div
          className="relative w-full flex items-center justify-center py-1 sm:py-2"
          style={{ perspective: 1200 }}
        >
          {/* Previous Chevron Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 sm:left-4 lg:left-12 z-30 p-2 sm:p-2.5 rounded-full bg-[#181818]/90 border border-white/10 hover:border-[#EAD9B8] text-[#C8B99F] hover:text-[#EAD9B8] shadow-lg transition-all hover:scale-110 active:scale-95"
            aria-label="Previous Role"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Central Active Glass Card with SLOW Smooth Transition */}
          <div className="w-full flex justify-center items-center px-8 sm:px-14">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeRole.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 1.15,
                  ease: [0.16, 1, 0.3, 1], // Slow, luxurious, continuous deceleration
                }}
                className="w-full flex justify-center"
              >
                <LuxuryGlassCard
                  role={activeRole}
                  index={activeIndex}
                  onOpenCertificate={(id) => setSelectedCertId(id)}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Chevron Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 sm:right-4 lg:right-12 z-30 p-2 sm:p-2.5 rounded-full bg-[#181818]/90 border border-white/10 hover:border-[#EAD9B8] text-[#C8B99F] hover:text-[#EAD9B8] shadow-lg transition-all hover:scale-110 active:scale-95"
            aria-label="Next Role"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* ── Sleek Minimalist Client Delivery Strip ── */}
        <div className="w-full rounded-2xl bg-[#141414]/75 border border-white/[0.07] px-3 sm:px-4 py-1.5 flex flex-col sm:flex-row items-center justify-between gap-1 text-[9px] sm:text-[10px] font-mono text-[#C8B99F] backdrop-blur-xl">
          <div className="flex items-center gap-1.5 text-center sm:text-left justify-center flex-wrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-[#EAD9B8] font-bold">CLIENT IMPACT:</span>
            <span className="text-[#F5EBDD] font-light">
              Priansu • Secretna Hotel • Mahendra Packers • Elite Interior
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-emerald-400 font-semibold">100% Shipped</span>
            <span className="text-[#8E8170]">•</span>
            <span className="text-[#EAD9B8]">6 Platforms</span>
          </div>
        </div>

      </div>

      {/* ── Authenticated Certificate Modal ── */}
      <AnimatePresence>
        {selectedCertId && (
          <ExperienceCertificateModal
            certData={activeCertData}
            onClose={() => setSelectedCertId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}