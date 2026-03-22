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

    // Simulate AI response
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
          <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.25em] text-[#0066FF] mb-1">Live View</p>
          <h1 className="text-3xl font-bold text-[#0F172A] font-[family-name:var(--font-display)]">Overview</h1>
          <p className="text-[#64748B] text-sm">System performance across all deployment zones.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-[family-name:var(--font-mono)] text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
          <button className="bg-white border border-[#E2E8F0] px-4 py-2 rounded-lg text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider hover:bg-slate-50 transition-colors shadow-sm text-[#64748B]">
            Export Report
          </button>
        </div>
      </div>

      {/* 8 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Nodes" value="16" unit="" icon={<Activity className="w-4 h-4 text-emerald-500" />} trend="+4 this week" trendUp />
        <StatCard title="Total Flow Rate" value="4.2" unit="L/s" icon={<Droplets className="w-4 h-4 text-[#0066FF]" />} trend="-12% vs baseline" trendUp />
        <StatCard title="Water Saved (MTD)" value="128K" unit="gal" icon={<TrendingDown className="w-4 h-4 text-blue-500" />} trend="On track for 400K" trendUp />
        <StatCard title="System Alerts" value="3" unit="" icon={<AlertCircle className="w-4 h-4 text-amber-400" />} trend="2 warnings, 1 offline" trendUp={false} />
        <StatCard title="Avg Temperature" value="23.8" unit="°C" icon={<Thermometer className="w-4 h-4 text-[#0066FF]" />} trend="-0.5°C vs yesterday" trendUp />
        <StatCard title="Current PUE" value="1.12" unit="" icon={<Zap className="w-4 h-4 text-emerald-500" />} trend="Target: 1.10" trendUp />
        <StatCard title="Avg Pressure" value="3.2" unit="bar" icon={<Gauge className="w-4 h-4 text-[#94A3B8]" />} trend="Within normal range" trendUp />
        <StatCard title="AI Efficiency" value="94" unit="%" icon={<Target className="w-4 h-4 text-[#0066FF]" />} trend="+6% this month" trendUp />
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main flow chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-0.5">Live Telemetry</p>
              <h2 className="text-base font-bold text-[#0F172A]">24-Hour Flow Rate</h2>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#0066FF] font-[family-name:var(--font-display)]">4.2</p>
              <p className="text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[#94A3B8]">L/s current</p>
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={flowData} margin={{ left: -15, right: 0 }}>
                <defs>
                  <linearGradient id="flowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0066FF" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F4F8" />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} interval={2} />
                <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[3, 6]} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0", fontSize: 12 }} />
                <Area type="monotone" dataKey="flow" stroke="#0066FF" strokeWidth={2} fill="url(#flowGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PUE chart */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="mb-6">
            <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-0.5">This Week</p>
            <h2 className="text-base font-bold text-[#0F172A]">PUE Trend</h2>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={efficiencyData} margin={{ left: -15, right: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F4F8" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis domain={[1.08, 1.18]} tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0", fontSize: 12 }} />
                <Line type="monotone" dataKey="pue" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4, fill: "#10B981" }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 — NEW */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pressure over time */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="mb-6">
            <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-0.5">24-Hour</p>
            <h2 className="text-base font-bold text-[#0F172A]">Pressure Trend</h2>
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
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F4F8" />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis domain={[2.5, 4]} tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0", fontSize: 12 }} />
                <Area type="monotone" dataKey="pressure" stroke="#8B5CF6" strokeWidth={2} fill="url(#pressureGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Temperature by zone */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="mb-6">
            <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-0.5">Current</p>
            <h2 className="text-base font-bold text-[#0F172A]">Temperature by Zone</h2>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={temperatureByZone} margin={{ left: -15, right: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F4F8" />
                <XAxis dataKey="zone" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 35]} tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0", fontSize: 12 }} />
                <Bar dataKey="temp" fill="#0066FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Water usage weekly */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="mb-6">
            <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-0.5">This Week</p>
            <h2 className="text-base font-bold text-[#0F172A]">Water Usage (gal)</h2>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waterUsageWeekly} margin={{ left: -5, right: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F4F8" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0", fontSize: 12 }} />
                <Bar dataKey="usage" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Zone status */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-[#0F172A]">Zone Status</h2>
            <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8]">6 active zones</span>
          </div>
          <div className="space-y-3">
            {[
              { zone: "Zone A", flow: 4.2, temp: 22.1, status: "Online", eff: 92 },
              { zone: "Zone B", flow: 1.2, temp: 28.5, status: "Warning", eff: 71 },
              { zone: "Zone C", flow: 8.5, temp: 25.0, status: "Online", eff: 95 },
              { zone: "Zone D", flow: 2.1, temp: 21.8, status: "Online", eff: 97 },
              { zone: "Zone E", flow: 3.4, temp: 20.5, status: "Online", eff: 93 },
              { zone: "Zone F", flow: 1.5, temp: 18.2, status: "Online", eff: 89 },
            ].map(({ zone, flow, temp, status, eff }) => (
              <div key={zone} className="flex items-center justify-between py-2.5 border-b border-[#F0F4F8] last:border-0">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${status === "Online" ? "bg-emerald-500" : "bg-amber-400"}`} />
                  <span className="text-sm font-medium text-[#0F172A]">{zone}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#64748B] font-[family-name:var(--font-mono)]">
                  <span>{flow} L/s</span>
                  <span>{temp}°C</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-16 h-1 bg-[#F0F4F8] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${eff >= 90 ? "bg-emerald-400" : "bg-amber-400"}`} style={{ width: `${eff}%` }} />
                    </div>
                    <span className={eff >= 90 ? "text-emerald-600" : "text-amber-600"}>{eff}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-[#0F172A]">Recent Events</h2>
            <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8]">Today</span>
          </div>
          <div className="space-y-3">
            {recentEvents.map(({ time, msg, type }, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-[#F0F4F8] last:border-0">
                <span className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                  type === "ai" ? "bg-[#0066FF]" : type === "warn" ? "bg-amber-400" : type === "ok" ? "bg-emerald-400" : "bg-[#94A3B8]"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#0F172A] leading-relaxed">{msg}</p>
                </div>
                <span className="font-[family-name:var(--font-mono)] text-[9px] text-[#94A3B8] shrink-0">{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ask Droplet AI */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-[#0066FF]/8 rounded-lg">
            <BotMessageSquare className="w-5 h-5 text-[#0066FF]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">Ask Droplet AI</h2>
            <p className="text-xs text-[#64748B]">Get insights and recommendations from your sensor data</p>
          </div>
        </div>

        {/* Suggestion pills */}
        {aiMessages.length === 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {aiSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setAiQuery(suggestion);
                }}
                className="text-xs px-3 py-1.5 rounded-full border border-[#E2E8F0] text-[#64748B] hover:border-[#0066FF]/30 hover:text-[#0066FF] hover:bg-[#0066FF]/5 transition-all font-[family-name:var(--font-mono)]"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Chat messages */}
        {aiMessages.length > 0 && (
          <div className="space-y-4 mb-5 max-h-80 overflow-y-auto">
            {aiMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
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
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-bounce [animation-delay:0.3s]" />
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
            className="flex-1 px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all"
          />
          <button
            onClick={handleAiSubmit}
            disabled={!aiQuery.trim()}
            className="p-3 bg-[#0066FF] text-white rounded-xl hover:bg-[#0052CC] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
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
      className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="p-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">{icon}</div>
      </div>
      <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-1">{title}</p>
      <p className="text-xl font-bold text-[#0F172A] font-[family-name:var(--font-display)]">
        {value}<span className="text-sm font-normal text-[#94A3B8] ml-1">{unit}</span>
      </p>
      <p className={`text-[10px] mt-1.5 font-[family-name:var(--font-mono)] ${trendUp ? "text-emerald-500" : "text-amber-500"}`}>{trend}</p>
    </motion.div>
  );
}
