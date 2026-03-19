"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section id="cta" className="py-32 px-6 lg:px-8 bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      {/* Corner labels */}
      <span className="absolute top-8 left-8 font-[family-name:var(--font-mono)] text-[9px] text-[#94A3B8] tracking-widest uppercase hidden lg:block">ACCESS / REQUEST</span>
      <span className="absolute top-8 right-8 font-[family-name:var(--font-mono)] text-[9px] text-[#94A3B8] tracking-widest uppercase hidden lg:block">ENTERPRISE READY</span>

      <div ref={ref} className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#E2E8F0] mx-auto mb-12" />

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#0066FF]" />
            <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.3em] text-[#0066FF]">Join the Waitlist</p>
            <div className="w-8 h-px bg-[#0066FF]" />
          </div>

          <h2 className="font-[family-name:var(--font-orbitron)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight">
            Water is the next
            <br />
            constraint in{" "}
            <span className="text-[#0066FF]">AI</span>.
          </h2>

          <p className="mt-6 text-base text-[#64748B] max-w-md mx-auto leading-relaxed">
            Join the companies building sustainable AI infrastructure with Droplet. Early access slots are limited.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-3.5 rounded-xl text-sm font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              You&apos;re on the list — we&apos;ll be in touch soon.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@datacenter.com"
                className="flex-1 bg-white border border-[#E2E8F0] rounded-lg px-4 py-3.5 text-sm text-[#0F172A] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
              />
              <button
                type="submit"
                className="group inline-flex items-center gap-2 bg-[#0066FF] text-white text-sm font-medium px-6 py-3.5 rounded-lg hover:shadow-[0_0_28px_rgba(0,102,255,0.35)] hover:bg-[#0052CC] transition-all duration-200 whitespace-nowrap"
              >
                Request Access
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>
            </form>
          )}

          <div className="mt-8 flex items-center justify-center gap-6">
            <Link href="/shop" className="text-xs font-[family-name:var(--font-mono)] uppercase tracking-widest text-[#64748B] hover:text-[#0066FF] transition-colors">
              Shop Hardware →
            </Link>
            <Link href="/login" className="text-xs font-[family-name:var(--font-mono)] uppercase tracking-widest text-[#64748B] hover:text-[#0066FF] transition-colors">
              Sign In →
            </Link>
          </div>

          <div className="w-px h-16 bg-gradient-to-t from-transparent to-[#E2E8F0] mx-auto mt-12" />
        </motion.div>
      </div>
    </section>
  );
}
