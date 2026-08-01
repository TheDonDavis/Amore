import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="font-serif text-4xl font-light tracking-wide text-ink">
        404
      </h1>
      <p className="mt-4 text-sm text-muted">This page could not be found.</p>
      <Link
        href="/"
        className="mt-8 border border-ink px-8 py-3 text-xs uppercase tracking-[0.2em] text-ink transition-all hover:bg-ink hover:text-ivory"
      >
        Return Home
      </Link>
    </div>
  );
}
