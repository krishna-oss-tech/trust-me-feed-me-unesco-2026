import React, { useEffect } from 'react';
import { ActionType } from '../types';
import { CheckCircle2, Search, XCircle } from 'lucide-react';

interface ActionButtonsProps {
  onSelect: (action: ActionType) => void;
  disabled?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onSelect, disabled = false }) => {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      if (e.key === '1' || e.key.toLowerCase() === 't') onSelect('TRUST');
      else if (e.key === '2' || e.key.toLowerCase() === 'v') onSelect('VERIFY');
      else if (e.key === '3' || e.key.toLowerCase() === 'r') onSelect('REJECT');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelect, disabled]);

  return (
    <div className="w-full max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
      
      {/* TRUST — Pill shape */}
      <button
        onClick={() => onSelect('TRUST')}
        disabled={disabled}
        className="btn-action-trust py-4 px-5 flex flex-col items-center justify-center space-y-1.5 font-display font-bold focus-visible:ring-2 focus-visible:ring-emerald-500/50 group relative overflow-hidden cursor-pointer"
        aria-label="Trust this information (Keyboard shortcut: 1)"
      >
        <div className="flex items-center space-x-2 text-base sm:text-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>TRUST</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-300/70 flex items-center space-x-1.5">
          <span>Accept as Reliable</span>
          <kbd className="bg-emerald-950/60 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30 text-[9px]">1</kbd>
        </span>
      </button>

      {/* VERIFY — Dashed border, investigation feel */}
      <button
        onClick={() => onSelect('VERIFY')}
        disabled={disabled}
        className="btn-action-verify py-4 px-5 flex flex-col items-center justify-center space-y-1.5 font-display font-bold focus-visible:ring-2 focus-visible:ring-amber-500/50 group relative overflow-hidden cursor-pointer"
        aria-label="Verify this information (Keyboard shortcut: 2)"
      >
        <div className="flex items-center space-x-2 text-base sm:text-lg">
          <Search className="w-5 h-5 text-amber-400 group-hover:animate-pulse" />
          <span>VERIFY</span>
        </div>
        <span className="text-[10px] font-mono text-amber-300/70 flex items-center space-x-1.5">
          <span>6-Point Audit</span>
          <kbd className="bg-amber-950/60 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30 text-[9px]">2</kbd>
        </span>
      </button>

      {/* REJECT — Sharp corners, stamp */}
      <button
        onClick={() => onSelect('REJECT')}
        disabled={disabled}
        className="btn-action-reject py-4 px-5 flex flex-col items-center justify-center space-y-1.5 font-display font-bold focus-visible:ring-2 focus-visible:ring-rose-500/50 group relative overflow-hidden cursor-pointer"
        aria-label="Reject this information (Keyboard shortcut: 3)"
      >
        <div className="flex items-center space-x-2 text-base sm:text-lg">
          <XCircle className="w-5 h-5 text-rose-400" />
          <span>REJECT</span>
        </div>
        <span className="text-[10px] font-mono text-rose-300/70 flex items-center space-x-1.5">
          <span>Flag Misleading</span>
          <kbd className="bg-rose-950/60 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/30 text-[9px]">3</kbd>
        </span>
      </button>

    </div>
  );
};
