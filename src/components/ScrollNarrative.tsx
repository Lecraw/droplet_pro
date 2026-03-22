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

  const dropletRotateY = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const dropletScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 1.0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.35, 0.2]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${(milestones.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0A0F1E]" />
        <div className="absolute inset-0 grid-pattern opacity-40" />

        {/* Vertical center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(0,191,255,0.12)] to-transparent pointer-events-none" />

        {/* Corner labels */}
        <span className="absolute top-8 left-8 font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78] tracking-[0.25em] uppercase select-none">SCROLL TO EXPLORE</span>
        <span className="absolute top-8 right-8 font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78] tracking-[0.25em] uppercase select-none">DROPLET / DATA STORY</span>

        {/* Center spinning droplet */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Glow */}
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(0,191,255,0.3)_0%,transparent_70%)]"
          />

          {/* Ripple rings */}
          <div className="absolute w-52 h-52 rounded-full border border-[rgba(0,191,255,0.1)] animate-ripple" />
          <div className="absolute w-52 h-52 rounded-full border border-[rgba(0,191,255,0.06)] animate-ripple-delayed" />

          {/* Spinning droplet */}
          <motion.div
            style={{ scale: dropletScale, perspective: 600 }}
            className="relative z-10"
          >
            <motion.div style={{ rotateY: dropletRotateY }}>
              <Image
                src="/dropletICONLOGO.png"
                alt="Droplet"
                width={120}
                height={168}
                className="drop-shadow-[0_0_60px_rgba(0,191,255,0.35)]"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Milestone content */}
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
      <div className={`max-w-sm glass-card noise-overlay px-8 py-7 rounded-2xl ${isLeft ? "" : "text-right"}`}>
        <div className="relative z-10">
          {/* Step number */}
          <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.3em] text-[#00BFFF] mb-3">
            {String(index + 1).padStart(2, "0")} / {milestone.label}
          </p>
          <p className="font-[family-name:var(--font-syne)] text-2xl md:text-3xl font-bold text-[#F0F4F8] mb-3 leading-tight">
            {milestone.stat}
          </p>
          <p className="text-[#8B9DC3] text-sm leading-relaxed">
            {milestone.desc}
          </p>
          {/* Progress dots */}
          <div className={`mt-5 flex items-center gap-1.5 ${isLeft ? "" : "justify-end"}`}>
            {milestones.map((_, j) => (
              <div
                key={j}
                className={`rounded-full transition-all duration-300 ${
                  j === index
                    ? "w-5 h-1 bg-[#00BFFF] shadow-[0_0_8px_rgba(0,191,255,0.5)]"
                    : j < index
                    ? "w-1 h-1 bg-[#00BFFF]/40"
                    : "w-1 h-1 bg-white/[0.08]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
