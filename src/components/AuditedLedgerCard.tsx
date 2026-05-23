import React, { useState, useEffect } from "react";
import { FileText, LogOut, CheckCircle, RefreshCw, ExternalLink, CloudRain } from "lucide-react";
import { initAuth, googleSignIn, logout } from "../lib/auth";
import { exportLedgerToGoogleSheets } from "../lib/sheetsService";
import { User } from "firebase/auth";

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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [sheetUrl, setSheetUrl] = useState<string | null>(null);
  const [sheetsError, setSheetsError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    setSheetsError(null);
    setSheetUrl(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setAccessToken(res.accessToken);
      }
    } catch (err: any) {
      setSheetsError(err?.message || "Sign in failed");
    }
  };

  const handleExport = async () => {
    if (!accessToken) {
      setSheetsError("Access token not found. Please log in again.");
      return;
    }
    
    // Explicit User Confirmation before mutating sheets (MANDATORY per skill guidelines)
    const confirmed = window.confirm(
      language === 'fa' 
        ? "آیا از ارسال ترازنامه مالی و تولید سند جدید گوگل شیتز اطمینان دارید؟" 
        : "Are you sure you want to export the audited ledger state and generate a new Google Sheets spreadsheet?"
    );
    if (!confirmed) return;

    setIsExporting(true);
    setSheetsError(null);
    setSheetUrl(null);

    try {
      // Setup dynamic amounts
      const totalAssets = 42000 + customCapitalAmount;
      const formattedBalanceSheet = balanceSheet.map((item) => ({
        ...item,
        valueUsd: item.description.includes("Cash") ? customCapitalAmount : item.valueUsd,
      }));

      const res = await exportLedgerToGoogleSheets(accessToken, formattedBalanceSheet, totalAssets);
      setSheetUrl(res.spreadsheetUrl);
    } catch (err: any) {
      console.error("Sheets export error: ", err);
      setSheetsError(err?.message || "Export failed");
    } finally {
      setIsExporting(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
    setAccessToken(null);
    setSheetUrl(null);
    setSheetsError(null);
  };

  return (
    <section 
      id="deliverables" 
      className={`flex flex-col justify-between bg-[#0B0B0C] border-2 p-5 md:p-6 rounded-2xl min-h-[610px] relative overflow-hidden backdrop-blur-xl transition-all duration-500 ${
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
            <span className="text-neutral-400 uppercase">{language === 'fa' ? 'بازمحاسبه مخازن سرمایه نقدی کل' : 'RECALCULATE LIQUID CAPITAL RESERVES'}</span>
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

        {/* Google Sheets Live Core Integration Panel */}
        <div className={`border p-3.5 rounded-xl space-y-2.5 mb-3 bg-black/40 ${
          isDevilMode ? "border-red-900/30 text-red-100" : "border-[#DFBA44]/20 text-neutral-200"
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-[9px] font-mono tracking-widest uppercase flex items-center gap-1 font-bold ${
              isDevilMode ? "text-red-400" : "text-[#DFBA44]"
            }`}>
              <svg className="w-3.5 h-3.5 shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-7 14H7v-2h5zm5-4H7v-2h10zm0-4H7V7h10z" />
              </svg>
              {language === 'fa' ? 'اتصال هوشمند گوگل شیتس' : 'GOOGLE SHEETS INTEGRATION'}
            </span>
            <span className="text-[8px] font-mono text-neutral-500 uppercase">ACTIVE PROTOCOL</span>
          </div>

          {!currentUser ? (
            <div className="space-y-2">
              <p className="text-[10px] text-neutral-400 leading-normal font-sans font-light">
                {language === 'fa' 
                  ? 'برای همگام‌سازی، رمزگذاری و تایید مستقیم ترازنامه مالی حسابرسی شده در اسناد اختصاصی گوگل شیتس خود، وارد سیستم شوید.'
                  : 'Establish a secure link with your Google Drive and export real-time ledger records straight into an authorized spreadsheet.'}
              </p>
              
              <button
                onClick={handleGoogleSignIn}
                className={`w-full py-2 px-3 border rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                  isDevilMode 
                    ? 'border-red-900 bg-red-950/20 text-red-400 hover:bg-red-950/40 hover:border-red-500' 
                    : 'border-[#DFBA44]/40 bg-[#DFBA44]/5 text-[#DFBA44] hover:bg-[#DFBA44]/15 hover:border-[#DFBA44]'
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                {language === 'fa' ? 'ورود با حساب گوگل جهت همگام‌سازی' : 'SIGN IN WITH GOOGLE'}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono bg-black/50 p-2 rounded-xl border border-neutral-800/60">
                <span className="truncate text-neutral-300">
                  {language === 'fa' ? 'حساب کاربری فعال:' : 'Active Connection:'} <strong className="text-white select-all">{currentUser.email}</strong>
                </span>
                <button
                  onClick={handleLogout}
                  className="p-1 hover:text-red-400 transition-colors cursor-pointer"
                  title={language === 'fa' ? 'خروج' : 'Log out'}
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className={`flex-1 py-1.5 rounded-xl font-mono text-xs font-bold transition-all duration-300 border flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDevilMode
                      ? 'bg-red-950/30 border-red-900/50 text-red-400 hover:bg-red-950/50 hover:border-red-500'
                      : 'bg-[#DFBA44]/10 border-[#DFBA44]/30 text-[#DFBA44] hover:bg-[#DFBA44]/25 hover:border-[#DFBA44]'
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isExporting ? 'animate-spin' : ''}`} />
                  {isExporting 
                    ? (language === 'fa' ? 'در حال همگام‌سازی...' : 'SYNCING...') 
                    : (language === 'fa' ? 'ارسال ترازنامه به گوگل شیتس' : 'EXPORT TO GOOGLE SHEETS')}
                </button>

                {sheetUrl && (
                  <a
                    href={sheetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex-1 py-1.5 rounded-xl font-mono text-xs font-bold text-center border flex items-center justify-center gap-1 bg-emerald-950/20 border-emerald-500/40 text-emerald-400 hover:bg-emerald-950/30 transition-all`}
                  >
                    <span>{language === 'fa' ? 'بازکردن سند' : 'OPEN SHEET'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          )}

          {sheetsError && (
            <div className="text-[9.5px] font-mono p-2 rounded bg-red-950/20 text-red-400 border border-red-500/20">
              {sheetsError}
            </div>
          )}
        </div>
      </div>

      <div className={`p-2 rounded-lg border flex items-center justify-between mt-2 ${
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
