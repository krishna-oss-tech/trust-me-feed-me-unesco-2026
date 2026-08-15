import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { useGame } from '../../context/GameContext';
import { ShareModal } from './ShareModal';
import { RotateCcw, Share2, BookOpen, ShieldCheck, Globe, ArrowRight } from 'lucide-react';

export const FinalReveal: React.FC = () => {
  const { restartFromBeginning, profile, setStep } = useGame();
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showLearnMore, setShowLearnMore] = useState<boolean>(false);

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#00F0FF', '#3B82F6', '#10B981', '#F59E0B'],
      });
    } catch (e) {
      console.warn('Confetti effect unavailable', e);
    }
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-10 animate-fade-in text-center py-8 px-4 relative z-10">
      
      {/* High-Impact Emotional Reveal Text */}
      <div className="space-y-6">
        
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold shadow-xs">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span>UNESCO MIL 2026 REFLECTION</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-display font-black text-white leading-tight tracking-tight">
            YOU JUST BUILT<br />
            YOUR OWN<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
              INFORMATION WORLD.
            </span>
          </h1>

          <p className="text-lg sm:text-2xl font-display font-bold text-slate-300">
            With the choices you made in the last two minutes.
          </p>

          <div className="py-6 my-4 border-y border-white/[0.08]">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-cyan-300">
              &ldquo;What you trust shapes what you see.&rdquo;
            </h2>
          </div>
        </div>

      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-lg mx-auto">
        
        {/* TRY AGAIN */}
        <button
          onClick={restartFromBeginning}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl surface-elevated hover:bg-slate-800 border border-white/10 text-slate-200 font-display font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center space-x-2 transition-all hover:scale-105 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-cyan-400" />
          <span>TRY AGAIN</span>
        </button>

        {/* SHARE RESULT */}
        <button
          onClick={() => setShowShareModal(true)}
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-display font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2 transition-all hover:scale-105 cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>SHARE MY RESULT</span>
        </button>

        {/* LEARN MORE */}
        <button
          onClick={() => setShowLearnMore(!showLearnMore)}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl surface-elevated hover:bg-slate-800 border border-white/10 text-slate-300 font-display font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center space-x-2 transition-all hover:scale-105 cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-purple-400" />
          <span>{showLearnMore ? 'HIDE MIL GUIDE' : 'LEARN MORE'}</span>
        </button>

      </div>

      {/* Accordion UNESCO MIL Core Framework Guide */}
      {showLearnMore && (
        <div className="surface-elevated rounded-3xl p-6 sm:p-8 border border-white/[0.08] text-left space-y-5 animate-fade-in shadow-xl">
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>UNESCO Media & Information Literacy (MIL) Core Framework</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Media & Information Literacy is not about rejecting everything or living in constant suspicion. It is about developing conscious critical thinking habits to evaluate sources, spot AI hallucinations, resist algorithmic manipulation, and participate thoughtfully in digital communities.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="surface-card p-4 rounded-2xl border border-white/[0.06]">
              <h4 className="font-display font-bold text-white text-xs mb-1">01 QUESTION</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Why was this content created? Does it rely on slick presentation, emotional outrage, or synthetic confidence?
              </p>
            </div>
            <div className="surface-card p-4 rounded-2xl border border-white/[0.06]">
              <h4 className="font-display font-bold text-white text-xs mb-1">02 VERIFY</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Apply the 6 MIL checks: Source, Date, Evidence, Context, Media authenticity, and independent Consensus.
              </p>
            </div>
            <div className="surface-card p-4 rounded-2xl border border-white/[0.06]">
              <h4 className="font-display font-bold text-white text-xs mb-1">03 REFLECT</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Remember that every like, share, and trust signal trains recommendation models to shape your future feeds.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        profile={profile}
      />

    </div>
  );
};
