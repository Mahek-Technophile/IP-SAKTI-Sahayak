import os
import subprocess
import json

TEMP_DIR = "/tmp/demo_video"
os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs("public", exist_ok=True)

OUTPUT_MP4 = "public/demo-sih-2026.mp4"

FONT_BOLD = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
FONT_REGULAR = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
FONT_SERIF = "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"

SCENES = [
    {
        "id": 1,
        "tab": "MISSION & VISION",
        "title": "IP-SAKTI Sahayak: AI Regulatory Co-Pilot",
        "subtitle": "Ministry of Ayush & AIIA • SIH 2026 Problem Statement 26045",
        "voiceover": "Welcome to IP SAKTI Sahayak, an intelligent regulatory and I P co-pilot engineered for the Ministry of Ayush and All India Institute of Ayurveda to resolve SIH 2026 Problem Statement 26045.",
        "badges": ["SIH 2026 Finalist", "Ministry of Ayush", "AIIA New Delhi"],
        "cards": [
            ("The Regulatory Challenge", "Ayurveda innovators struggle with Section 3(p) Traditional Knowledge patent bars, complex Schedule I classical formula status, and strict Biological Diversity Act compliance."),
            ("The AI Solution", "Dual-tier RAG co-pilot cross-referenced against 56 First Schedule classical texts, the Indian Patents Act, TKDL gazettes, and Rule 158-B licensing roadmaps."),
            ("Impact & Vision", "Empowering Indian pharmaceutical and herbal researchers to protect ancestral heritage while fast-tracking legitimate global patents.")
        ]
    },
    {
        "id": 2,
        "tab": "ASK ASSISTANT",
        "title": "Dual-Tier RAG & Zero-Hallucination Answers",
        "subtitle": "Indian Patents Act 1970 • Drugs & Cosmetics Rules • Verifiable Citations",
        "voiceover": "In the Ask Assistant module, researchers can query complex formulations. Our dual-tier RAG architecture grounds answers in verified statutory gazettes and classical pharmacopoeias with zero hallucination.",
        "badges": ["98.6% Confidence Score", "Primary Statute Grounding", "TKDL Verified"],
        "cards": [
            ("User Formulation Query", "Can supercritical carbon dioxide extraction of Shallaki and Maricha overcome Section 3(p) Traditional Knowledge bars?"),
            ("Statutory Citations", "Patents Act Section 3(p), Section 3(e) Synergism Doctrine • Rule 158-B Safety Protocol • TKDL Ref AY-2024-819"),
            ("Regulatory Verdict", "Viable Process Patent: Novel supercritical extraction yields bioactive enrichment not disclosed in classical Samhitas.")
        ]
    },
    {
        "id": 3,
        "tab": "FORMULATION CLASSIFIER",
        "title": "Classical vs Proprietary Medicine Classifier",
        "subtitle": "Rule 158-B Licensing Dossier • 56 First Schedule Text Cross-Check",
        "voiceover": "Our Formulation Classifier automates statutory classification. Cross-referencing 56 First Schedule classical texts, it instantly identifies proprietary modifications and generates the complete Rule 158-B compliance roadmap.",
        "badges": ["Schedule I Verified", "Ayurvedic Proprietary Medicine", "Sec 3(h) DCA 1940"],
        "cards": [
            ("Scenario: HerbNova Joint Oil", "Base: Rasna Saptaka Kwatha (Classical) modified with supercritical Boswellic acid extract and Piperine bioavailability enhancer."),
            ("Classical Cross-Check", "Ingredient ratio altered beyond Sharangadhara Samhita specifications -> Classified as Ayurvedic Proprietary Medicine."),
            ("Rule 158-B Dossier Roadmap", "Mandatory requirements: Heavy metal profiling, acute oral toxicity, microbial count, and accelerated shelf-life stability tests.")
        ]
    },
    {
        "id": 4,
        "tab": "IP NAVIGATOR",
        "title": "Patent Eligibility & Novelty Navigator",
        "subtitle": "Overcoming Section 3(p) TK Bars & Section 3(e) Mere Admixtures",
        "voiceover": "The I P Navigator prevents costly rejections. It identifies that raw decoctions trigger Section 3(p) exclusions, and guides innovators to patent novel extraction methods and demonstrated synergistic bio-enhancement.",
        "badges": ["Sec 3(p) TK Analysis", "Sec 3(e) Synergism", "Process Patent Pathway"],
        "cards": [
            ("High Risk: Classical Claim", "Claiming simple decoctions of Shallaki and Maricha faces immediate statutory rejection under Section 3(p) Traditional Knowledge."),
            ("Overcoming Hurdle: Synergism", "Provide in-vitro bio-enhancement data showing Piperine increases Boswellic acid plasma concentration by 310% to satisfy Section 3(e)."),
            ("Dual-Claim Drafting Strategy", "Claim 1: Proprietary supercritical carbon dioxide extraction method. Claim 2: Synergistic bio-enhanced therapeutic composition.")
        ]
    },
    {
        "id": 5,
        "tab": "ABS & BIODIVERSITY",
        "title": "Biological Diversity Act 2002 & ABS Compliance",
        "subtitle": "National Biodiversity Authority Approvals • Form 1 & Form 3 Filings",
        "voiceover": "Non-compliance with India's Biological Diversity Act risks severe criminal penalties. Our ABS engine evaluates stakeholder nationality and wild-harvest sourcing, automating National Biodiversity Authority Form 1 and Form 3 prior approval filings.",
        "badges": ["NBA Form 1 Trigger", "NBA Form 3 Mandate", "State Board ABS Royalty"],
        "cards": [
            ("Stakeholder & Sourcing Screening", "Foreign equity participation detected -> Section 3 approval required prior to accessing Indian biological resources."),
            ("Mandatory Form 3 Pre-Grant Filing", "Under Section 6, applicant must obtain National Biodiversity Authority approval before the Indian Patent Office can grant patent."),
            ("Benefit-Sharing Matrix", "Calculated Fair and Equitable Benefit-Sharing royalty: 0.5% of ex-factory gross sales payable to State Biodiversity Board.")
        ]
    },
    {
        "id": 6,
        "tab": "ACTION CHECKLIST",
        "title": "Centralized Checklist & AIIA Facilitation Desk",
        "subtitle": "Audit-Ready Statutory Tasks • 1-Click Technical Officer Escalation",
        "voiceover": "Every regulatory finding populates a centralized, audit-ready action checklist with statutory deadlines. Complex borderline formulations can be escalated directly to AIIA technical officers with one click.",
        "badges": ["Priority Tasks: 4 Pending", "Audit Ready", "AIIA Desk Dispatch"],
        "cards": [
            ("Statutory Task Tracker", "Task 1: File NBA Form 3 before patent grant. Task 2: Submit Rule 158-B safety dossier to State Licensing Authority."),
            ("AIIA Facilitation Desk", "One-click escalation transmits pre-filled technical dossiers to registered patent agents and AIIA technical officers."),
            ("Dossier Export", "Export comprehensive compliance packages in PDF or JSON format for regulatory inspection and institutional investors.")
        ]
    },
    {
        "id": 7,
        "tab": "MULTILINGUAL & BENCHMARKS",
        "title": "5-Language Engine & 98.6% Accuracy Benchmark",
        "subtitle": "English • Hindi • Sanskrit • Tamil • Telugu • Dual Jurisdictions",
        "voiceover": "IP SAKTI Sahayak offers authentic multilingual support across five languages, dual domestic and international regulatory modes, and achieves 98.6% factual grounding accuracy for the Ministry of Ayush.",
        "badges": ["5 Languages Supported", "Dual Jurisdiction Toggle", "98.6% Benchmark Score"],
        "cards": [
            ("Native Multilingual Reasoning", "Natural reasoning in English, Hindi, Sanskrit, Tamil, and Telugu with traditional Ayurvedic technical terminology."),
            ("Dual Jurisdiction Switch", "Seamlessly toggle between domestic Indian Statutory Law and international US FDA and European EMA botanical guidance."),
            ("Empirical Validation Suite", "98.6% factual grounding score across 100+ simulated regulatory test cases with 0% statutory citation hallucinations.")
        ]
    }
]

print("Script template created. Processing scenes...")
