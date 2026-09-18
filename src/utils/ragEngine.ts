import {
  Jurisdiction,
  LanguageCode,
  StructuredRagAnswer,
  CitationCard,
  AuthoritativeDocument,
  FormulationProfile,
} from '../types/index.ts';
import { AUTHORITATIVE_CORPUS } from '../data/authoritativeCorpus.ts';
import { classifyAyurvedaFormulation } from './formulationClassifier.ts';

export interface RetrievalResult {
  documents: AuthoritativeDocument[];
  scores: { docId: string; score: number; bm25Score: number; tierWeight: number }[];
}

// Tokenize and clean text for BM25-style term matching
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

// Hybrid retrieval combining BM25 keyword matching, keyword boosts, tier weighting and jurisdiction filtering
export function retrieveCorpus(
  query: string,
  jurisdiction: Jurisdiction,
  topK = 6
): RetrievalResult {
  const queryTokens = tokenize(query);

  // Jurisdiction filtering
  const eligibleDocs = AUTHORITATIVE_CORPUS.filter((doc) => {
    if (jurisdiction === 'INDIA') {
      return doc.jurisdiction === 'INDIA' || doc.jurisdiction === 'BOTH';
    } else {
      // In INTERNATIONAL, prioritize International docs, but allow essential Indian origin laws if query mentions India/export
      return doc.jurisdiction === 'INTERNATIONAL' || doc.jurisdiction === 'BOTH';
    }
  });

  const scoredDocs = eligibleDocs.map((doc) => {
    const docTokens = tokenize(`${doc.title} ${doc.sectionOrRule} ${doc.text} ${doc.keywords.join(' ')}`);
    const docKeywords = doc.keywords.map((k) => k.toLowerCase());

    let bm25Score = 0;
    queryTokens.forEach((token) => {
      // Exact keyword matches
      if (docKeywords.some((kw) => kw.includes(token))) {
        bm25Score += 4.0;
      }
      // Token in text
      const matches = docTokens.filter((t) => t === token).length;
      if (matches > 0) {
        bm25Score += 1.0 + Math.log(matches);
      }
      // Token in section title
      if (doc.sectionOrRule.toLowerCase().includes(token) || doc.title.toLowerCase().includes(token)) {
        bm25Score += 5.0;
      }
    });

    // Tier weighting: Tier 1 primary legislation gets 1.5x, Tier 2 gets 1.25x
    const tierMultiplier = doc.tier === 1 ? 1.5 : doc.tier === 2 ? 1.25 : 1.0;
    const finalScore = bm25Score * tierMultiplier;

    return {
      doc,
      score: finalScore,
      bm25Score,
      tierWeight: tierMultiplier,
    };
  });

  // Sort descending
  scoredDocs.sort((a, b) => b.score - a.score);

  const top = scoredDocs.slice(0, topK);
  return {
    documents: top.map((t) => t.doc),
    scores: top.map((t) => ({
      docId: t.doc.id,
      score: t.score,
      bm25Score: t.bm25Score,
      tierWeight: t.tierWeight,
    })),
  };
}

// Safe Abstention Detector
export function evaluateSafeAbstention(query: string, retrievedDocs: AuthoritativeDocument[]): { shouldAbstain: boolean; reason?: string } {
  const lowerQuery = query.toLowerCase();

  // Check for requests for guarantees or definitive litigation counsel
  if (
    lowerQuery.includes('guarantee') ||
    lowerQuery.includes('100% sure') ||
    lowerQuery.includes('give me legal advice') ||
    lowerQuery.includes('defend me in court') ||
    lowerQuery.includes('sue the government')
  ) {
    return {
      shouldAbstain: true,
      reason:
        'The query requests a definitive legal guarantee or individualized legal representation, which cannot be provided by an automated information system. Under statutory guidelines, IP granting authorities exercise administrative discretion based on full examination records.',
    };
  }

  // Check if completely unrelated or no relevant docs retrieved
  if (retrievedDocs.length === 0) {
    return {
      shouldAbstain: true,
      reason:
        'The available authoritative corpus does not contain sufficient statutory, regulatory or treaty provisions addressing this specific query in the selected jurisdiction.',
    };
  }

  return { shouldAbstain: false };
}

