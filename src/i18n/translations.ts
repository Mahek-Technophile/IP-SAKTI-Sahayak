import { LanguageCode } from '../types/index.ts';

export interface TranslationDictionary {
  header: {
    sihTitle: string;
    ministryAyush: string;
    problemStatement: string;
    appTitle: string;
    appSubtitle: string;
    prototypeBadge: string;
    ragBadge: string;
    loadDemoBtn: string;
    indiaRegime: string;
    internationalRegime: string;
    indiaTooltip: string;
    internationalTooltip: string;
    langLabel: string;
  };
  tabs: {
    assistant: string;
    classifier: string;
    ipNavigator: string;
    absTk: string;
    corpus: string;
    checklist: string;
    evaluation: string;
  };
  assistant: {
    title: string;
    subtitle: string;
    activeJurisdictionBadge: string;
    indiaRegimeBadge: string;
    internationalRegimeBadge: string;
    suggestedHeading: string;
    inputPlaceholder: string;
    sendButton: string;
    queryingButton: string;
    clearChat: string;
    escalateToAIIA: string;
    directAnswer: string;
    whyApplies: string;
    classification: string;
    ipImplications: string;
    patentability: string;
    tkHurdle: string;
    trademark: string;
    tradeSecret: string;
    regulatoryImplications: string;
    absTk: string;
    actionItems: string;
    uncertaintyNotice: string;
    verifiedCitations: string;
    viewCitationDrawer: string;
    addToChecklist: string;
    groundedHigh: string;
    groundedPartial: string;
    groundedAbstain: string;
    disclaimer: string;
    tier1Badge: string;
    tier2Badge: string;
    tier3Badge: string;
    suggestedQueries: {
      title: string;
      query: string;
    }[];
  };
  classifier: {
    title: string;
    subtitle: string;
    productDetailsHeading: string;
    productNameLabel: string;
    classicalBasisLabel: string;
    classicalYes: string;
    classicalNo: string;
    classicalTextNameLabel: string;
    exactRecipeLabel: string;
    exactYes: string;
    exactNo: string;
    modificationsLabel: string;
    modificationDescLabel: string;
    novelProcessLabel: string;
    processDescLabel: string;
    intendedUseLabel: string;
    targetCategoryLabel: string;
    biologicalResourcesLabel: string;
    sourceLocationLabel: string;
    foreignStakeLabel: string;
    assessmentHeading: string;
    statutoryBasisLabel: string;
    licensingAuthorityLabel: string;
    licensingFormLabel: string;
    requiredDossierLabel: string;
    statutoryCaveatsLabel: string;
    askAssistantBtn: string;
    addActionsBtn: string;
    herbNovaBadge: string;
  };
  ipNavigator: {
    title: string;
    subtitle: string;
    badge: string;
    routesHeading: string;
    whatIsProtectable: string;
    exclusionsAndHurdles: string;
    competentAuthority: string;
    recommendedActions: string;
    addActionsBtn: string;
    askAssistantBtn: string;
  };
  absModule: {
    title: string;
    subtitle: string;
    calculatorHeading: string;
    annualTurnoverLabel: string;
    foreignEntityLabel: string;
    wildHarvestLabel: string;
    codifiedClassicalLabel: string;
    targetIPLabel: string;
    resultsHeading: string;
    benefitSharingEstimate: string;
    mandatoryChecklist: string;
    addChecklistBtn: string;
  };
  sourceExplorer: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allTiers: string;
    tier1: string;
    tier2: string;
    tier3: string;
    allJurisdictions: string;
    indiaOnly: string;
    intlOnly: string;
    viewSourceText: string;
    officialPortal: string;
    checksum: string;
    effectiveDate: string;
  };
  checklist: {
    title: string;
    subtitle: string;
    exportJson: string;
    printList: string;
    addCustom: string;
    statusPending: string;
    statusProgress: string;
    statusCompleted: string;
    emptyMessage: string;
    authorityCol: string;
    statuteCol: string;
    actionCol: string;
    statusCol: string;
  };
  evaluation: {
    title: string;
    subtitle: string;
    rerunBtn: string;
    runningBtn: string;
    groundedRate: string;
    citationIntegrity: string;
    abstentionPrecision: string;
    accuracy: string;
    avgLatency: string;
    testCasesRun: string;
    tableHeading: string;
  };
  escalationModal: {
    title: string;
    subtitle: string;
    applicantName: string;
    email: string;
    org: string;
    formulationName: string;
    issueType: string;
    details: string;
    submitBtn: string;
    closeBtn: string;
    successMessage: string;
    referenceIdLabel: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  // ==========================================
  // ENGLISH
  // ==========================================
  en: {
    header: {
      sihTitle: 'Smart India Hackathon 2026',
      ministryAyush: 'Ministry of Ayush / All India Institute of Ayurveda (AIIA)',
      problemStatement: 'Problem Statement 26045',
      appTitle: 'IP-SAKTI Sahayak',
      appSubtitle: 'From Ayurvedic Innovation to Evidence-Backed IP & Regulatory Guidance',
      prototypeBadge: 'Prototype v1.0',
      ragBadge: 'Authoritative Source-Grounded RAG',
      loadDemoBtn: 'Load “HerbNova” Demo',
      indiaRegime: 'INDIA REGIME',
      internationalRegime: 'INTERNATIONAL',
      indiaTooltip: 'Prioritize Indian Statutes: Drugs & Cosmetics Act, Patents Act Sec 3(p), Biological Diversity Act',
      internationalTooltip: 'Prioritize Treaties (WIPO 2024, Nagoya), US FDA Botanical/DSHEA, EU THMPD 2004/24/EC',
      langLabel: 'Language:',
    },
    tabs: {
      assistant: 'Ask Assistant',
      classifier: 'Formulation Classifier',
      ipNavigator: 'IP Navigator',
      absTk: 'ABS & Traditional Knowledge',
      corpus: 'Source Explorer',
      checklist: 'Action Checklist',
      evaluation: 'SIH Evaluation',
    },
    assistant: {
      title: 'Source-Grounded Ayurvedic IP & Regulatory Assistant',
      subtitle:
        'Synthesizes legal and technical assessments directly from statutory sources. Actively abstains from speculation where legal evidence is insufficient.',
      activeJurisdictionBadge: 'Active Statutory Regime:',
      indiaRegimeBadge: 'Republic of India (Patents Act 1970, Drugs & Cosmetics Act 1940, Biological Diversity Act 2002)',
      internationalRegimeBadge: 'International Treaties & Export (WIPO 2024, US FDA DSHEA/Botanical, EU THMPD)',
      suggestedHeading: 'Suggested Test Cases & Statutory Queries',
      inputPlaceholder:
        'Ask about patentability (Sec 3(p), 3(e)), NBA approval, FSSAI Ayurveda Aahar rules, or export pathways...',
      sendButton: 'Query RAG Engine',
      queryingButton: 'Analyzing Statutes...',
      clearChat: 'Clear History',
      escalateToAIIA: 'Refer to AIIA IP Facilitation Cell',
      directAnswer: 'Direct Regulatory Assessment',
      whyApplies: 'Authoritative Statutory Rationale',
      classification: 'Formulation Classification',
      ipImplications: 'Intellectual Property Implications',
      patentability: 'Patentability & Novelty Criteria',
      tkHurdle: 'Traditional Knowledge (TKDL) Hurdle',
      trademark: 'Trademark & Commercial Identity',
      tradeSecret: 'Trade Secrets & Process Know-How',
      regulatoryImplications: 'Drug & Food Licensing Pathways',
      absTk: 'Access & Benefit Sharing (ABS) & NBA Clearances',
      actionItems: 'Recommended Action Items',
      uncertaintyNotice: 'Statutory Boundary & Uncertainty Notice',
      verifiedCitations: 'Authoritative Statutory Citations (Primary Sources)',
      viewCitationDrawer: 'Inspect Citation Proof',
      addToChecklist: 'Add Action Items to Compliance Checklist',
      groundedHigh: 'Source Grounded (High Confidence)',
      groundedPartial: 'Partially Grounded',
      groundedAbstain: 'Safe Abstention / Insufficient Evidence',
      disclaimer:
        'Statutory Disclaimer: IP-SAKTI Sahayak is an educational decision-support prototype under SIH 2026. Official filings require review by a registered Patent Agent or State Ayush Licensing Authority.',
      tier1Badge: 'Tier 1: Primary Legislation',
      tier2Badge: 'Tier 2: Official Regulations',
      tier3Badge: 'Tier 3: Pharmacopoeial Standards',
      suggestedQueries: [
        {
          title: 'Patentability of Classical Recipes',
          query: 'Can I patent an unmodified classical Ayurvedic Rasna Saptaka Kwatha formulation in India?',
        },
        {
          title: 'Overcoming Section 3(e) Synergistic Admixture',
          query: 'How can our polyherbal formulation overcome Section 3(e) and 3(p) rejections with synergistic data?',
        },
        {
          title: 'NBA Form III Approval Requirement',
          query: 'What are the legal requirements to obtain NBA approval under Section 6 before filing an Ayurvedic patent?',
        },
        {
          title: 'Ayurveda Aahar Disease Claims',
          query: 'Can an Ayurveda Aahar product claim to alleviate joint inflammation or osteoarthritis?',
        },
        {
          title: 'US Export: FDA Botanical vs DSHEA',
          query: 'What are the regulatory pathways to export our Ayurvedic joint wellness formulation to the United States?',
        },
        {
          title: 'Safe Abstention Test',
          query: 'Can you guarantee that my Ayurvedic patent application will be granted 100% by the controller?',
        },
      ],
    },
    classifier: {
      title: '10-Factor Guided Formulation Classification Engine',
      subtitle: 'Statutory routing under Drugs & Cosmetics Act 1940, FSSAI Ayurveda Aahar 2022, and CDSCO rules.',
      productDetailsHeading: 'Formulation Parameters & Characteristics',
      productNameLabel: 'Product / Invention Name',
      classicalBasisLabel: 'Formulation based on First Schedule Classical Ayush Text?',
      classicalYes: 'Yes, rooted in classical Samhitas',
      classicalNo: 'No, purely newly designed botanical combination',
      classicalTextNameLabel: 'Name of Authoritative Classical Text (e.g. Sharangadhara Samhita)',
      exactRecipeLabel: 'Is the formula an exact, unmodified classical preparation?',
      exactYes: 'Exact classical recipe (Section 3(a))',
      exactNo: 'Modified / Novel Additions or Hydro-Alcoholic Extracts',
      modificationsLabel: 'Have modifications or non-classical adjuvants been added?',
      modificationDescLabel: 'Describe Ingredients Added / Substituted / Novel Ratio',
      novelProcessLabel: 'Does the production involve novel extraction or processing technology?',
      processDescLabel: 'Process Description (e.g., scCO2 extraction, ultrasound cell disruption)',
      intendedUseLabel: 'Intended Primary Use & Marketing Claims',
      targetCategoryLabel: 'Target Regulatory Positioning',
      biologicalResourcesLabel: 'Botanical Ingredients (Common / Botanical Names)',
      sourceLocationLabel: 'Geographical Sourcing Location of Herbs',
      foreignStakeLabel: 'Does the manufacturing entity have any foreign equity or non-resident ownership?',
      assessmentHeading: 'Statutory Classification & Licensing Road-Map',
      statutoryBasisLabel: 'Governing Statute & Rule',
      licensingAuthorityLabel: 'Competent Licensing Authority',
      licensingFormLabel: 'Prescribed Application Form',
      requiredDossierLabel: 'Mandatory Evidentiary & Quality Dossier',
      statutoryCaveatsLabel: 'Statutory Warnings & Claim Restrictions',
      askAssistantBtn: 'Query RAG Assistant on this Profile',
      addActionsBtn: 'Add Licensing Tasks to Action Checklist',
      herbNovaBadge: 'Pre-loaded with HerbNova Arthrosoul Scenario',
    },
    ipNavigator: {
      title: '9-Route Ayurvedic IP Protection Navigator',
      subtitle: 'Comprehensive statutory guide spanning Patents, Traditional Knowledge, ABS, Trademarks, GI, and Trade Secrets.',
      badge: 'Statutory IP Guidance',
      routesHeading: 'Available Protection Routes for Ayurvedic Innovations',
      whatIsProtectable: 'What is Protectable',
      exclusionsAndHurdles: 'Statutory Exclusions & Legal Hurdles',
      competentAuthority: 'Competent Statutory Authority',
      recommendedActions: 'Recommended Actionable Steps',
      addActionsBtn: 'Add to Checklist',
      askAssistantBtn: 'Ask Assistant about this Route',
    },
    absModule: {
      title: 'ABS & Traditional Knowledge Compliance Matrix',
      subtitle: 'Statutory assessment under Biological Diversity Act 2002 (as amended 2023) and ABS Regulations 2014.',
      calculatorHeading: 'Interactive Statutory ABS Assessment & Fee Estimator',
      annualTurnoverLabel: 'Annual Gross Ex-Factory Turnover (INR)',
      foreignEntityLabel: 'Foreign Entity or Non-Resident Participation (Section 3 trigger)',
      wildHarvestLabel: 'Herbs harvested from Wild Forest Lands (Section 7 SBB trigger)',
      codifiedClassicalLabel: 'Formulation derived strictly from codified classical texts (2023 Proviso exemption)',
      targetIPLabel: 'Filing for Patent / IPR in India or Abroad (Section 6 NBA Form III trigger)',
      resultsHeading: 'Statutory Determination & Benefit-Sharing Estimate',
      benefitSharingEstimate: 'Estimated Access & Benefit Sharing (ABS) Levy',
      mandatoryChecklist: 'Statutory Filings Required',
      addChecklistBtn: 'Add ABS Requirements to Checklist',
    },
    sourceExplorer: {
      title: 'Authoritative Public-Source Legal Corpus Explorer',
      subtitle: 'Searchable repository of verified Tier 1 primary legislation, official gazette notifications, and international treaties.',
      searchPlaceholder: 'Search by section, keyword (e.g. 3(p), synergy, Form 25D, WIPO, ABS)...',
      allTiers: 'All Source Tiers',
      tier1: 'Tier 1: Primary Legislation (Acts/Treaties)',
      tier2: 'Tier 2: Official Regulations/Rules',
      tier3: 'Tier 3: Pharmacopoeia & Technical Standards',
      allJurisdictions: 'All Jurisdictions',
      indiaOnly: 'India Only',
      intlOnly: 'International Only',
      viewSourceText: 'View Official Statutory Excerpt',
      officialPortal: 'Official Portal',
      checksum: 'SHA-256 Checksum',
      effectiveDate: 'Enacted / Effective',
    },
    checklist: {
      title: 'Ayurvedic IP & Regulatory Action Checklist',
      subtitle: 'Track your prioritized statutory compliance tasks, filing forms, and responsible authorities.',
      exportJson: 'Export Checklist (JSON)',
      printList: 'Print / Save PDF',
      addCustom: 'Add Custom Action Item',
      statusPending: 'Pending',
      statusProgress: 'In Progress',
      statusCompleted: 'Completed',
      emptyMessage: 'No action items yet. Use the Assistant, Formulation Classifier, or IP Navigator to add statutory compliance tasks.',
      authorityCol: 'Authority',
      statuteCol: 'Governing Statute',
      actionCol: 'Action Required',
      statusCol: 'Status',
    },
    evaluation: {
      title: 'SIH 2026 Empirical Benchmark & Evaluation Suite',
      subtitle: 'Empirical quality metrics, citation precision, safe abstention, and latency for Problem Statement 26045.',
      rerunBtn: 'Re-Run Benchmark Suite',
      runningBtn: 'Executing Evaluation Suite...',
      groundedRate: 'Grounded Rate',
      citationIntegrity: 'Citation Integrity',
      abstentionPrecision: 'Abstention Precision',
      accuracy: 'Statutory Accuracy',
      avgLatency: 'Average Latency',
      testCasesRun: 'Test Cases Run',
      tableHeading: 'Gold-Standard Benchmark Test Cases & Statutory Grounding Verification',
    },
    escalationModal: {
      title: 'Refer to AIIA IP Facilitation Cell / NRDC Ayush Desk',
      subtitle: 'Direct escalation channel for Section 3(p) objections, patent drafting guidance, and institutional mentoring.',
      applicantName: 'Applicant / Innovator Name',
      email: 'Email Address',
      org: 'Institution / Company Name',
      formulationName: 'Formulation / Technology Name',
      issueType: 'Primary Legal / Regulatory Query',
      details: 'Detailed Background & Specific Query',
      submitBtn: 'Submit Escalation Request',
      closeBtn: 'Cancel',
      successMessage: 'Your referral has been successfully registered with the AIIA IP Facilitation Cell.',
      referenceIdLabel: 'Assigned Reference ID',
    },
  },

  // ==========================================
  // HINDI (हिन्दी)
  // ==========================================
  hi: {
    header: {
      sihTitle: 'स्मार्ट इंडिया हैकथॉन २०२६',
      ministryAyush: 'आयुष मंत्रालय / अखिल भारतीय आयुर्वेद संस्थान (AIIA)',
      problemStatement: 'समस्या विवरण २६०४५',
      appTitle: 'आईपी-शक्ति सहायक',
      appSubtitle: 'आयुर्वेदिक नवाचार से प्रमाण-आधारित बौद्धिक संपदा एवं विनियामक मार्गदर्शन',
      prototypeBadge: 'प्रोटोटाइप संस्करण १.०',
      ragBadge: 'प्रामाणिक स्रोत-आधारित आरएजी (RAG)',
      loadDemoBtn: '“हर्बनॉवा” डेमो लोड करें',
      indiaRegime: 'भारत विनियामक व्यवस्था',
      internationalRegime: 'अंतरराष्ट्रीय व्यवस्था',
      indiaTooltip: 'भारतीय विधियों को प्राथमिकता: औषधि एवं प्रसाधन सामग्री अधिनियम, पेटेंट अधिनियम धारा ३(p), जैव विविधता अधिनियम',
      internationalTooltip: 'अंतरराष्ट्रीय संधियों को प्राथमिकता: विपो २०२४, नागोया प्रोटोकॉल, यूएस एफडीए वानस्पतिक/डीएसएचईए, ईयू टीएचएमपीडी',
      langLabel: 'भाषा:',
    },
    tabs: {
      assistant: 'सहायक से पूछें',
      classifier: 'योग वर्गीकरण (क्लासिफायर)',
      ipNavigator: 'बौद्धिक संपदा मार्गदर्शक',
      absTk: 'एबीएस एवं पारंपरिक ज्ञान',
      corpus: 'कानूनी स्रोत अन्वेषक',
      checklist: 'कार्य सूची (चेकलिस्ट)',
      evaluation: 'एसआईएच मूल्यांकन',
    },
    assistant: {
      title: 'स्रोत-आधारित आयुर्वेदिक बौद्धिक संपदा एवं विनियामक सहायक',
      subtitle:
        'भारतीय एवं अंतरराष्ट्रीय वैधानिक स्रोतों से प्रत्यक्ष प्रमाण-आधारित उत्तर प्रस्तुत करता है। अपर्याप्त कानूनी प्रमाण होने पर अनुमान लगाने से सुरक्षित रूप से बचता है।',
      activeJurisdictionBadge: 'सक्रिय विनियामक व्यवस्था:',
      indiaRegimeBadge: 'भारत गणराज्य (पेटेंट अधिनियम १९७०, औषधि एवं प्रसाधन सामग्री अधिनियम १९४०, जैव विविधता अधिनियम २००२)',
      internationalRegimeBadge: 'अंतरराष्ट्रीय संधियां एवं निर्यात (WIPO 2024, US FDA DSHEA/वानस्पतिक, EU THMPD)',
      suggestedHeading: 'सुझाए गए परीक्षण प्रश्न एवं कानूनी जिज्ञासाएं',
      inputPlaceholder:
        'पेटेंट पात्रता (धारा ३(p), ३(e)), एनबीए अनुमोदन, एफएसएसएआई आयुर्वेद आहार नियमों या निर्यात मार्गों के बारे में पूछें...',
      sendButton: 'आरएजी से पूछें',
      queryingButton: 'कानूनी विश्लेषण जारी है...',
      clearChat: 'इतिहास साफ़ करें',
      escalateToAIIA: 'एआईआईए आईपी सुविधा सेल को अग्रेषित करें',
      directAnswer: 'प्रत्यक्ष विनियामक मूल्यांकन',
      whyApplies: 'प्रामाणिक कानूनी आधार एवं तर्क',
      classification: 'योग का विनियामक वर्गीकरण',
      ipImplications: 'बौद्धिक संपदा संबंधी निहितार्थ',
      patentability: 'पेटेंट पात्रता एवं नवीनता मानदंड',
      tkHurdle: 'पारंपरिक ज्ञान (टीकेडीएल) बाधा',
      trademark: 'ट्रेडमार्क एवं वाणिज्यिक पहचान',
      tradeSecret: 'व्यापार रहस्य एवं प्रक्रिया ज्ञान',
      regulatoryImplications: 'औषधि एवं खाद्य लाइसेंसिंग मार्ग',
      absTk: 'पहुंच एवं लाभ साझाकरण (ABS) व NBA स्वीकृतियां',
      actionItems: 'अनुशंसित आगामी कार्रवाई कदम',
      uncertaintyNotice: 'कानूनी सीमा एवं अनिश्चितता सूचना',
      verifiedCitations: 'सत्यापित वैधानिक उद्धरण (प्राथमिक स्रोत)',
      viewCitationDrawer: 'उद्धरण प्रमाण देखें',
      addToChecklist: 'कार्य सूची में अनुशंसित कदम जोड़ें',
      groundedHigh: 'स्रोत आधारित (उच्च विश्वसनीयता)',
      groundedPartial: 'आंशिक रूप से आधारित',
      groundedAbstain: 'सुरक्षित अस्वीकरण / अपर्याप्त कानूनी साक्ष्य',
      disclaimer:
        'वैधानिक अस्वीकरण: आईपी-शक्ति सहायक एसआईएच २०२६ के तहत एक शैक्षिक निर्णय-समर्थन प्रोटोटाइप है। आधिकारिक आवेदनों के लिए पंजीकृत पेटेंट एजेंट या राज्य आयुष अनुज्ञापन प्राधिकारी की सलाह लें।',
      tier1Badge: 'स्तर १: प्राथमिक विधान',
      tier2Badge: 'स्तर २: आधिकारिक विनियम',
      tier3Badge: 'स्तर ३: भेषजसंहिता मानक',
      suggestedQueries: [
        {
          title: 'शास्त्रीय नुस्खों की पेटेंट पात्रता',
          query: 'क्या मैं भारत में अपरिवर्तित शास्त्रीय रास्ना सप्तक क्वाथ फॉर्मूलेशन का पेटेंट करा सकता हूँ?',
        },
        {
          title: 'धारा ३(e) सहक्रियात्मक प्रभाव सिद्ध करना',
          query: 'हमारा पॉलीहर्बल फॉर्मूलेशन धारा ३(e) और ३(p) के आक्षेपों को सहक्रियाशील डेटा के साथ कैसे दूर कर सकता है?',
        },
        {
          title: 'एनबीए प्रपत्र III अनुमोदन आवश्यकताएं',
          query: 'आयुर्वेदिक पेटेंट दाखिल करने से पहले धारा ६ के तहत राष्ट्रीय जैव विविधता प्राधिकरण से अनुमोदन के क्या नियम हैं?',
        },
        {
          title: 'आयुर्वेद आहार रोग निवारण दावे',
          query: 'क्या आयुर्वेद आहार उत्पाद जोड़ों के दर्द या गठिया को ठीक करने का वैधानिक दावा कर सकता है?',
        },
        {
          title: 'अमेरिका निर्यात: एफडीए वानस्पतिक बनाम डीएसएचईए',
          query: 'अमेरिका में हमारे आयुर्वेदिक संयुक्त स्वास्थ्य उत्पाद के निर्यात के लिए नियामक रास्ते क्या हैं?',
        },
        {
          title: 'सुरक्षित अस्वीकरण परीक्षण',
          query: 'क्या आप गारंटी दे सकते हैं कि पेटेंट नियंत्रक मेरे आवेदन को शत-प्रतिशत स्वीकार कर लेगा?',
        },
      ],
    },
    classifier: {
      title: '१०-कारकीय निर्देशित योग वर्गीकरण इंजन',
      subtitle: 'औषधि एवं प्रसाधन सामग्री अधिनियम १९४०, एफएसएसएआई आयुर्वेद आहार २०२२, तथा सीडीएससीओ नियमों के तहत स्वचालित रूटिंग।',
      productDetailsHeading: 'फॉर्मूलेशन मापदंड एवं लक्षण',
      productNameLabel: 'उत्पाद / आविष्कार का नाम',
      classicalBasisLabel: 'क्या फॉर्मूलेशन प्रथम अनुसूची के शास्त्रीय आयुष ग्रंथ पर आधारित है?',
      classicalYes: 'हाँ, शास्त्रीय संहिताओं पर आधारित',
      classicalNo: 'नहीं, पूर्णतः नवीन पादप संयोजन',
      classicalTextNameLabel: 'प्रामाणिक शास्त्रीय ग्रंथ का नाम (जैसे: शारंगधर संहिता)',
      exactRecipeLabel: 'क्या यह फॉर्मूलेशन हूबहू अपरिवर्तित शास्त्रीय नुस्खा है?',
      exactYes: 'अपरिवर्तित शास्त्रीय योग (धारा ३(a))',
      exactNo: 'संशोधित / नवीन घटक या हाइड्रो-अल्कोहलिक अर्क',
      modificationsLabel: 'क्या इसमें कोई नया घटक या अनुपात परिवर्तन किया गया है?',
      modificationDescLabel: 'जोड़े गए / बदले गए घटकों का विवरण',
      novelProcessLabel: 'क्या निर्माण प्रक्रिया में कोई नवीन निष्कर्षण तकनीक शामिल है?',
      processDescLabel: 'प्रक्रिया का विवरण (जैसे: सुपरक्रिटिकल CO2 निष्कर्षण, अल्ट्रासाउंड तकनीक)',
      intendedUseLabel: 'प्राथमिक उपयोग एवं विपणन दावे',
      targetCategoryLabel: 'लक्षित विनियामक श्रेणी',
      biologicalResourcesLabel: 'वानस्पतिक घटक (सामान्य एवं वानस्पतिक नाम)',
      sourceLocationLabel: 'औषधीय जड़ी-बूटियों का भौगोलिक स्रोत स्थल',
      foreignStakeLabel: 'क्या निर्माण इकाई में कोई विदेशी स्वामित्व या अनिवासी भारतीय भागीदारी है?',
      assessmentHeading: 'कानूनी वर्गीकरण एवं लाइसेंसिंग रूपरेखा',
      statutoryBasisLabel: 'शासी कानून एवं नियम',
      licensingAuthorityLabel: 'सक्षम लाइसेंसिंग प्राधिकरण',
      licensingFormLabel: 'निर्धारित आवेदन प्रपत्र (फॉर्म)',
      requiredDossierLabel: 'अनिवार्य तकनीकी एवं गुणवत्ता डोजियर',
      statutoryCaveatsLabel: 'वैधानिक चेतावनियां एवं दावे की सीमाएं',
      askAssistantBtn: 'इस वर्गीकरण पर सहायक से पूछें',
      addActionsBtn: 'अनुपालन कार्यों को चेकलिस्ट में जोड़ें',
      herbNovaBadge: 'हर्बनॉवा आर्थ्रोसोल परिदृश्य पहले से लोड है',
    },
    ipNavigator: {
      title: '९-मार्गीय आयुर्वेदिक बौद्धिक संपदा मार्गदर्शक',
      subtitle: 'पेटेंट, पारंपरिक ज्ञान, एबीएस, ट्रेडमार्क, जीआई, पादप किस्में, एवं व्यापार रहस्य की संपूर्ण कानूनी रूपरेखा।',
      badge: 'वैधानिक आईपी मार्गदर्शन',
      routesHeading: 'आयुर्वेदिक नवाचारों के लिए उपलब्ध सुरक्षा मार्ग',
      whatIsProtectable: 'क्या संरक्षित किया जा सकता है',
      exclusionsAndHurdles: 'कानूनी अपवाद एवं मुख्य बाधाएं',
      competentAuthority: 'सक्षम वैधानिक प्राधिकरण',
      recommendedActions: 'अनुशंसित व्यावहारिक कदम',
      addActionsBtn: 'चेकलिस्ट में जोड़ें',
      askAssistantBtn: 'इस मार्ग पर सहायक से पूछें',
    },
    absModule: {
      title: 'एबीएस एवं पारंपरिक ज्ञान अनुपालन मैट्रिक्स',
      subtitle: 'जैव विविधता अधिनियम २००२ (२०२३ संशोधन सहित) एवं एबीएस विनियम २०१४ के अंतर्गत मूल्यांकन।',
      calculatorHeading: 'परस्पर संवादात्मक एबीएस मूल्यांकन एवं शुल्क गणक',
      annualTurnoverLabel: 'वार्षिक सकल एक्स-फैक्ट्री कारोबार (रुपये में)',
      foreignEntityLabel: 'विदेशी इकाई अथवा अनिवासी सहभागिता (धारा ३ ट्रिगर)',
      wildHarvestLabel: 'जंगल से एकत्र की गई जड़ी-बूटियां (धारा ७ एसबीबी ट्रिगर)',
      codifiedClassicalLabel: 'संहितागत शास्त्रीय ग्रंथों पर आधारित योग (२०२३ संशोधन छूट)',
      targetIPLabel: 'भारत या विदेश में पेटेंट/आईपी आवेदन (धारा ६ एनबीए प्रपत्र III ट्रिगर)',
      resultsHeading: 'वैधानिक निष्कर्ष एवं लाभ-साझाकरण का अनुमान',
      benefitSharingEstimate: 'अनुमानित लाभ-साझाकरण (ABS) देयता',
      mandatoryChecklist: 'आवश्यक वैधानिक आवेदन',
      addChecklistBtn: 'एबीएस आवश्यकताओं को चेकलिस्ट में जोड़ें',
    },
    sourceExplorer: {
      title: 'प्रामाणिक सार्वजनिक कानूनी स्रोत अन्वेषक',
      subtitle: 'सत्यापित स्तर १ प्राथमिक कानूनों, आधिकारिक राजपत्र अधिसूचनाओं, एवं अंतरराष्ट्रीय संधियों का संग्रह।',
      searchPlaceholder: 'धारा, कीवर्ड द्वारा खोजें (जैसे: 3(p), synergy, Form 25D, WIPO, ABS)...',
      allTiers: 'सभी स्रोत स्तर',
      tier1: 'स्तर १: प्राथमिक विधान (अधिनियम/संधियां)',
      tier2: 'स्तर २: आधिकारिक विनियम/नियम',
      tier3: 'स्तर ३: भेषजसंहिता एवं तकनीकी मानक',
      allJurisdictions: 'सभी क्षेत्राधिकार',
      indiaOnly: 'केवल भारत',
      intlOnly: 'केवल अंतरराष्ट्रीय',
      viewSourceText: 'आधिकारिक कानूनी अंश देखें',
      officialPortal: 'आधिकारिक पोर्टल',
      checksum: 'एसएचए-२५६ चेकसम',
      effectiveDate: 'लागू तिथि',
    },
    checklist: {
      title: 'आयुर्वेदिक बौद्धिक संपदा एवं विनियामक कार्य सूची',
      subtitle: 'अपने प्राथमिकता प्राप्त कानूनी कार्यों, आवेदन प्रपत्रों, तथा उत्तरदायी प्राधिकरणों पर नज़र रखें।',
      exportJson: 'चेकलिस्ट निर्यात करें (JSON)',
      printList: 'प्रिंट / पीडीएफ सहेजें',
      addCustom: 'कस्टम कार्य जोड़ें',
      statusPending: 'लंबित',
      statusProgress: 'प्रगति पर',
      statusCompleted: 'पूर्ण',
      emptyMessage: 'अभी कोई कार्य नहीं है। सहायक, फॉर्मूलेशन क्लासिफायर, या आईपी नेविगेटर से कार्य जोड़ें।',
      authorityCol: 'प्राधिकरण',
      statuteCol: 'शासी कानून',
      actionCol: 'आवश्यक कार्रवाई',
      statusCol: 'स्थिति',
    },
    evaluation: {
      title: 'एसआईएच २०२६ प्रायोगिक बेंचमार्क एवं मूल्यांकन कक्ष',
      subtitle: 'समस्या विवरण २६०४५ के लिए गुणवत्ता मेट्रिक्स, उद्धरण सटीकता, सुरक्षित अस्वीकरण, एवं विलंबता।',
      rerunBtn: 'मूल्यांकन सुइट पुनः चलाएं',
      runningBtn: 'परीक्षण जारी है...',
      groundedRate: 'सत्यापित स्रोत दर',
      citationIntegrity: 'उद्धरण अखंडता',
      abstentionPrecision: 'अस्वीकरण सटीकता',
      accuracy: 'वैधानिक यथार्थता',
      avgLatency: 'औसत विलंबता',
      testCasesRun: 'कुल परीक्षण',
      tableHeading: 'स्वर्ण-मानक बेंचमार्क परीक्षण मामले एवं वैधानिक सत्यापन',
    },
    escalationModal: {
      title: 'एआईआईए आईपी सुविधा सेल / एनआरडीसी आयुष डेस्क को अग्रेषित करें',
      subtitle: 'धारा ३(p) आक्षेपों, पेटेंट प्रारूपण मार्गदर्शन, तथा संस्थागत परामर्श हेतु आधिकारिक मंच।',
      applicantName: 'आवेदक / नवप्रवर्तक का नाम',
      email: 'ईमेल पता',
      org: 'संस्थान / कंपनी का नाम',
      formulationName: 'योग / तकनीक का नाम',
      issueType: 'मुख्य कानूनी / विनियामक विषय',
      details: 'विस्तृत पृष्ठभूमि एवं विशिष्ट प्रश्न',
      submitBtn: 'अनुरोध अग्रेषित करें',
      closeBtn: 'रद्द करें',
      successMessage: 'आपका अनुरोध सफलतापूर्वक एआईआईए आईपी सुविधा सेल में पंजीकृत कर दिया गया है।',
      referenceIdLabel: 'आवंटित संदर्भ संख्या (Reference ID)',
    },
  },

  // ==========================================
  // SANSKRIT (संस्कृतम्)
  // ==========================================
  sa: {
    header: {
      sihTitle: 'स्मार्ट इण्डिया हैकाथॉन् २०२६',
      ministryAyush: 'आयुष मन्त्रालयः / अखिल भारतीय आयुर्वेद संस्थानम् (AIIA)',
      problemStatement: 'समस्या विवरणम् २६०४५',
      appTitle: 'आईपी-शक्ति सहायकः',
      appSubtitle: 'आयुर्वेद-नवाचारात् प्रमाण-आधारित-बौद्धिक-सम्पद्-मार्गदर्शनम्',
      prototypeBadge: 'प्रारूपम् १.०',
      ragBadge: 'प्रामाणिक-शास्त्र-आधारित-RAG',
      loadDemoBtn: '“हर्बनॉवा” उदाहरणम् प्रदर्शयतु',
      indiaRegime: 'भारतीय-विधि-व्यवस्था',
      internationalRegime: 'अन्ताराष्ट्रिय-व्यवस्था',
      indiaTooltip: 'भारतीय-शास्त्राणां प्राधान्यम्: औषधि-प्रसाधन-अधिनियमः, पेटेण्ट्-अधिनियमस्य ३(p) धारा, जैव-विविधता-अधिनियमः',
      internationalTooltip: 'अन्ताराष्ट्रिय-सन्धीनां प्राधान्यम्: WIPO २०२४, नागोया, US FDA, EU THMPD',
      langLabel: 'भाषा:',
    },
    tabs: {
      assistant: 'सहायकं पृच्छतु',
      classifier: 'योग-वर्गीकरणम्',
      ipNavigator: 'बौद्धिक-सम्पद्-मार्गदर्शकः',
      absTk: 'ABS एवं पारम्परिक-ज्ञानम्',
      corpus: 'विधि-स्रोत-अन्वेषकः',
      checklist: 'कार्य-सूची',
      evaluation: 'SIH मूल्याङ्कनम्',
    },
    assistant: {
      title: 'प्रमाण-आधारितः आयुर्वेद-बौद्धिक-सम्पद्-सहायकः',
      subtitle: 'भारतीय-अन्ताराष्ट्रिय-विधि-संहिताभ्यः साक्षात् प्रमाण-सहितम् उत्तरं प्रददाति। अपर्याप्त-प्रमाणेषु सुरक्षिततया विरमति।',
      activeJurisdictionBadge: 'सक्रिय-विधि-व्यवस्था:',
      indiaRegimeBadge: 'भारत-गणराज्यम् (पेटेण्ट्-अधिनियमः १९७०, औषधि-अधिनियमः १९४०, जैव-विविधता-अधिनियमः २००२)',
      internationalRegimeBadge: 'अन्ताराष्ट्रिय-सन्धयः निर्यातः च (WIPO 2024, US FDA DSHEA, EU THMPD)',
      suggestedHeading: 'परीक्षणार्थं सूचिताः प्रश्नाः',
      inputPlaceholder: 'पेटेण्ट्-योग्यतां (धारा ३(p), ३(e)), NBA अनुमतिम्, आयुर्वेद-आहार-नियमान् वा पृच्छतु...',
      sendButton: 'जिज्ञासां प्रेषयतु',
      queryingButton: 'विधि-विश्लेषणं भवति...',
      clearChat: 'इतिहासम् अपनयतु',
      escalateToAIIA: 'AIIA बौद्धिक-सम्पत्-प्रकोष्ठाय प्रेषयतु',
      directAnswer: 'साक्षात् वैधानिक-मूल्याङ्कनम्',
      whyApplies: 'शास्त्रोक्त-वैधानिक-हेतुः',
      classification: 'योगस्य विनियामक-वर्गीकरणम्',
      ipImplications: 'बौद्धिक-सम्पद्-प्रभावाः',
      patentability: 'पेटेण्ट्-स्वीकृति-योग्यता',
      tkHurdle: 'पारम्परिक-ज्ञान-प्रतिबन्धः (TKDL)',
      trademark: 'व्यापार-चिह्नम् (ट्रेडमार्क्)',
      tradeSecret: 'व्यापार-रहस्यम्',
      regulatoryImplications: 'अनुज्ञापत्र-प्राप्ति-मार्गाः',
      absTk: 'जैविक-संसाधन-लाभ-विभाजनम् (ABS)',
      actionItems: 'कर्तव्य-पदक्षेपाः',
      uncertaintyNotice: 'वैधानिक-सीमा-सूचना',
      verifiedCitations: 'प्रमाणित-वैधानिक-उद्धरणानि',
      viewCitationDrawer: 'प्रमाण-पत्रं पश्यतु',
      addToChecklist: 'कार्य-सूचौ योजयतु',
      groundedHigh: 'प्रमाण-सिद्धम् (उच्च-विश्वासः)',
      groundedPartial: 'आंशिक-प्रमाणम्',
      groundedAbstain: 'सुरक्षित-विरतिः / अपर्याप्त-प्रमाणम्',
      disclaimer: 'वैधानिक-अस्वीकरणम्: अयम् अनुसन्धान-प्रकल्पः एसआईएच २०२६ अन्तर्गतः अस्ति। विधिक-कार्यार्थं पञ्जीकृत-अधिवक्तुः परामर्शः ग्राह्यः।',
      tier1Badge: 'स्तरः १: मूल-अधिनियमः',
      tier2Badge: 'स्तरः २: अधिकृत-नियमाः',
      tier3Badge: 'स्तरः ३: भेषज-संहिता-प्रमाणम्',
      suggestedQueries: [
        {
          title: 'शास्त्रीय-योगानां पेटेण्ट्-अयोग्यता',
          query: 'किमहं रास्ना-सप्तक-क्वाथस्य अपरिवर्तितस्य योगस्य पेटेण्ट्-अधिकारं प्राप्तुं शक्नोमि?',
        },
        {
          title: 'धारा ३(e) सहक्रियात्मक-प्रभावः',
          query: 'अस्माकं बहु-मूलिका-योगः कथं धारा ३(e) तथा ३(p) आक्षेपान् निवारयितुं शक्नोति?',
        },
        {
          title: 'NBA प्रपत्र-३ अनुमतिः',
          query: 'आयुर्वेद-पेटेण्ट्-आवेदनात् पूर्वं जैव-विविधता-प्राधिकरणस्य अनुमतिः किमर्थम् आवश्यकी?',
        },
        {
          title: 'आयुर्वेद-आहार-नियमाः',
          query: 'किम् आयुर्वेद-आहार-उत्पादः सन्धिवात-निवारणस्य दावां कर्तुं शक्नोति?',
        },
        {
          title: 'अमेरिका-देशे निर्यातः',
          query: 'अस्माकं योगस्य अमेरिका-देशे निर्याताय के नियमाः वर्तन्ते?',
        },
        {
          title: 'सुरक्षित-विरति-परीक्षणम्',
          query: 'किं भवन्तः पेटेण्ट्-प्राप्तेः शत-प्रतिशत-निश्चयं दातुं शक्नुवन्ति?',
        },
      ],
    },
    classifier: {
      title: '१०-कारक-युक्तं योग-वर्गीकरण-तन्त्रम्',
      subtitle: 'औषधि-अधिनियमः १९४० तथा आयुर्वेद-आहार-नियमाः २०२२ इत्यनुसारं स्वयञ्चालित-वर्गीकरणम्।',
      productDetailsHeading: 'योगस्य स्वरूपम् एवं लक्षणानि',
      productNameLabel: 'उत्पादस्य / आविष्कारस्य नाम',
      classicalBasisLabel: 'किम् अयं योगः प्रथम-अनुसूची-ग्रन्थाधारितः?',
      classicalYes: 'आम्, संहिता-आधारितः',
      classicalNo: 'न, अभिनव-संयोगः',
      classicalTextNameLabel: 'प्रामाणिक-ग्रन्थस्य नाम (यथा: शारङ्गधर-संहिता)',
      exactRecipeLabel: 'किम् अपरिवर्तितः शास्त्रीय-योगः?',
      exactYes: 'अपरिवर्तितः योगः (धारा ३(a))',
      exactNo: 'परिवर्तितः / नूतन-द्रव्य-युक्तः',
      modificationsLabel: 'किं नूतनं द्रव्यं योजितम्?',
      modificationDescLabel: 'योजित-द्रव्याणां विवरणम्',
      novelProcessLabel: 'किं निर्माणे नूतना निष्कर्षण-विधिः प्रयुक्ता?',
      processDescLabel: 'प्रक्रिया-विवरणम् (यथा: scCO2 निष्कर्षणम्)',
      intendedUseLabel: 'उपयोगः तथा दावानि',
      targetCategoryLabel: 'लक्षित-वर्गः',
      biologicalResourcesLabel: 'वानस्पतिक-द्रव्याणि',
      sourceLocationLabel: 'औषध-प्राप्ति-स्थानम्',
      foreignStakeLabel: 'किं संस्थायां वैदेशिक-स्वामित्वम् अस्ति?',
      assessmentHeading: 'वैधानिक-वर्गीकरण-फलितम्',
      statutoryBasisLabel: 'शासी-विधिः नियमाः च',
      licensingAuthorityLabel: 'अनुज्ञापक-प्राधिकारी',
      licensingFormLabel: 'आवेदन-प्रपत्रम् (Form)',
      requiredDossierLabel: 'आवश्यक-गुणवत्ता-पत्रम्',
      statutoryCaveatsLabel: 'वैधानिक-प्रतिबन्धाः',
      askAssistantBtn: 'अनेन विषये सहायकं पृच्छतु',
      addActionsBtn: 'कर्तव्य-सूचौ योजयतु',
      herbNovaBadge: 'हर्बनॉवा-आर्थ्रोसोल-उदाहरणेन युक्तम्',
    },
    ipNavigator: {
      title: 'नव-मार्गि-आयुर्वेद-बौद्धिक-सम्पद्-दर्शकः',
      subtitle: 'पेटेण्ट्, पारम्परिक-ज्ञानम्, ABS, व्यापार-चिह्नम् इत्यादीनां सम्पूर्ण-मार्गदर्शनम्।',
      badge: 'वैधानिक-मार्गदर्शनम्',
      routesHeading: 'आयुर्वेद-नवाचारार्थं संरक्षणात्मकाः मार्गाः',
      whatIsProtectable: 'किं रक्षितुं शक्यते',
      exclusionsAndHurdles: 'वैधानिक-प्रतिबन्धाः',
      competentAuthority: 'सक्षम-प्राधिकारी',
      recommendedActions: 'अनुशंसित-कार्याणि',
      addActionsBtn: 'सूचौ योजयतु',
      askAssistantBtn: 'अनेन मार्गेण सहायकं पृच्छतु',
    },
    absModule: {
      title: 'ABS तथा पारम्परिक-ज्ञान-अनुपालनम्',
      subtitle: 'जैव-विविधता-अधिनियमः २००२ (संशोधितम् २०२३) इत्यनुसारं परीक्षणम्।',
      calculatorHeading: 'ABS शुल्क-गणक-यन्त्रम्',
      annualTurnoverLabel: 'वार्षिक-सकल-विक्रय-मूल्यम् (INR)',
      foreignEntityLabel: 'वैदेशिक-संस्था अथवा अनिवासी-सहभागिता (धारा ३)',
      wildHarvestLabel: 'वन्य-जङ्गल-संग्रहः (धारा ७ SBB)',
      codifiedClassicalLabel: 'संहिता-प्रतिपादित-योगः (२०२३ संशोधन-छूट)',
      targetIPLabel: 'पेटेण्ट्-आवेदनम् (धारा ६ NBA प्रपत्रम् ३)',
      resultsHeading: 'वैधानिक-निर्णयः तथा देय-शुल्कम्',
      benefitSharingEstimate: 'अनुमानितं लाभ-साझाकरण-शुल्कम् (ABS)',
      mandatoryChecklist: 'आवश्यक-आवेदनानि',
      addChecklistBtn: 'ABS कर्तव्यानि सूचौ योजयतु',
    },
    sourceExplorer: {
      title: 'प्रामाणिक-विधि-स्रोत-अन्वेषकः',
      subtitle: 'विधि-संहितानाम् अधिकृत-राजपत्राणां च अन्वेषणम्।',
      searchPlaceholder: 'धारा, पदैः अन्वेषणं करोतु (यथा: 3(p), synergy, Form 25D, WIPO)...',
      allTiers: 'सर्वे स्तराः',
      tier1: 'स्तरः १: मूल-अधिनियमाः',
      tier2: 'स्तरः २: अधिकृत-नियमाः',
      tier3: 'स्तरः ३: भेषज-संहिता-मानकाः',
      allJurisdictions: 'सर्वे क्षेत्राधिकाराः',
      indiaOnly: 'केवलं भारतम्',
      intlOnly: 'केवलं विदेशः',
      viewSourceText: 'विधि-पाठं पश्यतु',
      officialPortal: 'अधिकृत-जालस्थानम्',
      checksum: 'SHA-256 संक्षेपः',
      effectiveDate: 'प्रवर्तन-दिनाङ्कः',
    },
    checklist: {
      title: 'आयुर्वेद-वैधानिक-कार्य-सूची',
      subtitle: 'स्वकीयानि विधिक-कार्याणि अनुपालयतु।',
      exportJson: 'निर्यातः करोतु (JSON)',
      printList: 'मुद्रणम् / PDF',
      addCustom: 'नूतनं कार्यं योजयतु',
      statusPending: 'अवशिष्टम्',
      statusProgress: 'प्रचलति',
      statusCompleted: 'सम्पन्नम्',
      emptyMessage: 'अधुना कार्याणि न सन्ति। सहायकात् योजयतु।',
      authorityCol: 'प्राधिकारी',
      statuteCol: 'विधिः',
      actionCol: 'कर्तव्यम्',
      statusCol: 'स्थितिः',
    },
    evaluation: {
      title: 'SIH २०२६ मूल्याङ्कन-कक्षः',
      subtitle: 'समस्या २६०४५ इत्यस्य गुणवत्ता-परीक्षणम्।',
      rerunBtn: 'परीक्षणं पुनः चालयतु',
      runningBtn: 'परीक्षणं प्रचलति...',
      groundedRate: 'प्रमाणित-दरः',
      citationIntegrity: 'उद्धरण-सत्यता',
      abstentionPrecision: 'विरति-सटीकता',
      accuracy: 'वैधानिक-यथार्थता',
      avgLatency: 'औसत-समयः',
      testCasesRun: 'परीक्षिताः प्रश्नाः',
      tableHeading: 'स्वर्ण-मानक-परीक्षण-तालिका',
    },
    escalationModal: {
      title: 'AIIA बौद्धिक-सम्पत्-प्रकोष्ठाय निवेदनम्',
      subtitle: 'धारा ३(p) आक्षेपाणां निवारणार्थं संस्थागत-परामर्शः।',
      applicantName: 'आवेदकस्य नाम',
      email: 'ईमेल्-सङ्केतः',
      org: 'संस्थायाः नाम',
      formulationName: 'योगस्य नाम',
      issueType: 'मुख्य-जिज्ञासा',
      details: 'विस्तृत-विवरणम्',
      submitBtn: 'निवेदनं प्रेषयतु',
      closeBtn: 'स्थगयतु',
      successMessage: 'भवतः निवेदनं पञ्जीकृतम्।',
      referenceIdLabel: 'संदर्भ-सङ्ख्या (Reference ID)',
    },
  },

  // ==========================================
  // TAMIL (தமிழ்)
  // ==========================================
  ta: {
    header: {
      sihTitle: 'ஸ்மார்ட் இந்தியா ஹேக்கத்தான் 2026',
      ministryAyush: 'ஆயுஷ் அமைச்சகம் / அகில இந்திய ஆயுர்வேத நிறுவனம் (AIIA)',
      problemStatement: 'பிரச்சனை அறிக்கை 26045',
      appTitle: 'ஐபி-சக்தி சஹாயக்',
      appSubtitle: 'ஆயுர்வேத கண்டுபிடிப்புகளுக்கான சட்டப்பூர்வ அறிவுசார் சொத்து மற்றும் ஒழுங்குமுறை வழிகாட்டி',
      prototypeBadge: 'முன்மாதிரி பதிப்பு 1.0',
      ragBadge: 'ஆதாரப்பூர்வமான RAG',
      loadDemoBtn: '“ஹெர்ப்நோவா” டெமோ ஏற்றவும்',
      indiaRegime: 'இந்திய சட்ட முறைமை',
      internationalRegime: 'சர்வதேச முறைமை',
      indiaTooltip: 'இந்திய சட்டங்களுக்கு முன்னுரிமை: மருந்துகள் சட்டம், காப்புரிமை சட்டம் பிரிவு 3(p), பல்லுயிர் சட்டம்',
      internationalTooltip: 'சர்வதேச ஒப்பந்தங்கள்: WIPO 2024, நாகோயா நெறிமுறை, US FDA, EU THMPD',
      langLabel: 'மொழி:',
    },
    tabs: {
      assistant: 'உதவியாளரிடம் கேட்க',
      classifier: 'மருந்து வகைப்படுத்தல்',
      ipNavigator: 'ஐபி வழிகாட்டி',
      absTk: 'பல்லுயிர் & பாரம்பரிய அறிவு',
      corpus: 'சட்ட ஆவண ஆய்வுக்கூடம்',
      checklist: 'செயல் பட்டியல்',
      evaluation: 'SIH மதிப்பீடு',
    },
    assistant: {
      title: 'ஆதாரப்பூர்வ ஆயுர்வேத ஐபி & ஒழுங்குமுறை உதவியாளர்',
      subtitle: 'இந்திய மற்றும் சர்வதேச சட்டங்களின் அடிப்படையில் துல்லியமான பதில்களை வழங்குகிறது. போதிய ஆதாரங்கள் இல்லாதபோது ஊகங்களைத் தவிர்த்து பாதுகாப்பாக மறுக்கிறது.',
      activeJurisdictionBadge: 'செயலில் உள்ள சட்ட முறைமை:',
      indiaRegimeBadge: 'இந்திய குடியரசு (காப்புரிமை சட்டம் 1970, மருந்துகள் சட்டம் 1940, பல்லுயிர் சட்டம் 2002)',
      internationalRegimeBadge: 'சர்வதேச ஒப்பந்தங்கள் & ஏற்றுமதி (WIPO 2024, US FDA DSHEA, EU THMPD)',
      suggestedHeading: 'பரிந்துரைக்கப்பட்ட மாதிரி கேள்விகள்',
      inputPlaceholder: 'காப்புரிமை (பிரிவு 3(p), 3(e)), என்பிஏ அனுமதி, ஆயுர்வேத ஆகார விதிகள் பற்றி கேளுங்கள்...',
      sendButton: 'பதிலைப் பெறுக',
      queryingButton: 'சட்ட ஆய்வு நடக்கிறது...',
      clearChat: 'வரலாற்றை அழிக்க',
      escalateToAIIA: 'AIIA ஐபி பிரிவுக்கு பரிந்துரைக்கவும்',
      directAnswer: 'நேரடி ஒழுங்குமுறை மதிப்பீடு',
      whyApplies: 'சட்டப்பூர்வ காரணம் & அடிப்படை',
      classification: 'மருந்து வகைப்பாடு',
      ipImplications: 'அறிவுசார் சொத்து தாக்கங்கள்',
      patentability: 'காப்புரிமை தகுதி & புதுமை',
      tkHurdle: 'பாரம்பரிய அறிவு (TKDL) தடை',
      trademark: 'வர்த்தக முத்திரை (டிரேட்மார்க்)',
      tradeSecret: 'வணிக ரகசியம் & தயாரிப்பு முறை',
      regulatoryImplications: 'உரிமம் பெறும் வழிகள்',
      absTk: 'பல்லுயிர் பயன் பகிர்வு (ABS) & என்பிஏ அனுமதிகள்',
      actionItems: 'பரிந்துரைக்கப்பட்ட அடுத்த கட்ட நடவடிக்கைகள்',
      uncertaintyNotice: 'சட்ட எல்லை & நிச்சயமற்ற தன்மை அறிவிப்பு',
      verifiedCitations: 'சரிபார்க்கப்பட்ட சட்ட மேற்கோள்கள்',
      viewCitationDrawer: 'ஆதாரத்தை பார்க்கவும்',
      addToChecklist: 'செயல் பட்டியலில் சேர்க்க',
      groundedHigh: 'ஆதாரப்பூர்வமானது (உயர் நம்பிக்கை)',
      groundedPartial: 'பகுதி ஆதாரம்',
      groundedAbstain: 'பாதுகாப்பான விலகல் / போதிய ஆதாரமின்மை',
      disclaimer: 'சட்ட மறுப்பு: இது SIH 2026 க்கான ஒரு முன்மாதிரி ஆகும். அதிகாரப்பூர்வ தாக்கல் செய்வதற்கு முன் பதிவுசெய்த காப்புரிமை முகவரிடம் ஆலோசனை பெறவும்.',
      tier1Badge: 'நிலை 1: முதன்மை சட்டம்',
      tier2Badge: 'நிலை 2: ஒழுங்குமுறை விதிகள்',
      tier3Badge: 'நிலை 3: பார்மகோபியா தரம்',
      suggestedQueries: [
        {
          title: 'பாரம்பரிய மருந்துகளின் காப்புரிமை',
          query: 'மாற்றப்படாத பாரம்பரிய ராஸ்னா சப்தக க்வாத தயாரிப்புக்கு இந்தியாவில் காப்புரிமை பெற முடியுமா?',
        },
        {
          title: 'பிரிவு 3(e) கூட்டு விளைவை நிரூபித்தல்',
          query: 'எங்கள் மூலிகை தயாரிப்பு பிரிவு 3(e) மற்றும் 3(p) தடைகளை எவ்வாறு கடக்க முடியும்?',
        },
        {
          title: 'NBA படிவம் III அனுமதி',
          query: 'ஆயுர்வேத காப்புரிமை விண்ணப்பிக்கும் முன் தேசிய பல்லுயிர் ஆணைய அனுமதி தேவையா?',
        },
        {
          title: 'ஆயுர்வேத ஆகார நோய்த் தீர்வு கோரிக்கைகள்',
          query: 'ஆயுர்வேத ஆகார தயாரிப்பு மூட்டுவலியை குணப்படுத்துவதாக கூற முடியுமா?',
        },
        {
          title: 'அமெரிக்க ஏற்றுமதி வழிகள்',
          query: 'எங்கள் மூலிகை தயாரிப்பை அமெரிக்காவிற்கு ஏற்றுமதி செய்வதற்கான நடைமுறைகள் என்ன?',
        },
        {
          title: 'பாதுகாப்பான விலகல் சோதனை',
          query: 'எனக்கு 100% காப்புரிமை கிடைக்கும் என்று உங்களால் உத்தரவாதம் அளிக்க முடியுமா?',
        },
      ],
    },
    classifier: {
      title: '10-காரணி ஆயுர்வேத மருந்து வகைப்படுத்தல் இயந்திரம்',
      subtitle: 'மருந்துகள் சட்டம் 1940, ஆயுர்வேத ஆகார விதிகள் 2022 ஆகியவற்றின் கீழ் வகைப்படுத்துதல்.',
      productDetailsHeading: 'தயாரிப்பு விவரங்கள் & பண்புகள்',
      productNameLabel: 'தயாரிப்பு / கண்டுபிடிப்பின் பெயர்',
      classicalBasisLabel: 'பாரம்பரிய ஆயுர்வேத நூலை அடிப்படையாகக் கொண்டதா?',
      classicalYes: 'ஆம், சாஸ்திர நூல்களை அடிப்படையாகக் கொண்டது',
      classicalNo: 'இல்லை, முற்றிலும் புதிய மூலிகைக் கலவை',
      classicalTextNameLabel: 'பாரம்பரிய நூலின் பெயர் (எ.கா: சாரங்கதர சம்ஹிதை)',
      exactRecipeLabel: 'இது மாற்றப்படாத அசல் சாஸ்திர முறையா?',
      exactYes: 'அசல் பாரம்பரிய மருந்து (பிரிவு 3(a))',
      exactNo: 'மாற்றப்பட்டது / புதிய சாறுகள் சேர்க்கப்பட்டது',
      modificationsLabel: 'புதிய பொருட்கள் சேர்க்கப்பட்டுள்ளனவா?',
      modificationDescLabel: 'சேர்க்கப்பட்ட பொருட்களின் விவரம்',
      novelProcessLabel: 'புதிய பிரித்தெடுத்தல் தொழில்நுட்பம் பயன்படுத்தப்பட்டுள்ளதா?',
      processDescLabel: 'தொழில்நுட்ப விவரம் (எ.கா: scCO2 பிரித்தெடுத்தல்)',
      intendedUseLabel: 'பயன்பாடு மற்றும் நன்மைகள்',
      targetCategoryLabel: 'இலக்கு ஒழுங்குமுறை வகை',
      biologicalResourcesLabel: 'பயன்படுத்தப்படும் மூலிகைகள்',
      sourceLocationLabel: 'மூலிகைகள் சேகரிக்கப்படும் இடம்',
      foreignStakeLabel: 'நிறுவனத்தில் வெளிநாட்டு பங்கு அல்லது முதலீடு உள்ளதா?',
      assessmentHeading: 'சட்ட வகைப்பாடு & உரிமப் பாதை',
      statutoryBasisLabel: 'நிர்வகிக்கும் சட்டம் & விதி',
      licensingAuthorityLabel: 'உரிமம் வழங்கும் அதிகாரம்',
      licensingFormLabel: 'விண்ணப்ப படிவம்',
      requiredDossierLabel: 'தேவையான ஆவணங்கள்',
      statutoryCaveatsLabel: 'சட்ட எச்சரிக்கைகள்',
      askAssistantBtn: 'இதைப்பற்றி உதவியாளரிடம் கேட்க',
      addActionsBtn: 'செயல் பட்டியலில் சேர்க்க',
      herbNovaBadge: 'ஹெர்ப்நோவா மாதிரி ஏற்றப்பட்டுள்ளது',
    },
    ipNavigator: {
      title: '9-வழி ஆயுர்வேத அறிவுசார் சொத்து வழிகாட்டி',
      subtitle: 'காப்புரிமை, பாரம்பரிய அறிவு, ஏபிஎஸ், டிரேட்மார்க், புவிசார் குறியீடு பற்றிய விரிவான வழிகாட்டி.',
      badge: 'சட்ட வழிகாட்டுதல்',
      routesHeading: 'ஆயுர்வேத கண்டுபிடிப்புகளுக்கான பாதுகாப்பு வழிகள்',
      whatIsProtectable: 'எதைப் பாதுகாக்க முடியும்',
      exclusionsAndHurdles: 'சட்ட தடைகள் & விலக்குகள்',
      competentAuthority: 'தொடர்புடைய அதிகாரம்',
      recommendedActions: 'பரிந்துரைக்கப்பட்ட நடவடிக்கைகள்',
      addActionsBtn: 'பட்டியலில் சேர்க்க',
      askAssistantBtn: 'உதவியாளரிடம் கேட்க',
    },
    absModule: {
      title: 'பல்லுயிர் & பயன் பகிர்வு (ABS) அணி',
      subtitle: 'பல்லுயிர் சட்டம் 2002 மற்றும் ABS விதிகள் 2014 இன் கீழான மதிப்பீடு.',
      calculatorHeading: 'ABS கட்டணக் கணக்கீடு',
      annualTurnoverLabel: 'ஆண்டு மொத்த உற்பத்தி வருவாய் (ரூபாயில்)',
      foreignEntityLabel: 'வெளிநாட்டு நிறுவனம் அல்லது வெளிநாடு வாழ் இந்தியர் பங்கு (பிரிவு 3)',
      wildHarvestLabel: 'காடுகளிலிருந்து சேகரிக்கப்பட்ட மூலிகைகள் (பிரிவு 7 SBB)',
      codifiedClassicalLabel: 'பாரம்பரிய நூல்களிலிருந்து பெறப்பட்ட தயாரிப்பு (2023 விலக்கு)',
      targetIPLabel: 'காப்புரிமை விண்ணப்பம் (பிரிவு 6 NBA படிவம் III)',
      resultsHeading: 'சட்ட முடிவு & கட்டண மதிப்பீடு',
      benefitSharingEstimate: 'மதிப்பிடப்பட்ட பயன் பகிர்வு (ABS) தொகை',
      mandatoryChecklist: 'தேவையான சட்ட விண்ணப்பங்கள்',
      addChecklistBtn: 'பட்டியலில் சேர்க்க',
    },
    sourceExplorer: {
      title: 'அங்கீகரிக்கப்பட்ட சட்ட ஆவண ஆய்வுக்கூடம்',
      subtitle: 'அரசாங்க சட்டங்கள், அறிவிக்கைகள் மற்றும் சர்வதேச ஒப்பந்தங்களின் தொகுப்பு.',
      searchPlaceholder: 'தேடவும் (எ.கா: 3(p), synergy, Form 25D, WIPO, ABS)...',
      allTiers: 'அனைத்து நிலைகளும்',
      tier1: 'நிலை 1: முதன்மை சட்டம்',
      tier2: 'நிலை 2: விதிகள்',
      tier3: 'நிலை 3: தரநிலைகள்',
      allJurisdictions: 'அனைத்து அதிகார வரம்புகளும்',
      indiaOnly: 'இந்தியா மட்டும்',
      intlOnly: 'சர்வதேசம் மட்டும்',
      viewSourceText: 'சட்ட உரையைப் பார்க்கவும்',
      officialPortal: 'அதிகாரப்பூர்வ தளம்',
      checksum: 'SHA-256 செக்சம்',
      effectiveDate: 'செயலுக்கு வந்த தேதி',
    },
    checklist: {
      title: 'ஆயுர்வேத ஐபி & ஒழுங்குமுறை செயல் பட்டியல்',
      subtitle: 'உங்கள் சட்ட தேவைகள் மற்றும் படிவங்களை கண்காணிக்கவும்.',
      exportJson: 'ஏற்றுமதி (JSON)',
      printList: 'அச்சிட / PDF சேமிக்க',
      addCustom: 'புதிய செயலை சேர்க்க',
      statusPending: 'நிலுவையில்',
      statusProgress: 'செயலில்',
      statusCompleted: 'முடிந்தது',
      emptyMessage: 'இன்னும் நடவடிக்கைகள் எதுவும் இல்லை. உதவியாளர் மூலம் சேர்க்கவும்.',
      authorityCol: 'அதிகாரம்',
      statuteCol: 'சட்டம்',
      actionCol: 'தேவையான செயல்',
      statusCol: 'நிலை',
    },
    evaluation: {
      title: 'SIH 2026 மதிப்பீட்டுப் பிரிவு',
      subtitle: 'பிரச்சனை 26045 க்கான தரம், துல்லியம் மற்றும் வேகத்தின் அளவீடுகள்.',
      rerunBtn: 'மீண்டும் மதிப்பீடு செய்க',
      runningBtn: 'மதிப்பீடு நடக்கிறது...',
      groundedRate: 'ஆதார விகிதம்',
      citationIntegrity: 'மேற்கோள் துல்லியம்',
      abstentionPrecision: 'பாதுகாப்பு துல்லியம்',
      accuracy: 'சட்ட துல்லியம்',
      avgLatency: 'சராசரி வேகம்',
      testCasesRun: 'மொத்த சோதனைகள்',
      tableHeading: 'மாதிரி சோதனை முடிவுகள் மற்றும் சரிபார்ப்பு',
    },
    escalationModal: {
      title: 'AIIA ஐபி வசதி மையத்திற்கு பரிந்துரைக்க',
      subtitle: 'பிரிவு 3(p) தடைகள் மற்றும் காப்புரிமை எழுதுவதற்கான வழிகாட்டுதல் மையம்.',
      applicantName: 'விண்ணப்பதாரர் பெயர்',
      email: 'மின்னஞ்சல் முகவரி',
      org: 'நிறுவனத்தின் பெயர்',
      formulationName: 'தயாரிப்பு பெயர்',
      issueType: 'சட்ட வினா வகை',
      details: 'முழு விவரங்கள்',
      submitBtn: 'விண்ணப்பிக்க',
      closeBtn: 'ரத்து செய்க',
      successMessage: 'உங்கள் கோரிக்கை AIIA ஐபி மையத்தில் வெற்றிகரமாக பதிவு செய்யப்பட்டது.',
      referenceIdLabel: 'குறிப்பு எண் (Reference ID)',
    },
  },

  // ==========================================
  // TELUGU (తెలుగు)
  // ==========================================
  te: {
    header: {
      sihTitle: 'స్మార్ట్ ఇండియా హ్యాకథాన్ 2026',
      ministryAyush: 'ఆయుష్ మంత్రిత్వ శాఖ / అఖిల భారత ఆయుర్వేద సంస్థ (AIIA)',
      problemStatement: 'సమస్య ప్రకటన 26045',
      appTitle: 'ఐపీ-శక్తి సహాయక్',
      appSubtitle: 'ఆయుర్వేద ఆవిష్కరణల నుండి ఆధారాలతో కూడిన మేధో సంపత్తి మరియు నియంత్రణ మార్గదర్శకత్వం',
      prototypeBadge: 'ప్రోటోటైప్ వెర్షన్ 1.0',
      ragBadge: 'ఆధార-ఆధారిత RAG',
      loadDemoBtn: '“హెర్బ్‌నోవా” డెమో లోడ్ చేయండి',
      indiaRegime: 'భారతీయ చట్ట నియంత్రణ',
      internationalRegime: 'అంతర్జాతీయ నియంత్రణ',
      indiaTooltip: 'భారతీయ చట్టాలకు ప్రాధాన్యత: ఔషధాల చట్టం, పేటెంట్ చట్టం సెక్షన్ 3(p), జీవ వైవిధ్య చట్టం',
      internationalTooltip: 'అంతర్జాతీయ ఒప్పందాలు: WIPO 2024, నగోయా ప్రోటోకాల్, US FDA, EU THMPD',
      langLabel: 'భాష:',
    },
    tabs: {
      assistant: 'సహాయకుడిని అడగండి',
      classifier: 'ఔషధ వర్గీకరణ',
      ipNavigator: 'ఐపీ మార్గదర్శి',
      absTk: 'జీవ వైవిధ్యం & సాంప్రదాయ జ్ఞానం',
      corpus: 'చట్టపరమైన మూలాల అన్వేషణ',
      checklist: 'కార్యచరణ జాబితా',
      evaluation: 'SIH మూల్యాంకనం',
    },
    assistant: {
      title: 'ఆధార-ఆధారిత ఆయుర్వేద ఐపీ & నియంత్రణ సహాయకుడు',
      subtitle: 'భారతీయ మరియు అంతర్జాతీయ చట్టాల ఆధారంగా ఖచ్చితమైన విశ్లేషణను అందిస్తుంది. తగిన ఆధారాలు లేనప్పుడు సురక్షితంగా తిరస్కరిస్తుంది.',
      activeJurisdictionBadge: 'ప్రస్తుత చట్ట నియంత్రణ:',
      indiaRegimeBadge: 'భారత గణతంత్రం (పేటెంట్ చట్టం 1970, ఔషధాల చట్టం 1940, జీవ వైవిధ్య చట్టం 2002)',
      internationalRegimeBadge: 'అంతర్జాతీయ ఒప్పందాలు & ఎగుమతులు (WIPO 2024, US FDA DSHEA, EU THMPD)',
      suggestedHeading: 'సూచించిన ప్రశ్నలు మరియు కేస్ స్టడీలు',
      inputPlaceholder: 'పేటెంట్ అర్హత (సెక్షన్ 3(p), 3(e)), ఎన్‌బీఏ అనుమతి, ఆయుర్వేద ఆహార నిబంధనల గురించి అడగండి...',
      sendButton: 'ప్రశ్నించండి',
      queryingButton: 'చట్టపరమైన విశ్లేషణ జరుగుతోంది...',
      clearChat: 'చరిత్రను క్లియర్ చేయండి',
      escalateToAIIA: 'AIIA ఐపీ విభాగానికి పంపండి',
      directAnswer: 'ప్రత్యక్ష నియంత్రణ అంచనా',
      whyApplies: 'చట్టపరమైన కారణాలు & ఆధారాలు',
      classification: 'ఔషధ వర్గీకరణ',
      ipImplications: 'మేధో సంపత్తి ప్రభావాలు',
      patentability: 'పేటెంట్ అర్హత & నూతనత్వం',
      tkHurdle: 'సాంప్రదాయ జ్ఞానం (TKDL) అడ్డంకులు',
      trademark: 'ట్రేడ్‌మార్క్ & బ్రాండింగ్',
      tradeSecret: 'వాణిజ్య రహస్యం & ప్రక్రియ జ్ఞానం',
      regulatoryImplications: 'లైసెన్సింగ్ మార్గాలు',
      absTk: 'జీవ వైవిధ్యం (ABS) & ఎన్‌బీఏ అనుమతులు',
      actionItems: 'సిఫార్సు చేయబడిన తదుపరి చర్యలు',
      uncertaintyNotice: 'చట్టపరమైన పరిమితుల ప్రకటన',
      verifiedCitations: 'ధృవీకరించబడిన చట్టపరమైన ఆధారాలు',
      viewCitationDrawer: 'ఆధార పత్రాలు చూడండి',
      addToChecklist: 'కార్యచరణ జాబితాకు జోడించండి',
      groundedHigh: 'ఆధార సహితం (అధిక విశ్వసనీయత)',
      groundedPartial: 'పాక్షిక ఆధారం',
      groundedAbstain: 'సురక్షిత తిరస్కరణ / సరిపోని ఆధారాలు',
      disclaimer: 'చట్టపరమైన నిరాకరణ: ఇది SIH 2026 కోసం తయారుచేసిన విద్యాసంబంధ ప్రోటోటైప్. అధికారిక దరఖాస్తుల కోసం నిపుణులను సంప్రదించండి.',
      tier1Badge: 'స్థాయి 1: ప్రాథమిక చట్టం',
      tier2Badge: 'స్థాయి 2: అధికారిక నిబంధనలు',
      tier3Badge: 'స్థాయి 3: ఫార్మకోపియా ప్రమాణాలు',
      suggestedQueries: [
        {
          title: 'సాంప్రదాయ ఔషధాల పేటెంట్ అర్హత',
          query: 'భారతదేశంలో శాస్త్రీయ రాస్నా సప్తక క్వాథంపై పేటెంట్ పొందవచ్చా?',
        },
        {
          title: 'సెక్షన్ 3(e) సినర్జీ నిరూపణ',
          query: 'మా హెర్బల్ ఫార్ములేషన్ సెక్షన్ 3(e) మరియు 3(p) అభ్యంతరాలను ఎలా అధిగమించగలదు?',
        },
        {
          title: 'NBA ఫారమ్ III అనుమతి',
          query: 'ఆయుర్వేద పేటెంట్ దాఖలు చేయడానికి ముందు జాతీయ జీవ వైవిధ్య అథారిటీ అనుమతి అవసరమా?',
        },
        {
          title: 'ఆయుర్వేద ఆహార వ్యాధి నివారణ క్లెయిమ్‌లు',
          query: 'ఆయుర్వేద ఆహార ఉత్పత్తి కీళ్ల నొప్పులను తగ్గిస్తుందని చట్టబద్ధంగా ప్రకటించవచ్చా?',
        },
        {
          title: 'అమెరికాకు ఎగుమతి మార్గాలు',
          query: 'మా ఆయుర్వేద ఉత్పత్తిని యునైటెడ్ స్టేట్స్‌కు ఎగుమతి చేయడానికి నిబంధనలు ఏమిటి?',
        },
        {
          title: 'సురక్షిత తిరస్కరణ పరీక్ష',
          query: 'నా పేటెంట్ దరఖాస్తు ఖచ్చితంగా ఆమోదించబడుతుందని మీరు హామీ ఇవ్వగలరా?',
        },
      ],
    },
    classifier: {
      title: '10-కారకాల ఆయుర్వేద ఔషధ వర్గీకరణ సాధనం',
      subtitle: 'ఔషధాల చట్టం 1940 మరియు ఆయుర్వేద ఆహార నిబంధనలు 2022 ప్రకారం వర్గీకరణ.',
      productDetailsHeading: 'ఫార్ములేషన్ వివరాలు & లక్షణాలు',
      productNameLabel: 'ఉత్పత్తి / ఆవిష్కరణ పేరు',
      classicalBasisLabel: 'ఫార్ములేషన్ మొదటి షెడ్యూల్ ఆయుష్ గ్రంథం ఆధారంగా ఉందా?',
      classicalYes: 'అవును, సాంప్రదాయ సంహితల ఆధారంగా',
      classicalNo: 'కాదు, సరికొత్త మూలికా కలయిక',
      classicalTextNameLabel: 'ప్రామాణిక గ్రంథం పేరు (ఉదా: శారంగధర సంహిత)',
      exactRecipeLabel: 'ఇది మార్పులు లేని అసలైన శాస్త్రీయ పద్ధతా?',
      exactYes: 'అసలైన శాస్త్రీయ యోగం (సెక్షన్ 3(a))',
      exactNo: 'మార్పులు చేయబడిన / కొత్త పదార్థాలు కలపబడినది',
      modificationsLabel: 'కొత్త పదార్థాలు ఏమైనా కలిపారా?',
      modificationDescLabel: 'కలిపిన లేదా మార్చిన పదార్థాల వివరాలు',
      novelProcessLabel: 'తయారీలో ఏదైనా కొత్త సాంకేతికత ఉపయోగించారా?',
      processDescLabel: 'ప్రక్రియ వివరణ (ఉదా: scCO2 ఎక్స్‌ట్రాక్షన్)',
      intendedUseLabel: 'ఉపయోగాలు మరియు క్లెయిమ్‌లు',
      targetCategoryLabel: 'లక్ష్య నియంత్రణ వర్గం',
      biologicalResourcesLabel: 'ఉపయోగించిన వనమూలికలు',
      sourceLocationLabel: 'మూలికలు సేకరించిన భౌగోళిక ప్రాంతం',
      foreignStakeLabel: 'సంస్థలో విదేశీ పెట్టుబడులు లేదా భాగస్వామ్యం ఉందా?',
      assessmentHeading: 'చట్టపరమైన వర్గీకరణ & లైసెన్సింగ్ మార్గం',
      statutoryBasisLabel: 'వర్తించే చట్టం & నిబంధన',
      licensingAuthorityLabel: 'లైసెన్స్ ఇచ్చే అధికారి',
      licensingFormLabel: 'దరఖాస్తు ఫారమ్',
      requiredDossierLabel: 'అవసరమైన పత్రాలు',
      statutoryCaveatsLabel: 'చట్టపరమైన హెచ్చరికలు',
      askAssistantBtn: 'ఈ వర్గీకరణపై సహాయకుడిని అడగండి',
      addActionsBtn: 'జాబితాకు జోడించండి',
      herbNovaBadge: 'హెర్బ్‌నోవా ఉదాహరణతో లోడ్ చేయబడింది',
    },
    ipNavigator: {
      title: '9-మార్గాల ఆయుర్వేద ఐపీ మార్గదర్శి',
      subtitle: 'పేటెంట్లు, సాంప్రదాయ జ్ఞానం, ABS, ట్రేడ్‌మార్కులు, GI మరియు వాణిజ్య రహస్యాలపై సమగ్ర గైడ్.',
      badge: 'చట్టపరమైన మార్గదర్శకత్వం',
      routesHeading: 'ఆయుర్వేద ఆవిష్కరణల రక్షణకు మార్గాలు',
      whatIsProtectable: 'దేనిని రక్షించవచ్చు',
      exclusionsAndHurdles: 'చట్టపరమైన అడ్డంకులు & మినహాయింపులు',
      competentAuthority: 'సంబంధిత అధికారం',
      recommendedActions: 'సిఫార్సు చేసిన చర్యలు',
      addActionsBtn: 'జాబితాకు జోడించండి',
      askAssistantBtn: 'సహాయకుడిని అడగండి',
    },
    absModule: {
      title: 'జీవ వైవిధ్యం & ప్రయోజనాల పంపిణీ (ABS) మ్యాట్రిక్స్',
      subtitle: 'జీవ వైవిధ్య చట్టం 2002 మరియు ABS నిబంధనలు 2014 కింద అంచనా.',
      calculatorHeading: 'ABS రుసుము కాలిక్యులేటర్',
      annualTurnoverLabel: 'వార్షిక స్థూల ఎక్స్-ఫ్యాక్టరీ టర్నోవర్ (రూపాయలలో)',
      foreignEntityLabel: 'విదేశీ భాగస్వామ్యం లేదా ప్రవాస భారతీయుల వాటా (సెక్షన్ 3)',
      wildHarvestLabel: 'అడవుల నుండి సేకరించిన మూలికలు (సెక్షన్ 7 SBB)',
      codifiedClassicalLabel: 'శాస్త్రీయ గ్రంథాల ఆధారిత ఔషధం (2023 మినహాయింపు)',
      targetIPLabel: 'పేటెంట్ దరఖాస్తు (సెక్షన్ 6 NBA ఫారమ్ III)',
      resultsHeading: 'చట్టపరమైన నిర్ణయం & రుసుము అంచనా',
      benefitSharingEstimate: 'అంచనా వేయబడిన ABS రుసుము',
      mandatoryChecklist: 'అవసరమైన చట్టపరమైన దరఖాస్తులు',
      addChecklistBtn: 'జాబితాకు జోడించండి',
    },
    sourceExplorer: {
      title: 'అధికారిక చట్టపరమైన మూలాల అన్వేషణ',
      subtitle: 'భారతీయ చట్టాలు, గెజిట్ నోటిఫికేషన్లు మరియు అంతర్జాతీయ ఒప్పందాల సమాహారం.',
      searchPlaceholder: 'శోధించండి (ఉదా: 3(p), synergy, Form 25D, WIPO, ABS)...',
      allTiers: 'అన్ని స్థాయిలు',
      tier1: 'స్థాయి 1: ప్రాథమిక చట్టం',
      tier2: 'స్థాయి 2: అధికారిక నిబంధనలు',
      tier3: 'స్థాయి 3: ఫార్మకోపియా ప్రమాణాలు',
      allJurisdictions: 'అన్ని అధికార పరిధులు',
      indiaOnly: 'భారతదేశం మాత్రమే',
      intlOnly: 'అంతర్జాతీయం మాత్రమే',
      viewSourceText: 'చట్ట పాఠాన్ని చూడండి',
      officialPortal: 'అధికారిక పోర్టల్',
      checksum: 'SHA-256 చెక్‌సమ్',
      effectiveDate: 'అమల్లోకి వచ్చిన తేదీ',
    },
    checklist: {
      title: 'ఆయుర్వేద ఐపీ & నియంత్రణ కార్యచరణ జాబితా',
      subtitle: 'మీ చట్టపరమైన బాధ్యతలను మరియు ఫారమ్‌లను ట్రాక్ చేయండి.',
      exportJson: 'ఎగుమతి (JSON)',
      printList: 'ప్రింట్ / PDF సేవ్',
      addCustom: 'కొత్త పనిని జోడించండి',
      statusPending: 'పెండింగ్',
      statusProgress: 'పురోగతిలో ఉంది',
      statusCompleted: 'పూర్తయింది',
      emptyMessage: 'ఇంకా పనులు ఏవీ లేవు. సహాయకుడి ద్వారా జోడించండి.',
      authorityCol: 'అధికారం',
      statuteCol: 'చట్టం',
      actionCol: 'చేయవలసిన పని',
      statusCol: 'స్థితి',
    },
    evaluation: {
      title: 'SIH 2026 మూల్యాంకన డ్యాష్‌బోర్డ్',
      subtitle: 'సమస్య 26045 కోసం నాణ్యత, వేగం మరియు ఖచ్చితత్వ కొలమానాలు.',
      rerunBtn: 'తిరిగి మూల్యాంకనం చేయండి',
      runningBtn: 'మూల్యాంకనం జరుగుతోంది...',
      groundedRate: 'ఆధార రేటు',
      citationIntegrity: 'ఉల్లేఖన ఖచ్చితత్వం',
      abstentionPrecision: 'సురక్షిత తిరస్కరణ ఖచ్చితత్వం',
      accuracy: 'చట్టపరమైన ఖచ్చితత్వం',
      avgLatency: 'సగటు వేగం',
      testCasesRun: 'మొత్తం పరీక్షలు',
      tableHeading: 'ప్రామాణిక పరీక్ష కేసులు మరియు ఫలితాలు',
    },
    escalationModal: {
      title: 'AIIA ఐపీ ఫెసిలిటేషన్ సెంటర్‌కు సిఫార్సు',
      subtitle: 'సెక్షన్ 3(p) ఆక్షేపణలు మరియు పేటెంట్ డ్రాఫ్టింగ్ కోసం అధికారిక వేదిక.',
      applicantName: 'దరఖాస్తుదారుడి పేరు',
      email: 'ఈమెయిల్ చిరునామా',
      org: 'సంస్థ / కంపెనీ పేరు',
      formulationName: 'ఉత్పత్తి పేరు',
      issueType: 'ప్రశ్న రకం',
      details: 'పూర్తి వివరాలు',
      submitBtn: 'సమర్పించండి',
      closeBtn: 'రద్దు చేయండి',
      successMessage: 'మీ అభ్యర్థన AIIA ఐపీ సెంటర్‌లో విజయవంతంగా నమోదు చేయబడింది.',
      referenceIdLabel: 'రిఫరెన్స్ సంఖ్య (Reference ID)',
    },
  },
};

export function getTranslation(language: LanguageCode): TranslationDictionary {
  return TRANSLATIONS[language] || TRANSLATIONS.en;
}
