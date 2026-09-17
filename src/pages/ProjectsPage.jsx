import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CustomCursor from '../components/common/CustomCursor';
import ContinuousAtmosphere from '../components/common/ContinuousAtmosphere';
import Projects from '../components/Projects';
import Footer from '../components/Footer';

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-[#07080B] text-[#F4F4F6] relative overflow-x-hidden selection:bg-[#38BDF8] selection:text-[#07080B] py-16">
      <ContinuousAtmosphere />
      <CustomCursor />

      <div className="story-container relative z-10 space-y-10">
        {/* Navigation back */}
        <div className="flex justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-[#F4F4F6] hover:bg-white/[0.08] hover:border-white/25 transition-all duration-300 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-[#38BDF8]" />
            <span>RETURN TO STORY</span>
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-2 border-b border-white/[0.08] pb-6">
          <span className="text-xs font-mono text-[#38BDF8] tracking-widest uppercase block">
            SELECTED ARCHIVE // COMPREHENSIVE INDEX
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold uppercase tracking-tight text-[#F4F4F6]">
            ALL TECHNICAL WORK
          </h1>
          <p className="text-xs font-mono text-[#8E95A5] max-w-lg leading-relaxed uppercase pt-1">
            Machine learning models, explainable AI research implementations, and full-stack software systems.
          </p>
        </div>

        <Projects />
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default ProjectsPage;
