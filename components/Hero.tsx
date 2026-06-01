export default function Hero() {
  return (
    <section className="text-center py-40">
      <h1 className="text-9xl mb-4">Hari's Lab</h1>

      <div className="flex items-center justify-center gap-4 my-8">
        <div className="w-24 h-px bg-[var(--gold)] opacity-40" />
        <span className="text-[var(--gold)] text-xl">✦</span>
        <div className="w-24 h-px bg-[var(--gold)] opacity-40" />
      </div>

      {/* <p className="text-2xl text-[var(--muted)] italic">
        Quiet knowledge for curious minds.
      </p> */}
      <p className="max-w-2xl mx-auto mt-8 text-lg text-[var(--muted)] leading-relaxed">
        A growing collection of books, experiments, sketches,
        observations and things worth preserving.
      </p>
    </section>
  );
}
