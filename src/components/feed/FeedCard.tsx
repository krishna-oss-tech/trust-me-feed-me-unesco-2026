import React from 'react';
import type { FeedItem } from '../../types';
import { Heart, Repeat2, MessageSquare, Info } from 'lucide-react';

interface FeedCardProps {
  item: FeedItem;
}

export const FeedCard: React.FC<FeedCardProps> = ({ item }) => {
  const { platform, author, timestamp, headline, content, stats, tags, explanation } = item;

  return (
    <div className="w-full surface-elevated rounded-3xl p-6 border border-white/[0.08] space-y-4 hover:border-cyan-500/30 transition-all shadow-lg">
      
      {/* Feed Card Header */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-lg shadow-inner">
            {author.avatar}
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-display font-bold text-white text-sm">{author.name}</span>
              <span className="text-slate-400 font-mono text-[11px]">{author.handle}</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">{timestamp} &bull; {platform}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="hidden sm:flex items-center space-x-1.5">
          {tags.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-slate-900 text-cyan-300 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Headline & Body */}
      <div className="space-y-2">
        {headline && (
          <h4 className="text-base font-display font-bold text-white leading-snug">
            {headline}
          </h4>
        )}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
          {content}
        </p>
      </div>

      {/* Engagement Stats */}
      <div className="flex items-center space-x-5 text-xs text-slate-400 font-mono pt-3 border-t border-white/[0.06]">
        <span className="flex items-center space-x-1.5 hover:text-rose-400 transition-colors">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-950" />
          <span className="text-slate-300 font-semibold">{stats.likes}</span>
        </span>
        <span className="flex items-center space-x-1.5 hover:text-cyan-400 transition-colors">
          <Repeat2 className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-300 font-semibold">{stats.shares}</span>
        </span>
        <span className="flex items-center space-x-1.5 hover:text-blue-400 transition-colors">
          <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-slate-300 font-semibold">{stats.comments}</span>
        </span>
      </div>

      {/* Explanation Banner (Why it appeared in user feed) */}
      <div className="surface-card p-3 rounded-2xl border border-cyan-500/20 text-xs text-cyan-300 flex items-start space-x-2 font-mono">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <span className="leading-snug">{explanation}</span>
      </div>

    </div>
  );
};
