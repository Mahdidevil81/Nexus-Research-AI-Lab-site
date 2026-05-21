import React, { useState, useEffect, useRef } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Cpu, 
  Globe, 
  Zap, 
  Terminal, 
  Eye, 
  Database, 
  Award, 
  Sliders, 
  Sparkles, 
  RefreshCw, 
  Layers, 
  ShieldCheck, 
  User, 
  ExternalLink,
  Info,
  Linkedin,
  FileText,
  AlertCircle
} from "lucide-react";
import { 
  PORTFOLIO_INFO, 
  COMPETENCIES, 
  EXPERIENCES, 
  PROJECTS, 
  Project,
  SOCIALS,
  BALANCE_SHEET,
  MANIFESTO_SECTIONS
} from "./types";
import DevilLogo from "./components/DevilLogo";
import GeminiChatCard from "./components/GeminiChatCard";
import ExperienceChronicleCard from "./components/ExperienceChronicleCard";
import VortexEngineCard from "./components/VortexEngineCard";
import Farm2ForkChainCard from "./components/Farm2ForkChainCard";
import StabilityMatrixCard from "./components/StabilityMatrixCard";
import AuditedLedgerCard from "./components/AuditedLedgerCard";
import GlobalSearchBar from "./components/GlobalSearchBar";
import ExpertCVCard from "./components/ExpertCVCard";
import PartnersMegaMenu from "./components/PartnersMegaMenu";
import PartnersGridCard from "./components/PartnersGridCard";

