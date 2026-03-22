"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Droplets, Thermometer, DollarSign, TrendingUp, AlertTriangle, Zap, BarChart3, ShieldCheck } from "lucide-react";

/* ── Preset questions & responses ── */
const presets = [
  {
    icon: Droplets,
    label: "Water Usage",
    question: "What's our current water consumption and how does it compare to baseline?",
    answer: "Your facility has consumed **128,400 gallons** this month, tracking **12% below baseline**.\n\nBreakdown by zone:\n- Zone A: 42,100 gal (33%) — Primary cooling loop\n- Zone B: 18,200 gal (14%) — Reduced due to maintenance\n- Zone C: 51,800 gal (40%) — GPU cluster cooling\n- Zone D: 16,300 gal (13%) — Auxiliary systems\n\nAt this rate, you'll save approximately **384,000 gallons** by end of quarter — a **38% reduction YoY**. This puts you on track for top-decile water efficiency among hyperscale facilities.",
  },
  {
    icon: AlertTriangle,
    label: "Zone B Status",
    question: "What's happening with Zone B? I see a warning alert.",
    answer: "Zone B is currently flagged with an elevated temperature warning.\n\n**Root Cause Analysis:**\nSensor SN-9023 has been reporting temperatures of **28.5°C** (threshold: 26°C) for the past 72 hours. Cross-referencing with flow data from SN-9034 shows a **37% reduction** in flow rate through the condenser loop.\n\n**Most Likely Cause:**\nPartially blocked filter in the return line — sediment buildup detected based on pressure differential readings (ΔP = 1.8 bar vs. normal 0.6 bar).\n\n**Recommended Actions:**\n1. Schedule filter replacement within 48 hours\n2. Temporarily increase flow to compensate (add 0.4 L/s)\n3. Monitor SN-9029 (currently offline) — may be related\n\nEstimated cost of inaction: **$2,400/week** in excess water usage.",
  },
  {
    icon: DollarSign,
    label: "Cost Savings",
    question: "How much money are we saving with Droplet optimization?",
    answer: "Here's your financial impact summary:\n\n**This Quarter:**\n- Water cost savings: **$47,200**\n- Energy savings (reduced pumping): **$12,800**\n- Avoided downtime value: **$95,000**\n- Total Q1 impact: **$155,000**\n\n**Projected Annual Savings:** $489,000\n\n**Biggest Contributors:**\n1. Zone A flow optimization — reduced waste by 31% ($18,400/quarter)\n2. AI-driven cooling adjustments — 847 micro-adjustments saving 2.1% energy\n3. Predictive maintenance — caught 3 potential failures before they caused outages\n\n**ROI on Droplet deployment:** 340% in first year. Payback period was reached in **4.2 months**.",
  },
  {
    icon: TrendingUp,
    label: "Predict Next Month",
    question: "What does next month look like? Any concerns I should prepare for?",
    answer: "Based on seasonal patterns, GPU utilization forecasts, and historical data:\n\n**April 2026 Predictions:**\n- Expected cooling demand: **+15%** vs. March\n- Projected water consumption: **147,000 gallons** (+14.5%)\n- Temperature baseline shift: +1.2°C ambient\n\n**Key Concerns:**\n1. Zone C will need additional capacity — recommend pre-emptively increasing flow by **1.2 L/s** before April 8\n2. Cooling tower evaporation losses will increase ~18% due to warmer ambient temps\n3. Two sensors (SN-9028, SN-9033) are approaching calibration due dates\n\n**Proactive Recommendations:**\n- Stage replacement filters for all zones\n- Schedule Zone B maintenance before the demand increase\n- Consider activating the standby chiller for Zone C\n\nConfidence level: **89%** based on 14 months of operational data.",
  },
  {
    icon: Zap,
    label: "PUE & Efficiency",
    question: "How efficient is our facility? What's our PUE trend?",
    answer: "Your facility is performing in the **top quartile** for AI training data centers.\n\n**Current Metrics:**\n- PUE: **1.12** (industry avg: 1.58)\n- WUE: **0.8 L/kWh** (industry avg: 1.8 L/kWh)\n- Cooling effectiveness: **94%**\n\n**7-Day PUE Trend:**\nMon: 1.14 → Tue: 1.13 → Wed: 1.15 → Thu: 1.12 → Fri: 1.12 → Sat: 1.11 → Sun: 1.12\n\n**AI Optimization Impact:**\nThe engine has made **847 micro-adjustments** this month:\n- 312 flow rate optimizations\n- 198 temperature setpoint adjustments\n- 204 pump speed modulations\n- 133 valve position changes\n\nThese contributed to a **6% efficiency improvement** this month. Without AI optimization, your PUE would be approximately **1.19**.",
  },
  {
    icon: BarChart3,
    label: "Weekly Report",
    question: "Give me a summary of this week's performance.",
    answer: "**Weekly Performance Summary — March 16-22, 2026**\n\n**Overall Status:** Operational with 1 active warning\n\n**Water:**\n- Total consumed: 31,200 gallons (↓8% vs. last week)\n- Peak hour: Tuesday 14:00 (6.1 L/s)\n- Lowest: Sunday 04:00 (2.8 L/s)\n\n**Efficiency:**\n- Avg PUE: 1.127 (↓0.008 improvement)\n- Best day: Saturday (1.11)\n- AI optimizations: 214 adjustments\n\n**Alerts:**\n- 1 active: Zone B temperature warning (72h)\n- 2 resolved: SN-9025 sync delay, Zone D pressure spike\n- 0 critical\n\n**Nodes:**\n- 42 online, 1 offline (SN-9029), 2 in warning state\n- Uptime: 99.7%\n\n**Cost Impact:**\n- Saved $3,800 vs. non-optimized baseline\n- Projected monthly: $16,200\n\n**Action Items:**\n1. Address Zone B filter issue (priority: high)\n2. Investigate SN-9029 offline status\n3. Schedule Q2 sensor calibration batch",
  },
  {
    icon: ShieldCheck,
    label: "Compliance",
    question: "Are we compliant with EPA water standards?",
    answer: "**EPA Compliance Status: COMPLIANT** ✓\n\n**Current Certifications:**\n- EPA Water Sense Partner — Active\n- Clean Water Act §316(b) — Compliant\n- State Water Board Permit — Valid through Dec 2027\n\n**Key Metrics vs. Requirements:**\n- Discharge temperature: 32°C (limit: 35°C) ✓\n- Chemical treatment levels: Within bounds ✓\n- Monthly consumption reporting: Auto-filed ✓\n- Discharge volume: 89% of intake (limit: 95%) ✓\n\n**Upcoming Requirements:**\n- Q2 discharge water quality test — due April 15\n- Annual water audit submission — due June 30\n- SB-1383 organic waste diversion report — due July 1\n\n**Risk Areas:**\n- Zone B elevated temperatures are approaching the discharge limit. If not resolved within 2 weeks, discharge temp could exceed 34°C during peak load.\n- Recommendation: resolve Zone B filter issue to maintain 3°C+ margin.\n\nAll compliance documents are auto-generated and available in Reports.",
  },
  {
    icon: Thermometer,
    label: "Temperature Map",
    question: "Show me the temperature analysis across all zones.",
    answer: "**Facility Temperature Analysis — Real-Time**\n\n**Zone A (Primary Cooling):**\n- Inlet: 15.2°C | Outlet: 22.1°C | ΔT: 6.9°C\n- Status: Normal — optimal heat transfer\n- Sensors: SN-9021 (22.1°C), SN-9022 (23.4°C), SN-9028 (18.3°C), SN-9032 (20.4°C)\n\n**Zone B (Secondary / Return):**\n- Inlet: 18.0°C | Outlet: 28.5°C | ΔT: 10.5°C ⚠️\n- Status: WARNING — ΔT exceeds 8°C threshold\n- Sensors: SN-9023 (28.5°C ⚠️), SN-9029 (Offline), SN-9034 (27.8°C ⚠️)\n\n**Zone C (GPU Cluster):**\n- Inlet: 18.5°C | Outlet: 25.0°C | ΔT: 6.5°C\n- Status: Normal — highest throughput zone\n- Sensors: SN-9024 (25.0°C), SN-9025 (24.2°C), SN-9030 (23.7°C), SN-9031 (26.1°C)\n\n**Zone D (Auxiliary):**\n- Inlet: 16.0°C | Outlet: 21.8°C | ΔT: 5.8°C\n- Status: Normal — most efficient zone\n- Sensors: SN-9026 (21.8°C), SN-9027 (22.0°C), SN-9033 (22.5°C)\n\n**Recommendation:** Zone B requires immediate attention. The elevated ΔT indicates restricted flow causing insufficient heat dissipation.",
  },
];

