"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";

const cases = [
  {
    index: "01",
    label: "HYPERSCALE",
    title: "Hyperscale Data Centers",
    desc: "Monitor and optimize water consumption across campus-scale cooling infrastructure with hundreds of cooling loops.",
    stat: "500K+",
    statLabel: "gallons / day managed",
    metrics: [
      { m: "Visibility", v: 98 }, { m: "Savings", v: 92 },
      { m: "Uptime", v: 99 }, { m: "ROI", v: 88 }, { m: "Scale", v: 100 },
    ],
  },
  {
    index: "02",
    label: "AI TRAINING",
    title: "AI Training Clusters",
    desc: "GPU-dense environments generate extreme thermal loads. Droplet ensures cooling keeps pace without waste.",
    stat: "3.2×",
    statLabel: "efficiency gain",
    metrics: [
      { m: "Visibility", v: 95 }, { m: "Savings", v: 85 },
      { m: "Uptime", v: 97 }, { m: "ROI", v: 96 }, { m: "Scale", v: 80 },
    ],
  },
  {
    index: "03",
    label: "CLOUD",
    title: "Cloud Providers",
    desc: "Multi-tenant infrastructure requires granular water accounting. Attribute usage, optimize per-zone, and report at scale.",
    stat: "40%",
    statLabel: "waste reduction",
    metrics: [
      { m: "Visibility", v: 100 }, { m: "Savings", v: 90 },
      { m: "Uptime", v: 99 }, { m: "ROI", v: 91 }, { m: "Scale", v: 95 },
    ],
  },
];

function RadarTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { m: string; v: number } }> }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="glass-card rounded-lg px-3 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" style={{ border: "1px solid rgba(0, 191, 255, 0.15)" }}>
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#00BFFF]" style={{ fontFamily: "var(--font-jetbrains)" }}>{d.m}</p>
      <p className="text-sm font-semibold text-[#F0F4F8]" style={{ fontFamily: "var(--font-syne)" }}>{d.v}%</p>
    </div>
  );
}

export default function UseCases() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCase, setHoveredCase] = useState<number | null>(null);

  return (
    <section id="use-cases" className="py-32 px-6 lg:px-8 bg-[#060B18] relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#00BFFF]/20 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#00BFFF]" />
            <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.3em] text-[#00BFFF]">Deployments</p>
          </div>
          <h2 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-extrabold text-[#F0F4F8]">
            Built for critical infrastructure.
          </h2>
        </motion.div>

        {/* Cases */}
        <div className="space-y-0 border-t border-white/[0.06]">
          {cases.map((c, i) => (
            <motion.div key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`border-b border-white/[0.06] py-12 grid md:grid-cols-[1fr_280px] gap-10 items-center transition-colors duration-300 ${
                hoveredCase === i ? "bg-white/[0.02]" : ""
              }`}
              onMouseEnter={() => setHoveredCase(i)}
              onMouseLeave={() => setHoveredCase(null)}
            >
              {/* Text block */}
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78]">{c.index}</span>
                  <div className="w-3 h-px bg-white/[0.08]" />
                  <span className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#00BFFF]">{c.label}</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-end gap-6 mb-4">
                  <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-[#F0F4F8]">{c.title}</h3>
                  <div className="md:ml-auto md:text-right shrink-0">
                    <p className="font-[family-name:var(--font-syne)] text-4xl font-bold text-[#00BFFF] leading-none drop-shadow-[0_0_12px_rgba(0,191,255,0.3)]">{c.stat}</p>
                    <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mt-1">{c.statLabel}</p>
                  </div>
                </div>

                <p className="text-[#8B9DC3] text-base leading-relaxed max-w-xl">{c.desc}</p>
              </div>

              {/* Radar chart */}
              <div className={`h-52 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={c.metrics}>
                    <PolarGrid stroke="rgba(255,255,255,0.06)" />
                    <PolarAngleAxis dataKey="m"
                      tick={{ fontSize: 9, fill: "#4A5B78", fontFamily: "var(--font-jetbrains)" }} />
                    <Tooltip content={<RadarTooltip />} />
                    <Radar dataKey="v" stroke="#00BFFF" fill="#00BFFF"
                      fillOpacity={hoveredCase === i ? 0.15 : 0.06}
                      strokeWidth={hoveredCase === i ? 2 : 1.5}
                      animationDuration={600} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
