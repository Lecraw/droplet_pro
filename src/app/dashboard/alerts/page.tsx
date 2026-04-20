"use client";

import { useState } from "react";
import { AlertTriangle, Bell, BellOff, CheckCircle, Info, XCircle } from "lucide-react";
import styles from "../dashboard.module.css";

type Severity = "warning" | "info" | "success" | "error";
type Alert = { id: number; severity: Severity; title: string; message: string; time: string; ack: boolean; source: string };

const initial: Alert[] = [
  { id: 1, severity: "warning", source: "Aisle B · SN-9023",  title: "Elevated temperature",        message: "Sensor is reporting 28.5°C, above the 27°C soft threshold. No action required yet — flow restore expected at 15:00.",        time: "2h ago",  ack: false },
  { id: 2, severity: "info",    source: "Droplet AI",          title: "Optimization applied",        message: "Droplet AI reduced Aisle A flow by 0.3 L/s after detecting thermal headroom. Projected weekly savings: ~1,200 gallons.",         time: "4h ago",  ack: true },
  { id: 3, severity: "success", source: "System",              title: "PUE target achieved",         message: "System PUE reached 1.12, surpassing the Q1 target three weeks ahead of schedule.",                                                  time: "1d ago",  ack: true },
  { id: 4, severity: "error",   source: "Aisle B · SN-9023",   title: "Connectivity degraded",       message: "SN-9023 is experiencing intermittent dropouts. Failover is active; physical inspection scheduled.",                                 time: "2d ago",  ack: true },
  { id: 5, severity: "warning", source: "Aisle C",             title: "Pressure spike observed",      message: "Pressure momentarily reached 4.8 bar before normalizing. Log retained for investigation.",                                         time: "3d ago",  ack: false },
  { id: 6, severity: "info",    source: "Reports",             title: "Monthly report is ready",     message: "February 2026 Water Intelligence Report has been generated. Open the Reports tab to preview or download.",                           time: "4d ago",  ack: true },
];

const severityMeta: Record<Severity, { color: string; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; label: string }> = {
  warning: { color: "#f59e0b", Icon: AlertTriangle, label: "Warning" },
  info:    { color: "#00a6e0", Icon: Info,          label: "Info" },
  success: { color: "#10b981", Icon: CheckCircle,   label: "Resolved" },
  error:   { color: "#ef4444", Icon: XCircle,       label: "Error" },
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(initial);
  const [filter, setFilter] = useState<"all" | "unread" | Severity>("all");

  const unreadCount = alerts.filter((a) => !a.ack).length;

  const ackAlert = (id: number) => setAlerts((a) => a.map((x) => (x.id === id ? { ...x, ack: true } : x)));
  const clearAll = () => setAlerts((a) => a.map((x) => ({ ...x, ack: true })));

  const displayed = alerts.filter((a) => {
    if (filter === "all") return true;
    if (filter === "unread") return !a.ack;
    return a.severity === filter;
  });

  return (
    <div className={styles.root}>
      {/* Hero */}
      <header>
        <span className={styles.eye}>Monitoring · incidents & insights</span>
        <h1 className={styles.title}>
          What <em>needs</em> your eyes.
        </h1>
        <p className={styles.lead}>
          System events, anomalies, and AI recommendations — triaged by severity, quieter than a pager.
        </p>
      </header>

      {/* KPI strip */}
      <div className={styles.sectionHead} style={{ marginTop: 44 }}>
        <span className={styles.eye}>The mix · right now</span>
      </div>
      <div className={styles.statRow}>
        <div className={styles.statCell}>
          <div className={styles.statK}>Unread</div>
          <div className={styles.statN}>
            {unreadCount === 0 ? <em>0</em> : unreadCount}
          </div>
          <div className={`${styles.statTrend} ${unreadCount ? styles.statTrendWarn : styles.statTrendOk}`}>
            {unreadCount ? "Needs review" : "Inbox zero"}
          </div>
        </div>
        <div className={styles.statCell}>
          <div className={styles.statK}>Warnings</div>
          <div className={styles.statN}>{alerts.filter((a) => a.severity === "warning").length}</div>
          <div className={styles.statTrend}>Thresholds crossed</div>
        </div>
        <div className={styles.statCell}>
          <div className={styles.statK}>Errors</div>
          <div className={styles.statN}>{alerts.filter((a) => a.severity === "error").length}</div>
          <div className={styles.statTrend}>Hardware issues</div>
        </div>
        <div className={styles.statCell}>
          <div className={styles.statK}>Resolved</div>
          <div className={styles.statN}><em>{alerts.filter((a) => a.ack).length}</em></div>
          <div className={`${styles.statTrend} ${styles.statTrendOk}`}>Acked / auto-fixed</div>
        </div>
      </div>

      {/* Section head + clear all */}
      <div
        className={styles.sectionHead}
        style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}
      >
        <div>
          <span className={styles.eye}>The feed · newest first</span>
          <h2 className={styles.title} style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}>
            Everything that <em>happened</em>.
          </h2>
        </div>
        {unreadCount > 0 && (
          <button className={styles.btnGhost} onClick={clearAll}>
            <BellOff className="w-4 h-4" />
            Mark all read
          </button>
        )}
      </div>

      {/* Filter chips */}
      <div className={styles.filterBar} style={{ marginTop: 14 }}>
        <button className={`${styles.filterChip} ${filter === "all" ? styles.filterChipActive : ""}`} onClick={() => setFilter("all")}>
          All
        </button>
        <button className={`${styles.filterChip} ${filter === "unread" ? styles.filterChipActive : ""}`} onClick={() => setFilter("unread")}>
          Unread · {unreadCount}
        </button>
        {(["warning", "error", "success", "info"] as Severity[]).map((sev) => (
          <button
            key={sev}
            className={`${styles.filterChip} ${filter === sev ? styles.filterChipActive : ""}`}
            onClick={() => setFilter(sev)}
            style={filter === sev ? { color: severityMeta[sev].color, borderColor: severityMeta[sev].color } : undefined}
          >
            {severityMeta[sev].label}
          </button>
        ))}
      </div>

      {/* Alert list */}
      {displayed.length === 0 ? (
        <div className={styles.empty}>
          <Bell className="w-8 h-8" style={{ margin: "0 auto", display: "block" }} />
          <p>Nothing in this filter. All clear.</p>
        </div>
      ) : (
        <div className={styles.alertGroup}>
          {displayed.map((a) => {
            const meta = severityMeta[a.severity];
            const Icon = meta.Icon;
            return (
              <div
                key={a.id}
                className={`${styles.alertItem} ${a.ack ? "ack" : ""}`}
                style={{ ["--severity" as string]: meta.color }}
              >
                <span className={styles.alertIcon} style={{ background: `${meta.color}12`, borderColor: `${meta.color}40` }}>
                  <Icon className="w-4 h-4" style={{ color: meta.color }} />
                </span>
                <div>
                  <div
                    className={styles.mono}
                    style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: meta.color, marginBottom: 6 }}
                  >
                    {meta.label} · {a.source}
                  </div>
                  <h3 className={styles.alertTitle}>
                    {a.title}
                    {!a.ack && <span className={styles.unreadDot} />}
                  </h3>
                  <p className={styles.alertBody}>{a.message}</p>
                  <div className={styles.alertMeta}>{a.time}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {!a.ack ? (
                    <button className={styles.btnGhost} onClick={() => ackAlert(a.id)}>
                      Mark read
                    </button>
                  ) : (
                    <span
                      className={styles.mono}
                      style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#94a3b8" }}
                    >
                      Acknowledged
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ height: 64 }} />
    </div>
  );
}
