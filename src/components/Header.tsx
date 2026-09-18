import React from 'react';
import { Shield, Globe, BookOpen, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { Jurisdiction, LanguageCode } from '../types/index.ts';

interface HeaderProps {
  jurisdiction: Jurisdiction;
  onJurisdictionChange: (jurisdiction: Jurisdiction) => void;
  language: LanguageCode;
  onLanguageChange: (language: LanguageCode) => void;
  onLoadHerbNova: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  jurisdiction,
  onJurisdictionChange,
  language,
  onLanguageChange,
  onLoadHerbNova,
  activeTab,
  onTabChange,
}) => {
  const languages: { code: LanguageCode; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'EN' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'sa', label: 'Sanskrit', native: 'संस्कृतम्' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  ];

  const navTabs = [
    { id: 'assistant', label: 'Ask Assistant', icon: Sparkles },
    { id: 'classifier', label: 'Formulation Classifier', icon: Shield },
    { id: 'ip-navigator', label: 'IP Navigator', icon: BookOpen },
    { id: 'abs-tk', label: 'ABS & Traditional Knowledge', icon: CheckCircle2 },
    { id: 'corpus', label: 'Source Explorer', icon: Globe },
    { id: 'checklist', label: 'Action Checklist', icon: CheckCircle2 },
    { id: 'evaluation', label: 'SIH Evaluation', icon: AlertCircle },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-md">
      {/* Top Banner with SIH 2026 Problem Statement credentials */}
      <div className="bg-emerald-950/80 border-b border-emerald-900/50 px-4 py-1.5 text-xs text-emerald-300/90 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-semibold text-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Smart India Hackathon 2026
          </span>
          <span className="text-emerald-500">•</span>
          <span>Ministry of Ayush / All India Institute of Ayurveda (AIIA)</span>
          <span className="text-emerald-500">•</span>
          <span className="font-mono bg-emerald-900/60 px-1.5 py-0.5 rounded text-emerald-200 border border-emerald-800/60">
            Problem Statement 26045
          </span>
        </div>
        <div className="flex items-center gap-3 text-stone-400">
          <span className="hidden sm:inline">Authoritative Source-Grounded RAG</span>
          <button
            onClick={onLoadHerbNova}
            className="inline-flex items-center gap-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded text-xs font-medium transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Load &ldquo;HerbNova&rdquo; Demo
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Title and Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center shadow-inner border border-emerald-500/40">
            <span className="font-bold text-lg text-emerald-100 font-serif">शा</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-stone-50 font-serif">
                IP-SAKTI Sahayak
              </h1>
              <span className="text-[10px] uppercase font-semibold bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 px-1.5 py-0.5 rounded">
                Prototype v1.0
              </span>
            </div>
            <p className="text-xs text-stone-400">
              From Ayurvedic Innovation to Evidence-Backed IP & Regulatory Guidance
            </p>
          </div>
        </div>

        {/* Prominent Controls: Jurisdiction Switch & Multilingual Selector */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Prominent Jurisdiction Switch */}
          <div className="flex items-center bg-stone-950 p-1 rounded-lg border border-stone-700/80 shadow-inner">
            <button
              onClick={() => onJurisdictionChange('INDIA')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                jurisdiction === 'INDIA'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Prioritize Indian Statutes, Drugs & Cosmetics Act, Patents Act Sec 3(p), Biological Diversity Act"
            >
              <span>🇮🇳</span>
              <span>INDIA REGIME</span>
            </button>
            <button
              onClick={() => onJurisdictionChange('INTERNATIONAL')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                jurisdiction === 'INTERNATIONAL'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Prioritize Treaties (WIPO 2024, Nagoya), US FDA Botanical/DSHEA, EU THMPD 2004/24/EC"
            >
              <span>🌐</span>
              <span>INTERNATIONAL</span>
            </button>
          </div>

          {/* Language Selector */}
          <div className="flex items-center bg-stone-950 border border-stone-700/80 rounded-lg px-2 py-1">
            <span className="text-xs text-stone-400 mr-2 hidden sm:inline">Lang:</span>
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
              aria-label="Select Assistant Language"
              className="bg-transparent text-xs text-stone-200 font-medium focus:outline-none cursor-pointer"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="bg-stone-900 text-stone-100">
                  {l.native} ({l.label})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Navigation Sub-bar */}
      <div className="bg-stone-950/90 border-t border-stone-800/80 px-4 sm:px-6">
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
                    ? 'bg-stone-800 text-emerald-400 border-b-2 border-emerald-500 font-semibold'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-stone-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
