"use client";

import { useState } from "react";
import { ArrowLeft, Calendar, CheckCircle, Download, Eye, FileText } from "lucide-react";
import styles from "../dashboard.module.css";

type Report = {
  name: string;
  period: string;
  type: string;
  size: string;
  status: "Ready" | "Generating";
  generated: string;
  pdf: string | null;
};

const reports: Report[] = [
  { name: "Monthly Water Intelligence Report", period: "February 2026",  type: "Water",          size: "2.4 MB", status: "Ready",      generated: "Mar 01, 2026", pdf: null },
  { name: "Q4 2025 Efficiency Analysis",       period: "Oct–Dec 2025",   type: "Efficiency",     size: "4.1 MB", status: "Ready",      generated: "Jan 05, 2026", pdf: null },
  { name: "Annual Sustainability Report",      period: "Full year 2025", type: "Sustainability", size: "8.7 MB", status: "Ready",      generated: "Jan 15, 2026", pdf: "/Droplet_Annual_Sustainability_Report_2025.pdf" },
  { name: "Zone B Anomaly Investigation",      period: "Feb 14–18, 2026", type: "Incident",      size: "1.2 MB", status: "Ready",      generated: "Feb 19, 2026", pdf: null },
  { name: "March 2026 Telemetry Export",       period: "March 2026",     type: "Raw data",       size: "—",      status: "Generating", generated: "—",            pdf: null },
];

const typeColors: Record<string, string> = {
  Water:          "#00a6e0",
  Efficiency:     "#10b981",
  Sustainability: "#14b8a6",
  Incident:       "#f59e0b",
  "Raw data":     "#94a3b8",
};

const scheduled = [
  { name: "Monthly Water Intelligence",    schedule: "1st of every month",       next: "May 01, 2026", active: true },
  { name: "Weekly Telemetry Digest",       schedule: "Every Monday 08:00",       next: "Apr 21, 2026", active: true },
  { name: "Quarterly Executive Summary",   schedule: "Start of each quarter",    next: "Jul 01, 2026", active: false },
];

