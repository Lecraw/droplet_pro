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
    <section id="cta" className="py-32 px-6 lg:px-8 bg-[#0A0F1E] relative overflow-hidden noise-overlay">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,191,255,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Corner labels */}
      <span className="absolute top-8 left-8 font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78] tracking-[0.25em] uppercase hidden lg:block">ACCESS / REQUEST</span>
      <span className="absolute top-8 right-8 font-[family-name:var(--font-jetbrains)] text-[9px] text-[#4A5B78] tracking-[0.25em] uppercase hidden lg:block">ENTERPRISE READY</span>

      <div ref={ref} className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#00BFFF]/20 mx-auto mb-12" />

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#00BFFF]" />
            <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.3em] text-[#00BFFF]">Join the Waitlist</p>
            <div className="w-8 h-px bg-[#00BFFF]" />
          </div>

          <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#F0F4F8] leading-tight">
            Water is the next
            <br />
            constraint in{" "}
            <span className="text-[#00BFFF] drop-shadow-[0_0_20px_rgba(0,191,255,0.4)]">AI</span>.
          </h2>

          <p className="mt-6 text-base text-[#8B9DC3] max-w-md mx-auto leading-relaxed">
            Join the companies building sustainable AI infrastructure with Droplet. Early access slots are limited.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 inline-flex items-center gap-2 glass-card px-6 py-3.5 rounded-xl text-sm font-medium text-[#00E5A0]"
              style={{ border: "1px solid rgba(0, 229, 160, 0.2)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] shadow-[0_0_8px_rgba(0,229,160,0.6)]" />
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
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3.5 text-sm text-[#F0F4F8] placeholder:text-[#4A5B78] focus:outline-none focus:border-[#00BFFF]/40 focus:ring-1 focus:ring-[#00BFFF]/20 focus:bg-white/[0.06] transition-all"
              />
              <button
                type="submit"
                className="group inline-flex items-center gap-2 bg-[#00BFFF] text-[#060B18] text-sm font-semibold px-6 py-3.5 rounded-lg hover:bg-[#00D4FF] hover:shadow-[0_0_30px_rgba(0,191,255,0.35)] transition-all duration-300 whitespace-nowrap"
              >
                Request Access
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>
            </form>
          )}

          <div className="mt-8 flex items-center justify-center gap-6">
            <Link href="/shop" className="text-[11px] font-[family-name:var(--font-jetbrains)] uppercase tracking-[0.2em] text-[#4A5B78] hover:text-[#00BFFF] transition-colors duration-300">
              Shop Hardware →
            </Link>
            <Link href="/login" className="text-[11px] font-[family-name:var(--font-jetbrains)] uppercase tracking-[0.2em] text-[#4A5B78] hover:text-[#00BFFF] transition-colors duration-300">
              Sign In →
            </Link>
          </div>

          <div className="w-px h-16 bg-gradient-to-t from-transparent to-[#00BFFF]/20 mx-auto mt-12" />
        </motion.div>
      </div>
    </section>
  );
}
