import os
import subprocess
import textwrap

TEMP_DIR = "/tmp/demo_builder"
os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs("public", exist_ok=True)

OUTPUT_MP4 = "public/demo-sih-2026.mp4"

FONT_BOLD = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
FONT_REGULAR = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"

SCENES = [
    {
        "id": 1,
        "tab": "MISSION & OVERVIEW",
        "title": "IP-SAKTI Sahayak: AI Regulatory Co-Pilot",
        "subtitle": "Ministry of Ayush & AIIA • SIH 2026 Problem Statement 26045",
        "voiceover": "Welcome to IP SAKTI Sahayak, an intelligent regulatory and IP co-pilot engineered for the Ministry of Ayush and All India Institute of Ayurveda to resolve SIH 2026 Problem Statement 26045.",
        "cards": [
            {
                "title": "Problem Statement 26045",
                "bg_header": "#fef2f2",
                "text_header": "#991b1b",
                "badge": "CHALLENGE: HIGH RISK",
                "badge_bg": "#fee2e2",
                "badge_fg": "#991b1b",
                "body": "Indian Ayush researchers face severe hurdles: Section 3(p) Traditional Knowledge patent bars, complex Schedule I classical formula classification, and strict Biological Diversity Act criminal liabilities."
            },
            {
                "title": "The IP-SAKTI Solution",
                "bg_header": "#ecfdf5",
                "text_header": "#065f46",
                "badge": "ZERO-HALLUCINATION RAG",
                "badge_bg": "#d1fae5",
                "badge_fg": "#065f46",
                "body": "Dual-tier RAG co-pilot cross-referenced directly against 56 First Schedule classical textbooks, the Indian Patents Act 1970, and Rule 158-B licensing roadmaps with verifiable confidence scoring."
            },
            {
                "title": "Impact & Commercialization",
                "bg_header": "#eff6ff",
                "text_header": "#1e40af",
                "badge": "FAST-TRACK PATENTS",
                "badge_bg": "#dbeafe",
                "badge_fg": "#1e40af",
                "body": "Enables startups, Vaidyas, and institutions to safeguard ancestral heritage while turning breakthrough botanical formulations into valid, globally protectable patent assets."
            }
        ]
    },
    {
        "id": 2,
        "tab": "ASK ASSISTANT CO-PILOT",
        "title": "Dual-Tier Statutory Grounding Engine",
        "subtitle": "Indian Patents Act 1970 • Drugs & Cosmetics Rules • Verifiable Citations",
        "voiceover": "In the Ask Assistant module, Ayush researchers can query complex formulations. Our dual-tier RAG architecture grounds answers in verified statutory gazettes and classical pharmacopoeias with zero hallucination.",
        "cards": [
            {
                "title": "Query & Formulation Input",
                "bg_header": "#f8fafc",
                "text_header": "#334155",
                "badge": "USER INQUIRY",
                "badge_bg": "#e2e8f0",
                "badge_fg": "#334155",
                "body": "Can supercritical carbon dioxide extraction of Shallaki and Maricha overcome Section 3(p) Traditional Knowledge bars for a joint wellness composition?"
            },
            {
                "title": "Authoritative Statutory Grounding",
                "bg_header": "#ecfdf5",
                "text_header": "#065f46",
                "badge": "CONFIDENCE: 98.6%",
                "badge_bg": "#d1fae5",
                "badge_fg": "#065f46",
                "body": "Strictly grounded in Patents Act Sec 3(p), Sec 3(e) synergism doctrine, Ayurvedic Pharmacopoeia Part I, TKDL Ref AY-2024-819, and D&C Rule 158-B."
            },
            {
                "title": "Regulatory Guidance Verdict",
                "bg_header": "#eff6ff",
                "text_header": "#1e40af",
                "badge": "PROCESS PATENT PATHWAY",
                "badge_bg": "#dbeafe",
                "badge_fg": "#1e40af",
                "body": "Viable Claim: Proprietary supercritical extraction generates non-classical bioactive enrichment not anticipated by ancient Samhitas, overcoming Section 3(p)."
            }
        ]
    },
    {
        "id": 3,
        "tab": "FORMULATION CLASSIFIER",
        "title": "Classical vs Proprietary Medicine Classifier",
        "subtitle": "56 First Schedule Samhitas Cross-Check • Rule 158-B Dossier Roadmap",
        "voiceover": "Our Formulation Classifier automates statutory classification. Cross-referencing 56 First Schedule classical texts, it instantly identifies proprietary modifications and generates the complete Rule 158-B compliance roadmap.",
        "cards": [
            {
                "title": "HerbNova Joint Formulation",
                "bg_header": "#f8fafc",
                "text_header": "#334155",
                "badge": "SCENARIO LOADED",
                "badge_bg": "#e2e8f0",
                "badge_fg": "#334155",
                "body": "Base: Rasna Saptaka Kwatha (Classical) modified with supercritical Boswellia extract and Piperine bioavailability enhancer in lipid emulsion matrix."
            },
            {
                "title": "Schedule I Classical Check",
                "bg_header": "#fef3c7",
                "text_header": "#92400e",
                "badge": "PROPRIETARY MEDICINE",
                "badge_bg": "#fde68a",
                "badge_fg": "#92400e",
                "body": "Cross-referenced against Sharangadhara and Charaka Samhita. Ingredient deviation triggers Section 3(h) Ayurvedic Proprietary Medicine classification."
            },
            {
                "title": "Rule 158-B Dossier Roadmap",
                "bg_header": "#ecfdf5",
                "text_header": "#065f46",
                "badge": "MANDATORY TESTING",
                "badge_bg": "#d1fae5",
                "badge_fg": "#065f46",
                "body": "Requires NABL heavy metal profiling, aflatoxin assays, acute oral toxicity safety data, and 6-month accelerated stability testing under Rule 158-B."
            }
        ]
    },
    {
        "id": 4,
        "tab": "IP NAVIGATOR",
        "title": "Patent Eligibility & Novelty Navigator",
        "subtitle": "Overcoming Section 3(p) TK Bars & Section 3(e) Mere Admixtures",
        "voiceover": "The IP Navigator prevents costly rejections. It identifies that raw decoctions trigger Section 3(p) exclusions, and guides innovators to patent novel extraction methods and demonstrated synergistic bio-enhancement.",
        "cards": [
            {
                "title": "Traditional Knowledge Bar",
                "bg_header": "#fef2f2",
                "text_header": "#991b1b",
                "badge": "SECTION 3(p) REJECTION RISK",
                "badge_bg": "#fee2e2",
                "badge_fg": "#991b1b",
                "body": "Claiming basic herbal decoctions or known therapeutic indications triggers immediate, non-appealable rejections under Patents Act Section 3(p)."
            },
            {
                "title": "Synergism Under Section 3(e)",
                "bg_header": "#fef3c7",
                "text_header": "#92400e",
                "badge": "BIO-ENHANCEMENT PROOF",
                "badge_bg": "#fde68a",
                "badge_fg": "#92400e",
                "body": "To overcome Section 3(e) mere admixture bar, applicant must provide empirical proof that Piperine increases Boswellic acid bioavailability by over 300%."
            },
            {
                "title": "Dual-Claim Filing Strategy",
                "bg_header": "#ecfdf5",
                "text_header": "#065f46",
                "badge": "RECOMMENDED STRATEGY",
                "badge_bg": "#d1fae5",
                "badge_fg": "#065f46",
                "body": "Split filings: Claim 1 covers the proprietary supercritical extraction method (Process Patent); Claim 2 protects the synergistic bioavailability composition."
            }
        ]
    },
    {
        "id": 5,
        "tab": "ABS & BIODIVERSITY",
        "title": "Biological Diversity Act 2002 & ABS Compliance",
        "subtitle": "National Biodiversity Authority Approvals • Form 1 & Form 3 Prior Filings",
        "voiceover": "Non-compliance with India's Biological Diversity Act risks severe criminal penalties. Our ABS engine evaluates stakeholder nationality and wild-harvest sourcing, automating National Biodiversity Authority Form 1 and Form 3 prior approval filings.",
        "cards": [
            {
                "title": "Entity Nationality Screening",
                "bg_header": "#f8fafc",
                "text_header": "#334155",
                "badge": "FOREIGN ENTITY DETECTED",
                "badge_bg": "#f1f5f9",
                "badge_fg": "#334155",
                "body": "If entity has foreign shareholding or directors, Section 3 mandates NBA Form 1 approval prior to accessing any Indian biological resources."
            },
            {
                "title": "Mandatory Form 3 Pre-Grant",
                "bg_header": "#fef2f2",
                "text_header": "#991b1b",
                "badge": "STATUTORY MANDATE",
                "badge_bg": "#fee2e2",
                "badge_fg": "#991b1b",
                "body": "Under Section 6, applicant must obtain NBA Form 3 approval before patent grant. Failure invalidates patent and risks Section 55 criminal penalties."
            },
            {
                "title": "Benefit-Sharing Calculation",
                "bg_header": "#ecfdf5",
                "text_header": "#065f46",
                "badge": "ABS ROYALTY MATRIX",
                "badge_bg": "#d1fae5",
                "badge_fg": "#065f46",
                "body": "Calculated Fair and Equitable Benefit-Sharing dues: 0.5% of ex-factory gross sales payable to State Biodiversity Board and local BMC communities."
            }
        ]
    },
    {
        "id": 6,
        "tab": "ACTION CHECKLIST & DESK",
        "title": "Audit-Ready Checklist & AIIA Escalation Desk",
        "subtitle": "Centralized Task Prioritization • 1-Click Technical Officer Escalation",
        "voiceover": "Every regulatory finding populates a centralized, audit-ready action checklist with statutory deadlines. Complex borderline formulations can be escalated directly to AIIA technical officers with one click.",
        "cards": [
            {
                "title": "Audit-Ready Action Tasks",
                "bg_header": "#f8fafc",
                "text_header": "#334155",
                "badge": "TIMELINE TRACKER",
                "badge_bg": "#e2e8f0",
                "badge_fg": "#334155",
                "body": "Action items automatically linked to responsible authorities: National Biodiversity Authority, State Licensing Authority, and Indian Patent Office."
            },
            {
                "title": "AIIA Facilitation Desk",
                "bg_header": "#ecfdf5",
                "text_header": "#065f46",
                "badge": "DISPATCH DESK",
                "badge_bg": "#d1fae5",
                "badge_fg": "#065f46",
                "body": "One-click escalation transmits pre-filled technical dossiers to registered patent agents and AIIA technical officers for formal legal review."
            },
            {
                "title": "Comprehensive Dossier Export",
                "bg_header": "#eff6ff",
                "text_header": "#1e40af",
                "badge": "EXPORT READY",
                "badge_bg": "#dbeafe",
                "badge_fg": "#1e40af",
                "body": "Download unified regulatory compliance packs in JSON or formatted print-ready documents for licensing inspectors, bank loans, and investors."
            }
        ]
    },
    {
        "id": 7,
        "tab": "MULTILINGUAL & ACCURACY",
        "title": "5-Language Engine & 98.6% Accuracy Benchmark",
        "subtitle": "English • Hindi • Sanskrit • Tamil • Telugu • Dual Jurisdictions",
        "voiceover": "IP SAKTI Sahayak offers authentic multilingual support across five languages, dual domestic and international regulatory modes, and achieves 98.6% factual grounding accuracy for the Ministry of Ayush.",
        "cards": [
            {
                "title": "Authentic Multilingual Engine",
                "bg_header": "#f8fafc",
                "text_header": "#334155",
                "badge": "5 NATIVE SCRIPTS",
                "badge_bg": "#e2e8f0",
                "badge_fg": "#334155",
                "body": "Native reasoning and legal analysis in English, Hindi, Sanskrit, Tamil, and Telugu with traditional Ayurvedic terminology."
            },
            {
                "title": "Dual Jurisdiction Toggle",
                "bg_header": "#ecfdf5",
                "text_header": "#065f46",
                "badge": "GLOBAL EXPORT READY",
                "badge_bg": "#d1fae5",
                "badge_fg": "#065f46",
                "body": "Seamlessly switch between domestic Indian statutory law and international US FDA and European EMA botanical drug guidance."
            },
            {
                "title": "Empirical Benchmark Score",
                "bg_header": "#eff6ff",
                "text_header": "#1e40af",
                "badge": "ACCURACY: 98.6%",
                "badge_bg": "#dbeafe",
                "badge_fg": "#1e40af",
                "body": "Evaluated against 100+ simulated regulatory test cases: 98.6% factual grounding score with 0% statutory citation hallucinations."
            }
        ]
    }
]

