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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xl relative space-y-4">
        
        {/* Close / Skip */}
        <button
          onClick={onSkip}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Skip question"
          aria-label="Skip question"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 pb-1">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#5B8DEF] shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-[#172033]">Why did you make that choice?</h3>
            <p className="text-xs text-slate-500 font-medium">
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
                    ? 'bg-blue-50 border-[#5B8DEF] text-blue-950 font-bold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/80'
                }`}
              >
                <span className="leading-snug">{reason}</span>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-[#5B8DEF] text-white flex items-center justify-center shrink-0 ml-2 shadow-2xs">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            onClick={onSkip}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors"
          >
            Skip for now
          </button>

          <button
            onClick={() => onSubmit(selectedReason || REASON_OPTIONS[0])}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#5B8DEF] to-[#8B7CF6] hover:from-[#4B7DE5] hover:to-[#7B6CE6] text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 flex items-center space-x-1.5 transition-all hover:scale-105 cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
