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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && selectedReason) {
      onSubmit(selectedReason);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onKeyDown={handleKeyDown}>
      <div className="w-full max-w-lg surface-elevated rounded-2xl p-6 sm:p-7 border border-white/10 shadow-2xl relative space-y-4">
        
        {/* Close */}
        <button
          onClick={onSkip}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          title="Skip question"
          aria-label="Skip question"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header — calm, reflective */}
        <div className="flex items-center space-x-3 pb-1">
          <div className="w-9 h-9 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 shrink-0">
            <HelpCircle className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-base font-display font-bold text-white">Why did you make that choice?</h3>
            <p className="text-[11px] text-slate-500 font-mono">
              Reflect on what influenced your response
            </p>
          </div>
        </div>

        {/* Reasons — left border accent on selection instead of full background */}
        <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1 my-3">
          {REASON_OPTIONS.map((reason, idx) => {
            const isSelected = selectedReason === reason;
            return (
              <button
                key={idx}
                onClick={() => setSelectedReason(reason)}
                className={`w-full text-left p-3 rounded-xl border-l-[3px] border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'border-l-sky-400 bg-sky-950/20 border-sky-500/30 text-sky-100 font-medium'
                    : 'border-l-transparent bg-slate-900/40 border-white/[0.04] text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <span className="leading-snug">{reason}</span>
                {isSelected && (
                  <div className="w-4 h-4 rounded-full bg-sky-400 text-slate-950 flex items-center justify-center shrink-0 ml-2">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
          <button
            onClick={onSkip}
            className="text-xs text-slate-500 hover:text-slate-300 font-mono transition-colors cursor-pointer"
          >
            Skip for now
          </button>

          <button
            onClick={() => onSubmit(selectedReason || REASON_OPTIONS[0])}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 hover:brightness-110 active:scale-[0.97] text-slate-950 font-display font-bold text-xs shadow-md shadow-sky-500/20 flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
