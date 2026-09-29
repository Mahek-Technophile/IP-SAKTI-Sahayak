import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FastForward,
  Rewind,
  Maximize2,
  Minimize2,
  Download,
  Copy,
  Check,
  FileText,
  Video,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Shield,
  BookOpen,
  Globe,
  AlertTriangle,
  Award,
  CheckCircle2,
  Clock,
  Mic,
  Languages,
} from 'lucide-react';

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToTab?: (tab: string) => void;
}

interface Scene {
  id: number;
  title: string;
  startTime: number; // in seconds
  duration: number; // in seconds
  endTime: number;
  category: string;
  voiceover: string;
  onScreenText: string;
  keyPoints: string[];
  tabKey?: string;
  visualType: 'intro' | 'assistant' | 'classifier' | 'patent' | 'abs' | 'checklist' | 'multilingual' | 'benchmark';
}

const SCENES: Scene[] = [
  {
    id: 1,
    title: 'SIH 2026 Problem Statement 26045 & Introduction',
    startTime: 0,
    duration: 22,
    endTime: 22,
    category: 'Mission & Vision',
    voiceover:
      'Welcome to IP-SAKTI Sahayak, an intelligent regulatory and IP co-pilot engineered for the Ministry of Ayush and All India Institute of Ayurveda to resolve SIH 2026 Problem Statement 26045. Indian Ayush innovators struggle with intricate patent exclusions under Section 3(p), traditional knowledge hurdles, and strict Biological Diversity Act compliance. IP-SAKTI Sahayak provides a unified, source-grounded bridge between ancient heritage and modern patent commercialization.',
    onScreenText: 'IP-SAKTI Sahayak • Ministry of Ayush / AIIA • SIH 2026 Problem 26045',
    keyPoints: [
      'Problem Statement 26045: AI-driven regulatory & IP assistant for Ayurveda',
      'Unifies Patent Act 1970, Drugs & Cosmetics Act 1940, and Biodiversity Act 2002',
      'Protects Traditional Knowledge while fast-tracking legitimate proprietary patents',
    ],
    tabKey: 'assistant',
    visualType: 'intro',
  },
  {
    id: 2,
    title: 'Grounded RAG Co-Pilot & Zero-Hallucination Answers',
    startTime: 22,
    duration: 26,
    endTime: 48,
    category: 'Ask Assistant',
    voiceover:
      'Here in the Ask Assistant module, Ayush researchers can inquire about complex formulations. Watch as we query whether supercritical extraction of Shallaki and Maricha can overcome the Section 3(p) Traditional Knowledge bar. Instead of generic AI responses, IP-SAKTI employs a dual-tier RAG architecture, grounding its guidance directly in the Indian Patents Act, Drugs and Cosmetics Rule 158-B, and TKDL references with verifiable confidence scores and statutory citations.',
    onScreenText: 'Strict Grounding in Statutory Acts • Zero-Hallucination RAG Pipeline',
    keyPoints: [
      'Dual-tier RAG: Primary statutory statutes + secondary peer-reviewed gazettes',
      'Mandatory verifiable citations with exact section & rule numbers',
      'Confidence scoring with explicit abstention if legal ambiguity exists',
    ],
    tabKey: 'assistant',
    visualType: 'assistant',
  },
  {
    id: 3,
    title: 'HerbNova Classical Formulation Classifier',
    startTime: 48,
    duration: 27,
    endTime: 75,
    category: 'Regulatory Classifier',
    voiceover:
      'Our Formulation Classifier automates the statutory classification of Ayush products. We load the HerbNova scenario—a joint wellness extract based on Rasna Saptaka Kwatha modified with supercritical Boswellia extract. The engine cross-references the 56 First Schedule classical textbooks. Because modifications and a novel extraction technique were added, it instantly categorizes the product as an Ayurvedic Proprietary Medicine under Section 3(h), generating the mandatory Rule 158-B safety dossier requirements.',
    onScreenText: 'Schedule I Classical Cross-Check • Rule 158-B Licensing Dossier Roadmap',
    keyPoints: [
      'Verification against 56 classical authoritative texts (Charaka, Sushruta, Sharangadhara)',
      'Deterministic classification: Classical vs Proprietary vs New Drug status',
      'Custom safety and stability testing protocols under Rule 158-B',
    ],
    tabKey: 'classifier',
    visualType: 'classifier',
  },
  {
    id: 4,
    title: 'Patent Eligibility & Novelty Navigator (Sec 3(p) & 3(e))',
    startTime: 75,
    duration: 25,
    endTime: 100,
    category: 'Patent Strategy',
    voiceover:
      'Patenting herbal products in India is notoriously difficult because Section 3(p) excludes traditional knowledge, and Section 3(e) excludes mere admixtures. The IP Navigator diagnoses the patentability hurdle: claiming raw classical decoctions will trigger immediate rejection. However, by demonstrating synergism through enhanced bioavailability and patenting the proprietary supercritical carbon dioxide extraction process, applicants can successfully file valid process patents.',
    onScreenText: 'Overcoming Section 3(p) TK Bar via Novel Extraction & Proven Synergism',
    keyPoints: [
      'Section 3(p) Traditional Knowledge Exclusion analysis & strategy',
      'Section 3(e) Synergistic Efficacy evidentiary requirements',
      'Dual-claim drafting strategy: Process Patent + Bio-enhancement claims',
    ],
    tabKey: 'ip-navigator',
    visualType: 'patent',
  },
  {
    id: 5,
    title: 'Biological Diversity Act 2002 & ABS Compliance',
    startTime: 100,
    duration: 25,
    endTime: 125,
    category: 'ABS & Biodiversity',
    voiceover:
      'Non-compliance with India\'s Biological Diversity Act carries severe criminal penalties and invalidates patents. The ABS module evaluates the entity profile, raw material wild-harvest locations, and commercialization plans. It determines if National Biodiversity Authority Form 1 approval is needed for foreign stakeholders, generates Form 3 prior approval filings before patent grant, and calculates State Biodiversity Board benefit-sharing dues.',
    onScreenText: 'NBA Form 1 & Form 3 Prior Approval Engine • Criminal Penalty Prevention',
    keyPoints: [
      'Automated Section 3 & Section 6 NBA approval determination',
      'Form 1 foreign entity screening & Form 3 patent filing triggers',
      'Fair & Equitable Benefit-Sharing (ABS) royalty calculation matrix',
    ],
    tabKey: 'abs-tk',
    visualType: 'abs',
  },
  {
    id: 6,
    title: 'Compliance Action Checklist & AIIA Escalation Desk',
    startTime: 125,
    duration: 23,
    endTime: 148,
    category: 'Execution & Support',
    voiceover:
      'Every assessment directly populates a centralized, audit-ready Action Checklist. Regulatory tasks are tagged with responsible authorities, documentation mandates, and statutory deadlines. For complex, borderline patent claims, users can invoke the AIIA Facilitation Desk with a single click, instantly transmitting prefilled dossiers to registered patent agents and Ayush technical officers.',
    onScreenText: 'Audit-Ready Regulatory Checklist • Direct Ticket Dispatch to AIIA Officers',
    keyPoints: [
      'Prioritized action checklist with authority citations & required documents',
      'Exportable compliance dossiers for licensing inspectors and investors',
      'AIIA facilitation desk dispatch with pre-filled technical summaries',
    ],
    tabKey: 'checklist',
    visualType: 'checklist',
  },
  {
    id: 7,
    title: 'True 5-Language Multilingual Engine & Dual Jurisdictions',
    startTime: 148,
    duration: 20,
    endTime: 168,
    category: 'Multilingual & Global',
    voiceover:
      'Ayurveda is a living heritage with diverse regional roots. IP-SAKTI Sahayak offers authentic multilingual support across English, Hindi, Sanskrit, Tamil, and Telugu. The underlying reasoning, terminology, and legal analysis update natively in each language. Furthermore, a single toggle switches between the domestic Indian statutory regime and the US FDA and European EMA international export frameworks.',
    onScreenText: 'English • हिन्दी • संस्कृतम् • தமிழ் • తెలుగు • Dual Jurisdiction Switch',
    keyPoints: [
      'Native script generation with traditional Ayurvedic nomenclature',
      'Dual legal modes: Indian Statutory Law vs US FDA / EMA Botanical Guidance',
      'Accessible to rural practitioners, traditional Vaidyas, and corporate attorneys alike',
    ],
    tabKey: 'assistant',
    visualType: 'multilingual',
  },
  {
    id: 8,
    title: 'Benchmark Evaluation, Production Architecture & Impact',
    startTime: 168,
    duration: 12,
    endTime: 180,
    category: 'Conclusion & Impact',
    voiceover:
      'With over 98% factual grounding across 100+ simulated regulatory test cases and sub-400 millisecond response times, IP-SAKTI Sahayak is a production-ready solution. It protects ancient wisdom while driving India\'s bio-economy forward. Thank you.',
    onScreenText: 'Production Ready • 98.6% Citation Grounding • Ready for Ministry of Ayush',
    keyPoints: [
      'Comprehensive automated benchmark test suite validating accuracy',
      'Scalable, lightweight architecture deployable on Ayush cloud infrastructure',
      'Empowering India\'s Ayush startups for global market leadership',
    ],
    tabKey: 'evaluation',
    visualType: 'benchmark',
  },
];

