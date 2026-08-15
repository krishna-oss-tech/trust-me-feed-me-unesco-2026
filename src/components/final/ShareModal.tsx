import React, { useState } from 'react';
import { InformationProfile } from '../../types';
import { Copy, Check, X, Share2, Award } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md surface-elevated rounded-3xl p-6 sm:p-7 border border-white/10 shadow-2xl relative space-y-4">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close share modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-xs">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-display font-bold text-white">Share Your MIL Result</h3>
            <p className="text-xs text-slate-400 font-mono">Anonymous educational summary card</p>
          </div>
        </div>

        {/* Card Summary Snippet */}
        <div className="p-5 rounded-2xl surface-card border border-white/[0.08] text-xs font-mono text-slate-200 space-y-2.5">
          <div className="flex items-center space-x-1.5 text-cyan-400 font-bold">
            <Award className="w-4 h-4" />
            <span className="text-sm font-display">{profile.archetypeTitle}</span>
          </div>
          <p className="text-slate-400 font-sans italic text-xs leading-relaxed">
            &ldquo;{profile.archetypeSubtitle}&rdquo;
          </p>
          <div className="pt-2.5 border-t border-white/[0.06] flex justify-between text-xs font-bold font-mono">
            <span>Verify Habit: <strong className="text-emerald-400">{profile.metrics.verificationHabit}%</strong></span>
            <span>Accuracy: <strong className="text-cyan-400">{profile.metrics.accuracyScore}%</strong></span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-display font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/20 flex items-center justify-center space-x-2 transition-all hover:scale-105 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-slate-950" />
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
