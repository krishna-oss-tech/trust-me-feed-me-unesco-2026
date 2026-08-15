import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { ShieldCheck, ArrowRight, Zap, Play, Bot, Search, Sparkles } from 'lucide-react';
import { ScrambleText } from '../components/ScrambleText';
import { HeroLiveDemo } from '../components/HeroLiveDemo';
import { CategoryMarquee } from '../components/CategoryMarquee';

const FLOW_STEPS = [
  {
    tag: '01 · ENCOUNTER',
    color: '#38BDF8',
    accentBg: 'rgba(56,189,248,0.08)',
    accentBorder: 'rgba(56,189,248,0.25)',
    icon: Bot,
    title: 'Live information streams',
    body: 'Evaluate synthetic AI answers, viral claims, misleading charts, and recycled news the way you actually encounter them.',
  },
  {
    tag: '02 · EVALUATE',
    color: '#3B82F6',
    accentBg: 'rgba(59,130,246,0.08)',
    accentBorder: 'rgba(59,130,246,0.25)',
    icon: Search,
    title: 'The 6-point MIL audit',
    body: 'Source, date, evidence, context, media authenticity, consensus. Confidence is not evidence.',
  },
  {
    tag: '03 · SIMULATE',
    color: '#10B981',
    accentBg: 'rgba(16,185,129,0.08)',
    accentBorder: 'rgba(16,185,129,0.25)',
    icon: Sparkles,
    title: 'Your feed, built by you',
    body: 'Watch your choices compound into an algorithmic tendency profile and a simulated feed of your own making.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export const LandingPage: React.FC = () => {
  const { setStep, isDemoMode, setIsDemoMode } = useGame();

  return (
    <div className="w-full space-y-20 sm:space-y-28 pt-8 sm:pt-16 pb-20 px-4 sm:px-6 animate-fade-in relative z-10">

      {/* ============ HERO — asymmetric, two columns ============ */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-8 items-center">

        <div className="text-center lg:text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-950/40 border border-sky-500/25 text-sky-300 text-xs font-mono font-semibold"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>UNESCO YOUTH HACKATHON 2026 &bull; AI &amp; MIL</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white leading-[0.95]">
            TRUST ME,
            <br />
            <ScrambleText
              as="span"
              text="FEED ME"
              className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-500"
            />
          </h1>

          <p className="text-lg sm:text-xl font-display font-bold text-slate-200 tracking-tight">
            &ldquo;What you trust shapes what you see.&rdquo;
          </p>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
            An interactive Media and Information Literacy laboratory. Question synthetic AI
            answers, evaluate viral claims, and discover how your choices construct your own
            information environment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
            <button
              onClick={() => setStep('challenge')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 hover:brightness-110 active:scale-[0.97] text-slate-950 font-display font-bold text-sm sm:text-base shadow-xl shadow-sky-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>START THE EXPERIENCE</span>
            </button>

            <button
              onClick={() => setStep('how_it_works')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 active:scale-[0.97] border border-white/10 text-slate-200 font-display font-semibold text-sm sm:text-base flex items-center justify-center space-x-2 transition-all cursor-pointer group"
            >
              <span>HOW IT WORKS</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="pt-1 flex justify-center lg:justify-start">
            <button
              onClick={() => setIsDemoMode(!isDemoMode)}
              className={`inline-flex items-center space-x-2 text-xs font-mono px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                isDemoMode
                  ? 'bg-amber-950/50 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900/60 text-slate-400 border-white/[0.08] hover:border-white/20 hover:text-slate-300'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${isDemoMode ? 'text-amber-400 fill-amber-400' : 'text-slate-500'}`} />
              <span>
                {isDemoMode
                  ? 'Demo Mode Active: 5 Curated Scenarios (~2 mins)'
                  : 'Judges Shortcut: Enable 5-Scenario Fast Demo'}
              </span>
            </button>
          </div>
        </div>

        {/* Live product demo instead of a static illustration */}
        <HeroLiveDemo />
      </div>

      {/* ============ CATEGORY MARQUEE ============ */}
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-[11px] font-mono uppercase tracking-[0.2em] text-slate-600 mb-4">
          15 scenarios across the information ecosystem
        </p>
        <CategoryMarquee />
      </div>

      {/* ============ UNIFIED FLOW ============ */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        className="max-w-6xl mx-auto"
      >
        <motion.div variants={fadeUp} className="text-center space-y-2 mb-10">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            How your decisions shape algorithmic reality
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">
            Three connected stages. Each choice you make feeds directly into the next.
          </p>
        </motion.div>

        <div className="relative">
          {/* connecting line (desktop only) */}
          <div className="hidden md:block absolute top-[38px] left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-sky-500/40 via-blue-500/40 to-emerald-500/40" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {FLOW_STEPS.map((step) => (
              <motion.div key={step.tag} variants={fadeUp} className="relative">
                <div
                  className="w-[76px] h-[76px] rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-5 relative z-10 border"
                  style={{ backgroundColor: step.accentBg, borderColor: step.accentBorder }}
                >
                  <step.icon className="w-7 h-7" style={{ color: step.color }} />
                </div>
                <div
                  className="text-[10px] font-mono font-bold tracking-wider mb-2 text-center md:text-left"
                  style={{ color: step.color }}
                >
                  {step.tag}
                </div>
                <h3 className="font-display font-bold text-white text-base sm:text-lg mb-1.5 text-center md:text-left">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed text-center md:text-left">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ============ CLOSING LINE ============ */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center border-t border-white/[0.06] pt-10"
      >
        <p className="text-slate-500 text-sm">
          No mandatory login. No real data harvesting. Just a mirror held up to your own
          information habits &mdash; and a chance to change them before the algorithm decides for you.
        </p>
      </motion.div>

    </div>
  );
};