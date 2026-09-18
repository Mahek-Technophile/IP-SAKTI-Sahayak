import React, { useState } from 'react';
import {
  Shield,
  Layers,
  Award,
  Globe2,
  Lock,
  Sprout,
  BookMarked,
  FileCode,
  Palette,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { Jurisdiction } from '../types/index.ts';

interface IPNavigatorProps {
  jurisdiction: Jurisdiction;
  onNavigateToAssistant: (query: string) => void;
  onAddToChecklist: (items: string[]) => void;
}

interface IPRoute {
  id: string;
  name: string;
  icon: any;
  category: string;
  protectable: string[];
  notProtectable: string[];
  authority: string;
  statuteOrTreaty: string;
  nextStep: string;
  evidenceSource: { title: string; section: string; url: string };
  uncertaintyLevel: 'Low' | 'Moderate' | 'High';
  uncertaintyRationale: string;
}

export const IPNavigator: React.FC<IPNavigatorProps> = ({
  jurisdiction,
  onNavigateToAssistant,
  onAddToChecklist,
}) => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>('patents');

  const ipRoutes: IPRoute[] = [
    {
      id: 'patents',
      name: 'Patents',
      icon: Shield,
      category: 'Invention & Technical Advance',
      protectable: [
        'Novel extraction processes (e.g. standardized supercritical CO2, ultrasonic protocols with non-obvious yields/temperatures)',
        'Novel polyherbal combinations demonstrating statistically validated synergistic therapeutic efficacy (Combination Index < 1)',
        'Standardized phytopharmaceutical fractions with defined minimum 4 chemical markers and pharmacological proof',
        'Novel delivery mechanisms (e.g. nano-bhasma suspensions, liposomal herbal drug delivery)',
      ],
      notProtectable: [
        'Unmodified classical Ayurvedic formulations codified in First Schedule books / TKDL (Section 3(p) statutory exclusion)',
        'Mere admixtures of known herbs resulting only in aggregation of their known therapeutic properties (Section 3(e))',
        'Medicinal uses of known plants or herbs without technical novelty (Section 3(d))',
        'Traditional agricultural methods or wild plant harvesting methods (Section 3(h))',
      ],
      authority: 'Office of the Controller General of Patents, Designs & Trade Marks (CGPDTM) / IP India',
      statuteOrTreaty:
        jurisdiction === 'INDIA'
          ? 'The Patents Act, 1970 (Sections 3(p), 3(e), 10(4), 8) & Patent Rules 2003 (as amended 2024)'
          : 'Patent Cooperation Treaty (PCT) & WIPO Treaty on Intellectual Property, Genetic Resources and Associated TK (2024)',
      nextStep:
        'Conduct a prior art search including the TKDL database and execute comparative in-vitro / in-vivo synergy studies before filing provisional specification (Form 1 & Form 2).',
      evidenceSource: {
        title: 'The Patents Act, 1970',
        section: 'Section 3(p) & Section 3(e)',
        url: 'https://ipindia.gov.in/writereaddata/Portal/IPOAct/1_31_1_patent-act-1970-11march2015.pdf',
      },
      uncertaintyLevel: 'Moderate',
      uncertaintyRationale:
        'Patent examiners cross-examine claims against TKDL; proving inventive step over classical literature requires rigorous experimental validation.',
    },
    {
      id: 'traditional-knowledge',
      name: 'Traditional Knowledge & TKDL',
      icon: BookMarked,
      category: 'Defensive & Heritage Protection',
      protectable: [
        'Defensive protection: Classical formulations are published in TKDL to prevent third-party biopiracy and invalid patent grants globally',
        'Community intellectual rights over indigenous health practices under national biodiversity regimes',
        'Benefit sharing rights when traditional knowledge is accessed by external commercial entities',
      ],
      notProtectable: [
        'Private commercial monopolization: Traditional knowledge cannot be owned by private companies as exclusive private patent property',
        'Generic classical names (e.g., "Triphala", "Chyawanprash") cannot be exclusively registered as trademarks',
      ],
      authority: 'Council of Scientific and Industrial Research (CSIR) & Ministry of Ayush',
      statuteOrTreaty:
        'Traditional Knowledge Digital Library (TKDL) Agreements & Convention on Biological Diversity (CBD Article 8(j))',
      nextStep:
        'Verify whether your formulation ingredients and clinical indications are already indexed in the TKDL to anticipate examiner objections.',
      evidenceSource: {
        title: 'CSIR-TKDL Framework',
        section: 'Defensive Prior Art Architecture',
        url: 'https://www.tkdl.res.in/tkdl/langdefault/common/Abouttkdl.asp',
      },
      uncertaintyLevel: 'Low',
      uncertaintyRationale:
        'TKDL status as valid prior art is globally accepted across EPO, USPTO, JPO, and Indian Patent Office.',
    },
    {
      id: 'abs-biodiversity',
      name: 'Biological Diversity / ABS',
      icon: Layers,
      category: 'Access & Benefit Sharing Compliance',
      protectable: [
        'Statutory authorization to commercially exploit biological resources without penal sanctions',
        'Legal clearance to file and obtain Indian or international patents based on Indian biological resources (Form III)',
        'Internationally Recognized Certificate of Compliance (IRCC) under the Nagoya Protocol',
      ],
      notProtectable: [
        'Exemption from law: Foreign entities cannot access Indian biological resources without prior NBA approval (Form I)',
        'Commercial harvesting of endangered or wild Schedule-listed species without forest department clearances',
      ],
      authority: 'National Biodiversity Authority (NBA), Chennai & State Biodiversity Boards (SBBs)',
      statuteOrTreaty:
        'Biological Diversity Act, 2002 (Sections 3, 4, 6, 7; Amended 2023) & Nagoya Protocol (Articles 5, 6, 13)',
      nextStep:
        'If applying for a patent, file NBA Form III before patent grant. If an Indian entity manufacturing commercially, file SBB prior intimation (unless exempted as codified knowledge under 2023 amendment).',
      evidenceSource: {
        title: 'Biological Diversity Act, 2002',
        section: 'Section 6 & Rule 14 (Form III)',
        url: 'http://nbaindia.org/content/26/60/1/forms.html',
      },
      uncertaintyLevel: 'Moderate',
      uncertaintyRationale:
        'State Biodiversity Boards vary in interpretation of commercial utilization versus Ayush codified exemptions under the 2023 amendment.',
    },
    {
      id: 'trademarks',
      name: 'Trademarks & Certification Marks',
      icon: Award,
      category: 'Brand Equity & Commercial Monopoly',
      protectable: [
        'Coined, distinctive brand names for Ayurvedic products (e.g. "Arthrosoul", "HerbNova") under Class 5 (Medicines) and Class 30 (Aahar)',
        'Distinctive logos, label packaging graphics, and trade dress',
        'Certification Marks: AYUSH Standard Mark (domestic GMP) and AYUSH Premium Mark (stringent heavy metal limits for export)',
      ],
      notProtectable: [
        'Generic, descriptive Sanskrit names of herbs (e.g. "Ashwagandha", "Shallaki", "Brahmi") under Section 9(1)(b) of Trade Marks Act 1999',
        'Names of classical formulations directly listed in First Schedule books (e.g. "Rasna Saptaka Kwatha", "Khadiradi Vati")',
        'Deceptive marks suggesting cure for incurable diseases prohibited under Drugs and Magic Remedies Act 1954',
      ],
      authority: 'Trade Marks Registry (CGPDTM) & Quality Council of India (QCI / Ayush Premium Mark)',
      statuteOrTreaty:
        jurisdiction === 'INDIA'
          ? 'The Trade Marks Act, 1999 (Nice Classification Class 5, Class 3, Class 30)'
          : 'Madrid System for the International Registration of Marks (WIPO)',
      nextStep:
        'Conduct a comprehensive phonetic and similarity search on the IP India public trademark portal and apply via Form TM-A.',
      evidenceSource: {
        title: 'Trade Marks Act, 1999',
        section: 'Section 28 & Class 5',
        url: 'https://ipindia.gov.in/writereaddata/Portal/IPOAct/1_43_1_trade-marks-act.pdf',
      },
      uncertaintyLevel: 'Low',
      uncertaintyRationale:
        'Clear statutory criteria under Class 5; distinctiveness and non-descriptiveness can be readily established through trademark search.',
    },
    {
      id: 'geographical-indications',
      name: 'Geographical Indications (GI)',
      icon: Globe2,
      category: 'Regional Collective Heritage',
      protectable: [
        'Collective registration for Ayurvedic botanicals having specific geographical origins and established qualities (e.g., Navara Rice GI Reg. 47, Nilambur Teak, Malabar Pepper)',
        'Authorized User status for individual growers or manufacturers located in the designated geographical boundary',
      ],
      notProtectable: [
        'Private monopoly: Individual companies cannot register a GI in their personal corporate name',
        'Botanicals cultivated outside the defined geographical boundaries or lacking established historical link',
      ],
      authority: 'Geographical Indications Registry, Chennai (CGPDTM)',
      statuteOrTreaty: 'The Geographical Indications of Goods (Registration and Protection) Act, 1999',
      nextStep:
        'Form or join a registered association of producers in the specific geographical belt and file Form GI-1 or apply as Authorized User.',
      evidenceSource: {
        title: 'Geographical Indications of Goods Act, 1999',
        section: 'Section 2(e) & Section 8',
        url: 'https://ipindia.gov.in/writereaddata/Portal/IPOAct/1_44_1_gi-act.pdf',
      },
      uncertaintyLevel: 'Low',
      uncertaintyRationale:
        'Well-defined legal registry in Chennai; collective verification of territory and production method required.',
    },
    {
      id: 'plant-variety',
      name: 'Plant Variety Protection (PPV&FR)',
      icon: Sprout,
      category: 'Medicinal Plant Cultivars & Breeder Rights',
      protectable: [
        'Distinct, Uniform, and Stable (DUS) varieties of medicinal plants (e.g., high-withanolide Ashwagandha cultivars)',
        'Extant varieties and farmers varieties recognized for conservation of traditional medicinal germplasm',
      ],
      notProtectable: [
        'Wild plant species harvested in natural forests without selective breeding or domestication',
        'Varieties lacking distinctness or stability across successive generations',
      ],
      authority: 'Protection of Plant Varieties and Farmers Rights (PPV&FR) Authority, New Delhi',
      statuteOrTreaty: 'Protection of Plant Varieties and Farmers Rights Act, 2001 (Section 14, 15, 28)',
      nextStep:
        'Submit plant variety passport data, DUS test characterization, and seed/planting material specimens to the PPV&FR Authority.',
      evidenceSource: {
        title: 'PPV&FR Act, 2001',
        section: 'Section 14 & Section 28',
        url: 'https://plantauthority.gov.in/sites/default/files/act.pdf',
      },
      uncertaintyLevel: 'Moderate',
      uncertaintyRationale:
        'Requires 2-year field DUS trials by agricultural universities to verify phenotypic stability.',
    },
    {
      id: 'trade-secrets',
      name: 'Trade Secrets & Know-How',
      icon: Lock,
      category: 'Confidential Manufacturing Methods',
      protectable: [
        'Proprietary extraction temperature/pressure curves, solvent ratios, and cycle times',
        'In-house organoleptic taste-masking formulas for bitter Ayurvedic decoctions',
        'Supplier lists, certified farm co-operative contracts, and internal analytical testing assays',
      ],
      notProtectable: [
        'Information published in classical Samhitas, pharmacopoeias, or academic journals',
        'Aspects easily reverse-engineered through chemical chromatography by competitors',
      ],
      authority: 'Common Law Protection / Indian Contract Act, 1872 (Section 27 non-disclosure covenants)',
      statuteOrTreaty: 'Indian Contract Act, 1872 & TRIPS Article 39 (Protection of Undisclosed Information)',
      nextStep:
        'Implement robust Non-Disclosure Agreements (NDAs), restrict clean-room access to extraction recipes, and compartmentalize formulation steps.',
      evidenceSource: {
        title: 'WTO TRIPS Agreement',
        section: 'Article 39 (Undisclosed Information)',
        url: 'https://www.wto.org/english/docs_e/legal_e/27-trips_04c_e.htm',
      },
      uncertaintyLevel: 'Moderate',
      uncertaintyRationale:
        'India does not have a dedicated Trade Secrets statute; protection relies on enforceable civil contracts and common law remedies.',
    },
    {
      id: 'designs',
      name: 'Industrial Designs',
      icon: Palette,
      category: 'Packaging & Delivery Device Aesthetics',
      protectable: [
        'Novel ergonomic shapes of herbal dispensing bottles, droppers, or inhalers',
        'Distinctive geometric blister packaging for Ayurvedic tablets or Rasayana capsules',
        'Novel structural design of Panchakarma therapy apparatus (e.g. Shirodhara automated flow device)',
      ],
      notProtectable: [
        'Purely functional mechanical features without aesthetic appeal (must be protected by patents)',
        'Traditional clay pots or generic pill bottles already in the public domain',
      ],
      authority: 'Designs Wing, Patent Office Kolkata (CGPDTM)',
      statuteOrTreaty: 'The Designs Act, 2000 & Locarno Classification',
      nextStep:
        'File representation sheets showing 6 orthogonal views of the novel article prior to commercial marketing or publication.',
      evidenceSource: {
        title: 'The Designs Act, 2000',
        section: 'Section 2(d) & Section 5',
        url: 'https://ipindia.gov.in/writereaddata/Portal/IPOAct/1_42_1_designs-act-2000.pdf',
      },
      uncertaintyLevel: 'Low',
      uncertaintyRationale:
        'Straightforward novelty check against existing registered shapes; rapid grant timeline (~6 to 9 months).',
    },
    {
      id: 'copyright',
      name: 'Copyright',
      icon: FileCode,
      category: 'Original Literary & Artistic Expressions',
      protectable: [
        'Original packaging box artworks, graphic layouts, and aesthetic color schemes',
        'Educational booklets, lifestyle manuals, and proprietary dosage guidance charts',
        'Software code and user interfaces for Ayurvedic diagnostic or Prakriti assessment applications',
      ],
      notProtectable: [
        'Classical Sanskrit shlokas, ancient Ayurvedic texts, or historical formulas (public domain)',
        'Pure list of ingredients or mere facts without creative original expression',
      ],
      authority: 'Copyright Office, DPIIT, Ministry of Commerce and Industry',
      statuteOrTreaty: 'The Copyright Act, 1957 (as amended) & Berne Convention',
      nextStep:
        'Obtain a No Objection Certificate (NOC) under Section 45 from the Trade Marks Registry if the artwork is used on commercial goods, then register on Form XIV.',
      evidenceSource: {
        title: 'The Copyright Act, 1957',
        section: 'Section 45 & Form XIV',
        url: 'https://copyright.gov.in/Documents/CopyrightRules1957.pdf',
      },
      uncertaintyLevel: 'Low',
      uncertaintyRationale:
        'Automatic protection upon creation; formal registration provides prima facie evidence in court.',
    },
  ];

  const selectedRoute = ipRoutes.find((r) => r.id === selectedRouteId) || ipRoutes[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-stone-900 font-serif">
          Ayurvedic IP Routing Navigator ({jurisdiction} Regime)
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Comprehensive statutory pathways covering all 9 Intellectual Property & Regulatory regimes for Ayush products
        </p>
      </div>

      {/* 9 IP Route Selector Pills */}
      <div className="flex overflow-x-auto gap-2 pb-3 mb-6 no-scrollbar">
        {ipRoutes.map((route) => {
          const Icon = route.icon;
          const isSelected = selectedRoute.id === route.id;
          return (
            <button
              key={route.id}
              onClick={() => setSelectedRouteId(route.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                isSelected
                  ? 'bg-stone-900 text-emerald-400 border-stone-800 shadow-sm'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50 hover:border-stone-300'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-stone-400'}`} />
              <span>{route.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected IP Route Deep Dive Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-md p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200 shadow-2xs">
              <selectedRoute.icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                {selectedRoute.category}
              </span>
              <h3 className="text-lg font-bold text-stone-900 font-serif">{selectedRoute.name}</h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Uncertainty Risk</span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  selectedRoute.uncertaintyLevel === 'Low'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : selectedRoute.uncertaintyLevel === 'Moderate'
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-rose-100 text-rose-800 border border-rose-300'
                }`}
              >
                {selectedRoute.uncertaintyLevel} Uncertainty
              </span>
            </div>
          </div>
        </div>

        {/* Protectable vs Not Protectable Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Protectable */}
          <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>What May Be Protectable</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-700">
              {selectedRoute.protectable.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not Protectable */}
          <div className="bg-rose-50/50 border border-rose-200/80 rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>What May NOT Be Protectable (Exclusions & Hurdles)</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-700">
              {selectedRoute.notProtectable.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Regulatory Authority & Statutory Grounding */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs">
          <div>
            <span className="text-stone-400 font-medium block text-[11px] mb-0.5">Competent Regulatory Authority</span>
            <span className="font-bold text-stone-800">{selectedRoute.authority}</span>
          </div>
          <div>
            <span className="text-stone-400 font-medium block text-[11px] mb-0.5">Applicable Statute / Rule / Treaty</span>
            <span className="font-bold text-stone-800">{selectedRoute.statuteOrTreaty}</span>
          </div>
        </div>

        {/* Practical Next Step */}
        <div className="border border-stone-200 rounded-xl p-4 bg-white space-y-1.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
            <ChevronRight className="w-4 h-4 text-emerald-600" />
            <span>Practical Next Step for Applicants</span>
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">{selectedRoute.nextStep}</p>
        </div>

        {/* Evidence & Authority Citation Box */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-semibold">Authoritative Evidence Reference</span>
            <span className="font-bold text-stone-800">
              {selectedRoute.evidenceSource.title} — {selectedRoute.evidenceSource.section}
            </span>
          </div>
          <a
            href={selectedRoute.evidenceSource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 px-3 py-1.5 rounded-lg font-semibold transition"
          >
            <span>View Public Law Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Uncertainty Rationale */}
        <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-950 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">Legal & Examination Uncertainty:</span>
            <p className="text-[11px] text-amber-900 leading-relaxed">
              {selectedRoute.uncertaintyRationale}
            </p>
          </div>
        </div>

        {/* Route Actions */}
        <div className="pt-2 flex flex-wrap gap-2">
          <button
            onClick={() =>
              onNavigateToAssistant(`How does the ${selectedRoute.name} framework apply to our Ayurvedic product?`)
            }
            className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold py-2 px-4 rounded-lg transition"
          >
            Query {selectedRoute.name} in Assistant
          </button>
          <button
            onClick={() => onAddToChecklist([selectedRoute.nextStep])}
            className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold py-2 px-3 rounded-lg transition"
          >
            + Add to Action Checklist
          </button>
        </div>
      </div>
    </div>
  );
};
