import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "I",
    title: "Source",
    tag: "Origin",
    temp: "—",
    body: "Direct relationships with twelve farms across Ethiopia, Colombia, Kenya and beyond. We visit every harvest, taste at altitude, and pay above Fair Trade.",
    detail: "Every lot is cupped three times before we commit. We pay 38% above Fair Trade in 2025.",
  },
  {
    n: "II",
    title: "Roast",
    tag: "Heat",
    temp: "215°C",
    body: "Small batches on a 12kg drum. Each profile is mapped to the bean — never to the calendar. We chase development, not colour.",
    detail: "Profiles are logged, A/B-cupped, and retired the moment they stop singing.",
  },
  {
    n: "III",
    title: "Rest",
    tag: "Time",
    temp: "72h",
    body: "We let the coffee breathe. Seventy-two hours, minimum. CO₂ off-gasses, sugars settle, and the cup finds its centre.",
    detail: "Bags are valved and stored at 18°C in a dark, dry room — the calm before the brew.",
  },
  {
    n: "IV",
    title: "Brew",
    tag: "Ship",
    temp: "48h",
    body: "We ship within forty-eight hours of peak. Your bag lands at the doorstep awake and ready. The rest is yours.",
    detail: "Every order includes a brewing card cut for the specific roast inside.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proc-head", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(".proc-step", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });

      // Auto-progress the active step on scroll into view
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 60%",
        onEnter: () => {
          let i = 0;
          const id = window.setInterval(() => {
            i = (i + 1) % STEPS.length;
            setActive(i);
            if (i === STEPS.length - 1) window.clearInterval(id);
          }, 1100);
        },
        once: true,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  // Animate the active card whenever it changes
  useEffect(() => {
    gsap.fromTo(
      ".proc-detail",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  }, [active]);

  return (
    <section id="process" ref={ref} className="bg-cream py-24 md:py-36">
      <div className="px-6 md:px-10">
        <div className="proc-head flex items-end justify-between mb-16 md:mb-24 flex-wrap gap-6">
          <div>
            <div className="text-mono text-xs uppercase tracking-[0.25em] text-ember mb-4">/ The Process</div>
            <h2 className="text-display text-6xl md:text-[8vw] text-ink leading-[0.9]">
              From cherry <span className="italic font-light text-coffee">to cup.</span>
            </h2>
          </div>
          <div className="text-mono text-xs uppercase tracking-[0.25em] text-ink/50 max-w-xs">
            Hover or tap a step. Four moves between the farm and your kitchen.
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-px bg-border mb-10">
          <div
            className="absolute left-0 top-0 h-px bg-ember transition-all duration-700 ease-out"
            style={{ width: `${((active + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Step tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-10">
          {STEPS.map((s, i) => (
            <button
              key={s.n}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`proc-step group text-left p-6 md:p-8 transition-colors duration-500 ${
                active === i ? "bg-ink text-cream" : "bg-cream text-ink hover:bg-cream-soft"
              }`}
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className={`text-mono text-[10px] uppercase tracking-[0.25em] ${active === i ? "text-ember" : "text-ink/40"}`}>
                  {s.tag}
                </span>
                <span className="text-mono text-xs opacity-60">{s.temp}</span>
              </div>
              <div className={`text-display text-6xl md:text-7xl mb-3 ${active === i ? "text-ember" : "text-ember/90"}`}>
                {s.n}
              </div>
              <div className="text-display text-2xl md:text-3xl">{s.title}</div>
            </button>
          ))}
        </div>

        {/* Active step detail */}
        <div className="proc-detail grid grid-cols-12 gap-6 bg-ink text-cream rounded-3xl p-8 md:p-14 min-h-[280px]">
          <div className="col-span-12 md:col-span-2">
            <div className="text-mono text-[10px] uppercase tracking-[0.25em] text-ember mb-2">
              Step {STEPS[active].n}
            </div>
            <div className="text-display text-5xl md:text-6xl text-cream">{STEPS[active].title}</div>
          </div>
          <div className="col-span-12 md:col-span-7 md:px-8">
            <p className="text-xl md:text-2xl text-cream/90 leading-relaxed font-light">
              {STEPS[active].body}
            </p>
            <p className="text-sm text-cream/60 mt-5 max-w-xl">{STEPS[active].detail}</p>
          </div>
          <div className="col-span-12 md:col-span-3 flex md:justify-end items-start">
            <div className="border border-cream/15 rounded-2xl px-5 py-4 text-right">
              <div className="text-mono text-[10px] uppercase tracking-[0.25em] text-cream/50 mb-1">
                {STEPS[active].tag}
              </div>
              <div className="text-display text-4xl md:text-5xl text-ember">{STEPS[active].temp}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
