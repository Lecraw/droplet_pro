"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, LogIn } from "lucide-react";
import { useShopStore } from "@/store/useShopStore";
import CartDrawer from "@/components/CartDrawer";

const navLinks = [
  { label: "The Problem", href: "/problem" },
  { label: "Product", href: "/#product" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Shop", href: "/shop" },
];

export default function Navbar({ dark = false }: { dark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cart, toggleCart } = useShopStore();

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // When dark prop is set and user hasn't scrolled, use light text
  const light = dark && !scrolled;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-[#E2E8F0]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/droplet-logo.svg"
              alt="Droplet"
              width={32}
              height={44}
              className={`object-contain transition-all duration-300 ${light ? "brightness-0 invert" : ""}`}
            />
            <span className={`font-[family-name:var(--font-display)] font-bold text-xl tracking-wider uppercase transition-colors duration-300 ${light ? "text-white" : "text-[#0F172A]"}`}>
              Droplet
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest transition-colors duration-200 ${
                  light
                    ? "text-white/70 hover:text-white"
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions & CTA */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={toggleCart}
              className={`relative transition-colors cursor-pointer ${light ? "text-white/70 hover:text-white" : "text-[#64748B] hover:text-[#0F172A]"}`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#0066FF] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <Link
              href="/login"
              className={`flex items-center gap-2 text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider transition-colors ${
                light ? "text-white/70 hover:text-white" : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
            <Link
              href="/request-demo"
              className={`inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase px-5 py-2.5 rounded-md transition-all duration-200 ${
                light
                  ? "bg-white text-[#0F172A] border border-transparent hover:bg-white/90"
                  : "bg-[#0a1628] text-white border border-transparent hover:bg-[#001a4a]"
              }`}
            >
              Request Demo
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleCart} className={`relative cursor-pointer ${light ? "text-white/70" : "text-[#64748B]"}`}>
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#0066FF] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-px transition-transform duration-200 ${light ? "bg-white" : "bg-[#0F172A]"} ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
              <span className={`block w-5 h-px transition-opacity duration-200 ${light ? "bg-white" : "bg-[#0F172A]"} ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-px transition-transform duration-200 ${light ? "bg-white" : "bg-[#0F172A]"} ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
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
            className="md:hidden bg-white border-b border-[#E2E8F0] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[#64748B]"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[#0F172A] flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" /> Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <CartDrawer />
    </motion.nav>
  );
}