export default function ReportsPage() {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [viewingPdf, setViewingPdf] = useState<string | null>(null);
  const [viewingName, setViewingName] = useState("");

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 1800);
  };

  const openPdf = (pdf: string, name: string) => {
    setViewingPdf(pdf);
    setViewingName(name);
  };

  if (viewingPdf) {
    return (
      <div className={styles.root} style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 4rem)" }}>
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <button className={styles.btnText} onClick={() => setViewingPdf(null)} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <ArrowLeft className="w-4 h-4" />
              Back to reports
            </button>
            <span style={{ width: 1, height: 18, background: "#e2e8f0" }} />
            <FileText className="w-4 h-4" style={{ color: "#00a6e0" }} />
            <span style={{ fontSize: 14, fontWeight: 500, color: "#0a1628", letterSpacing: "-0.01em" }}>{viewingName}</span>
          </div>
          <div className={styles.toolbarRight}>
            <a href={viewingPdf} download className={styles.btnGhost}>
              <Download className="w-3.5 h-3.5" /> Download
            </a>
            <a href={viewingPdf} target="_blank" rel="noopener noreferrer" className={styles.btnGhost}>
              <Eye className="w-3.5 h-3.5" /> Open
            </a>
          </div>
        </div>
        <div style={{ flex: 1, border: "1px solid #e2e8f0", borderTop: "none", background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)", overflow: "hidden" }}>
          <iframe src={viewingPdf} title={viewingName} style={{ width: "100%", height: "100%", border: "none" }} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {/* Hero */}
      <header>
        <span className={styles.eye}>Documentation · the paper trail</span>
        <h1 className={styles.title}>
          Every month, <em>one PDF</em>.
        </h1>
        <p className={styles.lead}>
          Generated, archived, and ready. Pull any report below, schedule recurring ones, or export a custom slice.
        </p>
      </header>

      {/* Headline action */}
      <div
        className={styles.sectionHead}
        style={{ marginTop: 44, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}
      >
        <div>
          <span className={styles.eye}>On demand</span>
          <h2 className={styles.title} style={{ fontSize: "clamp(24px, 2.8vw, 34px)" }}>
            Need a fresh one?
          </h2>
        </div>
        <button className={styles.btnInk} onClick={handleGenerate} disabled={generating || generated}>
          {generated ? <CheckCircle className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
          {generating ? "Generating…" : generated ? "Queued" : "Generate report"}
        </button>
      </div>

      {/* KPI strip */}
      <div className={styles.statRow} style={{ marginTop: 22 }}>
        <div className={styles.statCell}>
          <div className={styles.statK}>Reports generated</div>
          <div className={styles.statN}>47</div>
          <div className={styles.statTrend}>This year</div>
        </div>
        <div className={styles.statCell}>
          <div className={styles.statK}>Data exported</div>
          <div className={styles.statN}>284<span>MB</span></div>
          <div className={styles.statTrend}>All time</div>
        </div>
        <div className={styles.statCell}>
          <div className={styles.statK}>Latest</div>
          <div className={styles.statN} style={{ fontSize: "clamp(26px, 2.8vw, 36px)" }}>Mar 01</div>
          <div className={styles.statTrend}>Monthly summary</div>
        </div>
        <div className={styles.statCell}>
          <div className={styles.statK}>Scheduled</div>
          <div className={styles.statN}>{scheduled.filter((s) => s.active).length}</div>
          <div className={`${styles.statTrend} ${styles.statTrendOk}`}>Active jobs</div>
        </div>
      </div>

      {/* Report list */}
      <div className={styles.sectionHead}>
        <span className={styles.eye}>Library · sorted by generated date</span>
        <h2 className={styles.title} style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}>
          What you&rsquo;ve <em>already got</em>.
        </h2>
      </div>
      <div className={styles.listGroup}>
        {reports.map((r) => {
          const typeColor = typeColors[r.type] || "#94a3b8";
          const clickable = !!r.pdf;
          return (
            <div
              key={r.name}
              className={`${styles.reportRow} ${clickable ? styles.reportRowClickable : ""}`}
              onClick={clickable ? () => openPdf(r.pdf!, r.name) : undefined}
            >
              <div className={styles.reportIcon} style={{ background: `${typeColor}15`, borderColor: `${typeColor}40`, color: typeColor }}>
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <p className={styles.reportTitle}>{r.name}</p>
                <div className={styles.reportSubRow}>
                  <span className={styles.typeTag} style={{ color: typeColor, borderColor: `${typeColor}55` }}>{r.type}</span>
                  <span className={styles.reportMeta}>{r.period}</span>
                  <span className={styles.reportMeta}>{r.size}</span>
                  {r.pdf && (
                    <span className={styles.reportMeta} style={{ color: "#00a6e0" }}>
                      Viewable
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.reportMeta} style={{ textAlign: "right" }}>
                <div style={{ color: "#94a3b8", fontSize: 9, letterSpacing: "0.22em" }}>Generated</div>
                <div style={{ color: "#64748b", marginTop: 2 }}>{r.generated}</div>
              </div>
              <div />
              <div>
                {r.status === "Ready" ? (
                  r.pdf ? (
                    <button
                      className={styles.btnInk}
                      onClick={(e) => { e.stopPropagation(); openPdf(r.pdf!, r.name); }}
                      style={{ fontSize: 12, padding: "7px 14px" }}
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                  ) : (
                    <button className={styles.btnGhost} style={{ fontSize: 12 }}>
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  )
                ) : (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#94a3b8" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b" }} className="animate-pulse" />
                    Generating
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Scheduled */}
      <div className={styles.sectionHead}>
        <span className={styles.eye}>On the calendar</span>
        <h2 className={styles.title} style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}>
          What&rsquo;s <em>running itself</em>.
        </h2>
      </div>
      <div className={styles.listGroup}>
        {scheduled.map((s, i) => (
          <div
            key={s.name}
            className={styles.listRow}
            style={{
              gridTemplateColumns: "auto 1fr auto auto",
              gap: 22,
              borderBottom: i === scheduled.length - 1 ? "none" : "1px solid #e2e8f0",
            }}
          >
            <Calendar className="w-4 h-4" style={{ color: s.active ? "#00a6e0" : "#94a3b8" }} />
            <div>
              <p style={{ margin: 0, fontSize: 15, color: "#0a1628", letterSpacing: "-0.01em", fontWeight: 500 }}>
                {s.name}
              </p>
              <p className={styles.reportMeta} style={{ margin: "4px 0 0" }}>
                {s.schedule} · next: {s.next}
              </p>
            </div>
            <span className={styles.typeTag} style={{ color: s.active ? "#059669" : "#94a3b8", borderColor: s.active ? "#05966955" : "#94a3b855" }}>
              {s.active ? "Active" : "Paused"}
            </span>
            <button className={styles.btnText}>Edit</button>
          </div>
        ))}
      </div>

      <div style={{ height: 64 }} />
    </div>
  );
}
