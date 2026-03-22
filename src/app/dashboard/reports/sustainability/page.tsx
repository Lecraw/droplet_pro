"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie,
} from "recharts";
import { ArrowLeft, Download, Printer, Droplets, Leaf, TrendingDown, Zap, ThermometerSun, Recycle, Target, Award } from "lucide-react";

/* ── Report Data ── */
const monthlyWater = [
  { month: "Jan", usage: 142, baseline: 198 },
  { month: "Feb", usage: 131, baseline: 192 },
  { month: "Mar", usage: 148, baseline: 205 },
  { month: "Apr", usage: 156, baseline: 218 },
  { month: "May", usage: 168, baseline: 231 },
  { month: "Jun", usage: 189, baseline: 260 },
  { month: "Jul", usage: 201, baseline: 278 },
  { month: "Aug", usage: 195, baseline: 272 },
  { month: "Sep", usage: 172, baseline: 240 },
  { month: "Oct", usage: 155, baseline: 215 },
  { month: "Nov", usage: 138, baseline: 197 },
  { month: "Dec", usage: 133, baseline: 190 },
];

const quarterlyEfficiency = [
  { quarter: "Q1 2025", pue: 1.22, wue: 1.4 },
  { quarter: "Q2 2025", pue: 1.18, wue: 1.2 },
  { quarter: "Q3 2025", pue: 1.15, wue: 1.0 },
  { quarter: "Q4 2025", pue: 1.12, wue: 0.8 },
];

const zoneBreakdown = [
  { zone: "Zone A", usage: 580, percentage: 30 },
  { zone: "Zone B", usage: 310, percentage: 16 },
  { zone: "Zone C", usage: 740, percentage: 38 },
  { zone: "Zone D", usage: 298, percentage: 16 },
];

const pieData = [
  { name: "Cooling Towers", value: 42, fill: "#00BFFF" },
  { name: "GPU Clusters", value: 31, fill: "#00E5A0" },
  { name: "HVAC Systems", value: 15, fill: "#FFB020" },
  { name: "Other", value: 12, fill: "#4A5B78" },
];

const savingsTimeline = [
  { month: "Jan", savings: 12400 },
  { month: "Feb", savings: 14200 },
  { month: "Mar", savings: 13800 },
  { month: "Apr", savings: 16100 },
  { month: "May", savings: 18400 },
  { month: "Jun", savings: 22100 },
  { month: "Jul", savings: 24800 },
  { month: "Aug", savings: 23900 },
  { month: "Sep", savings: 19600 },
  { month: "Oct", savings: 17200 },
  { month: "Nov", savings: 15100 },
  { month: "Dec", savings: 13800 },
];

const tooltipStyle = {
  background: "rgba(13, 20, 36, 0.95)",
  border: "1px solid rgba(0, 191, 255, 0.15)",
  borderRadius: 8,
  fontSize: 11,
  color: "#F0F4F8",
  fontFamily: "var(--font-jetbrains)",
  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
};

const monoFont = "var(--font-jetbrains)";

