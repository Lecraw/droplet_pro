"use client";

import { motion } from "framer-motion";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";
import { Activity, Droplets, TrendingDown, AlertCircle, Zap, Thermometer, Wind, Target } from "lucide-react";

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

const recentEvents = [
  { time: "14:22", msg: "AI: Zone A flow reduced 0.3 L/s — thermal headroom detected", type: "ai" },
  { time: "12:05", msg: "SN-9024 synced telemetry batch — 1,240 data points", type: "info" },
  { time: "09:41", msg: "Warning: SN-9023 temperature elevated (28.5°C)", type: "warn" },
  { time: "08:00", msg: "Daily system health check passed — all nodes nominal", type: "ok" },
  { time: "03:15", msg: "AI: Micro cooling loop efficiency improved by 2.1%", type: "ai" },
];

const monoFont = "var(--font-jetbrains)";

const tooltipStyle = {
  background: "rgba(13, 20, 36, 0.95)",
  border: "1px solid rgba(0, 191, 255, 0.15)",
  borderRadius: 8,
  fontSize: 11,
  color: "#F0F4F8",
  fontFamily: monoFont,
  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
};

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.25em] text-[#00BFFF] mb-1">Live View</p>
          <h1 className="text-3xl font-bold text-[#F0F4F8] font-[family-name:var(--font-syne)]">Overview</h1>
          <p className="text-[#8B9DC3] text-sm">System performance across all deployment zones.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-[family-name:var(--font-jetbrains)] text-[#00E5A0] bg-[#00E5A0]/10 border border-[#00E5A0]/15 px-3 py-1.5 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] shadow-[0_0_6px_rgba(0,229,160,0.5)] animate-pulse" />
            Live
          </span>
          <button className="bg-[#0D1424] border border-white/[0.06] px-4 py-2 rounded-lg text-xs font-[family-name:var(--font-jetbrains)] uppercase tracking-wider hover:bg-white/[0.04] transition-colors text-[#8B9DC3]">
            Export Report
          </button>
        </div>
      </div>

      {/* 8 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Nodes" value="42" unit="" icon={<Activity className="w-4 h-4 text-[#00E5A0]" />} trend="+3 this week" trendUp />
        <StatCard title="Total Flow Rate" value="4.2" unit="L/s" icon={<Droplets className="w-4 h-4 text-[#00BFFF]" />} trend="-12% vs baseline" trendUp />
        <StatCard title="Water Saved (MTD)" value="128K" unit="gal" icon={<TrendingDown className="w-4 h-4 text-[#00BFFF]" />} trend="On track for 400K" trendUp />
        <StatCard title="System Alerts" value="1" unit="" icon={<AlertCircle className="w-4 h-4 text-[#FFB020]" />} trend="Zone B warning" trendUp={false} />
        <StatCard title="Avg Temperature" value="23.8" unit="°C" icon={<Thermometer className="w-4 h-4 text-[#00BFFF]" />} trend="-0.5°C vs yesterday" trendUp />
        <StatCard title="Current PUE" value="1.12" unit="" icon={<Zap className="w-4 h-4 text-[#00E5A0]" />} trend="Target: 1.10" trendUp />
        <StatCard title="Avg Pressure" value="3.2" unit="bar" icon={<Wind className="w-4 h-4 text-[#4A5B78]" />} trend="Within normal range" trendUp />
        <StatCard title="AI Efficiency" value="94" unit="%" icon={<Target className="w-4 h-4 text-[#00BFFF]" />} trend="+6% this month" trendUp />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main flow chart */}
        <div className="lg:col-span-2 bg-[#0D1424]/60 p-6 rounded-2xl border border-white/[0.06]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mb-0.5">Live Telemetry</p>
              <h2 className="text-base font-bold text-[#F0F4F8]">24-Hour Flow Rate</h2>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#00BFFF] font-[family-name:var(--font-syne)] drop-shadow-[0_0_8px_rgba(0,191,255,0.3)]">4.2</p>
              <p className="text-[9px] font-[family-name:var(--font-jetbrains)] uppercase tracking-[0.2em] text-[#4A5B78]">L/s current</p>
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={flowData} margin={{ left: -15, right: 0 }}>
                <defs>
                  <linearGradient id="flowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00BFFF" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#00BFFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#4A5B78" }} axisLine={false} tickLine={false} interval={2} />
                <YAxis tick={{ fontSize: 10, fill: "#4A5B78" }} axisLine={false} tickLine={false} domain={[3, 6]} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#4A5B78" }} />
                <Area type="monotone" dataKey="flow" stroke="#00BFFF" strokeWidth={2} fill="url(#flowGrad)" dot={false}
                  activeDot={{ r: 4, fill: "#00BFFF", stroke: "#060B18", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PUE chart */}
        <div className="bg-[#0D1424]/60 p-6 rounded-2xl border border-white/[0.06]">
          <div className="mb-6">
            <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mb-0.5">This Week</p>
            <h2 className="text-base font-bold text-[#F0F4F8]">PUE Trend</h2>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={efficiencyData} margin={{ left: -15, right: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#4A5B78" }} axisLine={false} tickLine={false} />
                <YAxis domain={[1.08, 1.18]} tick={{ fontSize: 10, fill: "#4A5B78" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#4A5B78" }} />
                <Line type="monotone" dataKey="pue" stroke="#00E5A0" strokeWidth={2.5}
                  dot={{ r: 4, fill: "#0D1424", stroke: "#00E5A0", strokeWidth: 2 }}
                  activeDot={{ r: 5, fill: "#00E5A0", stroke: "#060B18", strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Zone status */}
        <div className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-[#F0F4F8]">Zone Status</h2>
            <span className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78]">4 active zones</span>
          </div>
          <div className="space-y-3">
            {[
              { zone: "Zone A", flow: 4.2, temp: 22.1, status: "Online", eff: 92 },
              { zone: "Zone B", flow: 1.2, temp: 28.5, status: "Warning", eff: 71 },
              { zone: "Zone C", flow: 8.5, temp: 25.0, status: "Online", eff: 95 },
              { zone: "Zone D", flow: 2.1, temp: 21.8, status: "Online", eff: 97 },
            ].map(({ zone, flow, temp, status, eff }) => (
              <div key={zone} className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${status === "Online" ? "bg-[#00E5A0] shadow-[0_0_4px_rgba(0,229,160,0.5)]" : "bg-[#FFB020] shadow-[0_0_4px_rgba(255,176,32,0.5)]"}`} />
                  <span className="text-sm font-medium text-[#F0F4F8]">{zone}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#8B9DC3] font-[family-name:var(--font-jetbrains)]">
                  <span>{flow} L/s</span>
                  <span>{temp}°C</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-16 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${eff >= 90 ? "bg-[#00E5A0]" : "bg-[#FFB020]"}`} style={{ width: `${eff}%` }} />
                    </div>
                    <span className={eff >= 90 ? "text-[#00E5A0]" : "text-[#FFB020]"}>{eff}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-[#F0F4F8]">Recent Events</h2>
            <span className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78]">Today</span>
          </div>
          <div className="space-y-3">
            {recentEvents.map(({ time, msg, type }, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-white/[0.04] last:border-0">
                <span className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                  type === "ai" ? "bg-[#00BFFF] shadow-[0_0_4px_rgba(0,191,255,0.5)]" : type === "warn" ? "bg-[#FFB020]" : type === "ok" ? "bg-[#00E5A0]" : "bg-[#4A5B78]"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#F0F4F8] leading-relaxed">{msg}</p>
                </div>
                <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78] shrink-0">{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

function StatCard({ title, value, unit, icon, trend, trendUp }: {
  title: string; value: string; unit: string;
  icon: React.ReactNode; trend: string; trendUp: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="bg-[#0D1424]/60 p-5 rounded-2xl border border-white/[0.06] hover:border-white/[0.1] transition-colors duration-300"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="p-1.5 bg-white/[0.04] border border-white/[0.06] rounded-lg">{icon}</div>
      </div>
      <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mb-1">{title}</p>
      <p className="text-xl font-bold text-[#F0F4F8] font-[family-name:var(--font-syne)]">
        {value}<span className="text-sm font-normal text-[#4A5B78] ml-1">{unit}</span>
      </p>
      <p className={`text-[10px] mt-1.5 font-[family-name:var(--font-jetbrains)] ${trendUp ? "text-[#00E5A0]" : "text-[#FFB020]"}`}>{trend}</p>
    </motion.div>
  );
}
