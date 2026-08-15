import React from 'react';
import { useGame } from '../context/GameContext';
import { ShieldCheck, HelpCircle, Search, Brain, ArrowRight, Zap, Play, Sparkles, CheckCircle2, Bot, Layers, TrendingUp, AlertTriangle } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setStep, isDemoMode, setIsDemoMode } = useGame();

  return (
    <div className="w-full max-w-5xl mx-auto space-y-16 sm:space-y-24 py-10 sm:py-20 px-4 animate-fade-in relative z-10">
      
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        
        {/* UNESCO Hackathon Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>UNESCO YOUTH HACKATHON 2026 &bull; AI & MIL</span>
        </div>

        {/* Display Title */}
        <h1 className="text-5xl sm:text-7xl font-display font-black tracking-tight text-white leading-none">
          TRUST ME,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
            FEED ME
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl font-display font-bold text-slate-200 tracking-tight">
          &ldquo;What you trust shapes what you see.&rdquo;
        </p>

        {/* Supporting Editorial Paragraph */}
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          An interactive Media and Information Literacy (MIL) laboratory. Question synthetic AI answers, evaluate viral claims, and discover how your choices construct your information environment.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
          <button
            onClick={() => setStep('challenge')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-display font-bold text-sm sm:text-base shadow-xl shadow-cyan-500/20 flex items-center justify-center space-x-2 transition-all hover:scale-105 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>START THE EXPERIENCE</span>
          </button>

          <button
            onClick={() => setStep('how_it_works')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/10 text-slate-200 font-display font-semibold text-sm sm:text-base shadow-sm flex items-center justify-center space-x-2 transition-all hover:scale-105 cursor-pointer"
          >
            <span>HOW IT WORKS</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Fast Demo Mode Shortcut Pill for Judges */}
        <div className="pt-1">
          <button
            onClick={() => setIsDemoMode(!isDemoMode)}
            className={`inline-flex items-center space-x-2 text-xs font-mono px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
              isDemoMode
                ? 'bg-amber-950/50 text-amber-300 border-amber-500/40'
                : 'bg-slate-900/60 text-slate-400 border-white/[0.08] hover:border-white/20 hover:text-slate-300'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${isDemoMode ? 'text-amber-400 fill-amber-400' : 'text-slate-500'}`} />
            <span>
              {isDemoMode
                ? 'Demo Mode Active: 5 Curated Scenarios (~2 mins)'
                : 'Judges Shortcut: Enable 5-Scenario Fast Demo'}
            </span>
          </button>
        </div>

      </div>

      {/* Visual Information System Convergence Architecture */}
      <div className="surface-elevated rounded-3xl p-6 sm:p-10 border border-white/[0.08] relative overflow-hidden bg-gradient-to-b from-[#0F1523] via-[#0B0F19] to-[#090D16]">
        
        {/* Glow behind convergence */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8">
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-500/20">
              <Layers className="w-3.5 h-3.5" />
              <span>Interactive Information Cycle</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              How Decisions Shape Algorithmic Realities
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            
            {/* Step 1: Encounter */}
            <div className="surface-card p-5 rounded-2xl border border-white/[0.06] space-y-3 relative group hover:border-cyan-500/30 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/20 px-2 py-0.5 rounded">
                  01 &bull; ENCOUNTER
                </span>
                <Bot className="w-4 h-4 text-cyan-400" />
              </div>
              <h4 className="font-display font-bold text-sm text-slate-100">Live Information Streams</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluate realistic synthetic AI responses, viral claims, misleading charts, and recycled news.
              </p>
              <div className="pt-1 flex gap-1.5 text-[10px] font-mono font-bold">
                <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">Trust</span>
                <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-400 border border-amber-500/30">Verify</span>
                <span className="px-2 py-0.5 rounded bg-rose-950/60 text-rose-400 border border-rose-500/30">Reject</span>
              </div>
            </div>

            {/* Step 2: Evaluate */}
            <div className="surface-card p-5 rounded-2xl border border-white/[0.06] space-y-3 relative group hover:border-blue-500/30 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-blue-400 bg-blue-950/60 border border-blue-500/20 px-2 py-0.5 rounded">
                  02 &bull; EVALUATE
                </span>
                <Search className="w-4 h-4 text-blue-400" />
              </div>
              <h4 className="font-display font-bold text-sm text-slate-100">6-Point MIL Audit</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Investigate source accountability, timestamps, primary evidence, missing context, and consensus.
              </p>
              <div className="pt-1 flex items-center text-[10px] font-mono text-blue-300">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-blue-400" />
                <span>Confidence is not evidence</span>
              </div>
            </div>

            {/* Step 3: Simulate */}
            <div className="surface-card p-5 rounded-2xl border border-white/[0.06] space-y-3 relative group hover:border-emerald-500/30 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded">
                  03 &bull; SIMULATE
                </span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="font-display font-bold text-sm text-slate-100">Simulated Feed Transformation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Experience how your behavioral choices feed into algorithmic tendencies to construct your future feed.
              </p>
              <div className="pt-1 text-[10px] font-mono text-emerald-400">
                <span>Personalized Information Profile</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* 3 Core MIL Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div className="surface-card p-6 rounded-2xl border border-white/[0.06] space-y-2.5 hover:border-cyan-500/30 transition-all">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-xs">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-display font-bold text-white tracking-wide">01 QUESTION</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Resist fast trust. Understand the psychological hooks behind articulate AI answers, high like counts, and emotional outrage.
          </p>
        </div>

        <div className="surface-card p-6 rounded-2xl border border-white/[0.06] space-y-2.5 hover:border-blue-500/30 transition-all">
          <div className="w-10 h-10 rounded-xl bg-blue-950/50 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-xs">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-base font-display font-bold text-white tracking-wide">02 VERIFY</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Perform the UNESCO 6-point verification audit: Source, Date, Evidence, Context, Media Authenticity, and Institutional Consensus.
          </p>
        </div>

        <div className="surface-card p-6 rounded-2xl border border-white/[0.06] space-y-2.5 hover:border-emerald-500/30 transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-xs">
            <Brain className="w-5 h-5" />
          </div>
          <h3 className="text-base font-display font-bold text-white tracking-wide">03 REFLECT</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            See your complete behavioural profile chart and see how your interactions actively fuel the algorithmic feed you receive.
          </p>
        </div>

      </div>

    </div>
  );
};
