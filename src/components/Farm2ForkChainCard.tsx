import React from "react";
import { Globe, RefreshCw } from "lucide-react";

interface Node {
  id: string;
  name: string;
  region: string;
  latency: number;
  status: string;
  load: string;
  PIC: string;
}

interface Farm2ForkChainCardProps {
  language: 'fa' | 'en';
  isDevilMode: boolean;
  nodes: Node[];
  isSyncing: boolean;
  triggerLogisticsRefresh: () => void;
  optimalLogisticsWaste: number;
}

export default function Farm2ForkChainCard({
  language,
  isDevilMode,
  nodes,
  isSyncing,
  triggerLogisticsRefresh,
  optimalLogisticsWaste
}: Farm2ForkChainCardProps) {
  return (
    <section 
      id="partners" 
      className={`flex flex-col justify-between bg-[#0B0B0C] border-2 p-5 md:p-6 rounded-2xl h-[530px] relative overflow-hidden backdrop-blur-xl transition-all duration-500 ${
        isDevilMode ? "border-red-600/25 red-glow-border" : "border-[#DFBA44]/25 gold-glow-border"
      }`}
    >
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className={`flex items-center space-x-2 space-x-reverse text-[11px] font-mono tracking-widest uppercase transition-colors duration-500 ${isDevilMode ? "text-red-500" : "text-[#C59B27]"}`}>
            <Globe className="w-4 h-4" />
            <span>{language === 'fa' ? 'شبکه گره‌های توزیع شده کشاورزی پایدار' : 'FARM2FORK DISTRIBUTIVE MESH'}</span>
          </div>

          <button 
            type="button"
            onClick={triggerLogisticsRefresh}
            disabled={isSyncing}
            className={`flex items-center space-x-1 px-2.5 py-1 bg-neutral-900 border rounded text-[9.5px] font-mono transition-all cursor-pointer ${
              isDevilMode ? "border-red-900 text-red-100 hover:bg-red-950/20" : "border-[#DFBA44]/30 text-[#DFBA44] hover:bg-[#DFBA44]/10"
            }`}
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>SYNC</span>
          </button>
        </div>

        <p className="text-xs text-[#D7D2C4]/90 font-light leading-relaxed mb-4">
          {language === 'fa' 
            ? 'شبیه‌سازی ارتباطات هماهنگ گره‌های غیرمتمرکز نکسوس در پروژه به ارزش ۲,۰۰۰,۰۰۰ یورو. این گره‌ها با دقت برای حذف پسماند زنجیره توزیع بهینه‌سازی شده‌اند.' 
            : 'Simulating synchronized real-time server node routing maps corresponding to our €2M portfolio budget, designed to completely eliminate logistics overhead waste loops.'}
        </p>

        {/* Nodes Stack */}
        <div className="space-y-3">
          {nodes.map((node) => (
            <div 
              key={node.id}
              className={`bg-[#050505] border p-2.5 rounded-xl transition-all duration-500 ${
                isDevilMode ? "border-red-950 hover:border-red-500/30" : "border-[#DFBA44]/15 hover:border-[#DFBA44]/30"
              }`}
            >
              <div className="flex justify-between items-center text-[10px] pb-1 border-b border-white/5">
                <span className="font-mono text-neutral-500">{node.id}</span>
                <span className="bg-green-500/10 text-green-400 border border-green-500/30 text-[8px] font-mono px-1 rounded-sm">
                  {node.status}
                </span>
              </div>
              
              <div className="flex justify-between items-center pt-1.5 text-xs">
                <div>
                  <h5 className="font-mono font-bold text-white leading-tight">{node.name}</h5>
                  <span className={`text-[10px] tracking-tight ${isDevilMode ? "text-red-400" : "text-[#C59B27]"}`}>{node.region}</span>
                </div>
                <div className="text-right font-mono text-[10px]">
                  <span className="block text-white font-semibold">{node.latency}ms</span>
                  <span className={`block uppercase text-[8px] ${isDevilMode ? "text-red-500" : "text-[#DFBA44]"}`}>{node.load}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[10px] font-mono">
        <span>{language === 'fa' ? 'کاهش اتلاف برنامه‌ریزی‌شده:' : 'Decentralized Waste Saved:'}</span>
        <span className="text-green-400 font-bold">-{optimalLogisticsWaste}%</span>
      </div>
    </section>
  );
}
