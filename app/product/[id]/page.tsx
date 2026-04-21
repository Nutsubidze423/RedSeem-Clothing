"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronDown, Plus, Minus } from "lucide-react";
import { fetchProduct } from "@/lib/api";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store";

const COLOR_HEX: Record<string, string> = {
  "void black": "#1a1a1a",
  "ash white": "#f5f5f0",
  rust: "#DB4A2B",
  charcoal: "#4a4a4a",
  ecru: "#e8e0d0",
  "off white": "#f0ede8",
  "dark grey": "#555",
  clay: "#b07060",
  black: "#1a1a1a",
  bone: "#e8e0d0",
  pearl: "#f5f2ec",
  "black onyx": "#1a1a1a",
  "dusty rose": "#c9a0a0",
  "washed black": "#2a2a2a",
  "dirty white": "#ede9e3",
  terracotta: "#c96940",
  cognac: "#9a5530",
  sand: "#d4c4a8",
  storm: "#8090a0",
  blush: "#e0b4b0",
  olive: "#6b7a45",
  stone: "#a09890",
};

function getColorHex(colorName: string): string {
  return COLOR_HEX[colorName.toLowerCase()] || "#888888";
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    async function load() {
      const data = await fetchProduct(id);
      setProduct(data);
      if (data?.available_colors?.length) setSelectedColor(data.available_colors[0]);
      if (data?.available_sizes?.length) setSelectedSize(data.available_sizes[0]);
      setLoading(false);
    }
    load();
  }, [id]);

  function handleAddToCart() {
    if (!product || !selectedColor || !selectedSize) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      color: selectedColor,
      size: selectedSize,
      image: product.images?.[selectedImage] || product.cover_image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#E4E2DD" }}
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: "#1E1E1E",
                opacity: 0.3,
                animation: `slideUp 1s ease-in-out ${i * 0.2}s infinite alternate`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6"
        style={{ backgroundColor: "#E4E2DD" }}
      >
        <p
          className="font-heading text-4xl uppercase"
          style={{ letterSpacing: "-0.04em", color: "rgba(30,30,30,0.3)" }}
        >
          Not Found
        </p>
        <Link
          href="/shop"
          className="font-body text-sm underline underline-offset-4"
          style={{ color: "#DB4A2B" }}
        >
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#E4E2DD", minHeight: "100vh" }}>
      <div
        className="px-6 md:px-10 pt-24 pb-20"
        style={{ maxWidth: 1440, margin: "0 auto" }}
      >
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-10">
          <Link
            href="/shop"
            className="flex items-center gap-1 font-body text-xs tracking-[0.15em] uppercase transition-colors duration-200"
            style={{ color: "#888888" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1E1E1E")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#888888")}
          >
            <ChevronLeft size={14} />
            Shop
          </Link>
          <span className="font-body text-xs" style={{ color: "rgba(30,30,30,0.2)" }}>
            /
          </span>
          <span
            className="font-body text-xs tracking-[0.15em] uppercase"
            style={{ color: "#1E1E1E" }}
          >
            {product.name}
          </span>
        </nav>

        {/* Product layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "3/4", backgroundColor: "rgba(30,30,30,0.04)" }}
            >
              {product.images?.[selectedImage] && (
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className="relative shrink-0 overflow-hidden transition-opacity duration-200"
                    style={{
                      width: 72,
                      height: 90,
                      opacity: selectedImage === i ? 1 : 0.5,
                      outline:
                        selectedImage === i ? "2px solid #1E1E1E" : "none",
                      outlineOffset: 2,
                    }}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="72px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {/* Category */}
            {product.category && (
              <p
                className="font-body text-xs tracking-[0.2em] uppercase mb-3"
                style={{ color: "#888888" }}
              >
                {product.category}
              </p>
            )}

            {/* Title */}
            <h1
              className="font-heading font-bold uppercase"
              style={{
                fontSize: "clamp(28px, 4vw, 56px)",
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                color: "#1E1E1E",
              }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <p
              className="font-body text-2xl font-medium mt-4"
              style={{ color: "#1E1E1E" }}
            >
              ${product.price}
            </p>

            {/* Description */}
            <p
              className="font-body text-sm leading-relaxed mt-6"
              style={{ color: "rgba(30,30,30,0.65)", maxWidth: 420 }}
            >
              {product.description}
            </p>

            <div
              className="mt-8 pt-8"
              style={{ borderTop: "1px solid rgba(30,30,30,0.1)" }}
            >
              {/* Color selection */}
              {product.available_colors && product.available_colors.length > 0 && (
                <div className="mb-7">
                  <p
                    className="font-body text-xs tracking-[0.15em] uppercase mb-3"
                    style={{ color: "#888888" }}
                  >
                    Color — {selectedColor}
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {product.available_colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        aria-label={color}
                        className="w-7 h-7 rounded-full transition-transform duration-150 hover:scale-110"
                        style={{
                          backgroundColor: getColorHex(color),
                          outline:
                            selectedColor === color
                              ? "2px solid #1E1E1E"
                              : "2px solid transparent",
                          outlineOffset: 3,
                          boxShadow:
                            color.toLowerCase().includes("white") ||
                            color.toLowerCase().includes("bone") ||
                            color.toLowerCase().includes("pearl") ||
                            color.toLowerCase().includes("ecru") ||
                            color.toLowerCase().includes("sand")
                              ? "inset 0 0 0 1px rgba(0,0,0,0.12)"
                              : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size selection */}
              {product.available_sizes && product.available_sizes.length > 0 && (
                <div className="mb-7">
                  <p
                    className="font-body text-xs tracking-[0.15em] uppercase mb-3"
                    style={{ color: "#888888" }}
                  >
                    Size — {selectedSize}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {product.available_sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className="font-body text-sm font-medium tracking-wider uppercase px-4 py-2 transition-colors duration-200"
                        style={{
                          border: "1px solid rgba(30,30,30,0.2)",
                          backgroundColor:
                            selectedSize === size ? "#1E1E1E" : "transparent",
                          color: selectedSize === size ? "#E4E2DD" : "#1E1E1E",
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <p
                  className="font-body text-xs tracking-[0.15em] uppercase mb-3"
                  style={{ color: "#888888" }}
                >
                  Quantity
                </p>
                <div
                  className="inline-flex items-center"
                  style={{ border: "1px solid rgba(30,30,30,0.2)" }}
                >
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center transition-colors duration-200 hover:bg-primary/5"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span
                    className="w-10 h-10 flex items-center justify-center font-body text-sm font-medium"
                    style={{ borderLeft: "1px solid rgba(30,30,30,0.2)", borderRight: "1px solid rgba(30,30,30,0.2)" }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="w-10 h-10 flex items-center justify-center transition-colors duration-200 hover:bg-primary/5"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedColor || !selectedSize}
                className="btn-raw w-full py-4 font-body font-bold text-sm tracking-[0.1em] uppercase disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#1E1E1E", color: "#E4E2DD" }}
              >
                <span>{added ? "Added to Cart ✓" : "Add to Cart"}</span>
              </button>
            </div>

            {/* Details accordion */}
            <div
              className="mt-6"
              style={{ borderTop: "1px solid rgba(30,30,30,0.1)" }}
            >
              <button
                onClick={() => setDetailsOpen((v) => !v)}
                className="flex items-center justify-between w-full py-5"
              >
                <p className="font-body text-sm font-bold tracking-[0.1em] uppercase">
                  Product Details
                </p>
                <ChevronDown
                  size={16}
                  style={{
                    transform: detailsOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                />
              </button>
              {detailsOpen && (
                <div className="pb-5">
                  <ul className="space-y-2">
                    {[
                      "Free shipping on orders over $150",
                      "Returns accepted within 30 days",
                      "Model is 5'10\" wearing size M",
                      "Fits true to size",
                    ].map((detail) => (
                      <li
                        key={detail}
                        className="font-body text-sm leading-relaxed"
                        style={{ color: "rgba(30,30,30,0.65)" }}
                      >
                        — {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
