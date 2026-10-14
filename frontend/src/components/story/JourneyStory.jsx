import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Briefcase,
  Code2,
  Sparkles,
  Brain,
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Building2,
  Award
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

// Milestone custom tech tags and icon mapping
const MILESTONE_METADATA = [
  {
    step: '01',
    badge: 'UNDERGRADUATE FOUNDATION',
    icon: GraduationCap,
    tags: ['Data Structures', 'C++ / Java', 'MySQL', 'Web Fundamentals', 'OOP Design'],
    accentColor: '#10b981',
  },
  {
    step: '02',
    badge: 'INDUSTRY INTERNSHIP',
    icon: Briefcase,
    tags: ['PHP 8', 'CodeIgniter MVC', 'MySQL', 'Bootstrap 5', 'Client Applications'],
    accentColor: '#14b8a6',
  },
  {
    step: '03',
    badge: 'PROFESSIONAL EXPERIENCE',
    icon: Code2,
    tags: ['React.js', 'Tailwind CSS', 'Modern JavaScript', 'REST APIs', 'Frontend Architecture'],
    accentColor: '#06b6d4',
  },
  {
    step: '04',
    badge: 'POST-GRADUATE EXCELLENCE',
    icon: Award,
    honors: '★ 10.00 CGPA — Rank 1',
    tags: ['10.00 CGPA', 'Machine Learning', 'Neural Networks', 'Python', 'System Design'],
    accentColor: '#38bdf8',
  },
  {
    step: '05',
    badge: 'CURRENT FOCUS & FUTURE',
    icon: Brain,
    tags: ['AI/ML Engineering', 'SBERT & spaCy', 'PyTorch', 'FastAPI', 'Full-Stack AI'],
    accentColor: '#10b981',
  },
];

