"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/context/cart-store";
import { JAMAICA_PARISHES } from "@/lib/parishes";
import { formatPrice } from "@/lib/utils";
import type { CustomerDetails } from "@/lib/types";

export default function CheckoutForm() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const total = getTotal();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<CustomerDetails>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    parish: "",
    notes: "",
  });

  if (items.length === 0) {
    return (
      <div className="mt-12 text-center">
        <p className="text-sm text-muted">Your cart is empty.</p>
        <button
          onClick={() => router.push("/#collection")}
          className="mt-4 text-xs uppercase tracking-[0.15em] text-ink underline underline-offset-4"
        >
          Browse collection
        </button>
      </div>
    );
  }

  const update = (field: keyof CustomerDetails, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items,
          total,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit order");
      }

      clearCart();
      router.push("/order-success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-sand bg-ivory px-4 py-3 text-sm text-ink placeholder:text-stone transition-colors focus:border-accent focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="mt-12 grid gap-12 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <h2 className="text-xs uppercase tracking-[0.15em] text-muted">
          Your Details
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs text-muted">Full Name *</label>
            <input
              required
              type="text"
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-muted">Email *</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-muted">
              Phone / WhatsApp *
            </label>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs text-muted">
              Delivery Address *
            </label>
            <input
              required
              type="text"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-muted">
              Parish / Region *
            </label>
            <select
              required
              value={form.parish}
              onChange={(e) => update("parish", e.target.value)}
              className={inputClass}
            >
              <option value="">Select parish</option>
              {JAMAICA_PARISHES.map((parish) => (
                <option key={parish} value={parish}>
                  {parish}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs text-muted">
              Order Notes (optional)
            </label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              className={inputClass}
              placeholder="Any special requests or delivery instructions..."
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-700">{error}</p>
        )}
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-24 border border-sand/60 bg-cream/30 p-6">
          <h2 className="text-xs uppercase tracking-[0.15em] text-muted">
            Order Summary
          </h2>

          <ul className="mt-6 space-y-4">
            {items.map((item) => (
              <li
                key={`${item.productId}-${item.size}`}
                className="flex justify-between text-sm"
              >
                <span className="text-ink">
                  {item.name}{" "}
                  <span className="text-muted">
                    ({item.size}) × {item.quantity}
                  </span>
                </span>
                <span className="text-ink">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between border-t border-sand/60 pt-4">
            <span className="text-xs uppercase tracking-[0.15em] text-muted">
              Total
            </span>
            <span className="font-serif text-xl text-ink">
              {formatPrice(total)}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-ink py-4 text-xs uppercase tracking-[0.2em] text-ivory transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Order Request"}
          </button>

          <p className="mt-4 text-center text-[11px] leading-relaxed text-stone">
            We&apos;ll contact you to confirm availability and arrange delivery.
          </p>
        </div>
      </div>
    </form>
  );
}