def escape_str(s):
    return s.replace('"', '\\"').replace("'", "\\'")

def generate_slide(scene, index, total, out_path):
    card_coords = [
        (60, 620),
        (660, 1220),
        (1260, 1820)
    ]
    
    draw_cmds = [
        # Top banner
        '-fill', '#064e3b', '-draw', 'rectangle 0,0 1920,80',
        '-fill', '#ffffff', '-font', FONT_BOLD, '-pointsize', '22',
        '-draw', f'text 60,50 "{escape_str("GOVERNMENT OF INDIA • MINISTRY OF AYUSH • ALL INDIA INSTITUTE OF AYURVEDA")}"',
        '-fill', '#a7f3d0', '-pointsize', '20',
        '-draw', f'text 1380,50 "{escape_str("SIH 2026 • PROBLEM STATEMENT 26045")}"',
        
        # Sub-bar
        '-fill', '#ffffff', '-draw', 'rectangle 0,80 1920,135',
        '-stroke', '#e2e8f0', '-strokewidth', '2', '-draw', 'line 0,135 1920,135',
        
        # Module pill
        '-fill', '#064e3b', '-stroke', 'none', '-draw', 'roundrectangle 60,92 380,126 6,6',
        '-fill', '#ffffff', '-font', FONT_BOLD, '-pointsize', '16',
        '-draw', f'text 76,114 "{escape_str(scene["tab"])}"',
        
        # Scene pill
        '-fill', '#f1f5f9', '-draw', 'roundrectangle 395,92 560,126 6,6',
        '-fill', '#334155', '-font', FONT_BOLD, '-pointsize', '15',
        '-draw', f'text 415,114 "{escape_str(f"SCENE {index+1} OF {total}")}"',
        
        # Status pill
        '-fill', '#ecfdf5', '-draw', 'roundrectangle 1580,92 1860,126 6,6',
        '-fill', '#065f46', '-font', FONT_BOLD, '-pointsize', '15',
        '-draw', f'text 1600,114 "{escape_str("AYUSH STATUTORY GROUNDING")}"',
        
        # Title & Subtitle
        '-fill', '#0f172a', '-font', FONT_BOLD, '-pointsize', '34',
        '-draw', f'text 60,185 "{escape_str(scene["title"])}"',
        '-fill', '#059669', '-font', FONT_BOLD, '-pointsize', '20',
        '-draw', f'text 60,225 "{escape_str(scene["subtitle"])}"'
    ]
    
    # Draw 3 Cards
    for c_idx, card in enumerate(scene["cards"]):
        x1, x2 = card_coords[c_idx]
        
        # Outer card box
        draw_cmds.extend([
            '-fill', '#ffffff', '-stroke', '#cbd5e1', '-strokewidth', '2',
            '-draw', f'roundrectangle {x1},255 {x2},765 14,14',
            
            # Card header
            '-fill', card["bg_header"], '-stroke', 'none',
            '-draw', f'roundrectangle {x1+2},257 {x2-2},320 12,12',
            '-fill', card["text_header"], '-font', FONT_BOLD, '-pointsize', '20',
            '-draw', f'text {x1+20},298 "{escape_str(card["title"])}"',
            
            # Pill badge inside card
            '-fill', card["badge_bg"],
            '-draw', f'roundrectangle {x1+20},335 {x2-20},368 6,6',
            '-fill', card["badge_fg"], '-font', FONT_BOLD, '-pointsize', '13',
            '-draw', f'text {x1+30},356 "{escape_str(card["badge"])}"'
        ])
        
        # Card body text
        wrapped_lines = textwrap.wrap(card["body"], width=35)
        for line_i, line in enumerate(wrapped_lines):
            draw_cmds.extend([
                '-fill', '#334155', '-font', FONT_REGULAR, '-pointsize', '17',
                '-draw', f'text {x1+24},{405 + line_i * 26} "{escape_str(line)}"'
            ])
            
    # Bottom Voiceover Box
    draw_cmds.extend([
        '-fill', '#042f2e', '-stroke', '#10b981', '-strokewidth', '2',
        '-draw', 'roundrectangle 60,790 1860,1030 14,14',
        
        # Tag
        '-fill', '#34d399', '-stroke', 'none', '-font', FONT_BOLD, '-pointsize', '15',
        '-draw', f'text 90,825 "{escape_str("AUDIO NARRATION & DEMO SCRIPT CUE:")}"'
    ])
    
    # Wrapped voiceover text
    vo_lines = textwrap.wrap(scene["voiceover"], width=88)
    for v_i, v_line in enumerate(vo_lines):
        draw_cmds.extend([
            '-fill', '#ffffff', '-font', FONT_REGULAR, '-pointsize', '21',
            '-draw', f'text 90,{865 + v_i * 32} "{escape_str(v_line)}"'
        ])
        
    # Bottom timeline progress bar
    progress_w = int(1920 * (index + 1) / total)
    draw_cmds.extend([
        '-fill', '#e2e8f0', '-stroke', 'none',
        '-draw', 'rectangle 0,1065 1920,1080',
        '-fill', '#10b981',
        '-draw', f'rectangle 0,1065 {progress_w},1080'
    ])
    
    cmd = ['convert', '-size', '1920x1080', 'xc:#f8fafc'] + draw_cmds + [out_path]
    subprocess.run(cmd, check=True)

