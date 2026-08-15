import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ScenarioCard } from '../components/ScenarioCard';
import { ActionButtons } from '../components/ActionButtons';
import { ReasonModal } from '../components/ReasonModal';
import { VerificationPanel } from '../components/VerificationPanel';
import { getAIScenarioAnalysis } from '../services/aiService';
import type { AIServiceResponse } from '../types';
import { Sparkles, Bot, Zap, X } from 'lucide-react';

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
    <div className="w-full max-w-4xl mx-auto space-y-6 py-6 px-4 animate-fade-in">
      
      {/* Progress Header & Indicator */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-3">
          <span className="font-mono font-black text-[#3B82F6] text-sm sm:text-base tracking-wider">
            SCENARIO {String(currentIndex + 1).padStart(2, '0')} / {String(scenarios.length).padStart(2, '0')}
          </span>
          {isDemoMode && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-[11px] font-mono font-bold flex items-center space-x-1">
              <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>DEMO MODE</span>
            </span>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full sm:w-64 bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
          <div
            className="bg-gradient-to-r from-[#5B8DEF] to-[#8B7CF6] h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Main Scenario Content Card */}
      <ScenarioCard scenario={currentScenario} />

      {/* Interactive TRUST / VERIFY / REJECT Buttons */}
      <ActionButtons onSelect={(action) => recordChoice(action)} />

      {/* Optional AI Assistant Insight Bar */}
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-slate-600">
          <Bot className="w-4 h-4 text-[#5B8DEF] shrink-0" />
          <span>Curious why this content might be tricky? Ask the AI MIL Assistant:</span>
        </div>

        <button
          onClick={handleFetchAI}
          disabled={loadingAI}
          className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#3B82F6] border border-blue-200 font-mono text-[11px] font-bold flex items-center space-x-1.5 transition-colors shrink-0 shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#5B8DEF]" />
          <span>{loadingAI ? 'Analyzing...' : 'AI MIL Insight'}</span>
        </button>
      </div>

      {/* AI Analysis Dropdown Panel */}
      {aiAnalysis && (
        <div className="w-full max-w-2xl mx-auto p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs space-y-2.5 animate-fade-in shadow-xs">
          <div className="flex items-center justify-between text-[#1D4ED8] font-mono font-bold">
            <span className="flex items-center space-x-1.5">
              <Bot className="w-4 h-4" />
              <span>AI MIL ASSISTANT INSIGHT ({aiAnalysis.source.toUpperCase()})</span>
            </span>
            <button 
              onClick={() => setAiAnalysis(null)} 
              className="text-slate-400 hover:text-slate-700 p-1"
              aria-label="Close insight"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-slate-800 leading-relaxed font-sans text-xs sm:text-sm">
            {aiAnalysis.trustworthinessAnalysis}
          </p>
          <div className="p-3 bg-white rounded-xl border border-blue-100 text-blue-900 font-medium text-xs">
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
