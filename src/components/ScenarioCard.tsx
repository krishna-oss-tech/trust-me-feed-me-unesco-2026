import React from 'react';
import { Scenario, PlatformType } from '../types';
import { CheckCircle2, MessageSquare, Repeat2, Heart, Eye, Bot, Newspaper, Share2, Sparkles, AlertTriangle, Hash, ArrowUpCircle, Radio } from 'lucide-react';

interface ScenarioCardProps {
  scenario: Scenario;
}

/* ── Platform-specific header chrome ── */

const AIChromeHeader: React.FC<{ scenario: Scenario }> = ({ scenario }) => (
  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
    <div className="flex items-center space-x-2.5">
      <div className="w-9 h-9 rounded-xl bg-sky-950/60 border border-sky-500/30 flex items-center justify-center text-lg">
        {scenario.author.avatar || '🤖'}
      </div>
      <div>
        <div className="flex items-center space-x-1.5">
          <span className="font-display font-bold text-white text-sm">{scenario.author.name}</span>
          {scenario.author.badge && (
            <span className="text-[10px] bg-sky-950/60 text-sky-300 px-2 py-0.5 rounded-md border border-sky-500/25 font-mono">
              {scenario.author.badge}
            </span>
          )}
        </div>
        <span className="text-[11px] text-slate-500 font-mono">Generated response · {scenario.timestamp}</span>
      </div>
    </div>
    <div className="flex items-center space-x-1 text-[10px] font-mono text-sky-400/70">
      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
      <span>AI</span>
    </div>
  </div>
);

