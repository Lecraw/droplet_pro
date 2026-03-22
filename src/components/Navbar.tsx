"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, LogIn, Sun, Moon } from "lucide-react";
import { useShopStore } from "@/store/useShopStore";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { label: "Product", href: "/#product" },
  { label: "The Problem", href: "/problem" },
  { label: "Data", href: "/#data" },
  { label: "Shop", href: "/shop" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cart, toggleCart } = useShopStore();
  const { theme, toggle: toggleTheme } = useTheme();

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#060B18]/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <Image
              src="/dropletICONLOGO.png"
              alt="Droplet"
              width={44}
              height={60}
              className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <span className="font-[family-name:var(--font-syne)] font-bold text-xl tracking-wider uppercase text-[#F0F4F8]">
              Droplet
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.2em] text-[#8B9DC3] hover:text-[#00BFFF] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className="text-[#8B9DC3] hover:text-[#00BFFF] transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
            <button
              onClick={toggleCart}
              className="relative text-[#8B9DC3] hover:text-[#00BFFF] transition-colors duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#00BFFF] text-[#060B18] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <Link
              href="/login"
              className="flex items-center gap-2 text-[11px] font-[family-name:var(--font-jetbrains)] uppercase tracking-[0.15em] text-[#8B9DC3] hover:text-[#00BFFF] transition-colors duration-300"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
            <Link
              href="/#cta"
              className="inline-flex items-center gap-2 bg-[#00BFFF] text-[#060B18] text-[11px] font-semibold tracking-wide uppercase px-5 py-2.5 rounded-md hover:bg-[#00D4FF] hover:shadow-[0_0_30px_rgba(0,191,255,0.3)] transition-all duration-300"
            >
              Request Access
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleCart} className="relative text-[#8B9DC3]">
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#00BFFF] text-[#060B18] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-px bg-[#F0F4F8] transition-transform duration-200 ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
              <span className={`block w-5 h-px bg-[#F0F4F8] transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-px bg-[#F0F4F8] transition-transform duration-200 ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#060B18]/95 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.2em] text-[#8B9DC3]"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.2em] text-[#F0F4F8] flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" /> Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
