"use client";

const items = [
  { type: "data",   text: "FLOW RATE  4.2 L/s" },
  { type: "data",   text: "AVG TEMP  24.1°C" },
  { type: "data",   text: "PRESSURE  3.2 BAR" },
  { type: "data",   text: "SYSTEM PUE  1.12" },
  { type: "status", text: "42 NODES ONLINE" },
  { type: "data",   text: "128K GAL SAVED THIS MONTH" },
  { type: "status", text: "AI AUTO-OPTIMIZATION ACTIVE" },
  { type: "data",   text: "ZONE A  92% EFFICIENCY" },
  { type: "data",   text: "ZONE C  95% EFFICIENCY" },
  { type: "data",   text: "ZONE D  97% PEAK" },
  { type: "status", text: "0 CRITICAL ALERTS" },
  { type: "data",   text: "DATA LATENCY  < 100MS" },
  { type: "data",   text: "UPTIME  99.99%" },
  { type: "status", text: "SOC 2 TYPE II CERTIFIED" },
  { type: "meta",   text: "WATER IS THE NEXT AI CONSTRAINT" },
  { type: "status", text: "ALL SYSTEMS NOMINAL" },
  { type: "meta",   text: "DROPLET INTELLIGENCE PLATFORM  v2.1.0" },
  { type: "data",   text: "40% WATER REDUCTION ACHIEVABLE" },
];

const dotColor: Record<string, string> = {
  data:   "bg-[#00BFFF] shadow-[0_0_4px_rgba(0,191,255,0.6)]",
  status: "bg-[#00E5A0] shadow-[0_0_4px_rgba(0,229,160,0.6)]",
  meta:   "bg-[#4A5B78]",
};

function TickerContent() {
  return (
    <>
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-5 mx-6">
          <span className={`w-1 h-1 rounded-full shrink-0 ${dotColor[item.type]}`} />
          <span className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.18em] text-[#4A5B78] whitespace-nowrap">
            {item.text}
          </span>
        </span>
      ))}
    </>
  );
}

export default function TickerBar() {
  return (
    <div className="relative overflow-hidden border-y border-white/[0.04] bg-[#0D1424]/60 py-3">
      {/* Fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#060B18] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#060B18] to-transparent z-10" />

      {/* Scrolling track */}
      <div className="flex items-center" style={{ animation: "ticker 55s linear infinite" }}>
        <TickerContent />
        <TickerContent />
      </div>

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
