import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { useGame } from '../../context/GameContext';
import { ShareModal } from './ShareModal';
import { RotateCcw, Share2, BookOpen, ShieldCheck, Globe, Sparkles, ArrowRight, Heart } from 'lucide-react';

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
        colors: ['#5B8DEF', '#8B7CF6', '#63C7B2', '#FFB4A2'],
      });
    } catch (e) {
      console.warn('Confetti effect unavailable', e);
    }
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-10 animate-fade-in text-center py-8 px-4">
      
      {/* High-Impact Emotional Reveal Text */}
      <div className="space-y-6">
        
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#3B82F6] text-xs font-semibold shadow-2xs">
          <Globe className="w-4 h-4 text-[#5B8DEF]" />
          <span>UNESCO MIL 2026 REFLECTION</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black text-[#172033] leading-tight tracking-tight">
            YOU JUST BUILT<br />
            YOUR OWN<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B8DEF] via-[#8B7CF6] to-[#63C7B2]">
              INFORMATION WORLD.
            </span>
          </h1>

          <p className="text-lg sm:text-2xl font-bold text-slate-700">
            With the choices you made in the last two minutes.
          </p>

          <div className="py-6 my-4 border-y border-slate-200">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1D4ED8]">
              &ldquo;What you trust shapes what you see.&rdquo;
            </h2>
          </div>
        </div>

      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
        
        {/* TRY AGAIN */}
        <button
          onClick={restartFromBeginning}
          className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center space-x-2 transition-all hover:scale-105 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-[#5B8DEF]" />
          <span>TRY AGAIN</span>
        </button>

        {/* SHARE RESULT */}
        <button
          onClick={() => setShowShareModal(true)}
          className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-[#5B8DEF] to-[#8B7CF6] hover:from-[#4B7DE5] hover:to-[#7B6CE6] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all hover:scale-105 cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>SHARE MY RESULT</span>
        </button>

        {/* LEARN MORE */}
        <button
          onClick={() => setShowLearnMore(!showLearnMore)}
          className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center space-x-2 transition-all hover:scale-105 cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-[#8B7CF6]" />
          <span>{showLearnMore ? 'HIDE MIL GUIDE' : 'LEARN MORE'}</span>
        </button>

      </div>

      {/* Accordion UNESCO MIL Core Framework Guide */}
      {showLearnMore && (
        <div className="light-card rounded-3xl p-6 sm:p-8 border border-slate-200 text-left space-y-5 animate-fade-in bg-white shadow-md">
          <div className="flex items-center space-x-2 text-[#3B82F6] font-mono text-xs font-bold uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>UNESCO Media & Information Literacy (MIL) Core Framework</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            Media & Information Literacy is not about rejecting everything or living in constant suspicion. It is about developing conscious critical thinking habits to evaluate sources, spot AI hallucinations, resist algorithmic manipulation, and participate thoughtfully in digital communities.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="font-extrabold text-[#172033] text-xs mb-1">01 QUESTION</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Why was this content created? Does it rely on slick presentation, emotional outrage, or synthetic confidence?
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="font-extrabold text-[#172033] text-xs mb-1">02 VERIFY</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Apply the 6 MIL checks: Source, Date, Evidence, Context, Media authenticity, and independent Consensus.
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="font-extrabold text-[#172033] text-xs mb-1">03 REFLECT</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
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
