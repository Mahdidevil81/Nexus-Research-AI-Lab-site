import React, { useState, useEffect, useRef } from "react";
import { Search, X, ChevronRight, Sparkles, Loader2 } from "lucide-react";
import Markdown from "react-markdown";
import { Project, Experience, MANIFESTO_SECTIONS } from "../types";

interface SearchResult {
  type: 'project' | 'experience' | 'manifesto' | 'section';
  title: string;
  subtitle?: string;
  data: any;
}

interface GlobalSearchBarProps {
  language: 'fa' | 'en';
  isDevilMode: boolean;
  projects: Project[];
  experiences: Experience[];
  setActiveTab: (val: number) => void;
  setSelectedProject: (val: Project) => void;
  setActiveManifestoTab: (val: number) => void;
}

export default function GlobalSearchBar({
  language,
  isDevilMode,
  projects,
  experiences,
  setActiveTab,
  setSelectedProject,
  setActiveManifestoTab
}: GlobalSearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [aiSummary, setAiSummary] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const aiDebounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchAiSummary = async (searchQuery: string) => {
    setIsAiLoading(true);
    setAiSummary("");
    try {
      const response = await fetch("/api/ai-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: searchQuery,
          language,
          portfolioData: { projects, experiences, manifesto: MANIFESTO_SECTIONS }
        }),
      });
      const data = await response.json();
      if (data.summary) {
        setAiSummary(data.summary);
      }
    } catch (e) {
      console.error(e);
      setAiSummary(language === 'fa' ? 'خطا در دریافت اطلاعات هوش مصنوعی.' : 'Failed to fetch AI summary.');
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setAiSummary("");
      if (aiDebounceRef.current) {
        clearTimeout(aiDebounceRef.current);
      }
      return;
    }

    const searchTerm = query.toLowerCase();
    const newResults: SearchResult[] = [];

    // Search Projects
    projects.forEach((proj, index) => {
      if (proj.title.toLowerCase().includes(searchTerm) || proj.description.toLowerCase().includes(searchTerm)) {
        newResults.push({
          type: 'project',
          title: proj.title,
          subtitle: 'Project / پروژه',
          data: { project: proj, index: index + experiences.length } // projects come after experiences in the tabs
        });
      }
    });

    // Search Experiences
    experiences.forEach((exp, index) => {
      if (exp.role.toLowerCase().includes(searchTerm) || exp.company.toLowerCase().includes(searchTerm)) {
        newResults.push({
          type: 'experience',
          title: `${exp.role} at ${exp.company}`,
          subtitle: 'Experience / سابقه کار',
          data: { index }
        });
      }
    });

    // Search Manifesto
    MANIFESTO_SECTIONS.forEach((section, index) => {
      if (section.title.toLowerCase().includes(searchTerm) || section.content.toLowerCase().includes(searchTerm)) {
        newResults.push({
          type: 'manifesto',
          title: section.title,
          subtitle: 'Manifesto Chapter / فصل مانیفست',
          data: { index }
        });
      }
    });

    setResults(newResults);

    // AI Debounce Logic
    if (aiDebounceRef.current) {
      clearTimeout(aiDebounceRef.current);
    }
    aiDebounceRef.current = setTimeout(() => {
      if (query.trim().length > 2) {
         fetchAiSummary(query.trim());
      }
    }, 600); // 600ms debounce

  }, [query, projects, experiences, language]);

  const handleSelect = (result: SearchResult) => {
    setIsOpen(false);
    setQuery("");

    if (result.type === 'project') {
      setActiveTab(result.data.index);
      setSelectedProject(result.data.project);
      document.getElementById('publications')?.scrollIntoView({ behavior: 'smooth' });
    } else if (result.type === 'experience') {
      setActiveTab(result.data.index);
      document.getElementById('publications')?.scrollIntoView({ behavior: 'smooth' });
    } else if (result.type === 'manifesto') {
      setActiveManifestoTab(result.data.index);
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative z-50 w-full max-w-[240px] md:max-w-xs" ref={searchRef}>
      <div className={`flex items-center px-3 py-1.5 rounded-xl border transition-colors ${
        isDevilMode 
          ? "bg-[#151111] border-red-950/40 text-red-100 focus-within:border-red-500" 
          : "bg-[#100D1A] border-[#DFBA44]/20 text-[#F3EFE0] focus-within:border-[#DFBA44]"
      }`}>
        <Search className={`w-4 h-4 mr-2 ml-2 ${isDevilMode ? 'text-red-500' : 'text-[#DFBA44]'}`} />
        <input 
          type="text" 
          placeholder={language === 'fa' ? 'جستجو در پورتفولیو...' : 'Search portfolio...'}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          className="bg-transparent border-none outline-none text-xs md:text-sm w-full placeholder-neutral-500 font-sans"
          dir="auto"
        />
        {query && (
          <button onClick={() => { setQuery(""); setIsOpen(false); }} className="text-neutral-400 hover:text-white ml-1 mr-1 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && query.trim() && (
        <div className={`absolute top-full mt-2 w-full md:w-[400px] ${language === 'fa' ? 'left-0' : 'right-0'} rounded-xl border p-2 shadow-2xl max-h-[80vh] overflow-y-auto overflow-x-hidden ${
          isDevilMode 
            ? "bg-[#110B0B] border-red-900/40 shadow-red-900/20" 
            : "bg-[#090D11] border-[#DFBA44]/30 shadow-[#DFBA44]/10"
        }`}>
          {/* AI OVERVIEW START */}
          {(isAiLoading || aiSummary) && (
            <div className={`mb-3 p-3 rounded-lg border ${
              isDevilMode ? 'bg-[#150F0F] border-red-500/20' : 'bg-[#121019] border-[#DFBA44]/20'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className={`w-3.5 h-3.5 ${isDevilMode ? 'text-red-500' : 'text-[#DFBA44]'}`} />
                <span className={`text-xs font-semibold uppercase tracking-wider ${isDevilMode ? 'text-red-400' : 'text-[#DFBA44]'}`}>
                  {language === 'fa' ? 'چکیده هوش مصنوعی' : 'AI Summary'}
                </span>
                {isAiLoading && (
                  <Loader2 className={`w-3 h-3 animate-spin ml-auto ${isDevilMode ? 'text-red-500' : 'text-[#DFBA44]'}`} />
                )}
              </div>
              
              <div className="text-xs text-neutral-300 leading-relaxed font-sans" dir="auto">
                {isAiLoading && !aiSummary ? (
                   <span className="animate-pulse">{language === 'fa' ? 'در حال تحلیل داده‌ها...' : 'Analyzing portfolio...'}</span>
                ) : (
                  <div className="markdown-body text-[11px] prose prose-invert prose-p:my-1 prose-ul:my-1 prose-a:text-[#DFBA44]">
                     <Markdown>{aiSummary}</Markdown>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* AI OVERVIEW END */}

          {results.length > 0 ? (
            <div className="space-y-1">
              <div className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 mb-1 ${isDevilMode ? 'text-red-500/50' : 'text-[#DFBA44]/50'}`}>
                {language === 'fa' ? 'نتایج مستقیم' : 'Direct Matches'}
              </div>
              {results.map((result, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(result)}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between group transition-colors cursor-pointer ${
                    isDevilMode ? "hover:bg-red-950/30" : "hover:bg-white/5"
                  }`}
                  dir="auto"
                >
                  <div className="flex flex-col overflow-hidden max-w-[85%] pr-2 pl-2">
                    <span className="text-xs md:text-sm font-bold text-white truncate">{result.title}</span>
                    <span className={`text-[10px] font-mono tracking-wider ${isDevilMode ? 'text-red-400/80' : 'text-[#DFBA44]/80'}`}>
                      {result.subtitle}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ${
                    isDevilMode ? 'text-red-500' : 'text-[#DFBA44]'
                  }`} />
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-neutral-500 text-xs">
              {language === 'fa' ? 'نتیجه‌ای برای عبارات دقیق یافت نشد.' : 'No direct matches found.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
