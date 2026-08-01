const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "Élan Decants";

export default function Footer() {
  return (
    <footer className="border-t border-sand/60 bg-cream/50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="font-serif text-2xl tracking-[0.12em] text-ink">
            {brandName}
          </p>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Curated fragrance decants, hand-poured with care. Discover luxury
            scents in perfectly sized portions.
          </p>
          <div className="mt-4 flex gap-8 text-xs uppercase tracking-[0.15em] text-muted">
            <span>Jamaica</span>
            <span>·</span>
            <span>Hand-Poured Decants</span>
          </div>
          <p className="mt-8 text-[11px] tracking-wide text-stone">
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
