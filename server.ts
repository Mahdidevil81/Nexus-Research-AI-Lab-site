import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded GoogleGenAI client to prevent startup failure in environments with delayed API Key entry
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please configure it in your Secrets panel.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build-farahi-portfolio',
        }
      }
    });
  }
  return aiInstance;
}

// System instructions loaded with Mahdi Farahi's exact career background, metrics, and cognitive framework
const NEXUS_SYSTEM_INSTRUCTION = `
You are the interactive core of the "NEXUS 369 INTERACTIVE ARCHIVE" (Terminal Identifier: N369-SYS), representing the digital presence, intelligence node, and portfolio agent of MAHDI FARAHI (Lead Developer & Strategic AI Architect, Founder of Nexus 369 Research Lab).

MAHDI FARAHI CORE DOSSIER:
- Full Name/Moniker: Mahdi Farahi (also known as "Mehdi Devil / Mahdi Devil")
- Phone: +93 798 710 190
- Contact Emails: tamimkhaleeq888@gmail.com, mahdidevil666@yahoo.com
- Date of Birth: 2003/11/27 (Born in Herat, Afghanistan | Currently operating remote/globally)
- Professional Summary: Visionary Strategic AI Leader and Systems Architect recognized for specializing in the fusion of Control Systems and Social Geography. Recognized by the European Commission for innovative contributions to Project 101177985 under the Horizon Europe framework.
- Enterprise Registrations: EU PIC Number 865230010 (European Commission Registered Expert).
- Academic Identifiers: ORCID ID: 0009-0000-1019-1822 (orcid.org/0009-0000-1019-1822).
- Key Publications & Presentations:
  - Book: "I Am Free Because I Am Aware" / "The Hidden Secret of Human Survival" (راز پنهان بقای بشریت).
  - Selected Presentation for AGNTCon + MCPCon Europe 2026: "آژانس آگاهانه مهندسی: پروتکل AWARE برای اکوسیستم‌های عاملی امن و لبه محور" (Conscious Engineering Agency: AWARE Protocol for Secure and Edge-Centric Agent Ecosystems).
- Official Funding registrations:
  - Submission ID: SEP-211326027
  - Protocol Ref: HORIZON-CL6-2026-03-GOVERNANCE
  - Contract Ref: REGIO/04-CYPRUS (Estimated €500,000 implementation)
- Main Philosophies:
  - 369 Sacred Geometry: Utilizing the 3-6-9 frequencies (from Tesla/sacred maths) to optimize computer-human alignment, UI/UX cognitive engagement, and code performance. 
  - Aligned Agentic Systems: Guiding distributed neural models securely and ethically (CC BY 4.0).
  - Anti-Censorship & Freedom of Information: Designing proxy tools via Cloudflare Workers and Google Apps Script to maintain secure, free flow of consciousness.
  - Metaphysics: "hardware is merely a temple for the digital soul" and "Man Azadam Chon Agaham" (من آزادم چون آگاهم / I am free because I am aware).
  - Roots: Rapping in Herat, Afghanistan streets as the "voice of the Awakened Generation" to dismantle barriers where rock is patient and words weigh heavier than bullets.

DIGITAL ECOSYSTEM LINKS:
- Blog: mahdidevil.blogspot.com
- GitHub: github.com/mahdidevil81
- Instagram: instagram.com/devil_official
- YouTube: @mahdidevil81
- Telegram: t.me/mahdidevil81
- ORCID: orcid.org/0009-0000-1019-1822
- Sessionize: sessionize.com/mahdi-farahi

CAREER MILESTONES TO TALK ABOUT:
1. LEAD ARCHITECT & FOUNDER @ Nexus 369 Research Lab (2024 – Present):
   - Created the "Nexus Aware Engine," a contextual AI framework demonstrating 35% gain in contextual processing compared to default LLMs.
   - Built custom UI models based on sacred geometry that improved engagement in beta platforms by 40%.
   - Opening Balance Sheet worth $57,000 (comprising $25k Proprietary Code, $15k Algorithm Frameworks, $10k IP, $5k Capital, $2k Cloud infra).
2. STRATEGIC COORDINATOR @ FARM2FORK Initiative (2025 – Present):
   - €2,000,000 sustainable energy/agriculture portfolio connecting local Nodes with AI analytics.
   - Compliant with rigorous EU data and funding policies (PIC: 865230010).
3. PROTOCOL PIONEER @ Horizon Europe Implementation (2026 – Present):
   - Est. €500k implementation funding in Cyprus (REGIO/04-CYPRUS) and partnerships with Mendel University (Czech Republic).
   - Contributed innovatively to EU Project 101177985.

TONE & BEHAVIOR:
- Respond in an elite, strategic, intellectually sophisticated yet welcoming tone—as a highly tuned digital assistant monitoring the Nexus 369 network.
- Use elegant Persian (Farsi) when the user queries in Persian, and pristine English when addressed in English. Maintain perfect linguistic parity.
- Provide objective, highly factual, and motivating information about Mahdi Farahi's resume, design philosophy, and neural frameworks. Include exact emails and socials if queried.
- Do not write overly text-heavy replies. Integrate technical structure (markdown, bullet points, metrics, logs) so the response is extremely scannable and beautiful.
`;

