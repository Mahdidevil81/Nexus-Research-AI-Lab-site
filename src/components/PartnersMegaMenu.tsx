import React, { useState, useRef, useEffect } from 'react';
import { BrainCircuit, Landmark, Globe, ChevronDown } from 'lucide-react';

interface PartnersMegaMenuProps {
  language: 'en' | 'fa';
  isDevilMode: boolean;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function PartnersMegaMenu({ language, isDevilMode, label, isActive, onClick }: PartnersMegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const partners = [
    {
      id: 'pinar',
      name: language === 'fa' ? 'دکتر پینار قزل‌اوغلو' : 'Dr. Pinar Kiziloglu',
      role: language === 'fa' ? 'چارچوب‌های اخلاقی و علمی' : 'Ethical & Scientific Frameworks',
      desc: language === 'fa' 
        ? 'پژوهشگر پسادکتری دانشگاه توبینگن آلمان، دکتری مهندسی پزشکی از دانشگاه استانبول. متخصص در پردازش سیگنال، یادگیری ماشین و BCI. در آزمایشگاه هوش مصنوعی نکسوس، وی مسئول هدایت هسته‌های همگام‌سازی عصبی در پروتکل AWARE است که تلاقی بین کدهای علمی و آگاهی انسان را متصل می‌سازد.'
        : 'PostDoc from Tübingen University (Germany), PhD in Biomedical Engineering. Expert in Signal Processing, Machine Learning, and BCI. Within Nexus AI Lab, she pioneers the AWARE protocol\'s Neural Synchronization cores, aligning neural models with bio-ethical integrity.',
      icon: <BrainCircuit className="w-8 h-8" />,
    },
    {
      id: 'lochan',
      name: language === 'fa' ? 'لوچان و شرکا' : 'Lochan & Co',
      role: language === 'fa' ? 'مدیریت استراتژیک' : 'Strategic Management',
      desc: language === 'fa' 
        ? 'شریک استراتژیک تحقیقاتی برای امور مشاوره‌ای بین‌المللی با حضور محوری شراد آگاروال در دهلی نو، هند. نقش این مجموعه در نکسوس، لنگر انداختن ساختارهای حاکمیتی پروژه‌ها و پیاده‌سازی گره‌های غیرمتمرکز پلتفرم در ابعاد جهانی است.'
        : 'Strategic research partner for international consultancy, led by Sharad Agarwal in New Delhi. Lochan & Co anchors Nexus AI Lab\'s international scaling structure, translating compliance frameworks into decentralized node deployments.',
      icon: <Globe className="w-8 h-8" />,
    },
    {
      id: 'sergiy',
      name: language === 'fa' ? 'دکتر سرگئی یکیموف' : 'Dr. Sergiy Yekimov',
      role: language === 'fa' ? 'بازوی علمی اروپا' : 'European Scientific Arm',
      desc: language === 'fa' 
        ? 'پژوهشگر دانشگاه مندل. در آزمایشگاه نکسوس، وی عهده‌دار همسوسازی فناوری‌های دفترکل غیرمتمرکز نکسوس با شاخص‌های علمی معتبر اتحادیه اروپا (همچون Horizon Europe) و توسعه پروتکل‌های راستی‌آزمایی داده‌ها است.'
        : 'Mendel University scholar. Within Nexus AI Lab, he directs the European academic alliance networks, aligning our decentralized ledger technology with Horizon Europe scientific metrics and coordination initiatives.',
      icon: <Landmark className="w-8 h-8" />,
    }
  ];

  return (
    <div className="relative z-50 inline-block text-left" ref={menuRef} onMouseLeave={() => setIsOpen(false)}>
      <button
        type="button"
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => {
          setIsOpen(!isOpen);
          if (onClick) onClick();
        }}
        className={`px-3.5 py-1.5 rounded-xl font-medium text-xs md:text-sm transition-all duration-300 flex items-center gap-1 cursor-pointer flex-shrink-0 ${
          isOpen || isActive
            ? (isDevilMode ? 'bg-red-950/60 text-red-100 border border-red-850/40 font-bold' : 'bg-[#DFBA44]/15 text-[#DFBA44] border border-[#DFBA44]/30 font-bold') 
            : 'text-neutral-400 hover:text-white hover:bg-white/5'
        }`}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute top-full mt-0 pt-2 w-[90vw] max-w-[320px] md:max-w-none md:w-[750px] lg:w-[900px] left-0 lg:-left-24 md:-left-12 px-2 pb-2 animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <div className={`rounded-2xl border p-5 shadow-2xl backdrop-blur-xl ${
            isDevilMode 
              ? 'bg-[#0a0707]/95 border-red-900/40 shadow-red-950/50' 
              : 'bg-[#090D11]/95 border-[#DFBA44]/30 shadow-black/80'
          }`}>
            
            <div className={`mb-5 pb-4 border-b border-dashed ${isDevilMode ? 'border-red-900/30' : 'border-[#DFBA44]/20'}`}>
               <h3 className={`text-lg font-black tracking-widest uppercase mb-1 flex items-center gap-2 ${isDevilMode ? 'text-red-500' : 'text-[#DFBA44]'}`}>
                  <Landmark className="w-5 h-5" />
                  {language === 'fa' ? 'شرکای استراتژیک نکسوس' : 'Nexus Strategic Partners'}
               </h3>
               <p className={`text-xs ${isDevilMode ? 'text-red-300/60' : 'text-neutral-400'}`}>
                 {language === 'fa' ? 'شبکه‌ای در سطح بین‌المللی از دانشمندان و استراتژیست‌ها (اتحاد جهانی)' : 'An international-level network of scientists and strategists (Global Alliance)'}
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {partners.map((partner) => (
                <div 
                  key={partner.id}
                  className={`group relative p-5 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${
                    isDevilMode 
                      ? 'border-red-950/40 bg-[#120a0a]/50 hover:bg-[#1a0f0f] hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]' 
                      : 'border-[#DFBA44]/10 bg-[#10141a]/50 hover:bg-[#141a22] hover:border-[#DFBA44]/40 hover:shadow-[0_0_20px_rgba(223,186,68,0.1)]'
                  }`}
                >
                  <div className={`mb-4 inline-flex items-center justify-center p-3.5 rounded-xl ${
                    isDevilMode ? 'bg-red-950/40 text-red-500 group-hover:text-red-400' : 'bg-[#DFBA44]/10 text-[#DFBA44] group-hover:text-[#F3EFE0]'
                  }`}>
                    {partner.icon}
                  </div>
                  
                  <h4 className="text-[15px] font-bold text-white mb-2 font-sans tracking-wide">{partner.name}</h4>
                  
                  <div className={`text-[10px] font-mono tracking-widest uppercase mb-4 py-1 px-2 inline-block rounded-md ${
                    isDevilMode ? 'text-red-300 bg-red-950/30' : 'text-[#DFBA44] bg-[#DFBA44]/10'
                  }`}>
                    {partner.role}
                  </div>
                  
                  <p className={`text-xs leading-relaxed text-justify mt-auto ${
                    isDevilMode ? 'text-red-100/60' : 'text-neutral-400'
                  }`} dir={language === 'fa' ? 'rtl' : 'ltr'}>
                    {partner.desc}
                  </p>
                  
                  {/* Decorative corner accents */}
                  <div className={`absolute top-0 right-0 w-8 h-8 rounded-tr-xl border-t-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                     isDevilMode ? 'border-red-500/50' : 'border-[#DFBA44]/50'
                  }`} />
                  <div className={`absolute bottom-0 left-0 w-8 h-8 rounded-bl-xl border-b-2 border-l-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                     isDevilMode ? 'border-red-500/50' : 'border-[#DFBA44]/50'
                  }`} />
                </div>
              ))}
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
