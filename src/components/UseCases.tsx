"use client";

import { useRef } from "react";
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

export default function UseCases() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="use-cases" className="py-32 px-6 lg:px-8 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-px bg-[#0066FF]" />
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.3em] text-[#0066FF]">Deployments</p>
          </div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold text-[#0F172A]">
            Built for critical infrastructure.
          </h2>
        </motion.div>

        {/* Cases — alternating layout: text left, radar right; then flip */}
        <div className="space-y-0 border-t border-[#E2E8F0]">
          {cases.map((c, i) => (
            <motion.div key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-b border-[#E2E8F0] py-12 grid md:grid-cols-[1fr_280px] gap-10 items-center"
            >
              {/* Text block */}
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8]">{c.index}</span>
                  <div className="w-3 h-px bg-[#E2E8F0]" />
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#0066FF]">{c.label}</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-end gap-6 mb-4">
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#0F172A]">{c.title}</h3>
                  {/* Big stat inline with title */}
                  <div className="md:ml-auto md:text-right shrink-0">
                    <p className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-[#0066FF] leading-none">{c.stat}</p>
                    <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mt-1">{c.statLabel}</p>
                  </div>
                </div>

                <p className="text-[#64748B] text-base leading-relaxed max-w-xl">{c.desc}</p>
              </div>

              {/* Radar chart — replaces decorative element */}
              <div className={`h-52 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={c.metrics}>
                    <PolarGrid stroke="#F0F4F8" />
                    <PolarAngleAxis dataKey="m"
                      tick={{ fontSize: 9, fill: "#94A3B8", fontFamily: "var(--font-ibm-plex-mono)" }} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 11 }} />
                    <Radar dataKey="v" stroke="#0066FF" fill="#0066FF" fillOpacity={0.08} strokeWidth={1.5} />
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
