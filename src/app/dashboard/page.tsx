"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./dashboard.module.css";

const flowData = [
  { time: "00:00", flow: 4.2 }, { time: "02:00", flow: 3.9 },
  { time: "04:00", flow: 3.8 }, { time: "06:00", flow: 4.1 },
  { time: "08:00", flow: 4.5 }, { time: "10:00", flow: 4.9 },
  { time: "12:00", flow: 5.1 }, { time: "14:00", flow: 5.3 },
  { time: "16:00", flow: 4.8 }, { time: "18:00", flow: 4.6 },
  { time: "20:00", flow: 4.0 }, { time: "22:00", flow: 4.2 },
  { time: "24:00", flow: 4.2 },
];

const efficiencyData = [
  { day: "Mon", pue: 1.14 }, { day: "Tue", pue: 1.13 },
  { day: "Wed", pue: 1.15 }, { day: "Thu", pue: 1.12 },
  { day: "Fri", pue: 1.12 }, { day: "Sat", pue: 1.11 },
  { day: "Sun", pue: 1.12 },
];

const zones = [
  { id: "A", name: "Aisle A · Compute", flow: 4.2, temp: 22.1, pue: 1.11, status: "online" as const, trend: [0.5, 0.55, 0.52, 0.58, 0.6, 0.57, 0.6] },
  { id: "B", name: "Aisle B · AI Cluster", flow: 1.2, temp: 28.5, pue: 1.21, status: "warn" as const,   trend: [0.8, 0.7, 0.65, 0.5, 0.4, 0.3, 0.25] },
  { id: "C", name: "Aisle C · Storage", flow: 8.5, temp: 25.0, pue: 1.14, status: "online" as const, trend: [0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7] },
  { id: "D", name: "Aisle D · Networking", flow: 2.1, temp: 21.8, pue: 1.09, status: "online" as const, trend: [0.55, 0.5, 0.52, 0.56, 0.54, 0.52, 0.5] },
  { id: "E", name: "Aisle E · Cold Row", flow: 3.0, temp: 20.5, pue: 1.08, status: "online" as const, trend: [0.4, 0.42, 0.44, 0.46, 0.48, 0.5, 0.5] },
  { id: "F", name: "Aisle F · Blowdown", flow: 0.0, temp: 18.2, pue: 0.00, status: "offline" as const, trend: [0.6, 0.5, 0.45, 0.3, 0.2, 0.1, 0.0] },
];

const recentEvents = [
  { time: "14:22", type: "ai" as const,   body: <><strong>Zone A flow reduced 0.3 L/s</strong> — thermal headroom detected, savings logged.</> },
  { time: "12:05", type: "info" as const, body: <><strong>SN-9024 telemetry batch synced</strong> — 1,240 data points archived.</> },
  { time: "09:41", type: "warn" as const, body: <><strong>SN-9023 temperature elevated</strong> (28.5°C). Expected flow restore at 15:00.</> },
  { time: "08:00", type: "ok" as const,   body: <><strong>Daily system health check passed</strong> — all nodes nominal.</> },
  { time: "03:15", type: "ai" as const,   body: <><strong>Micro cooling loop efficiency +2.1%</strong> across Zone C after valve tune.</> },
];

const aiSuggestions = [
  "Why is Zone B temperature high?",
  "How much water have we saved this month?",
  "Which sensors need maintenance?",
  "What's the projected savings for Q2?",
];