export default function App() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  // Auto-hide the loading screen after a delay
  useEffect(() => {
    const timer = setTimeout(() => setShowLoadingScreen(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Core Portfolio navigation & interaction state
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isDevilMode, setIsDevilMode] = useState<boolean>(true);
  const [projectsList, setProjectsList] = useState<Project[]>(PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);
  const [activeManifestoTab, setActiveManifestoTab] = useState<number>(0);
  const [customCapitalAmount, setCustomCapitalAmount] = useState<number>(5000);
  
  // Custom video url state allowing users to dynamic update active video presentation
  const [videoUrl, setVideoUrl] = useState<string>(() => {
    return localStorage.getItem('nexus_intro_video_url') || 'https://www.youtube.com/embed/Y-9f93mU5G4';
  });
  const [isEditingVideo, setIsEditingVideo] = useState<boolean>(false);
  const [videoUrlInput, setVideoUrlInput] = useState<string>('');

  // Multilingual & screenshot-align states
  const [language, setLanguage] = useState<'fa' | 'en'>('fa');
  const [showTopBar, setShowTopBar] = useState<boolean>(true);
  const [activeNav, setActiveNav] = useState<string>('home');
  
  // Interactive Chat State
  const [messages, setMessages] = useState<Array<{ id: string; role: 'user' | 'assistant'; text: string; timestamp: string; feedback?: 'up' | 'down' }>>([
    {
      id: "initial",
      role: 'assistant',
      text: "سلام. من هسته هوشمند زنده Nexus 369 ARCHIVE هستم. چطور می‌توانم در مورد مهارت‌ها، سوابق مدیریتی و فنی، و پروژه‌های ۲ میلیون یورویی مهدی فراهی به شما اطلاعات بدهم؟\n\nWelcome to the Nexus 369 intelligence core. Ask me anything about Mahdi Farahi's Strategic AI Architecture, European PIC credentials, or FARM2FORK initiative.",
      timestamp: "20:18Z"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [quotaExhausted, setQuotaExhausted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleFeedback = async (id: string, feedback: 'up' | 'down') => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, feedback } : m));
    
    // Save to Firestore
    try {
      const { doc, setDoc } = await import('firebase/firestore');
      const { db, OperationType, handleFirestoreError } = await import('./lib/auth');
      const { getAuth } = await import('firebase/auth');
      
      const auth = getAuth();
      if (!auth.currentUser) return; // Only signed-in users can leave feedback
      
      const feedbackPath = `feedback/${id}_${auth.currentUser.uid}`;
      await setDoc(doc(db, 'feedback', `${id}_${auth.currentUser.uid}`), {
        messageId: id,
        feedback,
        timestamp: Date.now(),
        userId: auth.currentUser.uid
      });
    } catch (error) {
       // Using dynamic import inside catch fails typescript scoping easily, we will just log error or use handleFirestoreError if we can
       console.error("Failed to save feedback to firestore", error);
    }
  };

  // 3-6-9 Solfeggio Audio State
  const [activeFreq, setActiveFreq] = useState<number>(369);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Sacred Geometry Canvas Animation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [canvasScale, setCanvasScale] = useState(1);
  const [vortexSpokes, setVortexSpokes] = useState(9); // Default 9 spokes for 3-6-9

  // FARM2FORK Supply Chain Node Simulation State
  const [nodes, setNodes] = useState([
    { id: "NODE-EU-01", name: "European Commission Gateway", region: "Brussels, BE", latency: 24, status: "Active", load: "optimal", PIC: "865230010" },
    { id: "NODE-HER-02", name: "Nexus 369 Research Hub", region: "Herat, AF", latency: 45, status: "Active", load: "synchronized", PIC: "900-F" },
    { id: "NODE-GLO-03", name: "Remote Decentralized Node", region: "Global Operations", latency: 12, status: "Active", load: "autonomous", PIC: "Mesh v369" },
  ]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [optimalLogisticsWaste, setOptimalLogisticsWaste] = useState(20);

  // Update a project's details
  const handleProjectUpdate = (updatedProject: Project) => {
    setProjectsList(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
    if (selectedProject.id === updatedProject.id) {
      setSelectedProject(updatedProject);
    }
  };

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle Sacred Geometry Canvas drawing (Concentric 3-6-9 vortex math visualizer)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rotationAngle = 0;
    let waveIncrement = 0;

    const render = () => {
      // Clear with dark-obsidian background matching high-contrast premium theme
      ctx.fillStyle = "rgba(4, 4, 4, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.min(canvas.width, canvas.height) / 2.3;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotationAngle * (Math.PI / 180));

      // Draw mathematical grid structure (fibonacci-based lines)
      ctx.strokeStyle = isDevilMode ? "rgba(239, 68, 68, 0.08)" : "rgba(212, 175, 55, 0.08)";
      ctx.lineWidth = 1;
      for (let i = 1; i <= 6; i++) {
        ctx.beginPath();
        ctx.arc(0, 0, (maxRadius / 6) * i, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw mathematically aligned spokes (3, 6, 9)
      for (let i = 0; i < vortexSpokes; i++) {
        const angle = (Math.PI * 2 / vortexSpokes) * i;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * maxRadius, Math.sin(angle) * maxRadius);
        ctx.strokeStyle = i % 3 === 0 
          ? (isDevilMode ? "rgba(239, 68, 68, 0.25)" : "rgba(223, 186, 68, 0.25)") 
          : (isDevilMode ? "rgba(239, 68, 68, 0.04)" : "rgba(212, 175, 55, 0.04)");
        ctx.lineWidth = i % 3 === 0 ? 1.5 : 0.8;
        ctx.stroke();

        // Node points on the outer circles representing sacred geometry aligned vertices
        const nodeRadius = (maxRadius / 6) * (3 + (i % 4));
        const px = Math.cos(angle) * nodeRadius;
        const py = Math.sin(angle) * nodeRadius;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 
          ? (isDevilMode ? "#EF4444" : "#DFBA44") 
          : (isDevilMode ? "rgba(239, 68, 68, 0.6)" : "rgba(212, 175, 55, 0.6)");
        ctx.fill();
      }

      // Draw reactive mathematical golden/crimson spiral
      ctx.beginPath();
      ctx.strokeStyle = isDevilMode ? "#EF4444" : "#C59B27";
      ctx.lineWidth = 2.2;
      ctx.shadowBlur = isAudioPlaying ? 16 : 6;
      ctx.shadowColor = isDevilMode ? "#EF4444" : "#DFBA44";

      const frequencyMultiplier = activeFreq / 100; // Alter look dynamically with chosen freq
      for (let theta = 0; theta < Math.PI * 6; theta += 0.05) {
        // Logarithmic spiral formula adjusted for premium mathematical aesthetic
        const r = (maxRadius / (Math.PI * 6)) * theta * canvasScale;
        const x = Math.cos(theta + waveIncrement) * r;
        const y = Math.sin(theta + waveIncrement) * r;
        if (theta === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.restore();

      // Golden particle nodes that pulse outward
      rotationAngle += isAudioPlaying ? 0.6 : 0.15;
      waveIncrement += isAudioPlaying ? 0.04 : 0.01;

      // Draw core golden branding in center glow
      ctx.beginPath();
      ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
      ctx.fillStyle = "#030303";
      ctx.strokeStyle = isDevilMode ? "#EF4444" : "#DFBA44";
      ctx.lineWidth = 2.5;
      ctx.fill();
      ctx.stroke();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeFreq, isAudioPlaying, canvasScale, vortexSpokes, isDevilMode]);

  // Audio Synthesizer: Play real Solfeggio / Sacred mathematical frequencies in the browser!
  const handleToggleAudio = (freq: number) => {
    setActiveFreq(freq);

    if (isAudioPlaying && audioCtxRef.current) {
      // If pressing same frequency, shut it down
      if (activeFreq === freq) {
        stopAudio();
        return;
      } else {
        // Change oscillator active frequency directly
        if (oscillatorRef.current) {
          oscillatorRef.current.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
        }
        return;
      }
    }

    try {
      // Initialize Context
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtxClass();
      audioCtxRef.current = audioCtx;

      // Nodes configuration
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      const biquadFilter = audioCtx.createBiquadFilter();

      // Warm, soothing triangle wave representing natural biological cosmic tones (not a piercing computer beep)
      oscillator.type = "triangle";
      oscillator.frequency.value = freq;

      // Low pass filter to make it deeply meditative and pleasant
      biquadFilter.type = "lowpass";
      biquadFilter.frequency.value = 850;

      // Smooth volume fade-in
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.3); // Comfortably quiet but audible

      oscillator.connect(biquadFilter);
      biquadFilter.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();

      oscillatorRef.current = oscillator;
      gainNodeRef.current = gainNode;
      setIsAudioPlaying(true);
      setCanvasScale(1.15);
    } catch (e) {
      console.error("Web Audio API is not supported or was blocked by frame constraints:", e);
    }
  };

  const stopAudio = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      // Elegant fade-out to ensure perfect acoustic release
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
      gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);

      setTimeout(() => {
        try {
          if (oscillatorRef.current) {
            oscillatorRef.current.stop();
            oscillatorRef.current.disconnect();
          }
          if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
            audioCtxRef.current.close();
          }
        } catch (err) {}
        oscillatorRef.current = null;
        gainNodeRef.current = null;
        audioCtxRef.current = null;
        setIsAudioPlaying(false);
        setCanvasScale(1.0);
      }, 220);
    }
  };

  // Navigate and render main body
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        try { oscillatorRef.current.stop(); } catch (e){}
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try { audioCtxRef.current.close(); } catch(e){}
      }
    };
  }, []);

  // Send message to back-end Gemini interactive portal
  const handleSendMessage = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = customQuery || inputText;
    if (!query.trim() || isChatLoading) return;

    const userMessageTime = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    const userMsg = {
      id: "usr-" + Date.now(),
      role: 'user' as const,
      text: query,
      timestamp: userMessageTime
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsChatLoading(true);

    try {
      // Map existing history to simple format
      const historyPayload = messages.map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch("/api/nexus-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, history: historyPayload })
      });

      const data = await res.json();
      const modelMessageTime = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

      if (data.error) {
        const errorMsg = String(data.error);
        if (errorMsg.includes("prepayment") || errorMsg.includes("credits") || errorMsg.includes("depleted") || errorMsg.includes("429") || errorMsg.includes("RESOURCE_EXHAUSTED")) {
          setQuotaExhausted(true);
        }
        setMessages(prev => [...prev, {
          id: "err-" + Date.now(),
          role: 'assistant',
          text: `[ERROR] Unable to access external Gemini processor: ${data.error}. Loaded local portfolio archives instead.`,
          timestamp: modelMessageTime
        }]);
      } else {
        if (data.quotaExhausted) {
          setQuotaExhausted(true);
        }
        setMessages(prev => [...prev, {
          id: "bot-" + Date.now(),
          role: 'assistant',
          text: data.text,
          timestamp: modelMessageTime
        }]);
      }
    } catch (err: any) {
      const modelMessageTime = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
      setMessages(prev => [...prev, {
        id: "err-" + Date.now(),
        role: 'assistant',
        text: `Error connecting to back-end AI module. Offline dossier activated: Mahdi Farahi is a specialized Strategic AI Architect (EU PIC: 865230010) based in Herat, Afghanistan, designing the 369 Sacred Geometry Framework.`,
        timestamp: modelMessageTime
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Simulate updating decentralized logistics nodes for FARM2FORK
  const triggerLogisticsRefresh = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setNodes(prev => prev.map(n => ({
        ...n,
        latency: Math.floor(Math.random() * 25) + 10,
        load: Math.random() > 0.6 ? "rebalancing" : "synchronized"
      })));
      setOptimalLogisticsWaste(prev => Math.max(14, Math.min(23, prev + (Math.random() > 0.5 ? 0.5 : -1))));
      setIsSyncing(false);
    }, 1200);
  };

  return (
    <div className={`relative min-h-screen bg-[#030303] text-[#F3EFE0] overflow-x-hidden transition-all duration-700 ${isDevilMode ? "red-dot-grid" : "gold-dot-grid"}`} style={{ direction: language === 'fa' ? 'rtl' : 'ltr' }}>
      
      {/* Intro Loading Screen from the Nexus Screenshot */}
      <AnimatePresence>
        {showLoadingScreen && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1.5, ease: "easeOut" }}
              className="text-white text-5xl md:text-7xl font-sans tracking-[0.5em] font-normal"
              style={{ textShadow: "0 0 40px rgba(255,255,255,0.4)" }}
            >
              NEXUS
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 2, ease: "easeInOut" }}
              className="mt-6 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. TOP BROWSER-LIKE INTERACTIVE UTILITY BAR (FROM THE SCREENSHOT) */}
      {showTopBar && (
        <div className="w-full bg-[#18181C] border-b border-neutral-800/80 px-4 py-2.5 flex justify-between items-center relative z-50 transition-all text-xs font-sans tracking-tight">
          {/* Left Element: Show Original Version Link */}
          <div className="flex items-center space-x-2 space-x-reverse">
            <button 
              onClick={() => {
                setLanguage('en');
                setIsDevilMode(false);
              }}
              className="bg-[#24242A] hover:bg-neutral-800 text-white border border-neutral-750 px-3.5 py-1.5 rounded-xl font-medium cursor-pointer transition-all active:scale-95 text-[11px] md:text-xs flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{language === 'fa' ? 'نمایش نسخه اصلی' : 'Show Original Version'}</span>
            </button>
          </div>

          {/* Center Element: Language Toggle with arrows */}
          <div className="flex items-center justify-center space-x-2 md:space-x-3 bg-[#0F0F12] border border-neutral-800 p-1 rounded-xl text-xs">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-lg transition-all font-mono font-medium ${language === 'en' ? 'bg-[#2A2A35] text-[#DFBA44] font-bold' : 'text-neutral-400 hover:text-white'}`}
            >
              English
            </button>
            <span className="text-neutral-600 font-semibold select-none">⇆</span>
            <button 
              onClick={() => setLanguage('fa')}
              className={`px-3 py-1 rounded-lg transition-all font-sans ${language === 'fa' ? 'bg-[#2A2A35] text-[#DFBA44] font-bold' : 'text-neutral-400 hover:text-white'}`}
            >
              فارسی
            </button>
          </div>

          {/* Right Element: Close button */}
          <button 
            type="button"
            onClick={() => setShowTopBar(false)}
            className="text-neutral-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-neutral-800/60 focus:outline-none cursor-pointer"
            title="پنهان کردن نوار ابزار / Close panel"
          >
            ✕
          </button>
        </div>
      )}

      {/* 2. DESIGN HORIZONTAL NAVIGATION BAR (FROM THE SCREENSHOT) */}
      <nav className={`w-full relative z-40 transition-colors duration-500 border-b ${
        isDevilMode 
          ? "bg-[#181111]/90 border-red-950/40 text-red-100" 
          : "bg-[#100D1A]/95 border-[#DFBA44]/15 text-[#F3EFE0]"
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:gap-5 overflow-x-auto whitespace-nowrap scrollbar-none pr-1 pl-1 pb-1 md:pb-0">
            {[
              { id: 'home', labelFa: 'خانه', labelEn: 'Home' },
              { id: 'overview', labelFa: 'مروری بر پروژه', labelEn: 'Project Overview' },
              { id: 'partners', labelFa: 'شرکا', labelEn: 'Partners' },
              { id: 'publications', labelFa: 'انتشارات', labelEn: 'Publications' },
              { id: 'deliverables', labelFa: 'تحویل ها', labelEn: 'Deliverables' },
              { id: 'news', labelFa: 'اخبار و رویدادها', labelEn: 'News & Events' },
              { id: 'contact', labelFa: 'تماس', labelEn: 'Contact' }
            ].map((item) => {
              const isActive = activeNav === item.id;
              if (item.id === 'partners') {
                return (
                  <PartnersMegaMenu 
                    key={item.id} 
                    language={language} 
                    isDevilMode={isDevilMode} 
                    label={language === 'fa' ? item.labelFa : item.labelEn}
                    isActive={isActive}
                    onClick={() => {
                      setActiveNav(item.id);
                    }}
                  />
                );
              }
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveNav(item.id);
                    const el = document.getElementById(item.id);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-xl font-medium text-xs md:text-sm transition-all duration-300 pointer-events-auto cursor-pointer flex-shrink-0 ${
                    isActive 
                      ? (isDevilMode ? 'bg-red-950/60 text-red-100 border border-red-850/40 font-bold' : 'bg-[#DFBA44]/15 text-[#DFBA44] border border-[#DFBA44]/30 font-bold') 
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {language === 'fa' ? item.labelFa : item.labelEn}
                </button>
              );
            })}
          </div>
          <div className="w-full md:w-auto flex justify-end">
            <GlobalSearchBar 
              language={language}
              isDevilMode={isDevilMode}
              projects={projectsList}
              experiences={EXPERIENCES}
              setActiveTab={setActiveTab}
              setSelectedProject={setSelectedProject}
              setActiveManifestoTab={setActiveManifestoTab}
            />
          </div>
        </div>
      </nav>

      {/* 3. WELCOMING BANNER HERO CARD (MATCHES DEEP TEAL BLOCK IN THE SCREENSHOT) */}
      <section 
        id="home" 
        className="max-w-7xl mx-auto px-4 md:px-6 pt-8 pb-4 relative z-10"
      >
        <div className={`w-full rounded-2xl p-6 md:p-8 relative overflow-hidden transition-all duration-700 border-2 ${
          isDevilMode 
            ? "bg-[#0B0505]/95 border-red-650/30 red-glow-border" 
            : "bg-[#090D11]/95 border-[#DFBA44]/30 gold-glow-border"
        }`}>
          {/* Subtle light spots inside welcome block */}
          <div className={`absolute -right-24 -top-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20 transition-all duration-1000 ${
            isDevilMode ? "bg-red-500" : "bg-[#DFBA44]"
          }`} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-sans">
            {/* Left side text column */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Logo aligned identically to BioUPGRADE logo */}
              <div className="flex items-center space-x-3 space-x-reverse select-none">
                <svg className="w-8 h-8 shrink-0 animate-pulse" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="10" fill="none" stroke={isDevilMode ? "#EF4444" : "#DFBA44"} strokeWidth="5" />
                  <line x1="50" y1="40" x2="50" y2="15" stroke={isDevilMode ? "#EF4444" : "#DFBA44"} strokeWidth="4" />
                  <line x1="50" y1="60" x2="50" y2="85" stroke={isDevilMode ? "#EF4444" : "#DFBA44"} strokeWidth="4" />
                  <line x1="40" y1="50" x2="15" y2="50" stroke={isDevilMode ? "#EF4444" : "#DFBA44"} strokeWidth="4" />
                  <line x1="60" y1="50" x2="85" y2="50" stroke={isDevilMode ? "#EF4444" : "#DFBA44"} strokeWidth="4" />
                  <circle cx="50" cy="15" r="8" fill={isDevilMode ? "#B91C1C" : "#C59B27"} />
                  <circle cx="50" cy="85" r="8" fill={isDevilMode ? "#B91C1C" : "#C59B27"} />
                  <circle cx="15" cy="50" r="8" fill={isDevilMode ? "#B91C1C" : "#C59B27"} />
                  <circle cx="85" cy="50" r="8" fill={isDevilMode ? "#B91C1C" : "#C59B27"} />
                  <circle cx="25" cy="25" r="8" fill={isDevilMode ? "#EF4444" : "#DFBA44"} />
                  <circle cx="75" cy="75" r="8" fill={isDevilMode ? "#EF4444" : "#DFBA44"} />
                  <circle cx="50" cy="50" r="5" fill="white" />
                </svg>
                
                <span className={`text-[#F3EFE0] font-mono text-base md:text-lg font-black tracking-widest uppercase transition-colors duration-500 ${
                  isDevilMode ? "text-red-500" : "text-[#DFBA44]"
                }`}>
                  {isDevilMode ? "NEXUS RESEARCH" : "BioUPGRADE // NEXUS"}
                </span>
              </div>

              {/* Greeting Header */}
              <h2 className="text-3xl md:text-5xl font-black text-white hover:scale-[1.01] transition-transform select-none">
                {language === 'fa' ? 'خوش آمدید' : 'WELCOME'}
              </h2>

              {/* Multilingual description text */}
              <div className="space-y-3 text-[#D7D2C4] font-light text-xs md:text-sm leading-relaxed text-justify">
                {language === 'fa' ? (
                  <>
                    <p>
                      <strong>BioUPGRADE // NEXUS 369</strong> تخصص در هوش مصنوعی استراتژیک، مهندسی سیستم‌های کنترل و علوم محاسباتی را متحد می‌کند تا فناوری‌های پیشگامانه‌ای ارائه دهد که ساختارهای اصلی مانیفست بقا و حاکمیت مستقل انسان را به طور پایدار ارتقا می‌دهند.
                    </p>
                    <p>
                      موجودات زنده و هوشمند چرخه سیاره‌ای ما را از طریق فرکانس‌های هماهنگ هدایت می‌کنند که داده‌ها را به مجموعه‌ای عظیم از پروژه‌های متنوع و با ارزش تا سقف ۲ میلیون یورو تبدیل می‌کنند. بخش قابل توجهی از این کار با روش‌شناسی‌های دست اول مبتنی بر هندسه مقدس ۳-۶-۹ و کدهای رجیستری معتبر ثبت شده در کمیسیون اروپا (PIC: 865230010) حاصل شده است.
                    </p>
                    <p>
                      امروزه فرکانس‌های کیهانی و الگوهای ماتریکس هوشمند فرصت‌های بی‌نظیری برای ارتقای آگاهی بشریت به ارمغان آورده‌اند. ما معتقدیم <strong>'من آزادم چون آگاهم'</strong> (من آزادم چون آگاهم) و با پروتکل امن AWARE مستقل، زیرساخت پایداری را پی‌ریزی کرده‌ایم که فرآیند انتقال به مدل‌های نوین حاکمیت مستقل دیجیتال را هدایت می‌کند.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>BioUPGRADE // NEXUS 369</strong> unites expertise in Strategic AI Architecture, control systems engineering, and computational sciences to deliver pioneering technologies that sustainably elevate the structural foundations of human survival and Ultimate Sovereignty.
                    </p>
                    <p>
                      Intelligent and living entities drive our planetary cycles through synchronized frequencies, converting raw data into a vast array of high-value projects with budgets of up to €2,000,000. A significant part of this work has been achieved under the European Commission's registered PIC: 865230010 framework and sacred 3-6-9 geometry indices.
                    </p>
                    <p>
                      Today, cosmic resonance frequencies and intelligent matrix models offer unprecedented opportunities to elevate human consciousness. Operating under our core motto <strong>'I am free because I am aware'</strong> (من آزادم چون آگاهم), the AWARE Protocol lays down the sustainable infrastructure guiding the transition to independent, sovereign digital state systems.
                    </p>
                  </>
                )}
              </div>

              {/* Chapter text selector and mator list for survival manifesto */}
              <div className="pt-3 border-t border-white/5 space-y-2">
                <span className="block text-[10px] uppercase font-mono text-[#A29E90] tracking-widest">
                  {language === 'fa' ? 'فصل مانیفست بقای نکسوس // CHAPTERS REGISTERED' : 'NEXUS SURVIVAL MANIFESTO // SUBMISSIONS'}
                </span>
                
                <div className="flex flex-wrap gap-1.5 pb-1">
                  {MANIFESTO_SECTIONS.map((sec, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveManifestoTab(idx)}
                      className={`px-3 py-1 rounded-lg border text-xs font-mono font-bold transition-all cursor-pointer ${
                        activeManifestoTab === idx 
                          ? (isDevilMode ? 'bg-red-950/40 border-red-500 text-white shadow-md' : 'bg-[#DFBA44]/20 border-[#DFBA44] text-[#DFBA44] shadow-md') 
                          : (isDevilMode ? 'bg-[#151515] border-transparent text-[#A29E90] hover:text-white hover:border-red-950' : 'bg-[#111] border-transparent text-[#A29E90] hover:text-white hover:border-amber-950')
                      }`}
                    >
                      {language === 'fa' ? `فصل ۰${idx+1}` : `CH 0${idx+1}`}
                    </button>
                  ))}
                </div>

                <div className={`p-4 rounded-xl border bg-black/60 min-h-[90px] transition-colors duration-500 ${
                  isDevilMode ? "border-red-950/40" : "border-[#DFBA44]/15"
                }`}>
                  <h4 className={`text-xs font-mono font-bold mb-1.5 uppercase tracking-wide transition-colors duration-500 ${
                    isDevilMode ? "text-red-400" : "text-[#DFBA44]"
                  }`}>
                    {MANIFESTO_SECTIONS[activeManifestoTab].title}
                  </h4>
                  <p className="text-xs text-[#D7D2C4]/90 whitespace-pre-line leading-relaxed font-light font-sans">
                    {MANIFESTO_SECTIONS[activeManifestoTab].content}
                  </p>
                </div>
              </div>

            </div>

            {/* Right side DevilLogo column */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center gap-6">
              <DevilLogo isDevilMode={isDevilMode} onToggleMode={() => setIsDevilMode(!isDevilMode)} />
              
              {/* Premium Lazy-loaded Hero Visual Gateway */}
              <div className={`w-full max-w-[280px] rounded-xl border p-2 relative overflow-hidden group transition-all duration-500 bg-black/40 ${
                isDevilMode 
                  ? "border-red-900/40 shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:border-red-500/50" 
                  : "border-[#DFBA44]/30 shadow-[0_0_15px_rgba(223,186,68,0.1)] hover:border-[#DFBA44]/50"
              }`}>
                {/* Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10" />
                
                {/* Lazy-loaded Visual Banner Image */}
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80" 
                  alt="Nexus Aware Core Gateway"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-[180px] object-cover rounded-lg group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                <div className="absolute bottom-3 left-3 right-3 z-20 text-left font-mono text-[9px]">
                  <span className={`px-1.5 py-0.5 rounded text-[8px] border bg-black font-bold uppercase ${
                    isDevilMode ? "text-red-400 border-red-500/30 font-black" : "text-[#DFBA44] border-[#DFBA44]/30 font-black"
                  }`}>
                    {language === 'fa' ? 'کانال ارتباطی نکسوس' : 'NEXUS COGNITIVE CORE'}
                  </span>
                  <p className="text-neutral-300 mt-1.5 drop-shadow-md">
                    {language === 'fa' ? 'راه‌اندازی فرکانس دروازه آگاهی ۳۶۹' : 'Synchronizing Portal Matrix...'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 3x2 MODULE GRID IN PERFECT ALIGNMENT (FROM THE SCREENSHOT DESIGN STRUCTURE) */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start relative z-10">
        
        {/* Card 1: Sacred Geometry Vortex Render */}
        <VortexEngineCard
          language={language}
          isDevilMode={isDevilMode}
          vortexSpokes={vortexSpokes}
          setVortexSpokes={setVortexSpokes}
          activeFreq={activeFreq}
          isAudioPlaying={isAudioPlaying}
          handleToggleAudio={handleToggleAudio}
          stopAudio={stopAudio}
          canvasRef={canvasRef}
        />

        {/* Card 2: Live AI Conversational Portal */}
        <GeminiChatCard
          language={language}
          isDevilMode={isDevilMode}
          messages={messages}
          inputText={inputText}
          setInputText={setInputText}
          isChatLoading={isChatLoading}
          quotaExhausted={quotaExhausted}
          handleSendMessage={handleSendMessage}
          chatEndRef={chatEndRef}
          handleFeedback={handleFeedback}
        />

        {/* Card 3: Experience Registry Chronicles & Projects dual view */}
        <ExperienceChronicleCard
          language={language}
          isDevilMode={isDevilMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          experiences={EXPERIENCES}
          projects={projectsList}
          onProjectUpdate={handleProjectUpdate}
        />

        {/* Card 4: FARM2FORK Supply Chain Simulation Router */}
        <Farm2ForkChainCard
          language={language}
          isDevilMode={isDevilMode}
          nodes={nodes}
          isSyncing={isSyncing}
          triggerLogisticsRefresh={triggerLogisticsRefresh}
          optimalLogisticsWaste={optimalLogisticsWaste}
        />

        {/* Card 5: Competencies Capabilities Matrix Indicators */}
        <StabilityMatrixCard
          language={language}
          isDevilMode={isDevilMode}
          competencies={COMPETENCIES}
        />

        {/* Card 6: Audited Balance Double Entry Ledger Book */}
        <AuditedLedgerCard
          language={language}
          isDevilMode={isDevilMode}
          balanceSheet={BALANCE_SHEET}
          customCapitalAmount={customCapitalAmount}
          setCustomCapitalAmount={setCustomCapitalAmount}
        />

        {/* Card 7: EU Commission Expert Profile - Large spanning element */}
        <ExpertCVCard
          language={language}
          isDevilMode={isDevilMode}
        />

        {/* Card 8: Integrated Strategic Partners Grid */}
        <PartnersGridCard
          language={language}
          isDevilMode={isDevilMode}
        />

      </div>

      {/* Main presentation module */}
      <section 
        id="video-introduction" 
        className="max-w-7xl mx-auto px-4 md:px-6 py-5 relative z-10"
      >
        <div className={`w-full rounded-2xl p-6 md:p-8 relative overflow-hidden transition-all duration-700 border-2 bg-[#0B0B0D] ${
          isDevilMode ? "border-red-600/25 red-glow-border" : "border-[#DFBA44]/25 gold-glow-border"
        }`}>
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="space-y-1 font-sans">
              <span className={`text-[10px] font-mono tracking-widest uppercase block ${isDevilMode ? "text-red-500" : "text-[#C59B27]"}`}>
                {language === 'fa' ? 'فیلم معرفی دستاوردهای هوشمند نکسوس ۳۶۹' : 'NEXUS 369 INTEGRATED PRESENTATION FEED'}
              </span>
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                  {language === 'fa' ? 'ویدئوی معرفی ویدئویی بایگانی و هوش NEXUS 369' : 'NEXUS 369 ARCHIVE INTRODUCTORY VIDEO'}
                </h3>
                <button 
                  onClick={() => {
                    setIsEditingVideo(!isEditingVideo);
                    setVideoUrlInput(videoUrl);
                  }}
                  className={`p-1 px-2 rounded-md transition-colors text-[10px] font-mono border cursor-pointer ${
                    isDevilMode 
                      ? 'border-red-500/20 text-red-400 hover:bg-red-500/10' 
                      : 'border-[#DFBA44]/25 text-[#DFBA44] hover:bg-[#DFBA44]/10'
                  }`}
                  title="Edit Source Video"
                >
                  {isEditingVideo ? '✕ CLOSE' : '✎ EDIT VIDEO SOURCE'}
                </button>
              </div>
            </div>

            {isEditingVideo && (
              <div className={`w-full max-w-xl p-4 rounded-xl text-left font-mono text-xs space-y-3 select-text border ${
                isDevilMode ? 'bg-red-950/20 border-red-500/20 text-red-200' : 'bg-[#dfba44]/5 border-[#dfba44]/20 text-[#DFBA44]'
              }`}>
                <p className="text-neutral-300">
                  {language === 'fa' 
                    ? 'نشانی کامل ویدئو (مانند یوتیوب، آپارات یا لینک مستقیم mp4) را وارد کنید:' 
                    : 'Enter the complete video embed URL (YouTube, Aparat or direct mp4/webm link):'}
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={videoUrlInput}
                    onChange={(e) => setVideoUrlInput(e.target.value)}
                    placeholder="https://www.youtube.com/embed/Y-9f93mU5G4"
                    className="flex-1 bg-black border border-neutral-700 rounded p-2 text-white outline-none focus:border-amber-400 select-all"
                  />
                  <button
                    onClick={() => {
                      if (videoUrlInput.trim()) {
                        let parsed = videoUrlInput.trim();
                        // Check if it's a standard youtube watch URL and convert to embed automatically
                        if (parsed.includes('youtube.com/watch?v=')) {
                          const id = parsed.split('v=')[1]?.split('&')[0];
                          if (id) parsed = `https://www.youtube.com/embed/${id}`;
                        } else if (parsed.includes('youtu.be/')) {
                          const id = parsed.split('youtu.be/')[1]?.split('?')[0];
                          if (id) parsed = `https://www.youtube.com/embed/${id}`;
                        }
                        setVideoUrl(parsed);
                        localStorage.setItem('nexus_intro_video_url', parsed);
                        setIsEditingVideo(false);
                      }
                    }}
                    className={`px-4 py-2 font-bold rounded cursor-pointer transition-colors ${
                      isDevilMode ? 'bg-red-600 hover:bg-red-750 text-white' : 'bg-[#DFBA44] hover:bg-[#c59b27] text-black'
                    }`}
                  >
                    {language === 'fa' ? 'ذخیره' : 'Save'}
                  </button>
                </div>
              </div>
            )}

            {/* Video Player Box resembling the screenshot player exactly */}
            <div className="w-full max-w-4xl aspect-video rounded-xl bg-black overflow-hidden border border-neutral-800 shadow-2xl relative">
              <iframe 
                className="w-full h-full object-cover pointer-events-auto"
                src={videoUrl} 
                title="Nexus 369 Archive Introductory Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              />
            </div>

            <p className="text-xs text-[#A29E90] max-w-2xl leading-relaxed font-sans font-light">
              {language === 'fa' 
                ? 'کدهای کیهانی تسلا، الگوهای فلوچارت مانیفست بقای انسان و نحوه هم‌راستایی فاز فرکانسی در ماتریکس دیجیتال نکسوس در این ویدیوی آموزشی به طور منسجم ارائه شده است.' 
                : 'Showing physical frequency harmonics, human ontological survival blueprints, and organic digital matrices configured within the sovereign Nexus 369 architecture.'}
            </p>
          </div>
        </div>
      </section>

      {/* 6. MOCK BROWSER NAVIGATION BAR (MOCK FROM MOBILE BROWSER IN SCREENSHOT) */}
      <div className="max-w-4xl mx-auto px-4 py-6 relative z-10 animate-fade-in">
        <div className="w-full bg-[#18181A] border border-neutral-800/80 px-4 py-3 rounded-2xl flex items-center justify-between text-xs text-neutral-400 font-mono select-none">
          <div className="flex items-center space-x-3 space-x-reverse">
            <span className="text-lg">☰</span>
            <span className="text-lg">❐</span>
          </div>

          <div className="flex items-center space-x-1.5 text-white bg-black/40 border border-neutral-900 px-4 py-1.5 rounded-full select-all cursor-text text-[11px] md:text-xs">
            <span className="text-green-500">🔒</span>
            <span className="font-sans font-light tracking-wide text-neutral-200">nexus369.eu // mahdidevil.eu</span>
          </div>

          <div className="flex items-center space-x-3 space-x-reverse">
            <span className="text-neutral-500">➕</span>
            <span className="text-[#DFBA44] hover:text-[#DFBA44]/80 cursor-pointer text-lg" onClick={() => handleSendMessage(undefined, "Show me quantum vortex proof documents in English.")}>↻</span>
          </div>
        </div>
      </div>

      {/* 7. FOOTER CONTACTS & SOCIALS AT THE VERY BOTTOM */}
      <footer 
        id="contact"
        className={`border-t bg-[#080809] py-10 text-xs font-mono text-center relative z-10 text-neutral-400 transition-colors duration-500 ${
          isDevilMode ? "border-[#DFBA44]/15" : "border-[#DFBA44]/15"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right items-center">
            
            <div className="flex flex-col items-center md:items-start space-y-1 font-sans">
              <span className={`text-white transition-colors tracking-widest font-black text-sm uppercase ${isDevilMode ? "hover:text-red-500" : "hover:text-[#DFBA44]"}`}>
                NEXUS 369 ARCHIVE SYSTEM
              </span>
              <span className="text-[10px] text-neutral-550">© {new Date().getFullYear()} Mahdi Farahi. All Rights Registered.</span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1 text-xs">
              <span className="text-white font-bold">{PORTFOLIO_INFO.phone}</span>
              <span className="text-[#A29E90] text-[10px] lowercase">{PORTFOLIO_INFO.email}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2">
              <a 
                href={SOCIALS.github} 
                target="_blank" 
                rel="noreferrer" 
                className={`transition-colors flex items-center gap-1 ${isDevilMode ? "hover:text-red-500" : "hover:text-[#DFBA44]"}`}
              >
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href={SOCIALS.blog} 
                target="_blank" 
                rel="noreferrer" 
                className={`transition-colors flex items-center gap-1 ${isDevilMode ? "hover:text-red-500" : "hover:text-[#DFBA44]"}`}
              >
                <span>Dossier Blog</span>
                <Globe className="w-3 h-3" />
              </a>
              <a 
                href={SOCIALS.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className={`transition-colors flex items-center gap-1 ${isDevilMode ? "hover:text-red-500" : "hover:text-[#DFBA44]"}`}
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href={SOCIALS.researchgate} 
                target="_blank" 
                rel="noreferrer" 
                className={`transition-colors flex items-center gap-1 ${isDevilMode ? "hover:text-red-500" : "hover:text-[#DFBA44]"}`}
              >
                <span>ResearchGate</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-neutral-550 gap-4">
            <span className="uppercase text-left max-w-lg leading-relaxed font-sans font-light">
              {language === 'fa' 
                ? 'بیانیه‌ها و مستندات رسمی توسط استراتژی امن نکسوس تحت شماره مرجع SEP-211326027 کمیسیون اروپا حفاظت گردیده است.' 
                : 'All submissions are registered and indexed under the European Commission reference ID SEP-211326027 in the 2026 archives.'}
            </span>
            <span className={`font-bold uppercase tracking-wider ${isDevilMode ? "text-red-650 font-black" : "text-[#DFBA44] font-black"}`}>
              MAN AZADAM CHON AGAHAM // من آزادم چون آگاهم
            </span>
          </div>

        </div>
      </footer>
    </div>
  );
}