const JourneyStory = ({ onNextChapter }) => {
  const { journeyTimeline } = usePortfolio();
  const [activeStep, setActiveStep] = useState(0);

  const scrollToMilestone = (index) => {
    setActiveStep(index);
    const target = document.getElementById(`milestone-card-${index}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      id="journey"
      className="relative flex flex-col px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto z-10 pt-10 sm:pt-14 pb-24 w-full"
    >
      {/* ── Section Header ────────────────────────────────────────────── */}
      <div className="flex flex-col items-center text-center space-y-2 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-px w-10 bg-[#1e6f5c]/40" />
          <span className="text-[11px] font-mono text-[#10b981] tracking-widest uppercase font-bold">
            03 // CAREER & ACADEMIC ROADMAP
          </span>
          <div className="h-px w-10 bg-[#1e6f5c]/40" />
        </div>

        <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#F4F5F4] tracking-tight uppercase">
          PATHWAY TO AI & FULL-STACK
        </h2>

        <p className="text-[#8E9793] text-xs sm:text-sm font-light max-w-2xl leading-relaxed">
          A continuous evolution from foundational computer science to enterprise web production, top-ranking MCA research, and advanced machine learning systems.
        </p>

        {/* Quick Milestone Navigation Pills */}
        <div className="w-full pt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {journeyTimeline.map((item, idx) => {
            const meta = MILESTONE_METADATA[idx] || MILESTONE_METADATA[0];
            const Icon = meta.icon;
            const isSelected = activeStep === idx;

            return (
              <button
                key={item.id}
                onClick={() => scrollToMilestone(idx)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-mono transition-all duration-200 border ${
                  isSelected
                    ? 'bg-[#10b981]/20 border-[#10b981] text-[#10b981] shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                    : 'bg-[#0d1310]/80 border-white/10 text-[#8E9793] hover:border-white/30 hover:text-white'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span className="font-semibold">Step {meta.step}</span>
                <span className="opacity-70 hidden md:inline">• {item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Scroll Guidance Cue */}
        <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#8E9793]/80 animate-pulse">
          <ArrowDown className="w-3.5 h-3.5 text-[#10b981]" />
          <span>Scroll down to explore all 5 milestones below</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#10b981]" />
        </div>
      </div>

      {/* ── Storytelling Timeline Spine & Cards ───────────────────────── */}
      <div className="relative pt-4 pb-8">
        {/* Central Vertical Connector Spine */}
        <div
          className="absolute left-6 md:left-1/2 top-4 bottom-12 w-[2px] bg-gradient-to-b from-[#10b981]/40 via-[#1e6f5c] to-[#10b981]/20 -translate-x-1/2"
          aria-hidden="true"
        />

        <div className="space-y-6 sm:space-y-8 relative">
          {journeyTimeline.map((item, idx) => {
            const meta = MILESTONE_METADATA[idx] || MILESTONE_METADATA[0];
            const Icon = meta.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={item.id}
                id={`milestone-card-${idx}`}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Card */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="p-4 sm:p-5 rounded-2xl bg-[#0d1310]/90 border border-white/10 hover:border-[#10b981]/60 transition-all duration-300 shadow-xl group hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] backdrop-blur-sm"
                  >
                    {/* Top Row: Milestone Step & Period */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/30 uppercase tracking-wider">
                          STEP {meta.step}
                        </span>
                        <span className="text-[9px] font-mono text-[#8E9793] uppercase tracking-wider hidden sm:inline">
                          {meta.badge}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-mono text-[#8E9793] bg-white/[0.04] px-2.5 py-0.5 rounded-full border border-white/10">
                        <Calendar className="w-3 h-3 text-[#10b981]" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-base sm:text-lg font-display font-bold text-[#F4F5F4] group-hover:text-[#10b981] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <div className="flex items-center gap-1 text-xs font-mono text-[#10b981] font-medium">
                        <Building2 className="w-3.5 h-3.5 opacity-80" />
                        <span>{item.subtitle}</span>
                      </div>

                      {meta.honors && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm animate-pulse">
                          {meta.honors}
                        </span>
                      )}
                    </div>

                    {/* Detailed Narrative Description */}
                    <p className="text-xs sm:text-[13px] text-[#A6AEA9] font-light leading-relaxed pt-2">
                      {item.description}
                    </p>

                    {/* Technical Competencies Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/5 mt-3">
                      {meta.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono text-[#8E9793] bg-white/[0.03] hover:text-white px-2 py-0.5 rounded border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Central Timeline Node Circle */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 md:top-1/2 md:-translate-y-1/2 z-20">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#10b981] bg-[#070908] flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-transform group-hover:scale-110">
                    <Icon className="w-3.5 h-3.5 text-[#10b981]" />
                  </div>
                </div>

                {/* Spacer Column for Desktop alternating layout */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Section Completion & Transition Box ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 p-5 sm:p-6 rounded-2xl bg-[#0d1310]/95 border border-[#10b981]/30 shadow-2xl text-center space-y-3 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#10b981]/5 via-transparent to-[#10b981]/5 opacity-50 pointer-events-none" />

        <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#10b981] uppercase tracking-wider font-semibold">
          <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
          <span>ROADMAP COMPLETED • 5 OF 5 MILESTONES EXPLORED</span>
        </div>

        <h3 className="text-base sm:text-xl font-display font-bold text-[#F4F5F4]">
          Ready to discover the technical skills & tool mastery?
        </h3>

        <p className="text-xs sm:text-sm text-[#8E9793] max-w-lg mx-auto">
          Scroll down to seamlessly advance to Chapter 04: Skills & Tech Stack, or click below to proceed directly.
        </p>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => onNextChapter && onNextChapter()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#10b981] hover:bg-[#059669] text-[#070908] font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] group"
          >
            <span>Proceed to Chapter 04: Skills</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="text-[10px] font-mono text-[#8E9793]/60 pt-1 flex items-center justify-center gap-1">
          <ArrowDown className="w-3 h-3 text-[#10b981] animate-bounce" />
          <span>Or keep scrolling down to transition</span>
        </div>
      </motion.div>
    </section>
  );
};

export default JourneyStory;
