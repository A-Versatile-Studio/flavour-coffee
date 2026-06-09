import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ethiopia from "@/assets/origin-ethiopia.jpg";
import colombia from "@/assets/origin-colombia.jpg";
import kenya from "@/assets/origin-kenya.jpg";
import sumatra from "@/assets/origin-sumatra.jpg";
import brazil from "@/assets/origin-brazil.jpg";

gsap.registerPlugin(ScrollTrigger);

const ORIGINS = [
  {
    country: "Ethiopia",
    region: "Yirgacheffe",
    farmer: "Aida Batlle Collective",
    altitude: "1,950 m",
    process: "Washed",
    notes: "Jasmine · Bergamot · Stone fruit",
    img: ethiopia,
  },
  {
    country: "Colombia",
    region: "Huila",
    farmer: "Finca El Paraíso",
    altitude: "1,750 m",
    process: "Honey",
    notes: "Caramel · Red apple · Almond",
    img: colombia,
  },
  {
    country: "Kenya",
    region: "Nyeri",
    farmer: "Gichathaini Co-op",
    altitude: "1,820 m",
    process: "Washed",
    notes: "Blackcurrant · Lime · Cane sugar",
    img: kenya,
  },
  {
    country: "Sumatra",
    region: "Lintong",
    farmer: "Ketiara Cooperative",
    altitude: "1,400 m",
    process: "Wet-hulled",
    notes: "Cedar · Dark cocoa · Tobacco",
    img: sumatra,
  },
  {
    country: "Brazil",
    region: "Cerrado",
    farmer: "Fazenda Santa Inês",
    altitude: "1,100 m",
    process: "Natural",
    notes: "Hazelnut · Milk chocolate · Vanilla",
    img: brazil,
  },
];

export function Origins() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".or-head", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });

      // Horizontal drift on the track based on scroll
      if (trackRef.current && ref.current) {
        const track = trackRef.current;
        const distance = () => track.scrollWidth - track.clientWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => "+=" + distance(),
            scrub: 0.8,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="origins"
      ref={ref}
      className="bg-cream-soft py-24 md:py-32 border-t border-border overflow-hidden"
    >
      <div className="px-6 md:px-10">
        <div className="or-head flex items-end justify-between mb-12 md:mb-16 flex-wrap gap-6">
          <div>
            <div className="text-mono text-xs uppercase tracking-[0.25em] text-ember mb-4">
              / From the Origin
            </div>
            <h2 className="text-display text-6xl md:text-[8vw] text-ink leading-[0.9]">
              Five farms. <span className="italic font-light text-coffee">One promise.</span>
            </h2>
          </div>
          <div className="text-mono text-xs uppercase tracking-[0.25em] text-ink/50 max-w-xs">
            Scroll to travel. Each card is a direct trade relationship — no middlemen, no shortcuts.
          </div>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex gap-6 md:gap-8 pl-6 md:pl-10 pr-[40vw] will-change-transform"
      >
        {ORIGINS.map((o, i) => (
          <article
            key={o.country}
            className="shrink-0 w-[78vw] md:w-[520px] bg-cream rounded-3xl overflow-hidden shadow-lg border border-border"
          >
            <div className="relative h-[300px] md:h-[360px] overflow-hidden">
              <img
                src={o.img}
                alt={`${o.country}, ${o.region}`}
                className="w-full h-full object-cover"
                loading="lazy"
                width={1024}
                height={1024}
              />
              <div className="absolute top-4 left-4 bg-ink/80 text-cream text-mono text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-full">
                №. 0{i + 1}
              </div>
              <div className="absolute bottom-4 right-4 bg-ember text-cream text-mono text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-full">
                {o.process}
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-baseline justify-between mb-4">
                <div className="text-display text-4xl md:text-5xl text-ink">
                  {o.country}
                </div>
                <div className="text-mono text-xs uppercase tracking-[0.25em] text-ink/50">
                  {o.altitude}
                </div>
              </div>
              <div className="text-mono text-[11px] uppercase tracking-[0.25em] text-coffee mb-4">
                {o.region} · {o.farmer}
              </div>
              <div className="border-t border-border pt-4">
                <div className="text-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 mb-1">
                  In the cup
                </div>
                <div className="text-base md:text-lg text-ink/85">{o.notes}</div>
              </div>
            </div>
          </article>
        ))}
        <div className="shrink-0 w-[20vw]" />
      </div>
    </section>
  );
}
