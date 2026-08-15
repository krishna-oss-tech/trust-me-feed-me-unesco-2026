import React from 'react';
import { useGame } from '../../context/GameContext';
import { generateSimulatedFeed } from '../../engine/feedSimulationEngine';
import { FeedCard } from './FeedCard';
import { Sparkles, AlertCircle, BarChart3, ArrowRight, ShieldCheck, Layers } from 'lucide-react';

export const SimulatedFeed: React.FC = () => {
  const { metrics, setStep } = useGame();
  const simulation = generateSimulatedFeed(metrics);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in py-4 relative z-10">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>SIGNATURE RECOMMENDATION SIMULATOR</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
          YOU BUILT YOUR<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
            INFORMATION ENVIRONMENT
          </span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          Here is how an algorithmic recommendation stream reconstructs itself around your accumulated behavioral choices.
        </p>
      </div>

      {/* Mandatory UNESCO Disclaimer Box */}
      <div className="p-4 sm:p-5 rounded-3xl surface-elevated border border-white/[0.08] flex items-start space-x-3.5 text-slate-300 text-xs sm:text-sm shadow-xl">
        <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-mono font-bold text-white block mb-0.5">EDUCATIONAL SIMULATION NOTICE</strong>
          This feed is an educational simulation demonstrating how interaction habits can fuel recommendation biases. It does not reproduce or predict any real platform&apos;s proprietary recommendation algorithm.
        </div>
      </div>

      {/* Preference Analysis Box */}
      <div className="p-6 sm:p-8 surface-elevated rounded-3xl border border-white/[0.08] space-y-5 shadow-xl">
        <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase">
          <BarChart3 className="w-4 h-4" />
          <span>YOUR BEHAVIOURAL TENDENCY SIGNAL</span>
        </div>

        <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-medium">
          Your interactions exhibited a dominant preference toward{' '}
          <strong className="text-cyan-300 font-display font-bold underline decoration-cyan-500/40 underline-offset-4">
            {simulation.primaryPreference}
          </strong>. Your feed has been populated with {simulation.summaryText}
        </p>

        {/* 4 Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {simulation.keyStats.map((stat, idx) => (
            <div key={idx} className="surface-card p-4 rounded-2xl border border-white/[0.06] text-center">
              <span className="text-[10px] text-slate-400 font-mono font-bold block">{stat.label}</span>
              <span className="text-2xl font-display font-bold text-cyan-400 my-1 block">{stat.value}</span>
              <span className="text-[11px] text-slate-400 block leading-tight">{stat.hint}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Simulated Feed Posts Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pl-1">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Simulated Information Stream ({simulation.feed.length} Items)</span>
          </h3>
          <span className="text-xs font-mono text-cyan-400/80">ALGORITHM SIMULATION ACTIVE</span>
        </div>

        {simulation.feed.map((item) => (
          <FeedCard key={item.id} item={item} />
        ))}
      </div>

      {/* Final Step Action Button */}
      <div className="pt-6 flex justify-center">
        <button
          onClick={() => setStep('final')}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-display font-bold text-sm sm:text-base shadow-xl shadow-cyan-500/25 flex items-center space-x-2 transition-all hover:scale-105 cursor-pointer"
        >
          <span>PROCEED TO FINAL REFLECTION</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
