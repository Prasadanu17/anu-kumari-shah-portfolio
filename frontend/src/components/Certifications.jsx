import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Search,
  X,
  Eye,
  Activity,
  Terminal,
  Layers,
  Sparkles,
  Code2,
  FileText,
  Calendar,
  Building,
  ArrowUpRight,
  Compass,
  Cpu
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

/* ==========================================================================
   CATEGORY COLOR AND ICON METADATA
   ========================================================================== */
const CATEGORY_META = {
  'Data Analytics & EDA': {
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    foilGlow: 'rgba(16, 185, 129, 0.22)',
    accent: '#10b981',
    icon: Activity,
  },
  'Competitive Coding': {
    badge: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    foilGlow: 'rgba(244, 63, 94, 0.22)',
    accent: '#f43f5e',
    icon: Code2,
  },
  'Professional Internship': {
    badge: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    foilGlow: 'rgba(168, 85, 247, 0.22)',
    accent: '#a855f7',
    icon: Layers,
  },
  'Technical Achievement': {
    badge: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    foilGlow: 'rgba(14, 165, 233, 0.22)',
    accent: '#0ea5e9',
    icon: Terminal,
  },
  'Design Competition': {
    badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    foilGlow: 'rgba(245, 158, 11, 0.22)',
    accent: '#f59e0b',
    icon: Sparkles,
  },
  'Professional Development': {
    badge: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    foilGlow: 'rgba(20, 184, 166, 0.22)',
    accent: '#14b8a6',
    icon: Sparkles,
  },
  'Academic Exchange': {
    badge: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    foilGlow: 'rgba(99, 102, 241, 0.22)',
    accent: '#6366f1',
    icon: Compass,
  },
  'Technical Training': {
    badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    foilGlow: 'rgba(6, 182, 212, 0.22)',
    accent: '#06b6d4',
    icon: Cpu,
  },
  'Leadership & Community': {
    badge: 'bg-pink-500/10 text-pink-300 border-pink-500/30',
    foilGlow: 'rgba(236, 72, 153, 0.22)',
    accent: '#ec4899',
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

        {/* Certificate Visual Display (Image or High-Tech Parchment Banner) */}
        {cert.image ? (
          <div className="relative rounded-xl overflow-hidden border border-[#8E8170]/40 max-h-[300px] bg-black/50 group flex items-center justify-center">
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-full max-h-[300px] object-contain transition-transform duration-500 group-hover:scale-105"
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
            <span className="text-[#EAD9B8] font-bold text-right">{cert.organization}</span>
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

        {/* Core Competencies / Skills */}
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
   INDIVIDUAL CERTIFICATE CARD
   ========================================================================== */
const CertCard = ({ cert, index, onInspect, onCopyId, copiedId }) => {
  const meta = CATEGORY_META[cert.category] || {
    badge: 'bg-[#EAD9B8]/10 text-[#EAD9B8] border-[#8E8170]/30',
    accent: '#EAD9B8',
    icon: Award,
  };
  const CategoryIcon = meta.icon;
  const docUrl = cert.link || cert.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group relative rounded-2xl bg-[#181818]/80 border border-white/[0.08] hover:border-[#EAD9B8]/50 transition-all duration-300 shadow-xl hover:shadow-[0_16px_40px_rgba(234,217,184,0.10)] flex flex-col justify-between overflow-hidden backdrop-blur-xl"
    >
      {/* Top Banner Area */}
      <div
        onClick={() => onInspect(cert)}
        className="relative w-full h-44 sm:h-48 overflow-hidden bg-black/60 cursor-pointer border-b border-white/[0.06] flex items-center justify-center"
      >
        {cert.image ? (
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1b1b1b] to-[#121212] p-4 text-center">
            <div
              className="w-14 h-14 rounded-2xl border flex items-center justify-center mb-2 shadow-lg transition-transform duration-500 group-hover:scale-110"
              style={{
                backgroundColor: `${meta.accent}15`,
                borderColor: `${meta.accent}50`,
                color: meta.accent,
              }}
            >
              <CategoryIcon className="w-7 h-7" />
            </div>
            <span className="text-[11px] font-display font-bold text-[#EAD9B8]/90 max-w-[220px] line-clamp-1">
              {cert.organization}
            </span>
            <span className="text-[9px] font-mono text-[#8E8170] mt-0.5">
              {cert.date}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent opacity-85" />

        {/* Hover Inspect Specs Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-[#EAD9B8] text-[#171717] font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            <span>INSPECT CREDENTIAL</span>
          </span>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className={`px-2.5 py-1 rounded-md text-[9px] font-mono uppercase font-semibold backdrop-blur-md border ${meta.badge}`}>
            {cert.category}
          </span>

          <span className="px-2 py-0.5 rounded-md text-[8.5px] font-mono bg-black/75 border border-emerald-500/30 text-emerald-400 flex items-center gap-1 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            VERIFIED
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          {/* Organization & Date */}
          <div className="flex items-center justify-between text-[10px] font-mono text-[#C8B99F] mb-1">
            <span className="flex items-center gap-1 truncate max-w-[180px]">
              <Building className="w-3 h-3 text-[#EAD9B8]" />
              <span className="truncate">{cert.organization}</span>
            </span>
            <span className="flex items-center gap-1 text-[#8E8170]">
              <Calendar className="w-3 h-3" />
              <span>{cert.date}</span>
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onInspect(cert)}
            className="text-base sm:text-lg font-display font-bold text-[#EAD9B8] group-hover:text-[#F5EBDD] transition-colors cursor-pointer leading-snug line-clamp-2"
          >
            {cert.title}
          </h3>

          {/* Description */}
          <p className="text-[11px] sm:text-xs text-[#C8B99F] font-light leading-relaxed mt-1.5 line-clamp-2">
            {cert.description}
          </p>

          {/* Credential ID chip with Copy Button */}
          {cert.credentialId && (
            <div className="mt-3 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-mono text-[#8E8170]">
              <span className="truncate max-w-[160px]">ID: {cert.credentialId}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCopyId(cert.credentialId);
                }}
                className="hover:text-[#EAD9B8] text-[#C8B99F] transition-colors p-1"
                title="Copy Credential ID"
              >
                {copiedId === cert.credentialId ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
          )}

          {/* Skills pills */}
          {cert.skills && (
            <div className="flex flex-wrap gap-1 mt-3">
              {cert.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 text-[9px] font-mono rounded bg-white/[0.03] border border-white/[0.08] text-[#C8B99F]"
                >
                  {skill}
                </span>
              ))}
              {cert.skills.length > 3 && (
                <span className="px-1.5 py-0.5 text-[9px] font-mono text-[#8E8170]">
                  +{cert.skills.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
          <button
            onClick={() => onInspect(cert)}
            className="text-[10px] sm:text-xs font-mono text-[#EAD9B8] hover:text-[#F5EBDD] flex items-center gap-1 font-semibold group/btn"
          >
            <span>VIEW SPECS</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>

          {docUrl && (
            <a
              href={docUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-[#EAD9B8]/10 hover:bg-[#EAD9B8] text-[#EAD9B8] hover:text-[#171717] border border-[#EAD9B8]/30 text-[10px] font-mono font-bold flex items-center gap-1 transition-all"
            >
              <span>DOCUMENT</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ==========================================================================
   MAIN COMPREHENSIVE CERTIFICATIONS COMPONENT
   ========================================================================== */
const Certifications = () => {
  const { certifications } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopyId = (id) => {
    if (!id) return;
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Distinct categories available in data
  const categories = useMemo(() => {
    const cats = new Set(certifications.map((c) => c.category));
    return Array.from(cats);
  }, [certifications]);

  // Filtered list
  const filteredCerts = useMemo(() => {
    return certifications.filter((cert) => {
      const matchesCategory =
        activeCategory === 'all' || cert.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const inTitle = cert.title.toLowerCase().includes(q);
      const inOrg = cert.organization.toLowerCase().includes(q);
      const inCategory = cert.category.toLowerCase().includes(q);
      const inId = cert.credentialId?.toLowerCase().includes(q);
      const inSkills = cert.skills?.some((s) => s.toLowerCase().includes(q));
      const inDesc = cert.description?.toLowerCase().includes(q);

      return inTitle || inOrg || inCategory || inId || inSkills || inDesc;
    });
  }, [certifications, activeCategory, searchQuery]);

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* ── Filter & Search Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-2 rounded-2xl bg-[#141414]/90 border border-white/[0.08] backdrop-blur-xl">
        {/* Navigation Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-mono font-bold transition-all shrink-0 ${
              activeCategory === 'all'
                ? 'bg-[#EAD9B8] text-[#171717] shadow-md'
                : 'text-[#C8B99F] hover:text-[#F5EBDD] hover:bg-white/5'
            }`}
          >
            ALL CREDENTIALS ({certifications.length})
          </button>

          {categories.map((cat) => {
            const count = certifications.filter((c) => c.category === cat).length;
            const meta = CATEGORY_META[cat];
            const CatIcon = meta?.icon || Award;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-mono font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  activeCategory === cat
                    ? 'bg-[#EAD9B8] text-[#171717] shadow-md'
                    : 'text-[#C8B99F] hover:text-[#F5EBDD] hover:bg-white/5'
                }`}
              >
                <CatIcon className="w-3.5 h-3.5" />
                <span>
                  {cat.toUpperCase()} ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Instant Search Bar */}
        <div className="relative min-w-[200px] sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#8E8170] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search credential, skill, issuer..."
            className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-black/40 border border-white/[0.08] text-xs font-mono text-[#F5EBDD] placeholder-[#8E8170] focus:outline-none focus:border-[#EAD9B8]/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8E8170] hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* ── Section Header with Active Count ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#8E8170]/25 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono text-[#C8B99F] tracking-widest uppercase font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#EAD9B8]" />
              01 // AUTHENTICATED VERIFIED CATALOG
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[#EAD9B8] uppercase tracking-tight mt-0.5">
            ALL PROFESSIONAL CREDENTIALS & ACHIEVEMENTS
          </h2>
          <p className="text-[11px] sm:text-xs text-[#C8B99F] font-light max-w-xl mt-0.5">
            Comprehensive archive of industry simulations, hackathons, technical internships, and government innovation certifications.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2.5 py-1 rounded-lg text-[9px] font-mono bg-[#EAD9B8]/10 border border-[#EAD9B8]/30 text-[#EAD9B8] font-bold">
            {filteredCerts.length} CREDENTIALS
          </span>
        </div>
      </div>

      {/* ── Certifications Grid ── */}
      {filteredCerts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCerts.map((cert, idx) => (
            <CertCard
              key={cert.id}
              cert={cert}
              index={idx}
              onInspect={(c) => setSelectedCert(c)}
              onCopyId={handleCopyId}
              copiedId={copiedId}
            />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center rounded-2xl bg-white/[0.02] border border-white/5 text-xs font-mono text-[#8E8170]">
          No certifications found matching "{searchQuery}"
        </div>
      )}

      {/* ── Summary Metrics Strip ── */}
      <div className="rounded-2xl bg-[#141414]/75 border border-white/[0.07] px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[9.5px] sm:text-[10px] font-mono text-[#C8B99F] backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[#EAD9B8] font-bold">CREDENTIAL VERIFICATION MATRIX:</span>
          <span>Deloitte Australia • SRM University • Groveus Informatics • MoE Innovation Cell</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-semibold">{certifications.length} Authenticated</span>
          <span className="text-[#8E8170]">•</span>
          <span className="text-[#EAD9B8]">100% Verified Evidence</span>
        </div>
      </div>

      {/* ── Modal Inspector ── */}
      <AnimatePresence>
        {selectedCert && (
          <CertModal
            cert={selectedCert}
            onClose={() => setSelectedCert(null)}
            onCopyId={handleCopyId}
            copiedId={copiedId}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certifications;

