"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/api";
import { Product, Filters } from "@/lib/types";

const SORT_OPTIONS = [
  { value: "newest" as const, label: "Newest First" },
  { value: "price_asc" as const, label: "Price: Low to High" },
  { value: "price_desc" as const, label: "Price: High to Low" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    priceFrom: null,
    priceTo: null,
    sort: null,
  });
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [selectedSort, setSelectedSort] = useState<Filters["sort"]>(null);

  const load = useCallback(
    async (page: number, f: Filters) => {
      setLoading(true);
      try {
        const data = await fetchProducts(page, f);
        let items = data.data;
        if (categoryParam) {
          items = items.filter(
            (p) => p.category?.toLowerCase() === categoryParam.toLowerCase()
          );
        }
        setProducts(items);
        setTotalPages(data.meta.last_page);
        setTotalItems(categoryParam ? items.length : data.meta.total);
        setCurrentPage(page);
      } finally {
        setLoading(false);
      }
    },
    [categoryParam]
  );

  useEffect(() => {
    load(1, filters);
  }, [load, filters]);

  function applyFilters() {
    const newFilters: Filters = {
      priceFrom: priceFrom ? Number(priceFrom) : null,
      priceTo: priceTo ? Number(priceTo) : null,
      sort: selectedSort,
    };
    setFilters(newFilters);
    setFilterOpen(false);
    setSortOpen(false);
  }

  function clearFilters() {
    setPriceFrom("");
    setPriceTo("");
    setSelectedSort(null);
    setFilters({ priceFrom: null, priceTo: null, sort: null });
  }

  const hasActiveFilters =
    filters.priceFrom !== null ||
    filters.priceTo !== null ||
    filters.sort !== null;

  function paginate(p: number) {
    load(p, filters);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const categoryTitle = categoryParam
    ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)
    : "All Pieces";

  return (
    <div style={{ backgroundColor: "#E4E2DD", minHeight: "100vh" }}>
      {/* Page header */}
      <div
        className="relative overflow-hidden pt-32 pb-16 px-6 md:px-10"
        style={{ maxWidth: 1440, margin: "0 auto" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(219,74,43,0.1), transparent)",
          }}
        />
        <p
          className="font-body text-xs tracking-[0.25em] uppercase mb-3 relative z-10"
          style={{ color: "rgba(30,30,30,0.5)" }}
        >
          REDSEEM
        </p>
        <h1
          className="font-heading font-bold uppercase relative z-10"
          style={{
            fontSize: "clamp(48px, 10vw, 140px)",
            letterSpacing: "-0.05em",
            lineHeight: 0.82,
            color: "#1E1E1E",
          }}
        >
          {categoryTitle}
        </h1>
      </div>

      {/* Toolbar */}
      <div
        className="sticky z-30 px-6 md:px-10 py-4"
        style={{
          top: 64,
          backgroundColor: "rgba(228,226,221,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(30,30,30,0.08)",
          maxWidth: "100%",
        }}
      >
        <div
          className="flex items-center justify-between gap-4"
          style={{ maxWidth: 1440, margin: "0 auto" }}
        >
          <div className="flex items-center gap-3">
            {/* Filter button */}
            <button
              onClick={() => { setFilterOpen((v) => !v); setSortOpen(false); }}
              className="flex items-center gap-2 font-body text-sm font-medium tracking-[0.08em] uppercase px-4 py-2.5 transition-colors duration-200"
              style={{
                border: "1px solid rgba(30,30,30,0.2)",
                color: filterOpen ? "#DB4A2B" : "#1E1E1E",
                borderColor: filterOpen ? "#DB4A2B" : "rgba(30,30,30,0.2)",
              }}
            >
              <SlidersHorizontal size={14} />
              Filter
            </button>

            {/* Sort button */}
            <button
              onClick={() => { setSortOpen((v) => !v); setFilterOpen(false); }}
              className="flex items-center gap-2 font-body text-sm font-medium tracking-[0.08em] uppercase px-4 py-2.5 transition-colors duration-200"
              style={{
                border: "1px solid rgba(30,30,30,0.2)",
                color: sortOpen ? "#DB4A2B" : "#1E1E1E",
                borderColor: sortOpen ? "#DB4A2B" : "rgba(30,30,30,0.2)",
              }}
            >
              {selectedSort
                ? SORT_OPTIONS.find((o) => o.value === selectedSort)?.label
                : "Sort"}
              <ChevronDown size={14} />
            </button>

            {/* Active filter tag */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 font-body text-xs tracking-wider uppercase px-3 py-2"
                style={{ backgroundColor: "#DB4A2B", color: "#E4E2DD" }}
              >
                Clear <X size={12} />
              </button>
            )}
          </div>

          <p className="font-body text-xs text-muted tracking-widest uppercase hidden sm:block">
            {loading ? "Loading..." : `${totalItems} pieces`}
          </p>
        </div>

        {/* Filter dropdown */}
        {filterOpen && (
          <div
            className="absolute left-0 right-0 z-40 px-6 md:px-10 py-6"
            style={{
              backgroundColor: "#E4E2DD",
              borderBottom: "1px solid rgba(30,30,30,0.1)",
              top: "100%",
            }}
          >
            <div
              className="flex flex-col sm:flex-row gap-6 items-start sm:items-end"
              style={{ maxWidth: 1440, margin: "0 auto" }}
            >
              <div className="flex gap-4 flex-wrap">
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs tracking-[0.15em] uppercase" style={{ color: "#888888" }}>
                    Min Price
                  </label>
                  <input
                    type="number"
                    placeholder="$0"
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                    className="font-body text-sm px-3 py-2 w-28 outline-none transition-colors duration-200"
                    style={{
                      border: "1px solid rgba(30,30,30,0.2)",
                      backgroundColor: "transparent",
                      color: "#1E1E1E",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#1E1E1E")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(30,30,30,0.2)")}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs tracking-[0.15em] uppercase" style={{ color: "#888888" }}>
                    Max Price
                  </label>
                  <input
                    type="number"
                    placeholder="$999"
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                    className="font-body text-sm px-3 py-2 w-28 outline-none transition-colors duration-200"
                    style={{
                      border: "1px solid rgba(30,30,30,0.2)",
                      backgroundColor: "transparent",
                      color: "#1E1E1E",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#1E1E1E")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(30,30,30,0.2)")}
                  />
                </div>
              </div>

              <button
                onClick={applyFilters}
                className="btn-raw px-6 py-2.5 font-body text-sm font-bold tracking-[0.1em] uppercase shrink-0"
                style={{ backgroundColor: "#1E1E1E", color: "#E4E2DD" }}
              >
                <span>Apply</span>
              </button>
            </div>
          </div>
        )}

        {/* Sort dropdown */}
        {sortOpen && (
          <div
            className="absolute left-0 right-0 z-40 px-6 md:px-10 py-4"
            style={{
              backgroundColor: "#E4E2DD",
              borderBottom: "1px solid rgba(30,30,30,0.1)",
              top: "100%",
            }}
          >
            <div style={{ maxWidth: 1440, margin: "0 auto" }}>
              <div className="flex gap-3 flex-wrap">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSelectedSort(opt.value);
                      setFilters((f) => ({ ...f, sort: opt.value }));
                      setSortOpen(false);
                    }}
                    className="font-body text-sm tracking-[0.08em] uppercase px-4 py-2.5 transition-colors duration-200"
                    style={{
                      border: "1px solid rgba(30,30,30,0.2)",
                      backgroundColor:
                        selectedSort === opt.value ? "#1E1E1E" : "transparent",
                      color: selectedSort === opt.value ? "#E4E2DD" : "#1E1E1E",
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product grid */}
      <div
        className="px-6 md:px-10 py-12 md:py-16"
        style={{ maxWidth: 1440, margin: "0 auto" }}
      >
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-y-20">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div
                  className="w-full"
                  style={{
                    aspectRatio: "3/4",
                    backgroundColor: "rgba(30,30,30,0.08)",
                  }}
                />
                <div
                  className="h-4 mt-4 w-3/4"
                  style={{ backgroundColor: "rgba(30,30,30,0.08)" }}
                />
                <div
                  className="h-3 mt-2 w-1/3"
                  style={{ backgroundColor: "rgba(30,30,30,0.06)" }}
                />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-32 text-center">
            <p
              className="font-heading text-2xl uppercase"
              style={{ letterSpacing: "-0.04em", color: "rgba(30,30,30,0.3)" }}
            >
              No pieces found
            </p>
            <button
              onClick={clearFilters}
              className="mt-6 font-body text-sm underline underline-offset-4"
              style={{ color: "#DB4A2B" }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-y-20">
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={i < 3}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-20">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="font-body text-sm px-4 py-2.5 transition-colors duration-200 disabled:opacity-30"
              style={{ border: "1px solid rgba(30,30,30,0.2)", color: "#1E1E1E" }}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 ||
                  p === totalPages ||
                  Math.abs(p - currentPage) <= 1
              )
              .reduce<(number | "...")[]>((acc, p, i, arr) => {
                if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span
                    key={`dots-${i}`}
                    className="font-body text-sm px-2"
                    style={{ color: "#888888" }}
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => paginate(p as number)}
                    className="font-body text-sm w-10 h-10 flex items-center justify-center transition-colors duration-200"
                    style={{
                      border: "1px solid rgba(30,30,30,0.2)",
                      backgroundColor:
                        currentPage === p ? "#1E1E1E" : "transparent",
                      color: currentPage === p ? "#E4E2DD" : "#1E1E1E",
                    }}
                  >
                    {p}
                  </button>
                )
              )}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="font-body text-sm px-4 py-2.5 transition-colors duration-200 disabled:opacity-30"
              style={{ border: "1px solid rgba(30,30,30,0.2)", color: "#1E1E1E" }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen"
          style={{ backgroundColor: "#E4E2DD", paddingTop: 120 }}
        >
          <div className="px-6 md:px-10" style={{ maxWidth: 1440, margin: "0 auto" }}>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-16 mt-8">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div
                    className="w-full"
                    style={{ aspectRatio: "3/4", backgroundColor: "rgba(30,30,30,0.08)" }}
                  />
                  <div className="h-4 mt-4 w-3/4" style={{ backgroundColor: "rgba(30,30,30,0.08)" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
