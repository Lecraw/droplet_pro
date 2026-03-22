"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip
} from "recharts";

const sparkData = [
  { t: "00", v: 4.2 }, { t: "02", v: 3.9 }, { t: "04", v: 3.8 },
  { t: "06", v: 4.1 }, { t: "08", v: 4.5 }, { t: "10", v: 4.9 },
  { t: "12", v: 5.1 }, { t: "14", v: 5.3 }, { t: "16", v: 4.8 },
  { t: "18", v: 4.6 }, { t: "20", v: 4.0 }, { t: "22", v: 4.2 },
];

const zones = [
  { id: "A", flow: 4.2, eff: 92, ok: true },
  { id: "B", flow: 1.2, eff: 71, ok: false },
  { id: "C", flow: 8.5, eff: 95, ok: true },
  { id: "D", flow: 2.1, eff: 97, ok: true },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* HUD labels */}
      <span className="absolute top-24 left-8 font-[family-name:var(--font-ibm-plex-mono)] text-[9px] text-[#CBD5E1] tracking-widest uppercase select-none hidden lg:block">37.7749°N / 122.4194°W</span>
      <span className="absolute top-24 right-8 font-[family-name:var(--font-ibm-plex-mono)] text-[9px] text-[#CBD5E1] tracking-widest uppercase select-none hidden lg:block">v2.1.0 / INIT</span>
      <span className="absolute bottom-16 left-8 font-[family-name:var(--font-ibm-plex-mono)] text-[9px] text-[#CBD5E1] tracking-widest uppercase select-none hidden lg:block">42 NODES · ACTIVE</span>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <div>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-8">
              <div className="w-5 h-px bg-[#0066FF]" />
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.3em] text-[#0066FF]">Water Intelligence Platform</p>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="font-[family-name:var(--font-space-grotesk)] text-[2.8rem] md:text-5xl lg:text-[3.6rem] font-bold leading-[1.08] tracking-tight text-[#0F172A]">
              Water Intelligence<br />
              for the Age of <span className="text-[#0066FF]">AI</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 text-base leading-relaxed text-[#64748B] max-w-md">
              Real-time visibility into water usage, waste, and efficiency across your entire data center — powered by intelligent sensor networks and AI.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="#cta"
                className="group inline-flex items-center gap-2 bg-[#0066FF] text-white text-sm font-medium px-7 py-3.5 rounded-md hover:shadow-[0_0_28px_rgba(0,102,255,0.4)] transition-all duration-200">
                Request Access
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
              <Link href="/shop"
                className="group inline-flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#0066FF] transition-colors border border-[#E2E8F0] hover:border-[#0066FF]/30 px-5 py-3.5 rounded-md">
                Shop Hardware
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-12 pt-8 border-t border-[#F0F4F8] grid grid-cols-3 gap-6">
              {[
                { value: "42", label: "Active Nodes" },
                { value: "40%", label: "Water Reduction" },
                { value: "1.12", label: "Current PUE" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#0F172A]">{value}</p>
                  <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mt-1">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Live Telemetry Panel (no image) */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.35 }}
            className="relative">

            {/* Telemetry header row */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-emerald-600">Live Telemetry</span>
              </div>
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8]">24h window</span>
            </div>

            {/* Three big metrics — no card, just numbers */}
            <div className="grid grid-cols-3 gap-0 mb-6 border-y border-[#F0F4F8] py-5">
              {[
                { label: "Flow", value: "4.2", unit: "L/s" },
                { label: "Temp", value: "24.1", unit: "°C" },
                { label: "Pressure", value: "3.2", unit: "bar" },
              ].map(({ label, value, unit }, i) => (
                <div key={label} className={`px-4 ${i > 0 ? "border-l border-[#F0F4F8]" : ""}`}>
                  <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-1">{label}</p>
                  <p className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#0F172A] leading-none">
                    {value}<span className="text-sm font-normal text-[#94A3B8] ml-1">{unit}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Sparkline — no box frame */}
            <div className="mb-1">
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-3">Flow rate · L/s</p>
              <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sparkData} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
                    <defs>
                      <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0066FF" stopOpacity={0.12} />
                        <stop offset="100%" stopColor="#0066FF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="t" hide />
                    <YAxis hide domain={[3, 6]} />
                    <Tooltip
                      contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 6, fontSize: 11 }}
                      formatter={(v) => [`${v} L/s`, "Flow"]}
                    />
                    <Area type="monotone" dataKey="v" stroke="#0066FF" strokeWidth={1.5} fill="url(#heroGrad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Zone rows — text-only, no card */}
            <div className="border-t border-[#F0F4F8] pt-4 space-y-2.5">
              <div className="flex items-center justify-between mb-1">
                <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8]">Zone</p>
                <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8]">Efficiency</p>
              </div>
              {zones.map(({ id, eff, ok }) => (
                <div key={id} className="flex items-center gap-3">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ok ? "bg-emerald-400" : "bg-amber-400"}`} />
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[#64748B] w-12">Zone {id}</span>
                  <div className="flex-1 h-px bg-[#F0F4F8] relative">
                    <div className={`absolute top-1/2 -translate-y-1/2 h-0.5 ${ok ? "bg-[#0066FF]" : "bg-amber-400"}`}
                      style={{ width: `${eff}%` }} />
                  </div>
                  <span className={`font-[family-name:var(--font-ibm-plex-mono)] text-xs font-medium w-8 text-right ${ok ? "text-[#0066FF]" : "text-amber-500"}`}>{eff}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
