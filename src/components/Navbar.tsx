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
          
          {/* Brand & UNESCO Badge */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => setStep('landing')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setStep('landing'); }}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-500/10 group-hover:border-cyan-400 group-hover:scale-105 transition-all">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <span className="font-display font-bold tracking-tight text-white text-sm sm:text-base group-hover:text-cyan-300 transition-colors">
                  TRUST ME, FEED ME
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                  <Award className="w-2.5 h-2.5 mr-1 text-cyan-400" /> UNESCO MIL 2026
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400 hidden sm:block">
                What you trust shapes what you see
              </p>
            </div>
          </div>

          {/* Central Step Indicator (During Challenge) */}
          {step === 'challenge' && (
            <div className="hidden sm:flex items-center space-x-2 bg-slate-900/80 px-3.5 py-1 rounded-full border border-white/10 text-xs font-mono font-semibold text-cyan-300 shadow-inner">
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
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-900/40 hover:border-cyan-400 hover:text-white shadow-xs transition-all cursor-pointer"
              title="Open Real-Time Claim Verifier (Tavily + AI)"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
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
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center space-x-1 transition-all hover:scale-105 cursor-pointer"
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
