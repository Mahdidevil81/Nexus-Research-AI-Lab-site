import React from "react";
import { MessageSquare, RefreshCw, Send, ThumbsUp, ThumbsDown } from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  feedback?: 'up' | 'down';
}

interface GeminiChatCardProps {
  language: 'fa' | 'en';
  isDevilMode: boolean;
  messages: Message[];
  inputText: string;
  setInputText: (val: string) => void;
  isChatLoading: boolean;
  quotaExhausted: boolean;
  handleSendMessage: (e?: React.FormEvent, customText?: string) => void;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
  handleFeedback?: (id: string, feedback: 'up' | 'down') => void;
}

export default function GeminiChatCard({
  language,
  isDevilMode,
  messages,
  inputText,
  setInputText,
  isChatLoading,
  quotaExhausted,
  handleSendMessage,
  chatEndRef,
  handleFeedback
}: GeminiChatCardProps) {
  return (
    <section 
      id="news" 
      className={`flex flex-col justify-between bg-[#0B0B0C] border-2 p-5 md:p-6 rounded-2xl h-[610px] relative overflow-hidden backdrop-blur-xl transition-all duration-500 ${
        isDevilMode ? "border-red-600/25 red-glow-border" : "border-[#DFBA44]/25 gold-glow-border"
      }`}
    >
      <div>
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center space-x-2 space-x-reverse">
            <MessageSquare className={`w-5 h-5 ${isDevilMode ? "text-red-500" : "text-[#DFBA44]"}`} />
            <div>
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                {language === 'fa' ? 'بایگانی زنده هوش نکسوس (ژمینی)' : 'Nexus Aware Live Chat Core'}
              </h3>
              <span className={`text-[10px] font-mono ${quotaExhausted ? 'text-amber-400 animate-pulse' : (isDevilMode ? 'text-red-400' : 'text-green-400')}`}>
                STATUS: {quotaExhausted ? 'COMPLIANT_OFFLINE' : 'ONLINE_SECURED_369'}
              </span>
            </div>
          </div>

          <div className="bg-[#121215] border border-neutral-850 px-2 py-0.5 rounded text-[9px] font-mono text-[#DFBA44]">
            GEMINI 3.5
          </div>
        </div>

        {quotaExhausted && (
          <div className="my-2 p-2.5 bg-amber-950/20 border border-amber-500/20 rounded-xl text-[10px] text-amber-200">
            <p><strong>[Billing Quota Alert]</strong> Google AI Studio prepay credits exhausted. Operating on offline local rules.</p>
          </div>
        )}

        {/* Chat Logs Container */}
        <div className="overflow-y-auto space-y-3 my-2.5 h-[310px] pr-1 select-text">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs transition-all duration-300 ${
                msg.role === 'user' 
                  ? (isDevilMode ? 'bg-red-650 text-white rounded-br-none font-medium' : 'bg-[#DFBA44] text-black rounded-br-none font-medium') 
                  : 'bg-[#151517] text-[#D7D2C4] border border-[#C59B27]/15 rounded-bl-none leading-relaxed'
              }`}>
                <p className="whitespace-pre-line text-xs font-light">{msg.text}</p>
              </div>
              <div className="flex items-center gap-2 mt-0.5 px-0.5">
                <span className="text-[8.5px] font-mono text-neutral-500">{msg.timestamp}</span>
                {msg.role === 'assistant' && handleFeedback && (
                  <div className="flex items-center gap-1.5 opacity-60">
                    <button
                      type="button"
                      onClick={() => handleFeedback(msg.id, 'up')}
                      className={`hover:opacity-100 transition-opacity cursor-pointer ${
                        msg.feedback === 'up' 
                          ? (isDevilMode ? 'text-red-500' : 'text-[#DFBA44]') 
                          : 'text-neutral-500'
                      }`}
                      title={language === 'fa' ? 'مفید بود' : 'Helpful'}
                    >
                      <ThumbsUp className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFeedback(msg.id, 'down')}
                      className={`hover:opacity-100 transition-opacity cursor-pointer ${
                        msg.feedback === 'down' 
                          ? (isDevilMode ? 'text-red-500' : 'text-[#DFBA44]') 
                          : 'text-neutral-500'
                      }`}
                      title={language === 'fa' ? 'مفید نبود' : 'Not helpful'}
                    >
                      <ThumbsDown className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isChatLoading && (
            <div className="flex items-center space-x-2 bg-neutral-900/60 border border-neutral-800 p-2 rounded-xl w-fit text-[10px] font-mono">
              <RefreshCw className="w-3 h-3 animate-spin text-[#DFBA44]" />
              <span>محاسبه مجرای کوانتومی نکسوس... Running...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Suggested Queries Chips */}
        <div className="flex flex-wrap gap-1">
          <button 
            type="button"
            onClick={() => handleSendMessage(undefined, "معرفی مهدی فراهی و سوابق او")}
            className="px-2 py-0.5 text-[9px] font-mono rounded bg-neutral-900 border border-neutral-800 text-[#DFBA44]/90 hover:bg-neutral-850 transition-all cursor-pointer"
          >
            {language === 'fa' ? 'مهدی فراهی کیست؟' : 'Who is Mahdi?'}
          </button>
          <button 
            type="button"
            onClick={() => handleSendMessage(undefined, "Explain 3-6-9 golden ratio alignment")}
            className="px-2 py-0.5 text-[9px] font-mono rounded bg-neutral-900 border border-neutral-800 text-[#DFBA44]/90 hover:bg-neutral-850 transition-all cursor-pointer"
          >
            Tesla 369 Meaning
          </button>
          <button 
            type="button"
            onClick={() => handleSendMessage(undefined, "پروژه ۲ میلیون یورویی کشاورزی FARM2FORK چیست؟")}
            className="px-2 py-0.5 text-[9px] font-mono rounded bg-neutral-900 border border-neutral-800 text-[#DFBA44]/90 hover:bg-neutral-850 transition-all cursor-pointer"
          >
            {language === 'fa' ? 'طرح کشاورزی ۲ میلیون یورویی' : 'FARM2FORK Project'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSendMessage} className="flex space-x-2 space-x-reverse pt-2 border-t border-white/5">
        <input 
          type="text"
          value={inputText}
          onChange={(e) => {
            let val = e.target.value;
            // Prevent leading whitespace
            if (val.startsWith(' ')) {
              val = val.trimStart();
            }
            // Prevent excessive whitespace (more than one consecutive space)
            val = val.replace(/\s{2,}/g, ' ');
            setInputText(val);
          }}
          placeholder={language === 'fa' ? 'در مورد سوابق هوش مصنوعی، مانیفست بقا یا کدهای اعتباری اروپا بنویسید...' : 'Ask about European Union PIC, Horizon Europe budget or AWARE protocol...'}
          className={`flex-1 bg-[#121214] border rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors ${
            isDevilMode ? "border-red-900/40 focus:border-red-500" : "border-[#DFBA44]/25 focus:border-[#DFBA44]"
          }`}
        />
        <button 
          type="submit"
          disabled={isChatLoading || !inputText.trim()}
          className={`p-2 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
            isDevilMode 
              ? "bg-red-600 hover:bg-red-500 text-white" 
              : "bg-[#DFBA44] text-[#030303] hover:bg-white"
          } disabled:opacity-40`}
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </section>
  );
}
