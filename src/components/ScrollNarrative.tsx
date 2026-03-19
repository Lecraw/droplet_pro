"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const milestones = [
  {
    label: "GLOBAL USAGE",
    stat: "Billions of gallons",
    desc: "AI infrastructure water consumption is rapidly scaling beyond current projections.",
    side: "left" as const,
  },
  {
    label: "INVISIBLE LOSS",
    stat: "Untracked inefficiency",
    desc: "Cooling systems across data centers lack real-time monitoring — waste is invisible.",
    side: "right" as const,
  },
  {
    label: "SENSOR LAYER",
    stat: "Real-time visibility",
    desc: "Droplet hardware captures flow rate, temperature, and pressure at every node.",
    side: "left" as const,
  },
  {
    label: "AI OPTIMIZATION",
    stat: "Dynamic adjustments",
    desc: "The system continuously learns and improves cooling efficiency autonomously.",
    side: "right" as const,
  },
  {
    label: "IMPACT",
    stat: "Up to 40% reduction",
    desc: "Measurable, significant water savings deployed at scale across infrastructure.",
    side: "left" as const,
  },
];

export default function ScrollNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 3D spin the droplet as you scroll
  const dropletRotateY = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const dropletScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 1.0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.08, 0.25, 0.15]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${(milestones.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#F0F4F8]" />
        <div className="absolute inset-0 grid-pattern opacity-50" />

        {/* Thin vertical lines — futuristic accent */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(0,102,255,0.1)] to-transparent pointer-events-none" />

        {/* Corner labels */}
        <span className="absolute top-8 left-8 font-[family-name:var(--font-mono)] text-[9px] text-[#94A3B8] tracking-widest uppercase select-none">SCROLL TO EXPLORE</span>
        <span className="absolute top-8 right-8 font-[family-name:var(--font-mono)] text-[9px] text-[#94A3B8] tracking-widest uppercase select-none">DROPLET / DATA STORY</span>

        {/* Center spinning droplet */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Glow */}
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.25)_0%,transparent_70%)]"
          />

          {/* Ripple rings */}
          <div className="absolute w-52 h-52 rounded-full border border-[rgba(0,102,255,0.08)] animate-ripple" />
          <div className="absolute w-52 h-52 rounded-full border border-[rgba(0,102,255,0.05)] animate-ripple-delayed" />

          {/* Spinning droplet — 3D rotateY */}
          <motion.div
            style={{ scale: dropletScale, perspective: 600 }}
            className="relative z-10"
          >
            <motion.div style={{ rotateY: dropletRotateY }}>
              <Image
                src="/droplet-logo.svg"
                alt="Droplet"
                width={120}
                height={168}
                className="drop-shadow-[0_0_40px_rgba(0,102,255,0.2)]"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Milestone content — items come from bottom */}
        <div className="absolute inset-0">
          {milestones.map((milestone, i) => {
            const segmentSize = 1 / milestones.length;
            const start = i * segmentSize;
            const fadeIn = start + segmentSize * 0.15;
            const hold = start + segmentSize * 0.75;
            const fadeOut = start + segmentSize * 0.9;

            return (
              <MilestoneBlock
                key={milestone.label}
                milestone={milestone}
                index={i}
                scrollYProgress={scrollYProgress}
                range={[start, fadeIn, hold, fadeOut]}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MilestoneBlock({
  milestone,
  index,
  scrollYProgress,
  range,
}: {
  milestone: (typeof milestones)[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number, number, number];
}) {
  // Slide from bottom — no opacity fade, just translateY
  const y = useTransform(
    scrollYProgress,
    [range[0], range[1], range[2], range[3]],
    [60, 0, 0, -60]
  );
  const opacity = useTransform(
    scrollYProgress,
    [range[0], range[1], range[2], range[3]],
    [0, 1, 1, 0]
  );

  const isLeft = milestone.side === "left";

  return (
    <motion.div
      style={{ y, opacity, willChange: "transform, opacity" }}
      className={`absolute inset-0 flex items-center transform-gpu ${
        isLeft ? "justify-start" : "justify-end"
      } px-8 md:px-16 lg:px-24`}
    >
      <div className={`max-w-sm bg-white/90 backdrop-blur-sm px-8 py-7 border border-[#E2E8F0] shadow-sm rounded-2xl ${isLeft ? "" : "text-right"}`}>
        {/* Step number */}
        <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.3em] text-[#0066FF] mb-3">
          {String(index + 1).padStart(2, "0")} / {milestone.label}
        </p>
        <p className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-[#0F172A] mb-3 leading-tight">
          {milestone.stat}
        </p>
        <p className="text-[#64748B] text-sm leading-relaxed">
          {milestone.desc}
        </p>
        {/* Progress dots */}
        <div className={`mt-5 flex items-center gap-1.5 ${isLeft ? "" : "justify-end"}`}>
          {milestones.map((_, j) => (
            <div
              key={j}
              className={`rounded-full transition-all duration-300 ${
                j === index
                  ? "w-5 h-1 bg-[#0066FF]"
                  : j < index
                  ? "w-1 h-1 bg-[#0066FF]/40"
                  : "w-1 h-1 bg-[#E2E8F0]"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
