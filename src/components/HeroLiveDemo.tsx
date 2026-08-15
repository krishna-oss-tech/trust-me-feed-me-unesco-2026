import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Newspaper, Radio, Check, X, Search } from 'lucide-react';

type Verdict = 'trust' | 'verify' | 'reject';

interface DemoItem {
  platform: string;
  icon: React.ReactNode;
  claim: string;
  verdict: Verdict;
  reason: string;
}

const ITEMS: DemoItem[] = [
  {
    platform: 'AI Assistant',
    icon: <Bot className="w-3.5 h-3.5" />,
    claim: '"Peer-reviewed 2024 study confirms blue light exposure regenerates retinal cells."',
    verdict: 'verify',
    reason: 'Confident tone. The cited journal does not exist.',
  },
  {
    platform: 'Viral Post · 48K shares',
    icon: <Radio className="w-3.5 h-3.5" />,
    claim: '"BREAKING: National power grid has collapsed. Total blackout."',
    verdict: 'reject',
    reason: "Headline contradicts the article's own data.",
  },
  {
    platform: 'News Outlet',
    icon: <Newspaper className="w-3.5 h-3.5" />,
    claim: '"IRENA 2024: global solar capacity has crossed 2,000 GW."',
    verdict: 'trust',
    reason: 'Named institutional source, verifiable dataset.',
  },
];

const VERDICT_STYLE: Record<Verdict, { label: string; color: string; bg: string; border: string; Icon: React.FC<any> }> = {
  trust: { label: 'TRUST', color: '#34D399', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.4)', Icon: Check },
  verify: { label: 'VERIFY', color: '#FBBF24', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.4)', Icon: Search },
  reject: { label: 'REJECT', color: '#F87171', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.4)', Icon: X },
};

const CYCLE_MS = 4200;
const RESOLVE_MS = 1500;

export const HeroLiveDemo: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    setResolved(false);
    const resolveTimer = setTimeout(() => setResolved(true), RESOLVE_MS);
    const nextTimer = setTimeout(() => setIndex((i) => (i + 1) % ITEMS.length), CYCLE_MS);
    return () => {
      clearTimeout(resolveTimer);
      clearTimeout(nextTimer);
    };
  }, [index]);

  const item = ITEMS[index];
  const style = VERDICT_STYLE[item.verdict];

  return (
    <div className="w-full max-w-sm mx-auto lg:mx-0">
      <div className="flex items-center gap-2 mb-3 text-[10px] font-mono uppercase tracking-wider text-slate-500">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
        <span>Live simulation preview</span>
      </div>

      <div className="surface-elevated rounded-2xl border border-white/[0.08] p-5 min-h-[210px] relative overflow-hidden shadow-2xl shadow-black/40">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mb-3">
              {item.icon}
              <span>{item.platform}</span>
            </div>

            <p className="text-sm sm:text-[15px] text-slate-200 leading-relaxed font-medium mb-4 min-h-[3.5em]">
              {item.claim}
            </p>

            <div className="flex items-center justify-between">
              <AnimatePresence mode="wait">
                {!resolved ? (
                  <motion.div
                    key="pending"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-1.5"
                  >
                    {(['trust', 'verify', 'reject'] as Verdict[]).map((v) => (
                      <span
                        key={v}
                        className="text-[10px] font-mono font-semibold px-2 py-1 rounded-md border border-white/10 text-slate-500"
                      >
                        {VERDICT_STYLE[v].label}
                      </span>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="resolved"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="flex items-center gap-1.5 text-[11px] font-mono font-bold px-2.5 py-1.5 rounded-lg border"
                    style={{ color: style.color, backgroundColor: style.bg, borderColor: style.border }}
                  >
                    <style.Icon className="w-3.5 h-3.5" />
                    <span>{style.label}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {resolved && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[11px] text-slate-500 mt-3 pt-3 border-t border-white/[0.06] leading-relaxed"
                >
                  {item.reason}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Progress dashes */}
        <div className="absolute top-4 right-5 flex gap-1">
          {ITEMS.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index ? 'w-4 bg-sky-400' : 'w-1.5 bg-white/15'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
