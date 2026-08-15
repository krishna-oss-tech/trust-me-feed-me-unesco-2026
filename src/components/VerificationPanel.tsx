import React, { useState } from 'react';
import type { Scenario } from '../types';
import { Search, Calendar, FileText, Globe, Image, Users, ArrowRight, Sparkles, Lightbulb, X } from 'lucide-react';

interface VerificationPanelProps {
  scenario: Scenario;
  onClose: () => void;
}

export const VerificationPanel: React.FC<VerificationPanelProps> = ({ scenario, onClose }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { verification, explanation, correctStatus } = scenario;

  const checks = [
    {
      id: 'source',
      title: '1. SOURCE',
      question: 'Who published it?',
      icon: <Globe className="w-4 h-4 text-cyan-400" />,
      content: verification.source,
    },
    {
      id: 'date',
      title: '2. DATE',
      question: 'When was it published?',
      icon: <Calendar className="w-4 h-4 text-purple-400" />,
      content: verification.date,
    },
    {
      id: 'evidence',
      title: '3. EVIDENCE',
      question: 'What supports the claim?',
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      content: verification.evidence,
    },
    {
      id: 'context',
      title: '4. CONTEXT',
      question: 'Is something important missing?',
      icon: <Search className="w-4 h-4 text-amber-400" />,
      content: verification.context,
    },
    {
      id: 'media',
      title: '5. MEDIA',
      question: 'Is the media actually connected?',
      icon: <Image className="w-4 h-4 text-rose-400" />,
      content: verification.media,
    },
    {
      id: 'consensus',
      title: '6. CONSENSUS',
      question: 'Do other reliable sources support it?',
      icon: <Users className="w-4 h-4 text-blue-400" />,
      content: verification.consensus,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="w-full max-w-3xl surface-elevated rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl my-6 space-y-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close panel"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Verification Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-xs">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-display font-bold text-white">6-Point MIL Investigation Audit</h2>
              <p className="text-xs text-slate-400 font-mono">Investigate scenario claims through structured checks</p>
            </div>
          </div>

          <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border shadow-xs ${
            correctStatus === 'TRUST' ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40' :
            correctStatus === 'VERIFY' ? 'bg-amber-950/60 text-amber-300 border-amber-500/40' :
            'bg-rose-950/60 text-rose-300 border-rose-500/40'
          }`}>
            RECOMMENDED: {correctStatus}
          </span>
        </div>

        {/* 6 Checks Tab Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {checks.map((check, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={check.id}
                onClick={() => setActiveTab(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-500/60 text-cyan-200 shadow-xs'
                    : 'bg-slate-900/60 border-white/[0.06] text-slate-400 hover:border-white/20 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {check.icon}
                  <span className="font-mono text-xs font-bold text-white">{check.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 truncate leading-snug">{check.question}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Check Inspection Card */}
        <div className="p-5 rounded-2xl surface-card border border-white/[0.08] space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-300">
            {checks[activeTab].icon}
            <span>{checks[activeTab].title} &bull; {checks[activeTab].question}</span>
          </div>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal">
            {checks[activeTab].content}
          </p>
        </div>

        {/* WHAT WE FOUND Section */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-purple-950/30 border border-cyan-500/30 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-300 uppercase">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>WHAT WE FOUND</span>
          </div>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            {explanation}
          </p>
        </div>

        {/* WHAT TO REMEMBER Banner */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/[0.08] flex items-center space-x-3 text-xs text-slate-300">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
          <p className="leading-snug">
            <strong className="text-white">WHAT TO REMEMBER:</strong> &ldquo;Confidence is not evidence. Slick presentations can disguise missing sources.&rdquo;
          </p>
        </div>

        {/* Continue Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-display font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center space-x-2 transition-all hover:scale-105 cursor-pointer"
          >
            <span>Resume Journey</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
