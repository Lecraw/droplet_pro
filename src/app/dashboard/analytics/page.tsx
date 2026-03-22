"use client";

import { motion } from "framer-motion";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const monthlyData = [
  { month: "Jan", water: 4200, pue: 1.48, cost: 12000, saved: 800 },
  { month: "Feb", water: 4500, pue: 1.45, cost: 13500, saved: 1200 },
  { month: "Mar", water: 4100, pue: 1.42, cost: 11000, saved: 1800 },
  { month: "Apr", water: 3800, pue: 1.38, cost: 9500, saved: 2400 },
  { month: "May", water: 3200, pue: 1.31, cost: 8200, saved: 3100 },
  { month: "Jun", water: 2800, pue: 1.26, cost: 7100, saved: 4000 },
  { month: "Jul", water: 2400, pue: 1.21, cost: 6300, saved: 4800 },
  { month: "Aug", water: 2100, pue: 1.18, cost: 5800, saved: 5400 },
  { month: "Sep", water: 1900, pue: 1.16, cost: 5500, saved: 5900 },
  { month: "Oct", water: 1700, pue: 1.14, cost: 5100, saved: 6300 },
  { month: "Nov", water: 1600, pue: 1.13, cost: 4900, saved: 6600 },
  { month: "Dec", water: 1500, pue: 1.12, cost: 4600, saved: 7000 },
];

const zoneData = [
  { zone: "Zone A", flow: 4.2, temp: 22.1, efficiency: 92 },
  { zone: "Zone B", flow: 3.8, temp: 23.4, efficiency: 88 },
  { zone: "Zone C", flow: 8.5, temp: 25.0, efficiency: 95 },
  { zone: "Zone D", flow: 2.1, temp: 21.8, efficiency: 97 },
  { zone: "Zone E", flow: 5.4, temp: 24.2, efficiency: 90 },
];

export default function AnalyticsPage() {
  const totalSaved = monthlyData.reduce((s, d) => s + d.saved, 0);

  return (
    <div className="space-y-8">
      <div>
        <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.25em] text-[#00BFFF] mb-1">Intelligence</p>
        <h1 className="text-3xl font-bold text-[#F0F4F8] font-[family-name:var(--font-syne)]">Analytics</h1>
        <p className="text-[#8B9DC3] text-sm mt-1">Full-year performance metrics, efficiency trends, and zone analysis.</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Avg PUE", value: "1.12", sub: "Industry avg: 1.58", color: "text-[#00BFFF]" },
          { label: "Water Saved YTD", value: `${(totalSaved / 1000).toFixed(0)}K gal`, sub: "+42% vs prior year", color: "text-[#00E5A0]" },
          { label: "Cost Reduction", value: "$74K", sub: "Operating cost delta", color: "text-[#00BFFF]" },
          { label: "Efficiency Peak", value: "97%", sub: "Zone D · Oct 2025", color: "text-[#00E5A0]" },
        ].map(({ label, value, sub, color }) => (
          <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-5 ">
            <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-widest text-[#4A5B78] mb-2">{label}</p>
            <p className={`text-2xl font-bold font-[family-name:var(--font-syne)] ${color}`}>{value}</p>
            <p className="text-xs text-[#4A5B78] mt-1">{sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Water + PUE */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6 ">
          <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-widest text-[#4A5B78] mb-1">12-Month Trend</p>
          <p className="font-bold text-[#F0F4F8] mb-5">Water Consumption (gal)</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ left: -15 }}>
                <defs>
                  <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00BFFF" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#00BFFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#4A5B78" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#4A5B78" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid rgba(0, 191, 255, 0.15)", background: "rgba(13, 20, 36, 0.95)", color: "#F0F4F8" }} />
                <Area type="monotone" dataKey="water" stroke="#00BFFF" strokeWidth={2} fill="url(#waterGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6 ">
          <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-widest text-[#4A5B78] mb-1">Efficiency Metric</p>
          <p className="font-bold text-[#F0F4F8] mb-5">PUE Over Time</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ left: -15 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#4A5B78" }} axisLine={false} tickLine={false} />
                <YAxis domain={[1.0, 1.6]} tick={{ fontSize: 10, fill: "#4A5B78" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid rgba(0, 191, 255, 0.15)", background: "rgba(13, 20, 36, 0.95)", color: "#F0F4F8" }} />
                <Line type="monotone" dataKey="pue" stroke="#10B981" strokeWidth={2.5} dot={{ r: 3, fill: "#10B981" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Zone Performance */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6 ">
        <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-widest text-[#4A5B78] mb-1">Zone Breakdown</p>
        <p className="font-bold text-[#F0F4F8] mb-5">Per-Zone Efficiency (%)</p>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={zoneData} margin={{ left: -15 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="zone" tick={{ fontSize: 10, fill: "#4A5B78" }} axisLine={false} tickLine={false} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 10, fill: "#4A5B78" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid rgba(0, 191, 255, 0.15)", background: "rgba(13, 20, 36, 0.95)", color: "#F0F4F8" }} />
              <Bar dataKey="efficiency" name="Efficiency (%)" fill="#00BFFF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Zone Table */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06]  overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06]">
          <p className="font-bold text-[#F0F4F8] text-sm">Zone Detail Report</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {["Zone", "Flow Rate", "Avg Temp", "Efficiency", "Status"].map(h => (
                <th key={h} className="px-6 py-3 text-left font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-widest text-[#4A5B78]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {zoneData.map((z) => (
              <tr key={z.zone} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.04] transition-colors">
                <td className="px-6 py-3.5 font-medium text-[#F0F4F8]">{z.zone}</td>
                <td className="px-6 py-3.5 font-[family-name:var(--font-jetbrains)] text-[#8B9DC3]">{z.flow} L/s</td>
                <td className="px-6 py-3.5 font-[family-name:var(--font-jetbrains)] text-[#8B9DC3]">{z.temp}°C</td>
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-[#0A0F1E] rounded-full overflow-hidden max-w-24">
                      <div className="h-full bg-[#00BFFF] rounded-full" style={{ width: `${z.efficiency}%` }} />
                    </div>
                    <span className="font-[family-name:var(--font-jetbrains)] text-xs text-[#00BFFF]">{z.efficiency}%</span>
                  </div>
                </td>
                <td className="px-6 py-3.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#00E5A0]/10 text-[#00E5A0]">
                    <span className="w-1 h-1 rounded-full bg-[#00E5A0]" />
                    Online
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
