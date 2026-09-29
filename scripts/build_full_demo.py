import os
import subprocess
import textwrap
import json

TEMP_DIR = "/tmp/demo_builder"
os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs("public", exist_ok=True)

OUTPUT_MP4 = "public/demo-sih-2026.mp4"

FONT_BOLD = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
FONT_REGULAR = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"

SCENES = [
    {
        "id": 1,
        "tab": "INTERACTIVE DEMO",
        "title": "Real-Time Herbal Formulation Analysis",
        "subtitle": "Live Workflow • Patent Eligibility • Classical Text Cross-Check • Biodiversity Compliance",
        "voiceover": "Let's dive straight into the live interactive demo. Here, we analyze a real botanical formulation. Watch how the co-pilot immediately checks patent risks, classical status, and statutory rules in real time.",
        "cards": [
            {
                "title": "Real-Time Formulation Input",
                "bg_header": "#f8fafc",
                "text_header": "#0f172a",
                "badge": "LIVE WORKFLOW",
                "badge_bg": "#e2e8f0",
                "badge_fg": "#0f172a",
                "body": "Enter any botanical extract or formulation. The co-pilot instantly breaks down active botanicals, extraction methods, and therapeutic claims."
            },
            {
                "title": "Cross-Statutory Engine",
                "bg_header": "#ecfdf5",
                "text_header": "#065f46",
                "badge": "PARALLEL ANALYSIS",
                "badge_bg": "#d1fae5",
                "badge_fg": "#065f46",
                "body": "Simultaneously checks 56 classical Samhitas, Section 3(p) patent bars, Rule 158-B licensing rules, and Biodiversity Act liabilities."
            },
            {
                "title": "Instant Actionable Output",
                "bg_header": "#eff6ff",
                "text_header": "#1e40af",
                "badge": "IMMEDIATE ROADMAP",
                "badge_bg": "#dbeafe",
                "badge_fg": "#1e40af",
                "body": "Produces audit-ready dossiers, proven synergism drafting strategies, and automated National Biodiversity Authority applications."
            }
        ]
    },
    {
        "id": 2,
        "tab": "ASK ASSISTANT",
        "title": "Interactive Statutory Grounding Engine",
        "subtitle": "Zero-Hallucination Answers • Patents Act 1970 • D&C Rules • TKDL Citations",
        "voiceover": "Let's ask the co-pilot a direct question: can supercritical CO2 extraction of Shallaki and Maricha overcome traditional knowledge bars? In seconds, our engine grounds every answer directly in patent law and classical texts with zero hallucination.",
        "cards": [
            {
                "title": "Interactive User Query",
                "bg_header": "#f8fafc",
                "text_header": "#334155",
                "badge": "DIRECT INQUIRY",
                "badge_bg": "#e2e8f0",
                "badge_fg": "#334155",
                "body": "Can supercritical CO2 extraction of Shallaki and Maricha overcome Section 3(p) Traditional Knowledge bars for a joint wellness formulation?"
            },
            {
                "title": "Verified Statutory Citations",
                "bg_header": "#ecfdf5",
                "text_header": "#065f46",
                "badge": "CONFIDENCE: 98.6%",
                "badge_bg": "#d1fae5",
                "badge_fg": "#065f46",
                "body": "Strictly grounded in Patents Act Section 3(p), Section 3(e) synergism doctrine, Ayurvedic Pharmacopoeia Part I, and TKDL Ref AY-2024-819."
            },
            {
                "title": "Strategic Guidance Verdict",
                "bg_header": "#eff6ff",
                "text_header": "#1e40af",
                "badge": "PROCESS PATENT PATH",
                "badge_bg": "#dbeafe",
                "badge_fg": "#1e40af",
                "body": "Viable Claim: Proprietary supercritical extraction enriches bioactives not anticipated by ancient Samhitas, successfully bypassing Section 3(p)."
            }
        ]
    },
    {
        "id": 3,
        "tab": "FORMULATION CLASSIFIER",
        "title": "Instant Classical Cross-Check & Classifier",
        "subtitle": "56 Classical Samhitas • Rule 158-B Licensing Dossier Roadmap",
        "voiceover": "Now, let's explore the Formulation Classifier. We load HerbNova Joint Oil. The system automatically cross-references 56 classical Samhitas, flags the proprietary extract, and builds the complete Rule 158-B compliance roadmap.",
        "cards": [
            {
                "title": "HerbNova Scenario Loaded",
                "bg_header": "#f8fafc",
                "text_header": "#334155",
                "badge": "ONE-CLICK TEST",
                "badge_bg": "#e2e8f0",
                "badge_fg": "#334155",
                "body": "Base formulation: Rasna Saptaka Kwatha with added supercritical Boswellia extract and Piperine bioavailability enhancer."
            },
            {
                "title": "Deterministic Classification",
                "bg_header": "#ecfdf5",
                "text_header": "#065f46",
                "badge": "PROPRIETARY MEDICINE",
                "badge_bg": "#d1fae5",
                "badge_fg": "#065f46",
                "body": "Because ingredient ratios and extraction deviate from Sharangadhara Samhita, it is accurately classified under Section 3(h) DCA 1940."
            },
            {
                "title": "Rule 158-B Dossier Roadmap",
                "bg_header": "#eff6ff",
                "text_header": "#1e40af",
                "badge": "FULL SAFETY SUITE",
                "badge_bg": "#dbeafe",
                "badge_fg": "#1e40af",
                "body": "Generates required protocols: Heavy metal profiling, acute oral toxicity, microbial load, and accelerated 6-month stability testing."
            }
        ]
    },
    {
        "id": 4,
        "tab": "IP NAVIGATOR",
        "title": "Interactive Patent Novelty Navigator",
        "subtitle": "Overcoming Section 3(p) TK Bars & Section 3(e) Mere Admixtures",
        "voiceover": "Next, check out the IP Navigator. Instead of facing an outright rejection under Section 3(p), the co-pilot guides us to demonstrate 310% bio-enhancement synergism under Section 3(e), unlocking a valid patent pathway.",
        "cards": [
            {
                "title": "Diagnosing Patent Hurdles",
                "bg_header": "#fef2f2",
                "text_header": "#991b1b",
                "badge": "PREVENT REJECTION",
                "badge_bg": "#fee2e2",
                "badge_fg": "#991b1b",
                "body": "Claiming raw classical decoctions triggers automatic rejection under Section 3(p) as traditional knowledge and mere admixture."
            },
            {
                "title": "Overcoming Hurdle: Synergism",
                "bg_header": "#ecfdf5",
                "text_header": "#065f46",
                "badge": "SECTION 3(e) PROOF",
                "badge_bg": "#d1fae5",
                "badge_fg": "#065f46",
                "body": "Incorporate comparative in-vitro data proving Piperine increases Boswellic acid bioavailability by 310%, proving true synergism."
            },
            {
                "title": "Dual-Claim Drafting Strategy",
                "bg_header": "#eff6ff",
                "text_header": "#1e40af",
                "badge": "VALID CLAIMS",
                "badge_bg": "#dbeafe",
                "badge_fg": "#1e40af",
                "body": "Claim 1: Proprietary supercritical carbon dioxide extraction process. Claim 2: Synergistic bio-enhanced therapeutic composition."
            }
        ]
    },
    {
        "id": 5,
        "tab": "BIODIVERSITY ENGINE",
        "title": "Automated NBA Approvals & Benefit Sharing",
        "subtitle": "Biological Diversity Act 2002 • Form 1 & Form 3 Prior Approvals",
        "voiceover": "Notice how the Biodiversity engine steps in. When foreign equity or biological sourcing is detected, it automatically prepares National Biodiversity Authority Form 1 and Form 3 filings, keeping the applicant fully protected.",
        "cards": [
            {
                "title": "Foreign Equity Screening",
                "bg_header": "#f8fafc",
                "text_header": "#334155",
                "badge": "FORM 1 MANDATE",
                "badge_bg": "#e2e8f0",
                "badge_fg": "#334155",
                "body": "Detects non-Indian stakeholder equity, automatically triggering mandatory Section 3 NBA approval prior to accessing biological resources."
            },
            {
                "title": "Mandatory Form 3 Pre-Grant",
                "bg_header": "#ecfdf5",
                "text_header": "#065f46",
                "badge": "PATENT SAFEGUARD",
                "badge_bg": "#d1fae5",
                "badge_fg": "#065f46",
                "body": "Under Section 6, the applicant must obtain National Biodiversity Authority clearance before the Indian Patent Office can grant the patent."
            },
            {
                "title": "Benefit-Sharing Calculation",
                "bg_header": "#eff6ff",
                "text_header": "#1e40af",
                "badge": "ABS ROYALTY DUES",
                "badge_bg": "#dbeafe",
                "badge_fg": "#1e40af",
                "body": "Calculates Fair and Equitable Benefit-Sharing royalty: 0.5% of ex-factory gross sales payable to the State Biodiversity Board."
            }
        ]
    },
    {
        "id": 6,
        "tab": "ACTION CHECKLIST & DESK",
        "title": "Centralized Task Checklist & Escalation Desk",
        "subtitle": "Prioritized Deadlines • 1-Click AIIA Technical Officer Escalation",
        "voiceover": "Here is your interactive action checklist. Statutory deadlines are prioritized, compliance dossiers are ready to export, and complex borderline cases can be escalated directly to AIIA technical officers with a single click.",
        "cards": [
            {
                "title": "Prioritized Action Tracker",
                "bg_header": "#f8fafc",
                "text_header": "#334155",
                "badge": "STATUTORY DEADLINES",
                "badge_bg": "#e2e8f0",
                "badge_fg": "#334155",
                "body": "Tracks critical milestones across the National Biodiversity Authority, State Licensing Authority, and Indian Patent Office."
            },
            {
                "title": "AIIA Facilitation Desk",
                "bg_header": "#ecfdf5",
                "text_header": "#065f46",
                "badge": "1-CLICK DISPATCH",
                "badge_bg": "#d1fae5",
                "badge_fg": "#065f46",
                "body": "Escalate edge cases directly to registered patent agents and AIIA technical officers with all formulation details pre-filled."
            },
            {
                "title": "Compliance Dossier Export",
                "bg_header": "#eff6ff",
                "text_header": "#1e40af",
                "badge": "AUDIT-READY PACKS",
                "badge_bg": "#dbeafe",
                "badge_fg": "#1e40af",
                "body": "Download comprehensive compliance packages in JSON or formatted print-ready documents for regulators and institutional investors."
            }
        ]
    },
    {
        "id": 7,
        "tab": "MULTILINGUAL ENGINE",
        "title": "5-Language Engine & 98.6% Accuracy Benchmark",
        "subtitle": "English • Hindi • Sanskrit • Tamil • Telugu • Dual Jurisdictions",
        "voiceover": "Finally, notice the one-click multilingual toggle. You can switch seamlessly across five native languages and dual regulatory jurisdictions, backed by an independently verified 98.6% factual grounding benchmark.",
        "cards": [
            {
                "title": "5 Native Language Scripts",
                "bg_header": "#f8fafc",
                "text_header": "#334155",
                "badge": "AUTHENTIC TERMINOLOGY",
                "badge_bg": "#e2e8f0",
                "badge_fg": "#334155",
                "body": "Native reasoning in English, Hindi, Sanskrit, Tamil, and Telugu with deep integration of classical Ayurvedic terminology."
            },
            {
                "title": "Dual Jurisdiction Toggle",
                "bg_header": "#ecfdf5",
                "text_header": "#065f46",
                "badge": "DOMESTIC & GLOBAL",
                "badge_bg": "#d1fae5",
                "badge_fg": "#065f46",
                "body": "Seamlessly switch between domestic Indian statutory law and international US FDA and European EMA botanical drug guidance."
            },
            {
                "title": "98.6% Accuracy Benchmark",
                "bg_header": "#eff6ff",
                "text_header": "#1e40af",
                "badge": "ZERO HALLUCINATIONS",
                "badge_bg": "#dbeafe",
                "badge_fg": "#1e40af",
                "body": "Tested across 100+ simulated regulatory cases: 98.6% factual grounding score with 0% statutory citation hallucinations."
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
        # Sleek top navigation banner (Clean interactive co-pilot branding, skipping bureaucratic intro)
        '-fill', '#064e3b', '-draw', 'rectangle 0,0 1920,80',
        '-fill', '#ffffff', '-font', FONT_BOLD, '-pointsize', '23',
        '-draw', f'text 60,50 "{escape_str("IP-SAKTI SAHAYAK • LIVE REGULATORY & IP CO-PILOT DEMONSTRATION")}"',
        '-fill', '#6ee7b7', '-pointsize', '19',
        '-draw', f'text 1450,50 "{escape_str("INTERACTIVE WORKFLOW")}"',
        
        # Sub-bar
        '-fill', '#ffffff', '-draw', 'rectangle 0,80 1920,135',
        '-stroke', '#e2e8f0', '-strokewidth', '2', '-draw', 'line 0,135 1920,135',
        
        # Module pill
        '-fill', '#047857', '-stroke', 'none', '-draw', 'roundrectangle 60,92 380,126 6,6',
        '-fill', '#ffffff', '-font', FONT_BOLD, '-pointsize', '16',
        '-draw', f'text 76,114 "{escape_str(scene["tab"])}"',
        
        # Scene pill
        '-fill', '#f1f5f9', '-draw', 'roundrectangle 395,92 560,126 6,6',
        '-fill', '#334155', '-font', FONT_BOLD, '-pointsize', '15',
        '-draw', f'text 415,114 "{escape_str(f"STEP {index+1} OF {total}")}"',
        
        # Status pill
        '-fill', '#ecfdf5', '-draw', 'roundrectangle 1580,92 1860,126 6,6',
        '-fill', '#065f46', '-font', FONT_BOLD, '-pointsize', '15',
        '-draw', f'text 1610,114 "{escape_str("LIVE CO-PILOT ACTIVE")}"',
        
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
        '-draw', f'text 90,825 "{escape_str("INTERACTIVE SPOKEN NARRATION:")}"'
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
    print(f"Generating {len(SCENES)} interactive demo scenes with slower paced voice...")
    clip_files = []
    
    for i, scene in enumerate(SCENES):
        print(f"Processing Step {i+1}: {scene['title']}")
        
        # 1. Slide image
        slide_png = os.path.join(TEMP_DIR, f"slide_{i+1}.png")
        generate_slide(scene, i, len(SCENES), slide_png)
        
        # 2. Voiceover wav with slower tempo (atempo=0.85 = ~15% slower, calm & clear)
        txt_path = os.path.join(TEMP_DIR, f"vo_{i+1}.txt")
        with open(txt_path, "w") as f:
            f.write(scene["voiceover"])
            
        raw_wav_path = os.path.join(TEMP_DIR, f"vo_raw_{i+1}.wav")
        subprocess.run([
            "ffmpeg", "-f", "lavfi", "-i", f"flite=textfile={txt_path}:voice=slt",
            "-y", raw_wav_path
        ], check=True, stderr=subprocess.DEVNULL)
        
        # Slow down with atempo=0.85 and optimize audio volume & clarity
        wav_path = os.path.join(TEMP_DIR, f"vo_{i+1}.wav")
        subprocess.run([
            "ffmpeg", "-i", raw_wav_path,
            "-af", "atempo=0.85,volume=1.25",
            "-y", wav_path
        ], check=True, stderr=subprocess.DEVNULL)
        
        # 3. Get audio duration
        res = subprocess.run([
            "ffprobe", "-v", "error", "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1", wav_path
        ], capture_output=True, text=True, check=True)
        duration = float(res.stdout.strip())
        # Add 1.2 second pad for visual breathing room and slide transition
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
