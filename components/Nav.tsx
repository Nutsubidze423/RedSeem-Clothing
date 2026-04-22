"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Search, Menu, X, User, LogOut } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useAuthStore } from "@/lib/authStore";
import SearchModal from "@/components/SearchModal";

export default function Nav() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const openCart = useCartStore((s) => s.openCart);
  const totalItems = useCartStore((s) => s.totalItems());
  const { isLoggedIn, user, logout } = useAuthStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex text-primary/70 hover:text-primary transition-colors duration-200"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* Auth */}
            {isLoggedIn ? (
              <div className="relative hidden md:block" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-1.5 text-primary/70 hover:text-primary transition-colors duration-200"
                  aria-label="User menu"
                >
                  <User size={20} strokeWidth={1.5} />
                </button>
                {userMenuOpen && (
                  <div
                    className="absolute right-0 top-8 min-w-[160px] py-2"
                    style={{
                      backgroundColor: "#1E1E1E",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                    }}
                  >
                    <p
                      className="font-body text-xs tracking-[0.12em] uppercase px-4 py-2"
                      style={{ color: "rgba(228,226,221,0.4)" }}
                    >
                      {user?.name}
                    </p>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                        router.push("/");
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 font-body text-xs tracking-[0.12em] uppercase transition-colors duration-200"
                      style={{ color: "rgba(228,226,221,0.7)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#DB4A2B")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(228,226,221,0.7)")}
                    >
                      <LogOut size={12} strokeWidth={1.5} />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:flex items-center font-body text-xs tracking-[0.15em] uppercase transition-colors duration-200"
                style={{ color: "rgba(30,30,30,0.6)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1E1E1E")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(30,30,30,0.6)")}
              >
                Sign in
              </Link>
            )}

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
          <button
            onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
            className="flex items-center gap-3 font-heading text-4xl font-bold tracking-[-0.04em] uppercase text-primary/50 hover:text-accent transition-colors duration-200 text-left"
          >
            <Search size={28} strokeWidth={1.5} />
            Search
          </button>
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
          {isLoggedIn ? (
            <button
              onClick={() => { logout(); setMobileOpen(false); router.push("/"); }}
              className="font-heading text-4xl font-bold tracking-[-0.04em] uppercase text-primary/40 hover:text-accent transition-colors duration-200 text-left"
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="font-heading text-4xl font-bold tracking-[-0.04em] uppercase text-primary hover:text-accent transition-colors duration-200"
            >
              Sign in
            </Link>
          )}
        </div>
        <div className="mt-auto px-8 pb-10 border-t border-primary/10 pt-6">
          <p className="font-body text-sm text-muted tracking-widest uppercase">
            Wear Your Truth
          </p>
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
