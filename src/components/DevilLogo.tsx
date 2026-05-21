import React from "react";
import { motion } from "motion/react";
import { Sparkles, Shield, Cpu, RefreshCw, Layers } from "lucide-react";

interface DevilLogoProps {
  isDevilMode: boolean;
  onToggleMode?: () => void;
}

export default function DevilLogo({ isDevilMode, onToggleMode }: DevilLogoProps) {
  return (
    <div className="relative flex flex-col items-center justify-center p-6 bg-radial from-slate-900/40 via-[#0B0B0C] to-[#050505] rounded-3xl border border-[#DFBA44]/15 shadow-2xl relative overflow-hidden group select-none transition-all duration-700">
      
      {/* Background radial soft light depending on mode */}
      <div 
        className={`absolute inset-0 opacity-10 blur-[60px] transition-all duration-1000 ${
          isDevilMode 
            ? "bg-gradient-to-r from-red-600 via-red-900 to-black scale-110" 
            : "bg-gradient-to-tr from-[#DFBA44]/30 via-[#C59B27]/10 to-transparent"
        }`} 
      />

      {/* Outer interactive bezel */}
      <div className="absolute top-2 right-2 z-20">
        <button
          onClick={onToggleMode}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-[10px] font-mono tracking-widest uppercase transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer ${
            isDevilMode 
              ? "bg-red-950/40 border-red-500/50 text-red-400 hover:bg-red-900/30" 
              : "bg-[#DFBA44]/15 border-[#DFBA44]/30 text-[#DFBA44] hover:bg-[#DFBA44]/25"
          }`}
          title="عوض کردن فرکانس ماتریکس / تغییر طرح"
        >
          <Cpu className={`w-3 h-3 ${isDevilMode ? "text-red-500" : "text-[#DFBA44] animate-pulse"}`} />
          <span>{isDevilMode ? "ACTIVATE GOLD FREQ" : "ACTIVATE CRIMSON CORE"}</span>
        </button>
      </div>

      {/* Decorative Ouroboros Ring Container */}
      <div className="relative w-56 h-56 flex items-center justify-center">
        
        {/* Ring 1: Extreme Outer Laser Sweep */}
        <motion.div 
          className={`absolute inset-0 rounded-full border border-dashed transition-all duration-1000 ${
            isDevilMode ? "border-red-600/20" : "border-[#DFBA44]/20"
          }`}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        {/* Ring 2: The Main Ouroboros Serpent (Stylized high-tech circle with scales and dragon markers) */}
        <motion.div 
          className="absolute w-[92%] h-[92%] rounded-full flex items-center justify-center"
          animate={{ rotate: isDevilMode ? -360 : 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isDevilMode ? "#E51A1A" : "#DFBA44"} />
                <stop offset="50%" stopColor={isDevilMode ? "#7A0000" : "#C59B27"} />
                <stop offset="100%" stopColor={isDevilMode ? "#E51A1A" : "#FFFFFF"} />
              </linearGradient>
            </defs>
            {/* Ouroboros body path with scale patterns */}
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="url(#ringGrad)" 
              strokeWidth="2.5" 
              strokeDasharray="4, 1, 2, 1, 6, 2" 
              className="transition-all duration-700"
            />
            {/* Dragon Head Marker (represented as top visual notch) */}
            <path 
              d="M 50,2 L 53,6 L 47,6 Z" 
              fill={isDevilMode ? "#EF4444" : "#DFBA44"} 
              className="transition-all duration-700" 
            />
            {/* Tail Marker (bottom gap symbol) */}
            <circle cx="50" cy="98" r="1.5" fill={isDevilMode ? "#B91C1C" : "#DFBA44"} />
          </svg>
        </motion.div>

        {/* Ring 3: Inner geometric grid rings */}
        <div className={`absolute w-[80%] h-[80%] rounded-full border-2 transition-all duration-1000 ${
          isDevilMode 
            ? "border-red-900/30 border-t-red-500/50" 
            : "border-[#DFBA44]/10 border-r-[#DFBA44]/40"
        }`} />

        {/* Central Logo Typography Wordmark (Gothic, Sharp, Powerfully styled) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <motion.div
            key={isDevilMode ? "devil" : "nexus"}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-center"
          >
            {isDevilMode ? (
              // DEVIL Custom Gothic Tribal representation with customized text shadows
              <div className="relative group/text">
                <span 
                  className="font-serif text-3xl md:text-4xl font-black uppercase text-red-600 tracking-tight select-none cursor-pointer filter drop-shadow-[0_4px_12px_rgba(239,68,68,0.5)] transition-all duration-500 hover:text-red-500 block"
                  style={{ fontFamily: '"Press Start 2P", "Courier New", Courier, monospace, serif' }}
                >
                  DEVIL
                </span>
                {/* Behind glowing effect */}
                <span className="absolute inset-0 text-red-950 blur-md opacity-80 select-none pointer-events-none -z-10 font-black text-3xl md:text-4xl uppercase tracking-tight">
                  DEVIL
                </span>
                
                {/* Decorative tail element under font to recreate the custom look */}
                <div className="w-8 h-1.5 bg-red-600 mx-auto rounded-full mt-1 animate-pulse relative">
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-red-600" />
                </div>
              </div>
            ) : (
              // NEXUS 369 core logo representation
              <div className="relative">
                <span className="font-mono text-xs text-[#A29E90] tracking-[0.45em] uppercase block">SYSTEMS</span>
                <span className="font-black text-3xl text-white tracking-widest uppercase block mt-1 hover:text-[#DFBA44] transition-colors">
                  NEXUS
                </span>
                <span className="font-mono text-[9px] text-[#DFBA44] font-bold tracking-[0.2em] block mt-1 bg-[#DFBA44]/10 border border-[#DFBA44]/25 px-1.5 py-0.5 rounded-sm">
                  369 CORE
                </span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Small inner rotating particles */}
        <motion.div 
          className="absolute w-[45%] h-[45%] rounded-full border border-dotted border-white/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Social and verification handle footer bar resembling the bottom of the logo */}
      <div className="mt-4 pt-4 border-t border-white/5 w-full flex flex-col items-center">
        <div className="flex items-center space-x-2 text-[10px] font-mono mb-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isDevilMode ? "bg-red-500 animate-ping" : "bg-green-500 animate-ping"}`} />
          <span className={isDevilMode ? "text-red-400 font-bold" : "text-[#DFBA44]/80"}>
            {isDevilMode ? "SOVEREIGN AGENT PORTAL" : "INTELLIGENT ALIGNED CORE"}
          </span>
        </div>
        
        {/* Social branding element */}
        <div className={`flex items-center space-x-1 border px-2 py-0.5 rounded text-[10px] font-mono tracking-wider transition-colors duration-500 ${
          isDevilMode 
            ? "bg-red-950/20 border-red-500/20 text-red-400" 
            : "bg-[#121214] border-[#DFBA44]/15 text-[#A29E90]"
        }`}>
          <span>@devil_official</span>
        </div>
      </div>

    </div>
  );
}
