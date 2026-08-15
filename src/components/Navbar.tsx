import React from 'react';
import { useGame } from '../context/GameContext';
import { ShieldCheck, Zap, RotateCcw, Award } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { step, setStep, isDemoMode, setIsDemoMode, resetExperience, scenarios, currentIndex } = useGame();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & UNESCO Hackathon Badge */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group" 
          onClick={() => setStep('landing')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setStep('landing'); }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5B8DEF] to-[#8B7CF6] flex items-center justify-center shadow-md shadow-blue-500/15 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold tracking-tight text-[#172033] text-base sm:text-lg">
                TRUST ME, FEED ME
              </span>
              <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EEF4FF] text-[#3B82F6] border border-[#BFDBFE]">
                <Award className="w-3 h-3 mr-1" /> UNESCO MIL 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              What you trust shapes what you see
            </p>
          </div>
        </div>

        {/* Central Step Indicator (If in challenge) */}
        {step === 'challenge' && (
          <div className="hidden sm:flex items-center space-x-2 bg-slate-100/90 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-mono font-bold text-[#3B82F6]">
            <span>SCENARIO {String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-500">{String(scenarios.length).padStart(2, '0')}</span>
          </div>
        )}

        {/* Mode Controls & Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Hackathon Demo Mode Toggle */}
          <button
            onClick={() => setIsDemoMode(!isDemoMode)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              isDemoMode
                ? 'bg-amber-50 text-amber-800 border border-amber-300 shadow-xs'
                : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200/80 hover:text-slate-800'
            }`}
            title="Toggle 5-Scenario Hackathon Fast Demo Mode"
          >
            <Zap className={`w-3.5 h-3.5 ${isDemoMode ? 'text-amber-500 fill-amber-500' : 'text-slate-500'}`} />
            <span className="hidden xs:inline">{isDemoMode ? 'DEMO MODE (5)' : 'FULL MODE (15)'}</span>
          </button>

          {/* Reset Session */}
          {step !== 'landing' && (
            <button
              onClick={resetExperience}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors"
              title="Reset Experience"
              aria-label="Reset Experience"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* Start CTA if on landing */}
          {step === 'landing' && (
            <button
              onClick={() => setStep('challenge')}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#5B8DEF] to-[#8B7CF6] hover:from-[#4B7DE5] hover:to-[#7B6CE6] text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all hover:scale-105"
            >
              START NOW
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