/* ── Typewriter hook ── */
function useTypewriter(text: string, speed: number = 12, active: boolean = false) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) { setDisplayed(""); setDone(false); return; }
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(interval); setDone(true); }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, active]);

  return { displayed, done };
}

/* ── Formatted AI text renderer ── */
function FormattedText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-2" />;

        // Bold markers
        let formatted = line;
        const parts: React.ReactNode[] = [];
        const regex = /\*\*(.*?)\*\*/g;
        let lastIndex = 0;
        let match;
        let keyIdx = 0;

        while ((match = regex.exec(formatted)) !== null) {
          if (match.index > lastIndex) {
            parts.push(<span key={`t${keyIdx++}`}>{formatted.slice(lastIndex, match.index)}</span>);
          }
          parts.push(<span key={`b${keyIdx++}`} className="font-semibold text-[#F0F4F8]">{match[1]}</span>);
          lastIndex = match.index + match[0].length;
        }
        if (lastIndex < formatted.length) {
          parts.push(<span key={`e${keyIdx++}`}>{formatted.slice(lastIndex)}</span>);
        }

        // Bullet points
        if (line.trim().startsWith("- ")) {
          return (
            <div key={i} className="flex gap-2 pl-2">
              <span className="text-[#00BFFF] mt-1 shrink-0">&#8226;</span>
              <span>{parts}</span>
            </div>
          );
        }
        // Numbered items
        if (/^\d+\./.test(line.trim())) {
          return (
            <div key={i} className="flex gap-2 pl-2">
              <span className="text-[#00BFFF] shrink-0 font-semibold">{line.trim().match(/^\d+/)?.[0]}.</span>
              <span>{parts.length > 0 ? parts : line.trim().replace(/^\d+\.\s*/, "")}</span>
            </div>
          );
        }

        return <p key={i}>{parts.length > 0 ? parts : line}</p>;
      })}
    </div>
  );
}

