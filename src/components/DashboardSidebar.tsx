"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Radio,
  Settings,
  LogOut,
  BarChart3,
  FileText,
  Bell,
  BotMessageSquare,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/sensors", label: "Sensor Nodes", icon: Radio },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/reports", label: "Reports", icon: FileText },
  { href: "/dashboard/alerts", label: "Alerts", icon: Bell },
  { href: "/dashboard/ai", label: "Droplet AI", icon: BotMessageSquare },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className="w-64 flex flex-col fixed inset-y-0 left-0 z-10 border-r border-[#e2e8f0]"
      style={{
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        color: "#0a1628",
        fontFamily: "var(--font-inter-tight), var(--font-inter), system-ui, sans-serif",
      }}
    >
      <div className="p-6 flex items-center gap-3 border-b border-[#e2e8f0]">
        <Image
          src="/assets/logo-wordmark.png?v=3"
          alt="Droplet"
          width={160}
          height={40}
          className="object-contain h-9 w-auto"
        />
      </div>

      <div className="px-6 pt-5 pb-2">
        <span
          className="text-[9px] uppercase tracking-[0.25em] text-[#94a3b8]"
          style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
        >
          Navigation
        </span>
      </div>

      <nav className="flex-1 px-3 flex flex-col gap-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center justify-between gap-3 px-3 py-2.5 rounded-full text-sm transition-all duration-150 ${
                active
                  ? "bg-[#00a6e0]/10 text-[#00a6e0] border border-[#00a6e0]/25"
                  : "text-[#64748b] hover:text-[#0a1628] hover:bg-white/60 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    active ? "text-[#00a6e0]" : "text-[#94a3b8] group-hover:text-[#64748b]"
                  }`}
                />
                <span
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
                >
                  {label}
                </span>
              </div>
              {active && <ChevronRight className="w-3 h-3 text-[#00a6e0]" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-[#e2e8f0] space-y-0.5">
        <Link
          href="/dashboard/settings"
          className={`group flex items-center gap-3 px-3 py-2.5 rounded-full text-sm transition-all duration-150 ${
            pathname === "/dashboard/settings"
              ? "bg-[#00a6e0]/10 text-[#00a6e0] border border-[#00a6e0]/25"
              : "text-[#64748b] hover:text-[#0a1628] hover:bg-white/60 border border-transparent"
          }`}
        >
          <Settings
            className={`w-4 h-4 ${
              pathname === "/dashboard/settings" ? "text-[#00a6e0]" : "text-[#94a3b8]"
            }`}
          />
          <span
            className="text-[11px] uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
          >
            Settings
          </span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-full text-sm text-[#94a3b8] hover:text-[#0a1628] hover:bg-white/60 border border-transparent transition-all duration-150"
        >
          <LogOut className="w-4 h-4" />
          <span
            className="text-[11px] uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
          >
            Sign Out
          </span>
        </Link>
      </div>

      <div
        className="px-4 py-3 border-t border-[#e2e8f0]"
        style={{ background: "rgba(250,252,255,0.6)" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span
              className="text-[8px] uppercase tracking-widest text-[#64748b]"
              style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
            >
              All Systems Normal
            </span>
          </div>
          <span
            className="text-[8px] text-[#94a3b8]"
            style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
          >
            16 nodes
          </span>
        </div>
      </div>
    </aside>
  );
}
