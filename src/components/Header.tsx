import React from 'react';
import { Shield, Globe, BookOpen, Sparkles, CheckCircle2, AlertCircle, Play } from 'lucide-react';
import { Jurisdiction, LanguageCode } from '../types/index.ts';
import { getTranslation } from '../i18n/translations.ts';

interface HeaderProps {
  jurisdiction: Jurisdiction;
  onJurisdictionChange: (jurisdiction: Jurisdiction) => void;
  language: LanguageCode;
  onLanguageChange: (language: LanguageCode) => void;
  onLoadHerbNova: () => void;
  onOpenDemoVideo: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  jurisdiction,
  onJurisdictionChange,
  language,
  onLanguageChange,
  onLoadHerbNova,
  onOpenDemoVideo,
  activeTab,
  onTabChange,
}) => {
  const t = getTranslation(language);

  const languages: { code: LanguageCode; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'sa', label: 'Sanskrit', native: 'संस्कृतम्' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  ];

  const navTabs = [
    { id: 'assistant', label: t.tabs.assistant, icon: Sparkles },
    { id: 'classifier', label: t.tabs.classifier, icon: Shield },
    { id: 'ip-navigator', label: t.tabs.ipNavigator, icon: BookOpen },
    { id: 'abs-tk', label: t.tabs.absTk, icon: CheckCircle2 },
    { id: 'corpus', label: t.tabs.corpus, icon: Globe },
    { id: 'checklist', label: t.tabs.checklist, icon: CheckCircle2 },
    { id: 'evaluation', label: t.tabs.evaluation, icon: AlertCircle },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white text-stone-900 border-b border-stone-200 shadow-xs">
      {/* Top Banner with SIH 2026 Problem Statement credentials */}
      <div className="bg-emerald-50/90 border-b border-emerald-100 px-4 py-1.5 text-xs text-emerald-950 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-semibold text-emerald-900">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            {t.header.sihTitle}
          </span>
          <span className="text-emerald-300">•</span>
          <span className="text-emerald-800">{t.header.ministryAyush}</span>
          <span className="text-emerald-300">•</span>
          <span className="font-mono bg-emerald-100/90 px-1.5 py-0.5 rounded text-emerald-900 border border-emerald-300/80 font-medium">
            {t.header.problemStatement}
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-stone-600">
          {/* Prominent 3-Min Demo Video Button */}
          <button
            onClick={onOpenDemoVideo}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold shadow-xs px-2.5 py-0.5 rounded text-xs transition border border-red-700/30"
            title="Open 3-Minute SIH 2026 Interactive Demo Video & Presentation Script"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>3-Min Demo Video</span>
          </button>

          <span className="hidden md:inline text-emerald-800 text-[11px] font-medium">{t.header.ragBadge}</span>
          <button
            onClick={onLoadHerbNova}
            className="inline-flex items-center gap-1 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded text-xs font-semibold transition shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            {t.header.loadDemoBtn}
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Title and Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center shadow-sm border border-emerald-500/40">
            <span className="font-bold text-lg text-emerald-50 font-serif">शा</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-stone-900 font-serif">
                {t.header.appTitle}
              </h1>
              <span className="text-[10px] uppercase font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 px-1.5 py-0.5 rounded">
                {t.header.prototypeBadge}
              </span>
            </div>
            <p className="text-xs text-stone-500">
              {t.header.appSubtitle}
            </p>
          </div>
        </div>

        {/* Prominent Controls: Jurisdiction Switch & Multilingual Selector */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Prominent Jurisdiction Switch */}
          <div className="flex items-center bg-stone-100 p-1 rounded-lg border border-stone-200 shadow-2xs">
            <button
              onClick={() => onJurisdictionChange('INDIA')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                jurisdiction === 'INDIA'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title={t.header.indiaTooltip}
            >
              <span>🇮🇳</span>
              <span>{t.header.indiaRegime}</span>
            </button>
            <button
              onClick={() => onJurisdictionChange('INTERNATIONAL')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                jurisdiction === 'INTERNATIONAL'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title={t.header.internationalTooltip}
            >
              <span>🌐</span>
              <span>{t.header.internationalRegime}</span>
            </button>
          </div>

          {/* Language Selector */}
          <div className="flex items-center bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1 shadow-2xs">
            <span className="text-xs text-emerald-700 font-semibold mr-1.5">🌐 {t.header.langLabel}</span>
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
              aria-label="Select Assistant Language"
              className="bg-transparent text-xs text-stone-800 font-semibold focus:outline-none cursor-pointer py-0.5"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="bg-white text-stone-900">
                  {l.native} ({l.label})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Navigation Sub-bar */}
      <div className="bg-stone-50/90 border-t border-stone-200 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex overflow-x-auto no-scrollbar gap-1 py-1 text-xs">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md whitespace-nowrap font-medium transition ${
                  isActive
                    ? 'bg-white text-emerald-700 border-b-2 border-emerald-600 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-700' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
