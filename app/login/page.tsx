"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useAuthStore } from "@/lib/authStore";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    const ok = login(email, password);
    if (!ok) {
      setError("Invalid email address.");
      setSubmitting(false);
      return;
    }
    router.push(redirect);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full" noValidate>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="font-body text-xs tracking-[0.15em] uppercase"
          style={{ color: error ? "#DB4A2B" : "#888888" }}
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          className="font-body text-sm px-4 py-3 outline-none w-full transition-colors duration-200"
          style={{
            border: `1px solid ${error ? "#DB4A2B" : "rgba(30,30,30,0.2)"}`,
            backgroundColor: "transparent",
            color: "#1E1E1E",
          }}
          onFocus={(e) => { if (!error) e.currentTarget.style.borderColor = "#1E1E1E"; }}
          onBlur={(e) => { if (!error) e.currentTarget.style.borderColor = "rgba(30,30,30,0.2)"; }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="font-body text-xs tracking-[0.15em] uppercase"
          style={{ color: "#888888" }}
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(""); }}
          className="font-body text-sm px-4 py-3 outline-none w-full transition-colors duration-200"
          style={{
            border: "1px solid rgba(30,30,30,0.2)",
            backgroundColor: "transparent",
            color: "#1E1E1E",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#1E1E1E")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(30,30,30,0.2)")}
        />
      </div>

      {error && (
        <p className="font-body text-xs" style={{ color: "#DB4A2B" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-raw mt-2 py-4 w-full font-body font-bold text-sm tracking-[0.1em] uppercase disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ backgroundColor: "#1E1E1E", color: "#E4E2DD" }}
      >
        <span>{submitting ? "Signing in..." : "Sign In"}</span>
      </button>

      <p className="font-body text-xs text-center" style={{ color: "#888888" }}>
        No account?{" "}
        <Link
          href={`/register${redirect !== "/" ? `?redirect=${redirect}` : ""}`}
          className="font-medium transition-colors duration-200 inline-flex items-center gap-1"
          style={{ color: "#DB4A2B" }}
        >
          Create one <ArrowRight size={12} />
        </Link>
      </p>
    </form>
  );
}

export default function LoginPage() {
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
          Welcome back
        </p>
        <h1
          className="font-heading font-bold uppercase mb-10"
          style={{
            fontSize: "clamp(40px, 8vw, 80px)",
            letterSpacing: "-0.05em",
            lineHeight: 0.85,
            color: "#1E1E1E",
            opacity: 0,
            animation: "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s both",
          }}
        >
          SIGN
          <br />
          IN
        </h1>
        <div
          style={{
            opacity: 0,
            animation: "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s both",
          }}
        >
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
