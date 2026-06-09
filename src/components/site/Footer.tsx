export function Footer() {
  return (
    <footer className="bg-ink text-cream/70 pt-16 pb-10">
      <div className="px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2">
            <div className="text-display text-5xl md:text-7xl text-cream leading-none">
              Flavour<span className="text-ember">.</span>
            </div>
            <p className="mt-4 text-sm max-w-sm">Coffee for slow mornings and louder afternoons. Roasted in Brooklyn.</p>
          </div>
          <div>
            <div className="text-mono text-[11px] uppercase tracking-[0.25em] text-ember mb-4">Shop</div>
            <ul className="space-y-2 text-sm">
              <li>Catalog</li><li>Subscriptions</li><li>Brewing Gear</li><li>Gift Cards</li>
            </ul>
          </div>
          <div>
            <div className="text-mono text-[11px] uppercase tracking-[0.25em] text-ember mb-4">Studio</div>
            <ul className="space-y-2 text-sm">
              <li>Our Story</li><li>Wholesale</li><li>Journal</li><li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="hairline border-t border-cream/15 pt-6 flex flex-col md:flex-row justify-between text-mono text-[11px] uppercase tracking-[0.25em] text-cream/40">
          <span>© {new Date().getFullYear()} Flavour of Energy</span>
          <span>Brooklyn · Lisbon · Kyoto</span>
        </div>
      </div>
    </footer>
  );
}
