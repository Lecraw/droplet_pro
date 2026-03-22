"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const timeline = [
  { year: "2024", title: "Founded", desc: "Droplet Technologies incorporated in San Jose, CA with a mission to make water usage in data centers visible and optimizable." },
  { year: "2024", title: "First Prototype", desc: "Shipped first batch of Intelligent Sensor Node v1 units to three pilot data center partners in the Bay Area." },
  { year: "2025", title: "Platform Launch", desc: "Launched the Droplet Intelligence Platform with real-time dashboards, AI-driven insights, and multi-zone monitoring." },
  { year: "2025", title: "Sensor Node v2", desc: "Released second-generation sensor hardware with ±0.1% accuracy, IP67 rating, and sub-100ms telemetry latency." },
  { year: "2026", title: "Droplet AI", desc: "Introduced Droplet AI — a natural-language interface for querying sensor data, diagnosing issues, and generating optimization plans." },
];

const values = [
  { title: "Measure Everything", desc: "You can't improve what you can't see. We believe every gallon flowing through data center infrastructure should be accounted for in real time." },
  { title: "Build for Operators", desc: "Our users are infrastructure engineers managing critical systems. Every feature we ship must reduce their cognitive load, not add to it." },
  { title: "Sustainability by Default", desc: "Water conservation isn't a feature — it's the reason we exist. Every product decision is evaluated against its impact on resource efficiency." },
  { title: "Hardware + Software", desc: "Real intelligence requires real data. We own the full stack from sensor to dashboard so there are no blind spots in our telemetry pipeline." },
];

const team = [
  { name: "Leo Hoffmann", role: "Chief Executive Officer", abbr: "CEO" },
  { name: "Bazigh Tahirzad", role: "Chief Operating Officer", abbr: "COO" },
  { name: "Patrick Jiang", role: "Chief Marketing Officer", abbr: "CMO" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative pt-32 pb-20 px-6 lg:px-8 bg-[#F8FAFC] overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="max-w-5xl mx-auto relative">
            <Link href="/" className="inline-flex items-center gap-2 font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.25em] text-[#94A3B8] hover:text-[#0066FF] mb-12 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              Home
            </Link>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-[#0066FF]" />
                <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.3em] text-[#0066FF]">About Droplet</p>
              </div>
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-5xl md:text-6xl font-bold text-[#0F172A] leading-tight mb-6">
                Making water visible<br />in the age of AI.
              </h1>
              <p className="text-lg text-[#64748B] max-w-2xl leading-relaxed">
                Data centers consume billions of gallons of water annually for cooling — most of it unmonitored. Droplet builds the sensor networks and intelligence platform that give operators real-time visibility and AI-driven optimization to reduce waste at scale.
              </p>
            </motion.div>

            {/* Key stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-[#E2E8F0]">
              {[
                { value: "2024", label: "Founded" },
                { value: "San Jose", label: "Headquarters" },
                { value: "40%", label: "Avg. Water Reduction" },
                { value: "16+", label: "Sensor Deployments" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#0F172A]">{value}</p>
                  <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mt-1">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-24 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-[#0066FF]" />
                <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.3em] text-[#0066FF]">Our Mission</p>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight">
                  Every drop of water in AI infrastructure should be measured, understood, and optimized.
                </h2>
                <div className="space-y-4 text-[#64748B] leading-relaxed">
                  <p>
                    The AI industry is scaling faster than anyone predicted. With that scale comes an enormous and growing demand for water — used to cool the GPU clusters, storage arrays, and networking equipment that power modern AI workloads.
                  </p>
                  <p>
                    Most data centers have minimal visibility into their water consumption. Flow rates, temperatures, and pressure readings are either unmonitored or siloed in legacy SCADA systems that weren&apos;t designed for the density of modern AI infrastructure.
                  </p>
                  <p>
                    Droplet changes this by deploying intelligent sensor networks that capture telemetry at every critical point in the water loop, feeding it into a unified platform where AI continuously identifies inefficiencies and recommends — or autonomously executes — optimizations.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Hardware showcase */}
        <section className="py-24 px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
              <div className="flex items-center justify-center">
                <Image
                  src="/droplet-node.png"
                  alt="Droplet Node hardware"
                  width={500}
                  height={350}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.3em] text-[#0066FF] mb-3">Our Hardware</p>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">Built from the ground up.</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  The Droplet Node combines an Arduino-based microcontroller with an industrial flow sensor to capture real-time water telemetry at every critical point. Designed for zero-maintenance deployment in harsh data center environments, each node transmits flow rate, temperature, and pressure data over a secure wireless mesh to the Droplet Intelligence Platform.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 px-6 lg:px-8 bg-[#F8FAFC]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-[#0066FF]" />
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.3em] text-[#0066FF]">Our Values</p>
            </div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-[#0F172A] mb-12">What drives us.</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <motion.div key={v.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white p-8 rounded-2xl border border-[#E2E8F0]">
                  <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#0066FF] mb-3">0{i + 1}</p>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">{v.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-[#0066FF]" />
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.3em] text-[#0066FF]">Timeline</p>
            </div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-[#0F172A] mb-12">Our journey so far.</h2>
            <div className="border-t border-[#E2E8F0]">
              {timeline.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="border-b border-[#E2E8F0] py-8 grid md:grid-cols-[100px_200px_1fr] gap-4 md:gap-8 items-start">
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-sm text-[#94A3B8]">{item.year}</span>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[#0F172A]">{item.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 px-6 lg:px-8 bg-[#F8FAFC]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-[#0066FF]" />
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.3em] text-[#0066FF]">Leadership</p>
            </div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-[#0F172A] mb-12">The team behind Droplet.</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {team.map((member, i) => (
                <motion.div key={member.name} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white p-8 rounded-2xl border border-[#E2E8F0] text-center">
                  <div className="w-16 h-16 rounded-full bg-[#0066FF]/8 flex items-center justify-center mx-auto mb-4">
                    <span className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-[#0066FF]">{member.name.split(" ").map(n => n[0]).join("")}</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-[#0F172A]">{member.name}</h3>
                  <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mt-1">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Want to learn more?</h2>
            <p className="text-[#64748B] mb-8">Get in touch with the team or explore our sensor hardware.</p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/contact" className="bg-[#0066FF] text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-[#0052CC] transition-colors">
                Contact Us
              </Link>
              <Link href="/shop" className="border border-[#E2E8F0] text-[#64748B] text-sm font-medium px-6 py-3 rounded-lg hover:border-[#0066FF]/30 hover:text-[#0066FF] transition-all">
                Shop Hardware
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
