"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";

const DELIVERY_FEE = 5;

export default function CartPanel() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    totalItems,
  } = useCartStore();

  const sub = subtotal();
  const total = sub + DELIVERY_FEE;

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className="fixed inset-0 z-[60] bg-primary/30 transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "all" : "none" }}
      />

      {/* Panel */}
      <aside
        className="fixed top-0 right-0 h-full z-[70] flex flex-col"
        style={{
          width: "min(100vw, 440px)",
          backgroundColor: "#E4E2DD",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          borderLeft: "1px solid rgba(30,30,30,0.08)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-primary/10">
          <h2 className="font-heading text-lg font-bold tracking-[-0.02em] uppercase">
            Cart ({totalItems()})
          </h2>
          <button
            onClick={closeCart}
            className="text-primary/50 hover:text-primary transition-colors"
            aria-label="Close cart"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
              <ShoppingBag size={40} strokeWidth={1} className="text-primary/20" />
              <p className="font-body text-sm text-muted tracking-widest uppercase">
                Nothing here yet
              </p>
              <button
                onClick={closeCart}
                className="font-body text-sm font-medium text-accent underline underline-offset-4"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li
                  key={`${item.id}-${item.color}-${item.size}`}
                  className="flex gap-4"
                >
                  <div
                    className="relative shrink-0 rounded-none overflow-hidden bg-primary/5"
                    style={{ width: 80, height: 100 }}
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10" />
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="font-body text-sm font-medium tracking-wider uppercase leading-tight">
                        {item.name}
                      </p>
                      <p className="font-body text-xs text-muted mt-0.5">
                        {item.color} · {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.color, item.size, item.quantity - 1)
                          }
                          className="text-primary/50 hover:text-primary transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-body text-sm font-medium w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.color, item.size, item.quantity + 1)
                          }
                          className="text-primary/50 hover:text-primary transition-colors"
                          aria-label="Increase quantity"
                          disabled={item.quantity >= 10}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-body text-sm font-medium">
                          ${(item.price * item.quantity).toFixed(0)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id, item.color, item.size)}
                          className="text-primary/30 hover:text-accent transition-colors text-xs tracking-widest uppercase"
                          aria-label="Remove item"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Summary */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-primary/10">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between font-body text-sm text-muted">
                <span>Subtotal</span>
                <span>${sub.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-body text-sm text-muted">
                <span>Delivery</span>
                <span>${DELIVERY_FEE.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-body text-sm font-bold pt-2 border-t border-primary/10">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-raw w-full flex items-center justify-center px-6 py-4 font-body font-bold text-sm tracking-[0.1em] uppercase"
              style={{ backgroundColor: "#1E1E1E", color: "#E4E2DD" }}
            >
              <span>Checkout — ${total.toFixed(2)}</span>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