export default function SustainabilityReportPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      {/* Back nav + actions */}
      <div className="flex items-center justify-between">
        <Link href="/dashboard/reports" className="flex items-center gap-2 text-[#8B9DC3] hover:text-[#00BFFF] transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-wider">Back to Reports</span>
        </Link>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#0D1424] border border-white/[0.06] px-4 py-2 rounded-lg text-xs font-[family-name:var(--font-jetbrains)] uppercase tracking-wider hover:bg-white/[0.04] transition-colors text-[#8B9DC3]">
            <Printer className="w-3.5 h-3.5" />
            Print
          </button>
          <button className="flex items-center gap-2 bg-[#00BFFF] hover:bg-[#00D4FF] text-[#060B18] px-4 py-2 rounded-lg text-xs font-medium transition-all">
            <Download className="w-3.5 h-3.5" />
            Export PDF
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          REPORT HEADER
          ═══════════════════════════════════════ */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(0,191,255,0.06)_0%,transparent_70%)]" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#00E5A0]/10 rounded-lg border border-[#00E5A0]/15">
              <Leaf className="w-5 h-5 text-[#00E5A0]" />
            </div>
            <div>
              <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.25em] text-[#00E5A0]">Sustainability Report</p>
              <p className="text-xs text-[#4A5B78]">Generated Jan 15, 2026</p>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#F0F4F8] font-[family-name:var(--font-syne)] mb-2">
            Annual Sustainability Report
          </h1>
          <p className="text-[#8B9DC3] text-sm max-w-2xl">
            Comprehensive analysis of water consumption, efficiency improvements, and environmental impact
            across all deployment zones for the full year 2025.
          </p>
          <div className="flex items-center gap-6 mt-6">
            <div>
              <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-wider text-[#4A5B78]">Period</p>
              <p className="text-sm font-medium text-[#F0F4F8]">Jan 1 — Dec 31, 2025</p>
            </div>
            <div className="w-px h-8 bg-white/[0.06]" />
            <div>
              <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-wider text-[#4A5B78]">Facility</p>
              <p className="text-sm font-medium text-[#F0F4F8]">Primary Data Center — West Region</p>
            </div>
            <div className="w-px h-8 bg-white/[0.06]" />
            <div>
              <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-wider text-[#4A5B78]">Classification</p>
              <p className="text-sm font-medium text-[#F0F4F8]">Internal — Confidential</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════
          EXECUTIVE SUMMARY KPIs
          ═══════════════════════════════════════ */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.25em] text-[#00BFFF] mb-3">Executive Summary</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Droplets, label: "Water Saved", value: "1.93M", unit: "gallons", change: "-34% vs 2024", positive: true },
            { icon: TrendingDown, label: "Cost Reduction", value: "$211K", unit: "saved", change: "+47% vs 2024", positive: true },
            { icon: Zap, label: "Final PUE", value: "1.12", unit: "", change: "from 1.28 in Jan", positive: true },
            { icon: Recycle, label: "Water Reclaimed", value: "68%", unit: "", change: "+23pp vs 2024", positive: true },
          ].map(({ icon: Icon, label, value, unit, change, positive }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
              className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-white/[0.04] rounded-lg border border-white/[0.06]">
                  <Icon className="w-4 h-4 text-[#00BFFF]" />
                </div>
              </div>
              <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mb-1">{label}</p>
              <p className="text-2xl font-bold text-[#F0F4F8] font-[family-name:var(--font-syne)]">
                {value}<span className="text-sm font-normal text-[#4A5B78] ml-1">{unit}</span>
              </p>
              <p className={`text-[10px] mt-1.5 font-[family-name:var(--font-jetbrains)] ${positive ? "text-[#00E5A0]" : "text-[#FFB020]"}`}>{change}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════
          SECTION 1: WATER CONSUMPTION
          ═══════════════════════════════════════ */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6 md:p-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-[family-name:var(--font-jetbrains)] text-[10px] text-[#00BFFF] font-semibold">01</span>
          <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78]">Water Consumption</p>
        </div>
        <h2 className="text-lg font-bold text-[#F0F4F8] font-[family-name:var(--font-syne)] mb-2">Monthly Usage vs. Baseline</h2>
        <p className="text-xs text-[#8B9DC3] mb-6 max-w-xl">
          Actual water consumption compared to pre-Droplet baseline across all zones. The baseline represents projected usage
          without AI-driven optimization.
        </p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyWater} margin={{ left: -15, right: 0, top: 4, bottom: 0 }}>
              <defs>
                <linearGradient id="usageGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00BFFF" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#00BFFF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="baselineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF4757" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#FF4757" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#4A5B78", fontFamily: monoFont }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#4A5B78", fontFamily: monoFont }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#4A5B78" }}
                formatter={(v) => [`${v}K gallons`, ""]} />
              <Area type="monotone" dataKey="baseline" stroke="#FF4757" strokeWidth={1.5} fill="url(#baselineGrad)" strokeDasharray="6 4"
                dot={false} name="Baseline (no optimization)" />
              <Area type="monotone" dataKey="usage" stroke="#00BFFF" strokeWidth={2} fill="url(#usageGrad)"
                dot={{ r: 3, fill: "#0D1424", stroke: "#00BFFF", strokeWidth: 2 }}
                activeDot={{ r: 5, fill: "#00BFFF", stroke: "#060B18", strokeWidth: 2 }}
                name="Actual Usage" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 rounded bg-[#00BFFF]" />
            <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78] uppercase tracking-wider">Actual Usage</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 rounded bg-[#FF4757] opacity-60" style={{ borderBottom: "1px dashed" }} />
            <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78] uppercase tracking-wider">Baseline (no optimization)</span>
          </div>
        </div>
        <div className="mt-6 p-4 bg-white/[0.02] rounded-xl border border-white/[0.04]">
          <p className="text-xs text-[#8B9DC3] leading-relaxed">
            <span className="font-semibold text-[#F0F4F8]">Key Finding:</span> Total annual consumption was <span className="font-semibold text-[#00BFFF]">1,928,000 gallons</span>,
            compared to a projected baseline of <span className="text-[#FF4757]">2,896,000 gallons</span>. This represents a <span className="font-semibold text-[#00E5A0]">33.4% reduction</span> in
            water usage, saving approximately 968,000 gallons over the year. Peak savings occurred during summer months (Jun-Aug) when cooling
            demand is highest and AI optimization has the greatest impact.
          </p>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════
          SECTION 2: EFFICIENCY IMPROVEMENTS
          ═══════════════════════════════════════ */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="grid lg:grid-cols-2 gap-6">
        {/* PUE/WUE Trend */}
        <div className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6 md:p-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-[family-name:var(--font-jetbrains)] text-[10px] text-[#00BFFF] font-semibold">02</span>
            <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78]">Efficiency</p>
          </div>
          <h2 className="text-lg font-bold text-[#F0F4F8] font-[family-name:var(--font-syne)] mb-6">PUE & WUE Quarterly Trend</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={quarterlyEfficiency} margin={{ left: -15, right: 0, top: 4, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="quarter" tick={{ fontSize: 10, fill: "#4A5B78", fontFamily: monoFont }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#4A5B78", fontFamily: monoFont }} axisLine={false} tickLine={false} domain={[0.6, 1.5]} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#4A5B78" }} />
                <Line type="monotone" dataKey="pue" stroke="#00BFFF" strokeWidth={2.5} name="PUE"
                  dot={{ r: 4, fill: "#0D1424", stroke: "#00BFFF", strokeWidth: 2 }} />
                <Line type="monotone" dataKey="wue" stroke="#00E5A0" strokeWidth={2.5} name="WUE (L/kWh)"
                  dot={{ r: 4, fill: "#0D1424", stroke: "#00E5A0", strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 rounded bg-[#00BFFF]" />
              <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78] uppercase tracking-wider">PUE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 rounded bg-[#00E5A0]" />
              <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78] uppercase tracking-wider">WUE (L/kWh)</span>
            </div>
          </div>
        </div>

        {/* Water Usage by System */}
        <div className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6 md:p-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-[family-name:var(--font-jetbrains)] text-[10px] text-[#00BFFF] font-semibold">03</span>
            <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78]">Distribution</p>
          </div>
          <h2 className="text-lg font-bold text-[#F0F4F8] font-[family-name:var(--font-syne)] mb-6">Water Usage by System</h2>
          <div className="h-56 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {pieData.map(({ name, value, fill }) => (
              <div key={name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: fill }} />
                <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#8B9DC3]">{name} ({value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════
          SECTION 3: ZONE BREAKDOWN
          ═══════════════════════════════════════ */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6 md:p-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-[family-name:var(--font-jetbrains)] text-[10px] text-[#00BFFF] font-semibold">04</span>
          <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78]">Zone Analysis</p>
        </div>
        <h2 className="text-lg font-bold text-[#F0F4F8] font-[family-name:var(--font-syne)] mb-6">Water Consumption by Zone</h2>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={zoneBreakdown} layout="vertical" margin={{ left: 10, right: 20, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "#4A5B78", fontFamily: monoFont }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="zone" tick={{ fontSize: 11, fill: "#F0F4F8", fontFamily: monoFont }} axisLine={false} tickLine={false} width={60} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}K gallons`, "Usage"]} />
              <Bar dataKey="usage" radius={[0, 4, 4, 0]} barSize={20}>
                {zoneBreakdown.map((_, i) => (
                  <Cell key={i} fill={["#00BFFF", "#FFB020", "#00E5A0", "#4A5B78"][i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/[0.06]">
          {zoneBreakdown.map(({ zone, usage, percentage }, i) => (
            <div key={zone} className="text-center">
              <p className="font-[family-name:var(--font-syne)] text-xl font-bold text-[#F0F4F8]">{percentage}%</p>
              <p className="text-xs text-[#8B9DC3] mt-0.5">{zone}</p>
              <p className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78] mt-0.5">{usage}K gal</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════
          SECTION 4: COST SAVINGS
          ═══════════════════════════════════════ */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6 md:p-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-[family-name:var(--font-jetbrains)] text-[10px] text-[#00BFFF] font-semibold">05</span>
          <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78]">Financial Impact</p>
        </div>
        <h2 className="text-lg font-bold text-[#F0F4F8] font-[family-name:var(--font-syne)] mb-2">Monthly Cost Savings</h2>
        <p className="text-xs text-[#8B9DC3] mb-6">Combined water and energy savings attributed to Droplet optimization engine.</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={savingsTimeline} margin={{ left: -10, right: 0, top: 4, bottom: 0 }}>
              <defs>
                <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00E5A0" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#00E5A0" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#4A5B78", fontFamily: monoFont }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#4A5B78", fontFamily: monoFont }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `$${v / 1000}K`} />
              <Tooltip contentStyle={tooltipStyle}
                formatter={(v) => [`$${Number(v).toLocaleString()}`, "Savings"]}
                labelStyle={{ color: "#4A5B78" }} />
              <Bar dataKey="savings" fill="url(#savingsGrad)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 p-4 bg-white/[0.02] rounded-xl border border-white/[0.04]">
          <p className="text-xs text-[#8B9DC3] leading-relaxed">
            <span className="font-semibold text-[#F0F4F8]">Financial Summary:</span> Total annual savings of <span className="font-semibold text-[#00E5A0]">$211,400</span> — comprised of
            $156,200 in direct water cost reduction and $55,200 in energy savings from optimized pump operations. ROI on Droplet deployment: <span className="font-semibold text-[#00E5A0]">340%</span>.
            Payback period: 4.2 months.
          </p>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════
          SECTION 5: MILESTONES & CERTIFICATIONS
          ═══════════════════════════════════════ */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6 md:p-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-[family-name:var(--font-jetbrains)] text-[10px] text-[#00BFFF] font-semibold">06</span>
          <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78]">Achievements</p>
        </div>
        <h2 className="text-lg font-bold text-[#F0F4F8] font-[family-name:var(--font-syne)] mb-6">2025 Milestones</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: Award, title: "EPA Water Sense Certification", desc: "Achieved EPA Water Sense Partner certification in Q2 2025, recognizing our facility's commitment to water efficiency.", date: "Apr 2025" },
            { icon: Target, title: "Sub-1.15 PUE Target Met", desc: "Reached and sustained PUE below 1.15 starting Q3, placing facility in top 10% of hyperscale operations globally.", date: "Jul 2025" },
            { icon: Recycle, title: "68% Water Reclamation Rate", desc: "Implemented closed-loop reclamation in Zone A and C, achieving 68% water recovery — up from 45% in 2024.", date: "Sep 2025" },
            { icon: ThermometerSun, title: "Zero Thermal Violations", desc: "Maintained discharge temperatures within EPA limits for all 365 days — zero thermal compliance violations for the full year.", date: "Dec 2025" },
            { icon: Leaf, title: "Carbon Offset: 420 Tons", desc: "Reduced energy consumption for cooling contributed to an estimated 420 metric tons of CO2 equivalent offset.", date: "Dec 2025" },
            { icon: Zap, title: "4,200+ AI Optimizations", desc: "Droplet AI engine executed over 4,200 micro-adjustments across all zones, each improving flow, temperature, or pressure efficiency.", date: "Full Year" },
          ].map(({ icon: Icon, title, desc, date }, i) => (
            <div key={title} className="flex gap-4 p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-colors">
              <div className="p-2 bg-[#00E5A0]/10 rounded-lg border border-[#00E5A0]/15 h-fit">
                <Icon className="w-4 h-4 text-[#00E5A0]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-[#F0F4F8]">{title}</p>
                  <span className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#4A5B78] uppercase tracking-wider bg-white/[0.04] px-1.5 py-0.5 rounded">{date}</span>
                </div>
                <p className="text-xs text-[#8B9DC3] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════
          SECTION 6: RECOMMENDATIONS
          ═══════════════════════════════════════ */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6 md:p-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-[family-name:var(--font-jetbrains)] text-[10px] text-[#00BFFF] font-semibold">07</span>
          <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78]">Looking Ahead</p>
        </div>
        <h2 className="text-lg font-bold text-[#F0F4F8] font-[family-name:var(--font-syne)] mb-6">2026 Recommendations</h2>
        <div className="space-y-4">
          {[
            { priority: "High", title: "Expand closed-loop reclamation to Zone B and D", impact: "Projected additional 15% water savings ($32K/year)" },
            { priority: "High", title: "Replace Zone B condenser loop filters (quarterly schedule)", impact: "Prevent recurring thermal warnings, reduce downtime risk" },
            { priority: "Medium", title: "Deploy 8 additional sensor nodes in undermonitored areas", impact: "Improve anomaly detection coverage from 89% to 97%" },
            { priority: "Medium", title: "Implement predictive maintenance scheduling via Droplet AI", impact: "Estimated 20% reduction in unplanned maintenance events" },
            { priority: "Low", title: "Evaluate greywater recycling for cooling tower makeup", impact: "Could reduce municipal water dependency by 25%" },
          ].map(({ priority, title, impact }, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.04]">
              <span className={`font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border shrink-0 mt-0.5 ${
                priority === "High" ? "bg-[#00BFFF]/10 text-[#00BFFF] border-[#00BFFF]/15"
                : priority === "Medium" ? "bg-[#FFB020]/10 text-[#FFB020] border-[#FFB020]/15"
                : "bg-white/[0.04] text-[#4A5B78] border-white/[0.06]"
              }`}>{priority}</span>
              <div>
                <p className="text-sm font-medium text-[#F0F4F8]">{title}</p>
                <p className="text-xs text-[#8B9DC3] mt-1">{impact}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="text-center py-6 border-t border-white/[0.06]">
        <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78]">
          End of Report — Generated by Droplet Intelligence OS v2.1.0
        </p>
        <p className="text-[10px] text-[#4A5B78] mt-1">
          Confidential — For internal use only. Data sourced from 42 active sensor nodes across 4 deployment zones.
        </p>
      </motion.div>
    </div>
  );
}
