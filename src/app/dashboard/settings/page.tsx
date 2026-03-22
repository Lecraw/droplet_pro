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
          <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.25em] text-[#00BFFF] mb-1">Configuration</p>
          <h1 className="text-3xl font-bold text-[#F0F4F8] font-[family-name:var(--font-syne)]">Settings</h1>
          <p className="text-[#8B9DC3] text-sm mt-1">Manage platform preferences, thresholds, and integrations.</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all  ${
            saved ? "bg-[#00E5A0] text-[#060B18]" : "bg-[#00BFFF] hover:bg-[#00D4FF] text-[#060B18]"
          }`}
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Profile */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}
          className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6 ">
          <div className="flex items-center gap-2 mb-5">
            <User className="w-4 h-4 text-[#00BFFF]" />
            <h2 className="text-sm font-bold text-[#F0F4F8] font-[family-name:var(--font-jetbrains)] uppercase tracking-wider">Account Profile</h2>
          </div>
          <div className="space-y-4">
            {[
              { label: "Full Name", key: "name", value: profile.name },
              { label: "Email", key: "email", value: profile.email },
              { label: "Organization", key: "org", value: profile.org },
            ].map(({ label, key, value }) => (
              <div key={key}>
                <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8B9DC3] mb-1.5 font-[family-name:var(--font-jetbrains)]">{label}</label>
                <input
                  value={value}
                  onChange={(e) => setProfile(p => ({ ...p, [key]: e.target.value }))}
                  className="w-full bg-[#060B18] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-[#F0F4F8] focus:outline-none focus:border-[#00BFFF] focus:ring-1 focus:ring-[#00BFFF] transition-all"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Alert Thresholds */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6 ">
          <div className="flex items-center gap-2 mb-5">
            <Shield className="w-4 h-4 text-[#00BFFF]" />
            <h2 className="text-sm font-bold text-[#F0F4F8] font-[family-name:var(--font-jetbrains)] uppercase tracking-wider">Alert Thresholds</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Flow Min (L/s)", key: "flowMin" },
              { label: "Flow Max (L/s)", key: "flowMax" },
              { label: "Temp Max (°C)", key: "tempMax" },
              { label: "Pressure Max (bar)", key: "pressureMax" },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8B9DC3] mb-1.5 font-[family-name:var(--font-jetbrains)]">{label}</label>
                <input
                  type="number"
                  value={thresholds[key as keyof typeof thresholds]}
                  onChange={(e) => setThresholds(t => ({ ...t, [key]: e.target.value }))}
                  className="w-full bg-[#060B18] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-[#F0F4F8] focus:outline-none focus:border-[#00BFFF] focus:ring-1 focus:ring-[#00BFFF] transition-all font-[family-name:var(--font-jetbrains)]"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Notification Channels */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6 ">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="w-4 h-4 text-[#00BFFF]" />
            <h2 className="text-sm font-bold text-[#F0F4F8] font-[family-name:var(--font-jetbrains)] uppercase tracking-wider">Notification Channels</h2>
          </div>
          <div className="space-y-3">
            {(["email", "sms", "slack"] as const).map((channel) => (
              <div key={channel} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                <div>
                  <p className="text-sm font-medium text-[#F0F4F8] capitalize">{channel}</p>
                  <p className="text-xs text-[#4A5B78] font-[family-name:var(--font-jetbrains)]">
                    {channel === "email" ? "admin@hyperscale.inc" : channel === "sms" ? "+1 (555) 000-0000" : "#droplet-alerts"}
                  </p>
                </div>
                <button
                  onClick={() => setAlerts(a => ({ ...a, [channel]: !a[channel] }))}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${alerts[channel] ? "bg-[#00BFFF]" : "bg-white/[0.1]"}`}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${alerts[channel] ? "translate-x-4.5" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Integration */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6 ">
          <div className="flex items-center gap-2 mb-5">
            <Wifi className="w-4 h-4 text-[#00BFFF]" />
            <h2 className="text-sm font-bold text-[#F0F4F8] font-[family-name:var(--font-jetbrains)] uppercase tracking-wider">Integrations</h2>
          </div>
          <div className="space-y-3">
            {[
              { name: "Prometheus Metrics", status: "Connected", dot: "bg-[#00E5A0]" },
              { name: "Grafana Dashboard", status: "Connected", dot: "bg-[#00E5A0]" },
              { name: "PagerDuty Alerts", status: "Disconnected", dot: "bg-white/[0.1]" },
              { name: "AWS CloudWatch", status: "Connected", dot: "bg-[#00E5A0]" },
            ].map(({ name, status, dot }) => (
              <div key={name} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${dot}`} />
                  <span className="text-sm text-[#F0F4F8] font-medium">{name}</span>
                </div>
                <button className={`text-xs font-[family-name:var(--font-jetbrains)] uppercase tracking-wider px-3 py-1 rounded-md border transition-colors ${
                  status === "Connected"
                    ? "border-[#00E5A0]/20 text-[#00E5A0] hover:bg-[#00E5A0]/10"
                    : "border-white/[0.06] text-[#8B9DC3] hover:border-[#00BFFF] hover:text-[#00BFFF]"
                }`}>
                  {status === "Connected" ? "Manage" : "Connect"}
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* API Keys */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6  lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-[#00BFFF]" />
              <h2 className="text-sm font-bold text-[#F0F4F8] font-[family-name:var(--font-jetbrains)] uppercase tracking-wider">API Keys</h2>
            </div>
            <button className="text-xs font-[family-name:var(--font-jetbrains)] uppercase tracking-wider px-4 py-2 rounded-lg border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF]/5 transition-colors">
              Generate New Key
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Name", "Key", "Created", "Last Used", "Actions"].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-widest text-[#4A5B78]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Production", key: "drp_live_••••••••••••4f2a", created: "Jan 12, 2026", last: "2 hours ago" },
                  { name: "Staging", key: "drp_test_••••••••••••9c1b", created: "Feb 03, 2026", last: "1 day ago" },
                ].map((row) => (
                  <tr key={row.name} className="border-b border-white/[0.04] last:border-0 hover:bg-[#060B18]">
                    <td className="px-4 py-3 font-medium text-[#F0F4F8]">{row.name}</td>
                    <td className="px-4 py-3 font-[family-name:var(--font-jetbrains)] text-xs text-[#8B9DC3] bg-[#060B18] rounded">{row.key}</td>
                    <td className="px-4 py-3 text-[#8B9DC3] text-xs">{row.created}</td>
                    <td className="px-4 py-3 text-[#8B9DC3] text-xs">{row.last}</td>
                    <td className="px-4 py-3">
                      <button className="text-xs text-[#FF4757]/70 hover:text-[#FF4757] font-[family-name:var(--font-jetbrains)] uppercase tracking-wider transition-colors">Revoke</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Data Retention */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] p-6  lg:col-span-2">
          <div className="flex items-center gap-2 mb-5">
            <Database className="w-4 h-4 text-[#00BFFF]" />
            <h2 className="text-sm font-bold text-[#F0F4F8] font-[family-name:var(--font-jetbrains)] uppercase tracking-wider">Data Retention</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Raw Telemetry", value: "90 days", sub: "High-resolution sensor data" },
              { label: "Aggregated Stats", value: "2 years", sub: "Hourly / daily rollups" },
              { label: "Audit Logs", value: "5 years", sub: "Compliance & access logs" },
            ].map(({ label, value, sub }) => (
              <div key={label} className="p-4 bg-[#060B18] border border-white/[0.06] rounded-xl">
                <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-widest text-[#4A5B78] mb-1">{label}</p>
                <p className="text-xl font-bold text-[#F0F4F8] font-[family-name:var(--font-syne)]">{value}</p>
                <p className="text-xs text-[#8B9DC3] mt-1">{sub}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
