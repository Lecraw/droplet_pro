"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./liquid.module.css";

export default function Home() {
  const bubblesRef = useRef<HTMLDivElement>(null);
  const splashGroupRef = useRef<SVGGElement>(null);
  const dropWrapRef = useRef<HTMLDivElement>(null);
  const dropSvgRef = useRef<SVGSVGElement>(null);
  const tintRef = useRef<HTMLDivElement>(null);
  const sceneLblRef = useRef<HTMLDivElement>(null);
  const cntrCurRef = useRef<HTMLElement>(null);
  const sceneRefs = useRef<(HTMLElement | null)[]>([]);

  const chartLineRef = useRef<SVGPathElement>(null);
  const chartAreaRef = useRef<SVGPathElement>(null);
  const chartDotRef = useRef<SVGCircleElement>(null);
  const chartValRef = useRef<HTMLSpanElement>(null);
  const sparkPathRef = useRef<SVGPathElement>(null);

  // BUBBLES — cursor REPEL
  useEffect(() => {
    const host = bubblesRef.current;
    if (!host) return;
    const N = 28;
    const bubbles: {
      el: HTMLDivElement; size: number;
      x: number; y: number; vx: number; vy: number;
      ox: number; oy: number;
    }[] = [];
    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    for (let i = 0; i < N; i++) {
      const el = document.createElement("div");
      el.className = styles.bubble;
      const size = 6 + Math.random() * 26;
      el.style.width = size + "px";
      el.style.height = size + "px";
      el.style.opacity = (0.35 + Math.random() * 0.35).toFixed(2);
      host.appendChild(el);
      bubbles.push({
        el, size,
        x: Math.random() * W(),
        y: Math.random() * H(),
        vx: (Math.random() - 0.5) * 0.08,
        vy: -0.1 - Math.random() * 0.22,
        ox: 0, oy: 0,
      });
    }

    let mx = -9999, my = -9999;
    const onMove = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; };
    const onLeave = () => { mx = my = -9999; };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    let rafId = 0;
    const tick = () => {
      const repelR = 180;
      for (const b of bubbles) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.y + b.size < 0) { b.y = H() + 20; b.x = Math.random() * W(); }
        if (b.x < -40) b.x = W() + 20;
        if (b.x > W() + 40) b.x = -20;

        const dx = b.x - mx, dy = b.y - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        let tx = 0, ty = 0;
        if (d < repelR && d > 0) {
          const k = 1 - d / repelR;
          const push = k * k * 90;
          tx = (dx / d) * push;
          ty = (dy / d) * push;
        }
        b.ox += (tx - b.ox) * 0.18;
        b.oy += (ty - b.oy) * 0.18;
        b.el.style.transform = `translate(${(b.x + b.ox).toFixed(1)}px, ${(b.y + b.oy).toFixed(1)}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      bubbles.forEach(b => b.el.remove());
    };
  }, []);

  // SPLASH PARTICLES
  useEffect(() => {
    const group = splashGroupRef.current;
    if (!group) return;
    const svgNS = "http://www.w3.org/2000/svg";
    const N = 22;
    const created: SVGEllipseElement[] = [];
    for (let i = 0; i < N; i++) {
      const angle = (i / N) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const dist = 60 + Math.random() * 120;
      const r = 3 + Math.random() * 9;
      const c = document.createElementNS(svgNS, "ellipse");
      c.setAttribute("cx", "150");
      c.setAttribute("cy", "240");
      c.setAttribute("rx", String(r));
      c.setAttribute("ry", String(r * 1.25));
      c.setAttribute("fill", "url(#mini-drop)");
      c.setAttribute("stroke", "#2a7fb5");
      c.setAttribute("stroke-width", "0.6");
      c.setAttribute("opacity", "0");
      c.classList.add(styles.splashPart);
      c.dataset.angle = String(angle);
      c.dataset.dist = String(dist);
      group.appendChild(c);
      created.push(c);
    }
    return () => { created.forEach(c => c.remove()); };
  }, []);

  // LIVE CHART
  useEffect(() => {
    const line = chartLineRef.current;
    const area = chartAreaRef.current;
    const dot = chartDotRef.current;
    const val = chartValRef.current;
    const spark = sparkPathRef.current;
    if (!line || !area || !dot) return;

    const W = 320, H = 90, N = 48;
    const data: number[] = new Array(N).fill(0).map((_, i) =>
      0.5 + Math.sin(i * 0.4) * 0.18 + Math.random() * 0.08
    );
    const sparkData: number[] = new Array(30).fill(0).map((_, i) =>
      0.8 - i / 40 + Math.random() * 0.08
    );
    let t = 0;

    const render = () => {
      t += 0.08;
      data.shift();
      data.push(0.5 + Math.sin(t) * 0.18 + Math.cos(t * 0.6) * 0.08 + Math.random() * 0.08);
      let lp = "", ap = "";
      data.forEach((v, i) => {
        const x = (i / (N - 1)) * W;
        const y = H - v * H * 0.8 - 4;
        lp += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1) + " ";
        if (i === 0) ap = "M0 " + H + " L" + x.toFixed(1) + " " + y.toFixed(1);
        else ap += " L" + x.toFixed(1) + " " + y.toFixed(1);
      });
      ap += " L" + W + " " + H + " Z";
      line.setAttribute("d", lp);
      area.setAttribute("d", ap);
      const last = data[data.length - 1];
      dot.setAttribute("cx", String(W));
      dot.setAttribute("cy", String(H - last * H * 0.8 - 4));
      if (val) val.innerHTML = (12 + last * 6).toFixed(1) + " <em>gpm</em>";

      if (spark) {
        sparkData.shift();
        sparkData.push(Math.max(0.2, (sparkData[sparkData.length - 1] || 0.5) - 0.01 + (Math.random() - 0.5) * 0.04));
        let sp = "";
        sparkData.forEach((v, i) => {
          const x = (i / (sparkData.length - 1)) * 120;
          const y = 22 - v * 18 - 2;
          sp += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1) + " ";
        });
        spark.setAttribute("d", sp);
      }
    };
    render();
    const id = setInterval(render, 320);
    return () => clearInterval(id);
  }, []);

  // SCROLL DRIVER + CURSOR PARALLAX + CLICK JIGGLE
  useEffect(() => {
    const drop = dropWrapRef.current;
    const dropSvg = dropSvgRef.current;
    const tint = tintRef.current;
    const sceneLbl = sceneLblRef.current;
    const cntrCur = cntrCurRef.current;
    const scenes = sceneRefs.current.filter((s): s is HTMLElement => !!s);
    if (!drop || !dropSvg || !tint || !sceneLbl || !cntrCur || scenes.length === 0) return;

    const applyScene = (sc: HTMLElement) => {
      drop.style.setProperty("--drop-x", sc.dataset.dx || "0");
      drop.style.setProperty("--drop-y", sc.dataset.dy || "0");
      drop.style.setProperty("--drop-s", sc.dataset.ds || "1");
      drop.style.setProperty("--drop-size", sc.dataset.size || "70vmin");
      tint.style.setProperty("--tint-a", sc.dataset.tint || ".06");
    };
    applyScene(scenes[0]);

    let current = 0;
    const updateActive = () => {
      const mid = window.innerHeight * 0.5;
      let active = 0;
      scenes.forEach((s, i) => {
        const r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) active = i;
      });
      if (active !== current) {
        current = active;
        scenes.forEach((s, i) => s.classList.toggle(styles.active, i === active));
        applyScene(scenes[active]);
        sceneLbl.textContent = scenes[active].dataset.label || "";
        cntrCur.textContent = String(active + 1).padStart(2, "0");
      }
    };

    const onScroll = () => updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onPointer = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 22;
      ty = (e.clientY / window.innerHeight - 0.5) * 16;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const t0 = performance.now();
    let rafId = 0;
    const raf = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      const t = (performance.now() - t0) / 1000;
      const wx = Math.sin(t * 0.35) * 14 + Math.sin(t * 0.17) * 6;
      const wy = Math.cos(t * 0.48) * 10 + Math.sin(t * 0.21) * 4;
      dropSvg.style.setProperty("--drop-mx", (cx + wx).toFixed(2) + "px");
      dropSvg.style.setProperty("--drop-my", (cy + wy).toFixed(2) + "px");
      rafId = requestAnimationFrame(raf);
    };
    raf();

    const onClick = (e: MouseEvent) => {
      const r = drop.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;
      dropSvg.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.06, 0.94)" },
          { transform: "scale(0.96, 1.04)" },
          { transform: "scale(1.02, 0.98)" },
          { transform: "scale(1)" },
        ],
        { duration: 700, easing: "ease-out" }
      );
    };
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.ocean} />
      <div className={styles.tint} ref={tintRef} />

      <div className={styles.bubbles} ref={bubblesRef} />

      <div className={styles.brand}>
        <img src="/assets/logo-wordmark.png" alt="Droplet" />
      </div>

      <nav className={styles.topNav}>
        <Link className={`${styles.btn} ${styles.btnG}`} href="/login">Sign in</Link>
        <Link className={`${styles.btn} ${styles.btnP}`} href="/request-demo">Request demo</Link>
      </nav>

      <div className={styles.cntrLbl} ref={sceneLblRef}>01 · OPENING</div>
      <div className={styles.cntr}>
        <b ref={cntrCurRef}>01</b> / 06
      </div>

      <div className={styles.stage}>
        <div className={styles.dropWrap} ref={dropWrapRef}>
          <svg className={styles.dropSvg} ref={dropSvgRef} viewBox="0 0 300 380" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="drop-body" cx="38%" cy="32%" r="85%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="25%" stopColor="#e6f5ff" stopOpacity=".95" />
                <stop offset="52%" stopColor="#b2dff5" stopOpacity=".72" />
                <stop offset="82%" stopColor="#5aade0" stopOpacity=".55" />
                <stop offset="100%" stopColor="#1a6ea8" stopOpacity=".55" />
              </radialGradient>
              <radialGradient id="drop-rim" cx="50%" cy="55%" r="52%">
                <stop offset="80%" stopColor="transparent" />
                <stop offset="94%" stopColor="#2a7fb5" stopOpacity=".4" />
                <stop offset="100%" stopColor="#0d4f7a" stopOpacity=".65" />
              </radialGradient>
              <radialGradient id="drop-caustic" cx="50%" cy="72%" r="32%">
                <stop offset="0" stopColor="#ffffff" stopOpacity=".95" />
                <stop offset="55%" stopColor="#c8ecfc" stopOpacity=".5" />
                <stop offset="100%" stopColor="#7cc3e8" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="drop-glint" cx="30%" cy="30%" r="24%">
                <stop offset="0" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="drop-shadow" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#062a48" stopOpacity=".35" />
                <stop offset="60%" stopColor="#062a48" stopOpacity=".12" />
                <stop offset="100%" stopColor="#062a48" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="drop-lh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
                <stop offset=".35" stopColor="#ffffff" stopOpacity=".85" />
                <stop offset=".75" stopColor="#ffffff" stopOpacity=".5" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="drop-bh" x1="0" y1="0" x2="0" y2="1">
                <stop offset=".7" stopColor="#51d8ff" stopOpacity="0" />
                <stop offset="1" stopColor="#9eecff" stopOpacity=".8" />
              </linearGradient>
              <clipPath id="dropShape">
                <path d="M150 14 C206 112 264 176 264 240 A114 114 0 0 1 36 240 C36 176 94 112 150 14 Z" />
              </clipPath>
              <radialGradient id="mini-drop" cx="35%" cy="30%" r="70%">
                <stop offset="0" stopColor="#ffffff" stopOpacity=".95" />
                <stop offset="50%" stopColor="#b2dff5" stopOpacity=".7" />
                <stop offset="100%" stopColor="#1a6ea8" stopOpacity=".55" />
              </radialGradient>
            </defs>

            <g>
              <ellipse cx="150" cy="360" rx="96" ry="10" fill="url(#drop-shadow)" />
              <path d="M150 14 C206 112 264 176 264 240 A114 114 0 0 1 36 240 C36 176 94 112 150 14 Z" fill="url(#drop-body)" />
              <path d="M150 14 C206 112 264 176 264 240 A114 114 0 0 1 36 240 C36 176 94 112 150 14 Z" fill="url(#drop-rim)" />
              <g clipPath="url(#dropShape)">
                <ellipse cx="150" cy="275" rx="70" ry="40" fill="url(#drop-caustic)" />
                <path d="M60 250 Q150 310 240 250" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity=".45" />
              </g>
              <path d="M150 14 C206 112 264 176 264 240 A114 114 0 0 1 36 240 C36 176 94 112 150 14 Z" fill="none" stroke="#1e5f8f" strokeWidth="0.8" opacity=".35" />
              <path d="M44 252 A108 108 0 0 0 256 252" fill="none" stroke="url(#drop-bh)" strokeWidth="3" />
              <path d="M42 238 C42 180 90 110 142 30" fill="none" stroke="url(#drop-lh)" strokeWidth="2.4" opacity=".7" />
              <ellipse cx="108" cy="98" rx="42" ry="22" fill="url(#drop-glint)" transform="rotate(-34 108 98)" />
              <ellipse cx="86" cy="68" rx="14" ry="4" fill="#fff" opacity=".9" transform="rotate(-40 86 68)" />
              <circle cx="122" cy="112" r="3" fill="#fff" opacity=".85" />
            </g>

            <g ref={splashGroupRef} />
          </svg>
        </div>
      </div>

      <section
        className={`${styles.scene} ${styles.active}`}
        data-label="01 · OPENING"
        data-dx="0" data-dy="-12vh" data-ds="1" data-size="72vmin" data-tint=".1"
        ref={(el) => { sceneRefs.current[0] = el; }}
      >
        <div className={`${styles.zone} ${styles.zoneBelow}`} style={{ bottom: "6vh" }}>
          <div className={styles.textCard} style={{ maxWidth: 760, margin: "0 auto" }}>
            <span className={styles.eye}>AI water optimization · for data centers</span>
            <h1 className={styles.h1}>
              Make every drop<br />
              <em className={styles.em}>smarter</em>.
            </h1>
            <p className={`${styles.sub} ${styles.center}`}>
              Hardware + software that installs in minutes.<br />
              Cuts data-center water waste in real time.
            </p>
          </div>
        </div>
      </section>

      <section
        className={styles.scene}
        data-label="02 · THE PROBLEM"
        data-dx="-22vw" data-dy="-6vh" data-ds="0.7" data-size="62vmin" data-tint=".1"
        ref={(el) => { sceneRefs.current[1] = el; }}
      >
        <div className={`${styles.zone} ${styles.zoneRight}`}>
          <div className={styles.textCard}>
            <span className={styles.eye}>Data centers, today</span>
            <h2 className={styles.h2} style={{ fontSize: "clamp(34px,4.6vw,66px)" }}>
              Cooling systems are<br />
              <em className={styles.em}>bleeding water</em>.
            </h2>
            <p className={styles.lead}>
              By 2030, AI data centers will consume more water than the entire UK. 40% of it is wasted on inefficient cooling.
            </p>
          </div>
        </div>
      </section>

      <section
        className={styles.scene}
        data-label="03 · PRODUCT"
        data-dx="26vw" data-dy="0" data-ds="0.65" data-size="60vmin" data-tint=".08"
        ref={(el) => { sceneRefs.current[2] = el; }}
      >
        <div className={`${styles.zone} ${styles.zoneLeft}`}>
          <div className={styles.textCard}>
            <span className={styles.eye}>The product</span>
            <h2 className={styles.h2} style={{ fontSize: "clamp(34px,4.4vw,64px)" }}>
              Clamp it on.<br />Walk away.
            </h2>
            <p className={styles.lead}>
              The Droplet Node installs on any existing pipe — 1&quot; to 14&quot; — in 15 minutes. No plumbing cuts. No downtime.
            </p>
          </div>
        </div>
      </section>

      <section
        className={styles.scene}
        data-label="04 · HOW IT WORKS"
        data-dx="-26vw" data-dy="0" data-ds="0.65" data-size="60vmin" data-tint=".08"
        ref={(el) => { sceneRefs.current[3] = el; }}
      >
        <div className={`${styles.zone} ${styles.zoneRight}`}>
          <div className={styles.textCard}>
            <span className={styles.eye}>How it works</span>
            <h2 className={styles.h2} style={{ fontSize: "clamp(34px,4.4vw,64px)" }}>
              Sense.<br />Learn.<br />Reduce.
            </h2>
            <p className={styles.lead}>
              Real-time flow from every zone, analyzed on-device. Cooling right-sizes itself — per rack, per hour.
            </p>
            <div className={styles.chart} aria-hidden="true">
              <div className={styles.chartHead}>
                <span className={styles.chartLbl}>Flow · rack B-07</span>
                <span className={styles.chartVal} ref={chartValRef}>14.2 <em>gpm</em></span>
              </div>
              <svg className={styles.chartSvg} viewBox="0 0 320 90" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#51d8ff" stopOpacity=".45" />
                    <stop offset="1" stopColor="#51d8ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path ref={chartAreaRef} d="" fill="url(#chartFill)" />
                <path ref={chartLineRef} d="" fill="none" stroke="#00a6e0" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
                <circle ref={chartDotRef} r="3.2" fill="#00a6e0" stroke="#fff" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.scene}
        data-label="05 · WHY IT WORKS"
        data-dx="0" data-dy="-26vh" data-ds="0.4" data-size="50vmin" data-tint=".06"
        ref={(el) => { sceneRefs.current[4] = el; }}
      >
        <div className={`${styles.zone} ${styles.zoneBelow}`} style={{ bottom: "12vh" }}>
          <span className={styles.eye}>Why it works</span>
          <h2 className={styles.h2} style={{ fontSize: "clamp(30px,3.8vw,52px)", fontWeight: 400 }}>
            Pays for itself.<br />Quickly.
          </h2>
          <div className={styles.statRow}>
            <div className={styles.stat}>
              <div className={styles.statN}>15<span>min</span></div>
              <div className={styles.statK}>Install time</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statN}>&lt;6<span>mo</span></div>
              <div className={styles.statK}>Payback</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statN}>40<span>%</span></div>
              <div className={styles.statK}>Water reduced</div>
              <svg className={styles.spark} viewBox="0 0 120 22" preserveAspectRatio="none">
                <path ref={sparkPathRef} d="" fill="none" stroke="#00a6e0" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.scene}
        data-label="06 · TEAM"
        data-dx="0" data-dy="-28vh" data-ds="0.34" data-size="44vmin" data-tint=".08"
        ref={(el) => { sceneRefs.current[5] = el; }}
      >
        <div className={`${styles.zone} ${styles.zoneBelow}`} style={{ bottom: "9vh" }}>
          <span className={styles.eye}>Team</span>
          <h2 className={styles.h2} style={{ fontSize: "clamp(30px,3.8vw,52px)", fontWeight: 400 }}>
            Built by operators.
          </h2>
          <div className={styles.teamGrid}>
            <div className={styles.teammate}>
              <div className={styles.teamAv}>BT</div>
              <h4 className={styles.teamName}>Bazigh Tahirzad</h4>
              <div className={styles.teamRole}>CEO</div>
            </div>
            <div className={styles.teammate}>
              <div className={styles.teamAv}>LH</div>
              <h4 className={styles.teamName}>Leo Hoffmann</h4>
              <div className={styles.teamRole}>CTO</div>
            </div>
            <div className={styles.teammate}>
              <div className={styles.teamAv}>PJ</div>
              <h4 className={styles.teamName}>Patrick Jiang</h4>
              <div className={styles.teamRole}>COO</div>
            </div>
          </div>
          <div className={styles.actions}>
            <Link className={`${styles.btn} ${styles.btnP}`} href="/request-demo">
              Request a demo →
            </Link>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.fl}>
          <Link href="/#product">Product</Link>
          <Link href="/about">Pilots</Link>
          <Link href="/request-demo">Contact</Link>
          <Link href="/about">Press</Link>
        </div>
        <div className={styles.fb}>© 2026 Droplet · San Jose, CA</div>
      </footer>
    </div>
  );
}
