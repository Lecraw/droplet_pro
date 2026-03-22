"use client";

import { useEffect, useRef, useState } from "react";
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

function AnimatedCounter({ target, decimals = 0, suffix = "", duration = 2000 }: { target: number; decimals?: number; suffix?: string; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setValue(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span ref={ref}>{value.toFixed(decimals)}{suffix}</span>;
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#060B18]">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-pattern opacity-60" />

      {/* Radial glow from center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(0,191,255,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Top-left accent line */}
      <div className="absolute top-0 left-0 w-px h-64 bg-gradient-to-b from-[#00BFFF]/30 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 h-px w-64 bg-gradient-to-r from-[#00BFFF]/30 to-transparent pointer-events-none" />

      {/* HUD labels */}
      <span className="absolute top-24 left-8 font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78] tracking-[0.25em] uppercase select-none hidden lg:block">37.7749°N / 122.4194°W</span>
      <span className="absolute top-24 right-8 font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78] tracking-[0.25em] uppercase select-none hidden lg:block">v2.1.0 / INIT</span>
      <span className="absolute bottom-16 left-8 font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78] tracking-[0.25em] uppercase select-none hidden lg:block">42 NODES · ACTIVE</span>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <div>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-[#00BFFF]" />
              <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.3em] text-[#00BFFF]">Water Intelligence Platform</p>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="font-[family-name:var(--font-syne)] text-[2.8rem] md:text-5xl lg:text-[3.8rem] font-extrabold leading-[1.05] tracking-tight text-[#F0F4F8]">
              Water Intelligence<br />
              for the Age of{" "}
              <span className="text-[#00BFFF] drop-shadow-[0_0_20px_rgba(0,191,255,0.4)]">AI</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 text-base leading-relaxed text-[#8B9DC3] max-w-md">
              Real-time visibility into water usage, waste, and cooling efficiency across your entire data center — powered by intelligent sensor networks.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="#cta"
                className="group inline-flex items-center gap-2 bg-[#00BFFF] text-[#060B18] text-sm font-semibold px-7 py-3.5 rounded-md hover:bg-[#00D4FF] hover:shadow-[0_0_40px_rgba(0,191,255,0.35)] transition-all duration-300">
                Request Access
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
              <Link href="/shop"
                className="group inline-flex items-center gap-1.5 text-sm text-[#8B9DC3] hover:text-[#00BFFF] transition-colors duration-300 border border-white/[0.08] hover:border-[#00BFFF]/30 px-5 py-3.5 rounded-md">
                Shop Hardware
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-12 pt-8 border-t border-white/[0.06] grid grid-cols-3 gap-6">
              {[
                { value: 42, label: "Active Nodes", decimals: 0, suffix: "" },
                { value: 40, label: "Water Reduction", decimals: 0, suffix: "%" },
                { value: 1.12, label: "Current PUE", decimals: 2, suffix: "" },
              ].map(({ value, label, decimals, suffix }) => (
                <div key={label}>
                  <p className="font-[family-name:var(--font-syne)] text-2xl font-bold text-[#F0F4F8]">
                    <AnimatedCounter target={value} decimals={decimals} suffix={suffix} />
                  </p>
                  <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mt-1">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Live Telemetry Panel */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.35 }}
            className="relative">

            {/* Telemetry header row */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] shadow-[0_0_8px_rgba(0,229,160,0.6)] animate-pulse" />
                <span className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-[#00E5A0]">Live Telemetry</span>
              </div>
              <span className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78]">24h window</span>
            </div>

            {/* Three big metrics */}
            <div className="grid grid-cols-3 gap-0 mb-6 border-y border-white/[0.06] py-5">
              {[
                { label: "Flow", value: 4.2, unit: "L/s", decimals: 1 },
                { label: "Temp", value: 24.1, unit: "°C", decimals: 1 },
                { label: "Pressure", value: 3.2, unit: "bar", decimals: 1 },
              ].map(({ label, value, unit, decimals }, i) => (
                <div key={label} className={`px-4 ${i > 0 ? "border-l border-white/[0.06]" : ""}`}>
                  <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mb-1">{label}</p>
                  <p className="font-[family-name:var(--font-syne)] text-3xl font-bold text-[#F0F4F8] leading-none">
                    <AnimatedCounter target={value} decimals={decimals} />
                    <span className="text-sm font-normal text-[#4A5B78] ml-1">{unit}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Sparkline */}
            <div className="mb-1">
              <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mb-3">Flow rate · L/s</p>
              <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sparkData} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
                    <defs>
                      <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00BFFF" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#00BFFF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="t" hide />
                    <YAxis hide domain={[3, 6]} />
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
                      formatter={(v) => [`${v} L/s`, "Flow"]}
                      labelStyle={{ color: "#4A5B78" }}
                    />
                    <Area type="monotone" dataKey="v" stroke="#00BFFF" strokeWidth={2} fill="url(#heroGrad)" dot={false}
                      activeDot={{ r: 4, fill: "#00BFFF", stroke: "#060B18", strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Zone rows */}
            <div className="border-t border-white/[0.06] pt-4 space-y-2.5">
              <div className="flex items-center justify-between mb-1">
                <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78]">Zone</p>
                <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78]">Efficiency</p>
              </div>
              {zones.map(({ id, eff, ok }) => (
                <div key={id} className="flex items-center gap-3 group cursor-default">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ok ? "bg-[#00E5A0] shadow-[0_0_6px_rgba(0,229,160,0.5)]" : "bg-[#FFB020] shadow-[0_0_6px_rgba(255,176,32,0.5)]"}`} />
                  <span className="font-[family-name:var(--font-jetbrains)] text-xs text-[#8B9DC3] w-12 group-hover:text-[#F0F4F8] transition-colors">Zone {id}</span>
                  <div className="flex-1 h-px bg-white/[0.04] relative overflow-hidden rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${eff}%` }}
                      transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                      className={`absolute top-0 left-0 h-full rounded-full ${ok ? "bg-gradient-to-r from-[#00BFFF]/60 to-[#00BFFF]" : "bg-gradient-to-r from-[#FFB020]/60 to-[#FFB020]"}`}
                    />
                  </div>
                  <span className={`font-[family-name:var(--font-jetbrains)] text-xs font-medium w-8 text-right ${ok ? "text-[#00BFFF]" : "text-[#FFB020]"}`}>{eff}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060B18] to-transparent pointer-events-none" />
    </section>
  );
}
