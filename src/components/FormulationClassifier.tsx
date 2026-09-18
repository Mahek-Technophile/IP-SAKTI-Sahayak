import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileCheck,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { FormulationProfile, ClassificationResult } from '../types/index.ts';
import { classifyAyurvedaFormulation } from '../utils/formulationClassifier.ts';

interface FormulationClassifierProps {
  onProfileUpdated: (profile: FormulationProfile) => void;
  onNavigateToAssistant: () => void;
  onAddToChecklist: (items: string[]) => void;
  currentProfile?: FormulationProfile;
}

export const FormulationClassifier: React.FC<FormulationClassifierProps> = ({
  onProfileUpdated,
  onNavigateToAssistant,
  onAddToChecklist,
  currentProfile,
}) => {
  const [profile, setProfile] = useState<FormulationProfile>(
    currentProfile || {
      productName: 'Arthrosoul Joint Wellness Extract',
      classicalTextBasis: true,
      classicalTextName: 'Sharangadhara Samhita (Rasna Saptaka Kwatha)',
      exactClassicalTraceable: false,
      modificationsMade: true,
      modificationDescription:
        'Added standardized supercritical Boswellia serrata extract (Shallaki 65% boswellic acids) and Piper nigrum (Maricha bio-enhancer).',
      novelProcessElement: true,
      processDescription:
        'Standardized supercritical carbon dioxide (scCO2) fluid extraction combined with ultrasound-assisted cell disruption.',
      intendedUse: 'Therapeutic Treatment',
      marketingCategoryTarget: 'Ayurvedic Proprietary Medicine (Sec 3(h))',
      biologicalResources: [
        'Boswellia serrata (Shallaki gum resin)',
        'Piper nigrum (Maricha fruits)',
        'Pluchea lanceolata (Rasna root)',
        'Ricinus communis (Eranda)',
      ],
      sourceLocation: 'Wild harvested from Satpura forest range, Madhya Pradesh',
      isEntityForeignStake: false,
      targetMarkets: ['India', 'USA', 'European Union'],
    }
  );

  const [classification, setClassification] = useState<ClassificationResult>(
    classifyAyurvedaFormulation(profile)
  );

  const updateProfile = (partial: Partial<FormulationProfile>) => {
    const updated = { ...profile, ...partial };
    setProfile(updated);
    const result = classifyAyurvedaFormulation(updated);
    setClassification(result);
    onProfileUpdated(updated);
  };

  // Quick Archetype Presets
  const loadPreset = (presetName: 'classical' | 'proprietary' | 'aahar' | 'phyto') => {
    let preset: FormulationProfile;
    if (presetName === 'classical') {
      preset = {
        productName: 'Chyawanprash Avaleha Classical',
        classicalTextBasis: true,
        classicalTextName: 'Charaka Samhita Chikitsa Sthana Chapter 1',
        exactClassicalTraceable: true,
        modificationsMade: false,
        novelProcessElement: false,
        intendedUse: 'Therapeutic Treatment',
        marketingCategoryTarget: 'Classical Ayurvedic Drug (Sec 3(a))',
        biologicalResources: ['Emblica officinalis (Amla)', 'Withania somnifera', 'Piper longum'],
        sourceLocation: 'Cultivated farm sources, Gujarat and Maharashtra',
        isEntityForeignStake: false,
        targetMarkets: ['India'],
      };
    } else if (presetName === 'aahar') {
      preset = {
        productName: 'Ojas Vitality Herbal Health Drink',
        classicalTextBasis: true,
        classicalTextName: 'Bhavaprakasha Nighantu (Ahara Varga)',
        exactClassicalTraceable: false,
        modificationsMade: true,
        modificationDescription: 'Blended with natural jaggery and roasted barley in ready-to-drink format.',
        novelProcessElement: false,
        intendedUse: 'Food & Dietary Supplement',
        marketingCategoryTarget: 'Ayurveda Aahar (Nutraceutical)',
        biologicalResources: ['Hordeum vulgare (Yava)', 'Glycyrrhiza glabra (Yashtimadhu)'],
        sourceLocation: 'Commercial cultivation, Rajasthan',
        isEntityForeignStake: false,
        targetMarkets: ['India'],
      };
    } else if (presetName === 'phyto') {
      preset = {
        productName: 'Standardized Withanolide Botanical Fraction',
        classicalTextBasis: true,
        classicalTextName: 'Charaka Samhita',
        exactClassicalTraceable: false,
        modificationsMade: true,
        modificationDescription: 'Isolated fraction containing 4 standardized withanolide biomarkers (>5.5% w/w).',
        novelProcessElement: true,
        processDescription: 'Standardized chromatographic fraction with defined chemical marker fingerprinting.',
        intendedUse: 'Therapeutic Treatment',
        marketingCategoryTarget: 'Phytopharmaceutical Drug',
        biologicalResources: ['Withania somnifera (Ashwagandha roots)'],
        sourceLocation: 'Cultivated certified organic farms, Neemuch MP',
        isEntityForeignStake: false,
        targetMarkets: ['India', 'USA'],
      };
    } else {
      // HerbNova Proprietary
      preset = {
        productName: 'HerbNova Arthrosoul Joint Extract',
        classicalTextBasis: true,
        classicalTextName: 'Sharangadhara Samhita (Rasna Saptaka Kwatha)',
        exactClassicalTraceable: false,
        modificationsMade: true,
        modificationDescription: 'Added supercritical Shallaki extract and Maricha bio-enhancer to classical Rasna base.',
        novelProcessElement: true,
        processDescription: 'Supercritical CO2 extraction with ultrasound cell disruption.',
        intendedUse: 'Therapeutic Treatment',
        marketingCategoryTarget: 'Ayurvedic Proprietary Medicine (Sec 3(h))',
        biologicalResources: ['Boswellia serrata', 'Piper nigrum', 'Pluchea lanceolata'],
        sourceLocation: 'Wild harvested from forest lands, Madhya Pradesh',
        isEntityForeignStake: false,
        targetMarkets: ['India', 'USA', 'European Union'],
      };
    }
    setProfile(preset);
    const result = classifyAyurvedaFormulation(preset);
    setClassification(result);
    onProfileUpdated(preset);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header & Presets */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-stone-900 font-serif">
            Ayurveda Formulation Classification Engine
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            10-Factor Guided Assessment under the Drugs and Cosmetics Act 1940, FSSAI 2022, and Indian Patents Act 1970
          </p>
        </div>

        {/* Quick Archetype Presets */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-lg text-xs">
          <span className="text-stone-500 font-medium px-2 hidden sm:inline">Load Preset:</span>
          <button
            onClick={() => loadPreset('proprietary')}
            className={`px-2.5 py-1 rounded font-medium transition ${
              profile.productName.includes('Arthrosoul')
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            HerbNova (Proprietary)
          </button>
          <button
            onClick={() => loadPreset('classical')}
            className={`px-2.5 py-1 rounded font-medium transition ${
              profile.productName.includes('Classical')
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            Classical (Sec 3(a))
          </button>
          <button
            onClick={() => loadPreset('aahar')}
            className={`px-2.5 py-1 rounded font-medium transition ${
              profile.productName.includes('Ojas')
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            Ayurveda Aahar
          </button>
          <button
            onClick={() => loadPreset('phyto')}
            className={`px-2.5 py-1 rounded font-medium transition ${
              profile.productName.includes('Withanolide')
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            Phytopharmaceutical
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 10-Point Guided Input Flow */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-4">
            <h3 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-2 flex items-center justify-between">
              <span>Guided Formulation Questionnaire</span>
              <span className="text-[11px] font-normal text-stone-400">Minimal required factors</span>
            </h3>

            {/* Product Name */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                1. Product / Formulation Name
              </label>
              <input
                type="text"
                value={profile.productName}
                onChange={(e) => updateProfile({ productName: e.target.value })}
                className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. Arthrosoul Joint Extract"
              />
            </div>

            {/* Intended Use (Crucial for Food vs Drug vs Cosmetic) */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                2. Intended Commercial & Regulatory Use
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'Therapeutic Treatment', label: 'Therapeutic Medicine (Drug)' },
                  { id: 'Food & Dietary Supplement', label: 'Food / Supplement (Ayurveda Aahar)' },
                  { id: 'Cosmetic', label: 'Cosmetic (Saundarya Prasadaka)' },
                  { id: 'General Wellness', label: 'General Wellness' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => updateProfile({ intendedUse: item.id as any })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-medium transition ${
                      profile.intendedUse === item.id
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Classical Text Derivation */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700">
                3. Classical Text Derivation (First Schedule Books)
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => updateProfile({ classicalTextBasis: true })}
                  className={`flex-1 p-2 rounded-lg text-xs font-semibold border ${
                    profile.classicalTextBasis
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : 'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  Yes, derived from Classical Text
                </button>
                <button
                  onClick={() => updateProfile({ classicalTextBasis: false, exactClassicalTraceable: false })}
                  className={`flex-1 p-2 rounded-lg text-xs font-semibold border ${
                    !profile.classicalTextBasis
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : 'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  No, entirely non-classical
                </button>
              </div>

              {profile.classicalTextBasis && (
                <input
                  type="text"
                  value={profile.classicalTextName || ''}
                  onChange={(e) => updateProfile({ classicalTextName: e.target.value })}
                  placeholder="Specify Classical Text (e.g. Sharangadhara Samhita, Charaka Samhita)"
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-800 focus:outline-none"
                />
              )}
            </div>

            {/* Exact Classical Recipe vs Modified */}
            {profile.classicalTextBasis && (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-stone-700">
                  4. Is exact recipe & method traceable without any modification?
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateProfile({ exactClassicalTraceable: true, modificationsMade: false })}
                    className={`flex-1 p-2 rounded-lg text-xs font-semibold border ${
                      profile.exactClassicalTraceable
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    Exact Classical Recipe (100%)
                  </button>
                  <button
                    onClick={() => updateProfile({ exactClassicalTraceable: false, modificationsMade: true })}
                    className={`flex-1 p-2 rounded-lg text-xs font-semibold border ${
                      !profile.exactClassicalTraceable
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    Modified / New Ingredients Added
                  </button>
                </div>

                {profile.modificationsMade && (
                  <textarea
                    rows={2}
                    value={profile.modificationDescription || ''}
                    onChange={(e) => updateProfile({ modificationDescription: e.target.value })}
                    placeholder="Describe modifications (e.g., added bio-enhancer, altered ratio, new excipients)"
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-800 focus:outline-none"
                  />
                )}
              </div>
            )}

            {/* Novel Process / Extraction Element */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700">
                5. Is there a novel manufacturing / extraction / technological process?
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => updateProfile({ novelProcessElement: true })}
                  className={`flex-1 p-2 rounded-lg text-xs font-semibold border ${
                    profile.novelProcessElement
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : 'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  Yes (e.g. CO2 extraction, ultrasound)
                </button>
                <button
                  onClick={() => updateProfile({ novelProcessElement: false })}
                  className={`flex-1 p-2 rounded-lg text-xs font-semibold border ${
                    !profile.novelProcessElement
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : 'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  Standard Classical Boiling/Processing
                </button>
              </div>

              {profile.novelProcessElement && (
                <input
                  type="text"
                  value={profile.processDescription || ''}
                  onChange={(e) => updateProfile({ processDescription: e.target.value })}
                  placeholder="Describe technical process element (e.g. Supercritical CO2 at 45°C, 250 bar)"
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-800 focus:outline-none"
                />
              )}
            </div>

            {/* Biological Resources & Sourcing */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700">
                6. Biological Resources & Geographical Sourcing
              </label>
              <input
                type="text"
                value={profile.biologicalResources.join(', ')}
                onChange={(e) =>
                  updateProfile({
                    biologicalResources: e.target.value.split(',').map((s) => s.trim()),
                  })
                }
                placeholder="Botanical species (e.g. Boswellia serrata, Piper nigrum)"
                className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-800 focus:outline-none"
              />
              <input
                type="text"
                value={profile.sourceLocation}
                onChange={(e) => updateProfile({ sourceLocation: e.target.value })}
                placeholder="Procurement source (e.g. Wild harvested from forest, MP vs Cultivated farm, Kerala)"
                className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-800 focus:outline-none"
              />
            </div>

            {/* Foreign Ownership / Equity Flag */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                7. Entity Foreign Ownership / Equity under BD Act Section 3(2)
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => updateProfile({ isEntityForeignStake: false })}
                  className={`flex-1 p-2 rounded-lg text-xs font-semibold border ${
                    !profile.isEntityForeignStake
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : 'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  100% Indian Owned / Managed
                </button>
                <button
                  onClick={() => updateProfile({ isEntityForeignStake: true })}
                  className={`flex-1 p-2 rounded-lg text-xs font-semibold border ${
                    profile.isEntityForeignStake
                      ? 'bg-rose-600 text-white border-rose-700'
                      : 'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  Foreign Stake / NRI / Foreign Entity (NBA Form I Trigger)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Transparent Classification Result */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-md p-6 space-y-5 sticky top-24">
            {/* Category Outcome Pill */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                Identified Regulatory Category
              </span>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-emerald-900 font-serif">
                  {classification.category}
                </h3>
                <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                  Confidence: {classification.confidence}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1 font-mono">{classification.statutoryBasis}</p>
            </div>

            {/* Legal & Regulatory Reasoning */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Statutory Classification Rationale</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {classification.reasoning.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      •
                    </span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applicable Regulatory & IP Pathways */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-100">
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs">
                <span className="font-bold text-stone-900 block mb-1 text-emerald-800">
                  Regulatory Licensing Pathway:
                </span>
                <ul className="space-y-1 text-[11px] text-stone-600">
                  {classification.applicableRegulatoryPathways.map((p, i) => (
                    <li key={i}>• {p}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs">
                <span className="font-bold text-stone-900 block mb-1 text-blue-800">
                  Applicable IP Pathway:
                </span>
                <ul className="space-y-1 text-[11px] text-stone-600">
                  {classification.applicableIPPathways.map((p, i) => (
                    <li key={i}>• {p}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Information Still Required / Gaps */}
            {classification.informationStillRequired.length > 0 && (
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-950">
                <span className="font-bold uppercase tracking-wider text-amber-800 block mb-1 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Information Still Required / Gaps
                </span>
                <ul className="space-y-1 text-[11px] text-amber-900 list-disc list-inside">
                  {classification.informationStillRequired.map((gap, i) => (
                    <li key={i}>{gap}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Relevant Authoritative Evidence Cards */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                Retrieved Statutory Authority Evidence ({classification.relevantEvidence.length})
              </span>
              <div className="space-y-2">
                {classification.relevantEvidence.map((ev, idx) => (
                  <div key={idx} className="bg-stone-50 p-2.5 rounded-lg border border-stone-200 text-xs">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-stone-800">{ev.section}</span>
                      <a
                        href={ev.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 hover:underline flex items-center gap-0.5 text-[10px]"
                      >
                        Portal <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                    <p className="text-[11px] text-stone-600 line-clamp-2">{ev.snippet}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mandatory Informational Disclaimer */}
            <div className="text-[10px] text-stone-400 border-t border-stone-200 pt-2 leading-relaxed italic">
              {classification.disclaimer}
            </div>

            {/* Next Steps CTA Buttons */}
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={onNavigateToAssistant}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <span>Query IP Implications in Assistant</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() =>
                  onAddToChecklist([
                    ...classification.applicableRegulatoryPathways,
                    ...classification.applicableIPPathways,
                  ])
                }
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold py-2.5 px-3 rounded-xl transition"
              >
                Export to Checklist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
