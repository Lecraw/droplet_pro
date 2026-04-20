"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";
import { Activity, Droplets, TrendingDown, AlertCircle, Zap, Thermometer, Target, Send, BotMessageSquare, Gauge } from "lucide-react";

const flowData = [
  { time: "00:00", flow: 4.2 }, { time: "02:00", flow: 3.9 },
  { time: "04:00", flow: 3.8 }, { time: "06:00", flow: 4.1 },
  { time: "08:00", flow: 4.5 }, { time: "10:00", flow: 4.9 },
  { time: "12:00", flow: 5.1 }, { time: "14:00", flow: 5.3 },
  { time: "16:00", flow: 4.8 }, { time: "18:00", flow: 4.6 },
  { time: "20:00", flow: 4.0 }, { time: "22:00", flow: 4.2 },
  { time: "24:00", flow: 4.2 },
];

const efficiencyData = [
  { day: "Mon", pue: 1.14 }, { day: "Tue", pue: 1.13 },
  { day: "Wed", pue: 1.15 }, { day: "Thu", pue: 1.12 },
  { day: "Fri", pue: 1.12 }, { day: "Sat", pue: 1.11 },
  { day: "Sun", pue: 1.12 },
];

const pressureData = [
  { time: "00:00", pressure: 3.1 }, { time: "04:00", pressure: 3.0 },
  { time: "08:00", pressure: 3.3 }, { time: "12:00", pressure: 3.5 },
  { time: "16:00", pressure: 3.4 }, { time: "20:00", pressure: 3.2 },
  { time: "24:00", pressure: 3.1 },
];

const temperatureByZone = [
  { zone: "A", temp: 22.1 }, { zone: "B", temp: 28.5 },
  { zone: "C", temp: 25.0 }, { zone: "D", temp: 21.8 },
  { zone: "E", temp: 20.5 }, { zone: "F", temp: 18.2 },
];

const waterUsageWeekly = [
  { day: "Mon", usage: 18200 }, { day: "Tue", usage: 17800 },
  { day: "Wed", usage: 19100 }, { day: "Thu", usage: 18500 },
  { day: "Fri", usage: 17200 }, { day: "Sat", usage: 14800 },
  { day: "Sun", usage: 13900 },
];

const recentEvents = [
  { time: "14:22", msg: "AI: Zone A flow reduced 0.3 L/s — thermal headroom detected", type: "ai" },
  { time: "12:05", msg: "SN-9024 synced telemetry batch — 1,240 data points", type: "info" },
  { time: "09:41", msg: "Warning: SN-9023 temperature elevated (28.5°C)", type: "warn" },
  { time: "08:00", msg: "Daily system health check passed — all nodes nominal", type: "ok" },
  { time: "03:15", msg: "AI: Water efficiency improved by 2.1% across Zone C", type: "ai" },
];

const aiSuggestions = [
  "How can I improve water flow in Zone B?",
  "Which sensors need maintenance?",
  "Show me water savings this month",
  "Why is Zone B temperature high?",
];

