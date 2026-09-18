import React, { useState } from 'react';
import {
  Send,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  FileText,
  ExternalLink,
  ChevronRight,
  UserCheck,
  CheckCircle2,
  RefreshCw,
  Info,
} from 'lucide-react';
import { Jurisdiction, LanguageCode, StructuredRagAnswer, CitationCard, FormulationProfile } from '../types/index.ts';

interface AskAssistantProps {
  jurisdiction: Jurisdiction;
  language: LanguageCode;
  formulationProfile?: FormulationProfile;
  onOpenEscalate: () => void;
  onAddToChecklist: (items: string[]) => void;
  onNavigateToClassifier: () => void;
}

export const AskAssistant: React.FC<AskAssistantProps> = ({
  jurisdiction,
  language,
  formulationProfile,
  onOpenEscalate,
  onAddToChecklist,
  onNavigateToClassifier,
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeCitation, setActiveCitation] = useState<CitationCard | null>(null);
  const [conversation, setConversation] = useState<{
    id: string;
    query: string;
    jurisdiction: Jurisdiction;
    response: StructuredRagAnswer;
    timestamp: Date;
  }[]>([]);

  // Suggested questions for rapid testing & judging
  const suggestedQueries = [
    {
      title: 'Patentability of Classical Recipes',
      query: 'Can I patent an unmodified classical Ayurvedic Rasna Saptaka Kwatha formulation in India?',
      jurisdiction: 'INDIA' as Jurisdiction,
    },
    {
      title: 'Overcoming Section 3(e) Synergistic Admixture',
      query: 'How can our polyherbal formulation overcome Section 3(e) and 3(p) rejections with synergistic data?',
      jurisdiction: 'INDIA' as Jurisdiction,
    },
    {
      title: 'NBA Form III Approval Requirement',
      query: 'What are the legal requirements to obtain NBA approval under Section 6 before filing an Ayurvedic patent?',
      jurisdiction: 'INDIA' as Jurisdiction,
    },
    {
      title: 'Ayurveda Aahar Disease Claims',
      query: 'Can an Ayurveda Aahar product claim to alleviate joint inflammation or osteoarthritis?',
      jurisdiction: 'INDIA' as Jurisdiction,
    },
    {
      title: 'US Export: FDA Botanical vs DSHEA',
      query: 'What are the regulatory pathways to export our Ayurvedic joint wellness formulation to the United States?',
      jurisdiction: 'INTERNATIONAL' as Jurisdiction,
    },
    {
      title: 'Safe Abstention Test',
      query: 'Can you guarantee that my Ayurvedic patent application will be granted 100% by the controller?',
      jurisdiction: 'INDIA' as Jurisdiction,
    },
  ];

  const handleSend = async (questionText?: string) => {
    const q = questionText || query;
    if (!q.trim() || loading) return;

    setLoading(true);
    try {
      const res = await fetch('/api/rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          jurisdiction,
          language,
          formulationProfile,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to query RAG engine');
      }

      const data: StructuredRagAnswer = await res.json();
      setConversation((prev) => [
        {
          id: 'msg-' + Date.now(),
          query: q,
          jurisdiction,
          response: data,
          timestamp: new Date(),
        },
        ...prev,
      ]);
      setQuery('');
    } catch (err: any) {
      console.error(err);
      alert('Error querying assistant: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getGroundingBadge = (status: StructuredRagAnswer['groundingStatus']) => {
    if (status === 'Source Grounded') {
      return (
        <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Source Grounded (High Confidence)
        </span>
      );
    } else if (status === 'Partially Grounded') {
      return (
        <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-300">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          Partially Grounded
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-rose-300">
          <Info className="w-3.5 h-3.5 text-rose-600" />
          Insufficient Authoritative Evidence (Safe Abstention)
        </span>
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Active Regime & Formulation Context Banner */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${
              jurisdiction === 'INDIA' ? 'bg-emerald-500 ring-4 ring-emerald-100' : 'bg-blue-500 ring-4 ring-blue-100'
            }`}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Active Jurisdiction:</span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded ${
                  jurisdiction === 'INDIA'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-blue-100 text-blue-800 border border-blue-200'
                }`}
              >
                {jurisdiction === 'INDIA' ? '🇮🇳 INDIA STATUTORY REGIME' : '🌐 INTERNATIONAL REGIME'}
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              {jurisdiction === 'INDIA'
                ? 'Retrieval strictly bound to Indian Patents Act 1970, Drugs & Cosmetics Act 1940, Biological Diversity Act 2002, FSSAI & TKDL'
                : 'Retrieval bound to WIPO 2024 Treaties, Nagoya Protocol, US FDA Botanical / DSHEA, and EU THMPD 2004/24/EC'}
            </p>
          </div>
        </div>

        {/* Formulation Profile Status Pill */}
        <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs">
          <span className="text-stone-500 font-medium">Context Formulation:</span>
          {formulationProfile ? (
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {formulationProfile.productName || 'Active Formulation'}
            </span>
          ) : (
            <button
              onClick={onNavigateToClassifier}
              className="text-emerald-600 font-medium hover:underline flex items-center gap-1"
            >
              <span>None configured (Click to classify)</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Suggested Quick Inquiries */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Judging Scenarios & Authoritative Queries ({jurisdiction})
          </span>
          <span className="text-xs text-stone-400">Click any query to run instant RAG analysis</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {suggestedQueries
            .filter((sq) => sq.jurisdiction === jurisdiction || sq.title.includes('Safe Abstention'))
            .map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(item.query);
                  handleSend(item.query);
                }}
                className="text-left p-3 rounded-lg bg-stone-50 hover:bg-emerald-50/60 border border-stone-200 hover:border-emerald-300 transition text-xs shadow-2xs group"
              >
                <div className="font-semibold text-stone-800 group-hover:text-emerald-800 mb-1 flex items-center justify-between">
                  <span>{item.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition" />
                </div>
                <p className="text-stone-500 line-clamp-2 text-[11px]">{item.query}</p>
              </button>
            ))}
        </div>
      </div>

      {/* Query Input Box */}
      <div className="bg-white rounded-xl border border-stone-300 shadow-sm p-3 mb-8 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 transition">
        <div className="flex items-start gap-2">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={`Ask an Ayurvedic IP or regulatory question in ${jurisdiction} regime... (e.g. "Can I patent our standardized Shallaki extract with bio-enhancer?")`}
            rows={2}
            className="w-full resize-none text-sm text-stone-800 placeholder-stone-400 focus:outline-none bg-transparent"
          />
          <button
            onClick={() => handleSend()}
            disabled={!query.trim() || loading}
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition shrink-0 ${
              !query.trim() || loading
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm'
            }`}
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Grounding...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Ask Sahayak</span>
              </>
            )}
          </button>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[11px] text-stone-400">
          <span>Retrieves directly from Parliament acts, IP India manuals, FSSAI rules, NBA guidelines, and WIPO treaties.</span>
          <span>Shift + Enter for new line</span>
        </div>
      </div>

      {/* Conversation / Results Feed */}
      <div className="space-y-6">
        {conversation.map((entry) => {
          const resp = entry.response;
          return (
            <div
              key={entry.id}
              className="bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden transition"
            >
              {/* Question Header */}
              <div className="bg-stone-50 border-b border-stone-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-700 shrink-0 mt-0.5">
                    Q
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900">{entry.query}</h3>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                      <span>Jurisdiction: <strong>{entry.jurisdiction}</strong></span>
                      <span>•</span>
                      <span>{entry.timestamp.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {getGroundingBadge(resp.groundingStatus)}
                </div>
              </div>

              {/* Structured Response Body */}
              <div className="p-6 space-y-6 text-stone-800">
                {/* 1. Direct Answer */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    1. Direct Regulatory & IP Assessment
                  </h4>
                  <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-4 text-sm leading-relaxed text-emerald-950 font-medium">
                    {resp.directAnswer}
                  </div>
                </div>

                {/* 2. Why this applies (Statutory Basis) */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-stone-500" />
                    2. Why This Applies (Authoritative Legal Rationale)
                  </h4>
                  <div className="bg-stone-50 rounded-xl p-4 text-sm leading-relaxed text-stone-700 border border-stone-200">
                    {resp.whyApplies}
                  </div>
                </div>

                {/* 3. Inferred Product / Formulation Classification */}
                {resp.formulationClassification && (
                  <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-950 flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold uppercase tracking-wide text-amber-800 mr-2">
                        Product Classification:
                      </span>
                      <span>{resp.formulationClassification}</span>
                    </div>
                    <button
                      onClick={onNavigateToClassifier}
                      className="text-amber-800 hover:text-amber-900 underline font-semibold shrink-0"
                    >
                      Audit Details →
                    </button>
                  </div>
                )}

                {/* 4. IP Implications Grid */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-stone-500" />
                    3. Intellectual Property Implications
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs">
                      <span className="font-bold text-stone-900 block mb-1 text-emerald-800">
                        Patentability & Novelty:
                      </span>
                      <p className="text-stone-700 leading-relaxed">{resp.ipImplications.patentability}</p>
                    </div>

                    <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs">
                      <span className="font-bold text-stone-900 block mb-1 text-amber-800">
                        Traditional Knowledge Hurdle (TKDL):
                      </span>
                      <p className="text-stone-700 leading-relaxed">
                        {resp.ipImplications.traditionalKnowledgeHurdle}
                      </p>
                    </div>

                    <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs">
                      <span className="font-bold text-stone-900 block mb-1 text-blue-800">
                        Trademark & Brand Monopoly:
                      </span>
                      <p className="text-stone-700 leading-relaxed">{resp.ipImplications.trademarkAndBranding}</p>
                    </div>

                    <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs">
                      <span className="font-bold text-stone-900 block mb-1 text-purple-800">
                        Trade Secrets / Other IP:
                      </span>
                      <p className="text-stone-700 leading-relaxed">
                        {resp.ipImplications.otherIP ||
                          'Trade Secrets recommended for proprietary extraction temperatures and masking formulas.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 5. Regulatory & ABS/TK Considerations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-stone-200 rounded-xl p-4 bg-stone-50">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Drug / Food Regulatory Pathway
                    </h5>
                    <p className="text-xs text-stone-600 leading-relaxed whitespace-pre-line">
                      {resp.regulatoryImplications}
                    </p>
                  </div>

                  <div className="border border-stone-200 rounded-xl p-4 bg-stone-50">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      ABS & Biodiversity Compliance
                    </h5>
                    <p className="text-xs text-stone-600 leading-relaxed">{resp.absTkConsiderations}</p>
                  </div>
                </div>

                {/* 6. Recommended Next Actions */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                      <ChevronRight className="w-4 h-4 text-emerald-600" />
                      4. Recommended Action Items
                    </h4>
                    <button
                      onClick={() => onAddToChecklist(resp.recommendedNextActions)}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
                    >
                      <span>+ Export to Action Checklist</span>
                    </button>
                  </div>
                  <ul className="space-y-1.5">
                    {resp.recommendedNextActions.map((action, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-stone-700 flex items-start gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200"
                      >
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 7. Verified Public Citations & Evidence Cards */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2 flex items-center justify-between">
                    <span>5. Verified Authoritative Citations & Public Evidence ({resp.citations.length})</span>
                    <span className="text-[11px] font-normal text-stone-400">
                      Tier 1 Primary Statutes & Treaties prioritized
                    </span>
                  </h4>

                  {resp.citations.length === 0 ? (
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs text-stone-500 italic">
                      No matching authoritative citations found in corpus for this query. Safe abstention applied.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {resp.citations.map((cit) => (
                        <div
                          key={cit.id}
                          onClick={() => setActiveCitation(cit)}
                          className="p-3.5 rounded-xl border border-stone-200 bg-white hover:border-emerald-400 hover:shadow-sm transition cursor-pointer text-left group"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                              {cit.section}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                cit.tier === 1
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              Tier {cit.tier} Source
                            </span>
                          </div>
                          <div className="text-xs font-bold text-stone-900 group-hover:text-emerald-700 mb-1">
                            {cit.documentTitle}
                          </div>
                          <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                            {cit.snippet}
                          </p>
                          <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400">
                            <span className="truncate max-w-[180px]">{cit.authority}</span>
                            <span className="text-emerald-600 font-semibold group-hover:underline flex items-center gap-0.5">
                              Inspect Evidence <ExternalLink className="w-2.5 h-2.5" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 8. Uncertainty & Escalation Banner */}
                <div className="border-t border-stone-200 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs bg-stone-50/70 -mx-6 -mb-6 px-6 py-4 rounded-b-2xl">
                  <div className="text-stone-500 max-w-2xl">
                    <span className="font-semibold text-stone-700">Legal Uncertainty Advisory: </span>
                    {resp.uncertaintyAndEscalation}
                  </div>
                  <button
                    onClick={onOpenEscalate}
                    className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-3 py-1.5 rounded-lg shadow-sm transition"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Escalate to Ayush IP Facilitator</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Citation Inspector Drawer / Modal */}
      {activeCitation && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl border border-stone-300">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Authoritative Evidence Record
                </span>
                <h3 className="text-base font-bold text-stone-900 mt-0.5">
                  {activeCitation.documentTitle}
                </h3>
              </div>
              <button
                onClick={() => setActiveCitation(null)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-stone-50 p-3 rounded-xl border border-stone-200">
                <div>
                  <span className="text-stone-400 block text-[10px]">Statutory Section / Rule</span>
                  <span className="font-bold text-stone-800">{activeCitation.section}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Issuing Authority</span>
                  <span className="font-semibold text-stone-800">{activeCitation.authority}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Authority Tier</span>
                  <span className="font-semibold text-stone-800">Tier {activeCitation.tier} (Primary Public Authority)</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Effective Date</span>
                  <span className="font-semibold text-stone-800">{activeCitation.effectiveDate || 'Enacted Law'}</span>
                </div>
              </div>

              <div>
                <span className="text-stone-500 font-bold block mb-1">Official Statutory / Regulatory Text Excerpt:</span>
                <div className="bg-stone-900 text-stone-100 p-4 rounded-xl font-mono text-[11px] leading-relaxed max-h-48 overflow-y-auto border border-stone-800">
                  {activeCitation.snippet}
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between gap-3">
                <div className="truncate">
                  <span className="text-[10px] text-emerald-700 font-bold block">Document Integrity Hash:</span>
                  <code className="text-[10px] text-stone-600 truncate">{activeCitation.checksum}</code>
                </div>
                <a
                  href={activeCitation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-3 py-1.5 rounded text-xs shrink-0 transition"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setActiveCitation(null)}
                className="px-4 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs"
              >
                Close Evidence Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
