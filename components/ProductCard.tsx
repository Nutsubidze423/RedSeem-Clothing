"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";

interface Props {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container — 3/4 aspect ratio */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "3/4", backgroundColor: "rgba(10,10,10,0.08)" }}
      >
        <Image
          src={product.cover_image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out"
          style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
          priority={priority}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop&bri=-12&sat=-20&q=80";
          }}
        />

        {/* Persistent dark vignette — gives all images depth & mystery */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 30%, transparent 55%, rgba(0,0,0,0.35) 100%)",
          }}
        />

        {/* Hover highlight line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 transition-transform duration-300 origin-left"
          style={{
            backgroundColor: "#DB4A2B",
            transform: hovered ? "scaleX(1)" : "scaleX(0)",
          }}
        />

        {/* Category pill */}
        {product.category && (
          <div
            className="absolute top-3 left-3 font-body text-[9px] tracking-[0.18em] uppercase px-2 py-1"
            style={{ backgroundColor: "rgba(228,226,221,0.92)", color: "#1E1E1E" }}
          >
            {product.category}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="pt-3.5">
        <p
          className="font-body text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-300 leading-tight"
          style={{ color: hovered ? "#DB4A2B" : "#1E1E1E" }}
        >
          {product.name}
        </p>
        <p className="font-body text-xs mt-1.5" style={{ color: "#888888" }}>
          ${product.price}
        </p>
      </div>
    </Link>
  );
}
