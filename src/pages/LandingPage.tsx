import React from 'react';
import { useGame } from '../context/GameContext';
import { ShieldCheck, HelpCircle, Search, Brain, ArrowRight, Zap, Play, Sparkles, CheckCircle2, Bot, Layers } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setStep, isDemoMode, setIsDemoMode } = useGame();

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 sm:space-y-16 py-8 sm:py-16 px-4 animate-fade-in">
      
      {/* Hero Section */}
      <div className="text-center space-y-6">
        
        {/* UNESCO Hackathon Tag */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#3B82F6] text-xs font-semibold shadow-xs">
          <ShieldCheck className="w-4 h-4 text-[#5B8DEF]" />
          <span>UNESCO YOUTH HACKATHON 2026 &bull; AI & MIL</span>
        </div>

        {/* Large Title */}
        <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-[#172033] leading-none">
          TRUST ME,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B8DEF] via-[#8B7CF6] to-[#63C7B2]">
            FEED ME
          </span>
        </h1>

        {/* Tagline Subtitle */}
        <p className="text-xl sm:text-3xl font-extrabold text-slate-700 tracking-tight">
          &ldquo;What you trust shapes what you see.&rdquo;
        </p>

        {/* Supporting Text */}
        <p className="text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed pt-1">
          An interactive Media and Information Literacy experience that helps young people question AI and online information, learn how to verify it, and understand how their choices can shape the information environment they experience.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setStep('challenge')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#5B8DEF] to-[#8B7CF6] hover:from-[#4B7DE5] hover:to-[#7B6CE6] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all hover:scale-105"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>START THE EXPERIENCE</span>
          </button>

          <button
            onClick={() => setStep('how_it_works')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm sm:text-base shadow-sm flex items-center justify-center space-x-2 transition-all hover:scale-105"
          >
            <span>HOW IT WORKS</span>
            <ArrowRight className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Fast Demo Mode Shortcut Pill for Judges */}
        <div className="pt-2">
          <button
            onClick={() => setIsDemoMode(!isDemoMode)}
            className="inline-flex items-center space-x-2 text-xs font-medium text-slate-500 hover:text-amber-600 bg-slate-100 hover:bg-amber-50 px-3.5 py-1.5 rounded-full border border-slate-200 hover:border-amber-300 transition-all"
          >
            <Zap className={`w-3.5 h-3.5 ${isDemoMode ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
            <span>
              {isDemoMode
                ? 'Demo Mode Active: 5 Curated Scenarios (~2 mins)'
                : 'Judges Shortcut: Enable 5-Scenario Demo Mode'}
            </span>
          </button>
        </div>

      </div>

      {/* Visual representation: Information Cards flowing into a personalized feed */}
      <div className="light-card rounded-3xl p-6 sm:p-10 border border-slate-200/90 relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-blue-50/30">
        
        {/* Soft background accents */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-100/40 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold font-mono text-[#3B82F6] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <Layers className="w-3.5 h-3.5" />
              <span>Interactive Information Cycle</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#172033]">
              From Every Choice to Your Custom Feed
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-2">
            
            {/* Step Card 1 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3 relative group hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-[#5B8DEF] bg-blue-50 px-2.5 py-1 rounded-lg">01 &bull; ENCOUNTER</span>
                <Bot className="w-4 h-4 text-[#5B8DEF]" />
              </div>
              <h4 className="font-bold text-sm text-[#172033]">AI, News & Social Claims</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Meet realistic posts, viral statistics, AI hallucinations, and breaking alerts.
              </p>
              <div className="pt-2 flex gap-1.5 text-[10px] font-bold">
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">Trust</span>
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">Verify</span>
                <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">Reject</span>
              </div>
            </div>

            {/* Step Card 2 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3 relative group hover:border-purple-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-[#8B7CF6] bg-purple-50 px-2.5 py-1 rounded-lg">02 &bull; EVALUATE</span>
                <Search className="w-4 h-4 text-[#8B7CF6]" />
              </div>
              <h4 className="font-bold text-sm text-[#172033]">6-Point MIL Audit</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Investigate source strength, timestamps, missing context, and clinical or media consensus.
              </p>
              <div className="pt-2 flex items-center text-[10px] text-purple-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                <span>Confidence is not evidence</span>
              </div>
            </div>

            {/* Step Card 3 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3 relative group hover:border-teal-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-[#63C7B2] bg-teal-50 px-2.5 py-1 rounded-lg">03 &bull; SIMULATE</span>
                <Sparkles className="w-4 h-4 text-[#63C7B2]" />
              </div>
              <h4 className="font-bold text-sm text-[#172033]">Simulated Feed Reveal</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Experience how your behavioral tendencies actively shape what an algorithmic feed serves next.
              </p>
              <div className="pt-2 text-[10px] text-teal-700 font-semibold">
                <span>Personalized Information Profile</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* 3 Core MIL Principles: QUESTION, VERIFY, REFLECT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        
        <div className="light-card p-6 sm:p-7 rounded-2xl border border-slate-200 text-center space-y-3 hover:border-blue-300">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#5B8DEF] mx-auto shadow-xs">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-[#172033] tracking-wide">01 QUESTION</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Don&apos;t automatically trust information. Understand why you trust or reject content &mdash; emotional hooks, AI cadence, and social proof.
          </p>
        </div>

        <div className="light-card p-6 sm:p-7 rounded-2xl border border-slate-200 text-center space-y-3 hover:border-indigo-300">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-[#8B7CF6] mx-auto shadow-xs">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-[#172033] tracking-wide">02 VERIFY</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Check the source, evidence, date, context, media authenticity, and consensus before sharing.
          </p>
        </div>

        <div className="light-card p-6 sm:p-7 rounded-2xl border border-slate-200 text-center space-y-3 hover:border-teal-300">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#63C7B2] mx-auto shadow-xs">
            <Brain className="w-6 h-6" />
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-[#172033] tracking-wide">03 REFLECT</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            See what your choices reveal about your information habits and explore your simulated algorithm feed.
          </p>
        </div>

      </div>

    </div>
  );
};
