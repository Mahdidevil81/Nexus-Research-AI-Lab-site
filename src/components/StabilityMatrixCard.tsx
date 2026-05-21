import React from "react";
import { Award, Info } from "lucide-react";

interface Competency {
  name: string;
  category: string;
  level: number;
  description: string;
}

interface StabilityMatrixCardProps {
  language: 'fa' | 'en';
  isDevilMode: boolean;
  competencies: Competency[];
}

export default function StabilityMatrixCard({
  language,
  isDevilMode,
  competencies
}: StabilityMatrixCardProps) {
  return (
    <section 
      id="capabilities-matrix" 
      className={`flex flex-col justify-between bg-[#0B0B0C] border-2 p-5 md:p-6 rounded-2xl h-[530px] relative overflow-hidden backdrop-blur-xl transition-all duration-500 ${
        isDevilMode ? "border-red-600/25 red-glow-border" : "border-[#DFBA44]/25 gold-glow-border"
      }`}
    >
      <div>
        <div className={`flex items-center space-x-2 space-x-reverse text-[11px] font-mono tracking-widest uppercase mb-4 transition-colors duration-500 ${isDevilMode ? "text-red-500" : "text-[#C59B27]"}`}>
          <Award className="w-4 h-4" />
          <span>{language === 'fa' ? 'ماتریس ثبات قابلیت‌ها و توانمندی‌ها' : 'STABILITY MATRIX CAPABILITIES'}</span>
        </div>

        <div className="space-y-4">
          {competencies.map((comp, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-end text-xs font-mono">
                <span className="text-white font-medium">{comp.name}</span>
                <span className={`font-bold ${isDevilMode ? "text-red-400" : "text-[#DFBA44]"}`}>{comp.level}%</span>
              </div>
              
              <div className={`h-2 w-full bg-[#151517] rounded-full overflow-hidden border ${isDevilMode ? "border-red-950" : "border-[#DFBA44]/10"}`}>
                <div 
                  className={`h-full rounded-full bg-gradient-to-r transition-all duration-1000 ${isDevilMode ? "from-red-900 to-red-500" : "from-[#C59B27] to-[#DFBA44]"}`}
                  style={{ width: `${comp.level}%` }}
                />
              </div>
              
              <p className="text-[10px] text-neutral-500 leading-normal">
                {comp.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={`mt-4 pt-3 border-t bg-[#121214]/60 p-2.5 rounded-xl flex items-start space-x-2 space-x-reverse border ${
        isDevilMode ? "border-red-950/40" : "border-white/5"
      }`}>
        <Info className={`w-4 h-4 mt-0.5 shrink-0 ${isDevilMode ? "text-red-500" : "text-[#DFBA44]"}`} />
        <p className="text-[9.5px] text-[#D7D2C4] leading-normal">
          {language === 'fa' 
            ? 'مهدی فراهی حامی دسترسی متن‌باز آزاد بر اساس قوانین ثبتی و هنجارهای لایسنس بین‌المللی CC BY 4.0 و استانداردهای پایداری است.' 
            : 'Mahdi Farahi supports ethical open-access technology development. All systems and indices are aligned with CC BY 4.0 and global standards.'}
        </p>
      </div>
    </section>
  );
}
