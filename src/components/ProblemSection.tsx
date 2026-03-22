"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell,
  AreaChart, Area,
} from "recharts";

/* ── Data ── */
const waterData = [
  { label: "2020", gallons: 1.2 },
  { label: "2021", gallons: 2.8 },
  { label: "2022", gallons: 5.6 },
  { label: "2023", gallons: 9.1 },
  { label: "2024", gallons: 14.3 },
  { label: "2025", gallons: 21.0 },
  { label: "2026*", gallons: 30.0 },
];

const stats = [
  { value: "700M", unit: "gallons/day", desc: "consumed by US data centers alone" },
  { value: "1 query", unit: "= 10× water", desc: "vs a traditional search request" },
  { value: "0%", unit: "visibility", desc: "most facilities have no water monitoring" },
];

const coolingWasteData = [
  { month: "Jan", intake: 12.4, discharged: 11.8, lost: 0.6 },
  { month: "Feb", intake: 11.9, discharged: 11.2, lost: 0.7 },
  { month: "Mar", intake: 13.1, discharged: 12.3, lost: 0.8 },
  { month: "Apr", intake: 14.6, discharged: 13.5, lost: 1.1 },
  { month: "May", intake: 16.2, discharged: 14.8, lost: 1.4 },
  { month: "Jun", intake: 19.8, discharged: 17.9, lost: 1.9 },
  { month: "Jul", intake: 22.5, discharged: 20.1, lost: 2.4 },
  { month: "Aug", intake: 23.1, discharged: 20.6, lost: 2.5 },
  { month: "Sep", intake: 18.4, discharged: 16.7, lost: 1.7 },
  { month: "Oct", intake: 15.3, discharged: 14.1, lost: 1.2 },
  { month: "Nov", intake: 13.0, discharged: 12.2, lost: 0.8 },
  { month: "Dec", intake: 12.8, discharged: 12.0, lost: 0.8 },
];

const comparisonData = [
  { label: "Open Loop", waste: 95, efficiency: 5 },
  { label: "Closed Loop", waste: 35, efficiency: 65 },
  { label: "With Droplet", waste: 8, efficiency: 92 },
];

