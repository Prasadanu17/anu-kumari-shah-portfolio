import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CustomCursor from '../components/common/CustomCursor';
import ContinuousAtmosphere from '../components/common/ContinuousAtmosphere';
import Certifications from '../components/Certifications';
import Footer from '../components/Footer';

const CertificationsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#171717] text-[#F5EBDD] relative overflow-x-hidden selection:bg-[#EAD9B8] selection:text-[#171717] py-16">
      <ContinuousAtmosphere />
      <CustomCursor />

      <div className="story-container relative z-10 space-y-10">
        {/* Navigation back */}
        <div className="flex justify-start">
          <Link
            to="/#certifications"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-white/[0.04] border border-[#8E8170]/30 text-xs font-mono text-[#F5EBDD] hover:bg-white/[0.08] hover:border-[#EAD9B8]/50 transition-all duration-300 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-[#EAD9B8]" />
            <span>RETURN TO STORY</span>
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-2 border-b border-[#8E8170]/25 pb-6">
          <span className="text-xs font-mono text-[#C8B99F] tracking-widest uppercase block">
            CREDENTIALS ARCHIVE // COMPREHENSIVE INDEX
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold uppercase tracking-tight text-[#EAD9B8]">
            ALL CERTIFICATIONS & HONORS
          </h1>
          <p className="text-xs font-mono text-[#C8B99F] max-w-xl leading-relaxed uppercase pt-1">
            Verified industry simulations, software engineering internships, competitive programming awards, and certified professional training.
          </p>
        </div>

        <Certifications />
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default CertificationsPage;

