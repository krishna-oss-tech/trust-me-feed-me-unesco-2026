import React from 'react';

const CATEGORIES = [
  'AI SYNTHETIC RESPONSE',
  'SOURCE IMPERSONATION',
  'BREAKING NEWS HEADLINE',
  'ASTROTURFING & COMMENT BOTS',
  'DATA & GRAPH VISUALIZATION',
  'SYNTHETIC MEDIA & VIRAL CLONE',
  'PHOTO CONTEXT CHECK',
  'OUTRAGE CHAIN POST',
  'INFLUENCER SPONSORSHIP',
  'CHERRY-PICKED REPORTING',
];

export const CategoryMarquee: React.FC = () => {
  const loopItems = [...CATEGORIES, ...CATEGORIES];

  return (
    <div className="relative w-full overflow-hidden py-1">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#090D16] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#090D16] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee gap-3">
        {loopItems.map((cat, i) => (
          <span
            key={i}
            className="shrink-0 text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider text-slate-500 px-3.5 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.02]"
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
};
