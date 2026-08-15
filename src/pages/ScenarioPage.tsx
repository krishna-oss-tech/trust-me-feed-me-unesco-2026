import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ScenarioCard } from '../components/ScenarioCard';
import { ActionButtons } from '../components/ActionButtons';
import { ReasonModal } from '../components/ReasonModal';
import { VerificationPanel } from '../components/VerificationPanel';
import { getAIScenarioAnalysis } from '../services/aiService';
import type { AIServiceResponse } from '../types';
import { Sparkles, Bot, Zap, X, Loader2 } from 'lucide-react';

export const ScenarioPage: React.FC = () => {
  const {
    currentScenario,
    currentIndex,
    scenarios,
    recordChoice,
    showReasonModal,
    submitReason,
    skipReason,
    showVerificationPanel,
    activeVerificationScenario,
    closeVerification,
    isDemoMode,
  } = useGame();

  const [aiAnalysis, setAiAnalysis] = useState<AIServiceResponse | null>(null);
  const [loadingAI, setLoadingAI] = useState<boolean>(false);

  const handleFetchAI = async () => {
    setLoadingAI(true);
    const result = await getAIScenarioAnalysis(currentScenario);
    setAiAnalysis(result);
    setLoadingAI(false);
  };

  const progressPct = Math.round(((currentIndex + 1) / scenarios.length) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 py-6 px-4 animate-fade-in relative z-10">
      
      {/* Progress Header & Tracker */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 surface-elevated p-4 sm:p-5 rounded-2xl border border-white/[0.07] shadow-xs">
        <div className="flex items-center space-x-3">
          <span className="font-mono font-bold text-cyan-300 text-xs sm:text-sm tracking-wider">
            SCENARIO {String(currentIndex + 1).padStart(2, '0')} / {String(scenarios.length).padStart(2, '0')}
          </span>
          {isDemoMode && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold flex items-center space-x-1">
              <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>DEMO MODE</span>
            </span>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full sm:w-64 bg-slate-900 h-2 rounded-full overflow-hidden border border-white/10">
          <div
            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Main Scenario Content Card */}
      <ScenarioCard scenario={currentScenario} />

      {/* Interactive TRUST / VERIFY / REJECT Action Buttons */}
      <ActionButtons onSelect={(action) => recordChoice(action)} />

      {/* Optional AI Assistant Insight Bar */}
      <div className="w-full max-w-2xl mx-auto surface-elevated rounded-2xl p-3.5 sm:p-4 border border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-slate-400">
          <Bot className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Curious why this content might be tricky? Ask the AI MIL Assistant:</span>
        </div>

        <button
          onClick={handleFetchAI}
          disabled={loadingAI}
          className="px-3.5 py-1.5 rounded-xl bg-cyan-950/50 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 font-mono text-[11px] font-bold flex items-center space-x-1.5 transition-all shrink-0 cursor-pointer"
        >
          {loadingAI ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin text-cyan-400" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>AI MIL Insight</span>
            </>
          )}
        </button>
      </div>

      {/* AI Analysis Dropdown Drawer */}
      {aiAnalysis && (
        <div className="w-full max-w-2xl mx-auto p-5 rounded-2xl surface-card border border-cyan-500/30 text-xs space-y-3 animate-fade-in shadow-lg shadow-cyan-950/20">
          <div className="flex items-center justify-between text-cyan-300 font-mono font-bold">
            <span className="flex items-center space-x-1.5">
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>AI MIL ASSISTANT INSIGHT ({aiAnalysis.source.toUpperCase()})</span>
            </span>
            <button 
              onClick={() => setAiAnalysis(null)} 
              className="text-slate-400 hover:text-white p-1 cursor-pointer transition-colors"
              aria-label="Close insight"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-slate-200 leading-relaxed font-sans text-xs sm:text-sm">
            {aiAnalysis.trustworthinessAnalysis}
          </p>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-cyan-500/20 text-cyan-200 font-medium text-xs">
            💡 <strong>MIL Tip:</strong> {aiAnalysis.milRecommendation}
          </div>
        </div>
      )}

      {/* Modals */}
      <ReasonModal
        isOpen={showReasonModal}
        onSubmit={submitReason}
        onSkip={skipReason}
      />

      {showVerificationPanel && activeVerificationScenario && (
        <VerificationPanel
          scenario={activeVerificationScenario}
          onClose={closeVerification}
        />
      )}

    </div>
  );
};
