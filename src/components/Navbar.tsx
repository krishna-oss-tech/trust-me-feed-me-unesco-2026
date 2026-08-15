import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ShieldCheck, Zap, RotateCcw, Award, Globe, ArrowRight } from 'lucide-react';
import { LiveClaimModal } from './LiveClaimModal';

export const Navbar: React.FC = () => {
  const { step, setStep, isDemoMode, setIsDemoMode, resetExperience, scenarios, currentIndex } = useGame();
  const [showLiveModal, setShowLiveModal] = useState<boolean>(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#090D16]/85 backdrop-blur-xl border-b border-white/[0.07] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand & UNESCO Credibility Badge */}
          <div 
            className="flex items-center space-x-3.5 cursor-pointer group select-none" 
            onClick={() => setStep('landing')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setStep('landing'); }}
          >
            {/* Minimalist Shield + Eye Logo */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#090F1F] border border-sky-500/35 flex items-center justify-center shadow-[0_0_12px_rgba(56,189,248,0.15)] group-hover:border-sky-400 group-hover:shadow-[0_0_18px_rgba(56,189,248,0.3)] transition-all duration-200 shrink-0">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-5 h-5 sm:w-[22px] sm:h-[22px]"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Trust Me Feed Me Logo"
              >
                {/* Minimal Shield Geometry */}
                <path 
                  d="M12 2.5L4.5 5.5V11C4.5 15.8 7.7 19.9 12 21.2C16.3 19.9 19.5 15.8 19.5 11V5.5L12 2.5Z" 
                  stroke="#38BDF8" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                {/* Perception Eye Geometry */}
                <path 
                  d="M7.5 12C8.7 9.8 10.3 8.7 12 8.7C13.7 8.7 15.3 9.8 16.5 12C15.3 14.2 13.7 15.3 12 15.3C10.3 15.3 8.7 14.2 7.5 12Z" 
                  stroke="#38BDF8" 
                  strokeWidth="1.35" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                {/* Verification Pupil / Focus Core */}
                <circle 
                  cx="12" 
                  cy="12" 
                  r="1.5" 
                  fill="#38BDF8" 
                />
              </svg>
            </div>

            {/* Wordmark & Editorial Tagline */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2.5">
                <span className="font-display font-bold text-sm sm:text-base tracking-tight leading-none">
                  <span className="text-slate-100 group-hover:text-white transition-colors">TRUST ME</span>
                  <span className="text-slate-500 font-normal">, </span>
                  <span className="text-sky-400 group-hover:text-sky-300 transition-colors">FEED ME</span>
                </span>
                
                {/* Refined Credibility Badge */}
                <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-900/80 text-slate-400 border border-slate-700/50 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                  <span className="font-semibold text-slate-300 tracking-wide">UNESCO</span>
                  <span className="text-slate-600">/</span>
                  <span className="text-sky-400 font-medium">MIL 2026</span>
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400/90 tracking-normal mt-0.5 hidden sm:block leading-tight">
                What you trust shapes what you see
              </p>
            </div>
          </div>

          {/* Central Step Indicator (During Challenge) */}
          {step === 'challenge' && (
            <div className="hidden sm:flex items-center space-x-2 bg-slate-900/80 px-3.5 py-1 rounded-full border border-white/10 text-xs font-mono font-semibold text-sky-300 shadow-inner">
              <span className="text-slate-400 text-[11px]">SCENARIO</span>
              <span className="text-white font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">{String(scenarios.length).padStart(2, '0')}</span>
            </div>
          )}

          {/* Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Live Claim Check Trigger */}
            <button
              onClick={() => setShowLiveModal(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-sky-950/40 text-sky-300 border border-sky-500/30 hover:bg-sky-900/40 hover:border-sky-400 hover:text-white shadow-xs transition-all cursor-pointer"
              title="Open Real-Time Claim Verifier (Tavily + AI)"
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">LIVE CLAIM CHECK</span>
              <span className="sm:hidden">LIVE</span>
            </button>

            {/* Hackathon Demo Mode Switcher */}
            <button
              onClick={() => setIsDemoMode(!isDemoMode)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                isDemoMode
                  ? 'bg-amber-950/40 text-amber-300 border border-amber-500/40 shadow-xs'
                  : 'bg-slate-900/80 text-slate-400 border border-white/10 hover:border-white/20 hover:text-slate-200'
              }`}
              title="Toggle 5-Scenario Hackathon Demo Mode"
            >
              <Zap className={`w-3 h-3 ${isDemoMode ? 'text-amber-400 fill-amber-400' : 'text-slate-500'}`} />
              <span className="hidden xs:inline">{isDemoMode ? 'DEMO (5)' : 'FULL (15)'}</span>
            </button>

            {/* Reset Experience */}
            {step !== 'landing' && (
              <button
                onClick={resetExperience}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-white/10 transition-colors cursor-pointer"
                title="Restart Session"
                aria-label="Restart Session"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Start CTA on Landing */}
            {step === 'landing' && (
              <button
                onClick={() => setStep('challenge')}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 hover:brightness-110 active:scale-[0.97] text-slate-950 font-bold text-xs shadow-md shadow-sky-500/20 flex items-center space-x-1 transition-all cursor-pointer"
              >
                <span>START</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Real-Time Live Claim Check Modal */}
      <LiveClaimModal
        isOpen={showLiveModal}
        onClose={() => setShowLiveModal(false)}
      />
    </>
  );
};
