import React, { useState } from 'react';
import { InformationProfile } from '../../types';
import { Copy, Check, X, Share2, Award, ShieldCheck } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: InformationProfile;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, profile }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const shareText = `🛡️ TRUST ME, FEED ME — UNESCO Youth Hackathon 2026
My Information Behaviour Archetype: "${profile.archetypeTitle}"
Verification Habit: ${profile.metrics.verificationHabit}% | Decision Accuracy: ${profile.metrics.accuracyScore}%
"What you trust shapes what you see."
Try the interactive MIL experience!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xl relative space-y-4">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close share modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#5B8DEF] shrink-0">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-[#172033]">Share Your MIL Result</h3>
            <p className="text-xs text-slate-500 font-medium">Anonymous educational summary card</p>
          </div>
        </div>

        {/* Card Summary Snippet */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 space-y-2.5">
          <div className="flex items-center space-x-1.5 text-[#1D4ED8] font-black">
            <Award className="w-4 h-4" />
            <span className="text-sm">{profile.archetypeTitle}</span>
          </div>
          <p className="text-slate-600 font-sans italic text-xs leading-relaxed">
            &ldquo;{profile.archetypeSubtitle}&rdquo;
          </p>
          <div className="pt-2.5 border-t border-slate-200 flex justify-between text-xs font-bold">
            <span>Verify Habit: <strong className="text-[#10B981]">{profile.metrics.verificationHabit}%</strong></span>
            <span>Accuracy: <strong className="text-[#3B82F6]">{profile.metrics.accuracyScore}%</strong></span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#5B8DEF] to-[#8B7CF6] hover:from-[#4B7DE5] hover:to-[#7B6CE6] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all hover:scale-105 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>COPIED TO CLIPBOARD!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>COPY SHAREABLE SUMMARY</span>
            </>
          )}
        </button>

      </div>
    </div>
  );
};