/* Mini sparkline component (thin cyan line, no axes) */
function Spark({ points, color = "#00a6e0" }: { points: number[]; color?: string }) {
  const w = 72, h = 22;
  const step = w / (points.length - 1);
  const d = points
    .map((v, i) => `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)} ${(h - v * h + 2).toFixed(1)}`)
    .join(" ");
  return (
    <svg className={styles.zSpark} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <path d={d} fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Radial zone map — concentric rings, each showing zone efficiency arc */
function RadialZoneMap() {
  const size = 300;
  const cx = size / 2, cy = size / 2;
  const ringCount = zones.length;
  const inner = 34, outer = 138;
  const ringStep = (outer - inner) / ringCount;
  const palette = [
    "#00a6e0", "#f59e0b", "#51d8ff", "#10b981", "#7cc3e8", "#94a3b8",
  ];
  return (
    <svg className={styles.radialSvg} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <radialGradient id="ringCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e6f5ff" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#b2dff5" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#5aade0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={inner - 6} fill="url(#ringCenter)" />
      <circle cx={cx} cy={cy} r={inner - 6} fill="none" stroke="#1a6ea8" strokeOpacity="0.2" strokeWidth="0.8" />

      {zones.map((z, i) => {
        const r = inner + (i + 0.5) * ringStep;
        const efficiency = z.status === "offline" ? 0 : Math.max(0, Math.min(1, (2 - z.pue) / 0.92));
        const arc = efficiency * 2 * Math.PI * 0.82; // leave a gap
        const start = -Math.PI / 2;
        const end = start + arc;
        const sx = cx + r * Math.cos(start);
        const sy = cy + r * Math.sin(start);
        const ex = cx + r * Math.cos(end);
        const ey = cy + r * Math.sin(end);
        const large = arc > Math.PI ? 1 : 0;
        const color = palette[i % palette.length];
        return (
          <g key={z.id}>
            {/* faint full ring */}
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="1" />
            {/* efficiency arc */}
            {efficiency > 0 && (
              <path
                d={`M ${sx.toFixed(2)} ${sy.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`}
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            )}
            {/* zone label dot */}
            <circle cx={ex} cy={ey} r="3" fill={color} />
          </g>
        );
      })}
    </svg>
  );
}

/* Semi-circle dial gauge */
function Dial({ value, max, color = "#00a6e0" }: { value: number; max: number; color?: string }) {
  const pct = Math.max(0, Math.min(1, value / max));
  const r = 38;
  const cx = 46, cy = 46;
  const start = Math.PI;
  const end = start + pct * Math.PI;
  const sx = cx + r * Math.cos(start), sy = cy + r * Math.sin(start);
  const ex = cx + r * Math.cos(end), ey = cy + r * Math.sin(end);
  return (
    <svg className={styles.dialSvg} viewBox="0 0 92 56">
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
      <path d={`M ${sx} ${sy} A ${r} ${r} 0 0 1 ${ex} ${ey}`} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <circle cx={ex} cy={ey} r="3" fill="#fff" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

export default function DashboardOverview() {
  const [aiQuery, setAiQuery] = useState("");
  const [response, setResponse] = useState<{ q: string; a: string } | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  const handleAiSubmit = () => {
    if (!aiQuery.trim() || isThinking) return;
    const question = aiQuery.trim();
    setAiQuery("");
    setIsThinking(true);
    setResponse({ q: question, a: "" });
    setTimeout(() => {
      const responses: Record<string, string> = {
        flow: "Zone B is flowing 1.2 L/s versus the 4.0 L/s baseline — a 70% drop. SN-9023 and SN-9029 are the likely culprits; restoring them would add ~18% thermal headroom across the aisle.",
        maintenance: "Three sensors need attention this week: SN-9023 (elevated temperature, Zone B), SN-9029 (low flow, Zone B distribution), and SN-9034 (offline, Zone F blowdown valve). Schedule within 48 hours to protect PUE.",
        savings: "You've saved 128,000 gallons this month — a 34% reduction versus the pre-Droplet baseline. Extrapolated, that puts you on track for ~400,000 gal by month-end. Zone C contributed the most.",
        temperature: "Zone B is running at 28.5°C because SN-9029 is only delivering 0.8 L/s. Restoring the distribution valve will push temperatures back into the 20–25°C band; no other zones are flagged.",
        q2:        "Projected Q2 savings, assuming current flow trajectories and a single Zone B valve fix: 1.21M gallons. That's $14,200 in water-and-sewer avoided, plus a 4.2% PUE improvement over Q1.",
      };
      const key = Object.keys(responses).find((k) => question.toLowerCase().includes(k));
      const answer = key
        ? responses[key]
        : "All 16 nodes are reporting. System efficiency sits at 94%, PUE at 1.12. The highest-leverage action right now is restoring Zone B flow — worth roughly 4,200 gal/week on its own.";
      setResponse({ q: question, a: answer });
      setIsThinking(false);
    }, 1100);
  };

  return (
    <div className={styles.root}>
      {/* ─── Hero ─── */}
      <header>
        <span className={styles.eye}>Live · all 16 nodes reporting</span>
        <h1 className={styles.title}>
          System at a <em>glance</em>.
        </h1>
        <p className={styles.lead}>
          Real-time telemetry across six aisles. Flow, temperature, and pressure sampled every 200ms,
          analyzed on-device, surfaced here.
        </p>
      </header>

      {/* ─── Hairline stat strip ─── */}
      <div className={styles.sectionHead} style={{ marginTop: 44 }}>
        <span className={styles.eye}>Right now</span>
      </div>
      <div className={styles.statRow}>
        <div className={styles.statCell}>
          <div className={styles.statK}>Active nodes</div>
          <div className={styles.statN}>16<span>/ 18</span></div>
          <div className={`${styles.statTrend} ${styles.statTrendOk}`}>+4 this week</div>
        </div>
        <div className={styles.statCell}>
          <div className={styles.statK}>Water saved · MTD</div>
          <div className={styles.statN}>128<span>K gal</span></div>
          <div className={`${styles.statTrend} ${styles.statTrendOk}`}>On track for 400K</div>
        </div>
        <div className={styles.statCell}>
          <div className={styles.statK}>Flow · total</div>
          <div className={styles.statN}><em>4.2</em><span>L/s</span></div>
          <div className={`${styles.statTrend} ${styles.statTrendOk}`}>−12% vs baseline</div>
        </div>
        <div className={styles.statCell}>
          <div className={styles.statK}>Current PUE</div>
          <div className={styles.statN}>1.12</div>
          <div className={`${styles.statTrend} ${styles.statTrendWarn}`}>Target 1.10</div>
        </div>
      </div>

      {/* ─── Hero flow chart ─── */}
      <div className={styles.sectionHead}>
        <span className={styles.eye}>Live telemetry · 24 hours</span>
        <h2 className={styles.title} style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}>
          Flow is <em>steady</em>.
        </h2>
      </div>
      <div className={styles.chartPanel}>
        <div className={styles.chartHead}>
          <span className={styles.eye} style={{ marginBottom: 0 }}>Flow rate · all zones</span>
          <span className={styles.chartVal}>
            4.2<em>L/s current</em>
          </span>
        </div>
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={flowData} margin={{ top: 4, left: -10, right: 4, bottom: 0 }}>
              <defs>
                <linearGradient id="flowArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#51d8ff" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#51d8ff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} interval={2} />
              <YAxis domain={[3, 6]} tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.95)",
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                  color: "#0a1628",
                  boxShadow: "0 10px 30px rgba(0,90,170,0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="flow"
                stroke="#00a6e0"
                strokeWidth={1.6}
                fill="url(#flowArea)"
                dot={false}
                activeDot={{ r: 4, fill: "#00a6e0", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ─── Zone map + legend (radial) ─── */}
      <div className={styles.sectionHead}>
        <span className={styles.eye}>Zones · cooling at work</span>
        <h2 className={styles.title} style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}>
          Six aisles, <em>right-sized</em>.
        </h2>
      </div>
      <div className={styles.radialWrap}>
        <RadialZoneMap />
        <div className={styles.radialLegend}>
          {zones.map((z, i) => {
            const color = ["#00a6e0", "#f59e0b", "#51d8ff", "#10b981", "#7cc3e8", "#94a3b8"][i % 6];
            return (
              <div key={z.id} className={styles.radialLegendRow}>
                <span className={styles.dot} style={{ background: color }} />
                <span className={styles.name}>{z.name}</span>
                <span className={styles.val}>{z.status === "offline" ? "—" : z.pue.toFixed(2)}</span>
                <span className={styles.unit}>PUE</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Zones table ─── */}
      <div className={styles.sectionHead} style={{ marginTop: 44 }}>
        <span className={styles.eye}>By zone</span>
      </div>
      <table className={styles.zonesTable}>
        <thead>
          <tr>
            <th style={{ width: "28%" }}>Zone</th>
            <th>Flow</th>
            <th>Temp</th>
            <th>PUE</th>
            <th>7-day flow</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {zones.map((z) => {
            const sparkColor =
              z.status === "offline" ? "#94a3b8" : z.status === "warn" ? "#f59e0b" : "#00a6e0";
            return (
              <tr key={z.id}>
                <td className={styles.zName}>{z.name}</td>
                <td className={styles.zNum}>{z.flow.toFixed(1)} L/s</td>
                <td className={styles.zNum}>{z.temp.toFixed(1)}°C</td>
                <td className={styles.zNum}>{z.status === "offline" ? "—" : z.pue.toFixed(2)}</td>
                <td><Spark points={z.trend} color={sparkColor} /></td>
                <td>
                  <span className={`${styles.statusDot} ${
                    z.status === "online" ? styles.statusOnline
                    : z.status === "warn" ? styles.statusWarn
                    : styles.statusOffline
                  }`} />
                  <span className={styles.mono} style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#64748b" }}>
                    {z.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* ─── PUE Trend + Dials row ─── */}
      <div className={styles.sectionHead}>
        <span className={styles.eye}>Efficiency · this week</span>
        <h2 className={styles.title} style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}>
          PUE is <em>holding</em>.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 28, alignItems: "stretch" }}>
        <div className={styles.chartPanel}>
          <div className={styles.chartHead}>
            <span className={styles.eye} style={{ marginBottom: 0 }}>PUE · 7-day</span>
            <span className={styles.chartVal}><em style={{ fontStyle: "italic", color: "#00a6e0" }}>1.12</em></span>
          </div>
          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={efficiencyData} margin={{ top: 4, left: -10, right: 4, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis domain={[1.08, 1.18]} tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.95)",
                    border: "1px solid #e2e8f0",
                    fontSize: 12,
                    color: "#0a1628",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="pue"
                  stroke="#00a6e0"
                  strokeWidth={1.8}
                  dot={{ r: 3.5, fill: "#fff", stroke: "#00a6e0", strokeWidth: 1.6 }}
                  activeDot={{ r: 5, fill: "#00a6e0", stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartPanel} style={{ display: "flex", flexDirection: "column", gap: 22, justifyContent: "center" }}>
          <div className={styles.dialWrap}>
            <Dial value={3.2} max={5} color="#00a6e0" />
            <div>
              <div className={styles.dialVal}>3.2<span>bar</span></div>
              <div className={styles.dialLbl}>Avg pressure</div>
            </div>
          </div>
          <hr className={styles.divider} />
          <div className={styles.dialWrap}>
            <Dial value={23.8} max={40} color="#f59e0b" />
            <div>
              <div className={styles.dialVal}>23.8<span>°C</span></div>
              <div className={styles.dialLbl}>Avg temp</div>
            </div>
          </div>
          <hr className={styles.divider} />
          <div className={styles.dialWrap}>
            <Dial value={94} max={100} color="#10b981" />
            <div>
              <div className={styles.dialVal}>94<span>%</span></div>
              <div className={styles.dialLbl}>AI efficiency</div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Activity timeline ─── */}
      <div className={styles.sectionHead}>
        <span className={styles.eye}>Activity</span>
        <h2 className={styles.title} style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}>
          What <em>just</em> happened.
        </h2>
      </div>
      <div className={styles.timeline}>
        {recentEvents.map((e, i) => (
          <div
            key={i}
            className={`${styles.timelineItem} ${
              e.type === "warn" ? styles.typeWarn : e.type === "ok" ? styles.typeOk : e.type === "info" ? styles.typeInfo : ""
            }`}
          >
            <span className={styles.timelineTime}>{e.time}</span>
            <span className={styles.timelineBody}>{e.body}</span>
          </div>
        ))}
      </div>

      {/* ─── Ask Droplet AI ─── */}
      <div className={styles.sectionHead}>
        <span className={styles.eye}>Ask Droplet AI</span>
        <h2 className={styles.title} style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}>
          Ask <em>anything</em>.
        </h2>
      </div>
      <div className={styles.askRow}>
        <span className={styles.askLabel}>Query</span>
        <input
          type="text"
          className={styles.askInput}
          value={aiQuery}
          onChange={(e) => setAiQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAiSubmit()}
          placeholder="Why is Zone B temperature high?"
        />
        <button
          className={styles.askSubmit}
          onClick={handleAiSubmit}
          disabled={!aiQuery.trim() || isThinking}
        >
          Ask →
        </button>
      </div>
      <div className={styles.suggestionRow}>
        {aiSuggestions.map((s) => (
          <button key={s} className={styles.suggestion} onClick={() => { setAiQuery(s); }}>
            {s}
          </button>
        ))}
      </div>

      {response && (
        <div className={styles.response}>
          <span className={styles.q}>You asked</span>
          <div>
            <p className={styles.user} style={{ margin: 0 }}>{response.q}</p>
            <p className={styles.a} style={{ marginTop: 14 }}>
              {isThinking ? (
                <span className={styles.thinking}><span /><span /><span /></span>
              ) : response.a}
            </p>
          </div>
        </div>
      )}

      <div style={{ height: 64 }} />
    </div>
  );
}
