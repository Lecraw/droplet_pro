"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const layers = [
  {
    num: "01",
    title: "Sensors",
    subtitle: "Physical Hardware",
    spec: "IP67 · ±0.1% accuracy · <100ms latency",
    points: [
      "Clamp-on install — no pipe cutting required",
      "Measures flow rate, temperature, and pressure",
      "Supports 2″ to 48″ industrial pipe diameter",
      "Zero-maintenance ultrasonic transducers",
    ],
  },
  {
    num: "02",
    title: "Data Layer",
    subtitle: "Real-Time Ingestion",
    spec: "TLS 1.3 · 99.99% uptime · REST + Prometheus",
    points: [
      "Sub-second telemetry pipeline to cloud",
      "Unified dashboard with historical trends",
      "Anomaly detection and threshold alerting",
      "Native Grafana, CloudWatch, Datadog export",
    ],
  },
  {
    num: "03",
    title: "Optimization AI",
    subtitle: "Autonomous Efficiency",
    spec: "Self-learning · Multi-zone · Audit trail",
    points: [
      "Continuously detects inefficiencies in real time",
      "Automates cooling adjustments per zone",
      "Learns usage patterns across deployments",
      "Up to 40% water consumption reduction",
    ],
  },
];

export default function ProductSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="product" className="py-32 px-6 lg:px-8 bg-[#060B18] relative">
      {/* Subtle top accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#00BFFF]/20 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#00BFFF]" />
            <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.3em] text-[#00BFFF]">System Architecture</p>
          </div>
          <h2 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-extrabold text-[#F0F4F8]">
            Three layers.<br />One platform.
          </h2>
        </motion.div>

        {/* Layers */}
        <div className="border-t border-white/[0.06]">
          {layers.map((layer, i) => (
            <motion.div key={layer.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-b border-white/[0.06] py-10 grid md:grid-cols-[80px_220px_1fr_260px] gap-6 md:gap-10 items-start group hover:bg-white/[0.015] transition-colors duration-300 -mx-6 px-6 lg:-mx-8 lg:px-8"
            >
              {/* Number */}
              <span className="font-[family-name:var(--font-jetbrains)] text-4xl font-medium text-white/[0.06] group-hover:text-[#00BFFF]/20 transition-colors select-none leading-none pt-1">{layer.num}</span>

              {/* Title block */}
              <div className="pt-1">
                <h3 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-[#F0F4F8]">{layer.title}</h3>
                <p className="text-sm text-[#8B9DC3] mt-1">{layer.subtitle}</p>
                <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.15em] text-[#00BFFF] mt-3">{layer.spec}</p>
              </div>

              {/* Feature list */}
              <ul className="space-y-2.5 pt-1">
                {layer.points.map(p => (
                  <li key={p} className="flex items-start gap-3 text-sm text-[#8B9DC3]">
                    <span className="mt-2 w-1 h-1 rounded-full bg-[#00BFFF] shrink-0 shadow-[0_0_4px_rgba(0,191,255,0.5)]" />
                    {p}
                  </li>
                ))}
              </ul>

              {/* Inline stat */}
              <div className="pt-1 md:text-right">
                {i === 0 && <>
                  <p className="font-[family-name:var(--font-syne)] text-3xl font-bold text-[#F0F4F8]">IP67</p>
                  <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mt-1">Ingress protection</p>
                </>}
                {i === 1 && <>
                  <p className="font-[family-name:var(--font-syne)] text-3xl font-bold text-[#F0F4F8]">99.99%</p>
                  <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mt-1">Platform uptime</p>
                </>}
                {i === 2 && <>
                  <p className="font-[family-name:var(--font-syne)] text-3xl font-bold text-[#00BFFF] drop-shadow-[0_0_12px_rgba(0,191,255,0.3)]">40%</p>
                  <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mt-1">Water reduction</p>
                </>}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications strip */}
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center gap-8">
          {[
            { label: "SOC 2 Type II", sub: "Security" },
            { label: "ISO 27001", sub: "Certified" },
            { label: "FCC / CE", sub: "Hardware" },
            { label: "NIST CSF", sub: "Framework" },
          ].map(({ label, sub }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#00BFFF] shadow-[0_0_4px_rgba(0,191,255,0.5)]" />
              <span className="font-[family-name:var(--font-jetbrains)] text-[10px] text-[#F0F4F8] font-medium uppercase tracking-[0.15em]">{label}</span>
              <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78] uppercase tracking-[0.15em]">· {sub}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