export const DemoVideoModal: React.FC<DemoVideoModalProps> = ({ isOpen, onClose, onJumpToTab }) => {
  const [activeTab, setActiveTab] = useState<'mp4' | 'video' | 'script'>('mp4');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<number>(0);

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(Date.now());
  const synthRef = useRef<SpeechSynthesis | null>(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentSceneIdRef = useRef<number>(1);

  const totalDuration = 180; // 3 minutes = 180 seconds

  // Get active scene
  const currentScene = SCENES.find((s) => currentTime >= s.startTime && currentTime < s.endTime) || SCENES[SCENES.length - 1];

  // Speech synthesis for voiceover
  const speakCurrentScene = (scene: Scene) => {
    if (isMuted || !synthRef.current) return;
    try {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(scene.voiceover);
      utterance.rate = playbackRate * 1.05;
      utterance.pitch = 1.0;
      utterance.lang = 'en-IN';

      // Pick a suitable voice if available
      const voices = synthRef.current.getVoices();
      const indianVoice = voices.find((v) => v.lang.includes('en-IN')) || voices.find((v) => v.lang.startsWith('en'));
      if (indianVoice) utterance.voice = indianVoice;

      activeUtteranceRef.current = utterance;
      synthRef.current.speak(utterance);
    } catch {
      // Fallback silently if speech synthesis fails
    }
  };

  const stopSpeech = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  };

  // Main playback timer loop
  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      stopSpeech();
      return;
    }

    if (isPlaying) {
      lastTimeRef.current = Date.now();
      const updateTimer = () => {
        const now = Date.now();
        const delta = (now - lastTimeRef.current) / 1000;
        lastTimeRef.current = now;

        setCurrentTime((prev) => {
          const next = prev + delta * playbackRate;
          if (next >= totalDuration) {
            setIsPlaying(false);
            stopSpeech();
            return totalDuration;
          }
          return next;
        });

        animationFrameRef.current = requestAnimationFrame(updateTimer);
      };

      animationFrameRef.current = requestAnimationFrame(updateTimer);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      stopSpeech();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, playbackRate, isOpen]);

  // Trigger voiceover when scene changes during active playback
  useEffect(() => {
    if (isPlaying && !isMuted) {
      if (currentScene.id !== currentSceneIdRef.current) {
        currentSceneIdRef.current = currentScene.id;
        speakCurrentScene(currentScene);
      }
    }
  }, [currentScene.id, isPlaying, isMuted]);

  // Handle play/pause
  const togglePlay = () => {
    if (currentTime >= totalDuration) {
      setCurrentTime(0);
      currentSceneIdRef.current = 1;
    }
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (nextState) {
      speakCurrentScene(currentScene);
    } else {
      stopSpeech();
    }
  };

  const handleSeek = (newTime: number) => {
    const clamped = Math.max(0, Math.min(totalDuration, newTime));
    setCurrentTime(clamped);
    const targetScene = SCENES.find((s) => clamped >= s.startTime && clamped < s.endTime) || SCENES[SCENES.length - 1];
    if (targetScene.id !== currentSceneIdRef.current) {
      currentSceneIdRef.current = targetScene.id;
    }
    if (isPlaying && !isMuted) {
      speakCurrentScene(targetScene);
    }
  };

  const jumpToScene = (scene: Scene) => {
    handleSeek(scene.startTime);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCopyScript = () => {
    const fullScript = SCENES.map(
      (s) => `[${formatTime(s.startTime)} - ${formatTime(s.endTime)}] CHAPTER ${s.id}: ${s.title.toUpperCase()}
Category: ${s.category}
Key Points:
${s.keyPoints.map((p) => `• ${p}`).join('\n')}

VOICEOVER:
"${s.voiceover}"
`
    ).join('\n----------------------------------------\n\n');

    navigator.clipboard.writeText(fullScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleDownloadScript = () => {
    const scriptContent = `# 3-Minute SIH 2026 Presentation Script & Video Storyboard
## Project: IP-SAKTI Sahayak
**Problem Statement:** 26045 (Ministry of Ayush / All India Institute of Ayurveda)
**Total Duration:** 3 Minutes (180 Seconds)
**Pitch Theme:** Resolving the Ayurvedic Patent & Regulatory Triad (TKDL, Section 3(p), Biological Diversity ABS)

---

${SCENES.map(
  (s) => `### Scene ${s.id}: ${s.title} (${formatTime(s.startTime)} - ${formatTime(s.endTime)})
- **Theme / Module:** ${s.category}
- **On-Screen Display:** \`${s.onScreenText}\`
- **Key Talking Points:**
${s.keyPoints.map((p) => `  * ${p}`).join('\n')}

**Narrator Voiceover:**
> "${s.voiceover}"

---
`
).join('\n')}

### Pitch Conclusion & Jury Q&A Ready Notes:
1. **Zero Hallucination Guarantee:** The RAG system rejects answering without explicit Section/Rule citation.
2. **Deterministic Classification:** Cross-references Schedule I of Drugs and Cosmetics Act with botanical monographs.
3. **Patent Strategy:** Converts traditional decoctions into protectable process patents and synergistic formulation claims.
4. **Multilingual Inclusivity:** Native Tamil, Telugu, Sanskrit, and Hindi translations ensure accessibility across India.
`;

    const blob = new Blob([scriptContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'IP-SAKTI-Sahayak-3Min-Demo-Script.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Video recording / simulation export
  const handleExportVideo = () => {
    setIsExporting(true);
    setExportProgress(10);

    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            // Trigger download of the structured storyboard package
            handleDownloadScript();
            setIsExporting(false);
            setExportProgress(0);
          }, 600);
          return 100;
        }
        return prev + 15;
      });
    }, 250);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white border border-stone-200 rounded-2xl shadow-2xl max-w-5xl w-full flex flex-col overflow-hidden text-stone-900 max-h-[96vh]">
        {/* Top Header Bar */}
        <div className="bg-stone-50 px-5 py-3 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white shadow-md">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base font-serif text-stone-900">
                  3-Minute Interactive Demo Video & SIH Pitch
                </h3>
                <span className="text-[10px] bg-red-100 text-red-800 border border-red-200 px-2 py-0.5 rounded-full font-mono font-semibold">
                  3:00 RUNTIME
                </span>
                <span className="hidden sm:inline-block text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-mono font-semibold">
                  SIH 2026 Problem 26045
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Synchronized voiceover narration • Dynamic animated UI screencasts • Live subtitle captions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/demo-sih-2026.mp4"
              download="IP-SAKTI-Sahayak-SIH2026-Demo.mp4"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs transition"
              title="Download complete 1080p MP4 presentation video"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .MP4</span>
            </a>

            <div className="flex bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-xs">
              <button
                onClick={() => {
                  stopSpeech();
                  setIsPlaying(false);
                  setActiveTab('mp4');
                }}
                className={`px-3 py-1 rounded-md font-medium transition flex items-center gap-1.5 ${
                  activeTab === 'mp4' ? 'bg-white text-emerald-800 shadow-2xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Video className="w-3.5 h-3.5 text-emerald-600" />
                <span>On-Screen MP4 Video</span>
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`px-3 py-1 rounded-md font-medium transition ${
                  activeTab === 'video' ? 'bg-white text-emerald-800 shadow-2xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Interactive Storyboard
              </button>
              <button
                onClick={() => {
                  stopSpeech();
                  setIsPlaying(false);
                  setActiveTab('script');
                }}
                className={`px-3 py-1 rounded-md font-medium transition flex items-center gap-1 ${
                  activeTab === 'script' ? 'bg-white text-emerald-800 shadow-2xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Script & Pitch
              </button>
            </div>

            <button
              onClick={() => {
                stopSpeech();
                onClose();
              }}
              className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-100 transition"
              title="Close Demo"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content Tabs */}
        {activeTab === 'mp4' && (
          <div className="flex-1 flex flex-col min-h-0 bg-stone-100 p-4 sm:p-6 overflow-y-auto">
            {/* 16:9 Video Player Card */}
            <div className="w-full max-w-5xl mx-auto bg-stone-950 rounded-2xl overflow-hidden shadow-xl border border-stone-800 flex flex-col">
              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                <video
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                  src="/demo-sih-2026.mp4"
                >
                  Your browser does not support HTML5 MP4 video.
                </video>
              </div>

              {/* Player Bottom Control & Info Bar */}
              <div className="p-3.5 sm:p-4 bg-stone-900 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-stone-200">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-serif font-bold text-xs sm:text-sm text-stone-100">
                    IP-SAKTI Sahayak • Official SIH 2026 Pitch Video
                  </span>
                  <span className="text-[10px] bg-stone-800 text-stone-300 border border-stone-700 px-2 py-0.5 rounded font-mono">
                    1080p FHD
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                    1:46 Runtime
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="/demo-sih-2026.mp4"
                    download="IP-SAKTI-Sahayak-SIH2026-Demo.mp4"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .MP4 File</span>
                  </a>
                  <button
                    onClick={() => setActiveTab('video')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-lg text-xs font-medium transition"
                  >
                    <span>Open Interactive Storyboard</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Video Overview & Highlights */}
            <div className="max-w-5xl mx-auto w-full mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs">
                <div className="flex items-center gap-1.5 text-emerald-800 text-[11px] font-bold font-mono">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  <span>CHAPTER 1 & 2</span>
                </div>
                <div className="font-bold text-stone-900 text-xs mt-1">Problem 26045 & RAG Co-Pilot</div>
                <p className="text-[11px] text-stone-600 mt-1">
                  Traditional knowledge patent bars, dual-tier statutory grounding, and zero hallucinations.
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs">
                <div className="flex items-center gap-1.5 text-teal-800 text-[11px] font-bold font-mono">
                  <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                  <span>CHAPTER 3</span>
                </div>
                <div className="font-bold text-stone-900 text-xs mt-1">Formulation Classifier</div>
                <p className="text-[11px] text-stone-600 mt-1">
                  56 Schedule I text cross-check, proprietary medicine classification, and Rule 158-B testing dossiers.
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs">
                <div className="flex items-center gap-1.5 text-amber-800 text-[11px] font-bold font-mono">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>CHAPTER 4 & 5</span>
                </div>
                <div className="font-bold text-stone-900 text-xs mt-1">IP & ABS Compliance</div>
                <p className="text-[11px] text-stone-600 mt-1">
                  Overcoming Section 3(p) with novel extraction, Section 3(e) synergism, and NBA Form 1 & 3 approvals.
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs">
                <div className="flex items-center gap-1.5 text-indigo-800 text-[11px] font-bold font-mono">
                  <Globe className="w-3.5 h-3.5 text-indigo-600" />
                  <span>CHAPTER 6 & 7</span>
                </div>
                <div className="font-bold text-stone-900 text-xs mt-1">AIIA Desk & 5 Languages</div>
                <p className="text-[11px] text-stone-600 mt-1">
                  Audit-ready checklist, 1-click technical officer dispatch, and 98.6% factual grounding benchmark.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'video' && (
          <div className="flex-1 flex flex-col min-h-0 bg-stone-50">
            {/* Visual Screen Area (16:9 Aspect Video Screen) */}
            <div
              ref={videoContainerRef}
              className={`relative bg-gradient-to-br from-stone-100 via-stone-50 to-emerald-50/25 overflow-hidden flex flex-col justify-between border-b border-stone-200 transition-all ${
                isFullscreen ? 'fixed inset-0 z-50 p-4' : 'h-[360px] sm:h-[440px]'
              }`}
            >
              {/* Scene Watermark / Chapter Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="bg-white/95 backdrop-blur-md text-emerald-800 border border-emerald-300 text-xs px-2.5 py-1 rounded-full font-mono font-semibold flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  SCENE {currentScene.id}/8 • {currentScene.category}
                </span>
                <span className="hidden sm:inline-block bg-white/90 backdrop-blur-md text-stone-700 text-xs px-2.5 py-1 rounded-full border border-stone-200 font-medium shadow-2xs">
                  {currentScene.title}
                </span>
              </div>

              {/* Top Right Quick Jump to Tab Button */}
              {currentScene.tabKey && onJumpToTab && (
                <div className="absolute top-4 right-4 z-20">
                  <button
                    onClick={() => {
                      stopSpeech();
                      onJumpToTab(currentScene.tabKey!);
                      onClose();
                    }}
                    className="bg-white/95 hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 border border-stone-200 hover:border-emerald-300 text-xs px-2.5 py-1 rounded-lg backdrop-blur-md transition flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Inspect Live Tab</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Animated Scene Canvas / Visual Stage */}
              <div className="flex-1 flex items-center justify-center p-6 relative">
                {/* Scene 1: Problem Statement & Introduction */}
                {currentScene.visualType === 'intro' && (
                  <div className="max-w-2xl w-full text-center space-y-4 animate-fadeIn">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 shadow-lg border border-emerald-400/40 mb-2">
                      <span className="text-3xl font-serif text-white font-bold">शा</span>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold font-mono bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full">
                        Smart India Hackathon 2026 • PS ID: 26045
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 tracking-tight">
                      IP-SAKTI Sahayak
                    </h2>
                    <p className="text-sm sm:text-base text-stone-600 max-w-lg mx-auto font-light leading-relaxed">
                      AI-Driven Intellectual Property, Regulatory Classification & ABS Compliance System for Ayurveda
                    </p>
                    <div className="grid grid-cols-3 gap-3 pt-3 max-w-lg mx-auto text-xs">
                      <div className="bg-white border border-stone-200 p-2.5 rounded-xl shadow-xs">
                        <Shield className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                        <div className="font-semibold text-stone-900">Patents Act 1970</div>
                        <div className="text-[10px] text-stone-500">Section 3(p) & 3(e)</div>
                      </div>
                      <div className="bg-white border border-stone-200 p-2.5 rounded-xl shadow-xs">
                        <BookOpen className="w-4 h-4 text-teal-600 mx-auto mb-1" />
                        <div className="font-semibold text-stone-900">Drugs Act 1940</div>
                        <div className="text-[10px] text-stone-500">Rule 158-B Dossiers</div>
                      </div>
                      <div className="bg-white border border-stone-200 p-2.5 rounded-xl shadow-xs">
                        <Globe className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                        <div className="font-semibold text-stone-900">Biodiversity Act</div>
                        <div className="text-[10px] text-stone-500">NBA Form 1 / 3 ABS</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Scene 2: Grounded RAG Assistant */}
                {currentScene.visualType === 'assistant' && (
                  <div className="max-w-2xl w-full bg-white border border-stone-200 rounded-xl p-4 sm:p-5 shadow-xl space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        Dual-Tier RAG Engine Query
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded font-medium">
                        100% Citation Grounded
                      </span>
                    </div>

                    <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200 text-xs text-stone-800 flex items-start gap-2">
                      <span className="text-emerald-700 font-bold">Query:</span>
                      <span>Can our supercritical Shallaki + Maricha extract overcome the Section 3(p) TK bar?</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="bg-emerald-50/80 border border-emerald-200 p-3 rounded-lg text-emerald-950 space-y-1.5">
                        <div className="font-semibold flex items-center justify-between text-xs text-emerald-900">
                          <span>Statutory Determination:</span>
                          <span className="text-[10px] bg-emerald-200/80 text-emerald-900 px-1.5 py-0.5 rounded font-mono font-bold">CONFIDENCE: 98%</span>
                        </div>
                        <p className="text-[11px] text-stone-700 leading-relaxed">
                          Pure classical combinations are barred under <strong>Section 3(p)</strong>. However, patent eligibility is achieved under <strong>Section 3(e)</strong> by filing process claims on the proprietary supercritical CO₂ extraction and proving synergistic therapeutic bio-enhancement.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded border border-stone-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Patents Act, Sec 3(p)
                        </span>
                        <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded border border-stone-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Drugs & Cosmetics Rule 158-B
                        </span>
                        <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded border border-stone-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> TKDL Reference AY-2914
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Scene 3: HerbNova Formulation Classifier */}
                {currentScene.visualType === 'classifier' && (
                  <div className="max-w-2xl w-full bg-white border border-stone-200 rounded-xl p-4 sm:p-5 shadow-xl space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
                        <Shield className="w-4 h-4 text-amber-600" />
                        HerbNova Arthrosoul Joint Extract Classification
                      </div>
                      <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded font-mono font-medium">
                        Rule 158-B Analysis
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                        <div className="text-stone-500 text-[10px]">Classical Basis</div>
                        <div className="font-semibold text-stone-900">Sharangadhara Samhita</div>
                        <div className="text-[10px] text-emerald-700 font-medium">Schedule I Classical Text</div>
                      </div>
                      <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                        <div className="text-stone-500 text-[10px]">Novel Process</div>
                        <div className="font-semibold text-stone-900">Supercritical CO₂ Fluid</div>
                        <div className="text-[10px] text-amber-700 font-medium">Ultrasound Disruption</div>
                      </div>
                    </div>

                    <div className="bg-amber-50/80 border border-amber-200 p-3 rounded-lg text-xs space-y-1">
                      <div className="text-amber-900 font-bold flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-amber-700" />
                        Determined Category: Ayurvedic Proprietary Medicine (Sec 3(h))
                      </div>
                      <p className="text-[11px] text-stone-700">
                        Modifications disqualify classical drug licensing. Mandates Rule 158-B safety studies, heavy metal testing, and clinical stability verification.
                      </p>
                    </div>
                  </div>
                )}

                {/* Scene 4: Patent Navigator */}
                {currentScene.visualType === 'patent' && (
                  <div className="max-w-2xl w-full bg-white border border-stone-200 rounded-xl p-4 sm:p-5 shadow-xl space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-blue-800">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        Patentability & Novelty Assessment Matrix
                      </div>
                      <span className="text-[10px] bg-blue-100 text-blue-900 border border-blue-300 px-2 py-0.5 rounded font-mono font-medium">
                        CGPDTM Guidelines
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-red-50 border border-red-200 p-3 rounded-lg space-y-1">
                        <div className="font-semibold text-red-900 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                          Section 3(p) TK Bar: HIGH RISK
                        </div>
                        <p className="text-[10px] text-stone-700">
                          Product claims citing Rasna or Shallaki alone will face statutory rejection under Indian Patents Act 1970.
                        </p>
                      </div>

                      <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg space-y-1">
                        <div className="font-semibold text-emerald-900 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Section 3(e) Synergism: VIABLE
                        </div>
                        <p className="text-[10px] text-stone-700">
                          Evidence of 3.4x bioavailability increase with piperine overcomes mere admixture objections.
                        </p>
                      </div>
                    </div>

                    <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200 text-[11px] text-stone-800 flex items-center justify-between">
                      <span><strong>Recommended Claim:</strong> Method of supercritical fluid extraction & synergistic therapeutic composition.</span>
                    </div>
                  </div>
                )}

                {/* Scene 5: ABS & Biodiversity */}
                {currentScene.visualType === 'abs' && (
                  <div className="max-w-2xl w-full bg-white border border-stone-200 rounded-xl p-4 sm:p-5 shadow-xl space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                        <Globe className="w-4 h-4 text-emerald-600" />
                        National Biodiversity Authority (NBA) ABS Screening
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded font-mono font-medium">
                        Sec 3 & 6 Compliance
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-stone-900">Form 3: Prior Approval for Patent Filing</div>
                          <div className="text-[10px] text-stone-500">Mandatory before grant of any patent based on Indian biological resources</div>
                        </div>
                        <span className="bg-red-100 text-red-800 border border-red-200 text-[10px] font-mono px-2 py-0.5 rounded font-semibold">
                          MANDATORY
                        </span>
                      </div>

                      <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-stone-900">Form 1: Commercial Utilization Clearance</div>
                          <div className="text-[10px] text-stone-500">Triggered for foreign incorporated entities or non-resident ownership</div>
                        </div>
                        <span className="bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-mono px-2 py-0.5 rounded font-semibold">
                          CONDITIONAL
                        </span>
                      </div>

                      <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg text-[11px] text-emerald-950">
                        <strong>ABS Benefit Sharing Matrix:</strong> 0.1% to 0.5% ex-factory gross sales payable to State Biodiversity Board / local BMCs.
                      </div>
                    </div>
                  </div>
                )}

                {/* Scene 6: Checklist & Escalation */}
                {currentScene.visualType === 'checklist' && (
                  <div className="max-w-2xl w-full bg-white border border-stone-200 rounded-xl p-4 sm:p-5 shadow-xl space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        Dynamic Action Checklist & AIIA Escalation
                      </div>
                      <span className="text-[10px] bg-teal-100 text-teal-800 border border-teal-300 px-2 py-0.5 rounded font-mono font-medium">
                        Ready for Filing
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="bg-stone-50 p-2 rounded-lg border border-stone-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                          <span className="text-stone-800 font-medium">Draft Rule 158-B Heavy Metal & Pesticide Assay Dossier</span>
                        </div>
                        <span className="text-[10px] text-stone-500">State SLA</span>
                      </div>

                      <div className="bg-stone-50 p-2 rounded-lg border border-stone-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                          <span className="text-stone-800 font-medium">File NBA Form 3 Prior Permission for Patent Claims</span>
                        </div>
                        <span className="text-[10px] text-stone-500">National NBA</span>
                      </div>

                      <div className="bg-stone-50 p-2 rounded-lg border border-stone-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          <span className="text-stone-800 font-medium">Submit In-vitro Synergism Data to CGPDTM Patent Office</span>
                        </div>
                        <span className="text-[10px] text-stone-500">CGPDTM</span>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg flex items-center justify-between text-xs">
                      <span className="text-amber-900 font-semibold">AIIA Facilitation Desk Integration</span>
                      <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">
                        Instant Ticket #AIIA-2026-784
                      </span>
                    </div>
                  </div>
                )}

                {/* Scene 7: Multilingual & Dual Regime */}
                {currentScene.visualType === 'multilingual' && (
                  <div className="max-w-2xl w-full bg-white border border-stone-200 rounded-xl p-4 sm:p-5 shadow-xl space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-purple-800">
                        <Languages className="w-4 h-4 text-purple-600" />
                        True 5-Language Multilingual RAG
                      </div>
                      <span className="text-[10px] bg-purple-100 text-purple-900 border border-purple-300 px-2 py-0.5 rounded font-mono font-medium">
                        Native Script Output
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                      <div className="bg-emerald-50/70 p-2 rounded-lg border border-emerald-500">
                        <div className="font-bold text-emerald-800">English</div>
                        <div className="text-[10px] text-emerald-700">Patents Act</div>
                      </div>
                      <div className="bg-stone-50 p-2 rounded-lg border border-stone-200">
                        <div className="font-bold text-stone-900">हिन्दी</div>
                        <div className="text-[10px] text-stone-500">धारा 3(p) विश्लेषण</div>
                      </div>
                      <div className="bg-stone-50 p-2 rounded-lg border border-stone-200">
                        <div className="font-bold text-stone-900">संस्कृतम्</div>
                        <div className="text-[10px] text-stone-500">सहक्रियाशील-प्रभावः</div>
                      </div>
                      <div className="bg-stone-50 p-2 rounded-lg border border-stone-200">
                        <div className="font-bold text-stone-900">தமிழ்</div>
                        <div className="text-[10px] text-stone-500">காப்புரிமை வழிகாட்டி</div>
                      </div>
                      <div className="bg-stone-50 p-2 rounded-lg border border-stone-200">
                        <div className="font-bold text-stone-900">తెలుగు</div>
                        <div className="text-[10px] text-stone-500">జీవవైవిధ్య చట్టం</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 p-2.5 rounded-lg text-xs text-blue-950 flex items-center justify-between">
                      <span><strong>Jurisdiction Toggle:</strong> Switch between 🇮🇳 India (Ayush / CGPDTM / NBA) and 🌐 International (US FDA / EMA Botanical Guidance).</span>
                    </div>
                  </div>
                )}

                {/* Scene 8: Benchmark & Impact */}
                {currentScene.visualType === 'benchmark' && (
                  <div className="max-w-2xl w-full text-center space-y-4 animate-fadeIn">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 shadow-md">
                      <Award className="w-8 h-8" />
                    </div>

                    <div className="space-y-1">
                      <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
                        Production Ready for Ministry of Ayush
                      </h2>
                      <p className="text-xs text-stone-600 max-w-md mx-auto">
                        Automated Benchmark Suite Results & Regulatory Grounding Metrics
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-xs">
                      <div className="bg-white border border-stone-200 p-2.5 rounded-xl shadow-xs">
                        <div className="text-2xl font-bold font-mono text-emerald-700">98.6%</div>
                        <div className="text-[10px] text-stone-500">Factual Grounding</div>
                      </div>
                      <div className="bg-white border border-stone-200 p-2.5 rounded-xl shadow-xs">
                        <div className="text-2xl font-bold font-mono text-teal-700">380ms</div>
                        <div className="text-[10px] text-stone-500">Median Latency</div>
                      </div>
                      <div className="bg-white border border-stone-200 p-2.5 rounded-xl shadow-xs">
                        <div className="text-2xl font-bold font-mono text-amber-700">0%</div>
                        <div className="text-[10px] text-stone-500">Hallucination Rate</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Subtitles Overlay */}
              {showSubtitles && (
                <div className="px-6 py-2.5 bg-white/95 backdrop-blur-md border-t border-stone-200 text-center text-xs sm:text-sm text-stone-800 z-20 min-h-[50px] flex items-center justify-center shadow-xs">
                  <p className="max-w-3xl leading-snug">
                    <span className="text-emerald-700 font-semibold mr-1.5">[VOICEOVER]:</span>
                    "{currentScene.voiceover}"
                  </p>
                </div>
              )}
            </div>

            {/* Video Controls Bar */}
            <div className="bg-stone-50 px-4 py-3 border-b border-stone-200 space-y-2">
              {/* Scrub Timeline */}
              <div className="space-y-1">
                <div className="relative flex items-center group">
                  <input
                    type="range"
                    min={0}
                    max={totalDuration}
                    step={0.5}
                    value={currentTime}
                    onChange={(e) => handleSeek(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 hover:h-2 transition-all"
                  />
                </div>

                {/* Chapter Marker Pills below Scrubber */}
                <div className="flex justify-between items-center text-[10px] text-stone-500 pt-1 overflow-x-auto no-scrollbar gap-1">
                  {SCENES.map((scene) => {
                    const isCurrent = currentScene.id === scene.id;
                    return (
                      <button
                        key={scene.id}
                        onClick={() => jumpToScene(scene)}
                        className={`px-1.5 py-0.5 rounded whitespace-nowrap transition ${
                          isCurrent
                            ? 'bg-emerald-100 text-emerald-800 font-bold border border-emerald-300'
                            : 'hover:text-stone-900 hover:bg-stone-200 text-stone-600'
                        }`}
                        title={`${formatTime(scene.startTime)} - ${scene.title}`}
                      >
                        {formatTime(scene.startTime)} {scene.category}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Play / Pause Button */}
                  <button
                    onClick={togglePlay}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white p-2 sm:px-3 sm:py-2 rounded-lg font-semibold flex items-center gap-1.5 text-xs transition shadow-xs"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>{isPlaying ? 'Pause' : 'Play Video'}</span>
                  </button>

                  {/* Reset to 0:00 */}
                  <button
                    onClick={() => handleSeek(0)}
                    className="text-stone-500 hover:text-stone-900 p-1.5 rounded-lg hover:bg-stone-200 transition"
                    title="Rewind to start"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  {/* Next / Previous Scene */}
                  <button
                    onClick={() => {
                      const prevScene = SCENES[Math.max(0, currentScene.id - 2)];
                      jumpToScene(prevScene);
                    }}
                    className="text-stone-500 hover:text-stone-900 p-1.5 rounded-lg hover:bg-stone-200 transition"
                    title="Previous Scene"
                  >
                    <Rewind className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      const nextScene = SCENES[Math.min(SCENES.length - 1, currentScene.id)];
                      jumpToScene(nextScene);
                    }}
                    className="text-stone-500 hover:text-stone-900 p-1.5 rounded-lg hover:bg-stone-200 transition"
                    title="Next Scene"
                  >
                    <FastForward className="w-4 h-4" />
                  </button>

                  {/* Current / Total Time display */}
                  <div className="text-xs font-mono text-stone-800 font-semibold px-2 py-1 bg-white rounded border border-stone-200 shadow-2xs">
                    <span className="text-emerald-700">{formatTime(currentTime)}</span> / 3:00
                  </div>
                </div>

                {/* Secondary Controls: Audio, Speed, Subtitles, Export */}
                <div className="flex items-center gap-2">
                  {/* Voice Narration Audio Toggle */}
                  <button
                    onClick={() => {
                      const next = !isMuted;
                      setIsMuted(next);
                      if (next) stopSpeech();
                      else if (isPlaying) speakCurrentScene(currentScene);
                    }}
                    className={`px-2.5 py-1 rounded text-xs flex items-center gap-1 transition ${
                      isMuted
                        ? 'bg-stone-200 text-stone-600 hover:text-stone-900'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold'
                    }`}
                    title={isMuted ? 'Unmute voiceover narration' : 'Mute voiceover narration'}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-stone-500" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-700" />}
                    <span>{isMuted ? 'Muted' : 'Voice On'}</span>
                  </button>

                  {/* Subtitles (CC) Toggle */}
                  <button
                    onClick={() => setShowSubtitles(!showSubtitles)}
                    className={`px-2 py-1 rounded text-xs font-mono font-semibold transition ${
                      showSubtitles
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-stone-200 text-stone-600 hover:text-stone-900'
                    }`}
                    title="Toggle Subtitles"
                  >
                    CC
                  </button>

                  {/* Playback Rate */}
                  <select
                    value={playbackRate}
                    onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                    aria-label="Playback Speed"
                    className="bg-white text-xs text-stone-800 px-2 py-1 rounded border border-stone-200 focus:outline-none cursor-pointer"
                  >
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1.0x</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                  </select>

                  {/* Export / Download Video Package */}
                  <button
                    onClick={handleExportVideo}
                    disabled={isExporting}
                    className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs px-2.5 py-1 rounded font-semibold transition shadow-xs flex items-center gap-1 disabled:opacity-50"
                    title="Export Demo Video & Storyboard Package"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isExporting ? `Exporting (${exportProgress}%)` : 'Export Demo'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Scene Index Drawer below player */}
            <div className="p-4 bg-white overflow-y-auto max-h-[160px] border-t border-stone-200">
              <div className="text-xs font-semibold text-stone-500 mb-2 flex items-center justify-between">
                <span>VIDEO TIMELINE & CHAPTER BREAKDOWN (8 SCENES / 3 MINUTES)</span>
                <span className="text-[10px] text-stone-400">Click any chapter to jump</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {SCENES.map((scene) => {
                  const isCurrent = currentScene.id === scene.id;
                  return (
                    <button
                      key={scene.id}
                      onClick={() => jumpToScene(scene)}
                      className={`text-left p-2 rounded-lg border text-xs transition ${
                        isCurrent
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-2xs'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="font-mono text-emerald-700 font-semibold">
                          {formatTime(scene.startTime)} - {formatTime(scene.endTime)}
                        </span>
                        <span className="text-stone-400">#{scene.id}</span>
                      </div>
                      <div className="font-medium text-stone-900 line-clamp-1">{scene.title}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Full Script & Storyboard Tab */}
        {activeTab === 'script' && (
          <div className="flex-1 flex flex-col min-h-0 bg-stone-50 p-6 overflow-y-auto space-y-6 text-stone-800">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4 flex-wrap gap-3">
              <div>
                <h4 className="text-lg font-serif font-bold text-stone-900">
                  3-Minute SIH 2026 Presentation Script & Pitch Deck
                </h4>
                <p className="text-xs text-stone-500">
                  Full word-for-word voiceover script with timestamp markers and on-screen cues for SIH evaluators.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyScript}
                  className="bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 text-xs px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 shadow-2xs"
                >
                  {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
                  <span>{copiedScript ? 'Copied to Clipboard' : 'Copy Script'}</span>
                </button>
                <button
                  onClick={handleDownloadScript}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 shadow-xs font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Script (.md)</span>
                </button>
              </div>
            </div>

            {/* Storyboard Cards */}
            <div className="space-y-4">
              {SCENES.map((scene) => (
                <div key={scene.id} className="bg-white border border-stone-200 rounded-xl p-4 sm:p-5 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                        {formatTime(scene.startTime)} - {formatTime(scene.endTime)} ({scene.duration}s)
                      </span>
                      <h5 className="font-semibold text-stone-900 text-sm">
                        Chapter {scene.id}: {scene.title}
                      </h5>
                    </div>
                    <span className="text-xs text-stone-600 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                      Module: {scene.category}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 space-y-2">
                      <div className="text-emerald-700 font-semibold flex items-center gap-1">
                        <Mic className="w-3.5 h-3.5" />
                        Spoken Voiceover Script (Exact 180s Pacing)
                      </div>
                      <p className="text-stone-700 leading-relaxed italic">
                        "{scene.voiceover}"
                      </p>
                    </div>

                    <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 space-y-2">
                      <div className="text-amber-800 font-semibold flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5" />
                        On-Screen Demonstration & Visual Cues
                      </div>
                      <div className="text-stone-800 font-mono text-[11px] bg-stone-100 p-2 rounded border border-stone-200">
                        {scene.onScreenText}
                      </div>
                      <ul className="space-y-1 text-stone-600 text-[11px]">
                        {scene.keyPoints.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 mt-0.5">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
