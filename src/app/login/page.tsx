"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@hyperscale.inc");
  const [password, setPassword] = useState("password123");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    window.location.href = "/dashboard";
  };

  return (
    <div className={styles.root}>
      <div className={styles.ocean} />
      <div className={styles.tint} />

      <Link className={styles.back} href="/">← Home</Link>

      <div className={styles.brand}>
        <img src="/assets/logo-wordmark.png" alt="Droplet" />
      </div>

      <span className={styles.cornerTL}>00.001 · Auth</span>
      <span className={styles.cornerTR}>Droplet OS · v2.1</span>
      <span className={styles.cornerBL}>Sys · nominal</span>
      <span className={styles.cornerBR}>TLS 1.3 · AES-256</span>

      <main className={styles.stage}>
        <div className={styles.card}>
          <span className={styles.eye}>Water Intelligence Platform</span>
          <h1 className={styles.h1}>
            Welcome <em>back</em>.
          </h1>
          <p className={styles.lead}>
            Sign in to access live telemetry across every node in your fleet.
          </p>

          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <div className={styles.labelRow}>
                <label className={styles.label} htmlFor="password">Password</label>
                <a className={styles.forgot} href="#">Forgot?</a>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
            </div>

            <button type="submit" className={styles.submit}>
              Access platform →
            </button>
          </form>

          <div className={styles.foot}>
            <span className={styles.footLbl}>New here?</span>
            <Link className={styles.footLink} href="/request-demo">
              Request a demo →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
