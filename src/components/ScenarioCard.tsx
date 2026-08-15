import React from 'react';
import { Scenario } from '../types';
import { CheckCircle2, MessageSquare, Repeat2, Heart, Eye, Bot, Newspaper, Share2, Sparkles, AlertTriangle } from 'lucide-react';

interface ScenarioCardProps {
  scenario: Scenario;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario }) => {
  const { categoryLabel, platform, author, timestamp, content, aiGenerated, outdated, socialProof } = scenario;

  const getPlatformIcon = () => {
    switch (platform) {
      case 'AI Assistant':
        return <Bot className="w-4 h-4 text-cyan-400" />;
      case 'News Outlet':
        return <Newspaper className="w-4 h-4 text-blue-400" />;
      case 'Influencer Channel':
        return <Sparkles className="w-4 h-4 text-purple-400" />;
      default:
        return <Share2 className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto surface-elevated rounded-3xl p-6 sm:p-8 border border-white/[0.08] relative overflow-hidden transition-all animate-fade-in shadow-xl shadow-black/40">
      
      {/* Header Tags & Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-white/[0.06] text-xs">
        
        {/* Category Label & Modifiers */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono font-bold tracking-wider px-2.5 py-1 rounded-lg bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 uppercase text-[10px]">
            {categoryLabel}
          </span>
          {aiGenerated && (
            <span className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-semibold">
              <Bot className="w-3 h-3" />
              <span>AI Synthesized</span>
            </span>
          )}
          {outdated && (
            <span className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-950/60 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-semibold">
              <AlertTriangle className="w-3 h-3 text-amber-400" />
              <span>Recycled Timestamp</span>
            </span>
          )}
        </div>

        {/* Platform Badge */}
        <div className="flex items-center space-x-1.5 text-slate-300 bg-slate-900/80 px-3 py-1 rounded-full border border-white/10 font-mono text-[11px]">
          {getPlatformIcon()}
          <span>{platform}</span>
        </div>
      </div>

      {/* Author Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-2xl shadow-inner">
            {author.avatar || '👤'}
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h4 className="font-display font-bold text-white text-sm sm:text-base">
                {author.name}
              </h4>
              {author.verified && (
                <CheckCircle2 className="w-4 h-4 text-cyan-400 fill-cyan-950" title="Verified Creator" />
              )}
              {author.badge && (
                <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded-md border border-white/10 font-mono">
                  {author.badge}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
              {author.handle && <span>{author.handle}</span>}
              <span>&bull;</span>
              <span>{timestamp}</span>
            </div>
          </div>
        </div>

        {socialProof === 'massive' && (
          <span className="bg-rose-950/60 text-rose-300 border border-rose-500/40 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
            🔥 VIRAL REACH
          </span>
        )}
      </div>

      {/* Headline & Body Text */}
      <div className="space-y-3 mb-5">
        {content.headline && (
          <h3 className="text-base sm:text-xl font-display font-bold text-white leading-snug tracking-tight">
            {content.headline}
          </h3>
        )}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
          {content.body}
        </p>
      </div>

      {/* Rich Media Visualizer */}
      {content.mediaUrl && (
        <div className="mb-5 rounded-2xl overflow-hidden border border-white/10 bg-slate-900/60 relative">
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

      {/* Social Engagement Stats */}
      {content.stats && (
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center space-x-4 sm:space-x-6">
            {content.stats.likes && (
              <span className="flex items-center space-x-1.5 hover:text-rose-400 transition-colors">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-950" />
                <span className="font-semibold text-slate-300">{content.stats.likes}</span>
              </span>
            )}
            {content.stats.shares && (
              <span className="flex items-center space-x-1.5 hover:text-cyan-400 transition-colors">
                <Repeat2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold text-slate-300">{content.stats.shares}</span>
              </span>
            )}
            {content.stats.comments && (
              <span className="flex items-center space-x-1.5 hover:text-blue-400 transition-colors">
                <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-semibold text-slate-300">{content.stats.comments}</span>
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
