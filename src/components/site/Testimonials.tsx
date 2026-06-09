import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const QUOTES = [
  { q: "The closest thing to a meditation I've had in a busy week.", a: "Mira K.", r: "Subscriber, 3 years" },
  { q: "Ember Espresso ruined every other espresso for me. No regrets.", a: "Daniel O.", r: "Café owner" },
  { q: "You can taste the care. It's quiet. It's loud. It's perfect.", a: "Aisha P.", r: "Food writer" },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".quote", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-ember text-cream py-24 md:py-36">
      <div className="px-6 md:px-10">
        <div className="text-mono text-xs uppercase tracking-[0.25em] text-cream/70 mb-6">/ Voices</div>
        <h2 className="text-display text-5xl md:text-7xl mb-20 max-w-4xl">
          What the morning <span className="italic font-light">people say.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {QUOTES.map((t, i) => (
            <figure key={i} className="quote border-t border-cream/30 pt-8">
              <div className="text-display text-6xl leading-none mb-6 text-cream/40">"</div>
              <blockquote className="text-display text-2xl md:text-3xl leading-snug mb-8">
                {t.q}
              </blockquote>
              <figcaption className="text-mono text-xs uppercase tracking-[0.25em] text-cream/80">
                {t.a} · <span className="text-cream/50">{t.r}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
