export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream/40 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-muted animate-fade-in">
          Curated Fragrance Decants
        </p>
        <h1 className="font-serif text-4xl font-light tracking-wide text-ink sm:text-6xl animate-slide-up text-balance">
          Discover Your
          <br />
          <span className="italic">Signature Scent</span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-muted animate-slide-up">
          Experience the world&apos;s finest fragrances in elegantly portioned
          decants. Luxury, redefined for the discerning nose.
        </p>
        <a
          href="#collection"
          className="mt-10 inline-block border border-ink px-8 py-3 text-xs uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:bg-ink hover:text-ivory"
        >
          Explore Collection
        </a>
      </div>
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sand/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-stone/20 blur-3xl" />
    </section>
  );
}
