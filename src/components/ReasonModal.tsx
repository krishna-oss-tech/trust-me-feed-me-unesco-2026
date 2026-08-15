import React, { useState } from 'react';
import { HelpCircle, ArrowRight, X, Check } from 'lucide-react';

interface ReasonModalProps {
  isOpen: boolean;
  onSubmit: (reason: string) => void;
  onSkip: () => void;
}

const REASON_OPTIONS = [
  'It sounded confident & articulate.',
  'The source or logo looked professional.',
  'I already believed it matched my views.',
  'It had many likes, comments, or viral shares.',
  'I didn\'t have enough time to check.',
  'It came from a creator or person I trusted.',
  'It felt emotionally convincing or urgent.',
  'I recognized warning signs of clickbait or AI hallucination.'
];

export const ReasonModal: React.FC<ReasonModalProps> = ({ isOpen, onSubmit, onSkip }) => {
  const [selectedReason, setSelectedReason] = useState<string>('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg surface-elevated rounded-3xl p-6 sm:p-7 border border-white/10 shadow-2xl relative space-y-4">
        
        {/* Close / Skip */}
        <button
          onClick={onSkip}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          title="Skip question"
          aria-label="Skip question"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 pb-1">
          <div className="w-10 h-10 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-xs">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-display font-bold text-white">Why did you make that choice?</h3>
            <p className="text-xs text-slate-400 font-mono">
              Information Behaviour Reflection &bull; Select what influenced your response
            </p>
          </div>
        </div>

        {/* Reasons List */}
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1 my-3">
          {REASON_OPTIONS.map((reason, idx) => {
            const isSelected = selectedReason === reason;
            return (
              <button
                key={idx}
                onClick={() => setSelectedReason(reason)}
                className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/50 border-cyan-500/60 text-cyan-200 font-medium shadow-xs'
                    : 'bg-slate-900/60 border-white/[0.06] text-slate-300 hover:border-white/20 hover:bg-slate-900'
                }`}
              >
                <span className="leading-snug">{reason}</span>
                {isSelected && (
                  <div className="w-4 h-4 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shrink-0 ml-2">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
          <button
            onClick={onSkip}
            className="text-xs text-slate-400 hover:text-slate-200 font-mono transition-colors cursor-pointer"
          >
            Skip for now
          </button>

          <button
            onClick={() => onSubmit(selectedReason || REASON_OPTIONS[0])}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-display font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center space-x-1.5 transition-all hover:scale-105 cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
