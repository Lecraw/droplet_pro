"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#F0F4F8]" />
      <div className="absolute inset-0 grid-pattern opacity-60" />
      {/* Corner coordinates */}
      <span className="absolute top-6 left-6 font-[family-name:var(--font-mono)] text-[9px] text-[#94A3B8] tracking-widest uppercase select-none">00.001 / AUTH</span>
      <span className="absolute top-6 right-6 font-[family-name:var(--font-mono)] text-[9px] text-[#94A3B8] tracking-widest uppercase select-none">DROPLET OS v2.1</span>
      <span className="absolute bottom-6 left-6 font-[family-name:var(--font-mono)] text-[9px] text-[#94A3B8] tracking-widest uppercase select-none">SYS STATUS: NOMINAL</span>
      <span className="absolute bottom-6 right-6 font-[family-name:var(--font-mono)] text-[9px] text-[#94A3B8] tracking-widest uppercase select-none">ENC: AES-256</span>

      {/* Thin accent lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[#0066FF]/20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-transparent to-[#0066FF]/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(0,102,255,0.06)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-[#E2E8F0] p-10 relative z-10"
      >
        <Link href="/" className="inline-flex items-center gap-2 text-[9px] text-[#94A3B8] hover:text-[#0066FF] mb-10 font-[family-name:var(--font-mono)] uppercase tracking-[0.25em] transition-colors">
          <ArrowLeft className="w-3 h-3" />
          Back to Site
        </Link>

        {/* Logo — larger */}
        <div className="flex flex-col items-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute inset-0 scale-[2] bg-[radial-gradient(circle,rgba(0,102,255,0.12)_0%,transparent_70%)] pointer-events-none" />
            <Image
              src="/droplet-logo.svg"
              alt="Droplet"
              width={96}
              height={134}
              className="object-contain drop-shadow-[0_0_24px_rgba(0,102,255,0.3)] relative z-10"
            />
          </motion.div>
          <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.35em] text-[#0066FF] mt-4">
            Water Intelligence Platform
          </p>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#0F172A] mb-1 tracking-wide">
            Intelligence Platform
          </h1>
          <p className="text-xs text-[#94A3B8] font-[family-name:var(--font-mono)] uppercase tracking-widest">Sign in to access your dashboard</p>
        </div>

        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); window.location.href = '/dashboard'; }}>
          <div>
            <label className="block text-[9px] uppercase tracking-[0.25em] text-[#64748B] mb-2 font-[family-name:var(--font-mono)]">
              Email Address
            </label>
            <input
              type="email"
              defaultValue="admin@hyperscale.inc"
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm text-[#0F172A] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all font-[family-name:var(--font-mono)]"
            />
          </div>
          <div>
            <label className="block text-[9px] uppercase tracking-[0.25em] text-[#64748B] mb-2 font-[family-name:var(--font-mono)] flex justify-between">
              <span>Password</span>
              <a href="#" className="text-[#0066FF] hover:opacity-70 transition-opacity">Forgot?</a>
            </label>
            <input
              type="password"
              defaultValue="password123"
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm text-[#0F172A] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all font-[family-name:var(--font-mono)]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] py-4 rounded-lg shadow-[0_0_20px_rgba(0,102,255,0.25)] hover:shadow-[0_0_32px_rgba(0,102,255,0.4)] transition-all duration-200 mt-4"
          >
            Access Platform →
          </button>
        </form>

        {/* Bottom metadata */}
        <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex justify-between">
          <span className="font-[family-name:var(--font-mono)] text-[8px] text-[#94A3B8] uppercase tracking-widest">Secure Login</span>
          <span className="font-[family-name:var(--font-mono)] text-[8px] text-[#94A3B8] uppercase tracking-widest">TLS 1.3</span>
        </div>
      </motion.div>
    </div>
  );
}
