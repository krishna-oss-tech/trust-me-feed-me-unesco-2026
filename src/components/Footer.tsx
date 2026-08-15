import React from 'react';
import { Shield, Info } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/[0.07] bg-[#090D16]/95 py-6 px-4 sm:px-6 lg:px-8 mt-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Project Details */}
        <div className="flex items-center space-x-3 text-center md:text-left">
          <div className="w-7 h-7 rounded-lg bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center shrink-0">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div>
            <p className="text-slate-200 font-display font-bold tracking-tight text-xs sm:text-sm">
              TRUST ME, FEED ME &bull; UNESCO MIL 2026
            </p>
            <p className="text-slate-500 text-[10px] font-mono">
              AI & Media Literacy Interactive Behavioral Simulation
            </p>
          </div>
        </div>

        {/* Center: Educational Disclaimer */}
        <div className="flex items-center space-x-2.5 bg-slate-900/60 px-3.5 py-2 rounded-xl border border-white/[0.06] text-center max-w-xl">
          <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <p className="text-[11px] text-slate-400 leading-snug">
            <strong className="text-slate-200 font-semibold">Educational Simulation:</strong> Explores MIL critical evaluation habits. Does not reproduce proprietary platform algorithms.
          </p>
        </div>

        {/* Right: Keyboard Shortcuts Legend */}
        <div className="hidden lg:flex items-center space-x-2 text-[11px] text-slate-400 font-mono">
          <span className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 px-1.5 py-0.5 rounded font-bold">1</span> Trust
          <span className="text-slate-700">&bull;</span>
          <span className="bg-amber-950/60 border border-amber-500/40 text-amber-400 px-1.5 py-0.5 rounded font-bold">2</span> Verify
          <span className="text-slate-700">&bull;</span>
          <span className="bg-rose-950/60 border border-rose-500/40 text-rose-400 px-1.5 py-0.5 rounded font-bold">3</span> Reject
        </div>

      </div>
    </footer>
  );
};
