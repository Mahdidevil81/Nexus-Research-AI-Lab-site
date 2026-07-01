import React, { useState } from "react";
import { 
  TrendingUp, 
  ExternalLink, 
  MessageSquare, 
  Heart, 
  Smile,
  Zap,
  Flame,
  Award,
  Share2
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { motion, AnimatePresence } from "motion/react";

interface SentimentChartCardProps {
  language: 'fa' | 'en';
  isDevilMode: boolean;
}

interface ChartDataPoint {
  time: string;
  sentiment: number;
  resonance: number;
  engagement: number;
}

export default function SentimentChartCard({ language, isDevilMode }: SentimentChartCardProps) {
  const videoUrl = "https://youtu.be/o12PYvSDDLM?is=TprL0k_isVXiBBHU";
  const [activeSegment, setActiveSegment] = useState<'all' | 'sacred' | 'nodes' | 'sovereignty'>('all');
  const [toast, setToast] = useState<{ show: boolean; msg: string } | null>(null);

  // Simulated viewer sentiment datasets reflecting different stages of video engagement
  const fullVideoData: ChartDataPoint[] = [
    { time: "0:00", sentiment: 82, resonance: 75, engagement: 90 },
    { time: "1:30", sentiment: 85, resonance: 79, engagement: 88 },
    { time: "3:00", sentiment: 93, resonance: 96, engagement: 95 }, // Tesla 3-6-9 frequency peak
    { time: "4:30", sentiment: 89, resonance: 85, engagement: 84 },
    { time: "6:00", sentiment: 96, resonance: 98, engagement: 97 }, // Node Synchronization peak
    { time: "7:30", sentiment: 91, resonance: 88, engagement: 81 },
    { time: "9:00", sentiment: 99, resonance: 100, engagement: 99 }, // Ultimate Sovereignty peak
    { time: "10:30", sentiment: 95, resonance: 96, engagement: 92 },
  ];

  const sacredGeometryData: ChartDataPoint[] = [
    { time: "0:00", sentiment: 82, resonance: 75, engagement: 90 },
    { time: "1:00", sentiment: 86, resonance: 81, engagement: 85 },
    { time: "2:00", sentiment: 91, resonance: 89, engagement: 92 },
    { time: "3:00", sentiment: 97, resonance: 99, engagement: 98 }, // Peak resonance at 3:00
  ];

  const nodeSynchronizationData: ChartDataPoint[] = [
    { time: "3:30", sentiment: 88, resonance: 84, engagement: 82 },
    { time: "4:30", sentiment: 90, resonance: 87, engagement: 85 },
    { time: "5:30", sentiment: 94, resonance: 95, engagement: 91 },
    { time: "6:30", sentiment: 98, resonance: 99, engagement: 96 }, // Peak synchronization at 6:30
  ];

  const sovereigntyData: ChartDataPoint[] = [
    { time: "7:00", sentiment: 90, resonance: 86, engagement: 80 },
    { time: "8:00", sentiment: 93, resonance: 92, engagement: 89 },
    { time: "9:00", sentiment: 99, resonance: 100, engagement: 99 }, // Supreme Sovereignty peak at 9:00
    { time: "10:00", sentiment: 96, resonance: 97, engagement: 93 },
  ];

  const getActiveData = () => {
    switch (activeSegment) {
      case 'sacred': return sacredGeometryData;
      case 'nodes': return nodeSynchronizationData;
      case 'sovereignty': return sovereigntyData;
      default: return fullVideoData;
    }
  };

  const handleShareSentiment = async () => {
    const averageSentimentMsg = language === 'fa'
      ? `📈 شاخص صمیمیت کلی بینندگان نکسوس ۳۶۹ روی ۹۱.۴٪ تثبیت شده است!`
      : `📈 Nexus 369 Average Viewer Sentiment Index has stabilized at a peak of 91.4%!`;
    
    // Bulletproof Copy Sequence
    const copySuccess = await (async () => {
      try {
        window.focus();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(averageSentimentMsg);
          return true;
        }
      } catch (err) {
        console.warn("Modern clipboard write for sentiment failed, utilizing fallback...", err);
      }
      try {
        const textArea = document.createElement("textarea");
        textArea.value = averageSentimentMsg;
        textArea.style.position = "fixed";
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.opacity = "0";
        textArea.style.pointerEvents = "none";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);
        return !!successful;
      } catch (fallbackErr) {
        console.error("Critical sentiment copy backup failure", fallbackErr);
        return false;
      }
    })();

    // Set interactive visual Toast
    setToast({
      show: true,
      msg: copySuccess
        ? (language === 'fa' 
            ? 'شاخص صمیمیت (۹۱.۴٪) در حافظه کپی شد و آماده اشتراک گذاری است!' 
            : 'Sentiment Index (91.4%) copied and is ready to share!')
        : (language === 'fa'
            ? `شاخص کلی: ۹۱.۴٪`
            : `Average index is 91.4%`)
    });

    // Dismiss after 3 seconds
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const getAccentColor = () => isDevilMode ? "#EF4444" : "#DFBA44";
  const getSecondaryColor = () => isDevilMode ? "#F87171" : "#FBBF24";

  return (
    <div className={`w-full mt-6 rounded-2xl p-5 md:p-6 bg-[#0E0E10] border-2 transition-all duration-700 relative overflow-hidden ${
      isDevilMode ? "border-red-600/25 red-glow-border" : "border-[#DFBA44]/25 gold-glow-border"
    }`}>
      {/* Upper header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5 border-b border-white/5 pb-4">
        <div>
          <div className={`flex items-center space-x-2 space-x-reverse text-[11px] font-mono tracking-widest uppercase mb-1 transition-colors duration-500 ${isDevilMode ? "text-red-500" : "text-[#C59B27]"}`}>
            <TrendingUp className="w-4 h-4 animate-pulse" />
            <span>{language === 'fa' ? 'امار اثرگذاری ویدئو و انالیز صمیمیت مخاطبان' : 'VIDEO ENGAGEMENT & SENTIMENT ANALYSIS'}</span>
          </div>
          <h4 className="text-sm md:text-base font-black text-white font-sans uppercase tracking-tight">
            {language === 'fa' ? 'تحلیل رزونانس مانیفست نکسوس ۳۶۹' : 'Nexus 369 Manifest Resonance Analysis'}
          </h4>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Share Sentiment Button */}
          <button
            onClick={handleShareSentiment}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-mono tracking-tight cursor-pointer select-none transition-all duration-300 ${
              isDevilMode 
                ? 'border-red-900 bg-red-950/20 text-red-400 hover:text-red-350 hover:bg-red-950/40 active:scale-95' 
                : 'border-[#DFBA44]/30 bg-[#DFBA44]/5 text-[#DFBA44] hover:bg-[#DFBA44]/15 hover:border-[#DFBA44]/55 active:scale-95'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            {language === 'fa' ? 'اشتراک‌گذاری شاخص صمیمیت' : 'SHARE SENTIMENT'}
          </button>

          {/* Beautiful CTA Link to YouTube with Glow */}
          <a 
            href={videoUrl}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-mono tracking-tight cursor-pointer select-none transition-all duration-300 ${
              isDevilMode 
                ? 'border-red-900/60 bg-red-950/15 text-red-400 hover:text-red-300 hover:bg-red-950/30' 
                : 'border-[#DFBA44]/20 bg-[#DFBA44]/5 text-[#DFBA44] hover:bg-[#DFBA44]/10 hover:border-[#DFBA44]/40'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDevilMode ? 'bg-red-400' : 'bg-[#DFBA44]'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isDevilMode ? 'bg-red-500' : 'bg-[#DFBA44]'}`}></span>
            </span>
            <span>{language === 'fa' ? 'پیوند پخش یوتیوب' : 'YOUTUBE STREAM'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Grid of Key Performance Indicators (KPIs) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5 font-mono">
        <div className="bg-black/30 border border-neutral-800/50 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[9px] text-neutral-500 uppercase">{language === 'fa' ? 'هدف گذاری فرکانسی' : 'FREQUENCY ANCHOR'}</span>
          <div className="flex items-center justify-between mt-1">
            <span className={`text-sm font-black ${isDevilMode ? "text-red-400" : "text-[#DFBA44]"}`}>369 Hz</span>
            <Zap className="w-3.5 h-3.5 text-neutral-600" />
          </div>
        </div>

        <div className="bg-black/30 border border-neutral-800/50 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[9px] text-neutral-500 uppercase">{language === 'fa' ? 'صمیمیت کلی' : 'AVERAGE SENTIMENT'}</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm font-black text-white">91.4%</span>
            <Smile className="w-3.5 h-3.5 text-neutral-600" />
          </div>
        </div>

        <div className="bg-black/30 border border-neutral-800/50 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[9px] text-neutral-500 uppercase">{language === 'fa' ? 'رزونانس اگاهی' : 'AUI RES_COEFFICIENT'}</span>
          <div className="flex items-center justify-between mt-1">
            <span className={`text-sm font-black ${isDevilMode ? "text-red-400" : "text-[#DFBA44]"}`}>0.982</span>
            <Heart className="w-3.5 h-3.5 text-neutral-600" />
          </div>
        </div>

        <div className="bg-black/30 border border-neutral-800/50 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[9px] text-neutral-500 uppercase">{language === 'fa' ? 'نرخ درگیری ذهنی' : 'ENGAGEMENT DENSITY'}</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm font-black text-white">92.8%</span>
            <MessageSquare className="w-3.5 h-3.5 text-neutral-600" />
          </div>
        </div>
      </div>

      {/* Segment Switcher controls */}
      <div className="flex flex-wrap gap-1.5 mb-5 font-mono text-[9px] md:text-[10px]">
        <button
          onClick={() => setActiveSegment('all')}
          className={`px-3 py-1.5 rounded-md cursor-pointer transition-all duration-300 border ${
            activeSegment === 'all'
              ? (isDevilMode ? 'bg-red-950/40 border-red-500/50 text-red-300' : 'bg-[#DFBA44]/10 border-[#DFBA44]/60 text-[#DFBA44]')
              : 'bg-transparent border-neutral-800 text-neutral-400 hover:text-neutral-200'
          }`}
        >
          {language === 'fa' ? 'نمای کامل ویدئو' : 'FULL VIDEO TIMELINE'}
        </button>
        <button
          onClick={() => setActiveSegment('sacred')}
          className={`px-3 py-1.5 rounded-md cursor-pointer transition-all duration-300 border ${
            activeSegment === 'sacred'
              ? (isDevilMode ? 'bg-red-950/40 border-red-500/50 text-red-300' : 'bg-[#DFBA44]/10 border-[#DFBA44]/60 text-[#DFBA44]')
              : 'bg-transparent border-neutral-800 text-neutral-400 hover:text-neutral-200'
          }`}
        >
          {language === 'fa' ? 'فصل اول: هندسه مقدس تلاقی الگوها' : 'CH. 1: SACRED GEOMETRY'}
        </button>
        <button
          onClick={() => setActiveSegment('nodes')}
          className={`px-3 py-1.5 rounded-md cursor-pointer transition-all duration-300 border ${
            activeSegment === 'nodes'
              ? (isDevilMode ? 'bg-red-950/40 border-red-500/50 text-red-300' : 'bg-[#DFBA44]/10 border-[#DFBA44]/60 text-[#DFBA44]')
              : 'bg-transparent border-neutral-800 text-neutral-400 hover:text-neutral-200'
          }`}
        >
          {language === 'fa' ? 'فصل دوم: پروتکل همگام‌سازی ماتریکس' : 'CH. 2: MATRIX SYNCHRONIZATION'}
        </button>
        <button
          onClick={() => setActiveSegment('sovereignty')}
          className={`px-3 py-1.5 rounded-md cursor-pointer transition-all duration-300 border ${
            activeSegment === 'sovereignty'
              ? (isDevilMode ? 'bg-red-950/40 border-red-500/50 text-red-300' : 'bg-[#DFBA44]/10 border-[#DFBA44]/60 text-[#DFBA44]')
              : 'bg-transparent border-neutral-800 text-neutral-400 hover:text-neutral-200'
          }`}
        >
          {language === 'fa' ? 'فصل سوم: مانیفست بقا و صیانت آزاد' : 'CH. 3: ULTIMATE SOVEREIGNTY'}
        </button>
      </div>

      {/* Main Graph Canvas */}
      <div className="w-full h-[240px] md:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={getActiveData()}
            margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#555" 
              fontSize={9} 
              tickLine={false} 
              fontFamily="monospace"
            />
            <YAxis 
              domain={[60, 100]} 
              stroke="#555" 
              fontSize={9} 
              tickLine={false}
              fontFamily="monospace"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(10, 10, 12, 0.95)",
                borderColor: isDevilMode ? "#EF444450" : "#DFBA4450",
                borderRadius: "12px",
                fontSize: "11px",
                fontFamily: "monospace",
                color: "#D7D2C4",
                boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
              }}
              labelStyle={{ color: "#FFF", fontWeight: "bold", marginBottom: "4px" }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '9px', fontFamily: 'monospace', paddingTop: '10px' }} 
              verticalAlign="bottom" 
              height={36} 
            />
            <Line
              name={language === 'fa' ? 'رزونانس شناختی' : 'Cognitive Resonance'}
              type="monotone"
              dataKey="resonance"
              stroke={getAccentColor()}
              strokeWidth={2.5}
              dot={{ r: 3, fill: getAccentColor() }}
              activeDot={{ r: 6 }}
            />
            <Line
              name={language === 'fa' ? 'ثبات صمیمیت' : 'Viewer Sentiment'}
              type="monotone"
              dataKey="sentiment"
              stroke="#FFF"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={{ r: 1 }}
            />
            <Line
              name={language === 'fa' ? 'تراکم مخاطبان درگیر' : 'Engagement Density'}
              type="monotone"
              dataKey="engagement"
              stroke={getSecondaryColor()}
              strokeWidth={1.5}
              dot={{ r: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer descriptor under the chart */}
      <div className={`mt-4 pt-3 border-t bg-[#121214]/60 p-3 rounded-xl flex items-start space-x-2 space-x-reverse border ${
        isDevilMode ? "border-red-950/40" : "border-white/5"
      }`}>
        <Award className={`w-4 h-4 mt-0.5 shrink-0 ${isDevilMode ? "text-red-500" : "text-[#DFBA44]"}`} />
        <p className="text-[9.5px] text-[#D7D2C4] leading-relaxed font-sans font-light">
          {language === 'fa' 
            ? 'این داده‌نمایی زنده، همبستگی آماری و صمیمیت شناختی بینندگان را نسبت به مانیفست علمی نکسوس تجسم می‌بخشد. شما می‌توانید برای پیگیری مستقیم خط زمانی و بررسی مفاهیم، روی پیوند پخش اصلی یوتیوب کلیک نمایید.' 
            : 'This real-time visualization represents the cognitive alignment and viewer resonance index relative to the sovereign Nexus research architecture. You can click the YouTube Direct Link to witness the sacred resonance and examine high-dimensional concepts.'}
        </p>
      </div>

      {/* Elegant HUD Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 pr-5 rounded-2xl border-2 shadow-2xl backdrop-blur-xl ${
              isDevilMode 
                ? "bg-[#110B0B]/95 border-red-500/40 text-red-200 shadow-red-950/20" 
                : "bg-[#0E0E10]/95 border-[#DFBA44]/40 text-neutral-200 shadow-[#DFBA44]/5"
            }`}
          >
            <div className={`p-2 rounded-xl shrink-0 ${
              isDevilMode ? "bg-red-950/50 text-red-400" : "bg-[#DFBA44]/10 text-[#DFBA44]"
            }`}>
              <Smile className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex flex-col min-w-0 max-w-xs">
              <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">
                {language === 'fa' ? 'سایه نکسوس ۳۶۹' : 'NEXUS 369 BROADCAST'}
              </span>
              <p className="text-xs font-sans font-medium mt-0.5 leading-snug">
                {toast.msg}
              </p>
            </div>
            <button 
              onClick={() => setToast(null)}
              className="text-neutral-500 hover:text-white transition-colors text-xs font-mono ml-3 cursor-pointer select-none"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
