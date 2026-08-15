import React, { useState } from 'react';
import type { Scenario } from '../types';
import { Search, Calendar, FileText, Globe, Image, Users, ArrowRight, Sparkles, CheckCircle2, Lightbulb } from 'lucide-react';

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
      icon: <Globe className="w-4 h-4 text-[#5B8DEF]" />,
      content: verification.source,
    },
    {
      id: 'date',
      title: '2. DATE',
      question: 'When was it published?',
      icon: <Calendar className="w-4 h-4 text-[#8B7CF6]" />,
      content: verification.date,
    },
    {
      id: 'evidence',
      title: '3. EVIDENCE',
      question: 'What supports the claim?',
      icon: <FileText className="w-4 h-4 text-[#10B981]" />,
      content: verification.evidence,
    },
    {
      id: 'context',
      title: '4. CONTEXT',
      question: 'Is something important missing?',
      icon: <Search className="w-4 h-4 text-[#F59E0B]" />,
      content: verification.context,
    },
    {
      id: 'media',
      title: '5. MEDIA',
      question: 'Is the media actually connected?',
      icon: <Image className="w-4 h-4 text-[#EC4899]" />,
      content: verification.media,
    },
    {
      id: 'consensus',
      title: '6. CONSENSUS',
      question: 'Do other reliable sources support it?',
      icon: <Users className="w-4 h-4 text-[#3B82F6]" />,
      content: verification.consensus,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl my-6 space-y-6">
        
        {/* Verification Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-[#8B7CF6] shrink-0">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#172033]">6-Point MIL Verification Audit</h2>
              <p className="text-xs text-slate-500 font-medium">Investigate scenario claims through structured checks</p>
            </div>
          </div>

          <span className={`text-xs font-extrabold px-3 py-1.5 rounded-full border shadow-2xs ${
            correctStatus === 'TRUST' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
            correctStatus === 'VERIFY' ? 'bg-indigo-50 text-indigo-800 border-indigo-200' :
            'bg-rose-50 text-rose-800 border-rose-200'
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
                    ? 'bg-blue-50/80 border-[#5B8DEF] shadow-xs'
                    : 'bg-slate-50/60 border-slate-200/80 text-slate-600 hover:border-slate-300 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {check.icon}
                  <span className="font-mono text-xs font-black text-[#172033]">{check.title}</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate leading-snug">{check.question}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Check Inspection Card */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#3B82F6]">
            {checks[activeTab].icon}
            <span>{checks[activeTab].title} &bull; {checks[activeTab].question}</span>
          </div>
          <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-normal">
            {checks[activeTab].content}
          </p>
        </div>

        {/* WHAT WE FOUND Section */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-teal-50/60 border border-blue-200/80 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold font-mono text-[#1D4ED8] uppercase">
            <Sparkles className="w-4 h-4 text-[#5B8DEF]" />
            <span>WHAT WE FOUND</span>
          </div>
          <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
            {explanation}
          </p>
        </div>

        {/* WHAT TO REMEMBER Banner */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center space-x-3 text-xs text-amber-900">
          <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" />
          <p className="leading-snug">
            <strong>WHAT TO REMEMBER:</strong> &ldquo;Confidence is not evidence. Slick presentations can disguise missing sources.&rdquo;
          </p>
        </div>

        {/* Continue Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-7 py-3 rounded-2xl bg-gradient-to-r from-[#5B8DEF] to-[#8B7CF6] hover:from-[#4B7DE5] hover:to-[#7B6CE6] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/20 flex items-center space-x-2 transition-all hover:scale-105 cursor-pointer"
          >
            <span>Resume Journey</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
