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
    <aside className="w-64 bg-white text-[#0F172A] flex flex-col fixed inset-y-0 left-0 z-10 border-r border-[#E2E8F0]">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-[#E2E8F0]">
        <Image src="/droplet-logo.svg" alt="Droplet" width={22} height={30} className="object-contain" />
        <div>
          <span className="font-[family-name:var(--font-display)] font-bold tracking-widest text-sm text-[#0F172A] uppercase">DROPLET</span>
          <p className="font-[family-name:var(--font-mono)] text-[8px] text-[#94A3B8] uppercase tracking-widest mt-0.5">Intelligence OS</p>
        </div>
      </div>

      {/* Nav label */}
      <div className="px-6 pt-5 pb-2">
        <span className="font-[family-name:var(--font-mono)] text-[8px] uppercase tracking-[0.25em] text-[#94A3B8]">Navigation</span>
      </div>

      <nav className="flex-1 px-3 flex flex-col gap-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                active
                  ? "bg-[#0066FF]/8 text-[#0066FF] border border-[#0066FF]/15"
                  : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 shrink-0 ${active ? "text-[#0066FF]" : "text-[#94A3B8] group-hover:text-[#64748B]"}`} />
                <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider">{label}</span>
              </div>
              {active && <ChevronRight className="w-3 h-3 text-[#0066FF]" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-[#E2E8F0] space-y-0.5">
        <Link
          href="/dashboard/settings"
          className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
            pathname === "/dashboard/settings"
              ? "bg-[#0066FF]/8 text-[#0066FF] border border-[#0066FF]/15"
              : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] border border-transparent"
          }`}
        >
          <Settings className={`w-4 h-4 ${pathname === "/dashboard/settings" ? "text-[#0066FF]" : "text-[#94A3B8]"}`} />
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider">Settings</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F8FAFC] border border-transparent transition-all duration-150"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider">Sign Out</span>
        </Link>
      </div>

      {/* System status bar */}
      <div className="px-4 py-3 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-[family-name:var(--font-mono)] text-[8px] uppercase tracking-widest text-[#64748B]">All Systems Normal</span>
          </div>
          <span className="font-[family-name:var(--font-mono)] text-[8px] text-[#94A3B8]">16 nodes</span>
        </div>
      </div>
    </aside>
  );
}
