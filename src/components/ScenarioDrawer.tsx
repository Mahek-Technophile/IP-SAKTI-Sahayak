import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, X } from 'lucide-react';

interface ScenarioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyScenario: () => void;
}

export const ScenarioDrawer: React.FC<ScenarioDrawerProps> = ({
  isOpen,
  onClose,
  onApplyScenario,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-stone-200">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                Official Demonstration Scenario (SIH 2026 PS 26045)
              </span>
              <h3 className="text-base font-bold text-stone-900 font-serif">
                HerbNova Ayurveda Innovations Pvt. Ltd. — Case Study
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 text-lg font-bold p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-stone-700">
          {/* Background Card */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
            <h4 className="font-bold text-stone-900 text-xs">
              Entity Profile: HerbNova Ayurveda Innovations Private Limited
            </h4>
            <p className="leading-relaxed text-[11px] text-stone-600">
              An Indian Ayush biopharma start-up based in Pune, Maharashtra. HerbNova has developed{' '}
              <strong>&ldquo;Arthrosoul Joint Wellness Extract&rdquo;</strong>, an advanced oral formulation for chronic joint inflammation and osteoarthritis.
            </p>
          </div>

          {/* Product Architecture Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200">
              <span className="font-bold text-emerald-900 block mb-1">Classical Text Foundation:</span>
              <p className="text-[11px] text-emerald-950 leading-relaxed">
                Derived from the classical <strong>Rasna Saptaka Kwatha</strong> described in the 14th-century{' '}
                <em>Sharangadhara Samhita</em> (Madhyama Khanda Chapter 2).
              </p>
            </div>

            <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-200">
              <span className="font-bold text-blue-900 block mb-1">Novel In-House Modifications:</span>
              <p className="text-[11px] text-blue-950 leading-relaxed">
                Enriched with standardized supercritical CO2 extract of <em>Boswellia serrata</em> (65% 3-O-acetyl-11-keto-beta-boswellic acid - AKBA) and bio-enhancing <em>Piper nigrum</em> (piperine 95%).
              </p>
            </div>

            <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200">
              <span className="font-bold text-amber-900 block mb-1">Biological Resource Sourcing:</span>
              <p className="text-[11px] text-amber-950 leading-relaxed">
                Boswellia resin wild-harvested by local tribal cooperatives in Satpura Forest, MP. Piper nigrum cultivated on certified farms in Wayanad, Kerala.
              </p>
            </div>

            <div className="bg-purple-50/60 p-3.5 rounded-xl border border-purple-200">
              <span className="font-bold text-purple-900 block mb-1">Target Commercial Strategy:</span>
              <p className="text-[11px] text-purple-950 leading-relaxed">
                Domestic launch under Ayush State Licensing Authority (Form 25D) and prospective exports to USA (DSHEA dietary supplement) and EU (THMPD directive).
              </p>
            </div>
          </div>

          {/* What this Demo Demonstrates */}
          <div className="border border-stone-200 rounded-xl p-4 bg-white space-y-2">
            <h4 className="font-bold text-stone-900 text-xs">
              What IP-SAKTI Sahayak Solves for HerbNova:
            </h4>
            <ul className="space-y-1.5 text-[11px] text-stone-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Formulation Classification:</strong> Correctly categorizes Arthrosoul as an <em>Ayurvedic Proprietary Medicine (Section 3(h))</em>, bypassing full classical status while establishing textual validity under Rule 158B.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Patent Strategy:</strong> Identifies the steep Section 3(p) TKDL hurdle and guides HerbNova to protect the novel scCO2 extraction process and submit synergistic pharmacology data (Combination Index &lt; 1) to overcome Section 3(e) admixture objections.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>ABS & Biodiversity Compliance:</strong> Triggers mandatory NBA Form III filing prior to patent grant, plus SBB prior intimation and benefit sharing calculation (0.2% on turnover) for wild Satpura resin.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Export Guidance:</strong> Highlights FDA structure/function claim boundaries under DSHEA (cannot claim &ldquo;treats arthritis&rdquo;) and EU THMPD 15-year traditional use documentation hurdle.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
          <span className="text-[11px] text-stone-400">
            Clicking below will inject HerbNova into the Classifier, Assistant, and ABS matrices.
          </span>
          <button
            onClick={() => {
              onApplyScenario();
              onClose();
            }}
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-4 py-2 rounded-xl text-xs shadow-sm transition"
          >
            <span>Load HerbNova Demo & Launch Assessment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
