"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import styles from "../dashboard.module.css";

type Status = "Online" | "Warning" | "Offline";

const initialSensors: {
  id: string; location: string; zone: string; status: Status;
  flow: number; temp: number | null; pressure: number;
}[] = [
  { id: "SN-9021", location: "Primary Inlet",          zone: "A", status: "Online",  flow: 4.2, temp: 22.1, pressure: 3.1 },
  { id: "SN-9022", location: "Secondary",              zone: "A", status: "Online",  flow: 3.8, temp: 23.4, pressure: 3.0 },
  { id: "SN-9023", location: "Return",                 zone: "B", status: "Warning", flow: 1.2, temp: 28.5, pressure: 2.4 },
  { id: "SN-9024", location: "Core AI Cluster",        zone: "C", status: "Online",  flow: 8.5, temp: 25.0, pressure: 3.8 },
  { id: "SN-9025", location: "GPU Rack East",          zone: "C", status: "Online",  flow: 7.1, temp: 26.2, pressure: 3.6 },
  { id: "SN-9026", location: "Chiller Intake",         zone: "D", status: "Online",  flow: 2.1, temp: 21.8, pressure: 3.3 },
  { id: "SN-9027", location: "Chiller Return",         zone: "D", status: "Online",  flow: 2.0, temp: 24.5, pressure: 3.2 },
  { id: "SN-9028", location: "Roof Condenser",         zone: "A", status: "Online",  flow: 5.6, temp: 19.8, pressure: 3.5 },
  { id: "SN-9029", location: "Distribution Header",    zone: "B", status: "Warning", flow: 0.8, temp: 29.1, pressure: 2.1 },
  { id: "SN-9030", location: "Storage Tank Inlet",     zone: "E", status: "Online",  flow: 3.4, temp: 20.5, pressure: 2.9 },
  { id: "SN-9031", location: "Storage Tank Outlet",    zone: "E", status: "Online",  flow: 3.3, temp: 20.8, pressure: 2.8 },
  { id: "SN-9032", location: "GPU Rack West",          zone: "C", status: "Online",  flow: 6.9, temp: 25.8, pressure: 3.7 },
  { id: "SN-9033", location: "Makeup Water Line",      zone: "F", status: "Online",  flow: 1.5, temp: 18.2, pressure: 4.1 },
  { id: "SN-9034", location: "Blowdown Valve",         zone: "F", status: "Offline", flow: 0.0, temp: null, pressure: 0.0 },
  { id: "SN-9035", location: "Bypass Loop",            zone: "A", status: "Online",  flow: 2.8, temp: 22.9, pressure: 3.0 },
  { id: "SN-9036", location: "Heat Exchanger",         zone: "D", status: "Online",  flow: 4.4, temp: 27.3, pressure: 3.4 },
];

/* Tiny live pulse — dot + mono label */
function StatusPulse({ status }: { status: Status }) {
  const cls =
    status === "Online" ? styles.statusOnline :
    status === "Warning" ? styles.statusWarn :
    styles.statusOffline;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <span className={`${styles.statusDot} ${cls}`} style={{ margin: 0 }} />
      <span
        className={styles.mono}
        style={{ fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "#64748b" }}
      >
        {status}
      </span>
    </span>
  );
}

/* Network map — 16 dots arranged in concentric hex-ish ring */
function NodeConstellation({ sensors }: { sensors: typeof initialSensors }) {
  const size = 360;
  const cx = size / 2, cy = size / 2;
  const rings = [0, 62, 118, 168];
  const layout: { x: number; y: number }[] = [];
  // place nodes by ring; node index maps by position in list
  let idx = 0;
  const perRing = [1, 5, 6, 4]; // 1 center + 5 + 6 + 4 = 16
  for (let r = 0; r < rings.length; r++) {
    const count = perRing[r];
    const radius = rings[r];
    for (let i = 0; i < count; i++) {
      if (radius === 0) { layout.push({ x: cx, y: cy }); continue; }
      const a = (i / count) * Math.PI * 2 - Math.PI / 2 + (r % 2 ? Math.PI / count : 0);
      layout.push({ x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) });
    }
    if (layout.length >= sensors.length) break;
  }
  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="nodeCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e6f5ff" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#b2dff5" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#5aade0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={26} fill="url(#nodeCenter)" />
      {rings.slice(1).map((r, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 4" />
      ))}
      {sensors.slice(0, layout.length).map((s, i) => {
        const { x, y } = layout[i];
        const color = s.status === "Online" ? "#00a6e0" : s.status === "Warning" ? "#f59e0b" : "#94a3b8";
        return (
          <g key={s.id}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke="#e2e8f0" strokeWidth="0.6" opacity={s.status === "Offline" ? 0.3 : 0.6} />
            <circle cx={x} cy={y} r="6" fill={color} opacity=".2" />
            <circle cx={x} cy={y} r="3.5" fill={color} />
          </g>
        );
      })}
    </svg>
  );
}

