import React, { useEffect } from 'react';
import { InformationProfile } from '../../types';
import { ProfileRadarChart } from './RadarChart';
import { Award, CheckCircle, Lightbulb, Compass, ArrowRight, ShieldCheck, Info } from 'lucide-react';
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
    if (val >= 60) return { text: 'HIGH', color: 'text-rose-600 bg-rose-50 border-rose-200' };
    if (val >= 35) return { text: 'MEDIUM', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { text: 'LOW', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
  };

  const metricBars = [
    { label: 'FAST TRUST', value: metrics.fastTrust, color: 'from-[#5B8DEF] to-[#8B7CF6]' },
    { label: 'VERIFICATION HABIT', value: metrics.verificationHabit, color: 'from-[#10B981] to-[#63C7B2]' },
    { label: 'EMOTION INFLUENCE', value: metrics.emotionInfluence, color: 'from-[#F43F5E] to-[#FFB4A2]' },
    { label: 'SOCIAL PROOF INFLUENCE', value: metrics.socialProofInfluence, color: 'from-[#F59E0B] to-[#FBBF24]' },
    { label: 'AI TRUST', value: metrics.aiTrust, color: 'from-[#8B7CF6] to-[#C084FC]' },
    { label: 'SOURCE CHECKING', value: metrics.sourceChecking, color: 'from-[#3B82F6] to-[#60A5FA]' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in py-4">
      
      {/* Profile Header Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#3B82F6] text-xs font-semibold shadow-2xs">
          <Award className="w-4 h-4 text-[#5B8DEF]" />
          <span>UNESCO MIL BEHAVIOURAL ASSESSMENT</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#172033] tracking-tight">
          YOUR INFORMATION<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B8DEF] via-[#8B7CF6] to-[#63C7B2]">
            BEHAVIOUR PROFILE
          </span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          These indicators reflect your choices in this educational simulation, not a psychological assessment.
        </p>
      </div>

      {/* Main Archetype Card & Radar Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Archetype Details */}
        <div className="lg:col-span-7 light-card rounded-3xl p-6 sm:p-8 border border-slate-200/90 space-y-6 bg-white shadow-md">
          <div>
            <div className="flex items-center space-x-2 text-[#3B82F6] text-xs font-mono font-bold uppercase mb-1">
              <Compass className="w-4 h-4" />
              <span>BEHAVIOURAL ARCHETYPE</span>
            </div>
            <h2 className="text-2xl font-black text-[#172033]">{archetypeTitle}</h2>
            <p className="text-[#8B7CF6] text-xs sm:text-sm font-semibold mt-1">{archetypeSubtitle}</p>
          </div>

          <p className="text-slate-700 text-sm leading-relaxed border-t border-b border-slate-100 py-4">
            {description}
          </p>

          {/* Key Strengths */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              Identified Strengths
            </h4>
            <ul className="space-y-2">
              {strengths.map((str, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-800">
                  <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Growth Area */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              MIL Growth Insight
            </h4>
            <ul className="space-y-2">
              {growthAreas.map((g, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-amber-900 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Radar Chart & Accuracy */}
        <div className="lg:col-span-5 light-card rounded-3xl p-6 border border-slate-200/90 flex flex-col justify-between bg-white shadow-md">
          <div>
            <h3 className="text-xs font-bold font-mono text-slate-600 uppercase tracking-wider text-center">
              Behavioural Metric Radar
            </h3>
            <ProfileRadarChart metrics={metrics} />
          </div>
          
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center mt-2">
            <span className="text-xs text-slate-500 block font-mono font-bold">MIL Decision Accuracy Rate</span>
            <span className="text-3xl font-black text-[#5B8DEF]">{metrics.accuracyScore}%</span>
          </div>
        </div>

      </div>

      {/* 4 Summary Highlight Indicator Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="light-card p-4 rounded-2xl border border-slate-200 text-center bg-white">
          <span className="text-[11px] font-mono font-bold text-slate-500 block">FAST TRUST</span>
          <span className="text-2xl font-black text-[#5B8DEF] block my-1">{metrics.fastTrust}%</span>
          <span className="text-[10px] text-slate-500">Decision speed</span>
        </div>

        <div className="light-card p-4 rounded-2xl border border-slate-200 text-center bg-white">
          <span className="text-[11px] font-mono font-bold text-slate-500 block">VERIFY HABIT</span>
          <span className="text-2xl font-black text-[#10B981] block my-1">{metrics.verificationHabit}%</span>
          <span className="text-[10px] text-slate-500">Source audit rate</span>
        </div>

        <div className="light-card p-4 rounded-2xl border border-slate-200 text-center bg-white">
          <span className="text-[11px] font-mono font-bold text-slate-500 block">EMOTION INFLUENCE</span>
          <span className={`inline-block text-xs font-black px-2.5 py-1 rounded-lg border mt-2 ${getInfluenceLabel(metrics.emotionInfluence).color}`}>
            {getInfluenceLabel(metrics.emotionInfluence).text} ({metrics.emotionInfluence}%)
          </span>
        </div>

        <div className="light-card p-4 rounded-2xl border border-slate-200 text-center bg-white">
          <span className="text-[11px] font-mono font-bold text-slate-500 block">AI TRUST</span>
          <span className={`inline-block text-xs font-black px-2.5 py-1 rounded-lg border mt-2 ${getInfluenceLabel(metrics.aiTrust).color}`}>
            {getInfluenceLabel(metrics.aiTrust).text} ({metrics.aiTrust}%)
          </span>
        </div>

      </div>

      {/* Detailed Metric Breakdown Progress Bars */}
      <div className="light-card rounded-3xl p-6 sm:p-8 border border-slate-200 bg-white">
        <h3 className="text-xs font-bold font-mono text-slate-600 uppercase tracking-wider mb-6">
          Detailed Metric Breakdown
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {metricBars.map((bar, idx) => (
            <div key={idx} className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700 font-mono text-[11px]">{bar.label}</span>
                <span className="font-mono text-[#3B82F6]">{bar.value}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
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
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-50 via-indigo-50 to-teal-50 border border-blue-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-blue-200 flex items-center justify-center text-[#5B8DEF] shrink-0 shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[#1D4ED8] uppercase mb-0.5">
              <span>YOUR NEXT MIL SKILL</span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-[#172033]">
              &ldquo;{recommendations[0]}&rdquo;
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              Practice this routine whenever encountering sensational claims online.
            </p>
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#5B8DEF] to-[#8B7CF6] hover:from-[#4B7DE5] hover:to-[#7B6CE6] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all hover:scale-105 shrink-0 cursor-pointer"
        >
          <span>VIEW YOUR SIMULATED FEED</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Non-Diagnostic Disclaimer Note */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-start space-x-3 text-xs text-slate-600">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p>
          <strong>Self-Reflection Note:</strong> These indicators reflect your choices in this educational scenario session, not a psychological profile. The goal is to build conscious Media and Information Literacy habits.
        </p>
      </div>

    </div>
  );
};
