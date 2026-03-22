"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Radio,
  ThermometerSnowflake,
  Settings,
  LogOut,
  BarChart3,
  FileText,
  Bell,
  Sparkles,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/sensors", label: "Sensor Nodes", icon: Radio },
  { href: "/dashboard/cooling", label: "Cooling Systems", icon: ThermometerSnowflake },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/reports", label: "Reports", icon: FileText },
  { href: "/dashboard/alerts", label: "Alerts", icon: Bell },
  { href: "/dashboard/ai", label: "Ask Droplet AI", icon: Sparkles },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { theme, toggle: toggleTheme } = useTheme();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-[#0D1424] text-[#F0F4F8] flex flex-col fixed inset-y-0 left-0 z-10 border-r border-white/[0.06]">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-white/[0.06]">
        <Image src="/dropletICONLOGO.png" alt="Droplet" width={36} height={48} className="object-contain opacity-90" />
        <div>
          <span className="font-[family-name:var(--font-syne)] font-bold tracking-widest text-sm text-[#F0F4F8] uppercase">DROPLET</span>
          <p className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#4A5B78] uppercase tracking-widest mt-0.5">Intelligence OS</p>
        </div>
      </div>

      {/* Nav label */}
      <div className="px-6 pt-5 pb-2">
        <span className="font-[family-name:var(--font-jetbrains)] text-[8px] uppercase tracking-[0.25em] text-[#4A5B78]">Navigation</span>
      </div>

      <nav className="flex-1 px-3 flex flex-col gap-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-[#00BFFF]/10 text-[#00BFFF] border border-[#00BFFF]/15"
                  : "text-[#8B9DC3] hover:text-[#F0F4F8] hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 shrink-0 ${active ? "text-[#00BFFF]" : "text-[#4A5B78] group-hover:text-[#8B9DC3]"}`} />
                <span className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-wider">{label}</span>
              </div>
              {active && <ChevronRight className="w-3 h-3 text-[#00BFFF]" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-white/[0.06] space-y-0.5">
        <Link
          href="/dashboard/settings"
          className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            pathname === "/dashboard/settings"
              ? "bg-[#00BFFF]/10 text-[#00BFFF] border border-[#00BFFF]/15"
              : "text-[#8B9DC3] hover:text-[#F0F4F8] hover:bg-white/[0.04] border border-transparent"
          }`}
        >
          <Settings className={`w-4 h-4 ${pathname === "/dashboard/settings" ? "text-[#00BFFF]" : "text-[#4A5B78]"}`} />
          <span className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-wider">Settings</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#4A5B78] hover:text-[#F0F4F8] hover:bg-white/[0.04] border border-transparent transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-wider">Sign Out</span>
        </Link>
      </div>

      {/* System status bar */}
      <div className="px-4 py-3 bg-[#060B18] border-t border-white/[0.06]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] shadow-[0_0_6px_rgba(0,229,160,0.5)] animate-pulse" />
            <span className="font-[family-name:var(--font-jetbrains)] text-[8px] uppercase tracking-widest text-[#8B9DC3]">All Systems Normal</span>
          </div>
          <button onClick={toggleTheme} className="text-[#4A5B78] hover:text-[#00BFFF] transition-colors" aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </aside>
  );
}
