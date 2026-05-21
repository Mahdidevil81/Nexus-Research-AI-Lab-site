import React from "react";
import { FileText } from "lucide-react";

interface BalanceItem {
  category: string;
  description: string;
  valueUsd: number;
}

interface AuditedLedgerCardProps {
  language: 'fa' | 'en';
  isDevilMode: boolean;
  balanceSheet: BalanceItem[];
  customCapitalAmount: number;
  setCustomCapitalAmount: (val: number) => void;
}

export default function AuditedLedgerCard({
  language,
  isDevilMode,
  balanceSheet,
  customCapitalAmount,
  setCustomCapitalAmount
}: AuditedLedgerCardProps) {
  return (
    <section 
      id="deliverables" 
      className={`flex flex-col justify-between bg-[#0B0B0C] border-2 p-5 md:p-6 rounded-2xl h-[530px] relative overflow-hidden backdrop-blur-xl transition-all duration-500 ${
        isDevilMode ? "border-red-600/25 red-glow-border" : "border-[#DFBA44]/25 gold-glow-border"
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
          <div className={`flex items-center space-x-2 space-x-reverse text-[11px] font-mono tracking-widest uppercase transition-colors duration-500 ${isDevilMode ? "text-red-500" : "text-[#C59B27]"}`}>
            <FileText className="w-4 h-4" />
            <span>{language === 'fa' ? 'ترازنامه مالی حسابرسی شده نکسوس' : 'NEXUS LAB AUDITED BALANCE SHEET'}</span>
          </div>
          <span className={`border px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold shrink-0 ${
            isDevilMode ? "bg-red-950/20 border-red-500/20 text-red-400" : "bg-[#DFBA44]/10 border-[#DFBA44]/30 text-[#DFBA44]"
          }`}>
            AUDITED 2026
          </span>
        </div>

        {/* Micro asset double entry */}
        <div className={`space-y-2 mb-3 bg-[#050505] border rounded-xl p-3 ${
          isDevilMode ? "border-red-950" : "border-[#DFBA44]/15"
        }`}>
          {balanceSheet.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-[10px] md:text-[11px] pb-1.5 border-b border-white/5 last:border-b-0 last:pb-0">
              <div>
                <span className={`block text-[8px] uppercase font-mono leading-none mb-0.5 ${isDevilMode ? "text-red-400" : "text-[#C59B27]"}`}>{item.category}</span>
                <span className="text-[#D7D2C4] font-light">{item.description}</span>
              </div>
              <span className="font-mono text-white select-none font-bold">
                ${(item.description.includes("Cash") ? customCapitalAmount : item.valueUsd).toLocaleString()}
              </span>
            </div>
          ))}
          
          <div className={`pt-2 mt-1 border-t-2 border-dashed flex justify-between items-center text-xs font-mono ${
            isDevilMode ? "border-red-550/20" : "border-[#DFBA44]/25"
          }`}>
            <span className={`uppercase font-bold ${isDevilMode ? "text-red-400" : "text-[#DFBA44]"}`}>
              {language === 'fa' ? 'کل دارایی‌های حسابرسی شده:' : 'TOTAL ASSESSED ASSETS:'}
            </span>
            <span className={`font-bold ${isDevilMode ? "text-red-500" : "text-[#DFBA44]"}`}>
              ${(42000 + customCapitalAmount).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Recalculate slider */}
        <div className={`border p-3 rounded-lg mb-4 space-y-1.5 ${
          isDevilMode ? "border-red-950/40 bg-red-950/5" : "border-[#C59B27]/15 bg-[#121214]"
        }`}>
          <div className="flex justify-between items-center text-[9px] font-mono">
            <span className="text-neutral-450 uppercase">{language === 'fa' ? 'بازمحاسبه مخازن سرمایه نقدی کل' : 'RECALCULATE LIQUID CAPITAL RESERVES'}</span>
            <span className={`font-bold ${isDevilMode ? "text-red-400" : "text-[#DFBA44]"}`}>${customCapitalAmount.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            min={1000} 
            max={50000} 
            step={1000}
            value={customCapitalAmount} 
            onChange={(e) => setCustomCapitalAmount(Number(e.target.value))}
            className={`w-full h-1 bg-black rounded-lg appearance-none cursor-pointer ${isDevilMode ? "accent-red-650" : "accent-[#DFBA44]"}`}
          />
        </div>
      </div>

      <div className={`p-2 rounded-lg border flex items-center justify-between ${
        isDevilMode ? "border-red-950 bg-red-950/5" : "border-[#DFBA44]/20 bg-[#161614]/40"
      }`}>
        <div className="text-[8.5px] font-mono leading-tight">
          <span className={`block font-black uppercase ${isDevilMode ? "text-red-400" : "text-[#DFBA44]"}`}>MAHDI FARAHI // LEDGER</span>
          <span className="text-neutral-500 font-medium">FOUNDER & LEAD ARCHITECT // 2026</span>
        </div>
        <div className={`border border-dashed px-1.5 py-0.5 rounded text-center shrink-0 ${isDevilMode ? "border-red-550/30 text-red-400" : "border-[#DFBA44]/30 text-[#DFBA44]"}`}>
          <span className="block text-[7.5px] font-mono font-bold leading-none">NEXUS SEAL</span>
          <span className="text-[6.5px] font-mono leading-none uppercase">VERIFIED</span>
        </div>
      </div>
    </section>
  );
}
