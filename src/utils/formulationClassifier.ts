import { FormulationProfile, ClassificationResult, RegulatoryCategory } from '../types/index.ts';
import { AUTHORITATIVE_CORPUS } from '../data/authoritativeCorpus.ts';

export function classifyAyurvedaFormulation(profile: FormulationProfile): ClassificationResult {
  const reasoning: string[] = [];
  const informationStillRequired: string[] = [];
  const applicableRegulatoryPathways: string[] = [];
  const applicableIPPathways: string[] = [];
  const relevantEvidence: ClassificationResult['relevantEvidence'] = [];

  let category: RegulatoryCategory = 'Undetermined / Insufficient Evidence';
  let confidence: ClassificationResult['confidence'] = 'Medium';
  let statutoryBasis = '';

  // 1. Food / Dietary Supplement check
  if (profile.intendedUse === 'Food & Dietary Supplement') {
    category = 'Ayurveda Aahar (Nutraceutical)';
    confidence = 'High';
    statutoryBasis = 'Food Safety and Standards (Ayurveda Aahar) Regulations, 2022 (FSSAI / Ministry of Ayush)';
    reasoning.push(
      'The product is intended as food/dietary supplement rather than therapeutic treatment of disease.',
      'Under Regulation 3 of FSSAI Ayurveda Aahar Regulations 2022, formulations prepared in accordance with recipes specified in Schedule A are regulated as Ayurveda Aahar.',
      'CRITICAL: Product labels and marketing CANNOT claim to diagnose, mitigate, prevent, treat or cure any human disease.'
    );
    applicableRegulatoryPathways.push(
      'FSSAI Central / State Food Licensing with prior approval from the FSSAI Ayurveda Aahar Expert Committee.',
      'Mandatory printing of official Ayurveda Aahar logo and target consumer cautionary statements.',
      'Compliance with FSSAI (Packaging and Labelling) Regulations.'
    );
    applicableIPPathways.push(
      'Trade Marks: Register brand name in Class 29/30 (Food preparations) and Class 5 (Dietetic substances). Avoid descriptive Sanskrit ingredient names under Sec 9(1)(b).',
      'Patents: Severe exclusion under Section 3(e) (mere admixture of food ingredients) unless synergistic nutritional or non-obvious stabilizing effect is proven.',
      'ABS Requirement: Commercial food utilization requires State Biodiversity Board (SBB) intimation under Section 7 of Biological Diversity Act 2002 (unless exempted as cultivated medicinal plants under 2023 amendment).'
    );

    const fssaiDoc = AUTHORITATIVE_CORPUS.find((d) => d.id === 'IN-FSSAI-AAHAR-2022');
    if (fssaiDoc) {
      relevantEvidence.push({
        authority: fssaiDoc.issuingAuthority,
        section: fssaiDoc.sectionOrRule,
        snippet: fssaiDoc.summary,
        url: fssaiDoc.url,
      });
    }
  }
  // 2. Cosmetic check
  else if (profile.intendedUse === 'Cosmetic') {
    category = 'Ayush Cosmetic (Saundarya Prasadaka)';
    confidence = 'High';
    statutoryBasis = 'Drugs and Cosmetics Rules, 1945 — Part XVI-A (Ayurvedic Cosmetics / Saundarya Prasadaka)';
    reasoning.push(
      'Formulation is intended for external application for cleansing, beautifying, promoting attractiveness, or altering appearance without drug therapeutic action.',
      'Ingredients must be derived from classical Ayurvedic texts or approved cosmetic excipients.'
    );
    applicableRegulatoryPathways.push(
      'Cosmetic manufacturing license from State Licensing Authority (SLA) on Form 32A.',
      'Heavy metal limits (Lead < 20ppm, Arsenic < 2ppm, Mercury < 1ppm) and microbiological testing compliance.'
    );
    applicableIPPathways.push(
      'Design Registration under Designs Act 2000 for novel applicator, dispensing mechanism, or packaging bottle.',
      'Trade Mark registration under Class 3 (Cosmetics, non-medicated toiletry preparations).',
      'Trade Secret protection for proprietary cold-press emulsification and stabilization protocols.'
    );
  }
  // 3. Classical Ayurvedic Drug (Strict adherence to First Schedule texts)
  else if (profile.classicalTextBasis && profile.exactClassicalTraceable && !profile.modificationsMade && !profile.novelProcessElement) {
    category = 'Classical Ayurvedic Drug (Sec 3(a))';
    confidence = 'High';
    statutoryBasis = 'Section 3(a) of the Drugs and Cosmetics Act, 1940 & First Schedule Texts';
    reasoning.push(
      `Formulation is manufactured strictly according to the formula described in the authoritative books specified in the First Schedule (e.g., ${profile.classicalTextName || 'Charaka Samhita / Sharangadhara Samhita'}).`,
      'No ingredients have been added or removed; standard classical preparation methods (e.g. Asava, Arishta, Kwatha, Bhasma, Taila) are maintained without unauthorized excipients.'
    );
    applicableRegulatoryPathways.push(
      'Manufacturing license from State Ayush Licensing Authority (SLA) in Form 25D.',
      'Exempt from clinical trial proof of efficacy under Rule 158B, provided classical text reference is cited on the label and file.',
      'Mandatory compliance with Ayurvedic Pharmacopoeia of India (API) standards and Schedule T Good Manufacturing Practices (GMP).'
    );
    applicableIPPathways.push(
      'NO PATENT ELIGIBILITY: Ineligible for patent grant under Section 3(p) of the Indian Patents Act, 1970 (excluded as traditional knowledge codified in classical texts and TKDL).',
      'Trade Marks: Product can only be protected via a distinctive coined brand/house mark under Class 5; the generic classical name (e.g., "Chyawanprash", "Rasna Saptaka") belongs to the public domain.',
      'ABS Status: Indian entities manufacturing classical codified formulations are granted relief from SBB prior intimation under Section 7 Proviso of Biological Diversity (Amendment) Act, 2023.'
    );

    const doc3a = AUTHORITATIVE_CORPUS.find((d) => d.id === 'IN-DC-SEC-3A');
    const doc3p = AUTHORITATIVE_CORPUS.find((d) => d.id === 'IN-PAT-SEC-3P');
    if (doc3a) relevantEvidence.push({ authority: doc3a.issuingAuthority, section: doc3a.sectionOrRule, snippet: doc3a.summary, url: doc3a.url });
    if (doc3p) relevantEvidence.push({ authority: doc3p.issuingAuthority, section: doc3p.sectionOrRule, snippet: doc3p.summary, url: doc3p.url });
  }
  // 4. Phytopharmaceutical check (Purified fraction with standardized markers)
  else if (profile.novelProcessElement && profile.modificationsMade && profile.processDescription?.toLowerCase().includes('fraction') && profile.processDescription?.toLowerCase().includes('marker')) {
    category = 'Phytopharmaceutical Drug';
    confidence = 'High';
    statutoryBasis = 'New Drugs and Clinical Trials Rules, 2019 — Chapter XIX & Rule 91/92 (CDSCO)';
    reasoning.push(
      'The product involves purified, standardized fraction of medicinal plant extract with defined minimum four analytical/bioactive marker compounds.',
      'Targeted for diagnosis, treatment, or mitigation of specific diseases in modern medical terminology.'
    );
    applicableRegulatoryPathways.push(
      'Regulated by CDSCO / Drug Controller General of India (DCGI) rather than purely State Ayush SLA.',
      'Requires Investigational New Drug (IND) approval, safety pharmacology, genotoxicity, and Phase I/II/III human clinical trials.',
      'Standardization dossier with HPLC/LC-MS fingerprinting.'
    );
    applicableIPPathways.push(
      'Strongest Patent Pathway: Potential to obtain product and process patent claims if the specific standardized fraction exhibits non-obvious, surprising therapeutic efficacy overcoming Section 3(p) and Section 3(d)/3(e).',
      'Mandatory NBA Form III approval under Section 6 of BD Act 2002 before patent grant.',
      'Mandatory disclosure of biological source & geographical origin in patent specification under Section 10(4)(ii)(D).'
    );

    const phytoDoc = AUTHORITATIVE_CORPUS.find((d) => d.id === 'IN-CDSCO-PHYTO-2019');
    if (phytoDoc) relevantEvidence.push({ authority: phytoDoc.issuingAuthority, section: phytoDoc.sectionOrRule, snippet: phytoDoc.summary, url: phytoDoc.url });
  }
  // 5. Ayurvedic Proprietary Medicine (Classical ingredients with modifications/novel combination/novel extraction)
  else {
    category = 'Ayurvedic Proprietary Medicine (Sec 3(h))';
    confidence = profile.classicalTextBasis || profile.biologicalResources.length > 0 ? 'High' : 'Medium';
    statutoryBasis = 'Section 3(h) of the Drugs and Cosmetics Act, 1940 & Rule 158B of Drugs and Cosmetics Rules, 1945';
    reasoning.push(
      'Contains ingredients described in the authoritative books of Ayurveda (First Schedule), but is NOT manufactured exclusively according to the classical formulae.',
      profile.modificationsMade
        ? `Modifications detected: ${profile.modificationDescription || 'Altered herb ratios, addition of modern excipients or bio-enhancers'}.`
        : 'Formulation changes or novel dosage forms (e.g. tablet, syrup, topical gel) applied to classical remedies.',
      profile.novelProcessElement
        ? `Novel process element applied: ${profile.processDescription || 'Supercritical fluid extraction / ultrasound-assisted extraction / standardization'}.`
        : 'Standard manufacturing process with altered formulation.'
    );
    applicableRegulatoryPathways.push(
      'License from State Ayush Licensing Authority (SLA) in Form 25D under Rule 158B.',
      'Submission of textual rationale for individual herbs from First Schedule books.',
      'Proof of safety and effectiveness: Pilot clinical data, published safety literature, heavy metal limits testing, and Schedule T GMP compliance.'
    );
    applicableIPPathways.push(
      'Patents: HIGH SCRUTINY under Section 3(p) (Traditional Knowledge) and Section 3(e) (Mere admixture). Applicant MUST submit comparative experimental synergistic data (Combination Index < 1) showing superior therapeutic effect over individual herbs.',
      'Process Patent: If the extraction method (e.g., supercritical CO2 parameters, specific temperature/solvent ratio) is novel and non-obvious, a process patent claim is viable.',
      'Trade Marks: Protect coined proprietary product name under Class 5 with Trade Marks Registry.',
      'Trade Secrets: Protect specific proprietary blending ratios, extraction duration, and quality control standard operating procedures.'
    );

    const doc3h = AUTHORITATIVE_CORPUS.find((d) => d.id === 'IN-DC-SEC-3H');
    const doc158 = AUTHORITATIVE_CORPUS.find((d) => d.id === 'IN-DC-RULE-158B');
    const doc3e = AUTHORITATIVE_CORPUS.find((d) => d.id === 'IN-PAT-SEC-3E');
    if (doc3h) relevantEvidence.push({ authority: doc3h.issuingAuthority, section: doc3h.sectionOrRule, snippet: doc3h.summary, url: doc3h.url });
    if (doc158) relevantEvidence.push({ authority: doc158.issuingAuthority, section: doc158.sectionOrRule, snippet: doc158.summary, url: doc158.url });
    if (doc3e) relevantEvidence.push({ authority: doc3e.issuingAuthority, section: doc3e.sectionOrRule, snippet: doc3e.summary, url: doc3e.url });
  }

  // Common ABS checks based on profile
  if (profile.isEntityForeignStake) {
    reasoning.push(
      'FOREIGN EQUITY / CONTROL DETECTED: Under Section 3 of the Biological Diversity Act, 2002, any entity having foreign equity or non-Indian management MUST obtain prior approval from the National Biodiversity Authority (NBA) via Form I before obtaining Indian biological resources.'
    );
    applicableRegulatoryPathways.push('National Biodiversity Authority (NBA) Form I Access Clearance.');
  }

  // Information still required / Gaps
  if (!profile.classicalTextName && profile.classicalTextBasis) {
    informationStillRequired.push('Exact citation of classical Ayurvedic text and shloka from First Schedule (e.g., Sharangadhara Samhita Madhyama Khanda Chapter 2).');
  }
  if (profile.biologicalResources.length === 0) {
    informationStillRequired.push('Complete list of botanical species with botanical binomial names (e.g., Boswellia serrata, Piper nigrum).');
  }
  if (!profile.sourceLocation) {
    informationStillRequired.push('Exact geographical location and procurement method of biological resources (wild harvested vs farm cultivated, specific state/forest division).');
  }
  if (profile.modificationsMade && !profile.processDescription) {
    informationStillRequired.push('Detailed technical description of process novelty (extraction solvent, temperature, pressure, yield) to evaluate process patentability.');
  }

  return {
    category,
    confidence,
    statutoryBasis,
    reasoning,
    informationStillRequired,
    applicableRegulatoryPathways,
    applicableIPPathways,
    relevantEvidence,
    disclaimer:
      'DISCLAIMER: This classification is generated for informational, educational and research guidance under SIH 2026 Problem Statement 26045. It does not constitute a formal legal opinion, binding statutory ruling, or patent freedom-to-operate certification. Formal classification and marketing authorization must be obtained from the State Ayush Licensing Authority, CDSCO, FSSAI, or National Biodiversity Authority as applicable.',
  };
}
