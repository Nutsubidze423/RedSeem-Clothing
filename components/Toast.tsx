"use client";

import { useToastStore } from "@/lib/toastStore";

export default function ToastContainer() {
  const { toasts, dismiss } = useToastStore();

  return (
    <div
      className="fixed bottom-6 left-1/2 z-[300] flex flex-col items-center gap-2 pointer-events-none"
      style={{ transform: "translateX(-50%)" }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto cursor-pointer font-body text-xs tracking-[0.18em] uppercase px-6 py-3"
          style={{
            backgroundColor: "#1E1E1E",
            color: "#E4E2DD",
            animation: "slideUp 0.3s cubic-bezier(0.16,1,0.3,1) both",
            whiteSpace: "nowrap",
          }}
          onClick={() => dismiss(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
