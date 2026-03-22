"use client";

import { useState, useRef, useEffect } from "react";
import { Send, BotMessageSquare, Sparkles } from "lucide-react";

const starterQuestions = [
  "How can I improve water flow in Zone B?",
  "Which sensors need maintenance soon?",
  "Show me water savings trends this month",
  "Why is Zone B temperature high?",
  "What's the most efficient zone right now?",
  "How can I reduce PUE below 1.10?",
  "Predict next week's water usage",
  "Compare Zone C and Zone D efficiency",
];

const aiResponses: Record<string, string> = {
  "flow": "Based on current telemetry, Zone B has a flow rate of 1.2 L/s — well below the 4.0 L/s baseline. I recommend checking SN-9023 and SN-9029 for possible blockages or valve restrictions. Increasing the flow rate by 2.0 L/s could improve thermal dissipation by 18% and save approximately 3,100 gallons per week through reduced recirculation.",
  "maintenance": "Three sensors are flagged for attention:\n\n• SN-9023 (Zone B Return) — Elevated temperature at 28.5°C, 3.5°C above threshold. Recommend recalibration.\n• SN-9029 (Zone B Distribution Header) — Low flow at 0.8 L/s. Possible partial blockage.\n• SN-9034 (Zone F Blowdown Valve) — Currently offline. Needs physical inspection and possible transducer replacement.\n\nI recommend scheduling maintenance within the next 48 hours for SN-9023 and SN-9029, and immediate attention for SN-9034.",
  "savings": "Water savings this month: 128,000 gallons (34% reduction vs. pre-Droplet baseline).\n\nBreakdown by zone:\n• Zone A: 28,400 gal saved (22%)\n• Zone B: 12,100 gal saved (9%) — underperforming due to flow issues\n• Zone C: 42,300 gal saved (33%) — best performer, AI optimization active\n• Zone D: 24,800 gal saved (19%)\n• Zone E: 13,200 gal saved (10%)\n• Zone F: 7,200 gal saved (6%)\n\nAt current rates, you're on track for 400,000 gallons saved by end of month.",
  "temperature": "Zone B temperature is elevated at 28.5°C (target range: 20-25°C).\n\nRoot cause analysis:\n1. Flow rate through SN-9023 is at 1.2 L/s (70% below baseline)\n2. Distribution header SN-9029 shows only 0.8 L/s throughput\n3. This suggests a valve restriction or partial blockage in the Zone B supply line\n\nRecommended actions:\n• Inspect Zone B supply valve for partial closure\n• Check SN-9029 for sediment buildup\n• Temporarily increase Zone B flow allocation by 2.5 L/s\n\nExpected result: Temperature should return to 22-24°C range within 2 hours of correction.",
  "efficient": "Current zone efficiency rankings:\n\n1. Zone D — 97% efficiency (2.1 L/s, 21.8°C)\n2. Zone C — 95% efficiency (8.5 L/s, 25.0°C)\n3. Zone E — 93% efficiency (3.4 L/s, 20.5°C)\n4. Zone A — 92% efficiency (4.2 L/s, 22.1°C)\n5. Zone F — 89% efficiency (1.5 L/s, 18.2°C)\n6. Zone B — 71% efficiency (1.2 L/s, 28.5°C)\n\nZone D achieves top efficiency through optimal flow-to-load ratio. Zone B is the clear outlier — fixing its flow issue could raise system-wide efficiency from 94% to 96.5%.",
  "pue": "Current PUE is 1.12. To reach sub-1.10:\n\n1. Fix Zone B flow issues (est. -0.008 PUE impact)\n2. Enable AI-driven dynamic flow scheduling across Zones A and D (est. -0.012 PUE)\n3. Reduce Zone F makeup water temperature via pre-cooling stage (est. -0.005 PUE)\n\nCombined estimated impact: PUE reduction to ~1.095. This would put you in the top 5% of monitored facilities globally.\n\nTimeline: Achievable within 2-3 weeks with the Zone B maintenance and software configuration changes.",
  "predict": "Based on 90-day trend analysis and current patterns:\n\nNext week's predicted water usage: 119,500 gallons (±4,200)\n\nBreakdown:\n• Mon-Fri: ~18,100 gal/day (workload peaks)\n• Sat-Sun: ~14,350 gal/day (reduced compute load)\n\nThis represents a 3.2% reduction vs. this week, driven by continued AI optimization in Zone C and expected lower ambient temperatures (forecast: 2°C cooler).\n\nConfidence level: 91% (based on historical correlation with compute scheduling data).",
  "compare": "Zone C vs Zone D comparison:\n\n| Metric | Zone C | Zone D |\n|--------|--------|--------|\n| Flow Rate | 8.5 L/s | 2.1 L/s |\n| Temperature | 25.0°C | 21.8°C |\n| Efficiency | 95% | 97% |\n| Nodes | 3 (SN-9024, SN-9032, SN-9025) | 3 (SN-9026, SN-9027, SN-9036) |\n| Water saved (MTD) | 42,300 gal | 24,800 gal |\n\nKey insight: Zone D has higher efficiency despite lower throughput because it operates closer to optimal flow-to-load ratio. Zone C handles 4x the volume (AI cluster workloads) and still maintains 95% — an excellent result for high-density compute.",
};

export default function DropletAIPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const handleSubmit = () => {
    if (!query.trim() || isThinking) return;
    const question = query;
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setQuery("");
    setIsThinking(true);

    setTimeout(() => {
      const key = Object.keys(aiResponses).find((k) => question.toLowerCase().includes(k));
      const answer = key
        ? aiResponses[key]
        : "Based on your current sensor network of 16 nodes across 6 zones, system health is at 94% efficiency with a PUE of 1.12. The primary area for improvement is Zone B, where flow rates are 70% below baseline. Addressing this single issue could save an additional 4,200 gallons per week and improve system-wide PUE by 0.008. Would you like me to generate a detailed action plan?";

      setMessages((prev) => [...prev, { role: "ai", text: answer }]);
      setIsThinking(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)]">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-[#0066FF]/8 rounded-lg">
            <BotMessageSquare className="w-5 h-5 text-[#0066FF]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A] font-[family-name:var(--font-display)]">Droplet AI</h1>
            <p className="text-[#64748B] text-sm">Ask questions about your water system, get insights and recommendations.</p>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="p-4 bg-[#0066FF]/5 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-[#0066FF]" />
              </div>
              <h2 className="text-lg font-bold text-[#0F172A] mb-2">How can I help?</h2>
              <p className="text-sm text-[#64748B] max-w-md mb-8">
                I have access to all your sensor data, zone metrics, and historical trends. Ask me anything about your water infrastructure.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg w-full">
                {starterQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuery(q)}
                    className="text-left text-xs px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:border-[#0066FF]/30 hover:text-[#0066FF] hover:bg-[#0066FF]/5 transition-all font-[family-name:var(--font-mono)]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                msg.role === "user"
                  ? "bg-[#0066FF] text-white rounded-br-md"
                  : "bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] rounded-bl-md"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex justify-start">
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] px-5 py-3.5 rounded-2xl rounded-bl-md">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-bounce [animation-delay:0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-[#E2E8F0] bg-[#FAFBFC]">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Ask Droplet AI..."
              className="flex-1 px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all bg-white"
            />
            <button
              onClick={handleSubmit}
              disabled={!query.trim() || isThinking}
              className="p-3 bg-[#0066FF] text-white rounded-xl hover:bg-[#0052CC] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
