"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Search } from "lucide-react";
import { mockProducts } from "@/lib/mockData";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const results =
    query.trim().length > 0
      ? mockProducts.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category?.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto transition-all duration-300"
      style={{
        opacity: open ? 1 : 0,
        pointerEvents: open ? "all" : "none",
        backgroundColor: "rgba(20,20,20,0.97)",
      }}
    >
      <div
        className="max-w-[1440px] mx-auto px-6 md:px-10 pt-24 pb-20"
        style={{ minHeight: "100vh" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-8 transition-colors duration-200"
          style={{ color: "rgba(228,226,221,0.4)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "#E4E2DD")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(228,226,221,0.4)")
          }
          aria-label="Close search"
        >
          <X size={22} strokeWidth={1.5} />
        </button>

        {/* Input */}
        <div
          className="flex items-center gap-4"
          style={{ borderBottom: "1px solid rgba(228,226,221,0.12)" }}
        >
          <Search
            size={20}
            strokeWidth={1.5}
            style={{ color: "rgba(228,226,221,0.35)", flexShrink: 0 }}
          />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pieces..."
            className="w-full bg-transparent outline-none font-heading font-bold uppercase py-5"
            style={{
              fontSize: "clamp(22px, 4vw, 52px)",
              letterSpacing: "-0.03em",
              color: "#E4E2DD",
            }}
          />
        </div>

        {/* State */}
        {query.trim() === "" ? (
          <p
            className="font-body text-xs tracking-[0.2em] uppercase mt-10"
            style={{ color: "rgba(228,226,221,0.25)" }}
          >
            Start typing to search
          </p>
        ) : results.length === 0 ? (
          <p
            className="font-body text-xs tracking-[0.2em] uppercase mt-10"
            style={{ color: "rgba(228,226,221,0.25)" }}
          >
            No results for &ldquo;{query}&rdquo;
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-10">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                onClick={onClose}
                className="group flex flex-col gap-2"
              >
                <div
                  className="relative overflow-hidden"
                  style={{
                    aspectRatio: "3/4",
                    backgroundColor: "rgba(228,226,221,0.04)",
                  }}
                >
                  <Image
                    src={product.cover_image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <p
                  className="font-body text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-200 group-hover:text-accent"
                  style={{ color: "#E4E2DD" }}
                >
                  {product.name}
                </p>
                <p
                  className="font-body text-xs"
                  style={{ color: "rgba(228,226,221,0.4)" }}
                >
                  ${product.price}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
