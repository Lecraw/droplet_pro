"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";

const team = [
  {
    role: "Chief Executive Officer",
    abbr: "CEO",
    name: "Leo Hoffmann",
    email: "29leoh@students.harker.org",
  },
  {
    role: "Chief Operating Officer",
    abbr: "COO",
    name: "Bazigh Tahirzad",
    email: "27bazight@students.harker.org",
  },
  {
    role: "Chief Marketing Officer",
    abbr: "CMO",
    name: "Patrick Jiang",
    email: "29patrickj@students.harker.org",
  },
];

function ContactContent() {
  const params = useSearchParams();
  const isCareers = params.get("ref") === "careers";

  return (
    <div className="min-h-screen bg-[#060B18] relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Corner labels */}
      <span className="absolute top-6 left-6 font-[family-name:var(--font-ibm-plex-mono)] text-[9px] text-[#2A3654] tracking-widest uppercase select-none">
        DROPLET / {isCareers ? "CAREERS" : "CONTACT"}
      </span>
      <span className="absolute top-6 right-6 font-[family-name:var(--font-ibm-plex-mono)] text-[9px] text-[#2A3654] tracking-widest uppercase select-none">TEAM · 2026</span>

      <div className="relative max-w-4xl mx-auto px-6 pt-24 pb-32">
        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-2 font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.25em] text-[#4A5B78] hover:text-[#00BFFF] mb-16 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-px bg-[#00BFFF]" />
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.3em] text-[#00BFFF]">
              {isCareers ? "Join the Team" : "Get in Touch"}
            </p>
          </div>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-5xl md:text-6xl font-bold text-[#F0F4F8] leading-tight mb-4">
            {isCareers ? "Careers" : "Contact Us"}
          </h1>
          <p className="text-[#8B9DC3] text-base leading-relaxed max-w-xl">
            {isCareers
              ? "We're always looking for exceptional engineers, scientists, and operators who want to solve water intelligence at scale. Reach out to any team member below for available positions."
              : "Reach out to the Droplet team directly. We're available for partnership inquiries, enterprise demos, and press."}
          </p>
        </motion.div>

        {/* Thin rule */}
        <div className="border-t border-white/[0.06] my-12" />

        {/* Team rows */}
        <div className="space-y-0">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="border-b border-white/[0.06] py-8 grid md:grid-cols-[96px_1fr_auto] gap-6 items-center group"
            >
              {/* Role abbr — large faint */}
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-2xl font-medium text-[#1E2A42] group-hover:text-[#2A3654] transition-colors select-none">
                {member.abbr}
              </span>

              {/* Name + role */}
              <div>
                <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#4A5B78] mb-1">{member.role}</p>
                <p className="font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-[#F0F4F8]">{member.name}</p>
              </div>

              {/* Email */}
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-2 font-[family-name:var(--font-ibm-plex-mono)] text-sm text-[#8B9DC3] hover:text-[#00BFFF] transition-colors group/link"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span className="group-hover/link:underline underline-offset-2">{member.email}</span>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#4A5B78] mb-2">
              {isCareers ? "Open Roles" : "General Inquiries"}
            </p>
            <p className="text-[#8B9DC3] text-sm leading-relaxed max-w-md">
              {isCareers
                ? "We don't post formal job listings — if you're talented and passionate about sustainable infrastructure, just reach out."
                : "For product questions, enterprise pricing, or media requests — reach any team member above."}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Image src="/droplet-logo.svg" alt="Droplet" width={16} height={22} className="opacity-40" />
            <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#4A5B78]">Droplet Technologies, Inc.</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense>
      <ContactContent />
    </Suspense>
  );
}
