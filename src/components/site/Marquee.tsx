export function Marquee() {
  const words = ["Single Origin", "Small Batch", "Slow Roasted", "Hand Poured", "Ethically Sourced", "Brewed Daily"];
  return (
    <section className="bg-ink text-cream py-10 overflow-hidden border-y border-coffee">
      <div className="marquee-track text-display text-6xl md:text-8xl">
        {[...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className={i % 2 === 1 ? "italic text-ember font-light" : ""}>{w}</span>
            <span className="text-ember">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
