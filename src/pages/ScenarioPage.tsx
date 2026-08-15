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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 py-6 px-4 animate-fade-in relative z-10">
      
      {/* Progress Header — Segmented bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 surface-elevated p-4 sm:p-5 rounded-xl border border-white/[0.07]">
        <div className="flex items-center space-x-3">
          <span className="font-mono font-bold text-sky-300 text-xs sm:text-sm tracking-wider">
            SCENARIO {String(currentIndex + 1).padStart(2, '0')} / {String(scenarios.length).padStart(2, '0')}
          </span>
          {isDemoMode && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold flex items-center space-x-1">
              <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>DEMO</span>
            </span>
          )}
        </div>

        {/* Segmented progress */}
        <div className="flex items-center gap-1 w-full sm:w-64">
          {scenarios.map((_, idx) => (
            <div
              key={idx}
              className={`progress-segment ${
                idx < currentIndex ? 'completed' :
                idx === currentIndex ? 'current' : ''
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Scenario Content */}
      <ScenarioCard scenario={currentScenario} />

      {/* Action Buttons */}
      <ActionButtons onSelect={(action) => recordChoice(action)} />

      {/* AI Assistant Insight Bar */}
      <div className="w-full max-w-2xl mx-auto surface-elevated rounded-xl p-3.5 sm:p-4 border border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-slate-400">
          <Bot className="w-4 h-4 text-sky-400 shrink-0" />
          <span>Curious why this content might be tricky? Ask the AI MIL Assistant:</span>
        </div>

        <button
          onClick={handleFetchAI}
          disabled={loadingAI}
          className="px-3.5 py-1.5 rounded-lg bg-sky-950/40 hover:bg-sky-900/50 text-sky-300 border border-sky-500/25 font-mono text-[11px] font-bold flex items-center space-x-1.5 transition-all shrink-0 cursor-pointer"
        >
          {loadingAI ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin text-sky-400" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3 h-3 text-sky-400" />
              <span>AI MIL Insight</span>
            </>
          )}
        </button>
      </div>

      {/* AI Analysis Result */}
      {aiAnalysis && (
        <div className="w-full max-w-2xl mx-auto p-5 rounded-xl surface-card border border-sky-500/25 text-xs space-y-3 animate-fade-in">
          <div className="flex items-center justify-between text-sky-300 font-mono font-bold">
            <span className="flex items-center space-x-1.5">
              <Bot className="w-4 h-4 text-sky-400" />
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
          <p className="text-slate-200 leading-relaxed text-xs sm:text-sm">
            {aiAnalysis.trustworthinessAnalysis}
          </p>
          <div className="p-3 bg-slate-900/80 rounded-lg border border-sky-500/15 text-sky-200 font-medium text-xs">
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