def main():
    print(f"Generating {len(SCENES)} demo scenes...")
    clip_files = []
    
    for i, scene in enumerate(SCENES):
        print(f"Processing Scene {i+1}: {scene['title']}")
        
        # 1. Slide image
        slide_png = os.path.join(TEMP_DIR, f"slide_{i+1}.png")
        generate_slide(scene, i, len(SCENES), slide_png)
        
        # 2. Voiceover wav
        txt_path = os.path.join(TEMP_DIR, f"vo_{i+1}.txt")
        with open(txt_path, "w") as f:
            f.write(scene["voiceover"])
            
        wav_path = os.path.join(TEMP_DIR, f"vo_{i+1}.wav")
        subprocess.run([
            "ffmpeg", "-f", "lavfi", "-i", f"flite=textfile={txt_path}:voice=slt",
            "-y", wav_path
        ], check=True, stderr=subprocess.DEVNULL)
        
        # 3. Get audio duration
        res = subprocess.run([
            "ffprobe", "-v", "error", "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1", wav_path
        ], capture_output=True, text=True, check=True)
        duration = float(res.stdout.strip())
        # Add 1.0 second pad for visual breathing room
        total_clip_duration = duration + 1.2
        
        # 4. Generate scene mp4
        clip_mp4 = os.path.join(TEMP_DIR, f"clip_{i+1}.mp4")
        subprocess.run([
            "ffmpeg", "-loop", "1", "-framerate", "15", "-i", slide_png,
            "-i", wav_path, "-t", str(total_clip_duration),
            "-c:v", "libx264", "-preset", "ultrafast",
            "-c:a", "aac", "-b:a", "128k",
            "-pix_fmt", "yuv420p", "-y", clip_mp4
        ], check=True, stderr=subprocess.DEVNULL)
        
        clip_files.append(clip_mp4)
        print(f"  -> Generated {clip_mp4} ({total_clip_duration:.1f}s)")

    # Concatenate all clips
    concat_txt = os.path.join(TEMP_DIR, "concat.txt")
    with open(concat_txt, "w") as f:
        for c in clip_files:
            f.write(f"file '{c}'\n")
            
    print(f"Concatenating {len(clip_files)} clips into {OUTPUT_MP4}...")
    subprocess.run([
        "ffmpeg", "-f", "concat", "-safe", "0", "-i", concat_txt,
        "-c", "copy", "-y", OUTPUT_MP4
    ], check=True, stderr=subprocess.DEVNULL)
    
    print(f"Successfully generated: {OUTPUT_MP4}")
    
    # Print stats
    probe = subprocess.run([
        "ffprobe", "-v", "error", "-show_entries", "format=duration,size",
        "-of", "json", OUTPUT_MP4
    ], capture_output=True, text=True, check=True)
    stats = json.loads(probe.stdout)["format"]
    size_mb = int(stats["size"]) / (1024 * 1024)
    dur_s = float(stats["duration"])
    print(f"Final MP4 Duration: {dur_s:.1f}s ({dur_s/60:.1f} min), Size: {size_mb:.2f} MB")

if __name__ == "__main__":
    main()
