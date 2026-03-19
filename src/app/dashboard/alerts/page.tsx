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
  warning: <AlertTriangle className="w-4 h-4 text-amber-500" />,
  info: <Info className="w-4 h-4 text-blue-400" />,
  success: <CheckCircle className="w-4 h-4 text-emerald-500" />,
  error: <XCircle className="w-4 h-4 text-red-500" />,
};

const borders = {
  warning: "border-l-amber-400",
  info: "border-l-blue-300",
  success: "border-l-emerald-400",
  error: "border-l-red-400",
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
          <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.25em] text-[#0066FF] mb-1">Monitoring</p>
          <h1 className="text-3xl font-bold text-[#0F172A] font-[family-name:var(--font-display)]">Alerts</h1>
          <p className="text-[#64748B] text-sm mt-1">System events, anomalies, and AI recommendations.</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={clearAll} className="flex items-center gap-2 border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
            <BellOff className="w-4 h-4" />
            Mark All Read
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Unread", value: String(unreadCount), color: "text-[#0066FF]" },
          { label: "Warnings", value: String(alerts.filter(a => a.severity === "warning").length), color: "text-amber-500" },
          { label: "Errors", value: String(alerts.filter(a => a.severity === "error").length), color: "text-red-500" },
          { label: "Resolved", value: String(alerts.filter(a => a.ack).length), color: "text-emerald-500" },
        ].map(({ label, value, color }) => (
          <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm">
            <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-2">{label}</p>
            <p className={`text-2xl font-bold font-[family-name:var(--font-display)] ${color}`}>{value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(["all", "unread"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider transition-all ${
              filter === f
                ? "bg-[#0066FF] text-white"
                : "bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#0066FF] hover:text-[#0066FF]"
            }`}>
            {f === "all" ? "All Alerts" : `Unread (${unreadCount})`}
          </button>
        ))}
      </div>

      {/* Alert list */}
      <div className="space-y-3">
        {displayed.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center">
            <Bell className="w-8 h-8 text-[#94A3B8] mx-auto mb-3" />
            <p className="text-[#64748B] font-medium">No unread alerts</p>
          </div>
        ) : (
          displayed.map((alert, i) => (
            <motion.div key={alert.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
              className={`bg-white rounded-2xl border-[#E2E8F0] border border-l-4 ${borders[alert.severity]} p-5 shadow-sm flex items-start justify-between gap-4 ${alert.ack ? "opacity-60" : ""}`}>
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{icons[alert.severity]}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-[#0F172A] text-sm">{alert.title}</p>
                    {!alert.ack && <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />}
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">{alert.message}</p>
                  <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mt-2">{alert.time}</p>
                </div>
              </div>
              {!alert.ack && (
                <button onClick={() => ackAlert(alert.id)}
                  className="shrink-0 text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider text-[#64748B] hover:text-[#0066FF] border border-[#E2E8F0] hover:border-[#0066FF] px-3 py-1.5 rounded-lg transition-all whitespace-nowrap">
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
