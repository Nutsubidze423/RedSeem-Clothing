"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Plus, Minus } from "lucide-react";
import AnimatedBlobs from "@/components/AnimatedBlobs";
import ProductCard from "@/components/ProductCard";
import { featuredProducts, mockProducts } from "@/lib/mockData";

const MANIFESTO_ITEMS = [
  {
    label: "The Design Process",
    sub: "How we construct each piece",
    body: "Each piece begins as a problem — a shape we haven't solved yet. We work through multiple toiles, cutting and reconstructing until the garment takes on a life of its own. No shortcuts. No CAD-first thinking. Hands in fabric, always.",
  },
  {
    label: "Sustainability",
    sub: "Deadstock and slow production",
    body: "We source only deadstock fabric — material that would otherwise be destroyed. No new polyester. No virgin synthetics. Every run is limited by what we can find. Slow production is not a tagline. It's the only way we can work honestly.",
  },
  {
    label: "Sizing Philosophy",
    sub: "Shapes for every body",
    body: "Bodies are not problems to be standardized. Our patterns start from unusual proportions and work outward. We offer five sizes in every piece and label them numerically, not prescriptively. S/M/L is a shorthand for something that was never true.",
  },
];

export default function HomePage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div style={{ backgroundColor: "#E4E2DD", overflowX: "hidden" }}>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col justify-end"
        style={{ paddingBottom: "8vh", paddingTop: "80px" }}
      >
        <AnimatedBlobs />

        <div
          className="relative z-10 w-full px-6 md:px-10"
          style={{ maxWidth: 1440, margin: "0 auto" }}
        >
          {/* Eyebrow */}
          <p
            className="font-body text-xs tracking-[0.25em] uppercase mb-6"
            style={{
              color: "#1E1E1E",
              opacity: 0,
              animation: "slideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both",
            }}
          >
            New Collection — SS 2025
          </p>

          {/* Headline */}
          <div
            style={{
              opacity: 0,
              animation: "slideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both",
            }}
          >
            <h1
              className="font-heading font-bold uppercase text-primary select-none"
              style={{
                fontSize: "clamp(56px, 18vw, 260px)",
                lineHeight: 0.75,
                letterSpacing: "-0.05em",
                display: "block",
              }}
            >
              WEAR
            </h1>
            <h1
              className="font-heading font-bold uppercase text-primary select-none"
              style={{
                fontSize: "clamp(56px, 18vw, 260px)",
                lineHeight: 0.75,
                letterSpacing: "-0.05em",
                display: "block",
                marginLeft: "clamp(28px, 15vw, 220px)",
                marginTop: "0.08em",
              }}
            >
              THE RAW
            </h1>
          </div>

          {/* Sub row */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-end gap-8 mt-10 md:mt-14"
            style={{
              opacity: 0,
              animation: "slideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s both",
            }}
          >
            <p
              className="font-body text-sm leading-relaxed"
              style={{ maxWidth: 380, color: "rgba(30,30,30,0.65)" }}
            >
              Clothing designed for those who reject the predictable. Intentional
              construction. Unusual shapes. Always deliberate.
            </p>

            <div className="flex items-center gap-4 shrink-0">
              <Link
                href="/shop"
                className="btn-raw px-7 py-4 font-body font-bold text-sm tracking-[0.1em] uppercase"
                style={{ backgroundColor: "#1E1E1E", color: "#E4E2DD" }}
              >
                <span>Shop Now</span>
              </Link>

              <Link
                href="/shop"
                className="flex items-center gap-2 font-body text-sm font-medium hover:gap-3 transition-all duration-200"
                style={{ color: "#DB4A2B" }}
              >
                <span>Explore</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-2"
          style={{
            opacity: 0,
            animation: "slideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.7s both",
          }}
        >
          <div
            className="w-px h-12"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(30,30,30,0.3))" }}
          />
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section
        className="w-full px-6 md:px-10 py-20 md:py-32"
        style={{ maxWidth: 1440, margin: "0 auto" }}
      >
        <div className="flex items-end justify-between mb-12">
          <h2
            className="font-heading font-bold uppercase"
            style={{
              fontSize: "clamp(24px, 3vw, 48px)",
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
            }}
          >
            Featured
          </h2>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-2 font-body text-sm transition-colors duration-200"
            style={{ color: "#888888" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#DB4A2B")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#888888")}
          >
            View all <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-16">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 2} />
          ))}
        </div>
      </section>

      {/* ── CATEGORY DIVIDER — OUTERWEAR ── */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 60% 50%, rgba(248,163,72,0.2), transparent)",
          }}
        />
        <div
          className="w-full px-6 md:px-10 relative z-10"
          style={{ maxWidth: 1440, margin: "0 auto" }}
        >
          <p
            className="font-heading font-bold uppercase text-right"
            style={{
              fontSize: "clamp(48px, 12vw, 180px)",
              letterSpacing: "-0.05em",
              lineHeight: 0.85,
              color: "rgba(30,30,30,0.9)",
            }}
          >
            OUTERWEAR
          </p>
          <div className="flex justify-end mt-8">
            <Link
              href="/shop?category=outerwear"
              className="btn-ghost px-6 py-3 font-body text-sm tracking-[0.1em] uppercase font-medium"
            >
              <span>Explore Category</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CAMPAIGN BLOCK ── */}
      <section style={{ backgroundColor: "#D9D6D0" }}>
        <div
          className="w-full px-6 md:px-10 py-20 md:py-28"
          style={{ maxWidth: 1440, margin: "0 auto" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
            <div className="md:col-span-8">
              <p
                className="font-body text-xs tracking-[0.25em] uppercase mb-6"
                style={{ color: "rgba(30,30,30,0.5)" }}
              >
                The Manifesto
              </p>
              <h2
                className="font-heading font-bold uppercase"
                style={{
                  fontSize: "clamp(36px, 6vw, 100px)",
                  letterSpacing: "-0.05em",
                  lineHeight: 0.85,
                  color: "#1E1E1E",
                }}
              >
                NOTHING
                <br />
                IS
                <br />
                FINISHED
              </h2>
            </div>

            <div className="md:col-span-4 flex flex-col gap-0">
              {MANIFESTO_ITEMS.map(({ label, sub, body }) => {
                const isOpen = openItem === label;
                return (
                  <div
                    key={label}
                    className="cursor-pointer py-5"
                    style={{ borderTop: "1px solid rgba(30,30,30,0.15)" }}
                    onClick={() => setOpenItem(isOpen ? null : label)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className="font-body text-sm font-bold tracking-wider uppercase transition-colors duration-200"
                          style={{ color: isOpen ? "#DB4A2B" : "#1E1E1E" }}
                        >
                          {label}
                        </p>
                        <p className="font-body text-xs mt-1" style={{ color: "#888888" }}>
                          {sub}
                        </p>
                      </div>
                      <div className="shrink-0 transition-transform duration-300" style={{ color: "#888888" }}>
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </div>
                    </div>
                    <div
                      style={{
                        maxHeight: isOpen ? 200 : 0,
                        overflow: "hidden",
                        transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1)",
                      }}
                    >
                      <p
                        className="font-body text-xs leading-relaxed mt-4"
                        style={{ color: "rgba(30,30,30,0.65)" }}
                      >
                        {body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECOND CATEGORY DIVIDER — TOPS ── */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 20% 50%, rgba(219,74,43,0.12), transparent)",
          }}
        />
        <div
          className="w-full px-6 md:px-10 relative z-10"
          style={{ maxWidth: 1440, margin: "0 auto" }}
        >
          <p
            className="font-heading font-bold uppercase"
            style={{
              fontSize: "clamp(48px, 12vw, 180px)",
              letterSpacing: "-0.05em",
              lineHeight: 0.85,
              color: "rgba(30,30,30,0.9)",
            }}
          >
            TOPS
          </p>
          <div className="flex justify-start mt-8">
            <Link
              href="/shop?category=tops"
              className="btn-ghost px-6 py-3 font-body text-sm tracking-[0.1em] uppercase font-medium"
            >
              <span>Explore Category</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── MORE PRODUCTS ── */}
      <section
        className="w-full px-6 md:px-10 py-20 md:py-32"
        style={{ maxWidth: 1440, margin: "0 auto" }}
      >
        <div className="flex items-end justify-between mb-12">
          <h2
            className="font-heading font-bold uppercase"
            style={{
              fontSize: "clamp(24px, 3vw, 48px)",
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
            }}
          >
            All Pieces
          </h2>
          <Link
            href="/shop"
            className="flex items-center gap-2 font-body text-sm transition-colors duration-200"
            style={{ color: "#888888" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#DB4A2B")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#888888")}
          >
            View all <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-y-20">
          {mockProducts.slice(3, 12).map((product) => (
            <ProductCard key={`all-${product.id}`} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
