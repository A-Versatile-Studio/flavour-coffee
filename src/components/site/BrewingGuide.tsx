import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Method = {
  id: string;
  name: string;
  icon: string;
  difficulty: 1 | 2 | 3;
  time: string;
  ratio: string;
  grind: string;
  yield: string;
  tagline: string;
  body: string;
  steps: string[];
};

const METHODS: Method[] = [
  {
    id: "v60",
    name: "V60 Pour Over",
    icon: "▽",
    difficulty: 2,
    time: "3 min",
    ratio: "1 : 16",
    grind: "Medium-fine",
    yield: "250 ml",
    tagline: "Bright & articulate",
    body: "The clearest cup. Best for floral single origins where every note should ring.",
    steps: [
      "Rinse the paper filter with hot water",
      "Add 15g coffee, pour 45g water — wait 30s",
      "Pour slowly to 150g by 1:00",
      "Finish at 250g by 2:30. Drawdown ends ~3:00",
    ],
  },
  {
    id: "chemex",
    name: "Chemex",
    icon: "◇",
    difficulty: 2,
    time: "4½ min",
    ratio: "1 : 17",
    grind: "Medium-coarse",
    yield: "600 ml",
    tagline: "Clean & long",
    body: "Tea-like clarity for the table. Thick paper strips oils for a crystalline cup.",
    steps: [
      "Rinse double-fold filter, discard water",
      "Add 35g coffee, bloom with 70g — 45s",
      "Pulse pour to 300g, then to 600g",
      "Drawdown completes around 4:00",
    ],
  },
  {
    id: "espresso",
    name: "Espresso",
    icon: "■",
    difficulty: 3,
    time: "28 sec",
    ratio: "1 : 2",
    grind: "Fine",
    yield: "36 g",
    tagline: "Intense & syrupy",
    body: "Pressure-extracted intensity. The foundation of every milk drink.",
    steps: [
      "Dose 18g into a clean basket",
      "Distribute evenly, tamp ~15kg",
      "Pull to 36g out in 25–30s",
      "Rest 10s, then sip",
    ],
  },
  {
    id: "moka",
    name: "Moka Pot",
    icon: "▤",
    difficulty: 1,
    time: "5 min",
    ratio: "1 : 7",
    grind: "Fine-medium",
    yield: "120 ml",
    tagline: "Rich & nostalgic",
    body: "The stovetop classic. Honest, syrupy and unapologetic.",
    steps: [
      "Pre-heat water to nearly boiling",
      "Fill the basket level — never tamp",
      "Place on low flame, lid open",
      "Pull off heat at the first gurgle",
    ],
  },
];

export function BrewingGuide() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(METHODS[0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bg-head", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.fromTo(
        ".bg-card",
        { opacity: 0, y: 40 },
        {
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".bg-detail",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, [active]);

  return (
    <section id="brewing" ref={ref} className="bg-ink text-cream py-24 md:py-36 overflow-hidden">
      <div className="px-6 md:px-10">
        <div className="bg-head max-w-4xl">
          <div className="text-mono text-xs uppercase tracking-[0.25em] text-ember mb-4">
            / Brewing Guide
          </div>
          <h2 className="text-display text-6xl md:text-[8vw] text-cream leading-[0.9]">
            Brew it <span className="italic font-light text-ember">right.</span>
          </h2>
          <p className="mt-6 text-cream/60 max-w-xl text-base md:text-lg">
            Pick a brewer below. We'll show you the recipe in plain language.
          </p>
        </div>

        {/* Method picker — visual cards */}
        <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {METHODS.map((m) => {
            const isActive = active.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActive(m)}
                className={`bg-card text-left p-5 md:p-6 rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? "bg-ember border-ember text-cream scale-[1.02] shadow-2xl"
                    : "bg-transparent border-cream/15 hover:border-cream/40 text-cream"
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-3xl md:text-4xl leading-none">{m.icon}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((d) => (
                      <span
                        key={d}
                        className={`w-1.5 h-1.5 rounded-full ${
                          d <= m.difficulty
                            ? isActive ? "bg-cream" : "bg-ember"
                            : "bg-cream/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-display text-2xl md:text-3xl mb-1">{m.name}</div>
                <div className={`text-xs ${isActive ? "text-cream/80" : "text-cream/50"}`}>
                  {m.tagline}
                </div>
                <div className={`mt-4 text-mono text-[10px] uppercase tracking-[0.2em] ${isActive ? "text-cream/70" : "text-ember"}`}>
                  {m.time} · {m.ratio}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <div className="bg-detail mt-10 md:mt-14 grid grid-cols-12 gap-8 md:gap-12 bg-cream text-ink rounded-3xl p-8 md:p-12">
          <div className="col-span-12 md:col-span-5">
            <div className="text-mono text-[10px] uppercase tracking-[0.25em] text-ember mb-3">
              Recipe
            </div>
            <div className="text-display text-5xl md:text-6xl text-ink leading-none mb-4">
              {active.name}
            </div>
            <p className="text-base md:text-lg text-ink/70 leading-relaxed mb-8">
              {active.body}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { l: "Total time", v: active.time },
                { l: "Coffee : Water", v: active.ratio },
                { l: "Grind size", v: active.grind },
                { l: "Yields", v: active.yield },
              ].map((s) => (
                <div key={s.l} className="bg-cream-soft rounded-xl px-4 py-3">
                  <div className="text-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
                    {s.l}
                  </div>
                  <div className="text-display text-xl md:text-2xl mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 md:border-l md:border-border md:pl-12">
            <div className="text-mono text-[10px] uppercase tracking-[0.25em] text-ember mb-4">
              Four simple steps
            </div>
            <ol className="space-y-5">
              {active.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-5 border-b border-border pb-5 last:border-0">
                  <span className="text-display text-4xl md:text-5xl text-ember leading-none w-12">
                    {i + 1}
                  </span>
                  <span className="text-base md:text-lg text-ink/85 pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
