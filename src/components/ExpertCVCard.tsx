import React from "react";
import { User, Briefcase, GraduationCap, Globe, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";

interface ExpertCVCardProps {
  language: 'fa' | 'en';
  isDevilMode: boolean;
}

export default function ExpertCVCard({ language, isDevilMode }: ExpertCVCardProps) {
  return (
    <section 
      id="expert-cv" 
      className={`col-span-1 lg:col-span-2 flex flex-col bg-[#16181C] border p-0 rounded-2xl relative overflow-hidden transition-all duration-500 shadow-2xl ${
        isDevilMode ? "border-red-600/30 shadow-red-900/20" : "border-[#DFBA44]/30 shadow-[#DFBA44]/10"
      }`}
    >
      {/* Fake EU Commission Header */}
      <div className="bg-[#003399] px-4 py-3 flex items-center justify-between border-b border-blue-800">
        <div className="flex items-center gap-4">
          <div className="flex gap-1 shrink-0">
            {/* Simple EU flag representation */}
            <div className="w-12 h-8 bg-[#003399] border border-white/20 flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full border border-yellow-400 border-dotted animate-spin-slow"></div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-white/70 text-[10px] uppercase font-sans tracking-wide">European Commission</div>
            <div className="text-white font-semibold text-lg font-sans">My Expert Area</div>
          </div>
        </div>
        <div className="text-right hidden md:block">
          <div className="text-white/70 text-[10px]">Welcome</div>
          <div className="text-white text-xs font-bold">Mahdi Farahi</div>
          <div className="text-white/50 text-[10px] font-mono">EX2026D1385632</div>
        </div>
      </div>

      <div className="p-5 md:p-8 space-y-6 bg-[#1A1C20] text-gray-300 font-sans">
        
        {/* Profile Header section */}
        <div className="flex items-start gap-4 pb-6 border-b border-white/10">
          <div className="w-12 h-12 rounded-full bg-[#2A303C] flex items-center justify-center text-blue-400 font-bold text-xl shrink-0">
            M
          </div>
          <div className="space-y-3 w-full">
            <h2 className="text-xl md:text-2xl text-white font-light tracking-wide">
              Master's degree Mahdi FARAHI (EX2026D1385632)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm">
              <div className="space-y-1 text-gray-400">
                <p>Born on 27/11/2003</p>
                <p>Nationality: Afghanistan</p>
                <p className="flex flex-col">
                  <span>AfghanistanHerat</span>
                  <span>Herat</span>
                  <span>86G3+RR3</span>
                </p>
              </div>
              <div className="space-y-2 text-sm text-gray-400">
                <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> tamimkhaleeq888@gmail.com</p>
                <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +93798710190</p>
                <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +93799048171</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-light text-white pt-2 mb-4">Modify CV</h3>

        {/* Area of expertise */}
        <div className="border border-[#0066CC] rounded-sm overflow-hidden">
          <div className="bg-[#21252B] px-4 py-3 flex justify-between items-center border-[0.5px] border-l-4 border-[#0066CC]">
            <div className="flex items-center gap-2 text-white font-semibold flex-1">
              Area of expertise <span className="bg-[#0066CC] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full ml-2">6</span>
            </div>
          </div>
          <div className="p-4 bg-[#1A1C20] space-y-3 text-sm text-gray-300">
            <div className="flex justify-between items-center group cursor-pointer">
              <span>(Artificial) neural networks [Ontologies, neural networks, genetic programming, fuzzy logic]</span>
              <ChevronRightIcon />
            </div>
            <div className="flex justify-between items-center group cursor-pointer">
              <span>(human) rights [Political systems and institutions, governance]</span>
              <ChevronRightIcon />
            </div>
            <div className="flex justify-between items-center group cursor-pointer">
              <span>(science) communication [Political systems and institutions, governance]</span>
              <ChevronRightIcon />
            </div>
            <div className="flex justify-between items-center group cursor-pointer">
              <span>Ability to telework [Generic skills]</span>
              <ChevronRightIcon />
            </div>
            <div className="flex justify-between items-center group cursor-pointer">
              <span>Agricultural marketing [Agricultural economics]</span>
              <ChevronRightIcon />
            </div>
            <div className="flex justify-between items-center group cursor-pointer">
              <span>Business and Management [Economics and Business]</span>
              <ChevronRightIcon />
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="border border-[#0066CC] rounded-sm overflow-hidden">
          <div className="bg-[#21252B] px-4 py-3 flex justify-between items-center border-[0.5px] border-l-4 border-[#0066CC]">
            <div className="flex items-center gap-2 text-white font-semibold flex-1">
              Languages <span className="bg-[#0066CC] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full ml-2">2</span>
            </div>
          </div>
          <div className="p-4 bg-[#1A1C20] overflow-x-auto">
            <table className="w-full text-sm text-gray-300 min-w-[500px]">
              <thead>
                <tr className="text-center pb-2">
                  <th className="text-left font-normal text-gray-400"></th>
                  <th className="font-normal text-gray-400 pb-3">Basic</th>
                  <th className="font-normal text-gray-400 pb-3">Intermediate</th>
                  <th className="font-normal text-gray-400 pb-3">Proficient</th>
                  <th className="font-normal text-gray-400 pb-3">Mother Tongue</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/5">
                  <td className="py-3">English</td>
                  <td className="text-center"><RadioIndicator active={false} /></td>
                  <td className="text-center"><RadioIndicator active={false} /></td>
                  <td className="text-center"><RadioIndicator active={true} /></td>
                  <td className="text-center"></td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="py-3">Persian</td>
                  <td className="text-center"><RadioIndicator active={false} /></td>
                  <td className="text-center"><RadioIndicator active={false} /></td>
                  <td className="text-center"><RadioIndicator active={true} /></td>
                  <td className="text-center"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Education */}
        <div className="border border-[#0066CC] rounded-sm overflow-hidden">
          <div className="bg-[#21252B] px-4 py-3 flex justify-between items-center border-[0.5px] border-l-4 border-[#0066CC]">
            <div className="flex items-center gap-2 text-white font-semibold flex-1">
              Education <span className="bg-[#0066CC] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full ml-2">1</span>
            </div>
          </div>
          <div className="p-4 bg-[#1A1C20] text-sm text-gray-300 space-y-2">
            <div className="flex justify-between items-start">
              <h4 className="text-[#3399FF] font-semibold text-base">Mahdi Devil Official</h4>
              <span className="text-gray-400">01/2022</span>
            </div>
            <p className="text-gray-400">Afghanistan</p>
            <p className="text-gray-300 leading-relaxed max-w-3xl">
              Professional Doctoral degree/MD, My best teacher was myself // In the field of coding, being a rapper/designer/web developer/data scientist, my credentials are in my actions and in my brain. Paper cannot describe me, or give me credit
            </p>
          </div>
        </div>

        {/* Employment history */}
        <div className="border border-[#0066CC] rounded-sm overflow-hidden">
          <div className="bg-[#21252B] px-4 py-3 flex justify-between items-center border-[0.5px] border-l-4 border-[#0066CC]">
            <div className="flex items-center gap-2 text-white font-semibold flex-1">
              Employment history <CheckCircle2 className="w-4 h-4 text-[#3399FF] ml-1" />
            </div>
            <div className="text-sm font-semibold text-white">1 years</div>
          </div>
          <div className="p-0 bg-[#1A1C20] text-sm text-gray-300 divide-y divide-white/10">
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <h4 className="text-[#3399FF] font-semibold flex-1 pr-4 leading-relaxed">
                  Nexus - <span className="text-gray-400 font-normal">Data Scientist, Systems Scientist,/In the field of Information Technology, Futuristic Artificial Intelligence Department</span>
                </h4>
                <div className="text-gray-400 text-right shrink-0">
                  03/2026 - /<br/>3 months
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <p>Afghanistan</p>
                  <p className="text-gray-500 mt-4">Private for profit organisation</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Web Design, Systems, Data Scientist/Programmer/Designer</p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <h4 className="text-[#3399FF] font-semibold uppercase flex-1 pr-4">
                  NEXUS ENGINEERING OOD - <span className="text-gray-400 font-normal capitalize">Nexus Research AI Lab/Mahdi farahi</span>
                </h4>
                <div className="text-gray-400 text-right shrink-0">
                  03/2025 - /<br/>1+ years
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <p>Afghanistan</p>
                  <p className="text-gray-500 mt-4">Public Organisation</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Programmer,/Writer/Rapper/Designer/Data Scientist/Web Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0066CC] group-hover:text-blue-400 transition-colors">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}

function RadioIndicator({ active }: { active: boolean }) {
  return (
    <div className={`w-4 h-4 rounded-full border-2 mx-auto ${active ? 'border-white bg-white' : 'border-gray-500'}`}></div>
  );
}
