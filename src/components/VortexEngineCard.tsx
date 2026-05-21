import React from "react";
import { Volume2, VolumeX } from "lucide-react";

interface VortexEngineCardProps {
  language: 'fa' | 'en';
  isDevilMode: boolean;
  vortexSpokes: number;
  setVortexSpokes: (val: number) => void;
  activeFreq: number;
  isAudioPlaying: boolean;
  handleToggleAudio: (freq: number) => void;
  stopAudio: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function VortexEngineCard({
  language,
  isDevilMode,
  vortexSpokes,
  setVortexSpokes,
  activeFreq,
  isAudioPlaying,
  handleToggleAudio,
  stopAudio,
  canvasRef
}: VortexEngineCardProps) {
  return (
    <section 
      id="overview" 
      className={`group flex flex-col justify-between bg-[#0B0B0C] border-2 p-5 md:p-6 rounded-2xl h-[610px] relative overflow-hidden backdrop-blur-xl transition-all duration-500 ${
        isDevilMode ? "border-red-600/25 red-glow-border" : "border-[#DFBA44]/25 gold-glow-border"
      }`}
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className={`block text-[10px] font-mono tracking-widest uppercase transition-colors duration-500 ${isDevilMode ? "text-red-500" : "text-[#C59B27]"}`}>
              {language === 'fa' ? 'هندسه مقدس نکسوس // MODULE 369' : 'SACRED GEOMETRY // OPTICAL RESONANCE'}
            </span>
            <h3 className="text-lg font-bold text-white tracking-wide uppercase mt-1 leading-snug">
              {language === 'fa' ? 'موتور محاسباتی ۲ بعدی فرکانس ۳۶۹' : '369 Sacred Geometry Real-Time Engine'}
            </h3>
          </div>

          {/* Spokes adjust controls */}
          <div className="flex bg-[#121214] border border-neutral-850 rounded-lg p-0.5 text-xs">
            {[3, 6, 9].map((spoke) => (
              <button
                key={spoke}
                type="button"
                onClick={() => setVortexSpokes(spoke)}
                className={`px-2 py-1 rounded text-[10px] font-mono transition-all cursor-pointer ${
                  vortexSpokes === spoke 
                    ? (isDevilMode ? 'bg-red-600 text-white font-bold' : 'bg-[#DFBA44] text-black font-bold') 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {spoke}
              </button>
            ))}
          </div>
        </div>

        {/* Geometry Vortex Interactive Canvas */}
        <div className={`relative flex justify-center items-center h-[340px] w-full bg-[#050505] border rounded-xl overflow-hidden transition-all duration-500 ${
          isDevilMode ? "border-red-900/40" : "border-[#DFBA44]/15"
        }`}>
          {/* Float Freq overlay badge */}
          <div className="absolute top-3 left-3 bg-black/80 border rounded px-2 py-0.5 text-[9px] font-mono text-neutral-400 flex items-center gap-1.5 z-20">
            <span className={`w-2 h-2 rounded-full animate-ping ${isDevilMode ? 'bg-red-500' : 'bg-green-500'}`} />
            <span>{activeFreq} Hz {language === 'fa' ? '(فعال)' : '(ACTIVE)'}</span>
          </div>

          <canvas 
            ref={canvasRef} 
            width={512} 
            height={340} 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* Ripples when audio is playing */}
          {isAudioPlaying && (
            <div className="absolute inset-0 pointer-events-none opacity-20 z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] border border-neutral-500 rounded-full animate-rotate-slow" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] border border-neutral-700 rounded-full animate-pulse-slow" />
            </div>
          )}
        </div>

        <p className="text-xs text-[#D7D2C4]/90 font-light leading-relaxed mt-4">
          {language === 'fa' 
            ? 'حرکات و فرکانس‌های ریاضی تسلا (۳-۶-۹) و محاسبات برداری بر اساس هارمونی‌های لرزش طبیعی صوتی را به رندرهای زنده تبدیل می‌کند. برای نواختن کدهای باینری، فرکانس‌ها را کلیک کنید.' 
            : 'Converts Tesla vortex geometry coordinates (3-6-9) and audio resonance calculations into real-time render shapes. Click on the frequencies below to emit Solfeggio soundscapes.'}
        </p>
      </div>

      <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-2">
        {[369, 432, 528].map((freq) => (
          <button
            key={freq}
            type="button"
            onClick={() => handleToggleAudio(freq)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-colors cursor-pointer ${
              activeFreq === freq && isAudioPlaying 
                ? (isDevilMode ? 'bg-red-900 border-transparent text-white font-black animate-pulse' : 'bg-[#DFBA44] text-black border-transparent font-black animate-pulse') 
                : (isDevilMode ? 'bg-[#151515] border-red-900/40 text-red-400 hover:bg-red-950/20' : 'bg-[#151515] border-[#DFBA44]/25 text-[#DFBA44] hover:bg-[#DFBA44]/10')
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{freq} Hz</span>
          </button>
        ))}

        {isAudioPlaying && (
          <button 
            type="button"
            onClick={stopAudio}
            className="ml-auto bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-400 px-2 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-1 transition-all cursor-pointer"
          >
            <VolumeX className="w-3.5 h-3.5" />
            <span>Mute</span>
          </button>
        )}
      </div>
    </section>
  );
}
