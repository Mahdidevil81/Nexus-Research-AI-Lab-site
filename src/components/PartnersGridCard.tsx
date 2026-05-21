import React, { useState } from 'react';
import { BrainCircuit, Landmark, Globe, ExternalLink, ChevronRight, UserCheck } from 'lucide-react';

interface PartnersGridCardProps {
  language: 'en' | 'fa';
  isDevilMode: boolean;
}

export default function PartnersGridCard({ language, isDevilMode }: PartnersGridCardProps) {
  const [activePartner, setActivePartner] = useState<string | null>(null);

  const partners = [
    {
      id: 'pinar',
      name: language === 'fa' ? 'دکتر پینار قزل‌اوغلو' : 'Dr. Pinar Kiziloglu',
      role: language === 'fa' ? 'چارچوب‌های اخلاقی و علمی' : 'Ethical & Scientific Frameworks',
      desc: language === 'fa' 
        ? 'پژوهشگر پسادکتری دانشگاه توبینگن آلمان، دکتری مهندسی پزشکی از دانشگاه استانبول. متخصص در پردازش سیگنال، یادگیری ماشین و BCI. در آزمایشگاه هوش مصنوعی نکسوس، وی مسئول هدایت هسته‌های همگام‌سازی عصبی در پروتکل AWARE است که تلاقی بین کدهای علمی و آگاهی انسان را متصل می‌سازد.'
        : 'PostDoc from Tübingen University (Germany), PhD in Biomedical Engineering. Expert in Signal Processing, Machine Learning, and BCI. Within Nexus AI Lab, she pioneers the AWARE protocol\'s Neural Synchronization cores, aligning neural models with bio-ethical integrity.',
      field: language === 'fa' ? 'پژوهش زیست‌پزشکی و آلمان' : 'Biomedical Research, Germany',
      icon: <BrainCircuit className="w-5 h-5 md:w-6 md:h-6" />,
    },
    {
      id: 'lochan',
      name: language === 'fa' ? 'لوچان و شرکا' : 'Lochan & Co',
      role: language === 'fa' ? 'مدیریت استراتژیک' : 'Strategic Management',
      desc: language === 'fa' 
        ? 'شریک استراتژیک تحقیقاتی برای امور مشاوره‌ای بین‌المللی با حضور محوری شراد آگاروال در دهلی نو، هند. نقش این مجموعه در نکسوس، لنگر انداختن ساختارهای حاکمیتی پروژه‌ها و پیاده‌سازی گره‌های غیرمتمرکز پلتفرم در ابعاد جهانی است.'
        : 'Strategic research partner for international consultancy, led by Sharad Agarwal in New Delhi. Lochan & Co anchors Nexus AI Lab\'s international scaling structure, translating compliance frameworks into decentralized node deployments.',
      field: language === 'fa' ? 'مشاوره بین‌المللی، هند' : 'Intl Consultancy, India',
      icon: <Globe className="w-5 h-5 md:w-6 md:h-6" />,
    },
    {
      id: 'sergiy',
      name: language === 'fa' ? 'دکتر سرگئی یکیموف' : 'Dr. Sergiy Yekimov',
      role: language === 'fa' ? 'بازوی علمی اروپا' : 'European Scientific Arm',
      desc: language === 'fa' 
        ? 'پژوهشگر دانشگاه مندل. در آزمایشگاه نکسوس، وی عهده‌دار همسوسازی فناوری‌های دفترکل غیرمتمرکز نکسوس با شاخص‌های علمی معتبر اتحادیه اروپا (همچون Horizon Europe) و توسعه پروتکل‌های راستی‌آزمایی داده‌ها است.'
        : 'Mendel University scholar. Within Nexus AI Lab, he directs the European academic alliance networks, aligning our decentralized ledger technology with Horizon Europe scientific metrics and coordination initiatives.',
      field: language === 'fa' ? 'پژوهش‌های آکادمیک، اتحادیه اروپا' : 'Academic Research, EU',
      icon: <Landmark className="w-5 h-5 md:w-6 md:h-6" />,
    }
  ];

  return (
    <div className={`p-5 rounded-2xl border backdrop-blur-md transition-all duration-500 flex flex-col h-[610px] relative overflow-hidden ${
      isDevilMode 
        ? "bg-[#110B0B] border-red-900/40 shadow-[0_0_20px_rgba(239,68,68,0.05)]" 
        : "bg-[#0B0B0C] border-[#DFBA44]/30 shadow-[0_0_20px_rgba(223,186,68,0.05)]"
    }`}>
      {/* Dynamic Background Accent */}
      <div className={`absolute -right-12 -top-12 w-40 h-40 rounded-full blur-[80px] opacity-10 pointer-events-none transition-all duration-500 ${
        isDevilMode ? "bg-red-500" : "bg-[#DFBA44]"
      }`} />

      {/* Header */}
      <div className={`mb-4 pb-3 border-b flex items-center justify-between ${
        isDevilMode ? 'border-red-900/30' : 'border-[#DFBA44]/20'
      }`}>
        <div className="flex items-center gap-2">
          <UserCheck className={`w-5 h-5 ${isDevilMode ? 'text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'text-[#DFBA44] shadow-[0_0_10px_rgba(223,186,68,0.3)]'}`} />
          <h3 className="font-bold text-base md:text-lg text-white uppercase tracking-wider font-sans">
            {language === 'fa' ? 'شرکای راهبردی نکسوس' : 'Nexus Strategic Partners'}
          </h3>
        </div>
        <span className={`text-[9px] font-mono border px-2 py-0.5 rounded ${
          isDevilMode ? 'border-red-500/30 text-red-400 bg-red-950/20' : 'border-[#DFBA44]/30 text-[#DFBA44] bg-[#DFBA44]/15'
        }`}>
          {language === 'fa' ? 'اتحاد جهانی ۳۶۹' : 'GLOBAL ALLIANCE 369'}
        </span>
      </div>

      <p className="text-xs text-neutral-400 mb-4 leading-relaxed max-w-xl font-sans font-light">
        {language === 'fa' 
          ? 'شبکه‌ای منسجم و بین‌المللی از دانشمندان، استراتژیست‌ها و پژوهشگران تراز اول اتحادیه اروپا و آسیا جهت رشد و بالندگی اهداف عالی نکسوس.'
          : 'A highly integrated international network of leading scientists, strategists, and researchers across the EU and Asia collaborating on Nexus strategic objectives.'}
      </p>

      {/* Main Partners Display */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 py-1 select-text">
        {partners.map((partner) => {
          const isSelected = activePartner === partner.id;
          return (
            <div
              key={partner.id}
              onClick={() => setActivePartner(isSelected ? null : partner.id)}
              className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                isSelected 
                  ? (isDevilMode ? 'bg-[#1e1010]/80 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'bg-[#151512]/80 border-[#DFBA44]/60 shadow-[0_0_15px_rgba(223,186,68,0.15)]')
                  : (isDevilMode ? 'bg-red-950/5 border-red-900/20 hover:border-red-500/30 hover:bg-red-950/10' : 'bg-white/5 border-white/5 hover:border-[#DFBA44]/30 hover:bg-white/10')
              }`}
            >
              {/* Corner Ambient Light */}
              <div className={`absolute top-0 right-0 w-20 h-20 blur-[30px] opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
                isDevilMode ? 'bg-red-500' : 'bg-[#DFBA44]'
              }`} />

              <div className="flex items-start gap-3.5 relative z-10">
                <div className={`p-2.5 rounded-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                  isDevilMode 
                    ? 'bg-red-950/40 text-red-400 border border-red-900/30' 
                    : 'bg-[#DFBA44]/10 text-[#DFBA44] border border-[#DFBA44]/20'
                }`}>
                  {partner.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-sm md:text-base text-white tracking-wide truncate">
                      {partner.name}
                    </h4>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded flex-shrink-0 ${
                      isDevilMode ? 'bg-red-900/20 text-red-300/80' : 'bg-[#DFBA44]/10 text-[#DFBA44]/80'
                    }`}>
                      {partner.field}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <p className={`text-[11px] font-medium tracking-wide uppercase ${
                      isDevilMode ? 'text-red-400/80' : 'text-[#DFBA44]/80'
                    }`}>
                      {partner.role}
                    </p>
                    <ChevronRight className={`w-3.5 h-3.5 text-neutral-500 transition-transform duration-300 ${
                      isSelected ? 'rotate-90' : 'group-hover:translate-x-1'
                    }`} />
                  </div>

                  {/* Descriptions block with transition height */}
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isSelected ? 'max-h-40 opacity-100 mt-3 pt-3 border-t border-neutral-800' : 'max-h-0 opacity-0'
                  }`}>
                    <p className={`text-xs leading-relaxed text-justify ${
                      isDevilMode ? 'text-red-100/70' : 'text-neutral-300/90'
                    }`} dir={language === 'fa' ? 'rtl' : 'ltr'}>
                      {partner.desc}
                    </p>
                    
                    {/* Fake action/social credentials */}
                    <div className="flex justify-between items-center mt-3 pt-2 text-[10px] font-mono text-neutral-500">
                      <span>STATUS: SECURITY_AGREEMENT_SIGNED</span>
                      <span className="flex items-center gap-1 text-white hover:text-white/80">
                        {language === 'fa' ? 'مشاهده سند همکاری' : 'View Agreement'}
                        <ExternalLink className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Decorative Brand Accent bottom alignment */}
      <div className={`mt-3 pt-3 border-t text-[10px] font-mono text-neutral-500 flex justify-between ${
        isDevilMode ? 'border-red-900/30' : 'border-white/5'
      }`}>
        <span>{language === 'fa' ? 'بررسی اصالت شرکا تایید شد' : 'PARTNERSHIP VERIFIED // 369'}</span>
        <span>AURA CORE v1.8</span>
      </div>
    </div>
  );
}
