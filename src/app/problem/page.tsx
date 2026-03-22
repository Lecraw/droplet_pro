"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bigStats = [
  { value: "9.1B", label: "Gallons of water used daily by U.S. data centers", source: "DOE, 2024" },
  { value: "6×", label: "Increase in AI data center water demand since 2020", source: "IEA Report" },
  { value: "120M", label: "Gallons consumed per day by a single hyperscale campus", source: "Industry Avg." },
  { value: "40%", label: "Of data center water usage is estimated to be waste", source: "Uptime Institute" },
];

const crisisPoints = [
  {
    num: "01",
    title: "AI is accelerating the problem",
    desc: "Training a single large language model can consume over 700,000 gallons of water for cooling. As AI workloads scale exponentially, water demand is outpacing every projection. By 2027, AI data centers alone are projected to consume more water than the entire country of Denmark.",
    stat: "700K",
    statLabel: "gallons to train one LLM",
  },
  {
    num: "02",
    title: "Most water usage is invisible",
    desc: "Over 85% of data centers have no real-time visibility into their water consumption. Legacy SCADA systems weren't designed for the density of modern GPU clusters. Operators are making capacity decisions based on monthly utility bills — not live telemetry.",
    stat: "85%",
    statLabel: "of data centers lack real-time water monitoring",
  },
  {
    num: "03",
    title: "Waste is the norm, not the exception",
    desc: "Industry studies show that 30-50% of water flowing through data center cooling loops is wasted through over-provisioning, leaks, or suboptimal flow management. That's billions of gallons per year that serve no thermal purpose — pure waste at massive scale.",
    stat: "50%",
    statLabel: "of cooling water is wasted on average",
  },
  {
    num: "04",
    title: "Regulation is coming",
    desc: "The EU's Energy Efficiency Directive now requires data centers to report water usage effectiveness (WUE). California, Virginia, and Singapore have introduced or proposed water disclosure mandates for data center operators. Companies without monitoring infrastructure will face compliance gaps.",
    stat: "27",
    statLabel: "countries with active or proposed DC water regulations",
  },
];

const comparisonData = [
  { label: "One hyperscale data center", value: "120M gal/day", equivalent: "Enough to supply a city of 100,000 people" },
  { label: "Global AI training (2025)", value: "6.6B gal/year", equivalent: "More than the annual water use of half of U.S. states" },
  { label: "Single GPU server rack", value: "300K gal/year", equivalent: "5× the average American household's annual usage" },
  { label: "Wasted cooling water (industry)", value: "3.2B gal/year", equivalent: "Could fill 4,800 Olympic swimming pools annually" },
];

