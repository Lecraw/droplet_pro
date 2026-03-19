"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ComposedChart, Bar, Line,
  AreaChart, Area,
  ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ZAxis
} from "recharts";

const yearData = [
  { month: "Jan", usage: 4200, efficiency: 65, cost: 12000 },
  { month: "Feb", usage: 4500, efficiency: 62, cost: 13500 },
  { month: "Mar", usage: 4100, efficiency: 68, cost: 11000 },
  { month: "Apr", usage: 3800, efficiency: 72, cost: 9500 },
  { month: "May", usage: 3200, efficiency: 79, cost: 8200 },
  { month: "Jun", usage: 2800, efficiency: 84, cost: 7100 },
  { month: "Jul", usage: 2400, efficiency: 88, cost: 6300 },
  { month: "Aug", usage: 2100, efficiency: 91, cost: 5800 },
  { month: "Sep", usage: 1900, efficiency: 92, cost: 5500 },
  { month: "Oct", usage: 1700, efficiency: 94, cost: 5100 },
  { month: "Nov", usage: 1600, efficiency: 94, cost: 4900 },
  { month: "Dec", usage: 1500, efficiency: 95, cost: 4600 },
];

// Flow rate vs temperature scatter per zone
const scatterData = [
  { flow: 4.2, temp: 22.1, zone: "A" },
  { flow: 3.8, temp: 23.4, zone: "A" },
  { flow: 1.2, temp: 28.5, zone: "B" },
  { flow: 1.8, temp: 27.1, zone: "B" },
  { flow: 8.5, temp: 25.0, zone: "C" },
  { flow: 7.9, temp: 24.2, zone: "C" },
  { flow: 2.1, temp: 21.8, zone: "D" },
  { flow: 2.4, temp: 22.0, zone: "D" },
];

const monoFont = "var(--font-ibm-plex-mono)";

export default function DataVisualization() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="data" className="py-32 px-6 lg:px-8 bg-[#F8FAFC]">
      <div ref={ref} className="max-w-7xl mx-auto">

        {/* Section header — no box */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-px bg-[#0066FF]" />
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.3em] text-[#0066FF]">Intelligence Dashboard</p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold text-[#0F172A] leading-tight">
              Visualize efficiency.<br />Predict savings.
            </h2>
            <p className="text-[#64748B] max-w-xs text-sm leading-relaxed md:text-right">
              Hardware telemetry, ML predictions, and financial impact — unified in one view.
            </p>
          </div>
        </motion.div>

        {/* Live stats strip — no box, just a ruled row */}
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.05 }}
          className="border-y border-[#E2E8F0] py-4 mb-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Active Flow", value: "4.2 L/s", delta: "↑ nominal" },
            { label: "Avg Temp", value: "24.1°C", delta: "↓ -0.5 vs yesterday" },
            { label: "System PUE", value: "1.12", delta: "↓ target met" },
            { label: "Nodes Live", value: "42 / 42", delta: "✓ all nominal" },
          ].map(({ label, value, delta }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8]">{label}</p>
              <p className="font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-[#0F172A]">{value}</p>
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] text-emerald-500">{delta}</p>
            </div>
          ))}
        </motion.div>

        {/* Charts — two rows, no card frames, just thin borders as separators */}

        {/* Row 1: Usage vs Efficiency (2/3) + Cost reduction (1/3) */}
        <div className="grid lg:grid-cols-3 gap-0 mb-0 border border-[#E2E8F0] rounded-2xl overflow-hidden">

          <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 p-8 border-b lg:border-b-0 lg:border-r border-[#E2E8F0] bg-white">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-1">Macro Trends · 12 months</p>
                <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[#0F172A]">Usage vs. Efficiency</p>
              </div>
              <div className="text-right">
                <p className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#0066FF]">95%</p>
                <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mt-0.5">Peak Efficiency</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={yearData} margin={{ left: -20, right: 0, top: 4, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="2 4" stroke="#F0F4F8" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94A3B8", fontFamily: monoFont }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="l" tick={{ fontSize: 10, fill: "#94A3B8", fontFamily: monoFont }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 10, fill: "#0066FF", fontFamily: monoFont }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 11, fontFamily: monoFont }} />
                  <Legend wrapperStyle={{ fontSize: 10, fontFamily: monoFont, paddingTop: 12 }} />
                  <Bar yAxisId="l" dataKey="usage" name="Water (gal)" fill="#EEF3FF" radius={[3, 3, 0, 0]} />
                  <Line yAxisId="r" type="monotone" dataKey="efficiency" name="Efficiency %" stroke="#0066FF" strokeWidth={2} dot={{ r: 2.5, fill: "#0066FF" }} activeDot={{ r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}
            className="p-8 bg-white">
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-1">Financial Impact</p>
            <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[#0F172A] mb-6">Operating Cost</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yearData} margin={{ left: -20, right: 0 }}>
                  <defs>
                    <linearGradient id="costG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.14} />
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 4" stroke="#F0F4F8" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94A3B8", fontFamily: monoFont }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#94A3B8", fontFamily: monoFont }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 11 }} />
                  <Area type="monotone" dataKey="cost" name="Cost ($)" stroke="#10B981" strokeWidth={2} fill="url(#costG)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Row 2: Scatter (flow vs temp) + inline text data */}
        <div className="grid lg:grid-cols-3 gap-0 mt-4 border border-[#E2E8F0] rounded-2xl overflow-hidden">

          <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 p-8 border-b lg:border-b-0 lg:border-r border-[#E2E8F0] bg-white">
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-1">Zone Analysis</p>
            <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[#0F172A] mb-6">Flow Rate vs. Temperature</p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ left: -10, right: 16, top: 4, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="2 4" stroke="#F0F4F8" />
                  <XAxis dataKey="flow" name="Flow (L/s)" type="number" domain={[0, 10]}
                    tick={{ fontSize: 10, fill: "#94A3B8", fontFamily: monoFont }} axisLine={false} tickLine={false} label={{ value: "L/s", position: "insideBottomRight", offset: -4, fontSize: 9, fill: "#94A3B8" }} />
                  <YAxis dataKey="temp" name="Temp (°C)" domain={[20, 30]}
                    tick={{ fontSize: 10, fill: "#94A3B8", fontFamily: monoFont }} axisLine={false} tickLine={false} label={{ value: "°C", angle: -90, position: "insideLeft", offset: 8, fontSize: 9, fill: "#94A3B8" }} />
                  <ZAxis range={[60, 60]} />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }}
                    contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 11, fontFamily: monoFont }}
                    formatter={(v, name) => [v, name]} />
                  <Scatter data={scatterData} fill="#0066FF" opacity={0.7} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Right: inline deployment stats — no box, just rows */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.25 }}
            className="p-8 bg-white flex flex-col justify-between">
            <div>
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-1">Deployment</p>
              <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[#0F172A] mb-6">System Stats</p>
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
                  className={`flex items-baseline justify-between py-3 ${i < arr.length - 1 ? "border-b border-[#F0F4F8]" : ""}`}>
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-wider text-[#94A3B8]">{label}</span>
                  <span className="font-[family-name:var(--font-space-grotesk)] text-sm font-semibold text-[#0F172A]">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
