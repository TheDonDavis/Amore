import type { Metadata } from "next";
import CheckoutForm from "./CheckoutForm";

export const metadata: Metadata = {
  title: "Request Order",
  description: "Submit your fragrance decant order request.",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-serif text-3xl font-light tracking-wide text-ink">
          Request Order
        </h1>
        <p className="mt-2 text-sm text-muted">
          Complete the form below and we&apos;ll be in touch to confirm your order.
        </p>
        <CheckoutForm />
      </div>
    </div>
  );
}