export default function SensorsPage() {
  const [sensors] = useState(initialSensors);
  const [search, setSearch] = useState("");
  const [zoneFilter, setZoneFilter] = useState<string>("all");

  const zones = useMemo(() => Array.from(new Set(sensors.map((s) => s.zone))).sort(), [sensors]);

  const filtered = sensors.filter((s) => {
    const q = search.toLowerCase();
    const matches = s.id.toLowerCase().includes(q) || s.location.toLowerCase().includes(q);
    const zoneMatch = zoneFilter === "all" || s.zone === zoneFilter;
    return matches && zoneMatch;
  });

  const online = sensors.filter((s) => s.status === "Online").length;
  const warn = sensors.filter((s) => s.status === "Warning").length;
  const offline = sensors.filter((s) => s.status === "Offline").length;

  return (
    <div className={styles.root}>
      {/* Hero */}
      <header>
        <span className={styles.eye}>Hardware · telemetry fleet</span>
        <h1 className={styles.title}>
          Sixteen nodes, <em>one nervous system</em>.
        </h1>
        <p className={styles.lead}>
          Every Droplet node streams flow, temperature, and pressure every 200ms.
          The fleet below is deployed across six aisles and self-reports health in real time.
        </p>
      </header>

      {/* KPI strip */}
      <div className={styles.sectionHead} style={{ marginTop: 44 }}>
        <span className={styles.eye}>Fleet at a glance</span>
      </div>
      <div className={styles.statRow}>
        <div className={styles.statCell}>
          <div className={styles.statK}>Total nodes</div>
          <div className={styles.statN}>{sensors.length}<span>/ fleet</span></div>
          <div className={`${styles.statTrend} ${styles.statTrendOk}`}>All shipped</div>
        </div>
        <div className={styles.statCell}>
          <div className={styles.statK}>Online</div>
          <div className={styles.statN}><em>{online}</em></div>
          <div className={`${styles.statTrend} ${styles.statTrendOk}`}>{Math.round((online / sensors.length) * 100)}% healthy</div>
        </div>
        <div className={styles.statCell}>
          <div className={styles.statK}>Warning</div>
          <div className={styles.statN}>{warn}</div>
          <div className={`${styles.statTrend} ${warn ? styles.statTrendWarn : styles.statTrendOk}`}>
            {warn ? "Action suggested" : "No action"}
          </div>
        </div>
        <div className={styles.statCell}>
          <div className={styles.statK}>Offline</div>
          <div className={styles.statN}>{offline}</div>
          <div className={`${styles.statTrend} ${offline ? styles.statTrendWarn : styles.statTrendOk}`}>
            {offline ? "Physical check" : "All reporting"}
          </div>
        </div>
      </div>

      {/* Constellation + inline description */}
      <div className={styles.sectionHead}>
        <span className={styles.eye}>Physical map</span>
        <h2 className={styles.title} style={{ fontSize: "clamp(26px, 3vw, 38px)" }}>
          How the fleet <em>lays out</em>.
        </h2>
      </div>
      <div className={styles.radialWrap}>
        <div style={{ aspectRatio: "1", maxWidth: 360 }}>
          <NodeConstellation sensors={sensors} />
        </div>
        <div className={styles.radialLegend}>
          {zones.map((z) => {
            const count = sensors.filter((s) => s.zone === z).length;
            const on = sensors.filter((s) => s.zone === z && s.status === "Online").length;
            return (
              <div key={z} className={styles.radialLegendRow}>
                <span className={styles.dot} style={{ background: on === count ? "#00a6e0" : "#f59e0b" }} />
                <span className={styles.name}>Aisle {z}</span>
                <span className={styles.val}>{count}</span>
                <span className={styles.unit}>nodes</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fleet list */}
      <div className={styles.sectionHead} style={{ marginTop: 60 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div>
            <span className={styles.eye}>Every node · live</span>
            <h2 className={styles.title} style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}>
              The <em>full</em> fleet.
            </h2>
          </div>
          <button className={styles.btnInk}>
            <Plus className="w-4 h-4" />
            Add node
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filterBar} style={{ marginTop: 14 }}>
        <div style={{ position: "relative", flex: "0 1 260px" }}>
          <Search className="w-4 h-4" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none" }} />
          <input
            className={styles.askInput}
            style={{
              fontSize: 13, padding: "8px 12px 8px 36px",
              border: "1px solid #e2e8f0", borderRadius: 999,
              background: "rgba(255,255,255,0.6)", width: "100%",
              fontFamily: "var(--font-jetbrains-mono), monospace", letterSpacing: "0.06em",
            }}
            placeholder="Search ID or location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className={`${styles.filterChip} ${zoneFilter === "all" ? styles.filterChipActive : ""}`}
          onClick={() => setZoneFilter("all")}
        >
          All
        </button>
        {zones.map((z) => (
          <button
            key={z}
            className={`${styles.filterChip} ${zoneFilter === z ? styles.filterChipActive : ""}`}
            onClick={() => setZoneFilter(z)}
          >
            Aisle {z}
          </button>
        ))}
        <span style={{ marginLeft: "auto", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#94a3b8" }}>
          {filtered.length} / {sensors.length}
        </span>
      </div>

      <table className={styles.zonesTable} style={{ marginTop: 0, borderTop: "none" }}>
        <thead>
          <tr>
            <th style={{ width: 130 }}>Node</th>
            <th>Location</th>
            <th>Flow</th>
            <th>Temp</th>
            <th>Pressure</th>
            <th style={{ width: 140 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s) => (
            <tr key={s.id}>
              <td className={styles.mono} style={{ fontSize: 13, letterSpacing: "0.06em", color: "#0a1628", fontWeight: 500 }}>
                {s.id}
              </td>
              <td className={styles.zName}>
                <span style={{ color: "#94a3b8", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginRight: 10 }}>
                  {s.zone}
                </span>
                {s.location}
              </td>
              <td className={styles.zNum}>{s.flow.toFixed(1)} L/s</td>
              <td className={styles.zNum}>{s.temp === null ? "—" : `${s.temp.toFixed(1)}°C`}</td>
              <td className={styles.zNum}>{s.pressure.toFixed(1)} bar</td>
              <td>
                <StatusPulse status={s.status} />
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={6} style={{ padding: 60, textAlign: "center", color: "#94a3b8" }}>
                No nodes match that filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ height: 64 }} />
    </div>
  );
}
