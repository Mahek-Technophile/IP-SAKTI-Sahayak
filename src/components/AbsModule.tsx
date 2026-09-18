import React, { useState } from 'react';
import {
  Layers,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Calculator,
  ExternalLink,
  BookMarked,
  Info,
  DollarSign,
} from 'lucide-react';

interface AbsModuleProps {
  onAddToChecklist: (items: string[]) => void;
}

export const AbsModule: React.FC<AbsModuleProps> = ({ onAddToChecklist }) => {
  const [isForeignEntity, setIsForeignEntity] = useState(false);
  const [isWildHarvested, setIsWildHarvested] = useState(true);
  const [isCodifiedClassical, setIsCodifiedClassical] = useState(false);
  const [targetIPFiling, setTargetIPFiling] = useState(true);
  const [annualTurnover, setAnnualTurnover] = useState(15000000); // 1.5 Crores default

  // Evaluation logic
  const requiresFormI = isForeignEntity;
  const requiresFormIII = targetIPFiling;
  const requiresSBBIntimation = !isForeignEntity && (!isCodifiedClassical || isWildHarvested);

  // Benefit sharing estimate
  let benefitSharingText = '';
  let calculatedAmount = 0;
  if (annualTurnover <= 10000000) {
    calculatedAmount = annualTurnover * 0.001;
    benefitSharingText = `0.1% of annual gross ex-factory sales (~₹${calculatedAmount.toLocaleString('en-IN')}/year)`;
  } else if (annualTurnover <= 30000000) {
    calculatedAmount = annualTurnover * 0.002;
    benefitSharingText = `0.2% of annual gross ex-factory sales (~₹${calculatedAmount.toLocaleString('en-IN')}/year)`;
  } else {
    calculatedAmount = annualTurnover * 0.005;
    benefitSharingText = `0.5% of annual gross ex-factory sales (~₹${calculatedAmount.toLocaleString('en-IN')}/year)`;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-stone-900 font-serif">
          Access & Benefit Sharing (ABS) & Traditional Knowledge Module
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          National Biodiversity Authority (NBA) & State Biodiversity Board (SBB) Compliance Matrix under Biological Diversity Act 2002 (Amended 2023)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Scenario Triggers */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-4">
            <h3 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-2 flex items-center justify-between">
              <span>Biological Resource & Entity Risk Parameters</span>
              <span className="text-[11px] font-normal text-stone-400">Configure parameters</span>
            </h3>

            {/* 1. Entity Ownership Structure */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                1. Entity Ownership & Management Structure
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsForeignEntity(false)}
                  className={`p-2.5 rounded-lg border text-left text-xs font-medium transition ${
                    !isForeignEntity
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  100% Indian Citizens / Entity
                </button>
                <button
                  onClick={() => setIsForeignEntity(true)}
                  className={`p-2.5 rounded-lg border text-left text-xs font-medium transition ${
                    isForeignEntity
                      ? 'bg-rose-50 border-rose-500 text-rose-900 font-bold'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  Foreign Equity / NRI / Foreign Entity (Sec 3)
                </button>
              </div>
            </div>

            {/* 2. Procurement Sourcing */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                2. Sourcing of Biological Resources
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsWildHarvested(true)}
                  className={`p-2.5 rounded-lg border text-left text-xs font-medium transition ${
                    isWildHarvested
                      ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  Wild Forest Harvest / Tribal Collection
                </button>
                <button
                  onClick={() => setIsWildHarvested(false)}
                  className={`p-2.5 rounded-lg border text-left text-xs font-medium transition ${
                    !isWildHarvested
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  Cultivated Farm / Certified Plantation
                </button>
              </div>
            </div>

            {/* 3. Classical Codification vs Novel Modification */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                3. Traditional Knowledge Codification Status (2023 Amendment)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsCodifiedClassical(true)}
                  className={`p-2.5 rounded-lg border text-left text-xs font-medium transition ${
                    isCodifiedClassical
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  Codified Traditional Knowledge (Samhita text)
                </button>
                <button
                  onClick={() => setIsCodifiedClassical(false)}
                  className={`p-2.5 rounded-lg border text-left text-xs font-medium transition ${
                    !isCodifiedClassical
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  Proprietary / Modified / Novel Formulation
                </button>
              </div>
            </div>

            {/* 4. Target IP Filing */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                4. Intent to Apply for Intellectual Property (Patents)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTargetIPFiling(true)}
                  className={`p-2.5 rounded-lg border text-left text-xs font-medium transition ${
                    targetIPFiling
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  Yes, applying for Patent (Form III Trigger)
                </button>
                <button
                  onClick={() => setTargetIPFiling(false)}
                  className={`p-2.5 rounded-lg border text-left text-xs font-medium transition ${
                    !targetIPFiling
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  No patent filing (Pure trade secret/branding)
                </button>
              </div>
            </div>

            {/* 5. Projected Annual Turnover for ABS Calculator */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                5. Projected Annual Ex-Factory Turnover (INR)
              </label>
              <input
                type="range"
                min="1000000"
                max="100000000"
                step="1000000"
                value={annualTurnover}
                onChange={(e) => setAnnualTurnover(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-stone-500 mt-1">
                <span>₹10 Lakhs</span>
                <span className="font-bold text-emerald-700 font-mono">
                  ₹{(annualTurnover / 10000000).toFixed(2)} Crores (₹{annualTurnover.toLocaleString('en-IN')})
                </span>
                <span>₹10 Crores</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: ABS Results & Compliance Matrix */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-md p-6 space-y-5">
            <h3 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-2">
              Statutory ABS Obligations & Checklist
            </h3>

            {/* Clearance Indicators */}
            <div className="space-y-3">
              {/* NBA Form I */}
              <div
                className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                  requiresFormI
                    ? 'bg-rose-50 border-rose-200 text-rose-950'
                    : 'bg-stone-50 border-stone-200 text-stone-700'
                }`}
              >
                {requiresFormI ? (
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">NBA Form I Approval (Access Clearance)</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        requiresFormI ? 'bg-rose-200 text-rose-900' : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {requiresFormI ? 'MANDATORY PRE-ACCESS' : 'NOT APPLICABLE'}
                    </span>
                  </div>
                  <p className="text-[11px] mt-1 leading-relaxed">
                    {requiresFormI
                      ? 'Under Section 3 of BD Act 2002, foreign entities or companies with any foreign shareholding must secure prior NBA approval before procuring any Indian botanical resource.'
                      : 'Entity is 100% Indian-owned; exempt from Section 3 NBA Form I prior access requirement.'}
                  </p>
                </div>
              </div>

              {/* NBA Form III */}
              <div
                className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                  requiresFormIII
                    ? 'bg-amber-50 border-amber-200 text-amber-950'
                    : 'bg-stone-50 border-stone-200 text-stone-700'
                }`}
              >
                {requiresFormIII ? (
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">NBA Form III Approval (IPR Filing / Grant)</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        requiresFormIII ? 'bg-amber-200 text-amber-900' : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {requiresFormIII ? 'MANDATORY PRIOR TO PATENT GRANT' : 'NOT APPLICABLE'}
                    </span>
                  </div>
                  <p className="text-[11px] mt-1 leading-relaxed">
                    {requiresFormIII
                      ? 'Under Section 6 & Rule 14, previous approval from the National Biodiversity Authority on Form III is mandatory before the grant of a patent in India or before applying for a patent outside India.'
                      : 'No patent application planned; Section 6 Form III filing is not triggered.'}
                  </p>
                </div>
              </div>

              {/* State Biodiversity Board Intimation */}
              <div
                className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                  requiresSBBIntimation
                    ? 'bg-blue-50 border-blue-200 text-blue-950'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                }`}
              >
                {requiresSBBIntimation ? (
                  <AlertTriangle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">State Biodiversity Board (SBB) Intimation</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        requiresSBBIntimation ? 'bg-blue-200 text-blue-900' : 'bg-emerald-200 text-emerald-900'
                      }`}
                    >
                      {requiresSBBIntimation ? 'MANDATORY (SECTION 7)' : 'EXEMPT UNDER 2023 ACT'}
                    </span>
                  </div>
                  <p className="text-[11px] mt-1 leading-relaxed">
                    {requiresSBBIntimation
                      ? 'Because raw materials are wild harvested or the product is a novel proprietary formulation, prior intimation to the concerned State Biodiversity Board under Section 7 is required.'
                      : 'Exempted under Section 7 Proviso of Biological Diversity (Amendment) Act 2023 for codified traditional knowledge and cultivated medicinal plant sourcing.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit Sharing Fee Estimator */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-stone-900 flex items-center gap-1 text-emerald-800">
                  <Calculator className="w-4 h-4 text-emerald-600" />
                  Statutory Benefit Sharing Fee Estimate
                </span>
                <span className="text-[10px] text-stone-400">ABS Regulations 2014</span>
              </div>
              <div className="text-base font-bold text-stone-900 font-mono mt-1">
                {benefitSharingText}
              </div>
              <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                Payable annually to the National Biodiversity Authority or State Biodiversity Board for community conservation and benefit distribution.
              </p>
            </div>

            {/* TKDL Prior Art Pointer */}
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                <BookMarked className="w-4 h-4 text-emerald-700" />
                <span>TKDL Prior Art Pointer & Examination Advisory</span>
              </div>
              <p className="text-[11px] text-emerald-950 leading-relaxed">
                The Traditional Knowledge Digital Library (TKDL) contains 34+ million pages of translated classical Sanskrit, Urdu, and Tamil medical formulations. Patent examiners at the Indian Patent Office, EPO, and USPTO routinely issue First Examination Reports (FER) citing TKDL entries against Ayurvedic patent claims under Section 3(p).
              </p>
              <div className="text-[10px] text-emerald-800 font-medium bg-emerald-100/60 p-2 rounded-lg">
                <strong>System Transparency Notice:</strong> This prototype references public TKDL classifications and examination guidelines. Full proprietary TKDL search requires official access agreement under Ministry of Ayush protocols.
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() =>
                  onAddToChecklist([
                    requiresFormI ? 'Apply for NBA Form I access clearance' : '',
                    requiresFormIII ? 'Submit NBA Form III approval before patent grant' : '',
                    requiresSBBIntimation ? 'Submit prior intimation to State Biodiversity Board' : '',
                    `Execute Benefit Sharing agreement for ${benefitSharingText}`,
                  ].filter(Boolean))
                }
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold py-2 px-4 rounded-xl transition"
              >
                + Add ABS Obligations to Action Checklist
              </button>
              <a
                href="http://nbaindia.org/content/26/60/1/forms.html"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold py-2 px-3 rounded-xl inline-flex items-center gap-1 transition"
              >
                <span>Download NBA Forms</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
