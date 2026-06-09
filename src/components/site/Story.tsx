import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import story from "@/assets/story.jpg";

gsap.registerPlugin(ScrollTrigger);

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".story-img", {
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        yPercent: -15,
      });
      gsap.from(".story-line", {
        scrollTrigger: { trigger: ref.current, start: "top 65%" },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={ref} className="relative bg-coffee-deep text-cream py-24 md:py-36 overflow-hidden">
      <div className="px-6 md:px-10 grid grid-cols-12 gap-8 md:gap-16 items-center">
        <div className="col-span-12 md:col-span-5 relative overflow-hidden rounded-sm aspect-[4/5]">
          <img src={story} alt="Our roastery" loading="lazy" className="story-img w-full h-[120%] object-cover" />
        </div>
        <div className="col-span-12 md:col-span-7">
          <div className="story-line text-mono text-xs uppercase tracking-[0.25em] text-ember mb-6">/ Our Story</div>
          <h2 className="story-line text-display text-5xl md:text-7xl leading-[0.95] mb-10">
            Ten years of <span className="italic font-light text-ember-soft">chasing the bean.</span>
          </h2>
          <p className="story-line text-cream/70 text-lg leading-relaxed max-w-2xl mb-6">
            Flavour of Energy started in a converted bicycle shop with one drum
            roaster and a stubborn idea — that coffee should taste like the
            place it came from, not the place it was sold.
          </p>
          <p className="story-line text-cream/60 text-base leading-relaxed max-w-2xl">
            A decade later, we still buy direct from twelve farms across four
            continents. We still cup every batch by hand. And we still believe
            the best cup of coffee is the one you slow down for.
          </p>

          <div className="story-line grid grid-cols-3 gap-6 mt-14 hairline pt-8 border-t border-cream/15">
            {[
              { k: "12", v: "Direct Farms" },
              { k: "48h", v: "Roast to Ship" },
              { k: "10y", v: "Of Patience" },
            ].map((s) => (
              <div key={s.k}>
                <div className="text-display text-4xl md:text-5xl text-ember">{s.k}</div>
                <div className="text-mono text-[11px] uppercase tracking-[0.25em] text-cream/60 mt-2">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
