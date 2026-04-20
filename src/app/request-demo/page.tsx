"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function RequestDemo() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sent");
  };

  return (
    <div className={styles.root}>
      <div className={styles.ocean} />
      <div className={styles.tint} />

      <Link className={styles.back} href="/">← Home</Link>

      <div className={styles.brand}>
        <img src="/assets/logo-wordmark.png?v=3" alt="Droplet" />
      </div>

      <main className={styles.stage}>
        <div className={styles.card}>
          {status === "idle" ? (
            <>
              <span className={styles.eye}>Request a demo</span>
              <h1 className={styles.h1}>
                See it run on <em>your pipes</em>.
              </h1>
              <p className={styles.lead}>
                Leave your email and our team will reach out within one business day
                to schedule a walkthrough.
              </p>
              <form className={styles.form} onSubmit={onSubmit} noValidate>
                <label className={styles.label} htmlFor="email">Work email</label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
                <button type="submit" className={styles.submit}>
                  Request demo →
                </button>
                <p className={styles.fine}>
                  We only use this to reach out about a demo. No newsletters.
                </p>
              </form>
            </>
          ) : (
            <>
              <span className={styles.eye}>Thanks</span>
              <h1 className={styles.h1}>
                You&rsquo;re <em>on the list</em>.
              </h1>
              <p className={styles.lead}>
                We&rsquo;ll be in touch at <strong>{email}</strong> shortly.
              </p>
              <div className={styles.done}>
                <Link className={styles.submit} href="/">Back to home</Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
