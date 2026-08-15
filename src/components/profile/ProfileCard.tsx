import React, { useEffect } from 'react';
import { InformationProfile } from '../../types';
import { ProfileRadarChart } from './RadarChart';
import { Award, CheckCircle, Lightbulb, Compass, ArrowRight, ShieldCheck, Info, Sparkles, AlertCircle } from 'lucide-react';
import { saveAnonymousSessionToSupabase } from '../../services/supabase';
import { useGame } from '../../context/GameContext';

interface ProfileCardProps {
  profile: InformationProfile;
  onNext: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onNext }) => {
  const { isDemoMode, userChoices } = useGame();
  const { metrics, archetypeTitle, archetypeSubtitle, description, strengths, growthAreas, recommendations } = profile;

  // Sync anonymous session to Supabase when profile is viewed
  useEffect(() => {
    saveAnonymousSessionToSupabase({
      sessionId: `anon_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      isDemoMode,
      metrics,
      choices: userChoices,
      completedAt: new Date().toISOString(),
    });
  }, [isDemoMode, metrics, userChoices]);

  const getInfluenceLabel = (val: number) => {
    if (val >= 60) return { text: 'HIGH', color: 'text-rose-300 bg-rose-950/60 border-rose-500/40' };
    if (val >= 35) return { text: 'MEDIUM', color: 'text-amber-300 bg-amber-950/60 border-amber-500/40' };
    return { text: 'LOW', color: 'text-emerald-300 bg-emerald-950/60 border-emerald-500/40' };
  };

  const metricBars = [
    { label: 'FAST TRUST', value: metrics.fastTrust, color: 'from-cyan-500 to-blue-500' },
    { label: 'VERIFICATION HABIT', value: metrics.verificationHabit, color: 'from-emerald-500 to-teal-400' },
    { label: 'EMOTION INFLUENCE', value: metrics.emotionInfluence, color: 'from-rose-500 to-amber-400' },
    { label: 'SOCIAL PROOF INFLUENCE', value: metrics.socialProofInfluence, color: 'from-amber-500 to-yellow-400' },
    { label: 'AI TRUST', value: metrics.aiTrust, color: 'from-purple-500 to-indigo-400' },
    { label: 'SOURCE CHECKING', value: metrics.sourceChecking, color: 'from-blue-500 to-cyan-400' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in py-4 relative z-10">
      
      {/* Profile Header Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold shadow-xs">
          <Award className="w-3.5 h-3.5 text-cyan-400" />
          <span>UNESCO MIL BEHAVIOURAL REPORT</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
          YOUR INFORMATION<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
            BEHAVIOUR PROFILE
          </span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          These indicators reflect your interactive choices during this educational simulation, not a clinical psychological evaluation.
        </p>
      </div>

      {/* Main Archetype Card & Radar Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Archetype Details */}
        <div className="lg:col-span-7 surface-elevated rounded-3xl p-6 sm:p-8 border border-white/[0.08] space-y-6 shadow-xl">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold uppercase mb-1">
              <Compass className="w-4 h-4" />
              <span>BEHAVIOURAL ARCHETYPE</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-white">{archetypeTitle}</h2>
            <p className="text-cyan-300 text-xs sm:text-sm font-semibold mt-1">{archetypeSubtitle}</p>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed border-t border-b border-white/[0.06] py-4">
            {description}
          </p>

          {/* Key Strengths */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              YOUR STRENGTH
            </h4>
            <ul className="space-y-2">
              {strengths.map((str, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Growth Area / Blind Spot */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              YOUR BLIND SPOT
            </h4>
            <ul className="space-y-2">
              {growthAreas.map((g, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-amber-200 bg-amber-950/30 p-3 rounded-xl border border-amber-500/30">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Radar Chart & Accuracy */}
        <div className="lg:col-span-5 surface-elevated rounded-3xl p-6 border border-white/[0.08] flex flex-col justify-between shadow-xl">
          <div>
            <h3 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider text-center">
              Behavioural Metric Radar
            </h3>
            <ProfileRadarChart metrics={metrics} />
          </div>
          
          <div className="surface-card p-4 rounded-2xl border border-white/[0.08] text-center mt-2">
            <span className="text-xs text-slate-400 block font-mono font-bold">MIL Decision Accuracy Rate</span>
            <span className="text-3xl font-display font-black text-cyan-300">{metrics.accuracyScore}%</span>
          </div>
        </div>

      </div>

      {/* 4 Summary Highlight Indicator Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="surface-card p-4 rounded-2xl border border-white/[0.08] text-center">
          <span className="text-[10px] font-mono font-bold text-slate-400 block">FAST TRUST</span>
          <span className="text-2xl font-display font-bold text-cyan-400 block my-1">{metrics.fastTrust}%</span>
          <span className="text-[10px] text-slate-500 font-mono">Decision speed</span>
        </div>

        <div className="surface-card p-4 rounded-2xl border border-white/[0.08] text-center">
          <span className="text-[10px] font-mono font-bold text-slate-400 block">VERIFY HABIT</span>
          <span className="text-2xl font-display font-bold text-emerald-400 block my-1">{metrics.verificationHabit}%</span>
          <span className="text-[10px] text-slate-500 font-mono">Source audit rate</span>
        </div>

        <div className="surface-card p-4 rounded-2xl border border-white/[0.08] text-center">
          <span className="text-[10px] font-mono font-bold text-slate-400 block">EMOTION INFLUENCE</span>
          <span className={`inline-block text-xs font-mono font-bold px-2.5 py-1 rounded-lg border mt-2 ${getInfluenceLabel(metrics.emotionInfluence).color}`}>
            {getInfluenceLabel(metrics.emotionInfluence).text} ({metrics.emotionInfluence}%)
          </span>
        </div>

        <div className="surface-card p-4 rounded-2xl border border-white/[0.08] text-center">
          <span className="text-[10px] font-mono font-bold text-slate-400 block">AI TRUST</span>
          <span className={`inline-block text-xs font-mono font-bold px-2.5 py-1 rounded-lg border mt-2 ${getInfluenceLabel(metrics.aiTrust).color}`}>
            {getInfluenceLabel(metrics.aiTrust).text} ({metrics.aiTrust}%)
          </span>
        </div>

      </div>

      {/* Detailed Metric Breakdown Progress Bars */}
      <div className="surface-elevated rounded-3xl p-6 sm:p-8 border border-white/[0.08]">
        <h3 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider mb-6">
          Detailed Metric Breakdown
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {metricBars.map((bar, idx) => (
            <div key={idx} className="space-y-2 surface-card p-4 rounded-2xl border border-white/[0.06]">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300 font-mono text-[11px]">{bar.label}</span>
                <span className="font-mono text-cyan-400">{bar.value}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-white/10">
                <div
                  className={`h-full bg-gradient-to-r ${bar.color} transition-all duration-500 rounded-full`}
                  style={{ width: `${bar.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* YOUR NEXT MIL SKILL Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-purple-950/30 border border-cyan-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-start space-x-4">
          <div className="w-11 h-11 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-cyan-300 uppercase mb-0.5">
              <span>ONE HABIT TO BUILD</span>
            </div>
            <h4 className="text-base sm:text-lg font-display font-bold text-white">
              &ldquo;{recommendations[0]}&rdquo;
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Practice this verification routine whenever encountering sensational claims online.
            </p>
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-display font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2 transition-all hover:scale-105 shrink-0 cursor-pointer"
        >
          <span>VIEW YOUR SIMULATED FEED</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Non-Diagnostic Disclaimer Note */}
      <div className="p-4 rounded-2xl surface-card border border-white/[0.06] flex items-start space-x-3 text-xs text-slate-400">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-300">Self-Reflection Note:</strong> These indicators reflect your choices in this educational scenario session, not a psychological profile. The goal is to build conscious Media and Information Literacy habits.
        </p>
      </div>

    </div>
  );
};
