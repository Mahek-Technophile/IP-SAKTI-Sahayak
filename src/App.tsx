import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { AskAssistant } from './components/AskAssistant.tsx';
import { FormulationClassifier } from './components/FormulationClassifier.tsx';
import { IPNavigator } from './components/IPNavigator.tsx';
import { AbsModule } from './components/AbsModule.tsx';
import { SourceExplorer } from './components/SourceExplorer.tsx';
import { ActionChecklist } from './components/ActionChecklist.tsx';
import { EvaluationDashboard } from './components/EvaluationDashboard.tsx';
import { EscalationModal } from './components/EscalationModal.tsx';
import { ScenarioDrawer } from './components/ScenarioDrawer.tsx';
import { Jurisdiction, LanguageCode, FormulationProfile, ActionChecklistItem } from './types/index.ts';

export default function App() {
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>('INDIA');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [activeTab, setActiveTab] = useState<string>('assistant');
  const [isEscalateOpen, setIsEscalateOpen] = useState<boolean>(false);
  const [isScenarioOpen, setIsScenarioOpen] = useState<boolean>(false);

  // Active formulation profile context
  const [currentProfile, setCurrentProfile] = useState<FormulationProfile>({
    productName: 'Arthrosoul Joint Wellness Extract',
    classicalTextBasis: true,
    classicalTextName: 'Sharangadhara Samhita (Rasna Saptaka Kwatha)',
    exactClassicalTraceable: false,
    modificationsMade: true,
    modificationDescription:
      'Added standardized supercritical Boswellia serrata extract (Shallaki 65% AKBA) and Piper nigrum (piperine bio-enhancer).',
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
  });

  // Action checklist store
  const [checklistItems, setChecklistItems] = useState<ActionChecklistItem[]>([]);

  const handleAddToChecklist = (newActions: string[]) => {
    const formatted: ActionChecklistItem[] = newActions
      .filter((action) => action && action.trim().length > 0)
      .map((action, i) => ({
        id: 'user-chk-' + Date.now() + '-' + i,
        issue: 'Action Item from Assistant / Classifier',
        action: action,
        authority: jurisdiction === 'INDIA' ? 'Ayush Licensing / CGPDTM / NBA' : 'US FDA / EMA / WIPO',
        requiredDocument: 'Compliance dossier & verified experimental proof',
        sourceCitation: jurisdiction === 'INDIA' ? 'Indian Statutory Framework' : 'International Regulatory Framework',
        status: 'pending',
        priority: 'high',
        deadlineInfo: 'As recommended in assessment',
      }));

    setChecklistItems((prev) => [...prev, ...formatted]);
    setActiveTab('checklist');
  };

  const handleApplyHerbNovaScenario = () => {
    const herbNovaProfile: FormulationProfile = {
      productName: 'HerbNova Arthrosoul Joint Extract',
      classicalTextBasis: true,
      classicalTextName: 'Sharangadhara Samhita (Rasna Saptaka Kwatha)',
      exactClassicalTraceable: false,
      modificationsMade: true,
      modificationDescription:
        'Added supercritical Shallaki extract and Maricha bio-enhancer to classical Rasna Saptaka Kwatha decoction base.',
      novelProcessElement: true,
      processDescription:
        'Supercritical fluid CO2 extraction at 45°C, 250 bar with ultrasound cell disruption.',
      intendedUse: 'Therapeutic Treatment',
      marketingCategoryTarget: 'Ayurvedic Proprietary Medicine (Sec 3(h))',
      biologicalResources: [
        'Boswellia serrata (Shallaki)',
        'Piper nigrum (Maricha)',
        'Pluchea lanceolata (Rasna)',
      ],
      sourceLocation: 'Wild harvested from forest lands, Madhya Pradesh',
      isEntityForeignStake: false,
      targetMarkets: ['India', 'USA', 'European Union'],
    };

    setCurrentProfile(herbNovaProfile);
    setActiveTab('classifier');
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Sticky Global Navigation & Header */}
      <Header
        jurisdiction={jurisdiction}
        onJurisdictionChange={setJurisdiction}
        language={language}
        onLanguageChange={setLanguage}
        onLoadHerbNova={() => setIsScenarioOpen(true)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-16">
        {activeTab === 'assistant' && (
          <AskAssistant
            jurisdiction={jurisdiction}
            language={language}
            formulationProfile={currentProfile}
            onOpenEscalate={() => setIsEscalateOpen(true)}
            onAddToChecklist={handleAddToChecklist}
            onNavigateToClassifier={() => setActiveTab('classifier')}
          />
        )}

        {activeTab === 'classifier' && (
          <FormulationClassifier
            currentProfile={currentProfile}
            onProfileUpdated={setCurrentProfile}
            onNavigateToAssistant={() => setActiveTab('assistant')}
            onAddToChecklist={handleAddToChecklist}
          />
        )}

        {activeTab === 'ip-navigator' && (
          <IPNavigator
            jurisdiction={jurisdiction}
            onNavigateToAssistant={(query) => {
              setActiveTab('assistant');
            }}
            onAddToChecklist={handleAddToChecklist}
          />
        )}

        {activeTab === 'abs-tk' && (
          <AbsModule onAddToChecklist={handleAddToChecklist} />
        )}

        {activeTab === 'corpus' && (
          <SourceExplorer currentJurisdiction={jurisdiction} />
        )}

        {activeTab === 'checklist' && (
          <ActionChecklist initialItems={checklistItems.length > 0 ? checklistItems : undefined} />
        )}

        {activeTab === 'evaluation' && (
          <EvaluationDashboard />
        )}
      </main>

      {/* Footer with Statutory Disclaimers */}
      <footer className="bg-stone-900 text-stone-400 text-xs py-8 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-bold text-stone-200 font-serif text-sm">
                IP-SAKTI Sahayak
              </span>
              <span className="text-stone-600">•</span>
              <span className="text-stone-300">
                Ministry of Ayush / All India Institute of Ayurveda (AIIA)
              </span>
              <span className="text-stone-600">•</span>
              <span className="font-mono text-emerald-400 bg-stone-950 px-2 py-0.5 rounded border border-stone-800">
                SIH 2026 Problem Statement 26045
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <button
                onClick={() => setIsScenarioOpen(true)}
                className="text-stone-300 hover:text-emerald-400 transition"
              >
                HerbNova Scenario
              </button>
              <button
                onClick={() => setActiveTab('evaluation')}
                className="text-stone-300 hover:text-emerald-400 transition"
              >
                Live Benchmark Suite
              </button>
              <button
                onClick={() => setIsEscalateOpen(true)}
                className="text-amber-400 hover:underline"
              >
                AIIA Facilitation Desk
              </button>
            </div>
          </div>

          <div className="text-[11px] leading-relaxed text-stone-500 max-w-4xl">
            <p>
              <strong>Mandatory Regulatory & Legal Disclaimer:</strong> IP-SAKTI Sahayak is an authoritative, source-grounded technical prototype designed for the Smart India Hackathon 2026. All assessments, citations, and regulatory classifications generated by this platform are for informational, research, and preparatory planning purposes only. They do not constitute formal legal counsel or an official patent grant or license from the Office of CGPDTM, National Biodiversity Authority, State Ayush Licensing Authorities, or Central Drugs Standard Control Organisation (CDSCO). Users must verify conclusions with the competent statutory authorities or registered Patent Agents.
            </p>
          </div>
        </div>
      </footer>

      {/* Escalation to AIIA Facilitator Modal */}
      <EscalationModal
        isOpen={isEscalateOpen}
        onClose={() => setIsEscalateOpen(false)}
        prefillProduct={currentProfile?.productName}
      />

      {/* HerbNova Scenario Drawer */}
      <ScenarioDrawer
        isOpen={isScenarioOpen}
        onClose={() => setIsScenarioOpen(false)}
        onApplyScenario={handleApplyHerbNovaScenario}
      />
    </div>
  );
}
