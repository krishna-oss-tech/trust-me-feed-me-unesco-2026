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
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
          label: 'VERDICT: SUPPORTED BY EVIDENCE',
        };
      case 'CONTRADICTED':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-300',
          icon: <XCircle className="w-4 h-4 text-rose-600" />,
          label: 'VERDICT: CONTRADICTED BY EVIDENCE',
        };
      case 'MIXED':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-300',
          icon: <AlertCircle className="w-4 h-4 text-amber-600" />,
          label: 'VERDICT: MIXED / NUANCED EVIDENCE',
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-800 border-slate-300',
          icon: <HelpCircle className="w-4 h-4 text-slate-600" />,
          label: 'VERDICT: INSUFFICIENT EVIDENCE',
        };
    }
  };

  const checks = result
    ? [
        {
          id: 'source',
          title: '1. SOURCE',
          icon: <Globe className="w-4 h-4 text-[#5B8DEF]" />,
          content: result.source,
        },
        {
          id: 'date',
          title: '2. DATE',
          icon: <Calendar className="w-4 h-4 text-[#8B7CF6]" />,
          content: result.date,
        },
        {
          id: 'evidence',
          title: '3. EVIDENCE',
          icon: <FileText className="w-4 h-4 text-[#10B981]" />,
          content: result.evidence,
        },
        {
          id: 'context',
          title: '4. CONTEXT',
          icon: <Search className="w-4 h-4 text-[#F59E0B]" />,
          content: result.context,
        },
        {
          id: 'media',
          title: '5. MEDIA',
          icon: <Image className="w-4 h-4 text-[#EC4899]" />,
          content: result.media,
        },
        {
          id: 'consensus',
          title: '6. CONSENSUS',
          icon: <Users className="w-4 h-4 text-[#3B82F6]" />,
          content: result.consensus,
        },
      ]
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl my-6 space-y-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3.5 pb-2 border-b border-slate-100">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#5B8DEF] shrink-0 shadow-2xs">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-black text-[#172033]">Live Claim Verification MVP</h2>
              <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-[10px] font-mono font-bold">
                TAVILY + AI
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Real-time web search and structured 6-point UNESCO MIL audit
            </p>
          </div>
        </div>

        {/* Input Area */}
        <div className="space-y-3">
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase">
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
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B8DEF]/40 focus:border-[#5B8DEF] transition-all"
            />

            <button
              onClick={() => handleVerify()}
              disabled={loading || !claim.trim()}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#5B8DEF] to-[#8B7CF6] hover:from-[#4B7DE5] hover:to-[#7B6CE6] disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all hover:scale-105 shrink-0 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Searching & Analyzing...</span>
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
            <span className="text-[11px] font-mono text-slate-400 mr-1">Quick Try:</span>
            {SAMPLE_CLAIMS.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => handleVerify(sample)}
                className="text-[11px] text-slate-600 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors text-left truncate max-w-xs cursor-pointer"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-3 animate-fade-in">
            <Loader2 className="w-8 h-8 text-[#5B8DEF] animate-spin mx-auto" />
            <p className="text-sm font-bold text-slate-700">Searching global web index via Tavily & running MIL audit...</p>
            <p className="text-xs text-slate-400">Evaluating source credibility, publication dates, and independent consensus</p>
          </div>
        )}

        {/* Results Display */}
        {result && !loading && (
          <div className="space-y-5 animate-fade-in border-t border-slate-100 pt-4">
            
            {/* Verdict & Confidence Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border text-xs font-black ${getVerdictBadge(result.verdict).bg}`}>
                  {getVerdictBadge(result.verdict).icon}
                  <span>{getVerdictBadge(result.verdict).label}</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-200/80 text-slate-700 text-xs font-mono font-bold">
                  CONFIDENCE: {result.confidence}
                </span>
              </div>

              {result.statusMessage && (
                <span className="text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 font-mono">
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
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/90 border-[#5B8DEF] shadow-xs'
                        : 'bg-slate-50/60 border-slate-200/80 text-slate-600 hover:border-slate-300 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-0.5">
                      {check.icon}
                      <span className="font-mono text-xs font-black text-[#172033]">{check.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Check Details Box */}
            {checks[activeTab] && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#3B82F6]">
                  {checks[activeTab].icon}
                  <span>{checks[activeTab].title} EVALUATION</span>
                </div>
                <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
                  {checks[activeTab].content}
                </p>
              </div>
            )}

            {/* Evidence & Limitations Note */}
            {result.limitations && (
              <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Verification Limitations:</strong> {result.limitations}</span>
              </div>
            )}

            {/* Live Search Sources Citations */}
            {result.sources && result.sources.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#5B8DEF]" />
                  <span>Retrieved Web Sources ({result.sources.length})</span>
                </h4>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {result.sources.map((src, idx) => (
                    <a
                      key={idx}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-2xl bg-white border border-slate-200 hover:border-[#5B8DEF] hover:shadow-xs transition-all group"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[#1D4ED8] group-hover:underline">
                        <span className="truncate max-w-md">{src.title || src.domain}</span>
                        <div className="flex items-center space-x-1 text-slate-400 group-hover:text-[#3B82F6] shrink-0 ml-2">
                          <span className="font-mono text-[10px] text-slate-500">{src.domain}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      {src.snippet && (
                        <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">
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
