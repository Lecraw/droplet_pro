"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Bell, Shield, Database, Wifi, User, Key } from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [alerts, setAlerts] = useState({ email: true, sms: false, slack: true });
  const [thresholds, setThresholds] = useState({ flowMin: "1.5", flowMax: "10.0", tempMax: "35", pressureMax: "5.0" });
  const [profile, setProfile] = useState({ name: "Admin", email: "admin@hyperscale.inc", org: "Hyperscale Inc." });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.25em] text-[#0066FF] mb-1">Configuration</p>
          <h1 className="text-3xl font-bold text-[#0F172A] font-[family-name:var(--font-display)]">Settings</h1>
          <p className="text-[#64748B] text-sm mt-1">Manage platform preferences, thresholds, and integrations.</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm ${
            saved ? "bg-emerald-500 text-white" : "bg-[#0066FF] hover:bg-[#0052CC] text-white"
          }`}
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Profile */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}
          className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <User className="w-4 h-4 text-[#0066FF]" />
            <h2 className="text-sm font-bold text-[#0F172A] font-[family-name:var(--font-mono)] uppercase tracking-wider">Account Profile</h2>
          </div>
          <div className="space-y-4">
            {[
              { label: "Full Name", key: "name", value: profile.name },
              { label: "Email", key: "email", value: profile.email },
              { label: "Organization", key: "org", value: profile.org },
            ].map(({ label, key, value }) => (
              <div key={key}>
                <label className="block text-[9px] uppercase tracking-[0.2em] text-[#64748B] mb-1.5 font-[family-name:var(--font-mono)]">{label}</label>
                <input
                  value={value}
                  onChange={(e) => setProfile(p => ({ ...p, [key]: e.target.value }))}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Alert Thresholds */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Shield className="w-4 h-4 text-[#0066FF]" />
            <h2 className="text-sm font-bold text-[#0F172A] font-[family-name:var(--font-mono)] uppercase tracking-wider">Alert Thresholds</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Flow Min (L/s)", key: "flowMin" },
              { label: "Flow Max (L/s)", key: "flowMax" },
              { label: "Temp Max (°C)", key: "tempMax" },
              { label: "Pressure Max (bar)", key: "pressureMax" },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="block text-[9px] uppercase tracking-[0.2em] text-[#64748B] mb-1.5 font-[family-name:var(--font-mono)]">{label}</label>
                <input
                  type="number"
                  value={thresholds[key as keyof typeof thresholds]}
                  onChange={(e) => setThresholds(t => ({ ...t, [key]: e.target.value }))}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all font-[family-name:var(--font-mono)]"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Notification Channels */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="w-4 h-4 text-[#0066FF]" />
            <h2 className="text-sm font-bold text-[#0F172A] font-[family-name:var(--font-mono)] uppercase tracking-wider">Notification Channels</h2>
          </div>
          <div className="space-y-3">
            {(["email", "sms", "slack"] as const).map((channel) => (
              <div key={channel} className="flex items-center justify-between py-3 border-b border-[#F0F4F8] last:border-0">
                <div>
                  <p className="text-sm font-medium text-[#0F172A] capitalize">{channel}</p>
                  <p className="text-xs text-[#94A3B8] font-[family-name:var(--font-mono)]">
                    {channel === "email" ? "admin@hyperscale.inc" : channel === "sms" ? "+1 (555) 000-0000" : "#droplet-alerts"}
                  </p>
                </div>
                <button
                  onClick={() => setAlerts(a => ({ ...a, [channel]: !a[channel] }))}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${alerts[channel] ? "bg-[#0066FF]" : "bg-[#E2E8F0]"}`}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${alerts[channel] ? "translate-x-4.5" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Integration */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Wifi className="w-4 h-4 text-[#0066FF]" />
            <h2 className="text-sm font-bold text-[#0F172A] font-[family-name:var(--font-mono)] uppercase tracking-wider">Integrations</h2>
          </div>
          <div className="space-y-3">
            {[
              { name: "Prometheus Metrics", status: "Connected", dot: "bg-emerald-500" },
              { name: "Grafana Dashboard", status: "Connected", dot: "bg-emerald-500" },
              { name: "PagerDuty Alerts", status: "Disconnected", dot: "bg-[#E2E8F0]" },
              { name: "AWS CloudWatch", status: "Connected", dot: "bg-emerald-500" },
            ].map(({ name, status, dot }) => (
              <div key={name} className="flex items-center justify-between py-3 border-b border-[#F0F4F8] last:border-0">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${dot}`} />
                  <span className="text-sm text-[#0F172A] font-medium">{name}</span>
                </div>
                <button className={`text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider px-3 py-1 rounded-md border transition-colors ${
                  status === "Connected"
                    ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    : "border-[#E2E8F0] text-[#64748B] hover:border-[#0066FF] hover:text-[#0066FF]"
                }`}>
                  {status === "Connected" ? "Manage" : "Connect"}
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* API Keys */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-[#0066FF]" />
              <h2 className="text-sm font-bold text-[#0F172A] font-[family-name:var(--font-mono)] uppercase tracking-wider">API Keys</h2>
            </div>
            <button className="text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider px-4 py-2 rounded-lg border border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF]/5 transition-colors">
              Generate New Key
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E2E8F0]">
                  {["Name", "Key", "Created", "Last Used", "Actions"].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Production", key: "drp_live_••••••••••••4f2a", created: "Jan 12, 2026", last: "2 hours ago" },
                  { name: "Staging", key: "drp_test_••••••••••••9c1b", created: "Feb 03, 2026", last: "1 day ago" },
                ].map((row) => (
                  <tr key={row.name} className="border-b border-[#F0F4F8] last:border-0 hover:bg-[#F8FAFC]">
                    <td className="px-4 py-3 font-medium text-[#0F172A]">{row.name}</td>
                    <td className="px-4 py-3 font-[family-name:var(--font-mono)] text-xs text-[#64748B] bg-[#F8FAFC] rounded">{row.key}</td>
                    <td className="px-4 py-3 text-[#64748B] text-xs">{row.created}</td>
                    <td className="px-4 py-3 text-[#64748B] text-xs">{row.last}</td>
                    <td className="px-4 py-3">
                      <button className="text-xs text-red-400 hover:text-red-600 font-[family-name:var(--font-mono)] uppercase tracking-wider transition-colors">Revoke</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Data Retention */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-2 mb-5">
            <Database className="w-4 h-4 text-[#0066FF]" />
            <h2 className="text-sm font-bold text-[#0F172A] font-[family-name:var(--font-mono)] uppercase tracking-wider">Data Retention</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Raw Telemetry", value: "90 days", sub: "High-resolution sensor data" },
              { label: "Aggregated Stats", value: "2 years", sub: "Hourly / daily rollups" },
              { label: "Audit Logs", value: "5 years", sub: "Compliance & access logs" },
            ].map(({ label, value, sub }) => (
              <div key={label} className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-1">{label}</p>
                <p className="text-xl font-bold text-[#0F172A] font-[family-name:var(--font-display)]">{value}</p>
                <p className="text-xs text-[#64748B] mt-1">{sub}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
