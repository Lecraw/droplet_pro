"use client";

import {
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import styles from "../dashboard.module.css";

const monthlyData = [
  { month: "Jan", water: 4200, pue: 1.48, cost: 12000, saved: 800 },
  { month: "Feb", water: 4500, pue: 1.45, cost: 13500, saved: 1200 },
  { month: "Mar", water: 4100, pue: 1.42, cost: 11000, saved: 1800 },
  { month: "Apr", water: 3800, pue: 1.38, cost: 9500, saved: 2400 },
  { month: "May", water: 3200, pue: 1.31, cost: 8200, saved: 3100 },
  { month: "Jun", water: 2800, pue: 1.26, cost: 7100, saved: 4000 },
  { month: "Jul", water: 2400, pue: 1.21, cost: 6300, saved: 4800 },
  { month: "Aug", water: 2100, pue: 1.18, cost: 5800, saved: 5400 },
  { month: "Sep", water: 1900, pue: 1.16, cost: 5500, saved: 5900 },
  { month: "Oct", water: 1700, pue: 1.14, cost: 5100, saved: 6300 },
  { month: "Nov", water: 1600, pue: 1.13, cost: 4900, saved: 6600 },
  { month: "Dec", water: 1500, pue: 1.12, cost: 4600, saved: 7000 },
];

const zones = [
  { zone: "Aisle A · Compute",      flow: 4.2, temp: 22.1, efficiency: 92 },
  { zone: "Aisle B · AI Cluster",   flow: 3.8, temp: 23.4, efficiency: 88 },
  { zone: "Aisle C · Storage",      flow: 8.5, temp: 25.0, efficiency: 95 },
  { zone: "Aisle D · Networking",   flow: 2.1, temp: 21.8, efficiency: 97 },
  { zone: "Aisle E · Cold Row",     flow: 5.4, temp: 24.2, efficiency: 90 },
];

export default function AnalyticsPage() {
  const totalSaved = monthlyData.reduce((s, d) => s + d.saved, 0);
  const maxWater = Math.max(...monthlyData.map((d) => d.water));

  return (
    <div className={styles.root}>
      {/* Hero */}
      <header>
        <span className={styles.eye}>Intelligence · full-year view</span>
        <h1 className={styles.title}>
          Year over year, <em>curving down</em>.
        </h1>
        <p className={styles.lead}>
          Twelve months of water, cost, and efficiency telemetry — read as one unbroken motion, not a pile of cards.
        </p>
      </header>

      {/* Headline number */}
      <div className={styles.sectionHead} style={{ marginTop: 44 }}>
        <span className={styles.eye}>Saved · year to date</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "end", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", padding: "36px 8px 28px" }}>
        <div>
          <div className={styles.proseBig}>
            <em>{(totalSaved / 1000).toFixed(0)}K</em><span>gal</span>
          </div>
          <p className={styles.lead} style={{ marginTop: 16, maxWidth: 420 }}>
            +42% vs the prior year. Enough to fill roughly <strong style={{ color: "#0a1628", fontWeight: 500 }}>72 standard swimming pools</strong>.
          </p>
        </div>
        <div>
          <span className={styles.eye} style={{ marginBottom: 10 }}>Monthly · gallons saved</span>
          <div className={styles.monthGrid} style={{ border: "none", padding: 0, height: 120, alignItems: "end" }}>
            {monthlyData.map((d) => (
              <div key={d.month} className={styles.monthCol}>
                <div
                  className={styles.monthBar}
                  style={{
                    height: `${(d.saved / 7000) * 100}%`,
                    opacity: 0.4 + (d.saved / 7000) * 0.6,
                  }}
                  title={`${d.month}: ${d.saved.toLocaleString()} gal`}
                />
                <span className={styles.monthLbl}>{d.month[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div className={styles.sectionHead}>
        <span className={styles.eye}>The year in numbers</span>
      </div>
      <div className={styles.statRow}>
        <div className={styles.statCell}>
          <div className={styles.statK}>Avg PUE</div>
          <div className={styles.statN}><em>1.12</em></div>
          <div className={`${styles.statTrend} ${styles.statTrendOk}`}>Industry avg 1.58</div>
        </div>
        <div className={styles.statCell}>
          <div className={styles.statK}>Water saved YTD</div>
          <div className={styles.statN}>{(totalSaved / 1000).toFixed(0)}<span>K gal</span></div>
          <div className={`${styles.statTrend} ${styles.statTrendOk}`}>+42% YoY</div>
        </div>
        <div className={styles.statCell}>
          <div className={styles.statK}>Cost avoided</div>
          <div className={styles.statN}>$74<span>K</span></div>
          <div className={`${styles.statTrend} ${styles.statTrendOk}`}>Operating delta</div>
        </div>
        <div className={styles.statCell}>
          <div className={styles.statK}>Efficiency peak</div>
          <div className={styles.statN}>97<span>%</span></div>
          <div className={`${styles.statTrend} ${styles.statTrendOk}`}>Aisle D · Oct</div>
        </div>
      </div>

      {/* Water + PUE paired charts */}
      <div className={styles.sectionHead}>
        <span className={styles.eye}>Consumption & efficiency · 12-month</span>
        <h2 className={styles.title} style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}>
          Less water, <em>lower PUE</em>.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div className={styles.chartPanel}>
          <div className={styles.chartHead}>
            <span className={styles.eye} style={{ marginBottom: 0 }}>Water · monthly</span>
            <span className={styles.chartVal}>1,500<em>gal · Dec</em></span>
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 4, left: -10, right: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#51d8ff" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#51d8ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.95)",
                    border: "1px solid #e2e8f0",
                    fontSize: 12,
                    color: "#0a1628",
                  }}
                />
                <Area type="monotone" dataKey="water" stroke="#00a6e0" strokeWidth={1.6} fill="url(#waterGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartPanel}>
          <div className={styles.chartHead}>
            <span className={styles.eye} style={{ marginBottom: 0 }}>PUE · monthly</span>
            <span className={styles.chartVal}><em style={{ fontStyle: "italic", color: "#00a6e0" }}>1.12</em></span>
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 4, left: -10, right: 4, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis domain={[1.0, 1.6]} tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
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
                  dot={{ r: 3, fill: "#fff", stroke: "#00a6e0", strokeWidth: 1.5 }}
                  activeDot={{ r: 5, fill: "#00a6e0", stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Zone efficiency — editorial bar list */}
      <div className={styles.sectionHead}>
        <span className={styles.eye}>By zone · this week</span>
        <h2 className={styles.title} style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}>
          Efficiency, <em>aisle by aisle</em>.
        </h2>
      </div>
      <div style={{ borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", background: "rgba(255,255,255,0.45)", backdropFilter: "blur(6px)" }}>
        {zones.map((z, i) => (
          <div
            key={z.zone}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.4fr) auto auto 1fr auto",
              alignItems: "center",
              gap: 24,
              padding: "22px 24px",
              borderBottom: i === zones.length - 1 ? "none" : "1px solid #e2e8f0",
            }}
          >
            <span style={{ fontSize: 16, color: "#0a1628", letterSpacing: "-0.015em", fontWeight: 500 }}>
              {z.zone}
            </span>
            <span className={styles.mono} style={{ fontSize: 12, color: "#64748b", letterSpacing: "0.06em" }}>
              {z.flow.toFixed(1)} L/s
            </span>
            <span className={styles.mono} style={{ fontSize: 12, color: "#64748b", letterSpacing: "0.06em" }}>
              {z.temp.toFixed(1)}°C
            </span>
            <div className={styles.barTrack} style={{ height: 3 }}>
              <div
                className={z.efficiency >= 92 ? styles.barFill : styles.barFillWarn}
                style={{ width: `${z.efficiency}%` }}
              />
            </div>
            <span
              style={{
                fontSize: 20,
                fontWeight: 300,
                color: z.efficiency >= 92 ? "#00a6e0" : "#f59e0b",
                fontStyle: "italic",
                letterSpacing: "-0.02em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {z.efficiency}%
            </span>
          </div>
        ))}
      </div>

      {/* Cost delta callout */}
      <div className={styles.sectionHead}>
        <span className={styles.eye}>Bottom line</span>
        <h2 className={styles.title} style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}>
          Pays for itself, <em>twice over</em>.
        </h2>
      </div>
      <div className={styles.chartPanel}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32, alignItems: "baseline" }}>
          <div>
            <span className={styles.eye}>Jan · baseline</span>
            <div className={styles.proseBig} style={{ fontSize: "clamp(40px, 4vw, 60px)", marginTop: 10 }}>
              $12<span>K/mo</span>
            </div>
          </div>
          <div>
            <span className={styles.eye}>Dec · today</span>
            <div className={styles.proseBig} style={{ fontSize: "clamp(40px, 4vw, 60px)", marginTop: 10 }}>
              <em>$4.6</em><span>K/mo</span>
            </div>
          </div>
          <div>
            <span className={styles.eye}>Delta</span>
            <div className={styles.proseBig} style={{ fontSize: "clamp(40px, 4vw, 60px)", marginTop: 10 }}>
              −62<span>%</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: 64 }} />
    </div>
  );
}
