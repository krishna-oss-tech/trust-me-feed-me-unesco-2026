import React from 'react';
import { Shield, Info } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200/90 bg-white py-8 px-4 sm:px-6 lg:px-8 mt-12 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Project Details */}
        <div className="flex items-center space-x-3 text-center md:text-left">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 text-[#5B8DEF]" />
          </div>
          <div>
            <p className="text-[#172033] font-bold">
              TRUST ME, FEED ME &mdash; UNESCO Youth Hackathon 2026
            </p>
            <p className="text-slate-500 text-[11px]">
              Media & Information Literacy (MIL) Interactive Behavioural Simulation
            </p>
          </div>
        </div>

        {/* Center: Educational Disclaimer */}
        <div className="flex items-center space-x-2.5 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200/80 text-center max-w-xl">
          <Info className="w-4 h-4 text-amber-500 shrink-0" />
          <p className="text-[11px] text-slate-600 leading-snug">
            <strong className="text-slate-800 font-semibold">Educational Simulation:</strong> This app teaches MIL critical evaluation habits. It does not reproduce or predict any real platform&apos;s recommendation algorithm.
          </p>
        </div>

        {/* Right: Keyboard Shortcuts Legend */}
        <div className="hidden lg:flex items-center space-x-2 text-[11px] text-slate-500 font-mono">
          <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded font-bold">1</span> Trust
          <span className="text-slate-300">|</span>
          <span className="bg-indigo-50 border border-indigo-200 text-indigo-800 px-1.5 py-0.5 rounded font-bold">2</span> Verify
          <span className="text-slate-300">|</span>
          <span className="bg-rose-50 border border-rose-200 text-rose-800 px-1.5 py-0.5 rounded font-bold">3</span> Reject
        </div>

      </div>
    </footer>
  );
};
