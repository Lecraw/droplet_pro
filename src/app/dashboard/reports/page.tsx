"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Download, FileText, Calendar, CheckCircle, Eye, X, ArrowLeft } from "lucide-react";

const reports = [
  {
    name: "Monthly Water Intelligence Report",
    period: "February 2026",
    type: "Water Usage",
    size: "2.4 MB",
    status: "Ready",
    generated: "Mar 01, 2026",
    pdf: null,
  },
  {
    name: "Q4 2025 Efficiency Analysis",
    period: "Oct\u2013Dec 2025",
    type: "Efficiency",
    size: "4.1 MB",
    status: "Ready",
    generated: "Jan 05, 2026",
    pdf: null,
  },
  {
    name: "Annual Sustainability Report",
    period: "Full Year 2025",
    type: "Sustainability",
    size: "8.7 MB",
    status: "Ready",
    generated: "Jan 15, 2026",
    pdf: "/Droplet_Annual_Sustainability_Report_2025.pdf",
  },
  {
    name: "Zone B Anomaly Investigation",
    period: "Feb 14\u201318, 2026",
    type: "Incident",
    size: "1.2 MB",
    status: "Ready",
    generated: "Feb 19, 2026",
    pdf: null,
  },
  {
    name: "March 2026 Telemetry Export",
    period: "March 2026",
    type: "Raw Data",
    size: "\u2014",
    status: "Generating",
    generated: "\u2014",
    pdf: null,
  },
];

const typeColors: Record<string, string> = {
  "Water Usage": "bg-blue-50 text-blue-700 border-blue-100",
  Efficiency: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Sustainability: "bg-teal-50 text-teal-700 border-teal-100",
  Incident: "bg-amber-50 text-amber-700 border-amber-100",
  "Raw Data": "bg-slate-50 text-slate-600 border-slate-100",
};

export default function ReportsPage() {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [viewingPdf, setViewingPdf] = useState<string | null>(null);
  const [viewingName, setViewingName] = useState("");

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 2000);
  };

  const openPdf = (pdf: string, name: string) => {
    setViewingPdf(pdf);
    setViewingName(name);
  };

  // ── Full-screen PDF viewer ──
  if (viewingPdf) {
    return (
      <div className="flex flex-col h-[calc(100vh-2rem)]">
        {/* Toolbar */}
        <div className="flex items-center justify-between bg-white border border-[#E2E8F0] rounded-xl px-5 py-3 mb-4 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewingPdf(null)}
              className="flex items-center gap-2 text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Reports</span>
            </button>
            <span className="text-[#E2E8F0]">|</span>
            <FileText className="w-4 h-4 text-[#0066FF]" />
            <span className="text-sm font-bold text-[#0F172A]">{viewingName}</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={viewingPdf}
              download
              className="flex items-center gap-1.5 bg-[#F0F4F8] hover:bg-[#0066FF] hover:text-white text-[#64748B] px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </a>
            <a
              href={viewingPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#F0F4F8] hover:bg-[#0066FF] hover:text-white text-[#64748B] px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              Open in New Tab
            </a>
          </div>
        </div>

        {/* PDF Embed */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden"
        >
          <iframe
            src={viewingPdf}
            className="w-full h-full"
            title={viewingName}
          />
        </motion.div>
      </div>
    );
  }

  // ── Reports list view ──
  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.25em] text-[#0066FF] mb-1">Documentation</p>
          <h1 className="text-3xl font-bold text-[#0F172A] font-[family-name:var(--font-display)]">Reports</h1>
          <p className="text-[#64748B] text-sm mt-1">Download generated reports or schedule automated reporting.</p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm disabled:opacity-70 cursor-pointer"
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
            className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm">
            <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-2">{label}</p>
            <p className="text-2xl font-bold text-[#0F172A] font-[family-name:var(--font-display)]">{value}</p>
            <p className="text-xs text-[#94A3B8] mt-1">{sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Reports list */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
          <p className="font-bold text-[#0F172A] text-sm">All Reports</p>
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <Calendar className="w-4 h-4" />
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest">Sorted by Date</span>
          </div>
        </div>
        <div className="divide-y divide-[#F0F4F8]">
          {reports.map((r, i) => (
            <motion.div key={r.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
              className={`px-6 py-4 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors group ${r.pdf ? "cursor-pointer" : ""}`}
              onClick={r.pdf ? () => openPdf(r.pdf!, r.name) : undefined}
            >
              <div className="flex items-start gap-4">
                <div className={`mt-0.5 p-2 rounded-lg ${r.pdf ? "bg-teal-50" : "bg-[#F0F4F8]"}`}>
                  <FileText className={`w-4 h-4 ${r.pdf ? "text-teal-600" : "text-[#64748B]"}`} />
                </div>
                <div>
                  <p className="font-medium text-[#0F172A] text-sm">{r.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded border font-[family-name:var(--font-mono)] uppercase tracking-wider ${typeColors[r.type]}`}>{r.type}</span>
                    <span className="text-xs text-[#94A3B8]">{r.period}</span>
                    <span className="text-xs text-[#94A3B8]">{r.size}</span>
                    {r.pdf && (
                      <span className="flex items-center gap-1 text-[10px] text-[#0066FF] font-[family-name:var(--font-mono)] uppercase tracking-wider">
                        <Eye className="w-3 h-3" />
                        Viewable
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-[#94A3B8]">Generated</p>
                  <p className="text-xs font-medium text-[#64748B]">{r.generated}</p>
                </div>
                {r.status === "Ready" ? (
                  r.pdf ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); openPdf(r.pdf!, r.name); }}
                      className="flex items-center gap-1.5 bg-[#0066FF] text-white px-3 py-2 rounded-lg text-xs font-medium transition-all hover:bg-[#0052CC] cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </button>
                  ) : (
                    <button className="flex items-center gap-1.5 bg-[#F0F4F8] hover:bg-[#0066FF] hover:text-white text-[#64748B] px-3 py-2 rounded-lg text-xs font-medium transition-all group-hover:bg-[#0066FF] group-hover:text-white cursor-pointer">
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  )
                ) : (
                  <span className="flex items-center gap-1.5 text-xs text-[#94A3B8] font-[family-name:var(--font-mono)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
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
        className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
        <p className="font-bold text-[#0F172A] text-sm mb-4">Scheduled Reports</p>
        <div className="space-y-3">
          {[
            { name: "Monthly Water Intelligence", schedule: "1st of every month", next: "Apr 01, 2026", active: true },
            { name: "Weekly Telemetry Digest", schedule: "Every Monday 08:00", next: "Mar 23, 2026", active: true },
            { name: "Quarterly Executive Summary", schedule: "Start of each quarter", next: "Jul 01, 2026", active: false },
          ].map(({ name, schedule, next, active }) => (
            <div key={name} className="flex items-center justify-between py-3 border-b border-[#F0F4F8] last:border-0">
              <div>
                <p className="text-sm font-medium text-[#0F172A]">{name}</p>
                <p className="text-xs text-[#94A3B8] mt-0.5 font-[family-name:var(--font-mono)]">{schedule} · Next: {next}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-[family-name:var(--font-mono)] uppercase tracking-wider ${active ? "bg-emerald-50 text-emerald-700" : "bg-slate-50 text-slate-500"}`}>
                  {active ? "Active" : "Paused"}
                </span>
                <button className="text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider text-[#64748B] hover:text-[#0066FF] transition-colors cursor-pointer">
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
