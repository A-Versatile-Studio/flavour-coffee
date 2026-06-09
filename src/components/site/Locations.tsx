import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import shop from "@/assets/locations.jpg";

gsap.registerPlugin(ScrollTrigger);

const SHOPS = [
  { city: "Brooklyn", addr: "214 Bedford Ave", hrs: "07—19" },
  { city: "Lisbon", addr: "Rua das Flores 88", hrs: "08—20" },
  { city: "Kyoto", addr: "Sanjo-dori 14", hrs: "09—18" },
];

export function Locations() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".loc-row", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="locations" ref={ref} className="bg-cream-soft py-24 md:py-36">
      <div className="px-6 md:px-10 grid grid-cols-12 gap-8 md:gap-12 items-start">
        <div className="col-span-12 md:col-span-5">
          <div className="text-mono text-xs uppercase tracking-[0.25em] text-ember mb-4">/ Visit Us</div>
          <h2 className="text-display text-6xl md:text-[7vw] text-ink mb-10 leading-[0.9]">
            Three rooms. <span className="italic font-light text-coffee">One ritual.</span>
          </h2>
          <div className="hairline">
            {SHOPS.map((s) => (
              <div key={s.city} className="loc-row border-b border-border py-6 grid grid-cols-12 items-baseline gap-3 hover:text-ember transition-colors cursor-pointer">
                <h3 className="col-span-5 text-display text-3xl md:text-4xl">{s.city}</h3>
                <p className="col-span-5 text-mono text-xs uppercase tracking-[0.2em] text-ink/60">{s.addr}</p>
                <p className="col-span-2 text-mono text-xs uppercase tracking-[0.2em] text-ink/50 text-right">{s.hrs}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-12 md:col-span-7 relative aspect-[16/11] overflow-hidden rounded-sm">
          <img src={shop} alt="Inside our café" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 bg-cream text-ink text-mono text-[10px] uppercase tracking-[0.25em] px-3 py-2">
            Flagship · Brooklyn
          </div>
        </div>
      </div>
    </section>
  );
}
