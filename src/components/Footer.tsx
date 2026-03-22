import Image from "next/image";
import Link from "next/link";

const productLinks = [
  { label: "Sensors", href: "/#product" },
  { label: "Platform", href: "/#data" },
  { label: "Pricing", href: "/pricing" },
  { label: "Shop", href: "/shop" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/contact?ref=careers" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="py-16 px-6 lg:px-8 border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/droplet-logo.svg" alt="Droplet" width={16} height={22} className="object-contain" />
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs tracking-widest uppercase text-[#0F172A] font-medium">Droplet</span>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-[200px]">
              Water intelligence for the age of AI. Real-time monitoring and optimization for data center infrastructure.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.2em] text-[#0F172A] font-medium mb-4">Product</p>
            <div className="flex flex-col gap-2.5">
              {productLinks.map(({ label, href }) => (
                <Link key={label} href={href} className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[#64748B] hover:text-[#0066FF] transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.2em] text-[#0F172A] font-medium mb-4">Company</p>
            <div className="flex flex-col gap-2.5">
              {companyLinks.map(({ label, href }) => (
                <Link key={label} href={href} className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[#64748B] hover:text-[#0066FF] transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.2em] text-[#0F172A] font-medium mb-4">Legal</p>
            <div className="flex flex-col gap-2.5">
              {legalLinks.map(({ label, href }) => (
                <Link key={label} href={href} className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[#64748B] hover:text-[#0066FF] transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#E2E8F0] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.15em] text-[#94A3B8]/60">
            &copy; {new Date().getFullYear()} Droplet Technologies, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] text-[#94A3B8] flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              SOC 2 Type II
            </span>
            <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] text-[#94A3B8] flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#0066FF]" />
              ISO 27001
            </span>
            <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] text-[#94A3B8]">
              San Jose, CA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