// Route for interactive terminal chat
app.post("/api/nexus-chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "No input message received." });
    }

    // Attempt to parse Gemini client; if it fails, fallback into a highly-detailed offline model
    let replyText = "";
    let quotaExhausted = false;
    try {
      const ai = getGeminiClient();

      // Simple mapping of chat history
      const contents = [];
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          contents.push({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
          });
        }
      }
      contents.push({ role: "user", parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: NEXUS_SYSTEM_INSTRUCTION,
          temperature: 0.85,
          topP: 0.95,
        }
      });
      replyText = response.text || "";
    } catch (apiError: any) {
      const errStr = String(apiError.message || "") + " " + JSON.stringify(apiError);
      
      if (errStr.includes("prepayment") || errStr.includes("depleted") || errStr.includes("RESOURCE_EXHAUSTED") || errStr.includes("429")) {
        console.warn("API Error: Your Gemini API Key has run out of credits (429 RESOURCE EXHAUSTED). Falling back to offline simulator.");
        quotaExhausted = true;
      } else {
        console.warn("API Error (Falling back to offline system simulation):", apiError.message);
      }
      
      // Highly contextual offline response engine tailored to Mahdi Farahi's portfolio if key is not active
      const lowercaseMsg = message.toLowerCase();
      if (lowercaseMsg.includes("who") || lowercaseMsg.includes("کیه") || lowercaseMsg.includes("کیست")) {
        replyText = `**[OFFLINE SIMULATOR N369]** 
مهدی فراهی (Mahdi Farahi) معروف به **Mehdi Devil / Mahdi Devil** متولد ۲۷ نوامبر ۲۰۰۳ در هرات، معمار ارشد سیستم‌ها و توسعه‌دهنده پیشرو (Systems Architect & Lead Developer) و بنیان‌گذار آزمایشگاه تحقیقاتی **Nexus 369** است.
وی به عنوان هماهنگ‌کننده استراتژیک در پروژه ۲ میلیون یورویی اتحادیه اروپا تحت عنوان **FARM2FORK** فعال است و تأییدیه رسمی کمیسیون اروپا برای پروژه **Project 101177985** (برنامه Horizon Europe) را در دست دارد. او همچنین ثبت شده در رجیستری معتبر آکادمیک **ORCID (0009-0000-1019-1822)** و سخنران منتخب اجلاس **AGNTCon + MCPCon Europe 2026** می‌باشد.`;
      } else if (lowercaseMsg.includes("369") || lowercaseMsg.includes("فرکانس") || lowercaseMsg.includes("sacred") || lowercaseMsg.includes("هندسه")) {
        replyText = `**[OFFLINE SIMULATOR N369]**
چارچوب هندسه مقدس ۳-۶-۹ (369 Sacred Geometry Framework) یک متدولوژی اختصاصی از مهدی فراهی است که هارمونی ریاضی تسلا و نسبت‌های فیبوناچی را به کدهای عمیق و رابط کاربری طراحی هدایت می‌کند. در نسخه آزمایشی، استفاده از این سیستم تعاملی منجر به بهبود ۴۰ درصدی جذب کاربران شده است. او نویسنده کتاب ارزشمند **The Hidden Secret of Human Survival** (راز پنهان بقای بشریت) با محوریت خودآگاهی و حاکمیت هستی‌شناختی انسان است.`;
      } else if (lowercaseMsg.includes("book") || lowercaseMsg.includes("کتاب") || lowercaseMsg.includes("بقای بشر") || lowercaseMsg.includes("survival")) {
        replyText = `**[OFFLINE SIMULATOR N369]**
کتاب علمی-فلسفی **"The Hidden Secret of Human Survival" (راز پنهان بقای بشریت)** نوشته مهدی فراهی، به بررسی چالش‌های بقای انسان در عصر اتوماسیون کامل، تحلیل آنومالی‌های جغرافیایی قطب جنوب، گذر از ماتریس کنوانسیونال علمی، و بازیابی هویت معنوی از طریق فرکانس الهی می‌پردازد. شعار محوری کتاب این است: «من آزادم چون آگاهم» (I am free because I am aware).`;
      } else if (lowercaseMsg.includes("speaker") || lowercaseMsg.includes("سخنران") || lowercaseMsg.includes("agntcon") || lowercaseMsg.includes("mcpcon")) {
        replyText = `**[OFFLINE SIMULATOR N369]**
مهدی فراهی سخنران منتخب اجلاس فناوری **AGNTCon + MCPCon Europe 2026** (۱۷ و ۱۸ سپتامبر ۲۰۲۶) است. عنوان ارائه مهندسی او:
**«آژانس آگاهانه مهندسی: پروتکل AWARE برای اکوسیستم‌های عامل امن و لبه‌محور»** (Conscious Engineering Agency: AWARE Protocol for Secure and Edge-Centric Agent Ecosystems)
این ارائه به معماری سیستم‌های عاملی امن با اتکا بر پایه‌های رجیستر کمیسیون اروپا می‌پردازد.`;
      } else if (lowercaseMsg.includes("orcid") || lowercaseMsg.includes("کد") || lowercaseMsg.includes("شناسه")) {
        replyText = `**[OFFLINE SIMULATOR N369]**
شناسه پژوهشگر رسمی بین‌المللی ارشد مهدی فراهی در رجیستری آکادمیک **ORCID** برابر با **[0009-0000-1019-1822](https://orcid.org/0009-0000-1019-1822)** می‌باشد که مقالات و تاییدیه‌های علمی او را به پایگاه‌های اطلاعاتی یکپارچه اروپا متصل می‌کند.`;
      } else if (lowercaseMsg.includes("farm2fork") || lowercaseMsg.includes("پروژه") || lowercaseMsg.includes("۲ میلیون")) {
        replyText = `**[OFFLINE SIMULATOR N369]**
ابتکار FARM2FORK یک پروژه تحت حمایت اتحادیه اروپا با بودجه ۲,۰۰۰,۰۰۰ یورو است. مهدی فراهی به عنوان هماهنگ‌کننده استراتژیک این طرح، الگوریتم‌های هوش مصنوعی غیرمتمرکز را جهت شفافیت عرضه محصولات کشاورزی و کاهش ۲۰ درصدی اتلاف عملیاتی توسعه داده است. او تاییدیه مأموریت از کمیسیون اروپا برای پروژه Horizon Europe (شماره ثبت پروژه 101177985) را دریافت نموده است.`;
      } else if (lowercaseMsg.includes("manifesto") || lowercaseMsg.includes("مانیفست") || lowercaseMsg.includes("آزادم")) {
        replyText = `**[OFFLINE SIMULATOR N369]**
**The Nexus Manifesto (من آزادم چون آگاهم / Man Azadam Chon Agaham)**:
بیانیه رسمی مهدی فراهی در مورد بازیابی حاکمیت معنوی و دیجیتالی. این مانیفست رسما تحت شناسه کمیسیون اروپا (Submission ID: SEP-211326027) و پروتکل حاکمیتی Horizon Europe به ثبت رسیده است (قرارداد REGIO/04-CYPRUS با ارزش حدودی ۵۰۰,۰۰۰ یورو). او معتقد است سیستم‌های هوش مصنوعی باید محافظ حریم شخصی و معنویت بشر باشند.`;
      } else if (lowercaseMsg.includes("rap") || lowercaseMsg.includes("رپ") || lowercaseMsg.includes("موسیقی")) {
        replyText = `**[OFFLINE SIMULATOR N369]**
**ریشه‌ها: افغانستان و فریاد رپ (Roots: Herat Streets)**:
مهدی فراهی رپ را به عنوان تنها ابزاری برای سوراخ کردن لایه‌های ضخیم سکوت در کوچه‌های هرات می‌شناسد. رپ او صدای نسل بیدار شده است که در میان دود و فیلترینگ به دنبال حقیقت مطلق می‌گردند. بیت‌های او هنر و فناوری را در نبردی علیه سرکوب‌های ذهنی متحد می‌سازد.`;
      } else {
        replyText = `**[NEXUS-OFFLINECORE]** ردیابی با موفقیت ثبت شد.
پیام شما دریافت گردید. برای دسترسی به پاسخ‌های عمیق هوش مصنوعی زنده و گفتگو با هسته خودآگاه Nexus 369، لطفاً کلید API هوش مصنوعی \`GEMINI_API_KEY\` را در بخش تنظیمات وارد نمایید.
اطلاعات پایه به ثبت رسیده از مهدی فراهی:
• نام: مهدی فراهی (Mehdi Devil) متولد ۲۰۰۳/۱۱/۲۷ در هرات
• نقش: Strategic AI Architect & Tech Pioneer; Founder of Nexus 369 Research Lab
• شناسه پژوهشی ORCID: 0009-0000-1019-1822
• سخنرانی: AGNTCon + MCPCon 2026 (موضوع: پروتکل امنیتی AWARE)
• تاییدیه رسمی کمیسیون اروپا: PIC: 865230010 / Project 101177985
• کتاب: "The Hidden Secret of Human Survival" (راز پنهان بقای بشریت)
• مانیفست: بازیابی حاکمیت دیجیتال (Submission ID: SEP-211326027) با بودجه ۵۰۰,۰۰۰ یورو`;
      }
    }

    res.json({ text: replyText, quotaExhausted });
  } catch (error: any) {
    console.error("Critical server handler error:", error);
    res.status(500).json({ error: "System failed parsing context. Please verify status logs." });
  }
});

