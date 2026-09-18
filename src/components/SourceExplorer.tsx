import React, { useState } from 'react';
import { Search, Filter, ExternalLink, ShieldCheck, Check, Copy } from 'lucide-react';
import { AUTHORITATIVE_CORPUS } from '../data/authoritativeCorpus.ts';
import { AuthoritativeDocument, Jurisdiction } from '../types/index.ts';

interface SourceExplorerProps {
  currentJurisdiction: Jurisdiction;
}

export const SourceExplorer: React.FC<SourceExplorerProps> = ({ currentJurisdiction }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('ALL');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [selectedDoc, setSelectedDoc] = useState<AuthoritativeDocument | null>(
    AUTHORITATIVE_CORPUS[0] || null
  );
  const [copiedHash, setCopiedHash] = useState(false);

  // Filter corpus
  const filteredDocs = AUTHORITATIVE_CORPUS.filter((doc) => {
    // Jurisdiction filter
    if (selectedJurisdiction !== 'ALL') {
      if (doc.jurisdiction !== selectedJurisdiction && doc.jurisdiction !== 'BOTH') {
        return false;
      }
    }

    // Tier filter
    if (selectedTier !== 'ALL') {
      if (doc.tier.toString() !== selectedTier) return false;
    }

    // Text search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        doc.title.toLowerCase().includes(q) ||
        doc.sectionOrRule.toLowerCase().includes(q) ||
        doc.issuingAuthority.toLowerCase().includes(q) ||
        doc.text.toLowerCase().includes(q) ||
        doc.keywords.some((k) => k.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  const handleCopyChecksum = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 font-serif">
            Authoritative Public-Source Corpus Explorer
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Curated, versioned primary legislation, official gazettes, treaties, and pharmacopoeial frameworks with SHA256 integrity validation
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{AUTHORITATIVE_CORPUS.length} Verified Documents in Corpus</span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 flex flex-wrap items-center justify-between gap-3">
        {/* Search input */}
        <div className="flex items-center gap-2 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-stone-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search statutes, rules, section numbers (e.g. 3(p), Section 6, THMPD, FSSAI)..."
            className="w-full bg-transparent text-stone-800 placeholder-stone-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-stone-400 hover:text-stone-600 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Jurisdiction select */}
          <div className="flex items-center gap-1.5 text-xs bg-stone-50 border border-stone-300 rounded-xl px-2.5 py-1.5">
            <span className="text-stone-400 font-medium">Regime:</span>
            <select
              value={selectedJurisdiction}
              onChange={(e) => setSelectedJurisdiction(e.target.value)}
              className="bg-transparent font-semibold text-stone-800 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Regimes</option>
              <option value="INDIA">India Statutory</option>
              <option value="INTERNATIONAL">International Treaties/Regulators</option>
            </select>
          </div>

          {/* Tier select */}
          <div className="flex items-center gap-1.5 text-xs bg-stone-50 border border-stone-300 rounded-xl px-2.5 py-1.5">
            <span className="text-stone-400 font-medium">Authority Tier:</span>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="bg-transparent font-semibold text-stone-800 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Tiers</option>
              <option value="1">Tier 1: Primary Legislation & Treaties</option>
              <option value="2">Tier 2: Official Rules & Regulations</option>
              <option value="3">Tier 3: Institutional Manuals & Guidelines</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Corpus Grid: List on Left, Inspection Drawer on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Document List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[75vh] overflow-y-auto pr-1">
          <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
            Showing {filteredDocs.length} Authoritative Documents
          </div>
          {filteredDocs.map((doc) => {
            const isSelected = selectedDoc?.id === doc.id;
            return (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-3.5 rounded-xl border transition cursor-pointer text-left ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-800 shadow-md ring-2 ring-emerald-500/50'
                    : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-200 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {doc.sectionOrRule}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        doc.jurisdiction === 'INDIA'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {doc.jurisdiction}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        doc.tier === 1
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      Tier {doc.tier}
                    </span>
                  </div>
                </div>

                <div className={`text-xs font-bold ${isSelected ? 'text-emerald-300' : 'text-stone-900'}`}>
                  {doc.title}
                </div>
                <div
                  className={`text-[11px] truncate mt-0.5 ${
                    isSelected ? 'text-stone-400' : 'text-stone-500'
                  }`}
                >
                  {doc.issuingAuthority}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Full Document Inspector */}
        <div className="lg:col-span-7">
          {selectedDoc ? (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-md p-6 space-y-5 sticky top-24">
              {/* Document Header */}
              <div className="border-b border-stone-100 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    {selectedDoc.sectionOrRule}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-stone-400">ID: {selectedDoc.id}</span>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                      Tier {selectedDoc.tier} Source
                    </span>
                  </div>
                </div>
                <h3 className="text-base font-bold text-stone-900 font-serif">{selectedDoc.title}</h3>
                <p className="text-xs text-stone-500 mt-1">{selectedDoc.issuingAuthority}</p>
              </div>

              {/* Metadata Attributes Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200 text-[11px]">
                <div>
                  <span className="text-stone-400 block text-[10px]">Jurisdiction</span>
                  <span className="font-bold text-stone-800">{selectedDoc.jurisdiction}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Doc Type</span>
                  <span className="font-semibold text-stone-800">{selectedDoc.docType}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Effective Date</span>
                  <span className="font-semibold text-stone-800">{selectedDoc.effectiveDate}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Version</span>
                  <span className="font-semibold text-stone-800 truncate block">{selectedDoc.version}</span>
                </div>
              </div>

              {/* Core Legal Summary */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  Core Legal Principle:
                </span>
                <p className="text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-200 leading-relaxed font-medium">
                  {selectedDoc.summary}
                </p>
              </div>

              {/* Full Text Excerpt */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  Official Statutory Text Excerpt:
                </span>
                <div className="bg-stone-950 text-stone-100 p-4 rounded-xl font-mono text-[11px] leading-relaxed border border-stone-800 max-h-56 overflow-y-auto">
                  {selectedDoc.text}
                </div>
              </div>

              {/* Integrity & Government Portal Links */}
              <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-stone-400 font-mono">SHA256:</span>
                  <button
                    onClick={() => handleCopyChecksum(selectedDoc.checksum)}
                    className="font-mono text-[10px] text-stone-600 hover:text-stone-900 bg-stone-100 px-2 py-1 rounded flex items-center gap-1 transition"
                    title="Click to copy SHA256 checksum"
                  >
                    <span>{selectedDoc.checksum.substring(0, 16)}...</span>
                    {copiedHash ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3 text-stone-400" />
                    )}
                  </button>
                </div>

                <a
                  href={selectedDoc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-3.5 py-1.5 rounded-lg transition text-xs shadow-xs"
                >
                  <span>Open Official Government Document</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-400 text-xs">
              Select a document from the corpus list on the left to inspect its statutory text and metadata.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
