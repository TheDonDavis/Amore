import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Received",
  description: "Your order request has been received.",
  robots: { index: false },
};

export default function OrderSuccessPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center">
      <div className="animate-fade-in">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-sand">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-accent"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="font-serif text-3xl font-light tracking-wide text-ink sm:text-4xl">
          Order Received
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
          Thank you for your order request. We&apos;ll review your selection and
          reach out shortly to confirm availability and delivery details.
        </p>

        <Link
          href="/#collection"
          className="mt-10 inline-block border border-ink px-8 py-3 text-xs uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:bg-ink hover:text-ivory"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
