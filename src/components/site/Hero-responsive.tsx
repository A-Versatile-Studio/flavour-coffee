import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import heroMug from "@/assets/hero-mug.png";
import mug1 from "@/assets/mug-1.png";
import mug2 from "@/assets/mug-2.png";
import mug3 from "@/assets/mug-3.png";
import mug4 from "@/assets/mug-4.png";
import mug5 from "@/assets/mug-5.png";
import mug6 from "@/assets/mug-6.png";

type Brew = {
  id: string;
  src: string;
  name: string;
  origin: string;
  notes: string;
  body: string;
  roast: string;
  price: string;
};

const BREWS: Brew[] = [
  { id: "signature", src: heroMug, name: "Signature Brew №. 014", origin: "House Blend · Brooklyn", notes: "Cocoa · Hazelnut · Dark caramel", body: "Our daily anchor. Balanced, syrupy and unmistakably us.", roast: "Medium-dark", price: "$18" },
  { id: "ember", src: mug1, name: "Ember Espresso", origin: "Ethiopia, Yirgacheffe", notes: "Blood orange · Cocoa · Jasmine", body: "Bright and floral with a long, citric finish.", roast: "Light", price: "$20" },
  { id: "cream", src: mug2, name: "Cream of Dawn", origin: "Colombia, Huila", notes: "Caramel · Almond · Honey", body: "Soft, round, comforting. The morning cup.", roast: "Medium", price: "$16" },
  { id: "iced", src: mug3, name: "Iced Reverie", origin: "Kenya, Nyeri", notes: "Black currant · Lime · Brown sugar", body: "Built for ice. Sharp, juicy and unapologetic.", roast: "Light-medium", price: "$17" },
  { id: "latte", src: mug4, name: "Velvet Latte", origin: "Guatemala, Antigua", notes: "Milk chocolate · Vanilla · Toffee", body: "Silky microfoam over a chocolatey espresso base.", roast: "Medium", price: "$19" },
  { id: "cold", src: mug5, name: "Cold Brew Noir", origin: "Sumatra, Mandheling", notes: "Dark cocoa · Tobacco · Molasses", body: "Slow-steeped 18 hours. Smooth, low-acid, decisive.", roast: "Dark", price: "$15" },
  { id: "ristretto", src: mug6, name: "Ristretto Solo", origin: "Brazil, Cerrado", notes: "Hazelnut · Brown sugar · Plum", body: "Short, concentrated, intensely sweet espresso.", roast: "Medium-dark", price: "$14" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [centerId, setCenterId] = useState<string>("signature");
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const userInteracted = useRef(false);

  const displayId = hoverId ?? centerId;
  const display = BREWS.find((b) => b.id === displayId)!;
  const center = BREWS.find((b) => b.id === centerId)!;

  // Intro animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-word", { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.08 });
      gsap.from(".hero-fade", { opacity: 0, y: 24, duration: 1, ease: "power3.out", delay: 0.4, stagger: 0.1 });
      gsap.from(".hero-shape", { yPercent: 100, duration: 1.4, ease: "expo.out", delay: 0.2 });
      gsap.from(".hero-mug-wrap", { y: 80, opacity: 0, scale: 0.92, duration: 1.4, ease: "power4.out", delay: 0.6 });
      gsap.to(".hero-mug-float", { y: -16, duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.6 });
    }, ref);
    return () => ctx.revert();
  }, []);

  // Center swap animation on click
  useEffect(() => {
    gsap.fromTo(".hero-mug-img", { scale: 0.7, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.6)" });
  }, [centerId]);

  // Panel content fade on hover/center change
  useEffect(() => {
    gsap.fromTo(".panel-content > *", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", stagger: 0.04 });
  }, [displayId]);

  // Auto-advance every 3s (pauses after user interaction for 8s)
  useEffect(() => {
    const interval = window.setInterval(() => {
      if (userInteracted.current) return;
      setCenterId((id) => {
        const i = BREWS.findIndex((b) => b.id === id);
        return BREWS[(i + 1) % BREWS.length].id;
      });
    }, 3000);
    return () => window.clearInterval(interval);
  }, []);

  const markInteracted = () => {
    userInteracted.current = true;
    window.setTimeout(() => (userInteracted.current = false), 8000);
  };

  // Custom cursor follow
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.18, ease: "power2.out" });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section ref={ref} id="top" className="relative min-h-screen w-full overflow-hidden bg-cream">
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-opacity duration-200 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="px-4 py-2 rounded-full bg-cream text-ink text-mono text-[10px] uppercase tracking-[0.25em] font-medium">
          Click me
        </div>
      </div>

      {/* Top meta */}
      <div className="pt-28 md:pt-32 px-6 md:px-10 flex items-start justify-between text-mono text-[11px] uppercase tracking-[0.25em] text-ink/60">
        <span className="hero-fade">Single Origin · Est. 2014</span>
        <span className="hero-fade hidden md:inline">Roasted in small batches</span>
      </div>

      {/* Centered headline */}
      <div className="px-6 md:px-10 mt-6 md:mt-8 text-center relative z-20 w-full">
        <h1 className="text-display text-ink leading-[0.85] text-[18vw] sm:text-[15vw] md:text-[11vw]">
          <span className="inline-block overflow-hidden align-bottom">
            <span className="hero-word font-semibold inline-block">Authentic</span>
          </span>{" "}
          <span className="inline-block overflow-hidden align-bottom">
            <span className="hero-word inline-block font-semibold text-coffee">Flavour</span>
          </span>
        </h1>

        <div className="relative md:absolute md:right-[6%] mt-8 md:mt-12 w-full md:w-[44%] max-w-[560px] flex flex-col items-center md:items-end gap-3 z-30">
          <p className="text-center md:text-right text-sm md:text-base w-full md:w-[60%]">A quiet ritual in every cup. We source, roast and brew with obsessive intent.</p>
          <a href="#catalog" className="relative w-fit px-6 py-1.5 bg-black text-primary-foreground text-sm uppercase font-mono rounded-full cursor-pointer">View Catalog</a>

          {/* Cup row — sits directly under the CTA */}
        </div>
      </div>

      {/* Stage */}
      <div className="relative md:absolute inset-x-0 md:bottom-0 px-6 md:px-10 mt-8 md:mt-0">
        <div className="grid grid-cols-1 md:grid-cols-12 items-end gap-6">
          {/* Left index */}
          <div className="hidden md:block col-span-2 pb-10 hero-fade">
            <div className="text-mono text-[11px] uppercase tracking-[0.25em] text-ink/50 mb-2">Index</div>
            <div className="text-display text-5xl md:text-7xl text-ink leading-none">
              {String(BREWS.findIndex((b) => b.id === centerId) + 1).padStart(2, "0")}
            </div>
            <div className="hairline mt-4 pt-3 flex justify-between text-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">
              <span>Brews</span>
              <span>0{BREWS.length}</span>
            </div>
          </div>

          {/* Center stage */}
          <div className="col-span-1 md:col-span-7 relative flex items-center justify-center">
            <div className="hero-mug-wrap relative w-full max-w-[280px] sm:max-w-[360px] md:max-w-[700px] aspect-[5/7] ml-0 md:ml-36">
              <div className="hero-shape ember-shape absolute inset-x-0 bottom-0 h-[80%]" />
              <div className="hero-mug-float absolute inset-x-0 bottom-[18%] mx-auto w-[78%] md:w-[72%] max-w-[440px]">
                <img
                  key={center.id}
                  src={center.src}
                  alt={center.name}
                  className="hero-mug-img w-full drop-shadow-[0_40px_40px_rgba(0,0,0,0.35)]"
                />
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-mono text-[10px] uppercase tracking-[0.3em] text-cream/80 pointer-events-none">
                {center.origin}
              </div>
            </div>
          </div>

          <div
            className="w-full col-span-1 md:col-span-3 pb-6 md:pb-0"
            onMouseEnter={() => setCursorVisible(true)}
            onMouseLeave={() => { setCursorVisible(false); setHoverId(null); }}
            style={{ cursor: "none" }}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-cream to-transparent" />
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-cream to-transparent" />
              <div className="flex gap-3 md:gap-4 py-4 overflow-x-auto md:overflow-visible no-scrollbar marquee-track">
                {[...BREWS, ...BREWS].map((b, i) => {
                  const isActive = b.id === centerId;
                  return (
                    <button
                      key={`${b.id}-${i}`}
                      type="button"
                      onMouseEnter={() => setHoverId(b.id)}
                      onMouseLeave={() => setHoverId(null)}
                      onClick={() => { setCenterId(b.id); markInteracted(); }}
                      className="group relative flex-shrink-0 flex flex-col items-center gap-2 rounded-2xl p-3 transition-colors duration-300 hover:bg-ink/10"
                      style={{ cursor: "none" }}
                      aria-label={`Select ${b.name}`}
                    >
                      <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                        <img
                          src={b.src}
                          alt={b.name}
                          className={`max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110 ${isActive ? "scale-110" : ""}`}
                        />
                      </div>
                      <div className={`text-mono text-[9px] uppercase tracking-[0.2em] whitespace-nowrap transition-colors ${isActive ? "text-ember" : "text-ink/70 group-hover:text-ink"}`}>
                        {b.name}
                      </div>
                      {isActive && <div className="h-[2px] w-5 bg-ember rounded-full" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        
        </div>

        
      </div>


      {/* Mobile info panel */}
      <div className="md:hidden px-6 pb-8">
        <div className="bg-ink text-cream rounded-2xl p-5">
          <div className="text-mono text-[10px] uppercase tracking-[0.25em] text-ember mb-2">
            {hoverId ? "Preview" : "Now Brewing"}
          </div>
          <div className="text-display text-xl mb-1">{display.name}</div>
          <div className="text-mono text-[11px] uppercase tracking-[0.2em] text-cream/50 mb-3">{display.origin}</div>
          <p className="text-sm text-cream/80 mb-4">{display.body}</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <div className="text-mono text-[9px] uppercase tracking-[0.25em] text-cream/50">Roast</div>
              <div>{display.roast}</div>
            </div>
            <div>
              <div className="text-mono text-[9px] uppercase tracking-[0.25em] text-cream/50">From</div>
              <div>{display.price}</div>
            </div>
          </div>
          <div className="text-mono text-[10px] uppercase tracking-[0.2em] text-cream/60 mb-1">Tasting notes</div>
          <div className="text-sm text-cream">{display.notes}</div>
          <a href="#catalog" className="block text-center mt-4 text-mono text-[10px] uppercase tracking-[0.2em] bg-ember text-cream rounded-full px-4 py-3">
            See in Catalog
          </a>
        </div>
      </div>

      {/* Side info panel — always visible */}
      <aside className="hidden md:block absolute left-10 top-1/2 -translate-y-1/4 z-40 w-[300px] bg-ink text-cream rounded-2xl p-6 shadow-2xl">
        <div key={displayId} className="panel-content">
          <div className="text-mono text-[10px] uppercase tracking-[0.25em] text-ember mb-2">
            {hoverId ? "Preview" : "Now Brewing"}
          </div>
          <div className="text-display text-2xl leading-tight mb-1">{display.name}</div>
          <div className="text-mono text-[11px] uppercase tracking-[0.2em] text-cream/50 mb-3">{display.origin}</div>
          <p className="text-sm text-cream/80 leading-relaxed mb-4">{display.body}</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="border-t border-cream/15 pt-2">
              <div className="text-mono text-[9px] uppercase tracking-[0.25em] text-cream/50">Roast</div>
              <div className="text-display text-base mt-1">{display.roast}</div>
            </div>
            <div className="border-t border-cream/15 pt-2">
              <div className="text-mono text-[9px] uppercase tracking-[0.25em] text-cream/50">From</div>
              <div className="text-display text-base mt-1">{display.price}</div>
            </div>
          </div>
          <div className="text-mono text-[10px] uppercase tracking-[0.2em] text-cream/60 mb-1">Tasting notes</div>
          <div className="text-sm text-cream">{display.notes}</div>

                    <a
            href="#catalog"
            className="block text-center mt-4 text-mono text-[10px] uppercase tracking-[0.2em] bg-ember text-cream rounded-full px-4 py-3 hover:bg-cream hover:text-ink transition"
          >
            See in Catalog
          </a>
        </div>
      </aside>

    </section>
  );
}