const NewsChromeHeader: React.FC<{ scenario: Scenario }> = ({ scenario }) => (
  <div className="pb-3 mb-4 border-b border-white/[0.06]">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        <Newspaper className="w-4 h-4 text-blue-400" />
        <span className="font-display font-bold text-white text-sm tracking-wider uppercase">{scenario.author.name}</span>
        {scenario.author.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
      </div>
      <span className="text-[10px] text-slate-500 font-mono">{scenario.timestamp}</span>
    </div>
    <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-500">
      {scenario.author.handle && <span>{scenario.author.handle}</span>}
      <span className="px-2 py-0.5 rounded bg-blue-950/40 text-blue-300 border border-blue-500/20 font-bold">{scenario.categoryLabel}</span>
    </div>
  </div>
);

const SocialChromeHeader: React.FC<{ scenario: Scenario }> = ({ scenario }) => (
  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-lg shadow-inner border-2 border-white/10">
        {scenario.author.avatar || '👤'}
      </div>
      <div>
        <div className="flex items-center space-x-1.5">
          <span className="font-display font-bold text-white text-sm">{scenario.author.name}</span>
          {scenario.author.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-950" />}
        </div>
        <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-mono">
          {scenario.author.handle && <span>{scenario.author.handle}</span>}
          <span>·</span>
          <span>{scenario.timestamp}</span>
        </div>
      </div>
    </div>
    {scenario.socialProof === 'massive' && (
      <span className="text-[10px] font-mono font-bold text-rose-300 bg-rose-950/50 px-2 py-1 rounded-full border border-rose-500/30 flex items-center space-x-1">
        <Radio className="w-3 h-3" />
        <span>VIRAL</span>
      </span>
    )}
  </div>
);

const InfluencerChromeHeader: React.FC<{ scenario: Scenario }> = ({ scenario }) => (
  <div className="pb-3 mb-4 border-b border-white/[0.06]">
    <div className="flex items-center space-x-3">
      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center text-xl">
        {scenario.author.avatar || '✨'}
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="font-display font-bold text-white text-sm">{scenario.author.name}</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
          {scenario.author.badge && (
            <span className="text-[10px] bg-purple-950/50 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30 font-mono font-bold">
              {scenario.author.badge}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-mono">
          {scenario.author.handle && <span>{scenario.author.handle}</span>}
          <span>·</span>
          <span>{scenario.timestamp}</span>
        </div>
      </div>
      <Sparkles className="w-4 h-4 text-purple-400/60" />
    </div>
  </div>
);

const ForumChromeHeader: React.FC<{ scenario: Scenario }> = ({ scenario }) => (
  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
    <div className="flex items-center space-x-3">
      <div className="flex flex-col items-center space-y-0.5 text-slate-500 mr-1">
        <ArrowUpCircle className="w-4 h-4" />
        <span className="text-[10px] font-mono font-bold text-slate-400">{scenario.content.stats?.likes || '—'}</span>
      </div>
      <div>
        <div className="flex items-center space-x-1.5">
          <span className="font-mono font-bold text-white text-sm">{scenario.author.name}</span>
          {scenario.author.handle && <span className="text-[11px] text-slate-500 font-mono">{scenario.author.handle}</span>}
        </div>
        <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono">
          <span>{scenario.timestamp}</span>
          {scenario.outdated && (
            <span className="flex items-center space-x-1 text-amber-400">
              <AlertTriangle className="w-3 h-3" />
              <span>OLD POST</span>
            </span>
          )}
        </div>
      </div>
    </div>
    <div className="flex items-center space-x-1.5 text-[10px] font-mono text-slate-500">
      <Hash className="w-3 h-3" />
      <span>{scenario.categoryLabel.toLowerCase().replace(/\s+/g, '-')}</span>
    </div>
  </div>
);

/* ── Tag badges ── */

const TagBadges: React.FC<{ scenario: Scenario }> = ({ scenario }) => (
  <div className="flex flex-wrap gap-1.5 mb-4">
    {scenario.aiGenerated && (
      <span className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-sky-950/50 text-sky-300 border border-sky-500/25 text-[10px] font-mono font-semibold">
        <Bot className="w-3 h-3" />
        <span>AI Synthesized</span>
      </span>
    )}
    {scenario.outdated && scenario.platform !== 'Viral Forum' && (
      <span className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-amber-950/50 text-amber-300 border border-amber-500/25 text-[10px] font-mono font-semibold">
        <AlertTriangle className="w-3 h-3" />
        <span>Recycled</span>
      </span>
    )}
    {scenario.socialProof === 'massive' && scenario.platform !== 'Social Media' && (
      <span className="text-[10px] font-mono font-bold text-rose-300 bg-rose-950/40 px-2 py-0.5 rounded-md border border-rose-500/25">
        🔥 Viral Reach
      </span>
    )}
  </div>
);

/* ── Platform class selector ── */

const getPlatformClass = (platform: PlatformType): string => {
  switch (platform) {
    case 'AI Assistant': return 'platform-ai';
    case 'News Outlet': return 'platform-news';
    case 'Influencer Channel': return 'platform-influencer';
    case 'Viral Forum': return 'platform-forum';
    default: return 'platform-social';
  }
};

const getPlatformHeader = (scenario: Scenario): React.ReactNode => {
  switch (scenario.platform) {
    case 'AI Assistant': return <AIChromeHeader scenario={scenario} />;
    case 'News Outlet': return <NewsChromeHeader scenario={scenario} />;
    case 'Influencer Channel': return <InfluencerChromeHeader scenario={scenario} />;
    case 'Viral Forum': return <ForumChromeHeader scenario={scenario} />;
    default: return <SocialChromeHeader scenario={scenario} />;
  }
};

/* ── Main ScenarioCard ── */

export const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario }) => {
  const { content } = scenario;

  return (
    <div className={`w-full max-w-2xl mx-auto rounded-2xl p-6 sm:p-8 relative overflow-hidden animate-fade-in shadow-xl shadow-black/40 ${getPlatformClass(scenario.platform)}`}>
      
      {/* Platform-specific header */}
      {getPlatformHeader(scenario)}

      {/* Tag badges */}
      <TagBadges scenario={scenario} />

      {/* Headline & Body */}
      <div className="space-y-3 mb-5">
        {content.headline && (
          <h3 className={`font-display font-bold text-white leading-snug tracking-tight ${
            scenario.platform === 'News Outlet' ? 'text-lg sm:text-2xl' : 'text-base sm:text-xl'
          }`}>
            {content.headline}
          </h3>
        )}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
          {content.body}
        </p>
      </div>

      {/* Media */}
      {content.mediaUrl && (
        <div className="mb-5 rounded-xl overflow-hidden border border-white/10 bg-slate-900/60 relative">
          <img
            src={content.mediaUrl}
            alt={content.mediaCaption || 'Scenario Media'}
            className="w-full max-h-72 object-cover"
            loading="lazy"
          />
          {content.mediaCaption && (
            <div className="p-2.5 bg-slate-950/90 border-t border-white/10 text-xs text-slate-400 italic">
              {content.mediaCaption}
            </div>
          )}
        </div>
      )}

      {/* Social stats (not for AI/Forum which have their own display) */}
      {content.stats && scenario.platform !== 'Viral Forum' && (
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center space-x-4 sm:space-x-6">
            {content.stats.likes && (
              <span className="flex items-center space-x-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400/70" />
                <span className="text-slate-300 font-semibold">{content.stats.likes}</span>
              </span>
            )}
            {content.stats.shares && (
              <span className="flex items-center space-x-1.5">
                <Repeat2 className="w-3.5 h-3.5 text-sky-400/70" />
                <span className="text-slate-300 font-semibold">{content.stats.shares}</span>
              </span>
            )}
            {content.stats.comments && (
              <span className="flex items-center space-x-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-blue-400/70" />
                <span className="text-slate-300 font-semibold">{content.stats.comments}</span>
              </span>
            )}
          </div>
          {content.stats.views && (
            <div className="flex items-center space-x-1 text-slate-500">
              <Eye className="w-3.5 h-3.5" />
              <span>{content.stats.views} views</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
