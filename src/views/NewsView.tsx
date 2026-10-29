import React, { useState } from 'react';
import { db } from '../lib/db';
import { NewsAlert } from '../lib/types';
import { Bell, AlertTriangle, ShieldAlert, Calendar, Share2, Check, Sparkles, Pin } from 'lucide-react';

export const NewsView: React.FC = () => {
  const news = db.getNews();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Traffic Alert', 'Weather Advisory', 'Snow Warning', 'Tourism Event'];

  const filteredNews = news.filter(
    (n) => selectedCategory === 'All' || n.category === selectedCategory
  );

  const handleShare = (alert: NewsAlert) => {
    const text = `[Murree Update Alert] ${alert.title}\nSource: ${alert.source}\n${alert.summary}`;
    navigator.clipboard.writeText(text);
    setCopiedId(alert.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getSeverityBadge = (sev: string) => {
    if (sev === 'High') {
      return 'bg-red-50 text-red-800 border-red-200';
    }
    if (sev === 'Moderate') {
      return 'bg-amber-50 text-amber-800 border-amber-200';
    }
    return 'bg-slate-100 text-slate-800 border-slate-200';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
          <Bell className="w-4 h-4" />
          <span>Official Bulletins & Travel Warnings</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Murree Travel Alerts & News Desk
        </h1>
        <p className="text-sm text-slate-500 mt-1 leading-relaxed">
          Verified press releases and traffic advisories published in coordination with District Administration Murree, Punjab Highway Patrol, and PDMA.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <span className="text-xs font-semibold text-slate-500 shrink-0 mr-1">Filter Alert:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="space-y-4">
        {filteredNews.map((alert) => (
          <div
            key={alert.id}
            className={`bg-white rounded-2xl border p-6 transition-all ${
              alert.isPinned ? 'border-emerald-300 ring-1 ring-emerald-300 shadow-sm' : 'border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                {alert.isPinned && (
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                    <Pin className="w-3 h-3" /> Pinned Advisory
                  </span>
                )}
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${getSeverityBadge(alert.severity)}`}>
                  {alert.category}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>{alert.date}</span>
                <button
                  onClick={() => handleShare(alert)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                  title="Copy alert text"
                >
                  {copiedId === alert.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[11px] text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Share</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <h2 className="text-lg font-bold text-slate-900">{alert.title}</h2>
            <p className="text-xs font-medium text-slate-700 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
              {alert.summary}
            </p>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              {alert.content}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Source: <strong className="text-slate-700">{alert.source}</strong></span>
              <span className="text-slate-400">Verified Advisory</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