/* ── Open Loop Cooling Diagram (SVG) ── */
function OpenLoopDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <svg viewBox="0 0 900 420" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="waterGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="coldWater" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00BFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00BFFF" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="hotWater" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFB020" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFB020" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="wasteWater" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFB020" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFB020" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Background grid */}
        <pattern id="diagGrid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        </pattern>
        <rect width="900" height="420" fill="url(#diagGrid)" />

        {/* ── Water Source ── */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}>
          <rect x="30" y="150" width="130" height="80" rx="12" fill="rgba(0,191,255,0.08)" stroke="rgba(0,191,255,0.3)" strokeWidth="1.5" />
          <text x="95" y="182" textAnchor="middle" fill="#00BFFF" fontSize="10" fontFamily="var(--font-jetbrains)" letterSpacing="0.1em">WATER</text>
          <text x="95" y="198" textAnchor="middle" fill="#00BFFF" fontSize="10" fontFamily="var(--font-jetbrains)" letterSpacing="0.1em">SOURCE</text>
          <text x="95" y="220" textAnchor="middle" fill="#4A5B78" fontSize="9" fontFamily="var(--font-jetbrains)">Municipal / Well</text>
          {/* Waves */}
          <motion.path d="M 50 165 Q 65 158, 80 165 Q 95 172, 110 165 Q 125 158, 140 165" fill="none" stroke="rgba(0,191,255,0.3)" strokeWidth="1"
            animate={{ y: [0, 3, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        </motion.g>

        {/* ── Cold Water Pipe (Source → Cooling Tower) ── */}
        <motion.path d="M 160 190 L 260 190" fill="none" stroke="url(#coldWater)" strokeWidth="3" strokeDasharray="6 4"
          initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ delay: 0.4, duration: 0.6 }} />
        <motion.text x="210" y="178" textAnchor="middle" fill="#4A5B78" fontSize="8" fontFamily="var(--font-jetbrains)"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}>
          COLD SUPPLY
        </motion.text>
        {/* Flow particles */}
        {isInView && [0, 0.5, 1].map((d, i) => (
          <motion.circle key={`cs${i}`} r="2.5" fill="#00BFFF" filter="url(#waterGlow)"
            animate={{ cx: [160, 260], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.5, delay: d, repeat: Infinity, ease: "linear" }}
            cy={190} />
        ))}

        {/* ── Cooling Tower ── */}
        <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.5 }}
          style={{ transformOrigin: "330px 190px" }}>
          <rect x="260" y="130" width="140" height="120" rx="12" fill="rgba(0,191,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
          {/* Tower shape */}
          <path d="M 290 175 L 310 145 L 350 145 L 370 175 Z" fill="none" stroke="rgba(0,191,255,0.4)" strokeWidth="1.5" />
          {/* Steam/evaporation */}
          {[0, 1, 2].map(i => (
            <motion.path key={i}
              d={`M ${315 + i * 20} 145 Q ${320 + i * 20} ${130 - i * 5}, ${325 + i * 20} ${115 - i * 5}`}
              fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeLinecap="round"
              animate={{ opacity: [0.1, 0.4, 0.1], y: [0, -8, 0] }}
              transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity }} />
          ))}
          <text x="330" y="195" textAnchor="middle" fill="#F0F4F8" fontSize="10" fontFamily="var(--font-jetbrains)" letterSpacing="0.08em">COOLING</text>
          <text x="330" y="209" textAnchor="middle" fill="#F0F4F8" fontSize="10" fontFamily="var(--font-jetbrains)" letterSpacing="0.08em">TOWER</text>
          <text x="330" y="238" textAnchor="middle" fill="#4A5B78" fontSize="8" fontFamily="var(--font-jetbrains)">Heat Exchange</text>
        </motion.g>

        {/* Evaporation loss label */}
        <motion.g initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8 }}>
          <line x1="330" y1="130" x2="330" y2="90" stroke="rgba(255,176,32,0.4)" strokeWidth="1" strokeDasharray="3 3" />
          <rect x="280" y="60" width="100" height="30" rx="6" fill="rgba(255,176,32,0.1)" stroke="rgba(255,176,32,0.3)" strokeWidth="1" />
          <text x="330" y="78" textAnchor="middle" fill="#FFB020" fontSize="9" fontFamily="var(--font-jetbrains)" fontWeight="600" letterSpacing="0.08em">EVAP LOSS</text>
          <motion.text x="330" y="53" textAnchor="middle" fill="#FFB020" fontSize="11" fontFamily="var(--font-syne)" fontWeight="700"
            animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}>
            ~2-3% per cycle
          </motion.text>
        </motion.g>

        {/* ── Hot Water Pipe (Tower → Data Center) ── */}
        <motion.path d="M 400 190 L 500 190" fill="none" stroke="url(#coldWater)" strokeWidth="3" strokeDasharray="6 4"
          initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ delay: 0.7, duration: 0.6 }} />
        <motion.text x="450" y="178" textAnchor="middle" fill="#4A5B78" fontSize="8" fontFamily="var(--font-jetbrains)"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.9 }}>
          COOLED SUPPLY
        </motion.text>
        {isInView && [0, 0.5, 1].map((d, i) => (
          <motion.circle key={`hs${i}`} r="2.5" fill="#00BFFF" filter="url(#waterGlow)"
            animate={{ cx: [400, 500], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.5, delay: d + 0.3, repeat: Infinity, ease: "linear" }}
            cy={190} />
        ))}

        {/* ── Data Center ── */}
        <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.8 }}
          style={{ transformOrigin: "570px 190px" }}>
          <rect x="500" y="130" width="140" height="120" rx="12" fill="rgba(0,191,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
          {/* Server rack lines */}
          {[0, 1, 2, 3].map(i => (
            <g key={i}>
              <rect x="520" y={148 + i * 22} width="100" height="14" rx="2" fill="rgba(0,191,255,0.06)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
              <motion.circle cx="528" cy={155 + i * 22} r="2" fill="#00E5A0"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }} />
              <rect x="535" y={151 + i * 22} width="30" height="2" rx="1" fill="rgba(255,255,255,0.08)" />
              <rect x="535" y={155 + i * 22} width="20" height="2" rx="1" fill="rgba(255,255,255,0.05)" />
            </g>
          ))}
          <text x="570" y="238" textAnchor="middle" fill="#F0F4F8" fontSize="10" fontFamily="var(--font-jetbrains)" letterSpacing="0.08em">DATA CENTER</text>
          <text x="570" y="100" textAnchor="middle" fill="#4A5B78" fontSize="8" fontFamily="var(--font-jetbrains)">GPU / CPU Cooling</text>
          {/* Heat indicator */}
          <motion.rect x="500" y="130" width="140" height="120" rx="12" fill="none" stroke="rgba(255,176,32,0.15)" strokeWidth="2"
            animate={{ stroke: ["rgba(255,176,32,0.1)", "rgba(255,176,32,0.3)", "rgba(255,176,32,0.1)"] }}
            transition={{ duration: 3, repeat: Infinity }} />
        </motion.g>

        {/* ── Hot Return Pipe (Data Center → Discharge) ── */}
        <motion.path d="M 640 190 L 740 190" fill="none" stroke="url(#hotWater)" strokeWidth="3" strokeDasharray="6 4"
          initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ delay: 1.0, duration: 0.6 }} />
        <motion.text x="690" y="178" textAnchor="middle" fill="#4A5B78" fontSize="8" fontFamily="var(--font-jetbrains)"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.2 }}>
          HOT RETURN
        </motion.text>
        {isInView && [0, 0.6, 1.2].map((d, i) => (
          <motion.circle key={`hr${i}`} r="2.5" fill="#FFB020" filter="url(#waterGlow)"
            animate={{ cx: [640, 740], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.5, delay: d + 0.5, repeat: Infinity, ease: "linear" }}
            cy={190} />
        ))}

        {/* ── Discharge ── */}
        <motion.g initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 1.1 }}>
          <rect x="740" y="150" width="130" height="80" rx="12" fill="rgba(255,176,32,0.08)" stroke="rgba(255,176,32,0.3)" strokeWidth="1.5" />
          <text x="805" y="182" textAnchor="middle" fill="#FFB020" fontSize="10" fontFamily="var(--font-jetbrains)" letterSpacing="0.1em">DISCHARGE</text>
          <text x="805" y="198" textAnchor="middle" fill="#FFB020" fontSize="10" fontFamily="var(--font-jetbrains)" letterSpacing="0.1em">TO DRAIN</text>
          <text x="805" y="220" textAnchor="middle" fill="#4A5B78" fontSize="9" fontFamily="var(--font-jetbrains)">Single-pass waste</text>
        </motion.g>

        {/* ── "NO RECIRCULATION" warning ── */}
        <motion.g initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.4 }}>
          {/* Bottom arrow showing no return */}
          <path d="M 780 240 L 780 340 L 130 340 L 130 240" fill="none" stroke="rgba(255,176,32,0.15)" strokeWidth="1.5" strokeDasharray="8 6" />
          <line x1="130" y1="260" x2="130" y2="240" stroke="rgba(255,176,32,0.15)" strokeWidth="1.5" markerEnd="" />
          {/* X mark on the return path */}
          <circle cx="450" cy="340" r="16" fill="rgba(255,176,32,0.1)" stroke="rgba(255,176,32,0.4)" strokeWidth="1.5" />
          <line x1="442" y1="332" x2="458" y2="348" stroke="#FFB020" strokeWidth="2" strokeLinecap="round" />
          <line x1="458" y1="332" x2="442" y2="348" stroke="#FFB020" strokeWidth="2" strokeLinecap="round" />
          <text x="450" y="370" textAnchor="middle" fill="#FFB020" fontSize="9" fontFamily="var(--font-jetbrains)" fontWeight="600" letterSpacing="0.15em">
            NO RECIRCULATION
          </text>
          <text x="450" y="385" textAnchor="middle" fill="#4A5B78" fontSize="8" fontFamily="var(--font-jetbrains)">
            95% of water is wasted in open-loop systems
          </text>
        </motion.g>

        {/* Temperature labels */}
        <motion.g initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.0 }}>
          <text x="210" y="205" textAnchor="middle" fill="#00BFFF" fontSize="9" fontFamily="var(--font-jetbrains)" fontWeight="500">15°C</text>
          <text x="450" y="205" textAnchor="middle" fill="#00BFFF" fontSize="9" fontFamily="var(--font-jetbrains)" fontWeight="500">18°C</text>
          <text x="690" y="205" textAnchor="middle" fill="#FFB020" fontSize="9" fontFamily="var(--font-jetbrains)" fontWeight="500">32°C</text>
        </motion.g>
      </svg>
    </motion.div>
  );
}

