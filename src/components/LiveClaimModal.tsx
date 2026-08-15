import React, { useState } from 'react';
import { verifyLiveClaim } from '../services/liveVerifyService';
import type { LiveClaimVerificationResult } from '../types';
import { Search, Globe, Calendar, FileText, Image, Users, Sparkles, ExternalLink, X, AlertCircle, CheckCircle2, XCircle, HelpCircle, Loader2 } from 'lucide-react';

interface LiveClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_CLAIMS = [
  'Solar-powered earpiece translates 50 languages without internet',
  'UNESCO World Heritage preservation data report for 2024',
  'Looking at phone in dark regenerates retinal cells by 14%',
  'Eiffel Tower announced permanent shutdown due to sinking foundation',
];

export const LiveClaimModal: React.FC<LiveClaimModalProps> = ({ isOpen, onClose }) => {
  const [claim, setClaim] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<LiveClaimVerificationResult | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  if (!isOpen) return null;

  const handleVerify = async (claimToTest?: string) => {
    const text = (claimToTest || claim).trim();
    if (!text) return;
    if (claimToTest) setClaim(claimToTest);

    setLoading(true);
    setResult(null);
    try {
      const res = await verifyLiveClaim(text);
      setResult(res);
      setActiveTab(0);
    } catch {
      // Handled in service
    } finally {
      setLoading(false);
    }
  };

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case 'SUPPORTED':
        return {
          bg: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
          label: 'VERDICT: SUPPORTED BY EVIDENCE',
        };
      case 'CONTRADICTED':
        return {
          bg: 'bg-rose-950/60 text-rose-300 border-rose-500/40',
          icon: <XCircle className="w-4 h-4 text-rose-400" />,
          label: 'VERDICT: CONTRADICTED BY EVIDENCE',
        };
      case 'MIXED':
        return {
          bg: 'bg-amber-950/60 text-amber-300 border-amber-500/40',
          icon: <AlertCircle className="w-4 h-4 text-amber-400" />,
          label: 'VERDICT: MIXED / NUANCED EVIDENCE',
        };
      default:
        return {
          bg: 'bg-slate-900 text-slate-300 border-white/10',
          icon: <HelpCircle className="w-4 h-4 text-slate-400" />,
          label: 'VERDICT: INSUFFICIENT EVIDENCE',
        };
    }
  };

  const checks = result
    ? [
        { id: 'source', title: '1. SOURCE', icon: <Globe className="w-4 h-4 text-sky-400" />, content: result.source },
        { id: 'date', title: '2. DATE', icon: <Calendar className="w-4 h-4 text-purple-400" />, content: result.date },
        { id: 'evidence', title: '3. EVIDENCE', icon: <FileText className="w-4 h-4 text-emerald-400" />, content: result.evidence },
        { id: 'context', title: '4. CONTEXT', icon: <Search className="w-4 h-4 text-amber-400" />, content: result.context },
        { id: 'media', title: '5. MEDIA', icon: <Image className="w-4 h-4 text-rose-400" />, content: result.media },
        { id: 'consensus', title: '6. CONSENSUS', icon: <Users className="w-4 h-4 text-blue-400" />, content: result.consensus },
      ]
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="w-full max-w-3xl surface-elevated rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl my-6 space-y-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3.5 pb-2 border-b border-white/[0.06]">
          <div className="w-10 h-10 rounded-xl bg-sky-950/60 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0 shadow-xs">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg sm:text-xl font-display font-bold text-white">Live Claim Verification Laboratory</h2>
              <span className="px-2 py-0.5 rounded-full bg-sky-950/80 text-sky-300 border border-sky-500/30 text-[10px] font-mono font-bold">
                TAVILY + AI
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Real-time web index search and structured 6-point UNESCO MIL audit
            </p>
          </div>
        </div>

        {/* Input Area */}
        <div className="space-y-3">
          <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            Enter Any Claim, Headline, or Online Statement:
          </label>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleVerify();
              }}
              placeholder="e.g. Dihydrogen Monoxide in tap water destroys memory..."
              maxLength={500}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-400 transition-all font-sans"
            />

            <button
              onClick={() => handleVerify()}
              disabled={loading || !claim.trim()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 hover:brightness-110 active:scale-[0.97] disabled:opacity-50 text-slate-950 font-display font-bold text-xs sm:text-sm shadow-md shadow-sky-500/20 flex items-center justify-center space-x-2 transition-all shrink-0 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>CHECK CLAIM</span>
                </>
              )}
            </button>
          </div>

          {/* Sample Prompts */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-mono text-slate-500 mr-1">Quick Try:</span>
            {SAMPLE_CLAIMS.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => handleVerify(sample)}
                className="text-[11px] font-mono text-slate-300 bg-slate-900/80 hover:bg-sky-950/50 hover:text-sky-300 px-2.5 py-1 rounded-lg border border-white/[0.08] hover:border-sky-500/30 transition-colors text-left truncate max-w-xs cursor-pointer"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State with progressive feedback */}
        {loading && (
          <div className="p-8 rounded-2xl surface-card border border-white/[0.08] text-center space-y-3 animate-fade-in">
            <Loader2 className="w-8 h-8 text-sky-400 animate-spin mx-auto" />
            <p className="text-sm font-display font-bold text-slate-200">Querying global web index & synthesizing MIL audit...</p>
            <p className="text-xs text-slate-400 font-mono">Evaluating source credentials, publication dates, and independent consensus</p>
          </div>
        )}

        {/* Results Display */}
        {result && !loading && (
          <div className="space-y-5 animate-fade-in border-t border-white/[0.06] pt-4">
            
            {/* Verdict Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl surface-card border border-white/[0.08]">
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold ${getVerdictBadge(result.verdict).bg}`}>
                  {getVerdictBadge(result.verdict).icon}
                  <span>{getVerdictBadge(result.verdict).label}</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 text-xs font-mono font-bold border border-white/10">
                  CONFIDENCE: {result.confidence}
                </span>
              </div>

              {result.statusMessage && (
                <span className="text-xs text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/30 font-mono">
                  {result.statusMessage}
                </span>
              )}
            </div>

            {/* 6 MIL Checks Tabs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {checks.map((check, idx) => {
                const isSelected = activeTab === idx;
                return (
                  <button
                    key={check.id}
                    onClick={() => setActiveTab(idx)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-sky-950/40 border-sky-500/60 shadow-xs'
                        : 'bg-slate-900/60 border-white/[0.06] text-slate-400 hover:border-white/20 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-0.5">
                      {check.icon}
                      <span className="font-mono text-xs font-bold text-white">{check.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Check Details Box */}
            {checks[activeTab] && (
              <div className="p-4 sm:p-5 rounded-xl surface-card border border-white/[0.08] space-y-1.5">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-sky-300">
                  {checks[activeTab].icon}
                  <span>{checks[activeTab].title} EVALUATION</span>
                </div>
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal">
                  {checks[activeTab].content}
                </p>
              </div>
            )}

            {/* Evidence & Limitations Note */}
            {result.limitations && (
              <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-500/30 text-xs text-amber-300 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Verification Limitations:</strong> {result.limitations}</span>
              </div>
            )}

            {/* Citations */}
            {result.sources && result.sources.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>Retrieved Web Citations ({result.sources.length})</span>
                </h4>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {result.sources.map((src, idx) => (
                    <a
                      key={idx}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-xl surface-card border border-white/[0.08] hover:border-sky-500/50 hover:shadow-xs transition-all group cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-sky-400 group-hover:underline">
                        <span className="truncate max-w-md">{src.title || src.domain}</span>
                        <div className="flex items-center space-x-1 text-slate-400 group-hover:text-sky-300 shrink-0 ml-2">
                          <span className="font-mono text-[10px] text-slate-500">{src.domain}</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </div>
                      {src.snippet && (
                        <p className="text-[11px] text-slate-300 line-clamp-2 mt-1">
                          {src.snippet}
                        </p>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
