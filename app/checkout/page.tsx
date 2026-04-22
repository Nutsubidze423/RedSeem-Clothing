"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Check } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useAuthStore } from "@/lib/authStore";

const DELIVERY_FEE = 5;

interface FormData {
  name: string;
  surname: string;
  email: string;
  address: string;
  city: string;
  zip: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Required";
  if (!data.surname.trim()) errors.surname = "Required";
  if (!data.email.trim()) errors.email = "Required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Invalid email";
  if (!data.address.trim()) errors.address = "Required";
  if (!data.city.trim()) errors.city = "Required";
  if (!data.zip.trim()) errors.zip = "Required";
  return errors;
}

export default function CheckoutPage() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const { items, subtotal, clearCart } = useCartStore();
  const sub = subtotal();
  const total = sub + DELIVERY_FEE;

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login?redirect=/checkout");
    }
  }, [isLoggedIn, router]);

  const [form, setForm] = useState<FormData>({
    name: "",
    surname: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((err) => ({ ...err, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSuccess(true);
    clearCart();
    setSubmitting(false);
  }

  const isValid = Object.keys(validate(form)).length === 0;

  if (success) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ backgroundColor: "#E4E2DD", paddingTop: 80 }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-8"
          style={{ backgroundColor: "#1E1E1E" }}
        >
          <Check size={28} style={{ color: "#E4E2DD" }} strokeWidth={2} />
        </div>
        <h1
          className="font-heading font-bold uppercase"
          style={{
            fontSize: "clamp(32px, 6vw, 80px)",
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
            color: "#1E1E1E",
          }}
        >
          ORDER
          <br />
          PLACED
        </h1>
        <p
          className="font-body text-sm mt-6 leading-relaxed"
          style={{ color: "rgba(30,30,30,0.6)", maxWidth: 360 }}
        >
          We got it. You&apos;ll receive a confirmation email at{" "}
          <strong>{form.email}</strong> shortly.
        </p>
        <Link
          href="/shop"
          className="btn-raw mt-10 px-8 py-4 font-body font-bold text-sm tracking-[0.1em] uppercase"
          style={{ backgroundColor: "#1E1E1E", color: "#E4E2DD" }}
        >
          <span>Continue Shopping</span>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#E4E2DD", minHeight: "100vh" }}>
      <div
        className="px-6 md:px-10 pt-28 pb-20"
        style={{ maxWidth: 1440, margin: "0 auto" }}
      >
        {/* Back */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 font-body text-xs tracking-[0.15em] uppercase mb-10 transition-colors duration-200"
          style={{ color: "#888888" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1E1E1E")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#888888")}
        >
          <ChevronLeft size={14} />
          Back to Shop
        </Link>

        <h1
          className="font-heading font-bold uppercase mb-12"
          style={{
            fontSize: "clamp(36px, 6vw, 80px)",
            letterSpacing: "-0.05em",
            lineHeight: 0.85,
            color: "#1E1E1E",
          }}
        >
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 flex flex-col gap-6"
            noValidate
          >
            <h2
              className="font-body text-xs tracking-[0.2em] uppercase pb-4"
              style={{
                color: "#888888",
                borderBottom: "1px solid rgba(30,30,30,0.1)",
              }}
            >
              Shipping Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                label="First Name"
                name="name"
                value={form.name}
                error={errors.name}
                onChange={handleChange}
              />
              <Field
                label="Last Name"
                name="surname"
                value={form.surname}
                error={errors.surname}
                onChange={handleChange}
              />
            </div>

            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              error={errors.email}
              onChange={handleChange}
            />
            <Field
              label="Street Address"
              name="address"
              value={form.address}
              error={errors.address}
              onChange={handleChange}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                label="City"
                name="city"
                value={form.city}
                error={errors.city}
                onChange={handleChange}
              />
              <Field
                label="ZIP Code"
                name="zip"
                value={form.zip}
                error={errors.zip}
                onChange={handleChange}
              />
            </div>

            {/* Payment placeholder */}
            <div>
              <h2
                className="font-body text-xs tracking-[0.2em] uppercase pb-4 mt-4"
                style={{
                  color: "#888888",
                  borderBottom: "1px solid rgba(30,30,30,0.1)",
                }}
              >
                Payment
              </h2>
              <div
                className="mt-5 p-4 flex items-center gap-3"
                style={{ border: "1px solid rgba(30,30,30,0.15)", backgroundColor: "rgba(30,30,30,0.03)" }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#DB4A2B" }}
                />
                <p className="font-body text-sm" style={{ color: "rgba(30,30,30,0.5)" }}>
                  Demo mode — no real payment required
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid || submitting || items.length === 0}
              className="btn-raw mt-4 py-4 w-full font-body font-bold text-sm tracking-[0.1em] uppercase disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#1E1E1E", color: "#E4E2DD" }}
            >
              <span>
                {submitting
                  ? "Processing..."
                  : `Place Order — $${total.toFixed(2)}`}
              </span>
            </button>
          </form>

          {/* Order summary */}
          <aside className="lg:col-span-5">
            <h2
              className="font-body text-xs tracking-[0.2em] uppercase pb-4 mb-6"
              style={{
                color: "#888888",
                borderBottom: "1px solid rgba(30,30,30,0.1)",
              }}
            >
              Order Summary ({items.length} items)
            </h2>

            {items.length === 0 ? (
              <div className="py-12 text-center">
                <p
                  className="font-body text-sm"
                  style={{ color: "rgba(30,30,30,0.4)" }}
                >
                  Your cart is empty.
                </p>
                <Link
                  href="/shop"
                  className="font-body text-sm underline underline-offset-4 mt-3 inline-block"
                  style={{ color: "#DB4A2B" }}
                >
                  Shop now
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex flex-col gap-5 mb-8">
                  {items.map((item) => (
                    <li
                      key={`${item.id}-${item.color}-${item.size}`}
                      className="flex gap-4"
                    >
                      <div
                        className="relative shrink-0 overflow-hidden"
                        style={{
                          width: 72,
                          height: 90,
                          backgroundColor: "rgba(30,30,30,0.04)",
                        }}
                      >
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="72px"
                          />
                        )}
                        <span
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center font-body text-[10px] font-bold"
                          style={{ backgroundColor: "#1E1E1E", color: "#E4E2DD" }}
                        >
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-body text-sm font-bold tracking-wider uppercase">
                          {item.name}
                        </p>
                        <p className="font-body text-xs mt-0.5" style={{ color: "#888888" }}>
                          {item.color} · {item.size}
                        </p>
                        <p className="font-body text-sm font-medium mt-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div
                  className="space-y-3 pt-6"
                  style={{ borderTop: "1px solid rgba(30,30,30,0.1)" }}
                >
                  <div className="flex justify-between font-body text-sm" style={{ color: "#888888" }}>
                    <span>Subtotal</span>
                    <span>${sub.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm" style={{ color: "#888888" }}>
                    <span>Delivery</span>
                    <span>${DELIVERY_FEE.toFixed(2)}</span>
                  </div>
                  <div
                    className="flex justify-between font-body text-sm font-bold pt-3"
                    style={{ borderTop: "1px solid rgba(30,30,30,0.1)", color: "#1E1E1E" }}
                  >
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  error,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="font-body text-xs tracking-[0.15em] uppercase"
        style={{ color: error ? "#DB4A2B" : "#888888" }}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="font-body text-sm px-4 py-3 outline-none w-full transition-colors duration-200"
        style={{
          border: `1px solid ${error ? "#DB4A2B" : "rgba(30,30,30,0.2)"}`,
          backgroundColor: "transparent",
          color: "#1E1E1E",
        }}
        onFocus={(e) => {
          if (!error) e.currentTarget.style.borderColor = "#1E1E1E";
        }}
        onBlur={(e) => {
          if (!error) e.currentTarget.style.borderColor = "rgba(30,30,30,0.2)";
        }}
      />
      {error && (
        <p className="font-body text-xs" style={{ color: "#DB4A2B" }}>
          {error}
        </p>
      )}
    </div>
  );
}
