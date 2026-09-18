export type Jurisdiction = 'INDIA' | 'INTERNATIONAL';

export type LanguageCode = 'en' | 'hi' | 'sa' | 'ta' | 'te';

export type SourceTier = 1 | 2 | 3 | 4;

export type RegulatoryCategory =
  | 'Classical Ayurvedic Drug (Sec 3(a))'
  | 'Ayurvedic Proprietary Medicine (Sec 3(h))'
  | 'Phytopharmaceutical Drug'
  | 'Ayurveda Aahar (Nutraceutical)'
  | 'Ayush Cosmetic (Saundarya Prasadaka)'
  | 'Novel Botanical / New Chemical Entity'
  | 'Undetermined / Insufficient Evidence';

export interface AuthoritativeDocument {
  id: string;
  title: string;
  issuingAuthority: string;
  docType: 'Statute' | 'Rule' | 'Regulation' | 'Gazette Notification' | 'Treaty' | 'Guideline' | 'Pharmacopoeia';
  jurisdiction: Jurisdiction | 'BOTH';
  effectiveDate: string;
  version: string;
  sectionOrRule: string;
  url: string;
  tier: SourceTier;
  text: string;
  summary: string;
  checksum: string;
  keywords: string[];
}

export interface FormulationProfile {
  productName: string;
  classicalTextBasis: boolean;
  classicalTextName?: string;
  exactClassicalTraceable: boolean;
  modificationsMade: boolean;
  modificationDescription?: string;
  novelProcessElement: boolean;
  processDescription?: string;
  intendedUse: 'Therapeutic Treatment' | 'Food & Dietary Supplement' | 'Cosmetic' | 'General Wellness' | 'Other';
  marketingCategoryTarget?: RegulatoryCategory;
  biologicalResources: string[];
  sourceLocation: string; // e.g. "Wild harvested from forest, MP", "Cultivated farm, Kerala"
  isEntityForeignStake: boolean; // Foreign national, foreign equity/control
  targetMarkets: ('India' | 'USA' | 'European Union' | 'UK' | 'Australia' | 'Global')[];
}

export interface ClassificationResult {
  category: RegulatoryCategory;
  confidence: 'High' | 'Medium' | 'Low (Needs Clarification)';
  statutoryBasis: string;
  reasoning: string[];
  informationStillRequired: string[];
  applicableRegulatoryPathways: string[];
  applicableIPPathways: string[];
  relevantEvidence: {
    authority: string;
    section: string;
    snippet: string;
    url: string;
  }[];
  disclaimer: string;
}

export interface CitationCard {
  id: string;
  authority: string;
  documentTitle: string;
  section: string;
  url: string;
  snippet: string;
  tier: SourceTier;
  checksum: string;
  effectiveDate?: string;
}

export interface StructuredRagAnswer {
  directAnswer: string;
  whyApplies: string;
  formulationClassification?: string;
  ipImplications: {
    patentability: string;
    traditionalKnowledgeHurdle: string;
    trademarkAndBranding: string;
    otherIP?: string;
  };
  regulatoryImplications: string;
  absTkConsiderations: string;
  recommendedNextActions: string[];
  uncertaintyAndEscalation: string;
  citations: CitationCard[];
  groundingStatus: 'Source Grounded' | 'Partially Grounded' | 'Insufficient Authoritative Evidence';
  groundingScore: number; // 0 to 100
  jurisdictionUsed: Jurisdiction;
  detectedLanguage: LanguageCode;
}

export interface ActionChecklistItem {
  id: string;
  issue: string;
  action: string;
  authority: string;
  requiredDocument: string;
  sourceCitation: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'critical' | 'high' | 'medium' | 'advisory';
  deadlineInfo?: string;
}

export interface EvaluationMetric {
  id: string;
  testCaseName: string;
  query: string;
  jurisdiction: Jurisdiction;
  expectedCategory: RegulatoryCategory | string;
  keyStatutesExpected: string[];
  actualGroundingStatus: 'Source Grounded' | 'Partially Grounded' | 'Insufficient Authoritative Evidence';
  retrievalPrecision: number;
  citationCoverage: number;
  latencyMs: number;
  passed: boolean;
  notes: string;
}

export interface EvaluationReport {
  summary: {
    totalTests: number;
    passedTests: number;
    accuracyRate: number;
    groundedAnswerRate: number;
    abstentionPrecision: number;
    averageRetrievalPrecision: number;
    citationIntegrityRate: number;
    averageLatencyMs: number;
    benchmarkDate: string;
  };
  details: EvaluationMetric[];
}
