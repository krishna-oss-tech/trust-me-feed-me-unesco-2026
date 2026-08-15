import React, { useState } from 'react';
import type { Scenario } from '../types';
import { Globe, Calendar, FileText, Search, Image, Users, ArrowRight, Sparkles, Lightbulb, X, Check } from 'lucide-react';

interface VerificationPanelProps {
  scenario: Scenario;
  onClose: () => void;
}

export const VerificationPanel: React.FC<VerificationPanelProps> = ({ scenario, onClose }) => {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const { verification, explanation, correctStatus } = scenario;

  const checks = [
    { id: 'source',    title: 'SOURCE',    question: 'Who published it?', icon: Globe,    color: 'text-sky-400',     content: verification.source },
    { id: 'date',      title: 'DATE',      question: 'When was it published?', icon: Calendar, color: 'text-purple-400',  content: verification.date },
    { id: 'evidence',  title: 'EVIDENCE',  question: 'What supports the claim?', icon: FileText, color: 'text-emerald-400', content: verification.evidence },
    { id: 'context',   title: 'CONTEXT',   question: 'Is something important missing?', icon: Search,   color: 'text-amber-400',   content: verification.context },
    { id: 'media',     title: 'MEDIA',     question: 'Is the media actually connected?', icon: Image,    color: 'text-rose-400',    content: verification.media },
    { id: 'consensus', title: 'CONSENSUS', question: 'Do other reliable sources agree?', icon: Users,    color: 'text-blue-400',    content: verification.consensus },
  ];

  const toggleCheck = (idx: number) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const allChecked = checkedItems.size === checks.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="w-full max-w-3xl surface-elevated rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl my-6 space-y-6 relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close panel"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-950/60 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-display font-bold text-white">6-Point MIL Investigation</h2>
              <p className="text-xs text-slate-400 font-mono">Check each item to complete the audit trail</p>
            </div>
          </div>

          <span className={`stamp-verdict text-xs ${
            correctStatus === 'TRUST' ? 'text-emerald-400 border-emerald-400' :
            correctStatus === 'VERIFY' ? 'text-amber-400 border-amber-400' :
            'text-rose-400 border-rose-400'
          }`}>
            {correctStatus}
          </span>
        </div>

        {/* Audit Trail — Sequential checklist with vertical line */}
        <div className="relative">
          <div className="audit-trail-line" />

          {checks.map((check, idx) => {
            const isChecked = checkedItems.has(idx);
            const Icon = check.icon;
            return (
              <div key={check.id} className="audit-step">
                <button
                  onClick={() => toggleCheck(idx)}
                  className={`audit-step-marker cursor-pointer ${isChecked ? 'checked' : ''}`}
                  aria-label={`Toggle ${check.title}`}
                >
                  {isChecked ? <Check className="w-3 h-3" /> : <span>{idx + 1}</span>}
                </button>

                <div
                  className={`rounded-xl p-4 border transition-all cursor-pointer ${
                    isChecked
                      ? 'surface-card border-sky-500/30 shadow-sm'
                      : 'bg-slate-900/40 border-white/[0.04] hover:border-white/10'
                  }`}
                  onClick={() => toggleCheck(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleCheck(idx); }}
                >
                  <div className="flex items-center space-x-2 mb-1.5">
                    <Icon className={`w-4 h-4 ${check.color}`} />
                    <span className="font-mono text-xs font-bold text-white">{check.title}</span>
                    <span className="text-[11px] text-slate-500">— {check.question}</span>
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed transition-all ${
                    isChecked ? 'text-slate-200' : 'text-slate-500'
                  }`}>
                    {check.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* WHAT WE FOUND — appears stamped once all are checked */}
        <div className={`p-5 rounded-xl border space-y-2 transition-all ${
          allChecked
            ? 'bg-sky-950/20 border-sky-500/30'
            : 'surface-card border-white/[0.06]'
        }`}>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-sky-300 uppercase">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>WHAT WE FOUND</span>
            {allChecked && <span className="text-[10px] text-emerald-400 ml-2">✓ Full audit completed</span>}
          </div>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            {explanation}
          </p>
        </div>

        {/* Takeaway */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-white/[0.06] flex items-center space-x-3 text-xs text-slate-300">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
          <p className="leading-snug">
            <strong className="text-white">REMEMBER:</strong> &ldquo;Confidence is not evidence. Slick presentations can disguise missing sources.&rdquo;
          </p>
        </div>

        {/* Continue */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 hover:brightness-110 active:scale-[0.97] text-slate-950 font-display font-bold text-xs shadow-lg shadow-sky-500/20 flex items-center space-x-2 transition-all cursor-pointer"
          >
            <span>Resume Journey</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
