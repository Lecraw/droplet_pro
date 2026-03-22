"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Download, FileText, Calendar, CheckCircle } from "lucide-react";

const reports = [
  {
    name: "Monthly Water Intelligence Report",
    period: "February 2026",
    type: "Water Usage",
    size: "2.4 MB",
    status: "Ready",
    generated: "Mar 01, 2026",
  },
  {
    name: "Q4 2025 Efficiency Analysis",
    period: "Oct–Dec 2025",
    type: "Efficiency",
    size: "4.1 MB",
    status: "Ready",
    generated: "Jan 05, 2026",
  },
  {
    name: "Annual Sustainability Report",
    period: "Full Year 2025",
    type: "Sustainability",
    size: "8.7 MB",
    status: "Ready",
    generated: "Jan 15, 2026",
  },
  {
    name: "Zone B Anomaly Investigation",
    period: "Feb 14–18, 2026",
    type: "Incident",
    size: "1.2 MB",
    status: "Ready",
    generated: "Feb 19, 2026",
  },
  {
    name: "March 2026 Telemetry Export",
    period: "March 2026",
    type: "Raw Data",
    size: "—",
    status: "Generating",
    generated: "—",
  },
  {
    name: "Zone C GPU Cluster Thermal Analysis",
    period: "Feb 2026",
    type: "Efficiency",
    size: "3.2 MB",
    status: "Ready",
    generated: "Mar 05, 2026",
  },
  {
    name: "Water Reclamation ROI Assessment",
    period: "Q1 2026",
    type: "Sustainability",
    size: "5.4 MB",
    status: "Ready",
    generated: "Mar 12, 2026",
  },
  {
    name: "Compliance Audit — EPA Water Standards",
    period: "Full Year 2025",
    type: "Incident",
    size: "12.1 MB",
    status: "Ready",
    generated: "Feb 28, 2026",
  },
];

const typeColors: Record<string, string> = {
  "Water Usage": "bg-[#00BFFF]/10 text-[#00BFFF] border-[#00BFFF]/15",
  Efficiency: "bg-[#00E5A0]/10 text-[#00E5A0] border-[#00E5A0]/15",
  Sustainability: "bg-[#00E5A0]/10 text-[#00E5A0] border-[#00E5A0]/15",
  Incident: "bg-[#FFB020]/10 text-[#FFB020] border-[#FFB020]/15",
  "Raw Data": "bg-white/[0.04] text-[#4A5B78] border-white/[0.06]",
};

export default function ReportsPage() {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.25em] text-[#00BFFF] mb-1">Documentation</p>
          <h1 className="text-3xl font-bold text-[#F0F4F8] font-[family-name:var(--font-syne)]">Reports</h1>
          <p className="text-[#8B9DC3] text-sm mt-1">Download generated reports or schedule automated reporting.</p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="flex items-center gap-2 bg-[#00BFFF] hover:bg-[#00D4FF] text-[#060B18] px-5 py-2.5 rounded-lg text-sm font-medium transition-all  disabled:opacity-70"
        >
          {generated ? <CheckCircle className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
          {generating ? "Generating..." : generated ? "Report Queued" : "Generate Report"}
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Reports Generated", value: "47", sub: "This year" },
          { label: "Total Data Exported", value: "284 MB", sub: "All time" },
          { label: "Last Report", value: "Mar 01", sub: "Monthly Summary" },
        ].map(({ label, value, sub }) => (
          <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-5 ">
            <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-widest text-[#4A5B78] mb-2">{label}</p>
            <p className="text-2xl font-bold text-[#F0F4F8] font-[family-name:var(--font-syne)]">{value}</p>
            <p className="text-xs text-[#4A5B78] mt-1">{sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Reports list */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06]  overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
          <p className="font-bold text-[#F0F4F8] text-sm">All Reports</p>
          <div className="flex items-center gap-2 text-[#4A5B78]">
            <Calendar className="w-4 h-4" />
            <span className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-widest">Sorted by Date</span>
          </div>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {reports.map((r, i) => (
            <motion.div key={r.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
              className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.04] transition-colors group">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 p-2 bg-[#0A0F1E] rounded-lg">
                  <FileText className="w-4 h-4 text-[#8B9DC3]" />
                </div>
                <div>
                  <p className="font-medium text-[#F0F4F8] text-sm">{r.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded border font-[family-name:var(--font-jetbrains)] uppercase tracking-wider ${typeColors[r.type]}`}>{r.type}</span>
                    <span className="text-xs text-[#4A5B78]">{r.period}</span>
                    <span className="text-xs text-[#4A5B78]">{r.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-[#4A5B78]">Generated</p>
                  <p className="text-xs font-medium text-[#8B9DC3]">{r.generated}</p>
                </div>
                {r.status === "Ready" ? (
                  <button className="flex items-center gap-1.5 bg-[#0A0F1E] hover:bg-[#00BFFF] hover:text-[#060B18] text-[#8B9DC3] px-3 py-2 rounded-lg text-xs font-medium transition-all group-hover:bg-[#00BFFF] group-hover:text-[#060B18]">
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs text-[#4A5B78] font-[family-name:var(--font-jetbrains)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFB020] animate-pulse" />
                    Generating
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scheduled Reports */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6 ">
        <p className="font-bold text-[#F0F4F8] text-sm mb-4">Scheduled Reports</p>
        <div className="space-y-3">
          {[
            { name: "Monthly Water Intelligence", schedule: "1st of every month", next: "Apr 01, 2026", active: true },
            { name: "Weekly Telemetry Digest", schedule: "Every Monday 08:00", next: "Mar 23, 2026", active: true },
            { name: "Quarterly Executive Summary", schedule: "Start of each quarter", next: "Jul 01, 2026", active: false },
          ].map(({ name, schedule, next, active }) => (
            <div key={name} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
              <div>
                <p className="text-sm font-medium text-[#F0F4F8]">{name}</p>
                <p className="text-xs text-[#4A5B78] mt-0.5 font-[family-name:var(--font-jetbrains)]">{schedule} · Next: {next}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-[family-name:var(--font-jetbrains)] uppercase tracking-wider ${active ? "bg-[#00E5A0]/10 text-[#00E5A0]" : "bg-white/[0.04] text-[#4A5B78]"}`}>
                  {active ? "Active" : "Paused"}
                </span>
                <button className="text-xs font-[family-name:var(--font-jetbrains)] uppercase tracking-wider text-[#8B9DC3] hover:text-[#00BFFF] transition-colors">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