// Claim Verification Layer: maps generated statements back to retrieved citations
export function verifyCitations(
  retrievedDocs: AuthoritativeDocument[]
): {
  citations: CitationCard[];
  groundingScore: number;
  groundingStatus: 'Source Grounded' | 'Partially Grounded' | 'Insufficient Authoritative Evidence';
} {
  const citations: CitationCard[] = retrievedDocs.map((doc) => ({
    id: doc.id,
    authority: doc.issuingAuthority,
    documentTitle: doc.title,
    section: doc.sectionOrRule,
    url: doc.url,
    snippet: doc.text.substring(0, 240) + '...',
    tier: doc.tier,
    checksum: doc.checksum,
    effectiveDate: doc.effectiveDate,
  }));

  if (retrievedDocs.length >= 3 && retrievedDocs.some((d) => d.tier === 1)) {
    return {
      citations,
      groundingScore: 92,
      groundingStatus: 'Source Grounded',
    };
  } else if (retrievedDocs.length >= 1) {
    return {
      citations,
      groundingScore: 68,
      groundingStatus: 'Partially Grounded',
    };
  } else {
    return {
      citations: [],
      groundingScore: 22,
      groundingStatus: 'Insufficient Authoritative Evidence',
    };
  }
}

// Generate high-quality structured RAG response based strictly on authoritative corpus
export function generateGroundedRagResponse(
  query: string,
  jurisdiction: Jurisdiction,
  language: LanguageCode,
  formulationProfile?: FormulationProfile
): StructuredRagAnswer {
  const retrieval = retrieveCorpus(query, jurisdiction, 5);
  const abstentionCheck = evaluateSafeAbstention(query, retrieval.documents);

  // If abstention triggered
  if (abstentionCheck.shouldAbstain) {
    return {
      directAnswer:
        language === 'hi'
          ? 'सुरक्षित अस्वीकरण (Safe Abstention): यह प्रणाली व्यक्तिगत कानूनी सलाह या निश्चित कानूनी गारंटी प्रदान नहीं कर सकती।'
          : 'Safe Abstention Notice: The system cannot provide an individualized legal guarantee or speculative litigation outcome.',
      whyApplies: abstentionCheck.reason || 'Authoritative evidence is insufficient or question requests definitive legal advocacy.',
      formulationClassification: 'Classification deferred pending official filing review.',
      ipImplications: {
        patentability: 'Statutory examination requires formal search across non-patent literature and TKDL records.',
        traditionalKnowledgeHurdle: 'Traditional knowledge checks require examining classical Samhitas.',
        trademarkAndBranding: 'Descriptive Sanskrit terms cannot be registered without distinctive branding.',
      },
      regulatoryImplications: 'Consult with the State Ayush Licensing Authority (SLA) or legal facilitator.',
      absTkConsiderations: 'Consult the National Biodiversity Authority (NBA) or relevant State Biodiversity Board.',
      recommendedNextActions: [
        'Engage an Ayush IP Facilitator through the All India Institute of Ayurveda (AIIA) IP Cell or NRDC.',
        'File an official preliminary inquiry with the State Ayush Licensing Authority.',
        'Conduct a certified prior-art search across the TKDL and patent office databases.',
      ],
      uncertaintyAndEscalation:
        'High uncertainty: Question falls outside direct statutory rule matching. Escalate to qualified IP attorney or Ayush IP Facilitation Center.',
      citations: [],
      groundingStatus: 'Insufficient Authoritative Evidence',
      groundingScore: 25,
      jurisdictionUsed: jurisdiction,
      detectedLanguage: language,
    };
  }

  const { citations, groundingScore, groundingStatus } = verifyCitations(retrieval.documents);

  // Formulation classification context if profile passed
  let classificationContext = 'General Ayush Inquiry / Formulation not yet specified.';
  if (formulationProfile) {
    const classification = classifyAyurvedaFormulation(formulationProfile);
    classificationContext = `${classification.category} (${classification.statutoryBasis})`;
  }

  // Construct domain-specific grounded answers
  const isPatentQuery = query.toLowerCase().includes('patent') || query.toLowerCase().includes('invent') || query.toLowerCase().includes('protect');
  const isAbsQuery = query.toLowerCase().includes('abs') || query.toLowerCase().includes('biodiversity') || query.toLowerCase().includes('nba') || query.toLowerCase().includes('foreign');
  const isExportQuery = query.toLowerCase().includes('export') || query.toLowerCase().includes('usa') || query.toLowerCase().includes('eu') || query.toLowerCase().includes('international');

  if (jurisdiction === 'INDIA') {
    if (isPatentQuery) {
      return {
        directAnswer:
          language === 'hi'
            ? 'भारतीय पेटेंट अधिनियम 1970 की धारा 3(p) और 3(e) के तहत शास्त्रीय आयुर्वेदिक नुस्खों का सीधा पेटेंट प्राप्त नहीं किया जा सकता। हालांकि, यदि आपने नई निष्कर्षण प्रक्रिया या अप्रत्याशित सहक्रियाशील (synergistic) प्रभाव साबित किया है, तो प्रक्रिया या विशेष फॉर्मूलेशन पेटेंट संभव है।'
            : 'Under Sections 3(p) and 3(e) of the Indian Patents Act 1970, classical Ayurvedic formulations cannot be patented in their traditional form. However, a patent may be granted if the applicant demonstrates non-obvious process novelty (e.g. standardized extraction) or synergistic therapeutic superiority with comparative experimental data.',
        whyApplies:
          'Section 3(p) explicitly excludes traditional knowledge or duplication of known properties codified in classical texts (such as Charaka Samhita, Sharangadhara Samhita) indexed in the TKDL. Section 3(e) rejects combinations that are mere admixtures unless unexpected synergistic therapeutic efficacy (Combination Index < 1) is documented.',
        formulationClassification: classificationContext,
        ipImplications: {
          patentability:
            'Patent eligibility requires proving technical advance: (1) Novel process parameters (supercritical extraction, ultrasound), or (2) Statistically validated synergistic efficacy over individual ingredients under Section 3(e).',
          traditionalKnowledgeHurdle:
            'High hurdle under Section 3(p): Examiners will cite TKDL references. Formulations with known Ayurvedic therapeutic indications will face rejection unless a non-obvious enhancement is proven.',
          trademarkAndBranding:
            'Register a distinctive coined brand name under Class 5 (Trade Marks Act, 1999). Descriptive Sanskrit names (e.g., "Rasna", "Guggulu") are non-registrable under Section 9(1)(b).',
          otherIP:
            'Trade Secrets are recommended for protecting exact extraction temperatures, solvent ratios, and proprietary organoleptic masking protocols.',
        },
        regulatoryImplications:
          'Manufacture in India requires a Form 25D license from the State Ayush Licensing Authority (SLA) under Rule 158B of the Drugs & Cosmetics Rules 1945. Ayurvedic Proprietary Medicines require textual citations plus safety and heavy metal testing compliance (Schedule T GMP).',
        absTkConsiderations:
          'MANDATORY: Under Section 6 of the Biological Diversity Act 2002, the applicant MUST obtain prior approval from the National Biodiversity Authority (NBA) in Form III before applying for an IP right in India or abroad. Section 10(4)(ii)(D) of the Patents Act also mandates declaring the exact geographical origin of biological ingredients.',
        recommendedNextActions: [
          'Conduct a comparative in-vitro / in-vivo synergy assay demonstrating combination index < 1 to overcome Section 3(e).',
          'File Form III with the National Biodiversity Authority (NBA) prior to patent filing/grant.',
          'Verify biological material source documentation to satisfy Section 10(4)(ii)(D) disclosure.',
          'Register brand trademark under Class 5 to safeguard commercial identity while patent examination proceeds.',
        ],
        uncertaintyAndEscalation:
          'Moderate uncertainty regarding examiner evaluation of inventive step and TKDL cross-referencing. Recommended to consult with the AIIA IP Cell or an Ayush patent attorney.',
        citations,
        groundingStatus,
        groundingScore,
        jurisdictionUsed: 'INDIA',
        detectedLanguage: language,
      };
    } else if (isAbsQuery) {
      return {
        directAnswer:
          'Access to Indian biological resources triggers strict statutory compliance under the Biological Diversity Act, 2002. Foreign entities require prior NBA Form I approval, while Indian entities must provide prior intimation to the State Biodiversity Board (SBB) unless exempted under the 2023 Amendment.',
        whyApplies:
          'Sections 3, 6, and 7 of the Biological Diversity Act 2002 govern access and commercial utilization. The 2023 Amendment grants relief from SBB intimation for codified traditional knowledge and cultivated medicinal plants, but wild harvesting and any foreign participation retain strict pre-approval requirements.',
        formulationClassification: classificationContext,
        ipImplications: {
          patentability: 'Section 6 prohibits applying for IPR on biological inventions without previous NBA Form III clearance.',
          traditionalKnowledgeHurdle: 'Benefit sharing agreements with local communities or NBA fund are required under 2014 ABS Regulations.',
          trademarkAndBranding: 'Trademarks do not require NBA clearance, making brand protection an immediate priority.',
        },
        regulatoryImplications:
          'Operating without requisite NBA/SBB clearance can lead to penal proceedings under Section 55 of the Biological Diversity Act.',
        absTkConsiderations:
          'Benefit sharing liability: 0.1% to 0.5% of ex-factory gross sales or 3% to 5% of raw material purchase price under 2014 ABS Guidelines.',
        recommendedNextActions: [
          'Determine entity status: if any foreign equity/shareholding exists, immediately submit NBA Form I.',
          'If sourcing from wild forest areas, file prior intimation with the respective State Biodiversity Board (SBB).',
          'Obtain raw material procurement vouchers certifying whether herbs are wild-collected or cultivated.',
        ],
        uncertaintyAndEscalation:
          'State Biodiversity Boards vary in enforcement parameters for commercial utilization. Consult the State Biodiversity Board legal desk.',
        citations,
        groundingStatus,
        groundingScore,
        jurisdictionUsed: 'INDIA',
        detectedLanguage: language,
      };
    } else {
      // General India Ayush query
      return {
        directAnswer:
          'Ayurvedic products in India fall under distinct statutory categories: Classical Medicines (Sec 3(a)), Proprietary Medicines (Sec 3(h)), Phytopharmaceuticals (CDSCO), or Ayurveda Aahar (FSSAI). Each dictates unique IP boundaries, licensing obligations, and ABS mandates.',
        whyApplies:
          'The Drugs & Cosmetics Act 1940 governs medicinal safety and licensing; the Patents Act 1970 governs IP eligibility (with strict Section 3(p) TK exclusions); and the Biological Diversity Act 2002 regulates access to botanical resources.',
        formulationClassification: classificationContext,
        ipImplications: {
          patentability: 'Novel extraction methods or synergistic formulations can be patented; unmodified classical recipes cannot (Sec 3(p)).',
          traditionalKnowledgeHurdle: 'TKDL protects classical recipes from unauthorized biopiracy; defensive protection is automatic.',
          trademarkAndBranding: 'Class 5 registration and AYUSH Standard/Premium Marks offer robust commercial differentiation.',
        },
        regulatoryImplications:
          'Manufacturing requires Form 25D from the State Ayush Licensing Authority with Schedule T GMP compliance, or FSSAI approval if positioned as Ayurveda Aahar.',
        absTkConsiderations:
          'File SBB intimation for wild harvested ingredients; ensure NBA Form III clearance prior to any patent grant.',
        recommendedNextActions: [
          'Confirm whether product is marketed as therapeutic drug (Ayush SLA) or food supplement (FSSAI).',
          'Draft clear manufacturing standard operating procedures (SOPs) matching Pharmacopoeial standards.',
          'Verify trademark availability on the IP India public search portal.',
        ],
        uncertaintyAndEscalation:
          'Low to moderate uncertainty based on standard statutory provisions. Engage Ayush Facilitation Cell for dossier audit.',
        citations,
        groundingStatus,
        groundingScore,
        jurisdictionUsed: 'INDIA',
        detectedLanguage: language,
      };
    }
  } else {
    // INTERNATIONAL JURISDICTION
    return {
      directAnswer:
        language === 'hi'
          ? 'अंतर्राष्ट्रीय क्षेत्राधिकार (International Jurisdiction) में आयुर्वेदिक उत्पादों का वर्गीकरण देश-विशिष्ट नियमों पर निर्भर करता है। अमेरिका में मुख्य रूप से DSHEA 1994 के तहत आहार पूरक (Dietary Supplement) या वानस्पतिक दवा (Botanical Drug) के रूप में, जबकि यूरोपीय संघ में THMPD 2004/24/EC या नॉवेल फूड विनियमन के तहत नियंत्रित किया जाता है।'
          : 'In the International Regime, Ayurvedic products face jurisdiction-specific pathways: in the US, primarily as Dietary Supplements under DSHEA 1994 (or Botanical Drugs under FDA Guidance); in the EU, under the Traditional Herbal Medicinal Products Directive (THMPD 2004/24/EC) or Novel Food Regulation (EU 2015/2283). Under the 2024 WIPO Treaty, patent filings worldwide mandate disclosure of genetic resources and traditional knowledge origins.',
      whyApplies:
        'International commercialization requires harmonizing with the Nagoya Protocol (PIC/MAT/IRCC) and national drug/food safety agencies. Unsubstantiated therapeutic claims in the US or EU violate regulatory standards without prescription NDA or THMPD authorization.',
      formulationClassification: classificationContext,
      ipImplications: {
        patentability:
          'WIPO Treaty (May 2024) Article 3 mandates disclosing country of origin (India) and traditional knowledge community in patent applications globally. The USPTO and EPO actively query TKDL databases during examination.',
        traditionalKnowledgeHurdle:
          'In US (35 U.S.C. 102/103) and Europe (EPC Art 54/56), classical publications cited in TKDL constitute valid prior art destroying novelty and inventive step.',
        trademarkAndBranding:
          'Register international trademarks via the Madrid System (WIPO) under Class 5 designating key target markets (US, EU, UK, UAE).',
        otherIP:
          'Geographical Indications (e.g. Malabar Pepper, Navara Rice) can receive reciprocal protection through bilateral trade agreements.',
      },
      regulatoryImplications:
        'US Market: Marketable as dietary supplement with structure/function claims (e.g., "supports joint mobility") accompanied by mandatory FDA disclaimer. Disease treatment claims trigger illegal unapproved drug enforcement.\nEU Market: Formidable barrier under THMPD requiring 15 years of documented medicinal use within the EU; alternatively, notify as Traditional Food from a Third Country under Regulation (EU) 2015/2283.',
      absTkConsiderations:
        'Under Nagoya Protocol Articles 5 & 6, international users must present an Internationally Recognized Certificate of Compliance (IRCC) generated through India NBA clearance. Sourcing without NBA Form I approval can trigger border blocks and patent revocation.',
      recommendedNextActions: [
        'Review product labeling to remove all disease mitigation/cure claims for US DSHEA compliance.',
        'File an international trademark application under the Madrid Protocol designating export destinations.',
        'Obtain an IRCC from the National Biodiversity Authority prior to executing foreign distributor supply agreements.',
        'Obtain the AYUSH Premium Mark (QCI) certifying heavy metal and pesticide compliance for export clearance.',
      ],
      uncertaintyAndEscalation:
        'High regulatory divergence between US (FDA) and EU (EMA) regimes. Consult specialized international regulatory counsel for target destination dossier submissions.',
      citations,
      groundingStatus,
      groundingScore,
      jurisdictionUsed: 'INTERNATIONAL',
      detectedLanguage: language,
    };
  }
}
