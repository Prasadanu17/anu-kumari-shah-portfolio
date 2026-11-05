import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useAnimationFrame, animate } from 'framer-motion';
import { Link } from 'react-router-dom';
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
  RotateCw,
  Code2,
  ArrowRight,
  Eye,
  FileText
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

/* ==========================================================================
   METALLIC HOLOGRAPHIC THEMES PER CATEGORY (HIGH CONTRAST & MAXIMUM VISIBILITY)
   ========================================================================== */
const CATEGORY_META = {
  'Data Analytics & EDA': {
    badge: 'bg-[#0a0a0a]/95 text-white border-emerald-500/50',
    foilGlow: 'rgba(16, 185, 129, 0.22)',
    accent: '#10b981',
    icon: Activity,
  },
  'Competitive Coding': {
    badge: 'bg-[#0a0a0a]/95 text-white border-rose-500/50',
    foilGlow: 'rgba(244, 63, 94, 0.22)',
    accent: '#f43f5e',
    icon: Code2,
  },
  'Design Competition': {
    badge: 'bg-[#0a0a0a]/95 text-white border-amber-500/50',
    foilGlow: 'rgba(245, 158, 11, 0.22)',
    accent: '#f59e0b',
    icon: Sparkles,
  },
  'Academic Exchange': {
    badge: 'bg-[#0a0a0a]/95 text-white border-indigo-500/50',
    foilGlow: 'rgba(99, 102, 241, 0.22)',
    accent: '#6366f1',
    icon: Compass,
  },
  'Professional Internship': {
    badge: 'bg-[#0a0a0a]/95 text-white border-purple-500/50',
    foilGlow: 'rgba(168, 85, 247, 0.22)',
    accent: '#a855f7',
    icon: Layers,
  },
  'Technical Training': {
    badge: 'bg-[#0a0a0a]/95 text-white border-cyan-500/50',
    foilGlow: 'rgba(6, 182, 212, 0.22)',
    accent: '#06b6d4',
    icon: Cpu,
  },
  'Leadership & Community': {
    badge: 'bg-[#0a0a0a]/95 text-white border-pink-500/50',
    foilGlow: 'rgba(236, 72, 153, 0.22)',
    accent: '#ec4899',
    icon: Sparkles,
  },
  'Technical Achievement': {
    badge: 'bg-[#0a0a0a]/95 text-white border-sky-500/50',
    foilGlow: 'rgba(14, 165, 233, 0.22)',
    accent: '#0ea5e9',
    icon: Terminal,
  },
  'Professional Development': {
    badge: 'bg-[#0a0a0a]/95 text-white border-teal-500/50',
    foilGlow: 'rgba(20, 184, 166, 0.22)',
    accent: '#14b8a6',
    icon: Sparkles,
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
   AUTHENTICATED CREDENTIAL INSPECTION MODAL
   ========================================================================== */
const CertModal = ({ cert, onClose, onCopyId, copiedId }) => {
  if (!cert) return null;

  const meta = CATEGORY_META[cert.category] || {
    badge: 'bg-[#0d0d0d] text-[#F5EBDD] border-white/20',
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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#C8B99F] hover:text-[#EAD9B8] transition-colors"
          aria-label="Close Inspector Modal"
        >
          <X className="w-4 h-4" />
        </button>

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
              <span className="inline-flex items-center gap-1.5 text-xs font-sans font-bold px-3 py-1 rounded-lg bg-[#0a0a0a] text-white border border-white/20 shadow-md">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: meta.accent }} />
                {cert.category}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                VERIFIED CREDENTIAL
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-display font-extrabold text-[#EAD9B8] mt-1">
              {cert.title}
            </h3>
          </div>
        </div>

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

        <div className="space-y-1.5">
          <span className="text-[9px] font-mono text-[#C8B99F] uppercase tracking-wider block font-semibold">
            CREDENTIAL SYLLABUS & OVERVIEW
          </span>
          <p className="text-[#F5EBDD] text-xs sm:text-sm leading-relaxed font-light bg-black/25 p-3 rounded-xl border border-white/5">
            {cert.description}
          </p>
        </div>

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
   ORIGINAL 3D CYLINDRICAL COVERFLOW CARD (RESTORED FOR MOBILE VIEW)
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
  isMobile,
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

  let offset = (index - activeIndex) % total;
  if (offset < -1) offset += total;
  if (offset > 2) offset -= total;

  const isCenter = offset === 0;
  const isLeft = offset === -1 || (offset === total - 1 && total > 2);
  const isRight = offset === 1 || (offset === -(total - 1) && total > 2);

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

  let cylinderX = 0;
  let cylinderZ = 0;
  let cylinderRotateY = 0;
  let scale = 1;
  let opacity = 1;
  let zIndex = 30;

  if (isCenter) {
    cylinderX = 0;
    cylinderZ = isMobile ? 40 : 120;
    cylinderRotateY = 0;
    scale = 1;
    opacity = 1;
    zIndex = 40;
  } else if (isLeft) {
    cylinderX = isMobile ? -220 : -470;
    cylinderZ = isMobile ? -80 : -140;
    cylinderRotateY = isMobile ? 12 : 20;
    scale = isMobile ? 0.72 : 0.78;
    opacity = isMobile ? 0 : 0.36;
    zIndex = 10;
  } else if (isRight) {
    cylinderX = isMobile ? 220 : 470;
    cylinderZ = isMobile ? -80 : -140;
    cylinderRotateY = isMobile ? -12 : -20;
    scale = isMobile ? 0.72 : 0.78;
    opacity = isMobile ? 0 : 0.36;
    zIndex = 10;
  } else {
    cylinderX = 0;
    cylinderZ = -220;
    cylinderRotateY = 180;
    scale = 0.6;
    opacity = 0;
    zIndex = 0;
  }

  const meta = CATEGORY_META[cert.category] || {
    badge: 'bg-[#0d0d0d] text-[#F5EBDD] border-white/20',
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
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        zIndex,
        rotateX: isCenter ? rotateX : 0,
        transformStyle: 'preserve-3d',
      }}
      className={`absolute w-[88vw] max-w-[340px] sm:max-w-[490px] md:max-w-[530px] rounded-2xl p-4 sm:p-5 select-none transition-all duration-300 ${
        isCenter
          ? 'bg-[#181818] border-2 border-[#EAD9B8] shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(234,217,184,0.2)] cursor-default pointer-events-auto'
          : 'bg-[#141414] border border-[#8E8170]/40 shadow-xl cursor-pointer hover:border-[#EAD9B8]/70 hover:opacity-75'
      }`}
    >
      <motion.div
        className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 ${
          isCenter ? 'opacity-35' : 'opacity-15'
        }`}
        style={{
          background: isCenter
            ? `radial-gradient(circle 320px at ${sheenX} ${sheenY}, rgba(234, 217, 184, 0.35), rgba(99, 216, 181, 0.1) 40%, transparent 75%)`
            : `linear-gradient(135deg, rgba(234, 217, 184, 0.15), transparent)`,
        }}
      />

      <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-[#EAD9B8]/60 rounded-tl" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#EAD9B8]/60 rounded-tr" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[#EAD9B8]/60 rounded-bl" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-[#EAD9B8]/60 rounded-br" />

      <div
        className="relative z-10 flex flex-col justify-between space-y-3"
        style={{ transform: isCenter ? 'translateZ(20px)' : 'none' }}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-sans font-bold bg-[#0a0a0a]/95 text-white border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.85)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: meta.accent }} />
            <span>{cert.category}</span>
          </span>

          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[9px] sm:text-[10px] font-mono font-semibold text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <ShieldCheck className="w-3 h-3" />
            <span>VERIFIED</span>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-sm sm:text-base md:text-lg font-display font-bold text-[#EAD9B8] leading-snug tracking-tight">
            {cert.title}
          </h3>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-[#C8B99F]">
            <span className="text-[#F5EBDD] font-medium">{cert.organization}</span>
            <span>•</span>
            <span className="text-[#EAD9B8]">{cert.date}</span>
          </div>
        </div>

        <p className="text-[11px] sm:text-xs text-[#F5EBDD]/90 font-light leading-relaxed line-clamp-3">
          {cert.description}
        </p>

        {cert.skills && cert.skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {cert.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 text-[9px] font-mono rounded bg-white/[0.05] border border-[#8E8170]/30 text-[#F5EBDD]"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

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
                <span className="truncate max-w-[110px] sm:max-w-[160px]">{cert.credentialId || 'VERIFIED-ID'}</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
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
   MAIN COMPONENT: RESTORES ORIGINAL 3D CYLINDRICAL COVERFLOW ON MOBILE,
   PRESERVES LUXURY EDITORIAL INFINITE CONVEYOR ON DESKTOP
   ========================================================================== */
const CertificationsStory = () => {
  const { certifications } = usePortfolio();
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inspectedCert, setInspectedCert] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [cardWidth, setCardWidth] = useState(380);

  const containerRef = useRef(null);

  // Responsive mobile detector: ensures cardWidth scales cleanly across phones, tablets & desktop
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (window.innerWidth < 480) {
        setCardWidth(Math.min(window.innerWidth - 60, 290));
      } else if (window.innerWidth < 768) {
        setCardWidth(320);
      } else if (window.innerWidth < 1024) {
        setCardWidth(340);
      } else {
        setCardWidth(390);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter important/featured certifications
  const featuredCerts = useMemo(() => {
    const list = certifications.filter((c) => c.isImportant);
    return list.length > 0 ? list : certifications;
  }, [certifications]);

  const total = featuredCerts.length;

  // Desktop Motion Values & Animation Frame
  const gap = 20;
  const itemWidth = cardWidth + gap;
  const singleSetWidth = featuredCerts.length * itemWidth;

  const x = useMotionValue(0);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const isAutoPlayingRef = useRef(true);
  const isNudgingRef = useRef(false);
  const lastActiveIndexRef = useRef(0);

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    isAutoPlayingRef.current = isAutoPlaying;
  }, [isAutoPlaying]);

  // Repeated list for continuous infinite conveyor
  const displayList = useMemo(() => {
    if (featuredCerts.length === 0) return [];
    return [
      ...featuredCerts.map((c, i) => ({ ...c, uniqueKey: `${c.id}-set0-${i}` })),
      ...featuredCerts.map((c, i) => ({ ...c, uniqueKey: `${c.id}-set1-${i}` })),
      ...featuredCerts.map((c, i) => ({ ...c, uniqueKey: `${c.id}-set2-${i}` })),
      ...featuredCerts.map((c, i) => ({ ...c, uniqueKey: `${c.id}-set3-${i}` })),
    ];
  }, [featuredCerts]);

  // Continuous Marquee Glide across both Mobile & Laptop
  const SPEED = 40;
  useAnimationFrame((time, delta) => {
    if (
      !isAutoPlayingRef.current ||
      isHoveredRef.current ||
      isDraggingRef.current ||
      inspectedCert ||
      isNudgingRef.current ||
      singleSetWidth <= 0
    ) {
      return;
    }

    const moveBy = (SPEED * delta) / 1000;
    let currentX = x.get() - moveBy;

    if (currentX <= -singleSetWidth) {
      currentX += singleSetWidth;
    } else if (currentX > 0) {
      currentX -= singleSetWidth;
    }
    x.set(currentX);

    const rawIdx = Math.round(Math.abs(currentX) / itemWidth);
    const newIdx = ((rawIdx % featuredCerts.length) + featuredCerts.length) % featuredCerts.length;
    if (newIdx !== lastActiveIndexRef.current) {
      lastActiveIndexRef.current = newIdx;
      setActiveIndex(newIdx);
    }
  });

  const handleNext = useCallback(() => {
    if (singleSetWidth <= 0) return;
    isNudgingRef.current = true;
    const currentX = x.get();
    const targetX = currentX - itemWidth;

    animate(x, targetX, {
      duration: 0.52,
      ease: [0.25, 1, 0.5, 1],
      onComplete: () => {
        let finalX = x.get();
        while (finalX <= -singleSetWidth) finalX += singleSetWidth;
        while (finalX > 0) finalX -= singleSetWidth;
        x.set(finalX);

        const rawIdx = Math.round(Math.abs(finalX) / itemWidth);
        const newIdx = ((rawIdx % featuredCerts.length) + featuredCerts.length) % featuredCerts.length;
        setActiveIndex(newIdx);
        lastActiveIndexRef.current = newIdx;
        isNudgingRef.current = false;
      },
    });
  }, [singleSetWidth, itemWidth, featuredCerts.length, x]);

  const handlePrev = useCallback(() => {
    if (singleSetWidth <= 0) return;
    isNudgingRef.current = true;
    const currentX = x.get();
    const targetX = currentX + itemWidth;

    animate(x, targetX, {
      duration: 0.52,
      ease: [0.25, 1, 0.5, 1],
      onComplete: () => {
        let finalX = x.get();
        while (finalX <= -singleSetWidth) finalX += singleSetWidth;
        while (finalX > 0) finalX -= singleSetWidth;
        x.set(finalX);

        const rawIdx = Math.round(Math.abs(finalX) / itemWidth);
        const newIdx = ((rawIdx % featuredCerts.length) + featuredCerts.length) % featuredCerts.length;
        setActiveIndex(newIdx);
        lastActiveIndexRef.current = newIdx;
        isNudgingRef.current = false;
      },
    });
  }, [singleSetWidth, itemWidth, featuredCerts.length, x]);

  const handleDotClick = useCallback((targetIdx) => {
    if (singleSetWidth <= 0) return;
    isNudgingRef.current = true;
    const targetX = -targetIdx * itemWidth;

    animate(x, targetX, {
      duration: 0.58,
      ease: [0.25, 1, 0.5, 1],
      onComplete: () => {
        setActiveIndex(targetIdx);
        lastActiveIndexRef.current = targetIdx;
        isNudgingRef.current = false;
      },
    });
  }, [itemWidth, singleSetWidth, x]);

  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDrag = () => {
    if (singleSetWidth <= 0) return;
    let currentX = x.get();
    while (currentX <= -singleSetWidth * 2) {
      currentX += singleSetWidth;
      x.set(currentX);
    }
    while (currentX > 0) {
      currentX -= singleSetWidth;
      x.set(currentX);
    }
  };

  const handleDragEnd = () => {
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 120);

    let currentX = x.get();
    while (currentX <= -singleSetWidth) currentX += singleSetWidth;
    while (currentX > 0) currentX -= singleSetWidth;
    x.set(currentX);

    const rawIdx = Math.round(Math.abs(currentX) / itemWidth);
    const newIdx = ((rawIdx % featuredCerts.length) + featuredCerts.length) % featuredCerts.length;
    setActiveIndex(newIdx);
    lastActiveIndexRef.current = newIdx;
  };

  const handleCopyId = (id) => {
    if (!id) return;
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCardClick = (cert) => {
    if (isDraggingRef.current) return;
    setInspectedCert(cert);
  };

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
      className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10 py-4 sm:py-8 w-full select-none"
    >
      {/* =========================================================================
          EDITORIAL LUXURY HOTEL PRESENTATION (UNIFIED ACROSS BOTH MOBILE & LAPTOP)
          ========================================================================= */}
      <div className="w-full flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 sm:gap-10 lg:gap-14">

        {/* LEFT COLUMN / TOP ON MOBILE: Editorial Intro, Serif Heading, Divider, CTA & Controls */}
        <div className="w-full lg:w-[36%] xl:w-[34%] shrink-0 flex flex-col justify-between space-y-4 sm:space-y-5">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#C8B99F] font-semibold block">
                AUTHENTICATED HONORS
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#F5EBDD] font-normal tracking-tight leading-[1.12]">
              My <br className="hidden sm:inline" />
              <span className="italic font-light text-[#EAD9B8]">Certifications</span>
            </h2>

            <div className="w-12 sm:w-14 h-[2px] bg-[#8E8170]/50 my-2 sm:my-4" />

            <p className="text-xs sm:text-sm text-[#C8B99F] font-light leading-relaxed max-w-sm">
              Verified academic milestones, competitive coding honors, and industry job simulations reflecting continuous technical dedication across AI, data analytics, and modern web systems.
            </p>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-3">
              <Link
                to="/certifications"
                className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 border border-[#8E8170]/60 text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#F5EBDD] hover:bg-[#EAD9B8] hover:text-[#171717] hover:border-[#EAD9B8] transition-all duration-300 shadow-sm group/btn rounded-lg sm:rounded-none"
              >
                <span>VIEW ALL CERTIFICATES</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Controls Bar: Prev/Next, Auto/Pause, Counter, Dots */}
            <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono text-[#C8B99F] flex-wrap justify-between sm:justify-start">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 sm:p-2.5 rounded-full border border-[#8E8170]/40 hover:border-[#EAD9B8] text-[#C8B99F] hover:text-[#EAD9B8] hover:bg-white/[0.04] transition-all active:scale-95"
                  aria-label="Previous Certificate"
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 sm:p-2.5 rounded-full border border-[#8E8170]/40 hover:border-[#EAD9B8] text-[#C8B99F] hover:text-[#EAD9B8] hover:bg-white/[0.04] transition-all active:scale-95"
                  aria-label="Next Certificate"
                >
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono border transition-all duration-200 flex items-center gap-1.5 ${
                  isAutoPlaying
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-white/5 text-[#C8B99F] border-[#8E8170]/30 hover:text-white'
                }`}
                title={isAutoPlaying ? 'Pause Automatic Carousel' : 'Resume Automatic Carousel'}
              >
                {isAutoPlaying ? <Pause className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                <span>{isAutoPlaying ? 'AUTO' : 'PAUSED'}</span>
              </button>

              <span className="text-[10px] sm:text-[11px] tracking-widest text-[#8E8170]">
                <span className="text-[#EAD9B8] font-bold">0{activeIndex + 1}</span> / 0{featuredCerts.length}
              </span>

              <div className="flex items-center gap-1 sm:gap-1.5 ml-auto">
                {featuredCerts.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 relative overflow-hidden ${
                      idx === activeIndex
                        ? 'w-5 sm:w-7 bg-[#EAD9B8]'
                        : 'w-1.5 bg-[#8E8170]/40 hover:bg-[#8E8170]'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT AREA / BOTTOM ON MOBILE: Continuous Conveyor Carousel */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-full lg:w-[64%] xl:w-[66%] flex-1 overflow-hidden relative py-2 select-none"
        >
          <div className="absolute top-0 left-0 bottom-0 w-6 sm:w-16 bg-gradient-to-r from-[#171717] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-6 sm:w-16 bg-gradient-to-l from-[#171717] to-transparent z-10 pointer-events-none" />

          <motion.div
            drag="x"
            dragElastic={0.08}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            style={{ x }}
            className="flex gap-4 sm:gap-5 items-stretch cursor-grab active:cursor-grabbing will-change-transform"
          >
            {displayList.map((cert, index) => {
              const meta = CATEGORY_META[cert.category];

              return (
                <div
                  key={cert.uniqueKey || `${cert.id}-${index}`}
                  onClick={() => handleCardClick(cert)}
                  style={{ width: `${cardWidth}px` }}
                  className="shrink-0 cursor-pointer group flex flex-col justify-between transition-all duration-300 opacity-90 hover:opacity-100"
                >
                  <div className="relative w-full h-[180px] sm:h-[240px] md:h-[260px] rounded-2xl overflow-hidden bg-black/50 border border-[#8E8170]/30 group-hover:border-[#EAD9B8]/60 transition-all duration-500 shadow-xl group-hover:shadow-[0_16px_40px_rgba(234,217,184,0.12)]">
                    {cert.image ? (
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#1b1b1b] to-[#121212]">
                        <Award className="w-12 h-12 text-[#EAD9B8] mb-2" />
                        <span className="text-xs font-mono text-[#8E8170]">{cert.organization}</span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent opacity-60" />

                    {cert.category && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-sans font-bold px-2.5 sm:px-3 py-1 rounded-lg bg-[#0a0a0a]/95 text-white border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.85)] backdrop-blur-md">
                          <span className="w-2 h-2 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: meta?.accent || '#EAD9B8' }} />
                          <span>{cert.category}</span>
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-3 sm:px-3.5 py-1.5 rounded-lg bg-[#EAD9B8] text-[#171717] font-mono text-[10px] sm:text-xs font-bold flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-3.5 h-3.5" />
                        <span>INSPECT CREDENTIAL</span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 pb-1 space-y-1">
                    <h3 className="font-serif font-bold text-sm sm:text-lg text-[#F5EBDD] group-hover:text-[#EAD9B8] transition-colors leading-snug line-clamp-1">
                      {cert.title}
                    </h3>

                    <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-[#C8B99F]">
                      <span className="truncate max-w-[180px] sm:max-w-[240px] text-[#C8B99F]/90">
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

      {/* Sleek Active Radar Strip at bottom */}
      <div className="w-full rounded-2xl bg-[#141414]/75 border border-white/[0.07] px-3 sm:px-4 py-2 mt-4 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[9.5px] sm:text-[11px] font-mono text-[#C8B99F] backdrop-blur-xl">
        <div className="flex items-center gap-1.5 text-center sm:text-left justify-center flex-wrap">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-[#EAD9B8] font-bold">ACTIVE R&D RADAR:</span>
          <span className="text-[#F5EBDD] font-light">
            Deep Learning • MLOps • NLP • Computer Vision • LLMs • AI Agents
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-emerald-400 font-semibold">Verified</span>
          <span className="text-[#8E8170]">•</span>
          <span className="text-[#EAD9B8]">{certifications.length} Credentials Conferred</span>
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