export default function DashboardOverview() {
  const [aiQuery, setAiQuery] = useState("");
  const [aiMessages, setAiMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  const handleAiSubmit = () => {
    if (!aiQuery.trim()) return;
    const question = aiQuery;
    setAiMessages((prev) => [...prev, { role: "user", text: question }]);
    setAiQuery("");
    setIsThinking(true);

    setTimeout(() => {
      const responses: Record<string, string> = {
        "flow": "Based on current telemetry, Zone B has a flow rate of 1.2 L/s — well below the 4.0 L/s baseline. I recommend checking SN-9023 and SN-9029 for possible blockages or valve restrictions. Increasing the flow rate by 2.0 L/s could improve thermal dissipation by 18%.",
        "maintenance": "Two sensors are flagged: SN-9023 (Zone B Return) is showing elevated temperatures at 28.5°C, and SN-9029 (Zone B Distribution Header) has low flow at 0.8 L/s. SN-9034 (Zone F Blowdown Valve) is offline and needs physical inspection. I recommend scheduling maintenance for all three within the next 48 hours.",
        "savings": "This month you've saved 128,000 gallons compared to your pre-Droplet baseline — a 34% reduction. At current rates, you're on track for 400,000 gallons saved by end of month. Zone C (AI Cluster) contributed the most savings through dynamic flow optimization.",
        "temperature": "Zone B temperature is elevated at 28.5°C due to reduced flow rate (1.2 L/s vs. 4.0 L/s baseline). The distribution header sensor SN-9029 shows only 0.8 L/s throughput, suggesting a potential valve issue. Restoring normal flow should bring temperatures back within the 20-25°C target range.",
      };

      const key = Object.keys(responses).find((k) => question.toLowerCase().includes(k));
      const answer = key
        ? responses[key]
        : "Based on your sensor data, I can see all 16 nodes are reporting telemetry across 6 zones. Current system efficiency is at 94% with a PUE of 1.12. I'd recommend focusing on Zone B where flow rates are below baseline — optimizing this zone alone could save an additional 4,200 gallons per week.";

      setAiMessages((prev) => [...prev, { role: "ai", text: answer }]);
      setIsThinking(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-[0.25em] text-[#00a6e0] mb-1">Live View</p>
          <h1 className="text-3xl font-bold text-[#0a1628] font-[family-name:var(--font-inter-tight)]">Overview</h1>
          <p className="text-[#64748b] text-sm">System performance across all deployment zones.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-[family-name:var(--font-jetbrains-mono)] text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
          <button className="bg-white/75 backdrop-blur-sm border border-[#e2e8f0] px-4 py-2 rounded-full text-xs font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-wider hover:bg-white transition-colors text-[#64748b]">
            Export Report
          </button>
        </div>
      </div>

      {/* ── Hero stats — 2 large accent-bar cards + 2 dark cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Accent-bar style */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#EFF6FF] to-white p-5 border-l-4 border-[#00a6e0]">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-emerald-500" />
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-widest text-[#94a3b8]">Active Nodes</p>
          </div>
          <p className="text-3xl font-bold text-[#0a1628] font-[family-name:var(--font-inter-tight)]">16</p>
          <p className="text-[10px] mt-1 font-[family-name:var(--font-jetbrains-mono)] text-emerald-500">+4 this week</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#ECFDF5] to-white p-5 border-l-4 border-emerald-500">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-4 h-4 text-blue-500" />
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-widest text-[#94a3b8]">Water Saved (MTD)</p>
          </div>
          <p className="text-3xl font-bold text-[#0a1628] font-[family-name:var(--font-inter-tight)]">128K<span className="text-sm font-normal text-[#94a3b8] ml-1">gal</span></p>
          <p className="text-[10px] mt-1 font-[family-name:var(--font-jetbrains-mono)] text-emerald-500">On track for 400K</p>
        </motion.div>

        {/* Dark style */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}
          className="rounded-2xl bg-[#0a1628] p-5 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-emerald-400" />
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-widest text-[#64748b]">Current PUE</p>
          </div>
          <p className="text-3xl font-bold font-[family-name:var(--font-inter-tight)]">1.12</p>
          <p className="text-[10px] mt-1 font-[family-name:var(--font-jetbrains-mono)] text-emerald-400">Target: 1.10</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.09 }}
          className="rounded-2xl bg-[#0a1628] p-5 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-[#00a6e0]" />
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-widest text-[#64748b]">AI Efficiency</p>
          </div>
          <p className="text-3xl font-bold font-[family-name:var(--font-inter-tight)]">94<span className="text-sm font-normal text-[#64748b] ml-1">%</span></p>
          <p className="text-[10px] mt-1 font-[family-name:var(--font-jetbrains-mono)] text-[#00a6e0]">+6% this month</p>
        </motion.div>
      </div>

      {/* ── Secondary stats — minimal inline strip (no boxes) ── */}
      <div className="flex items-center divide-x divide-[#e2e8f0] bg-white/60 backdrop-blur-sm rounded-xl px-2 py-3">
        {[
          { label: "Flow Rate", value: "4.2", unit: "L/s", icon: <Droplets className="w-3.5 h-3.5 text-[#00a6e0]" />, trend: "-12% vs baseline", up: true },
          { label: "Alerts", value: "3", unit: "", icon: <AlertCircle className="w-3.5 h-3.5 text-amber-400" />, trend: "2 warn, 1 offline", up: false },
          { label: "Avg Temp", value: "23.8", unit: "°C", icon: <Thermometer className="w-3.5 h-3.5 text-[#00a6e0]" />, trend: "-0.5°C vs yesterday", up: true },
          { label: "Pressure", value: "3.2", unit: "bar", icon: <Gauge className="w-3.5 h-3.5 text-[#94a3b8]" />, trend: "Normal range", up: true },
        ].map(({ label, value, unit, icon, trend, up }) => (
          <div key={label} className="flex items-center gap-3 px-5 flex-1">
            {icon}
            <div>
              <p className="text-sm font-bold text-[#0a1628] font-[family-name:var(--font-inter-tight)]">
                {value}<span className="text-xs font-normal text-[#94a3b8] ml-0.5">{unit}</span>
              </p>
              <p className="font-[family-name:var(--font-jetbrains-mono)] text-[8px] uppercase tracking-widest text-[#94a3b8]">{label}</p>
            </div>
            <p className={`text-[9px] font-[family-name:var(--font-jetbrains-mono)] ml-auto hidden xl:block ${up ? "text-emerald-500" : "text-amber-500"}`}>{trend}</p>
          </div>
        ))}
      </div>

      {/* ── Charts Row 1 — main flow (borderless) + PUE (bordered) ── */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main flow chart — no border, just content with a blue top accent */}
        <div className="lg:col-span-2 relative">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00a6e0] to-[#06B6D4] rounded-full" />
          <div className="pt-5">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-widest text-[#94a3b8] mb-0.5">Live Telemetry</p>
                <h2 className="text-base font-bold text-[#0a1628]">24-Hour Flow Rate</h2>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#00a6e0] font-[family-name:var(--font-inter-tight)]">4.2</p>
                <p className="text-[9px] font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-widest text-[#94a3b8]">L/s current</p>
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={flowData} margin={{ left: -15, right: 0 }}>
                  <defs>
                    <linearGradient id="flowGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00a6e0" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#00a6e0" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} interval={2} />
                  <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={[3, 6]} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: 12 }} />
                  <Area type="monotone" dataKey="flow" stroke="#00a6e0" strokeWidth={2} fill="url(#flowGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* PUE — dark card */}
        <div className="bg-[#0a1628] p-6 rounded-2xl">
          <div className="mb-6">
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-widest text-[#64748b] mb-0.5">This Week</p>
            <h2 className="text-base font-bold text-white">PUE Trend</h2>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={efficiencyData} margin={{ left: -15, right: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis domain={[1.08, 1.18]} tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "8px", background: "#1E293B", border: "1px solid #334155", fontSize: 12, color: "#e2e8f0" }} />
                <Line type="monotone" dataKey="pue" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4, fill: "#10B981", stroke: "#0a1628", strokeWidth: 2 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Charts Row 2 — varied styles ── */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pressure — white card with border */}
        <div className="bg-white/75 backdrop-blur-sm p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
          <div className="mb-6">
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-widest text-[#94a3b8] mb-0.5">24-Hour</p>
            <h2 className="text-base font-bold text-[#0a1628]">Pressure Trend</h2>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pressureData} margin={{ left: -15, right: 0 }}>
                <defs>
                  <linearGradient id="pressureGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis domain={[2.5, 4]} tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: 12 }} />
                <Area type="monotone" dataKey="pressure" stroke="#8B5CF6" strokeWidth={2} fill="url(#pressureGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Temperature by zone — inline horizontal bars (no chart wrapper) */}
        <div className="p-6">
          <div className="mb-5">
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-widest text-[#94a3b8] mb-0.5">Current</p>
            <h2 className="text-base font-bold text-[#0a1628]">Temperature by Zone</h2>
          </div>
          <div className="space-y-3">
            {temperatureByZone.map(({ zone, temp }) => {
              const pct = (temp / 35) * 100;
              const hot = temp > 26;
              return (
                <div key={zone} className="flex items-center gap-3">
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#94a3b8] w-8 uppercase tracking-wider">Zone {zone}</span>
                  <div className="flex-1 h-2.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className={`h-full rounded-full ${hot ? "bg-gradient-to-r from-amber-400 to-red-400" : "bg-gradient-to-r from-[#00a6e0] to-[#06B6D4]"}`}
                    />
                  </div>
                  <span className={`font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold w-12 text-right ${hot ? "text-amber-500" : "text-[#0a1628]"}`}>{temp}°C</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-[#e2e8f0]">
            <p className="text-[10px] font-[family-name:var(--font-jetbrains-mono)] text-[#94a3b8] uppercase tracking-wider">Target range: 18–25°C</p>
          </div>
        </div>

        {/* Water usage — subtle bg, no border */}
        <div className="bg-[rgba(250,252,255,0.7)] p-6 rounded-2xl">
          <div className="mb-6">
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-widest text-[#94a3b8] mb-0.5">This Week</p>
            <h2 className="text-base font-bold text-[#0a1628]">Water Usage</h2>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waterUsageWeekly} margin={{ left: -5, right: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: 12 }} />
                <Bar dataKey="usage" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Zone Status — open layout with progress rings ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-widest text-[#94a3b8] mb-0.5">Infrastructure</p>
            <h2 className="text-base font-bold text-[#0a1628]">Zone Status</h2>
          </div>
          <span className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-widest text-[#94a3b8]">6 active zones</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {[
            { zone: "Zone A", flow: 4.2, temp: 22.1, status: "Online", eff: 92 },
            { zone: "Zone B", flow: 1.2, temp: 28.5, status: "Warning", eff: 71 },
            { zone: "Zone C", flow: 8.5, temp: 25.0, status: "Online", eff: 95 },
            { zone: "Zone D", flow: 2.1, temp: 21.8, status: "Online", eff: 97 },
            { zone: "Zone E", flow: 3.4, temp: 20.5, status: "Online", eff: 93 },
            { zone: "Zone F", flow: 1.5, temp: 18.2, status: "Online", eff: 89 },
          ].map(({ zone, flow, temp, status, eff }) => {
            const warn = status === "Warning";
            return (
              <motion.div key={zone} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className={`relative p-4 rounded-xl text-center ${warn ? "bg-amber-50 ring-1 ring-amber-200" : "bg-white/75 backdrop-blur-sm border border-[#e2e8f0]"}`}>
                {/* Efficiency ring */}
                <div className="mx-auto w-14 h-14 mb-3 relative">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.9" fill="none"
                      stroke={warn ? "#F59E0B" : "#10B981"} strokeWidth="3"
                      strokeDasharray={`${eff} ${100 - eff}`} strokeLinecap="round" />
                  </svg>
                  <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${warn ? "text-amber-600" : "text-emerald-600"}`}>{eff}%</span>
                </div>
                <p className="text-sm font-bold text-[#0a1628] mb-1">{zone}</p>
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${warn ? "bg-amber-400" : "bg-emerald-500"}`} />
                  <span className={`text-[9px] font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-wider ${warn ? "text-amber-600" : "text-emerald-600"}`}>{status}</span>
                </div>
                <div className="flex justify-center gap-3 text-[10px] font-[family-name:var(--font-jetbrains-mono)] text-[#94a3b8]">
                  <span>{flow} L/s</span>
                  <span>{temp}°C</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Recent Events — timeline style with left accent ── */}
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-4">
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-widest text-[#94a3b8] mb-0.5">Activity Feed</p>
            <h2 className="text-base font-bold text-[#0a1628]">Recent Events</h2>
          </div>
          <div className="relative pl-4">
            {/* Vertical timeline line */}
            <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-[#00a6e0] via-[#e2e8f0] to-transparent" />
            <div className="space-y-1">
              {recentEvents.map(({ time, msg, type }, i) => (
                <div key={i} className="relative flex items-start gap-3 py-2.5">
                  {/* Dot on timeline */}
                  <span className={`absolute -left-4 top-3.5 w-2.5 h-2.5 rounded-full ring-2 ring-white ${
                    type === "ai" ? "bg-[#00a6e0]" : type === "warn" ? "bg-amber-400" : type === "ok" ? "bg-emerald-400" : "bg-[#CBD5E1]"
                  }`} />
                  <div className="flex-1 min-w-0 ml-2">
                    <p className="text-xs text-[#0a1628] leading-relaxed">{msg}</p>
                  </div>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] text-[#94a3b8] shrink-0 pt-0.5">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Ask Droplet AI — gradient bg ── */}
        <div className="lg:col-span-3 bg-gradient-to-br from-[#0a1628] to-[#1E293B] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur">
              <BotMessageSquare className="w-5 h-5 text-[#00a6e0]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Ask Droplet AI</h2>
              <p className="text-xs text-[#64748b]">Get insights and recommendations from your sensor data</p>
            </div>
          </div>

          {/* Suggestion pills */}
          {aiMessages.length === 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {aiSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setAiQuery(suggestion)}
                  className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-[#94a3b8] hover:border-[#00a6e0]/50 hover:text-[#00a6e0] hover:bg-[#00a6e0]/10 transition-all font-[family-name:var(--font-jetbrains-mono)] cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Chat messages */}
          {aiMessages.length > 0 && (
            <div className="space-y-4 mb-5 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
              {aiMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#00a6e0] text-white rounded-br-md"
                      : "bg-white/5 border border-white/10 text-[#e2e8f0] rounded-bl-md"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00a6e0] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00a6e0] animate-bounce [animation-delay:0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00a6e0] animate-bounce [animation-delay:0.3s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAiSubmit()}
              placeholder="Ask about your water system..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#00a6e0]/30 focus:border-[#00a6e0]/50 transition-all"
            />
            <button
              onClick={handleAiSubmit}
              disabled={!aiQuery.trim()}
              className="p-3 bg-[#00a6e0] text-white rounded-xl hover:bg-[#0088b8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