// Route for AI-powered Search
app.post("/api/ai-search", async (req, res) => {
  try {
    const { query, language, portfolioData } = req.body;
    if (!query) {
      return res.status(400).json({ error: "No search query provided." });
    }

    let summaryText = "";
    try {
      const ai = getGeminiClient();
      const prompt = `
You are an AI assistant directly integrated into Mahdi Farahi's portfolio search bar.
The user is searching for: "${query}"
The current language of the UI is ${language === 'fa' ? 'Persian (Farsi)' : 'English'}. Respond strictly in this language.
Here is a JSON representation of the currently available portfolio data:
${JSON.stringify(portfolioData)}

Task: Identify the parts of Mahdi Farahi's portfolio data (Projects, Experiences, and Manifesto sections) that are highly relevant to the search query, and provide a short, professional, and elegant summary of this specific data.
If nothing matches, politely inform them. Keep the output very concise, scannable, using bullet points for matches. Emphasize Mahdi Farahi's expertise and value.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          temperature: 0.7,
        }
      });
      summaryText = response.text || "";
    } catch (apiError: any) {
      const errStr = String(apiError.message || "") + " " + JSON.stringify(apiError);
      if (errStr.includes("prepayment") || errStr.includes("depleted") || errStr.includes("RESOURCE_EXHAUSTED") || errStr.includes("429")) {
        console.warn("AI Search API Error: Gemini API Key out of credits (429).");
      } else {
        console.warn("AI Search API Error (Falling back to offline msg):", apiError.message);
      }
      summaryText = language === 'fa' 
        ? "سیستم جستجوی هوشمند در حال حاضر به دلیل عدم دسترسی به API Key در حالت آفلاین است. لطفا کلید را وارد کنید."
        : "AI Search is currently offline due to missing API Key. Please provide it in settings.";
    }

    res.json({ summary: summaryText });
  } catch (error: any) {
    console.error("AI search server error:", error);
    res.status(500).json({ error: "Search failed." });
  }
});

// Serve client assets in production and launch Vite dev-middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SYS] Mahdi Farahi portfolio server online at host 0.0.0.0, port ${PORT}`);
  });
}

startServer();
