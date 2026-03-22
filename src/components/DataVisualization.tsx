"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  ComposedChart, Bar, Line,
  AreaChart, Area,
  ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ZAxis,
  Brush, ReferenceLine
} from "recharts";

/* ── Data ── */
const fullYearData = [
  { month: "Jan", usage: 4200, efficiency: 65, cost: 12000, savings: 800 },
  { month: "Feb", usage: 4500, efficiency: 62, cost: 13500, savings: 650 },
  { month: "Mar", usage: 4100, efficiency: 68, cost: 11000, savings: 1200 },
  { month: "Apr", usage: 3800, efficiency: 72, cost: 9500, savings: 2100 },
  { month: "May", usage: 3200, efficiency: 79, cost: 8200, savings: 3400 },
  { month: "Jun", usage: 2800, efficiency: 84, cost: 7100, savings: 4600 },
  { month: "Jul", usage: 2400, efficiency: 88, cost: 6300, savings: 5800 },
  { month: "Aug", usage: 2100, efficiency: 91, cost: 5800, savings: 6500 },
  { month: "Sep", usage: 1900, efficiency: 92, cost: 5500, savings: 7100 },
  { month: "Oct", usage: 1700, efficiency: 94, cost: 5100, savings: 7800 },
  { month: "Nov", usage: 1600, efficiency: 94, cost: 4900, savings: 8200 },
  { month: "Dec", usage: 1500, efficiency: 95, cost: 4600, savings: 8800 },
];

const scatterData = [
  { flow: 4.2, temp: 22.1, zone: "A", size: 120 },
  { flow: 3.8, temp: 23.4, zone: "A", size: 100 },
  { flow: 4.5, temp: 21.8, zone: "A", size: 90 },
  { flow: 1.2, temp: 28.5, zone: "B", size: 150 },
  { flow: 1.8, temp: 27.1, zone: "B", size: 130 },
  { flow: 1.5, temp: 29.0, zone: "B", size: 110 },
  { flow: 8.5, temp: 25.0, zone: "C", size: 140 },
  { flow: 7.9, temp: 24.2, zone: "C", size: 120 },
  { flow: 8.1, temp: 24.8, zone: "C", size: 100 },
  { flow: 2.1, temp: 21.8, zone: "D", size: 80 },
  { flow: 2.4, temp: 22.0, zone: "D", size: 90 },
  { flow: 2.0, temp: 22.5, zone: "D", size: 70 },
];

const timeRanges = ["3M", "6M", "12M"] as const;

const monoFont = "var(--font-jetbrains)";

/* ── Custom Tooltip ── */
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card rounded-lg px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" style={{ border: "1px solid rgba(0, 191, 255, 0.15)" }}>
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#4A5B78] mb-2" style={{ fontFamily: monoFont }}>{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-xs" style={{ fontFamily: monoFont }}>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color, boxShadow: `0 0 6px ${entry.color}40` }} />
          <span className="text-[#8B9DC3]">{entry.name}:</span>
          <span className="text-[#F0F4F8] font-medium">
            {entry.name.includes("$") || entry.name.includes("Cost") || entry.name.includes("Savings")
              ? `$${entry.value.toLocaleString()}`
              : entry.name.includes("%")
              ? `${entry.value}%`
              : entry.value.toLocaleString()
            }
          </span>
        </div>
      ))}
    </div>
  );
}

function ScatterTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { flow: number; temp: number; zone: string } }> }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="glass-card rounded-lg px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" style={{ border: "1px solid rgba(0, 191, 255, 0.15)" }}>
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#00BFFF] mb-2" style={{ fontFamily: monoFont }}>Zone {d.zone}</p>
      <div className="space-y-1 text-xs" style={{ fontFamily: monoFont }}>
        <div className="flex justify-between gap-4">
          <span className="text-[#8B9DC3]">Flow</span>
          <span className="text-[#F0F4F8] font-medium">{d.flow} L/s</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[#8B9DC3]">Temp</span>
          <span className="text-[#F0F4F8] font-medium">{d.temp}°C</span>
        </div>
      </div>
    </div>
  );
}

