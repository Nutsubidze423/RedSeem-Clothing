"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useAuthStore } from "@/lib/authStore";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";
  const register = useAuthStore((s) => s.register);

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Required";
    else if (form.password.length < 6) e.password = "Min 6 characters";
    if (!form.confirm) e.confirm = "Required";
    else if (form.confirm !== form.password) e.confirm = "Passwords don't match";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    register(form.name.trim(), form.email.trim(), form.password);
    router.push(redirect);
  }

  function field(key: keyof typeof form, label: string, type = "text") {
    const hasErr = !!errors[key];
    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={key}
          className="font-body text-xs tracking-[0.15em] uppercase"
          style={{ color: hasErr ? "#DB4A2B" : "#888888" }}
        >
          {label}
        </label>
        <input
          id={key}
          type={type}
          value={form[key]}
          onChange={(e) => {
            setForm((f) => ({ ...f, [key]: e.target.value }));
            if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
          }}
          className="font-body text-sm px-4 py-3 outline-none w-full transition-colors duration-200"
          style={{
            border: `1px solid ${hasErr ? "#DB4A2B" : "rgba(30,30,30,0.2)"}`,
            backgroundColor: "transparent",
            color: "#1E1E1E",
          }}
          onFocus={(e) => { if (!hasErr) e.currentTarget.style.borderColor = "#1E1E1E"; }}
          onBlur={(e) => { if (!hasErr) e.currentTarget.style.borderColor = "rgba(30,30,30,0.2)"; }}
        />
        {hasErr && (
          <p className="font-body text-xs" style={{ color: "#DB4A2B" }}>{errors[key]}</p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full" noValidate>
      {field("name", "Full Name")}
      {field("email", "Email", "email")}
      {field("password", "Password", "password")}
      {field("confirm", "Confirm Password", "password")}

      <button
        type="submit"
        disabled={submitting}
        className="btn-raw mt-2 py-4 w-full font-body font-bold text-sm tracking-[0.1em] uppercase disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ backgroundColor: "#1E1E1E", color: "#E4E2DD" }}
      >
        <span>{submitting ? "Creating account..." : "Create Account"}</span>
      </button>

      <p className="font-body text-xs text-center" style={{ color: "#888888" }}>
        Already have an account?{" "}
        <Link
          href={`/login${redirect !== "/" ? `?redirect=${redirect}` : ""}`}
          className="font-medium transition-colors duration-200 inline-flex items-center gap-1"
          style={{ color: "#DB4A2B" }}
        >
          Sign in <ArrowRight size={12} />
        </Link>
      </p>
    </form>
  );
}

export default function RegisterPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "#E4E2DD", paddingTop: 80 }}
    >
      <div className="w-full" style={{ maxWidth: 420 }}>
        <p
          className="font-body text-xs tracking-[0.25em] uppercase mb-4"
          style={{
            color: "rgba(30,30,30,0.4)",
            opacity: 0,
            animation: "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both",
          }}
        >
          Join the movement
        </p>
        <h1
          className="font-heading font-bold uppercase mb-10"
          style={{
            fontSize: "clamp(36px, 7vw, 80px)",
            letterSpacing: "-0.05em",
            lineHeight: 0.85,
            color: "#1E1E1E",
            opacity: 0,
            animation: "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s both",
          }}
        >
          CREATE
          <br />
          ACCOUNT
        </h1>
        <div
          style={{
            opacity: 0,
            animation: "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s both",
          }}
        >
          <Suspense>
            <RegisterForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
