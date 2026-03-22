import Image from "next/image";
import Link from "next/link";

const links: { label: string; href: string }[] = [
  { label: "Product",  href: "/#product" },
  { label: "Company",  href: "/#use-cases" },
  { label: "Careers",  href: "/contact?ref=careers" },
  { label: "Contact",  href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="py-12 px-6 lg:px-8 border-t border-white/[0.06] bg-[#060B18]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div className="flex items-center gap-3">
            <Image
              src="/dropletICONLOGO.png"
              alt="Droplet"
              width={14}
              height={20}
              className="object-contain opacity-50"
            />
            <span className="font-[family-name:var(--font-jetbrains)] text-[10px] tracking-[0.2em] uppercase text-[#4A5B78]">
              Droplet
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            {links.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-[#4A5B78] hover:text-[#00BFFF] transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.04]">
          <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.15em] text-[#4A5B78]/60">
            &copy; {new Date().getFullYear()} Droplet Technologies, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
