"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * Parallax do herói e do brasão, movidos por transform (nunca top/left).
 * Respeita prefers-reduced-motion: sem rAF, sem deslocamento.
 */
export function HeroParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const layer = layerRef.current;
    const content = contentRef.current;
    const emblem = emblemRef.current;
    if (!section || !layer || !content || !emblem) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      // -1 (abaixo da viewport) → 0 (topo alinhado) → 1 (acima da viewport)
      const travel = Math.max(rect.height, window.innerHeight);
      const p = Math.min(Math.max(-rect.top / travel, 0), 1);

      layer.style.transform = `translate3d(0, ${p * 46}%, 0)`;
      content.style.transform = `translate3d(0, ${p * -26}%, 0)`;
      content.style.opacity = String(Math.max(1 - p * 1.9, 0));
      emblem.style.transform = `translate3d(0, ${p * 22}%, 0) rotate(${
        p * 14
      }deg)`;
      emblem.style.opacity = String(Math.max(1 - p * 1.4, 0));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="surface-travertine relative isolate flex min-h-[100svh] items-center overflow-hidden pt-[var(--header-h)]"
    >
      {/* Auréola e colunas ao fundo */}
      <div
        ref={layerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
      >
        <div className="absolute inset-0 texture-stone opacity-35" />
        <div className="absolute left-1/2 top-[18%] size-[42rem] -translate-x-1/2 rounded-full bg-porphyry-700/25 blur-[110px]" />
        <div className="absolute inset-x-0 bottom-0 flex h-[62%] items-end justify-center gap-[3.2vw] px-6 opacity-[0.13]">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-full w-[10vw] max-w-[7rem] bg-gradient-to-t from-travertine-200 to-transparent"
              style={{
                clipPath:
                  "polygon(14% 100%, 14% 16%, 50% 0%, 86% 16%, 86% 100%)",
                borderRadius: "40% 40% 0 0 / 8% 8% 0 0",
              }}
            />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div ref={contentRef} className="will-change-transform">
            <p className="eyebrow mb-6">Projeto social · Baralho duplo-seis</p>

            <h1
              id="hero-title"
              className="font-display text-[clamp(2.75rem,10vw,6.5rem)] font-bold leading-[0.92] tracking-tight text-travertine-50"
            >
              O dominó que
              <span className="block bg-gradient-to-br from-aureum-300 via-aureum-500 to-bronze-500 bg-clip-text text-transparent">
                fala latim
              </span>
            </h1>

            <p className="mt-7 max-w-[52ch] font-serif text-xl leading-relaxed text-travertine-200 sm:text-2xl">
              Vinte e oito peças. Algarismos romanos em relevo sobre mármore.
              As mesmas regras de sempre — jogadas de sempre, agora escritas em
              latim.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="#pedido"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-md bg-aureum-500 px-8 text-base font-semibold text-ink-950 shadow-lg shadow-aureum-900/30 transition-all duration-200 hover:bg-aureum-300 active:scale-[0.98]"
              >
                Quero o meu baralho
              </Link>
              <Link
                href="/manual"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-md border border-travertine-300/25 px-8 text-base text-travertine-100 transition-colors duration-200 hover:border-aureum-400/70 hover:text-aureum-300"
              >
                Ver manual de regras
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-4"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-travertine-300/15 pt-8">
              {[
                { n: "XXVIII", l: "peças no baralho" },
                { n: "VI", l: "faces por peça" },
                { n: "I", l: "projeto, várias mesas" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="sr-only">{s.l}</dt>
                  <dd>
                    <span className="numeral block text-2xl font-bold text-aureum-400 sm:text-3xl">
                      {s.n}
                    </span>
                    <span className="mt-1 block text-xs leading-snug text-travertine-300">
                      {s.l}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Brasão: peça de dominó em destaque */}
          <div className="flex items-center justify-center lg:justify-end">
            <div
              ref={emblemRef}
              className="will-change-transform"
              aria-hidden="true"
            >
              <div className="relative">
                <div className="absolute -inset-10 rounded-full bg-porphyry-600/25 blur-3xl" />
                <div className="relative flex origin-center animate-[spin_38s_linear_infinite] items-center justify-center rounded-full border border-aureum-500/25">
                  <svg
                    viewBox="0 0 300 300"
                    className="size-[19rem] sm:size-[23rem]"
                  >
                    <circle
                      cx="150"
                      cy="150"
                      r="145"
                      fill="none"
                      stroke="currentColor"
                      className="text-aureum-500/30"
                      strokeWidth="1"
                    />
                    <circle
                      cx="150"
                      cy="150"
                      r="134"
                      fill="none"
                      stroke="currentColor"
                      className="text-aureum-500/15"
                      strokeWidth="1"
                      strokeDasharray="2 8"
                    />
                    {Array.from({ length: 24 }).map((_, i) => (
                      <text
                        key={i}
                        x="150"
                        y="16"
                        textAnchor="middle"
                        fontFamily="Cinzel, serif"
                        fontSize="11"
                        fill="currentColor"
                        className="text-aureum-400/70"
                        transform={`rotate(${i * 15} 150 150)`}
                      >
                        {i === 0 ? "X" : i < 10 ? "I" : "V"}
                      </text>
                    ))}
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="tile-face flex h-48 w-[5.5rem] rotate-[8deg] flex-col overflow-hidden rounded-lg shadow-2xl shadow-black/60 sm:h-56 sm:w-24">
                      <div className="flex flex-1 items-center justify-center text-porphyry-800">
                        <span className="numeral text-2xl font-bold">VI</span>
                      </div>
                      <div className="h-px bg-porphyry-900/25" />
                      <div className="flex flex-1 items-center justify-center text-porphyry-800">
                        <span className="numeral text-2xl font-bold">VI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#projeto"
        className="absolute inset-x-0 bottom-6 mx-auto hidden w-max flex-col items-center gap-2 text-travertine-400 transition-colors hover:text-aureum-300 sm:flex"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.25em]">
          Deslize
        </span>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
          <path
            d="M12 4v14M6 13l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  );
}