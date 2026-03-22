"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { AlertTriangle, CheckCircle, Info, XCircle, Bell, BellOff } from "lucide-react";

const allAlerts = [
  { id: 1, severity: "warning", title: "Zone B — Elevated Temperature", message: "SN-9023 reporting 28.5°C, above soft threshold of 27°C. No action required yet.", time: "2h ago", ack: false },
  { id: 2, severity: "info", title: "AI Optimization Applied", message: "Droplet AI reduced Zone A flow by 0.3 L/s. Estimated weekly savings: 1,200 gallons.", time: "4h ago", ack: true },
  { id: 3, severity: "success", title: "PUE Target Achieved", message: "System PUE reached 1.12 — surpassing the Q1 target ahead of schedule.", time: "1d ago", ack: true },
  { id: 4, severity: "error", title: "SN-9023 Connectivity Degraded", message: "Sensor SN-9023 in Zone B experiencing intermittent dropouts. Failover active.", time: "2d ago", ack: true },
  { id: 5, severity: "warning", title: "Pressure Spike — Zone C", message: "Pressure momentarily reached 4.8 bar before normalizing. Log retained.", time: "3d ago", ack: false },
  { id: 6, severity: "info", title: "Monthly Report Ready", message: "February 2026 Water Intelligence Report has been generated and is ready for download.", time: "4d ago", ack: true },
];

const icons = {
  warning: <AlertTriangle className="w-4 h-4 text-[#FFB020]" />,
  info: <Info className="w-4 h-4 text-[#00BFFF]" />,
  success: <CheckCircle className="w-4 h-4 text-[#00E5A0]" />,
  error: <XCircle className="w-4 h-4 text-[#FF4757]" />,
};

const borders = {
  warning: "border-l-[#FFB020]",
  info: "border-l-[#00BFFF]",
  success: "border-l-[#00E5A0]",
  error: "border-l-[#FF4757]",
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(allAlerts);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const ackAlert = (id: number) => setAlerts(a => a.map(x => x.id === id ? { ...x, ack: true } : x));
  const clearAll = () => setAlerts(a => a.map(x => ({ ...x, ack: true })));

  const displayed = filter === "unread" ? alerts.filter(a => !a.ack) : alerts;
  const unreadCount = alerts.filter(a => !a.ack).length;

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.25em] text-[#00BFFF] mb-1">Monitoring</p>
          <h1 className="text-3xl font-bold text-[#F0F4F8] font-[family-name:var(--font-syne)]">Alerts</h1>
          <p className="text-[#8B9DC3] text-sm mt-1">System events, anomalies, and AI recommendations.</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={clearAll} className="flex items-center gap-2 border border-white/[0.06] text-[#8B9DC3] hover:text-[#F0F4F8] px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
            <BellOff className="w-4 h-4" />
            Mark All Read
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Unread", value: String(unreadCount), color: "text-[#00BFFF]" },
          { label: "Warnings", value: String(alerts.filter(a => a.severity === "warning").length), color: "text-[#FFB020]" },
          { label: "Errors", value: String(alerts.filter(a => a.severity === "error").length), color: "text-[#FF4757]" },
          { label: "Resolved", value: String(alerts.filter(a => a.ack).length), color: "text-[#00E5A0]" },
        ].map(({ label, value, color }) => (
          <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-5 ">
            <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-widest text-[#4A5B78] mb-2">{label}</p>
            <p className={`text-2xl font-bold font-[family-name:var(--font-syne)] ${color}`}>{value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(["all", "unread"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-xs font-[family-name:var(--font-jetbrains)] uppercase tracking-wider transition-all ${filter === f
              ? "bg-[#00BFFF] text-white"
              : "bg-[#0D1424]/60 border border-white/[0.06] text-[#8B9DC3] hover:border-[#00BFFF] hover:text-[#00BFFF]"
              }`}>
            {f === "all" ? "All Alerts" : `Unread (${unreadCount})`}
          </button>
        ))}
      </div>

      {/* Alert list */}
      <div className="space-y-3">
        {displayed.length === 0 ? (
          <div className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-12 text-center">
            <Bell className="w-8 h-8 text-[#4A5B78] mx-auto mb-3" />
            <p className="text-[#8B9DC3] font-medium">No unread alerts</p>
          </div>
        ) : (
          displayed.map((alert, i) => (
            <motion.div key={alert.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
              className={`bg-[#0D1424]/60 rounded-2xl border-white/[0.06] border border-l-4 ${borders[alert.severity as keyof typeof borders]} p-5  flex items-start justify-between gap-4 ${alert.ack ? "opacity-60" : ""}`}>
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{icons[alert.severity as keyof typeof icons]}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-[#F0F4F8] text-sm">{alert.title}</p>
                    {!alert.ack && <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFF]" />}
                  </div>
                  <p className="text-xs text-[#8B9DC3] leading-relaxed">{alert.message}</p>
                  <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-widest text-[#4A5B78] mt-2">{alert.time}</p>
                </div>
              </div>
              {!alert.ack && (
                <button onClick={() => ackAlert(alert.id)}
                  className="shrink-0 text-xs font-[family-name:var(--font-jetbrains)] uppercase tracking-wider text-[#8B9DC3] hover:text-[#00BFFF] border border-white/[0.06] hover:border-[#00BFFF] px-3 py-1.5 rounded-lg transition-all whitespace-nowrap">
                  Mark Read
                </button>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
