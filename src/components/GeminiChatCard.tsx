import React from "react";
import { MessageSquare, RefreshCw, Send, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion } from "motion/react";

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

        {/* Chat Logs Container or Background Logo Screen */}
        <div className="relative overflow-y-auto my-2.5 h-[410px] pr-1 select-text">
          {messages.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-85 z-0 pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative mb-6"
              >
                {/* Circuit Infinity Neo-Eye Background SVG */}
                <svg width="220" height="220" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
                  {/* Glowing Definitions */}
                  <defs>
                    <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={isDevilMode ? "#EF4444" : "#00F0FF"} />
                      <stop offset="100%" stopColor={isDevilMode ? "#991B1B" : "#FF00AA"} />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Outer Orbit Rings */}
                  <circle cx="100" cy="100" r="90" stroke="url(#neonGrad)" strokeWidth="1.5" strokeDasharray="10 4" filter="url(#glow)" opacity="0.6"/>
                  <circle cx="100" cy="100" r="80" stroke="url(#neonGrad)" strokeWidth="0.8" opacity="0.3"/>

                  {/* Circuit Traces */}
                  <path d="M10 100 A90 90 0 0 1 100 10 M190 100 A90 90 0 0 1 100 190" stroke="url(#neonGrad)" strokeWidth="2" strokeLinecap="round" filter="url(#glow)" opacity="0.8"/>
                  <circle cx="100" cy="10" r="4" fill="url(#neonGrad)"/>
                  <circle cx="100" cy="190" r="4" fill="url(#neonGrad)"/>
                  <circle cx="10" cy="100" r="4" fill="url(#neonGrad)"/>
                  <circle cx="190" cy="100" r="4" fill="url(#neonGrad)"/>

                  {/* Eye Shapes in Infinity */}
                  {/* Left Eye */}
                  <path d="M25 100 C 45 70, 75 70, 95 100 C 75 130, 45 130, 25 100 Z" stroke="url(#neonGrad)" strokeWidth="2.5" fill="none" filter="url(#glow)"/>
                  <circle cx="60" cy="100" r="12" stroke="url(#neonGrad)" strokeWidth="2" fill="none"/>
                  <circle cx="60" cy="100" r="4" fill="url(#neonGrad)"/>
                  
                  {/* Inner connection left eye */}
                  <path d="M60 88 A12 12 0 0 1 72 100" stroke="url(#neonGrad)" strokeWidth="1" fill="none" />
                  <path d="M48 100 A12 12 0 0 0 60 112" stroke="url(#neonGrad)" strokeWidth="1" fill="none" />

                  {/* Right Eye */}
                  <path d="M105 100 C 125 70, 155 70, 175 100 C 155 130, 125 130, 105 100 Z" stroke="url(#neonGrad)" strokeWidth="2.5" fill="none" filter="url(#glow)"/>
                  <circle cx="140" cy="100" r="16" stroke="url(#neonGrad)" strokeWidth="1" fill="none" strokeDasharray="3 2"/>
                  <circle cx="140" cy="100" r="10" stroke="url(#neonGrad)" strokeWidth="2" fill="none"/>
                  <circle cx="140" cy="100" r="3" fill="url(#neonGrad)"/>

                  <path d="M124 100 A16 16 0 0 1 140 84" stroke="url(#neonGrad)" strokeWidth="1" fill="none" />

                  {/* Intersecting Infinity Loop Core */}
                  <path d="M95 100 L105 100" stroke="url(#neonGrad)" strokeWidth="3" fill="none" filter="url(#glow)"/>
                  <path d="M90 95 L110 105" stroke="url(#neonGrad)" strokeWidth="1" fill="none" />
                  <path d="M90 105 L110 95" stroke="url(#neonGrad)" strokeWidth="1" fill="none" />

                  {/* Node 9 (Top) */}
                  <polygon points="100,25 115,35 115,50 100,60 85,50 85,35" stroke="url(#neonGrad)" strokeWidth="1.5" fill="none"/>
                  <text x="100" y="47" fill="url(#neonGrad)" fontSize="16" fontFamily="monospace" textAnchor="middle" fontWeight="bold">9</text>
                  <path d="M100 60 L100 80" stroke="url(#neonGrad)" strokeWidth="1.5" fill="none" />
                  <circle cx="100" cy="80" r="2" fill="url(#neonGrad)"/>

                  {/* Node 6 (Bottom) */}
                  <polygon points="100,140 115,150 115,165 100,175 85,165 85,150" stroke="url(#neonGrad)" strokeWidth="1.5" fill="none"/>
                  <text x="100" y="162" fill="url(#neonGrad)" fontSize="16" fontFamily="monospace" textAnchor="middle" fontWeight="bold">6</text>
                  <path d="M100 120 L100 140" stroke="url(#neonGrad)" strokeWidth="1.5" fill="none" />
                  <circle cx="100" cy="120" r="2" fill="url(#neonGrad)"/>
                  
                  {/* Decorative internal circuits */}
                  <path d="M40 70 L60 70 L90 110 L140 110" stroke="url(#neonGrad)" strokeWidth="1.5" fill="none" opacity="0.7"/>
                  <circle cx="40" cy="70" r="3" fill="url(#neonGrad)"/>
                  <circle cx="140" cy="110" r="3" fill="url(#neonGrad)"/>

                  <path d="M160 130 L140 130 L110 90 L60 90" stroke="url(#neonGrad)" strokeWidth="1.5" fill="none" opacity="0.7"/>
                  <circle cx="160" cy="130" r="3" fill="url(#neonGrad)"/>
                  <circle cx="60" cy="90" r="3" fill="url(#neonGrad)"/>
                </svg>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="text-center"
              >
                <div className={`text-[13px] md:text-sm font-mono tracking-[0.25em] uppercase px-4 py-2 mt-4 text-white `}>
                  I am free because I am aware
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="space-y-3 relative z-10 h-full overflow-y-auto">
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
          )}
        </div>
      </div>

      <form onSubmit={handleSendMessage} className="relative mt-2 flex items-center z-10 w-full pt-3">
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
          placeholder={language === 'fa' ? 'ورود به آگاهی نکسوس...' : 'Explore consciousness...'}
          className={`w-full bg-[#121214] border rounded-xl py-2.5 pl-4 pr-12 text-xs text-white placeholder-neutral-500 focus:outline-none transition-all shadow-inner ${
            isDevilMode 
              ? "border-red-900/50 shadow-red-950/20 focus:border-red-500 bg-[#181111]" 
              : "border-[#DFBA44]/25 shadow-black focus:border-[#DFBA44]"
          }`}
        />
        <button 
          type="submit"
          disabled={isChatLoading || !inputText.trim() || quotaExhausted}
          className={`absolute right-2 p-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
            isDevilMode 
              ? "bg-red-950/50 border-red-900/50 text-red-500 hover:text-red-300 hover:bg-red-900 disabled:opacity-40 border" 
              : "bg-[#DFBA44]/10 border-[#DFBA44]/20 text-[#DFBA44] hover:text-[#E8CD71] hover:bg-[#DFBA44]/20 disabled:opacity-40 border"
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </section>
  );
}
