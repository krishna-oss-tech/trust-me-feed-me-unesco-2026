import React from 'react';
import type { FeedItem } from '../../types';
import { Heart, Repeat2, MessageSquare, Info, ShieldCheck } from 'lucide-react';

interface FeedCardProps {
  item: FeedItem;
}

export const FeedCard: React.FC<FeedCardProps> = ({ item }) => {
  const { platform, author, timestamp, headline, content, stats, tags, explanation } = item;

  return (
    <div className="w-full light-card rounded-3xl p-6 border border-slate-200/90 space-y-4 hover:border-slate-300 transition-all bg-white shadow-xs">
      
      {/* Feed Card Header */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-2xl bg-slate-100 flex items-center justify-center text-lg border border-slate-200">
            {author.avatar}
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-[#172033]">{author.name}</span>
              <span className="text-slate-400 font-mono text-[11px]">{author.handle}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">{timestamp} &bull; {platform}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="hidden sm:flex items-center space-x-1.5">
          {tags.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Headline & Body */}
      <div className="space-y-2">
        {headline && (
          <h4 className="text-base font-extrabold text-[#172033] leading-snug">
            {headline}
          </h4>
        )}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          {content}
        </p>
      </div>

      {/* Engagement Stats */}
      <div className="flex items-center space-x-5 text-xs text-slate-500 font-mono pt-3 border-t border-slate-100">
        <span className="flex items-center space-x-1.5 hover:text-rose-600 transition-colors">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-50" />
          <span>{stats.likes}</span>
        </span>
        <span className="flex items-center space-x-1.5 hover:text-blue-600 transition-colors">
          <Repeat2 className="w-3.5 h-3.5 text-[#3B82F6]" />
          <span>{stats.shares}</span>
        </span>
        <span className="flex items-center space-x-1.5 hover:text-indigo-600 transition-colors">
          <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
          <span>{stats.comments}</span>
        </span>
      </div>

      {/* Explanation Banner (Why it appeared in user feed) */}
      <div className="bg-blue-50/80 p-3 rounded-2xl border border-blue-200/80 text-xs text-[#1E40AF] flex items-start space-x-2 font-mono">
        <Info className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
        <span className="leading-snug">{explanation}</span>
      </div>

    </div>
  );
};
