import React from 'react';
import { useGame } from '../context/GameContext';
import { CheckCircle2, Search, XCircle, AlertCircle, Play, ShieldAlert, Sparkles, HelpCircle, FileCheck, Layers } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { setStep } = useGame();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 py-8 px-4 animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#3B82F6] text-xs font-semibold">
          <HelpCircle className="w-4 h-4 text-[#5B8DEF]" />
          <span>GUIDE & METHODOLOGY</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#172033] tracking-tight">
          HOW IT WORKS
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          You will encounter AI answers, social posts, news headlines, influencer claims, and viral content across 15 interactive scenarios.
        </p>
      </div>

      {/* 3 Step Explanation (01 QUESTION, 02 VERIFY, 03 REFLECT) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div className="light-card p-6 rounded-2xl border border-slate-200 space-y-3 bg-white">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center font-mono font-black text-sm text-[#5B8DEF]">
            01
          </div>
          <h3 className="font-extrabold text-base text-[#172033]">QUESTION</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Don&apos;t automatically trust information. Ask why it sounds confident, who published it, and what emotional buttons it presses.
          </p>
        </div>

        <div className="light-card p-6 rounded-2xl border border-slate-200 space-y-3 bg-white">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center font-mono font-black text-sm text-[#8B7CF6]">
            02
          </div>
          <h3 className="font-extrabold text-base text-[#172033]">VERIFY</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Check the source, evidence, date, and context. Learn when to pause and inspect credentials or reverse-search media.
          </p>
        </div>

        <div className="light-card p-6 rounded-2xl border border-slate-200 space-y-3 bg-white">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center font-mono font-black text-sm text-[#63C7B2]">
            03
          </div>
          <h3 className="font-extrabold text-base text-[#172033]">REFLECT</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            See what your choices reveal about your information habits and experience how algorithms shape your feed.
          </p>
        </div>

      </div>

      {/* 3 Natural Decisions Overview */}
      <div className="light-panel p-6 sm:p-8 rounded-3xl border border-slate-200/90 space-y-6 bg-white">
        <div className="text-center space-y-1">
          <h3 className="text-base font-extrabold text-[#172033] uppercase tracking-wide">
            For each scenario, choose what you would naturally do:
          </h3>
          <p className="text-xs text-slate-500">
            Be honest &mdash; this is an educational tool for learning, not a graded exam.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-800 font-black text-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>TRUST</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Accept the content as reliable, factual, and backed by verifiable international datasets or institutions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2">
            <div className="flex items-center space-x-2 text-indigo-900 font-black text-lg">
              <Search className="w-5 h-5 text-indigo-600" />
              <span>VERIFY</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Pause to investigate timestamps, author credibility, missing context, or the 6-point MIL audit.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
            <div className="flex items-center space-x-2 text-rose-900 font-black text-lg">
              <XCircle className="w-5 h-5 text-rose-600" />
              <span>REJECT</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Flag as misleading, clickbait, AI hallucination, emotional outrage, or unverified commercial claim.
            </p>
          </div>

        </div>

        {/* Detailed User Journey Highlights */}
        <div className="pt-4 border-t border-slate-100 space-y-3 text-xs sm:text-sm text-slate-700">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-[#3B82F6] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              1
            </div>
            <span>
              <strong>Why did you choose this?</strong> On select scenarios, you&apos;ll be asked what influenced your choice (confidence, likes, fast reading, emotion).
            </span>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-indigo-100 text-[#8B7CF6] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              2
            </div>
            <span>
              <strong>Information Behaviour Profile:</strong> Receive an educational breakdown of Fast Trust, Verification Habits, Social Proof Sensitivity, and AI Openness.
            </span>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-teal-100 text-[#63C7B2] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              3
            </div>
            <span>
              <strong>Simulated Feed:</strong> Watch how your choices actively generate a personalized simulated feed tailored to your interaction pattern.
            </span>
          </div>
        </div>

      </div>

      {/* Mandatory UNESCO Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start space-x-3 text-xs text-amber-900">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Educational Simulation:</strong> This is an educational simulation developed for the UNESCO Youth Hackathon 2026. It does not reproduce or predict any real platform&apos;s recommendation algorithm.
        </p>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={() => setStep('challenge')}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#5B8DEF] to-[#8B7CF6] hover:from-[#4B7DE5] hover:to-[#7B6CE6] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-blue-500/20 flex items-center space-x-2 transition-all hover:scale-105"
        >
          <Play className="w-5 h-5 fill-white" />
          <span>START NOW</span>
        </button>
      </div>

    </div>
  );
};