/* ── Animated Counter ── */
function AnimCounter({ target, prefix = "", suffix = "", decimals = 0 }: { target: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (1800 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      setVal(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>;
}

/* ── Main Component ── */
export default function DataVisualization() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [timeRange, setTimeRange] = useState<(typeof timeRanges)[number]>("12M");
  const [visibleSeries, setVisibleSeries] = useState({ usage: true, efficiency: true });
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const getFilteredData = useCallback(() => {
    const sliceMap = { "3M": 9, "6M": 6, "12M": 0 };
    return fullYearData.slice(sliceMap[timeRange]);
  }, [timeRange]);

  const yearData = getFilteredData();

  const toggleSeries = (key: "usage" | "efficiency") => {
    setVisibleSeries(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredScatter = activeZone
    ? scatterData.filter(d => d.zone === activeZone)
    : scatterData;

  const zoneColors: Record<string, string> = { A: "#00BFFF", B: "#FF4757", C: "#00E5A0", D: "#FFB020" };

  return (
    <section id="data" className="py-32 px-6 lg:px-8 bg-[#0A0F1E] relative noise-overlay">
      {/* Top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#00BFFF]/20 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">

        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#00BFFF]" />
            <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.3em] text-[#00BFFF]">Intelligence Dashboard</p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-extrabold text-[#F0F4F8] leading-tight">
              Visualize efficiency.<br />Predict savings.
            </h2>
            <p className="text-[#8B9DC3] max-w-xs text-sm leading-relaxed md:text-right">
              Hardware telemetry, ML predictions, and financial impact — unified in one view.
            </p>
          </div>
        </motion.div>

        {/* Live stats strip */}
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.05 }}
          className="border-y border-white/[0.06] py-5 mb-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Active Flow", value: "4.2 L/s", delta: "↑ nominal", deltaColor: "text-[#00E5A0]" },
            { label: "Avg Temp", value: "24.1°C", delta: "↓ -0.5 vs yesterday", deltaColor: "text-[#00E5A0]" },
            { label: "System PUE", value: "1.12", delta: "↓ target met", deltaColor: "text-[#00E5A0]" },
            { label: "Nodes Live", value: "42 / 42", delta: "✓ all nominal", deltaColor: "text-[#00E5A0]" },
          ].map(({ label, value, delta, deltaColor }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78]">{label}</p>
              <p className="font-[family-name:var(--font-syne)] text-2xl font-semibold text-[#F0F4F8]">{value}</p>
              <p className={`font-[family-name:var(--font-jetbrains)] text-[9px] ${deltaColor}`}>{delta}</p>
            </div>
          ))}
        </motion.div>

        {/* Row 1: Usage vs Efficiency (2/3) + Cost reduction (1/3) */}
        <div className="grid lg:grid-cols-3 gap-0 mb-4 border border-white/[0.06] rounded-2xl overflow-hidden">

          <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 p-8 border-b lg:border-b-0 lg:border-r border-white/[0.06] bg-[#0D1424]/60">

            {/* Chart header with controls */}
            <div className="flex flex-wrap justify-between items-start mb-6 gap-4">
              <div>
                <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mb-1">Macro Trends · Interactive</p>
                <p className="font-[family-name:var(--font-syne)] text-lg font-semibold text-[#F0F4F8]">Usage vs. Efficiency</p>
              </div>
              <div className="flex items-center gap-2">
                {/* Time range tabs */}
                <div className="flex items-center bg-white/[0.04] rounded-lg p-0.5">
                  {timeRanges.map(range => (
                    <button key={range} onClick={() => setTimeRange(range)}
                      className={`font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-md transition-all duration-200 ${
                        timeRange === range
                          ? "bg-[#00BFFF] text-[#060B18] font-semibold shadow-[0_0_12px_rgba(0,191,255,0.3)]"
                          : "text-[#4A5B78] hover:text-[#8B9DC3]"
                      }`}>
                      {range}
                    </button>
                  ))}
                </div>
                <div className="text-right ml-4 hidden sm:block">
                  <p className="font-[family-name:var(--font-syne)] text-3xl font-bold text-[#00BFFF] drop-shadow-[0_0_12px_rgba(0,191,255,0.3)]">
                    <AnimCounter target={95} suffix="%" />
                  </p>
                  <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mt-0.5">Peak Efficiency</p>
                </div>
              </div>
            </div>

            {/* Toggleable legend */}
            <div className="flex items-center gap-4 mb-4">
              <button onClick={() => toggleSeries("usage")}
                className={`flex items-center gap-2 text-[10px] uppercase tracking-wider font-[family-name:var(--font-jetbrains)] transition-all duration-200 ${
                  visibleSeries.usage ? "text-[#8B9DC3]" : "text-[#4A5B78] line-through opacity-50"
                }`}>
                <span className={`w-3 h-3 rounded-sm transition-colors ${visibleSeries.usage ? "bg-[#162035] border border-[#00BFFF]/30" : "bg-white/[0.04]"}`} />
                Water (gal)
              </button>
              <button onClick={() => toggleSeries("efficiency")}
                className={`flex items-center gap-2 text-[10px] uppercase tracking-wider font-[family-name:var(--font-jetbrains)] transition-all duration-200 ${
                  visibleSeries.efficiency ? "text-[#8B9DC3]" : "text-[#4A5B78] line-through opacity-50"
                }`}>
                <span className={`w-3 h-0.5 rounded transition-colors ${visibleSeries.efficiency ? "bg-[#00BFFF]" : "bg-white/[0.04]"}`} />
                Efficiency %
              </button>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={yearData} margin={{ left: -20, right: 0, top: 4, bottom: 0 }}>
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00BFFF" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#00BFFF" stopOpacity={0.03} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="month"
                    tick={{ fontSize: 10, fill: "#4A5B78", fontFamily: monoFont }}
                    axisLine={false} tickLine={false} />
                  <YAxis yAxisId="l"
                    tick={{ fontSize: 10, fill: "#4A5B78", fontFamily: monoFont }}
                    axisLine={false} tickLine={false} />
                  <YAxis yAxisId="r" orientation="right"
                    tick={{ fontSize: 10, fill: "#00BFFF", fontFamily: monoFont }}
                    axisLine={false} tickLine={false}
                    domain={[50, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine yAxisId="r" y={90} stroke="#00E5A0" strokeDasharray="4 4" strokeOpacity={0.4}
                    label={{ value: "Target 90%", position: "insideTopRight", fill: "#00E5A0", fontSize: 9, fontFamily: monoFont }} />
                  {visibleSeries.usage && (
                    <Bar yAxisId="l" dataKey="usage" name="Water (gal)" fill="url(#barGrad)"
                      stroke="rgba(0,191,255,0.2)" strokeWidth={1} radius={[4, 4, 0, 0]} />
                  )}
                  {visibleSeries.efficiency && (
                    <Line yAxisId="r" type="monotone" dataKey="efficiency" name="Efficiency %"
                      stroke="#00BFFF" strokeWidth={2.5}
                      dot={{ r: 3, fill: "#0D1424", stroke: "#00BFFF", strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: "#00BFFF", stroke: "#060B18", strokeWidth: 3, className: "drop-shadow-[0_0_8px_rgba(0,191,255,0.5)]" }} />
                  )}
                  <Brush dataKey="month" height={28} fill="#0D1424" stroke="rgba(255,255,255,0.06)"
                    travellerWidth={8}>
                    <AreaChart data={yearData}>
                      <Area type="monotone" dataKey="usage" fill="rgba(0,191,255,0.08)" stroke="rgba(0,191,255,0.3)" />
                    </AreaChart>
                  </Brush>
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <p className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78] mt-3 tracking-wider uppercase">Drag the brush below the chart to zoom into a time range</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}
            className="p-8 bg-[#0D1424]/60">
            <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mb-1">Financial Impact</p>
            <p className="font-[family-name:var(--font-syne)] text-lg font-semibold text-[#F0F4F8] mb-2">Operating Cost</p>
            <div className="flex items-baseline gap-2 mb-6">
              <p className="font-[family-name:var(--font-syne)] text-2xl font-bold text-[#00E5A0]">
                <AnimCounter target={61} suffix="%" />
              </p>
              <p className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78] uppercase tracking-wider">cost reduction</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yearData} margin={{ left: -20, right: 0 }}>
                  <defs>
                    <linearGradient id="costG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00E5A0" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#00E5A0" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="savingsG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00BFFF" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#00BFFF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="month"
                    tick={{ fontSize: 10, fill: "#4A5B78", fontFamily: monoFont }}
                    axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#4A5B78", fontFamily: monoFont }}
                    axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="cost" name="Cost ($)" stroke="#00E5A0" strokeWidth={2} fill="url(#costG)"
                    dot={false} activeDot={{ r: 4, fill: "#00E5A0", stroke: "#0D1424", strokeWidth: 2 }} />
                  <Area type="monotone" dataKey="savings" name="Savings ($)" stroke="#00BFFF" strokeWidth={1.5} fill="url(#savingsG)"
                    dot={false} activeDot={{ r: 4, fill: "#00BFFF", stroke: "#0D1424", strokeWidth: 2 }} strokeDasharray="4 2" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Row 2: Scatter (flow vs temp) + deployment stats */}
        <div className="grid lg:grid-cols-3 gap-0 border border-white/[0.06] rounded-2xl overflow-hidden">

          <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 p-8 border-b lg:border-b-0 lg:border-r border-white/[0.06] bg-[#0D1424]/60">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mb-1">Zone Analysis · Click to Filter</p>
                <p className="font-[family-name:var(--font-syne)] text-lg font-semibold text-[#F0F4F8]">Flow Rate vs. Temperature</p>
              </div>
              {/* Zone filter buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveZone(null)}
                  className={`font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-wider px-2.5 py-1 rounded transition-all duration-200 ${
                    !activeZone ? "bg-white/[0.08] text-[#F0F4F8]" : "text-[#4A5B78] hover:text-[#8B9DC3]"
                  }`}>
                  All
                </button>
                {["A", "B", "C", "D"].map(z => (
                  <button key={z} onClick={() => setActiveZone(activeZone === z ? null : z)}
                    className={`font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-wider px-2.5 py-1 rounded transition-all duration-200 flex items-center gap-1.5 ${
                      activeZone === z ? "bg-white/[0.08] text-[#F0F4F8]" : "text-[#4A5B78] hover:text-[#8B9DC3]"
                    }`}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: zoneColors[z], boxShadow: `0 0 4px ${zoneColors[z]}60` }} />
                    {z}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ left: -10, right: 16, top: 4, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="flow" name="Flow (L/s)" type="number" domain={[0, 10]}
                    tick={{ fontSize: 10, fill: "#4A5B78", fontFamily: monoFont }}
                    axisLine={false} tickLine={false}
                    label={{ value: "L/s", position: "insideBottomRight", offset: -4, fontSize: 9, fill: "#4A5B78" }} />
                  <YAxis dataKey="temp" name="Temp (°C)" domain={[20, 30]}
                    tick={{ fontSize: 10, fill: "#4A5B78", fontFamily: monoFont }}
                    axisLine={false} tickLine={false}
                    label={{ value: "°C", angle: -90, position: "insideLeft", offset: 8, fontSize: 9, fill: "#4A5B78" }} />
                  <ZAxis dataKey="size" range={[40, 160]} />
                  <Tooltip content={<ScatterTooltip />} cursor={{ stroke: "rgba(0,191,255,0.2)", strokeDasharray: "3 3" }} />
                  <ReferenceLine y={26} stroke="#FF4757" strokeDasharray="4 4" strokeOpacity={0.4}
                    label={{ value: "Thermal Threshold", position: "insideTopRight", fill: "#FF4757", fontSize: 9, fontFamily: monoFont }} />
                  {activeZone ? (
                    <Scatter data={filteredScatter} fill={zoneColors[activeZone]}
                      fillOpacity={0.8}
                      stroke={zoneColors[activeZone]} strokeWidth={1} />
                  ) : (
                    <>
                      <Scatter name="Zone A" data={scatterData.filter(d => d.zone === "A")} fill="#00BFFF" fillOpacity={0.7} />
                      <Scatter name="Zone B" data={scatterData.filter(d => d.zone === "B")} fill="#FF4757" fillOpacity={0.7} />
                      <Scatter name="Zone C" data={scatterData.filter(d => d.zone === "C")} fill="#00E5A0" fillOpacity={0.7} />
                      <Scatter name="Zone D" data={scatterData.filter(d => d.zone === "D")} fill="#FFB020" fillOpacity={0.7} />
                    </>
                  )}
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            {activeZone && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-[family-name:var(--font-jetbrains)] text-[10px] mt-3 tracking-wider uppercase"
                style={{ color: zoneColors[activeZone] }}>
                Showing Zone {activeZone} · {filteredScatter.length} data points
              </motion.p>
            )}
          </motion.div>

          {/* Right: deployment stats */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.25 }}
            className="p-8 bg-[#0D1424]/60 flex flex-col justify-between">
            <div>
              <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mb-1">Deployment</p>
              <p className="font-[family-name:var(--font-syne)] text-lg font-semibold text-[#F0F4F8] mb-6">System Stats</p>
            </div>
            <div className="space-y-0 flex-1">
              {[
                { label: "Pipe range", value: "2 – 48 in" },
                { label: "Install downtime", value: "Zero" },
                { label: "Sensor accuracy", value: "±0.1%" },
                { label: "Data latency", value: "< 100ms" },
                { label: "Nodes online", value: "42 / 42" },
                { label: "Uptime SLA", value: "99.99%" },
              ].map(({ label, value }, i, arr) => (
                <div key={label}
                  className={`flex items-baseline justify-between py-3 ${i < arr.length - 1 ? "border-b border-white/[0.04]" : ""} group`}>
                  <span className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.15em] text-[#4A5B78] group-hover:text-[#8B9DC3] transition-colors">{label}</span>
                  <span className="font-[family-name:var(--font-syne)] text-sm font-semibold text-[#F0F4F8]">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
