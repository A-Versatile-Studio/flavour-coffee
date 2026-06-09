import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section id="newsletter" className="bg-ink text-cream py-24 md:py-36 relative overflow-hidden">
      <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] ember-shape opacity-90" />
      <div className="px-6 md:px-10 relative">
        <div className="text-mono text-xs uppercase tracking-[0.25em] text-ember mb-6">/ Stay Close</div>
        <h2 className="text-display text-6xl md:text-[8vw] leading-[0.9] max-w-5xl mb-12">
          A letter, <span className="italic font-light text-ember">monthly.</span>
        </h2>
        <p className="text-cream/60 max-w-xl text-lg mb-10">
          New roasts, brewing notes, and the occasional farm story. No noise.
        </p>

        {done ? (
          <div className="text-display text-3xl text-ember">Welcome to the morning. ✦</div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}
            className="flex flex-col md:flex-row gap-3 max-w-2xl border-b border-cream/30 pb-4"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent text-cream text-xl md:text-2xl placeholder:text-cream/30 focus:outline-none py-3"
            />
            <button
              type="submit"
              className="text-mono text-xs uppercase tracking-[0.25em] bg-ember text-cream rounded-full px-6 py-3 hover:bg-cream hover:text-ink transition self-start md:self-center"
            >
              Subscribe →
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
