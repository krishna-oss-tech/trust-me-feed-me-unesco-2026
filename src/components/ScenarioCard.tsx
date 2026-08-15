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
        return <Bot className="w-4 h-4 text-[#5B8DEF]" />;
      case 'News Outlet':
        return <Newspaper className="w-4 h-4 text-[#3B82F6]" />;
      case 'Influencer Channel':
        return <Sparkles className="w-4 h-4 text-[#8B7CF6]" />;
      default:
        return <Share2 className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto light-card rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md relative overflow-hidden transition-all animate-fade-in bg-white">
      
      {/* Card Header Tag & Indicators */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100 text-xs">
        
        {/* Category Label */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono font-bold tracking-wider px-2.5 py-1 rounded-lg bg-blue-50 text-[#3B82F6] border border-blue-200 uppercase text-[11px]">
            {categoryLabel}
          </span>
          {aiGenerated && (
            <span className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-semibold">
              <Bot className="w-3 h-3" />
              <span>AI Synthesized</span>
            </span>
          )}
          {outdated && (
            <span className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-semibold">
              <AlertTriangle className="w-3 h-3 text-amber-600" />
              <span>Timestamp Warning</span>
            </span>
          )}
        </div>

        {/* Platform Badge */}
        <div className="flex items-center space-x-1.5 text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/80 font-medium">
          {getPlatformIcon()}
          <span>{platform}</span>
        </div>
      </div>

      {/* Author Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl shadow-2xs">
            {author.avatar || '👤'}
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h4 className="font-extrabold text-[#172033] text-sm sm:text-base">
                {author.name}
              </h4>
              {author.verified && (
                <CheckCircle2 className="w-4 h-4 text-[#3B82F6] fill-blue-50" title="Verified Creator" />
              )}
              {author.badge && (
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 font-mono font-medium">
                  {author.badge}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
              {author.handle && <span>{author.handle}</span>}
              <span>&bull;</span>
              <span>{timestamp}</span>
            </div>
          </div>
        </div>

        {socialProof === 'massive' && (
          <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-2xs">
            🔥 VIRAL TREND
          </span>
        )}
      </div>

      {/* Scenario Text Content */}
      <div className="space-y-3 mb-5">
        {content.headline && (
          <h3 className="text-base sm:text-xl font-black text-[#172033] leading-snug tracking-tight">
            {content.headline}
          </h3>
        )}
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
          {content.body}
        </p>
      </div>

      {/* Rich Media Visualizer (Images / Quotes / Charts) */}
      {content.mediaUrl && (
        <div className="mb-5 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 relative shadow-2xs">
          <img
            src={content.mediaUrl}
            alt={content.mediaCaption || 'Scenario Media'}
            className="w-full max-h-72 object-cover"
            loading="lazy"
          />
          {content.mediaCaption && (
            <div className="p-3 bg-white/95 border-t border-slate-200 text-xs text-slate-600 italic">
              {content.mediaCaption}
            </div>
          )}
        </div>
      )}

      {/* Engagement Social Proof Footer */}
      {content.stats && (
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
          <div className="flex items-center space-x-4 sm:space-x-6">
            {content.stats.likes && (
              <span className="flex items-center space-x-1.5 hover:text-rose-600 transition-colors">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-50" />
                <span className="font-semibold">{content.stats.likes}</span>
              </span>
            )}
            {content.stats.shares && (
              <span className="flex items-center space-x-1.5 hover:text-blue-600 transition-colors">
                <Repeat2 className="w-4 h-4 text-[#3B82F6]" />
                <span className="font-semibold">{content.stats.shares}</span>
              </span>
            )}
            {content.stats.comments && (
              <span className="flex items-center space-x-1.5 hover:text-indigo-600 transition-colors">
                <MessageSquare className="w-4 h-4 text-indigo-500" />
                <span className="font-semibold">{content.stats.comments}</span>
              </span>
            )}
          </div>

          {content.stats.views && (
            <div className="flex items-center space-x-1 text-slate-400">
              <Eye className="w-3.5 h-3.5" />
              <span>{content.stats.views} views</span>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
