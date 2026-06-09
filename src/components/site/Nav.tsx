export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 mix-blend-difference">
      <div className="flex items-center justify-between px-6 md:px-10 py-5 text-cream">
        <a href="#top" className="text-mono text-xs uppercase tracking-[0.25em]">
          Flavour<span className="text-ember">.</span>of.energy
        </a>
        <nav className="hidden md:flex items-center gap-8 text-mono text-xs uppercase tracking-[0.25em]">
          <a href="#catalog" className="hover:text-ember transition">Catalog</a>
          <a href="#story" className="hover:text-ember transition">Story</a>
          <a href="#process" className="hover:text-ember transition">Process</a>
          <a href="#locations" className="hover:text-ember transition">Locations</a>
        </nav>
        <a
          href="#newsletter"
          className="text-mono text-xs uppercase tracking-[0.25em] border border-cream/40 rounded-full px-4 py-2 hover:bg-cream hover:text-ink transition"
        >
          Order →
        </a>
      </div>
    </header>
  );
}
