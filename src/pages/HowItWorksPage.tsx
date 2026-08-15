import React from 'react';
import { useGame } from '../context/GameContext';
import { CheckCircle2, Search, XCircle, AlertCircle, Play, ShieldAlert, Sparkles, HelpCircle, Layers, ArrowLeft } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { setStep } = useGame();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 py-10 px-4 animate-fade-in relative z-10">
      
      {/* Header & Back Button */}
      <div className="space-y-4">
        <button
          onClick={() => setStep('landing')}
          className="inline-flex items-center space-x-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO HOME</span>
        </button>

        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>METHODOLOGY & USER JOURNEY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            HOW IT WORKS
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Evaluate real-world digital information across AI assistants, news portals, influencer feeds, and viral threads.
          </p>
        </div>
      </div>

      {/* 3 Step Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="surface-card p-6 rounded-2xl border border-white/[0.06] space-y-3 hover:border-cyan-500/30 transition-all">
          <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-xs text-cyan-400">
            01
          </div>
          <h3 className="font-display font-bold text-base text-white">QUESTION</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Resist immediate acceptance. Understand why confident phrasing, high engagement, or algorithmic authority triggers fast trust.
          </p>
        </div>

        <div className="surface-card p-6 rounded-2xl border border-white/[0.06] space-y-3 hover:border-blue-500/30 transition-all">
          <div className="w-9 h-9 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center font-mono font-bold text-xs text-blue-400">
            02
          </div>
          <h3 className="font-display font-bold text-base text-white">VERIFY</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Execute the 6-point UNESCO MIL framework: Source, Date, Evidence, Context, Media Authenticity, and Institutional Consensus.
          </p>
        </div>

        <div className="surface-card p-6 rounded-2xl border border-white/[0.06] space-y-3 hover:border-emerald-500/30 transition-all">
          <div className="w-9 h-9 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-xs text-emerald-400">
            03
          </div>
          <h3 className="font-display font-bold text-base text-white">REFLECT</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Discover your behavioral profile report and watch how your choices construct your simulated algorithmic information environment.
          </p>
        </div>

      </div>

      {/* 3 Natural Decisions Overview */}
      <div className="surface-elevated p-6 sm:p-8 rounded-3xl border border-white/[0.08] space-y-6">
        <div className="text-center space-y-1">
          <h3 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">
            For each scenario, make your natural real-world decision:
          </h3>
          <p className="text-xs text-slate-400">
            Be authentic &mdash; this is an educational laboratory for self-reflection, not a graded exam.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-display font-bold text-base">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>TRUST</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Accept as reliable, factual, and backed by verifiable international datasets or accredited institutions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-display font-bold text-base">
              <Search className="w-4 h-4 text-amber-400" />
              <span>VERIFY</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pause to investigate primary citations, timestamps, credentials, or launch the 6-point MIL audit panel.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
            <div className="flex items-center space-x-2 text-rose-400 font-display font-bold text-base">
              <XCircle className="w-4 h-4 text-rose-400" />
              <span>REJECT</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Flag as misleading clickbait, AI hallucination, emotional outrage, or unverified commercial promotion.
            </p>
          </div>

        </div>

        {/* User Journey Highlights */}
        <div className="pt-4 border-t border-white/[0.06] space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
              1
            </div>
            <span>
              <strong className="text-white">Why did you choose this?</strong> On select scenarios, reflect on cognitive triggers (synthetic confidence, like counts, speed, emotion).
            </span>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 rounded-full bg-blue-950 border border-blue-500/30 text-blue-400 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
              2
            </div>
            <span>
              <strong className="text-white">Information Behaviour Profile:</strong> Receive an educational radar chart evaluating Fast Trust, Verification Habits, Social Proof Sensitivity, and AI Openness.
            </span>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
              3
            </div>
            <span>
              <strong className="text-white">Simulated Recommendation Feed:</strong> Watch how your choices actively generate a personalized simulated feed tailored to your interaction pattern.
            </span>
          </div>
        </div>

      </div>

      {/* Mandatory UNESCO Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/[0.08] flex items-start space-x-3 text-xs text-slate-400">
        <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-200">Educational Simulation:</strong> Developed for the UNESCO Youth Hackathon 2026. Designed for MIL critical reflection; does not reproduce proprietary commercial platform algorithms.
        </p>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={() => setStep('challenge')}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-display font-bold text-sm shadow-xl shadow-cyan-500/20 flex items-center space-x-2 transition-all hover:scale-105 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>START THE EXPERIENCE</span>
        </button>
      </div>

    </div>
  );
};
