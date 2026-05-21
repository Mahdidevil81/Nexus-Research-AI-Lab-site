import React, { useState, useEffect } from "react";
import { Database, ChevronRight, Edit2, Check, X } from "lucide-react";

interface Experience {
  role: string;
  company: string;
  period: string;
  highlights: string[];
  linkAffiliation?: string;
  budget?: string;
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  tech: string[];
  description: string;
  stats: { label: string; value: string }[];
  accentColor: string;
}

interface ExperienceChronicleCardProps {
  language: 'fa' | 'en';
  isDevilMode: boolean;
  activeTab: number;
  setActiveTab: (val: number) => void;
  selectedProject: Project;
  setSelectedProject: (val: Project) => void;
  experiences: Experience[];
  projects: Project[];
  onProjectUpdate?: (updatedProject: Project) => void;
}

export default function ExperienceChronicleCard({
  language,
  isDevilMode,
  activeTab,
  setActiveTab,
  selectedProject,
  setSelectedProject,
  experiences,
  projects,
  onProjectUpdate
}: ExperienceChronicleCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editDesc, setEditDesc] = useState("");

  useEffect(() => {
    setEditDesc(selectedProject.description);
    setIsEditing(false); // Reset editing mode when project changes
  }, [selectedProject]);

  return (
    <section 
      id="publications" 
      className={`flex flex-col justify-between bg-[#0B0B0C] border-2 p-5 md:p-6 rounded-2xl h-[530px] relative overflow-hidden backdrop-blur-xl transition-all duration-500 ${
        isDevilMode ? "border-red-600/25 red-glow-border" : "border-[#DFBA44]/25 gold-glow-border"
      }`}
    >
      <div>
        {/* Dual Main Switch: Experiences vs Projects */}
        <div className="flex bg-[#050505] p-1 rounded-xl border border-white/5 mb-3 text-xs font-mono font-bold">
          <button 
            type="button"
            onClick={() => setActiveTab(0)} // Reset to first experience
            className={`flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer ${
              activeTab < 3 
                ? (isDevilMode ? "bg-red-950/40 text-red-100 font-bold" : "bg-[#DFBA44]/15 text-[#DFBA44] font-bold")
                : "text-neutral-500 hover:text-white"
            }`}
          >
            {language === 'fa' ? 'سوابق و کدهای اعتباری اروپا' : 'EU Experience Registry'}
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab(3)} // set to projects view
            className={`flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer ${
              activeTab >= 3 
                ? (isDevilMode ? "bg-red-950/40 text-red-100 font-bold" : "bg-[#DFBA44]/15 text-[#DFBA44] font-bold")
                : "text-neutral-500 hover:text-white"
            }`}
          >
            {language === 'fa' ? 'پروژه‌ها و انتشارات نکسوس' : 'Projects & Publications'}
          </button>
        </div>

        {activeTab < 3 ? (
          /* --- SUB-VIEW A: EXPERIENCES --- */
          <div className="space-y-4">
            {/* Tab Selector for experiences */}
            <div className="flex border-b border-white/10 mb-2 overflow-x-auto whitespace-nowrap scrollbar-none pb-1">
              {experiences.map((exp, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`px-3 py-1 text-xs font-mono font-bold transition-colors relative shrink-0 cursor-pointer ${
                    activeTab === idx 
                      ? (isDevilMode ? 'text-red-500 font-black' : 'text-[#DFBA44] font-black') 
                      : 'text-neutral-500 hover:text-white'
                  }`}
                >
                  {exp.company.split(" ")[0]}
                  {activeTab === idx && (
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${isDevilMode ? "bg-red-500" : "bg-[#DFBA44]"}`} />
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-3 min-h-[220px]">
              <div>
                <span className={`text-[10px] font-mono tracking-wider block uppercase ${isDevilMode ? "text-red-400" : "text-[#C59B27]"}`}>
                  {experiences[activeTab].period}
                </span>
                <h4 className="text-sm font-black text-white uppercase mt-0.5 leading-snug">
                  {experiences[activeTab].role}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#D7D2C4] mt-0.5">
                  <span>@{experiences[activeTab].company}</span>
                  {experiences[activeTab].budget && (
                    <span className={`px-1 py-0.5 rounded text-[8.5px] border ${isDevilMode ? "bg-red-950/20 text-red-400 border-red-500/25" : "bg-[#DFBA44]/15 text-[#DFBA44] border-neutral-800"}`}>
                      {experiences[activeTab].budget}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-1.5">
                {experiences[activeTab].highlights.map((hlt, hIdx) => (
                  <li key={hIdx} className="flex gap-1.5 items-start text-[11px] text-[#D7D2C4]/90 leading-relaxed font-light">
                    <ChevronRight className={`w-3 h-3 mt-0.5 shrink-0 ${isDevilMode ? "text-red-500" : "text-[#DFBA44]"}`} />
                    <span>{hlt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          /* --- SUB-VIEW B: PROJECTS SHOWCASE --- */
          <div className="space-y-3">
            {/* Horizontal scroll select list for PROJECTS */}
            <div className="flex border-b border-white/10 mb-2 overflow-x-auto whitespace-nowrap scrollbar-none pb-1">
              {projects.map((proj, idx) => {
                const localIdx = idx + 3;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(localIdx);
                      setSelectedProject(proj);
                    }}
                    className={`px-3 py-1 text-xs font-mono font-bold transition-colors relative shrink-0 cursor-pointer ${
                      activeTab === localIdx 
                        ? (isDevilMode ? 'text-red-500 font-black' : 'text-[#DFBA44] font-black') 
                        : 'text-neutral-500 hover:text-white'
                    }`}
                  >
                    {proj.title.split(" ")[0]}
                    {activeTab === localIdx && (
                      <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${isDevilMode ? "bg-red-500" : "bg-[#DFBA44]"}`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Project display detail */}
            <div className="space-y-2.5 min-h-[220px]">
              <div>
                <span className={`text-[10px] font-mono tracking-wider block uppercase ${isDevilMode ? "text-red-400" : "text-[#C59B27]"}`}>
                  {selectedProject.subtitle}
                </span>
                <h4 className="text-sm font-black text-white uppercase mt-0.5 leading-snug flex items-center justify-between">
                  <span>{selectedProject.title}</span>
                  {!isEditing && onProjectUpdate && (
                    <button 
                      onClick={() => setIsEditing(true)} 
                      className="text-neutral-500 hover:text-white transition-colors cursor-pointer p-1 rounded-md"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </h4>
              </div>

              {isEditing ? (
                <div className="space-y-2">
                  <textarea 
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className={`w-full bg-[#121214] border rounded-lg px-2 py-1.5 text-[11px] text-white font-light leading-relaxed focus:outline-none transition-colors min-h-[80px] resize-none ${
                       isDevilMode ? "border-red-900/40 focus:border-red-500" : "border-[#DFBA44]/25 focus:border-[#DFBA44]"
                    }`}
                  />
                  <div className="flex gap-2 justify-end">
                    <button 
                      onClick={() => {
                        setIsEditing(false);
                        setEditDesc(selectedProject.description);
                      }}
                      className="px-2 py-1 rounded text-[10px] font-mono border border-neutral-700 text-neutral-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                      Cancel
                    </button>
                    <button 
                      onClick={() => {
                        setIsEditing(false);
                        if (onProjectUpdate) {
                          onProjectUpdate({ ...selectedProject, description: editDesc });
                        }
                      }}
                      className={`px-2 py-1 rounded text-[10px] font-mono border transition-colors flex items-center gap-1 cursor-pointer ${
                         isDevilMode ? "border-red-900 bg-red-950/40 text-red-400 hover:text-red-300" : "border-[#DFBA44]/30 bg-[#DFBA44]/10 text-[#DFBA44] hover:text-white"
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-[#D7D2C4]/90 leading-relaxed font-light">
                  {selectedProject.description}
                </p>
              )}

              {/* Project stats row */}
              <div className="flex gap-2.5 pt-1">
                {selectedProject.stats.map((st, sId) => (
                  <div key={sId} className="bg-black/40 border border-white/5 rounded-lg px-2 py-0.5 text-stone-300">
                    <span className="block text-[8px] uppercase font-mono text-neutral-500">{st.label}</span>
                    <span className={`block text-xs font-mono font-bold ${isDevilMode ? "text-red-400" : "text-[#DFBA44]"}`}>{st.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[10px] font-mono">
        <span>{language === 'fa' ? 'تأییدیه کمیسیون اروپا (کد PIC):' : 'EU Commission Registration ID:'}</span>
        <span className={`px-2 py-0.5 rounded border leading-none font-bold ${isDevilMode ? "bg-red-950/20 text-red-100 border-red-500/20" : "bg-[#DFBA44]/15 text-[#DFBA44] border border-[#DFBA44]/30"}`}>
          865230010
        </span>
      </div>
    </section>
  );
}
