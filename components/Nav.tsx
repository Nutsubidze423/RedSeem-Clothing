"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const openCart = useCartStore((s) => s.openCart);
  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/shop?category=outerwear", label: "Outerwear" },
    { href: "/shop?category=tops", label: "Tops" },
    { href: "/shop?category=bottoms", label: "Bottoms" },
    { href: "/shop?category=sets", label: "Sets" },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(228, 226, 221, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(30,30,30,0.08)" : "none",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-xl font-bold tracking-[-0.04em] uppercase text-primary hover:text-accent transition-colors duration-200 shrink-0"
          >
            REDSEEM
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm font-medium tracking-[0.1em] uppercase text-primary/70 hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Search"
              className="hidden md:flex text-primary/70 hover:text-primary transition-colors duration-200"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            <button
              onClick={openCart}
              aria-label="Open cart"
              className="relative text-primary/70 hover:text-primary transition-colors duration-200"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 text-[10px] font-body font-bold text-white rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "#DB4A2B",
                    width: 16,
                    height: 16,
                  }}
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            <button
              aria-label="Toggle menu"
              className="md:hidden text-primary/70 hover:text-primary transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className="fixed inset-0 z-40 flex flex-col md:hidden transition-all duration-300"
        style={{
          backgroundColor: "#E4E2DD",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "all" : "none",
          transform: mobileOpen ? "translateY(0)" : "translateY(-8px)",
        }}
      >
        <div className="pt-20 px-8 flex flex-col gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-heading text-4xl font-bold tracking-[-0.04em] uppercase text-primary hover:text-accent transition-colors duration-200"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="mt-auto px-8 pb-10 border-t border-primary/10 pt-6">
          <p className="font-body text-sm text-muted tracking-widest uppercase">
            Wear Your Truth
          </p>
        </div>
      </div>
    </>
  );
}