/* ── Main page ── */
export default function AskDropletAIPage() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [typingPhase, setTypingPhase] = useState<"idle" | "thinking" | "typing">("idle");
  const [customQuery, setCustomQuery] = useState("");
  const [conversation, setConversation] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [typingText, setTypingText] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [conversation, typingText, scrollToBottom]);

  /* Handle clicking a preset button */
  const handlePreset = (index: number) => {
    if (typingPhase !== "idle") return;
    const preset = presets[index];
    setActiveQuestion(index);

    // Add user message
    setConversation(prev => [...prev, { role: "user", text: preset.question }]);
    setTypingPhase("thinking");

    // Simulate thinking delay
    setTimeout(() => {
      setTypingPhase("typing");
      // Start typewriter
      let i = 0;
      const text = preset.answer;
      setTypingText("");
      setTypingDone(false);
      const interval = setInterval(() => {
        i += 2; // 2 chars at a time for speed
        setTypingText(text.slice(0, Math.min(i, text.length)));
        if (i >= text.length) {
          clearInterval(interval);
          setTypingDone(true);
          // Finalize into conversation
          setTimeout(() => {
            setConversation(prev => [...prev, { role: "ai", text: text }]);
            setTypingText("");
            setTypingPhase("idle");
            setActiveQuestion(null);
          }, 300);
        }
      }, 10);
    }, 1500);
  };

  /* Handle custom query (maps to closest preset) */
  const handleCustomSend = () => {
    if (!customQuery.trim() || typingPhase !== "idle") return;
    const q = customQuery.toLowerCase();
    setCustomQuery("");

    // Find best matching preset
    let bestIdx = 0;
    const keywords: Record<number, string[]> = {
      0: ["water", "usage", "consumption", "gallons", "how much"],
      1: ["zone b", "warning", "alert", "temperature", "anomal", "issue"],
      2: ["cost", "money", "saving", "dollar", "roi", "financial"],
      3: ["predict", "forecast", "next month", "future", "prepare"],
      4: ["pue", "efficien", "performance", "optim"],
      5: ["week", "summary", "report", "overview"],
      6: ["complian", "epa", "regulat", "certif", "legal"],
      7: ["temp", "heat", "thermal", "map", "sensor"],
    };

    let bestScore = 0;
    for (const [idx, words] of Object.entries(keywords)) {
      const score = words.filter(w => q.includes(w)).length;
      if (score > bestScore) { bestScore = score; bestIdx = parseInt(idx); }
    }

    // Add user message with their actual text
    setConversation(prev => [...prev, { role: "user", text: customQuery.trim() }]);
    setTypingPhase("thinking");

    setTimeout(() => {
      setTypingPhase("typing");
      let i = 0;
      const text = presets[bestIdx].answer;
      setTypingText("");
      setTypingDone(false);
      const interval = setInterval(() => {
        i += 2;
        setTypingText(text.slice(0, Math.min(i, text.length)));
        if (i >= text.length) {
          clearInterval(interval);
          setTypingDone(true);
          setTimeout(() => {
            setConversation(prev => [...prev, { role: "ai", text }]);
            setTypingText("");
            setTypingPhase("idle");
          }, 300);
        }
      }, 10);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.25em] text-[#00BFFF] mb-1">AI Assistant</p>
          <h1 className="text-3xl font-bold text-[#F0F4F8] font-[family-name:var(--font-syne)]">Ask Droplet AI</h1>
          <p className="text-[#8B9DC3] text-sm mt-1">Get instant insights about your water infrastructure, anomalies, and optimization opportunities.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-[family-name:var(--font-jetbrains)] text-[#00E5A0] bg-[#00E5A0]/10 border border-[#00E5A0]/15 px-3 py-1.5 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] shadow-[0_0_6px_rgba(0,229,160,0.5)] animate-pulse" />
            AI Online
          </span>
        </div>
      </div>

      {/* Preset question buttons */}
      <div>
        <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mb-3">Quick Questions</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {presets.map(({ icon: Icon, label }, i) => (
            <motion.button
              key={label}
              onClick={() => handlePreset(i)}
              disabled={typingPhase !== "idle"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`flex items-center gap-3 bg-[#0D1424]/60 rounded-xl border p-4 text-left transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group ${
                activeQuestion === i
                  ? "border-[#00BFFF]/30 bg-[#00BFFF]/5"
                  : "border-white/[0.06] hover:border-[#00BFFF]/20 hover:bg-white/[0.04]"
              }`}
            >
              <div className={`p-2 rounded-lg border transition-colors ${
                activeQuestion === i
                  ? "bg-[#00BFFF]/15 border-[#00BFFF]/20"
                  : "bg-white/[0.04] border-white/[0.06] group-hover:bg-[#00BFFF]/10 group-hover:border-[#00BFFF]/15"
              }`}>
                <Icon className={`w-4 h-4 ${activeQuestion === i ? "text-[#00BFFF]" : "text-[#4A5B78] group-hover:text-[#00BFFF]"} transition-colors`} />
              </div>
              <span className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-wider text-[#8B9DC3] group-hover:text-[#F0F4F8] transition-colors">{label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] overflow-hidden flex flex-col" style={{ minHeight: "400px" }}>
        {/* Chat header */}
        <div className="p-4 border-b border-white/[0.06] flex items-center gap-3">
          <div className="p-2 bg-[#00BFFF]/10 rounded-lg border border-[#00BFFF]/15">
            <Sparkles className="w-4 h-4 text-[#00BFFF]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#F0F4F8]">Droplet AI</p>
            <p className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#00BFFF] uppercase tracking-wider">
              {typingPhase === "thinking" ? "Analyzing..." : typingPhase === "typing" ? "Responding..." : "Ready"}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div ref={containerRef} className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[500px]">
          {/* Welcome message if no conversation */}
          {conversation.length === 0 && typingPhase === "idle" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#00BFFF]/10 border border-[#00BFFF]/20 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-[#00BFFF]" />
              </div>
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl rounded-tl-sm px-5 py-4 max-w-[85%]">
                <p className="text-sm text-[#8B9DC3] leading-relaxed">
                  Hello! I&apos;m <span className="font-semibold text-[#F0F4F8]">Droplet AI</span> — your water intelligence assistant. Click any of the quick question buttons above, or type your own question below.
                </p>
                <p className="text-xs text-[#4A5B78] mt-3 font-[family-name:var(--font-jetbrains)]">
                  I can help with water usage analysis, zone diagnostics, cost savings, compliance, efficiency metrics, and predictive forecasting.
                </p>
              </div>
            </motion.div>
          )}

          {/* Conversation history */}
          <AnimatePresence>
            {conversation.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-4 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-[#00BFFF]/10 border border-[#00BFFF]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-[#00BFFF]" />
                  </div>
                )}
                <div className={`max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#00BFFF]/10 text-[#F0F4F8] border border-[#00BFFF]/15 rounded-tr-sm"
                    : "bg-white/[0.04] text-[#8B9DC3] border border-white/[0.06] rounded-tl-sm"
                }`}>
                  {msg.role === "ai" ? <FormattedText text={msg.text} /> : msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Thinking indicator */}
          {typingPhase === "thinking" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#00BFFF]/10 border border-[#00BFFF]/20 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-[#00BFFF] animate-pulse" />
              </div>
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl rounded-tl-sm px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#00BFFF]/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-[#00BFFF]/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-[#00BFFF]/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78] uppercase tracking-wider ml-2">Analyzing data...</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Typewriter output */}
          {typingPhase === "typing" && typingText && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#00BFFF]/10 border border-[#00BFFF]/20 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-[#00BFFF]" />
              </div>
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl rounded-tl-sm px-5 py-4 max-w-[85%] text-sm leading-relaxed text-[#8B9DC3]">
                <FormattedText text={typingText} />
                {!typingDone && (
                  <motion.span
                    className="inline-block w-2 h-4 bg-[#00BFFF] ml-0.5 -mb-0.5 rounded-sm"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                )}
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex gap-3">
            <input
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCustomSend()}
              placeholder="Ask anything about your water infrastructure..."
              disabled={typingPhase !== "idle"}
              className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-xl px-5 py-3 text-sm text-[#F0F4F8] placeholder:text-[#4A5B78] focus:outline-none focus:border-[#00BFFF]/30 focus:ring-1 focus:ring-[#00BFFF]/15 transition-all font-[family-name:var(--font-jetbrains)] text-xs disabled:opacity-50"
            />
            <button
              onClick={handleCustomSend}
              disabled={!customQuery.trim() || typingPhase !== "idle"}
              className="bg-[#00BFFF] hover:bg-[#00D4FF] text-[#060B18] px-5 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
