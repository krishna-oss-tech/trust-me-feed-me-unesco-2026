import React, { useEffect } from 'react';
import { ActionType } from '../types';
import { CheckCircle2, Search, XCircle } from 'lucide-react';

interface ActionButtonsProps {
  onSelect: (action: ActionType) => void;
  disabled?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onSelect, disabled = false }) => {

  // Keyboard shortcut listener (1, 2, 3 or T, V, R)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      if (e.key === '1' || e.key.toLowerCase() === 't') {
        onSelect('TRUST');
      } else if (e.key === '2' || e.key.toLowerCase() === 'v') {
        onSelect('VERIFY');
      } else if (e.key === '3' || e.key.toLowerCase() === 'r') {
        onSelect('REJECT');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelect, disabled]);

  return (
    <div className="w-full max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-6">
      
      {/* TRUST BUTTON */}
      <button
        onClick={() => onSelect('TRUST')}
        disabled={disabled}
        className="btn-trust py-4 px-5 rounded-2xl flex flex-col items-center justify-center space-y-1.5 font-extrabold shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50 group relative overflow-hidden cursor-pointer"
        aria-label="Trust this information (Keyboard shortcut: 1)"
      >
        <div className="flex items-center space-x-2 text-base sm:text-lg">
          <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform text-emerald-600" />
          <span>TRUST</span>
        </div>
        <span className="text-[11px] font-medium opacity-85 font-mono text-emerald-800">
          Accept as Reliable &bull; <kbd className="bg-emerald-100/90 text-emerald-900 px-1.5 py-0.5 rounded border border-emerald-300">1</kbd>
        </span>
      </button>

      {/* VERIFY BUTTON */}
      <button
        onClick={() => onSelect('VERIFY')}
        disabled={disabled}
        className="btn-verify py-4 px-5 rounded-2xl flex flex-col items-center justify-center space-y-1.5 font-extrabold shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/50 group relative overflow-hidden cursor-pointer"
        aria-label="Verify this information (Keyboard shortcut: 2)"
      >
        <div className="flex items-center space-x-2 text-base sm:text-lg">
          <Search className="w-5 h-5 group-hover:scale-110 transition-transform text-indigo-600" />
          <span>VERIFY</span>
        </div>
        <span className="text-[11px] font-medium opacity-85 font-mono text-indigo-800">
          Check 6 MIL Checks &bull; <kbd className="bg-indigo-100/90 text-indigo-900 px-1.5 py-0.5 rounded border border-indigo-300">2</kbd>
        </span>
      </button>

      {/* REJECT BUTTON */}
      <button
        onClick={() => onSelect('REJECT')}
        disabled={disabled}
        className="btn-reject py-4 px-5 rounded-2xl flex flex-col items-center justify-center space-y-1.5 font-extrabold shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-400/50 group relative overflow-hidden cursor-pointer"
        aria-label="Reject this information (Keyboard shortcut: 3)"
      >
        <div className="flex items-center space-x-2 text-base sm:text-lg">
          <XCircle className="w-5 h-5 group-hover:scale-110 transition-transform text-rose-600" />
          <span>REJECT</span>
        </div>
        <span className="text-[11px] font-medium opacity-85 font-mono text-rose-800">
          Flag Misinformation &bull; <kbd className="bg-rose-100/90 text-rose-900 px-1.5 py-0.5 rounded border border-rose-300">3</kbd>
        </span>
      </button>

    </div>
  );
};