export default function ProblemPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const crisisRef = useRef<HTMLDivElement>(null);
  const crisisInView = useInView(crisisRef, { once: true, margin: "-80px" });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">

        {/* Hero */}
        <section className="relative pt-32 pb-24 px-6 lg:px-8 bg-[#0F172A] overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/cooling_system.png"
              alt="Data center infrastructure"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/80 via-[#0F172A]/90 to-[#0F172A]" />

          <div className="max-w-5xl mx-auto relative">
            <Link href="/" className="inline-flex items-center gap-2 font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.25em] text-[#64748B] hover:text-[#0066FF] mb-12 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              Home
            </Link>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-5 h-px bg-[#0066FF]" />
                <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.3em] text-[#0066FF]">The Problem</p>
              </div>
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
                AI is drinking the<br />planet dry.
              </h1>
              <p className="text-lg text-[#94A3B8] max-w-2xl leading-relaxed">
                The world&apos;s data centers consume billions of gallons of water every day — and with the explosion of AI, that number is accelerating faster than anyone predicted. Most of it goes unmonitored. Much of it is wasted.
              </p>
            </motion.div>

            {/* Hero stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10">
              {bigStats.map(({ value, label, source }) => (
                <div key={value}>
                  <p className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-[#0066FF]">{value}</p>
                  <p className="text-sm text-[#94A3B8] mt-2 leading-snug">{label}</p>
                  <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[8px] uppercase tracking-widest text-[#475569] mt-2">{source}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Open cooling system image section */}
        <section className="py-20 px-6 lg:px-8 bg-[#F8FAFC]">
          <div className="max-w-5xl mx-auto">
            <div ref={statsRef} className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={statsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
                <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.3em] text-[#0066FF] mb-3">The Infrastructure</p>
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 leading-tight">
                  Every server needs water to stay cool.
                </h2>
                <p className="text-[#64748B] leading-relaxed mb-6">
                  Modern AI infrastructure generates extreme heat density — up to 100kW per rack. Liquid cooling systems pump thousands of gallons through server chassis every hour. Without intelligent monitoring, operators have no way to know how much is being used, where it&apos;s going, or how much is being wasted.
                </p>
                <div className="space-y-3">
                  {[
                    "A single AI training cluster can use 1 gallon of water per kWh of energy consumed",
                    "GPU-dense racks generate 3-5× the heat of traditional compute servers",
                    "Liquid cooling adoption has grown 340% since 2022",
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
                      <p className="text-sm text-[#64748B]">{point}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={statsInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}
                className="rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm">
                <Image
                  src="/open-cooling-system.png"
                  alt="Open liquid cooling system in a data center server"
                  width={600}
                  height={400}
                  className="object-cover w-full"
                />
                <div className="bg-white p-4">
                  <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8]">
                    Liquid-cooled server chassis with direct-to-chip water distribution
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Crisis points */}
        <section className="py-24 px-6 lg:px-8">
          <div ref={crisisRef} className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={crisisInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-[#0066FF]" />
                <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.3em] text-[#0066FF]">Why It Matters</p>
              </div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-[#0F172A] mb-12">A crisis hiding in plain sight.</h2>
            </motion.div>

            <div className="border-t border-[#E2E8F0]">
              {crisisPoints.map((point, i) => (
                <motion.div key={point.num} initial={{ opacity: 0, y: 16 }} animate={crisisInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="border-b border-[#E2E8F0] py-10 grid md:grid-cols-[80px_1fr_200px] gap-6 md:gap-10 items-start group hover:bg-[#FAFBFF] transition-colors -mx-6 px-6 lg:-mx-8 lg:px-8">
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-3xl font-medium text-[#E2E8F0] group-hover:text-[#D1DCF5] transition-colors select-none leading-none pt-1">{point.num}</span>
                  <div>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">{point.title}</h3>
                    <p className="text-sm text-[#64748B] leading-relaxed max-w-2xl">{point.desc}</p>
                  </div>
                  <div className="md:text-right">
                    <p className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#0066FF]">{point.stat}</p>
                    <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mt-1 leading-snug">{point.statLabel}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Scale comparison */}
        <section className="py-24 px-6 lg:px-8 bg-[#F8FAFC]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-[#0066FF]" />
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.3em] text-[#0066FF]">Scale</p>
            </div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-[#0F172A] mb-12">Putting the numbers in perspective.</h2>

            <div className="grid md:grid-cols-2 gap-5">
              {comparisonData.map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white border border-[#E2E8F0] rounded-2xl p-7">
                  <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-2">{item.label}</p>
                  <p className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#0F172A] mb-3">{item.value}</p>
                  <div className="flex items-start gap-2 pt-3 border-t border-[#F0F4F8]">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
                    <p className="text-sm text-[#64748B] leading-relaxed">{item.equivalent}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Data center image + Droplet's answer */}
        <section className="py-24 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm">
                <Image
                  src="/cooling_system.png"
                  alt="Modern data center with liquid cooling infrastructure"
                  width={600}
                  height={600}
                  className="object-cover w-full"
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-5 h-px bg-[#0066FF]" />
                  <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.3em] text-[#0066FF]">The Droplet Difference</p>
                </div>
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 leading-tight">
                  You can&apos;t fix what you can&apos;t see.
                </h2>
                <p className="text-[#64748B] leading-relaxed mb-6">
                  Droplet deploys intelligent sensor networks at every critical point in your water infrastructure — capturing flow rate, temperature, and pressure in real time. Our AI platform turns that raw telemetry into actionable insights, automatically identifying waste, predicting failures, and optimizing usage across every zone.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { value: "40%", label: "Avg. water reduction" },
                    { value: "<6mo", label: "Typical payback period" },
                    { value: "99.99%", label: "Platform uptime" },
                    { value: "100ms", label: "Telemetry latency" },
                  ].map(({ value, label }) => (
                    <div key={label} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
                      <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0066FF]">{value}</p>
                      <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[8px] uppercase tracking-widest text-[#94A3B8] mt-1">{label}</p>
                    </div>
                  ))}
                </div>
                <Link href="/#cta" className="inline-flex items-center gap-2 bg-[#0066FF] text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-[#0052CC] transition-colors">
                  Start Monitoring
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 px-6 lg:px-8 bg-[#0F172A]">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.3em] text-[#0066FF] mb-4">Take Action</p>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-white mb-4">
              The water crisis won&apos;t wait. Neither should you.
            </h2>
            <p className="text-[#94A3B8] mb-8 max-w-lg mx-auto">
              Join the operators who are taking control of their water infrastructure. Deploy Droplet sensors, gain visibility, and start saving — in weeks, not years.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/#cta" className="bg-[#0066FF] text-white text-sm font-medium px-7 py-3.5 rounded-lg hover:bg-[#0052CC] transition-colors">
                Request Access
              </Link>
              <Link href="/pricing" className="border border-white/20 text-white text-sm font-medium px-7 py-3.5 rounded-lg hover:border-white/40 transition-colors">
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
