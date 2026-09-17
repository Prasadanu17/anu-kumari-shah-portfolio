import React from 'react';
import { motion } from 'framer-motion';
import { research } from '../utils/constants';
import { BookOpen, CheckCircle2, ArrowDown, ArrowRight } from 'lucide-react';

const PROCESS_FLOW = [
  {
    step: '01',
    name: 'DATA INGESTION',
    desc: 'Social linguistic sequences & behavioral text feeds.',
  },
  {
    step: '02',
    name: 'PREPROCESSING',
    desc: 'Tokenization, noise removal & dense contextual SBERT embeddings.',
  },
  {
    step: '03',
    name: 'BI-LSTM + ATTENTION',
    desc: 'Bidirectional temporal memory with dynamic attention weighting.',
  },
  {
    step: '04',
    name: 'EXPLAINABLE AI',
    desc: 'Surrogate model interpretation & feature contribution matrices.',
  },
  {
    step: '05',
    name: 'LIME / SHAP ATTRIBUTION',
    desc: 'Token-level saliency scores for clinical validation.',
  },
  {
    step: '06',
    name: 'CLINICAL RESULTS',
    desc: 'Transparent risk assessment with interpretable decision rationale.',
  },
];

const Research = () => {
  const paper = research[0];

  return (
    <section id="research" className="py-24 sm:py-28 relative border-t border-white/[0.08]">
      <div className="story-container">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span>05 / RESEARCH // ACADEMIC CO-AUTHORSHIP</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-tight text-[#F4F4F6]">
              ACADEMIC RESEARCH
            </h2>
          </div>
          <p className="text-xs font-mono text-[#8E95A5] max-w-sm leading-relaxed uppercase">
            Investigating interpretable deep neural architectures for clinical transparency in behavioral health analytics.
          </p>
        </div>

        {/* Major Research Dossier Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#0E1017]/75 backdrop-blur-md overflow-hidden shadow-2xl space-y-8 p-8 sm:p-12">

          {/* Dossier Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8] text-[11px] font-mono uppercase font-bold tracking-wider">
                {paper.role}
              </span>
              <span className="text-xs font-mono text-[#8E95A5]">
                PIPELINE: ACTIVE PREPRINT / PEER REVIEW
              </span>
            </div>

            <div className="text-xs font-mono text-[#8E95A5]">
              STATUS: <span className="text-[#F4F4F6] font-semibold">{paper.period}</span>
            </div>
          </div>

          {/* Paper Title & Abstract Description */}
          <div className="space-y-4 max-w-4xl">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[#F4F4F6] leading-snug">
              "{paper.title}"
            </h3>
            <p className="text-[#8E95A5] text-sm sm:text-base leading-relaxed font-light">
              {paper.description}
            </p>
          </div>

          {/* Visual Research Process Pipeline (Explicitly requested by user) */}
          <div className="space-y-4 pt-4 border-t border-white/[0.06]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#38BDF8] uppercase tracking-wider">
                FRAMEWORK PIPELINE // END-TO-END METHODOLOGY
              </span>
              <span className="text-[10px] font-mono text-[#5D6473]">
                STEP-BY-STEP FLOW
              </span>
            </div>

            {/* Desktop Flow (6 Stages) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 pt-2">
              {PROCESS_FLOW.map((step, idx) => (
                <div
                  key={step.step}
                  className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-[#38BDF8]/30 transition-all duration-300 space-y-2 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#38BDF8] font-bold">
                      {step.step}
                    </span>
                    {idx < PROCESS_FLOW.length - 1 && (
                      <span className="hidden lg:block text-[#5D6473] text-xs">→</span>
                    )}
                  </div>
                  <h4 className="text-xs font-display font-bold text-[#F4F4F6] leading-tight">
                    {step.name}
                  </h4>
                  <p className="text-[11px] text-[#8E95A5] font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology & Explainability Framework Tags */}
          <div className="pt-6 border-t border-white/[0.06] space-y-3">
            <span className="text-[11px] font-mono text-[#8E95A5] uppercase tracking-wider block">
              METHODOLOGY STACK & INTERPRETABILITY TOOLING:
            </span>

            <div className="flex flex-wrap gap-2">
              {paper.methodology.map((m) => (
                <span
                  key={m}
                  className="px-3.5 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-xs font-mono text-[#E4E4E7]"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Clinical Transparency Note */}
          <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] flex items-start gap-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                CLINICAL IMPACT & TRANSPARENCY RATIONALE
              </div>
              <p className="text-xs text-[#8E95A5] leading-relaxed font-light">
                In behavioral healthcare applications, black-box deep neural networks are insufficient. By combining bidirectional attention with LIME and SHAP,
                this framework isolates token-level semantic risk cues, enabling health practitioners to inspect and validate model reasoning behind each prediction.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Research;
