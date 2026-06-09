import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mug1 from "@/assets/mug-1.png";
import mug2 from "@/assets/mug-2.png";
import mug3 from "@/assets/mug-3.png";
import beans from "@/assets/beans.png";

gsap.registerPlugin(ScrollTrigger);

const COFFEES = [
  { n: "01", name: "Ember Espresso", origin: "Ethiopia, Yirgacheffe", notes: "Blood orange · Cocoa · Jasmine", price: "$18", img: mug1 },
  { n: "02", name: "Cream of Dawn", origin: "Colombia, Huila", notes: "Caramel · Almond · Honey", price: "$16", img: mug2 },
  { n: "03", name: "Iced Reverie", origin: "Kenya, Nyeri", notes: "Black currant · Lime · Brown sugar", price: "$17", img: mug3 },
  { n: "04", name: "Midnight Roast", origin: "Sumatra, Mandheling", notes: "Dark chocolate · Tobacco · Earth", price: "$19", img: beans },
  { n: "05", name: "Sunrise Blend", origin: "Guatemala, Antigua", notes: "Toffee · Apricot · Spice", price: "$17", img: mug1 },
  { n: "06", name: "Velvet Hour", origin: "Brazil, Cerrado", notes: "Hazelnut · Milk chocolate · Vanilla", price: "$15", img: mug2 },
  { n: "07", name: "Copper Sun", origin: "Costa Rica, Tarrazú", notes: "Red apple · Maple · Citrus zest", price: "$18", img: mug3 },
  { n: "08", name: "Quiet Ritual", origin: "Rwanda, Nyamasheke", notes: "Peach · Black tea · Cane sugar", price: "$20", img: mug2 },
  { n: "09", name: "Cinder & Smoke", origin: "Honduras, Marcala", notes: "Molasses · Walnut · Dried fig", price: "$17", img: mug1 },
];

export function Catalog() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cat-row", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.06,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="catalog" ref={ref} className="bg-cream py-24 md:py-36">
      <div className="px-6 md:px-10">
        <div className="flex items-end justify-between mb-16 md:mb-24">
          <div>
            <div className="text-mono text-xs uppercase tracking-[0.25em] text-ember mb-4">/ The Catalog</div>
            <h2 className="text-display text-6xl md:text-[9vw] text-ink">
              Nine <span className="italic font-light text-coffee">roasts.</span>
            </h2>
          </div>
          <div className="hidden md:block text-mono text-xs uppercase tracking-[0.25em] text-ink/50 max-w-xs text-right">
            A rotating selection. Each bag roasted within 48 hours of shipping.
          </div>
        </div>

        <div className="hairline">
          {COFFEES.map((c, i) => (
            <article
              key={c.n}
              className="cat-row group grid grid-cols-12 gap-4 items-center py-6 md:py-8 border-b border-border hover:bg-cream-soft transition-colors px-2 md:px-4 cursor-pointer relative"
            >
              <span className="col-span-2 md:col-span-1 text-mono text-xs uppercase tracking-[0.25em] text-ink/40">
                {c.n}
              </span>
              <h3 className="col-span-10 md:col-span-4 text-display text-3xl md:text-5xl text-ink group-hover:text-ember transition-colors">
                {c.name}
              </h3>
              <span className="col-span-6 md:col-span-3 text-mono text-xs uppercase tracking-[0.2em] text-ink/60">
                {c.origin}
              </span>
              <span className="hidden md:block col-span-3 text-sm text-ink/70 italic">{c.notes}</span>
              <span className="col-span-6 md:col-span-1 text-display text-2xl md:text-3xl text-right text-ink">
                {c.price}
              </span>

              {/* hover preview image */}
              <img
                src={c.img}
                alt=""
                className="pointer-events-none absolute right-32 top-1/2 -translate-y-1/2 w-28 md:w-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
              />
              {i % 3 === 0 && (
                <span className="absolute right-1 top-3 text-mono text-[9px] uppercase tracking-[0.3em] text-ember">★</span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
