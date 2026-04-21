"use client";

import Link from "next/link";
import { Globe, Hash, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1E1E1E", color: "#E4E2DD" }} className="relative overflow-hidden">
      {/* Big year background text */}
      <div
        className="absolute right-0 bottom-0 font-heading font-bold pointer-events-none select-none leading-none"
        style={{
          fontSize: "clamp(80px, 12vw, 200px)",
          color: "rgba(255,255,255,0.06)",
          bottom: "-0.1em",
          right: "0.1em",
        }}
        aria-hidden="true"
      >
        2025
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 pt-16 pb-10 relative z-10">
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p
              className="font-heading text-3xl font-bold uppercase tracking-[-0.04em] mb-4"
              style={{ color: "#E4E2DD" }}
            >
              REDSEEM
            </p>
            <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "rgba(228,226,221,0.5)" }}>
              Clothing for those who wear their truth. Raw seams, real fabric.
            </p>
            <div className="flex gap-4">
              {[Globe, Hash, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="transition-colors duration-200"
                  style={{ color: "rgba(228,226,221,0.4)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#DB4A2B")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(228,226,221,0.4)")}
                  aria-label="Social link"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="font-body text-xs tracking-[0.15em] uppercase mb-4" style={{ color: "rgba(228,226,221,0.4)" }}>
              Shop
            </p>
            <ul className="space-y-3">
              {["New Arrivals", "Outerwear", "Tops", "Bottoms", "Sets"].map((label) => (
                <li key={label}>
                  <Link
                    href="/shop"
                    className="font-body text-sm transition-colors duration-200"
                    style={{ color: "rgba(228,226,221,0.65)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#E4E2DD")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(228,226,221,0.65)")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="font-body text-xs tracking-[0.15em] uppercase mb-4" style={{ color: "rgba(228,226,221,0.4)" }}>
              Info
            </p>
            <ul className="space-y-3">
              {["About", "Sustainability", "Sizing Guide", "Lookbook", "Press"].map((label) => (
                <li key={label}>
                  <Link
                    href="#"
                    className="font-body text-sm transition-colors duration-200"
                    style={{ color: "rgba(228,226,221,0.65)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#E4E2DD")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(228,226,221,0.65)")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <p className="font-body text-xs tracking-[0.15em] uppercase mb-4" style={{ color: "rgba(228,226,221,0.4)" }}>
              Help
            </p>
            <ul className="space-y-3">
              {["Contact", "Returns", "Shipping", "FAQ", "Track Order"].map((label) => (
                <li key={label}>
                  <Link
                    href="#"
                    className="font-body text-sm transition-colors duration-200"
                    style={{ color: "rgba(228,226,221,0.65)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#E4E2DD")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(228,226,221,0.65)")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-8"
          style={{ borderTop: "1px solid rgba(228,226,221,0.08)" }}
        >
          <p className="font-body text-xs" style={{ color: "rgba(228,226,221,0.3)" }}>
            © 2025 REDSEEM. All rights reserved.
          </p>
          <p className="font-body text-xs" style={{ color: "rgba(228,226,221,0.3)" }}>
            Nothing is finished.
          </p>
        </div>
      </div>
    </footer>
  );
}
