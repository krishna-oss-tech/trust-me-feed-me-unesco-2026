import React from 'react';
import { useGame } from '../../context/GameContext';
import { generateSimulatedFeed } from '../../engine/feedSimulationEngine';
import { FeedCard } from './FeedCard';
import { Sparkles, AlertCircle, BarChart3, ArrowRight, ShieldCheck, Compass } from 'lucide-react';

export const SimulatedFeed: React.FC = () => {
  const { metrics, setStep } = useGame();
  const simulation = generateSimulatedFeed(metrics);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in py-4">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#0D9488] text-xs font-semibold shadow-2xs">
          <Sparkles className="w-4 h-4 text-[#63C7B2]" />
          <span>SIGNATURE SIMULATION ENGINE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#172033] tracking-tight">
          YOUR SIMULATED<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B8DEF] via-[#8B7CF6] to-[#63C7B2]">
            INFORMATION FEED
          </span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          Here is how an information environment shapes itself around your accumulated choices.
        </p>
      </div>

      {/* Mandatory UNESCO Disclaimer Box */}
      <div className="p-4 sm:p-5 rounded-3xl bg-amber-50 border border-amber-200/90 flex items-start space-x-3.5 text-amber-950 text-xs sm:text-sm shadow-xs">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-extrabold text-amber-900 block mb-0.5">SIMULATION DISCLAIMER</strong>
          This feed is an educational simulation based on your choices in this experience. It does not reproduce or predict any real platform&apos;s recommendation algorithm.
        </div>
      </div>

      {/* Preference Analysis Box */}
      <div className="p-6 sm:p-8 light-card rounded-3xl border border-slate-200/90 space-y-5 bg-white shadow-md">
        <div className="flex items-center space-x-2 text-[#3B82F6] font-mono text-xs font-bold uppercase">
          <BarChart3 className="w-4 h-4" />
          <span>YOUR PATTERN & BEHAVIOURAL TENDENCY</span>
        </div>

        <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-medium">
          Your choices showed a stronger preference toward{' '}
          <strong className="text-[#1D4ED8] font-black underline decoration-[#5B8DEF]/40 underline-offset-4">
            {simulation.primaryPreference}
          </strong>. Your feed has been populated with {simulation.summaryText}
        </p>

        {/* 4 Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {simulation.keyStats.map((stat, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-center">
              <span className="text-[11px] text-slate-500 font-mono font-bold block">{stat.label}</span>
              <span className="text-2xl font-black text-[#5B8DEF] my-1 block">{stat.value}</span>
              <span className="text-[11px] text-slate-600 block leading-tight">{stat.hint}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Simulated Feed Posts Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pl-1">
          <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            Synthesized Educational Feed ({simulation.feed.length} Items)
          </h3>
          <span className="text-xs font-mono text-slate-400">SIMULATION ENGINE ACTIVE</span>
        </div>

        {simulation.feed.map((item) => (
          <FeedCard key={item.id} item={item} />
        ))}
      </div>

      {/* Final Step Action Button */}
      <div className="pt-6 flex justify-center">
        <button
          onClick={() => setStep('final')}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#5B8DEF] to-[#8B7CF6] hover:from-[#4B7DE5] hover:to-[#7B6CE6] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-blue-500/25 flex items-center space-x-2 transition-all hover:scale-105 cursor-pointer"
        >
          <span>PROCEED TO FINAL REFLECTION</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