/* ── Comparison Bar ── */
function ComparisonBars() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="space-y-6">
      {comparisonData.map(({ label, waste, efficiency }, i) => (
        <motion.div key={label}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.15, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.15em] text-[#F0F4F8]">{label}</span>
            <span className={`font-[family-name:var(--font-jetbrains)] text-[10px] font-semibold ${efficiency >= 90 ? "text-[#00E5A0]" : efficiency >= 50 ? "text-[#00BFFF]" : "text-[#FFB020]"}`}>
              {efficiency}% efficient
            </span>
          </div>
          <div className="h-3 bg-white/[0.04] rounded-full overflow-hidden border border-white/[0.06]">
            <motion.div
              className={`h-full rounded-full ${efficiency >= 90 ? "bg-gradient-to-r from-[#00E5A0] to-[#00BFFF]" : efficiency >= 50 ? "bg-gradient-to-r from-[#00BFFF] to-[#00BFFF]/60" : "bg-gradient-to-r from-[#FFB020] to-[#FFB020]/60"}`}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${efficiency}%` } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-[#4A5B78] font-[family-name:var(--font-jetbrains)]">Water reclaimed</span>
            <span className="text-[9px] text-[#4A5B78] font-[family-name:var(--font-jetbrains)]">{waste}% wasted</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Main Component ── */
export default function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const costRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const diagramInView = useInView(diagramRef, { once: true, margin: "-80px" });
  const chartInView = useInView(chartRef, { once: true, margin: "-80px" });
  const costInView = useInView(costRef, { once: true, margin: "-80px" });

  /* Scroll-driven progress for the sticky hero */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);

  return (
    <div ref={containerRef}>
      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO HEADER (scroll-driven fade)
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center px-6 lg:px-8 bg-[#060B18] overflow-hidden">
        {/* Background radial */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,191,255,0.06)_0%,transparent_60%)]" />
        <div className="absolute inset-0 grid-pattern opacity-40" />

        <motion.div
          ref={headerRef}
          style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
          className="max-w-7xl mx-auto relative z-10 w-full"
        >
          <motion.div initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-[#00BFFF]" />
              <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.3em] text-[#00BFFF]">The Problem</p>
            </div>
            <h1 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#F0F4F8] leading-[1.15] max-w-2xl">
              AI is draining the world&apos;s water.{" "}
              <span className="text-[#00BFFF] drop-shadow-[0_0_30px_rgba(0,191,255,0.3)]">Nobody&apos;s measuring it.</span>
            </h1>
            <p className="text-[#8B9DC3] max-w-lg text-sm md:text-base leading-relaxed mt-6">
              Every AI query, every GPU cycle, every training run consumes water for cooling.
              The industry is scaling exponentially — but water infrastructure isn&apos;t keeping up.
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator — pinned to section bottom */}
        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}>
          <span className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.3em] text-[#4A5B78]">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#00BFFF]/40 to-transparent" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — STATS STRIP
          ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 lg:px-8 bg-[#0A0F1E] relative noise-overlay">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#00BFFF]/20 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-3 gap-0 border border-white/[0.06] rounded-2xl overflow-hidden"
          >
            {stats.map(({ value, unit, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                className={`p-8 md:p-10 ${i < 2 ? "border-b md:border-b-0 md:border-r border-white/[0.06]" : ""} bg-[#0D1424]/40`}
              >
                <p className="font-[family-name:var(--font-syne)] text-2xl md:text-3xl font-extrabold text-[#00BFFF] leading-none drop-shadow-[0_0_12px_rgba(0,191,255,0.3)]">
                  {value}
                </p>
                <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-[#8B9DC3] mt-3">{unit}</p>
                <p className="text-sm text-[#4A5B78] mt-1">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — OPEN LOOP COOLING DIAGRAM
          ═══════════════════════════════════════════ */}
      <section ref={diagramRef} className="py-24 px-6 lg:px-8 bg-[#060B18] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(0,191,255,0.04)_0%,transparent_60%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={diagramInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
            className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#00BFFF]" />
              <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.3em] text-[#00BFFF]">How It Works Today</p>
            </div>
            <h2 className="font-[family-name:var(--font-syne)] text-xl md:text-2xl lg:text-3xl font-extrabold text-[#F0F4F8] leading-tight max-w-2xl">
              Open-Loop Cooling Systems{" "}
              <span className="text-[#8B9DC3] font-semibold">waste 95% of water on every pass.</span>
            </h2>
          </motion.div>

          {/* Diagram card */}
          <div className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78]">System Diagram</p>
                <p className="text-sm font-medium text-[#F0F4F8] mt-1">Single-Pass Open-Loop Cooling</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-1 rounded bg-[#00BFFF]" />
                  <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78]">Cold</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-1 rounded bg-[#FFB020]" />
                  <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78]">Hot</span>
                </div>
              </div>
            </div>
            <OpenLoopDiagram />
          </div>

          {/* Key callouts */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { num: "01", title: "Single Pass", desc: "Water flows through once and is discharged — never recirculated or recovered.", color: "text-[#FFB020]" },
              { num: "02", title: "Thermal Pollution", desc: "Hot discharge water raises local water temperatures, damaging ecosystems.", color: "text-[#FFB020]" },
              { num: "03", title: "Evaporation Loss", desc: "Cooling towers lose 2-3% of total volume per cycle to evaporation alone.", color: "text-[#FFB020]" },
            ].map(({ num, title, desc, color }, i) => (
              <motion.div key={num}
                initial={{ opacity: 0, y: 20 }}
                animate={diagramInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                className="bg-[#0D1424]/40 rounded-xl border border-white/[0.06] p-6"
              >
                <span className={`font-[family-name:var(--font-jetbrains)] text-[10px] font-medium ${color}`}>{num}</span>
                <p className="text-sm font-semibold text-[#F0F4F8] mt-2 mb-1">{title}</p>
                <p className="text-xs text-[#8B9DC3] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — CHARTS & DATA
          ═══════════════════════════════════════════ */}
      <section ref={chartRef} className="py-24 px-6 lg:px-8 bg-[#0A0F1E] relative noise-overlay">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#00BFFF]/20 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={chartInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
            className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#00BFFF]" />
              <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.3em] text-[#00BFFF]">The Data</p>
            </div>
            <h2 className="font-[family-name:var(--font-syne)] text-xl md:text-2xl lg:text-3xl font-extrabold text-[#F0F4F8] leading-tight">
              The numbers don&apos;t lie.
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Water consumption bar chart */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={chartInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6 md:p-8">
              <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mb-1">Projected Growth</p>
              <p className="font-[family-name:var(--font-syne)] text-base font-semibold text-[#F0F4F8] mb-6">AI Data Center Water Consumption</p>
              <p className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78] mb-4 uppercase tracking-wider">Billions of Gallons / Year</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={waterData} margin={{ left: -20, right: 0, top: 4, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="label"
                      tick={{ fontSize: 10, fill: "#4A5B78", fontFamily: "var(--font-jetbrains)" }}
                      axisLine={false} tickLine={false} />
                    <YAxis
                      tick={{ fontSize: 10, fill: "#4A5B78", fontFamily: "var(--font-jetbrains)" }}
                      axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(13, 20, 36, 0.95)",
                        border: "1px solid rgba(0, 191, 255, 0.2)",
                        borderRadius: 8,
                        fontSize: 11,
                        color: "#F0F4F8",
                        fontFamily: "var(--font-jetbrains)",
                        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
                      }}
                      formatter={(v) => [`${v}B gallons`, "Usage"]}
                      labelStyle={{ color: "#4A5B78" }}
                    />
                    <Bar dataKey="gallons" radius={[4, 4, 0, 0]}>
                      {waterData.map((_, i) => (
                        <Cell
                          key={i}
                          fill={i === waterData.length - 1 ? "#00BFFF" : "rgba(0, 191, 255, 0.25)"}
                          stroke={i === waterData.length - 1 ? "#00BFFF" : "rgba(0, 191, 255, 0.4)"}
                          strokeWidth={1}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78] mt-3 tracking-wider uppercase">* 2026 projected based on current growth trajectory</p>
            </motion.div>

            {/* Cooling waste area chart */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={chartInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6 md:p-8">
              <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mb-1">Open-Loop Waste</p>
              <p className="font-[family-name:var(--font-syne)] text-base font-semibold text-[#F0F4F8] mb-6">Monthly Water Intake vs. Discharge</p>
              <p className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78] mb-4 uppercase tracking-wider">Millions of Gallons / Month</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={coolingWasteData} margin={{ left: -20, right: 0, top: 4, bottom: 0 }}>
                    <defs>
                      <linearGradient id="intakeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00BFFF" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#00BFFF" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="dischargeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFB020" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#FFB020" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="month"
                      tick={{ fontSize: 10, fill: "#4A5B78", fontFamily: "var(--font-jetbrains)" }}
                      axisLine={false} tickLine={false} />
                    <YAxis
                      tick={{ fontSize: 10, fill: "#4A5B78", fontFamily: "var(--font-jetbrains)" }}
                      axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(13, 20, 36, 0.95)",
                        border: "1px solid rgba(0, 191, 255, 0.2)",
                        borderRadius: 8,
                        fontSize: 11,
                        color: "#F0F4F8",
                        fontFamily: "var(--font-jetbrains)",
                        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
                      }}
                      formatter={(v) => [`${v}M gal`, "Volume"]}
                      labelStyle={{ color: "#4A5B78" }}
                    />
                    <Area type="monotone" dataKey="intake" stroke="#00BFFF" strokeWidth={2} fill="url(#intakeGrad)" />
                    <Area type="monotone" dataKey="discharged" stroke="#FFB020" strokeWidth={2} fill="url(#dischargeGrad)" strokeDasharray="4 3" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-6 mt-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-0.5 rounded bg-[#00BFFF]" />
                  <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78] uppercase tracking-wider">Water Intake</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-0.5 rounded bg-[#FFB020]" />
                  <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78] uppercase tracking-wider">Discharged (wasted)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — THE HIDDEN COST + COMPARISON
          ═══════════════════════════════════════════ */}
      <section ref={costRef} className="py-24 px-6 lg:px-8 bg-[#060B18] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(0,191,255,0.05)_0%,transparent_60%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={costInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
            className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#00BFFF]" />
              <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.3em] text-[#00BFFF]">The Cost</p>
            </div>
            <h2 className="font-[family-name:var(--font-syne)] text-xl md:text-2xl lg:text-3xl font-extrabold text-[#F0F4F8] leading-tight max-w-2xl">
              The hidden price of{" "}
              <span className="text-[#00BFFF]">doing nothing.</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-6">
            {/* Why this matters - enhanced */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={costInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6 md:p-8">
              <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mb-1">Industry Reality</p>
              <p className="font-[family-name:var(--font-syne)] text-lg font-semibold text-[#F0F4F8] mb-8">Why This Matters</p>
              <div className="space-y-8">
                {[
                  { icon: "01", title: "Invisible Waste", text: "Most data centers have zero real-time water monitoring. Leaks and inefficiencies go undetected for months, costing millions in wasted resources." },
                  { icon: "02", title: "Regulatory Pressure", text: "Water scarcity regulations are tightening globally. Non-compliant facilities face shutdowns, fines, and reputational damage that affects bottom lines." },
                  { icon: "03", title: "Scaling Crisis", text: "AI compute is growing 10× faster than water infrastructure. Without intervention, facilities will literally run dry — threatening operations." },
                  { icon: "04", title: "No Standard Exists", text: "Unlike power (PUE), there is no industry standard for measuring water efficiency in data centers. You can't optimize what you can't measure." },
                ].map(({ icon, title, text }, i) => (
                  <motion.div key={icon}
                    initial={{ opacity: 0, x: -16 }}
                    animate={costInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    className="flex gap-5 group"
                  >
                    <span className="font-[family-name:var(--font-jetbrains)] text-[11px] text-[#00BFFF] font-semibold shrink-0 mt-0.5 w-5">{icon}</span>
                    <div className="border-l border-white/[0.06] pl-5 group-hover:border-[#00BFFF]/30 transition-colors">
                      <p className="text-sm font-semibold text-[#F0F4F8] mb-1.5">{title}</p>
                      <p className="text-xs text-[#8B9DC3] leading-relaxed">{text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Efficiency comparison */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={costInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6 md:p-8 flex flex-col">
              <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mb-1">Efficiency Comparison</p>
              <p className="font-[family-name:var(--font-syne)] text-lg font-semibold text-[#F0F4F8] mb-8">Water Recovery Rate</p>
              <div className="flex-1 flex flex-col justify-center">
                <ComparisonBars />
              </div>
              <div className="mt-8 pt-6 border-t border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#00BFFF]/10 flex items-center justify-center">
                    <span className="text-[#00BFFF] font-[family-name:var(--font-syne)] font-bold text-sm">92%</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#F0F4F8]">Droplet-optimized systems</p>
                    <p className="text-[10px] text-[#4A5B78] font-[family-name:var(--font-jetbrains)]">achieve 92% water efficiency</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
