"use client";

import { useToastStore } from "@/context/toast-store";
import { cn } from "@/lib/utils";

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "animate-toast-in flex items-center gap-3 rounded-sm px-5 py-3 shadow-lg backdrop-blur-sm transition-all",
            toast.type === "success" && "bg-ink text-ivory",
            toast.type === "info" && "bg-cream text-ink border border-sand",
            toast.type === "error" && "bg-charcoal text-ivory"
          )}
          role="status"
        >
          <span className="text-sm tracking-wide">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 text-xs opacity-60 transition-opacity hover:opacity-100"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
