"use client";

import Link from "next/link";
import { TriminoPiece } from "@/components/trimino-piece";
import { useI18n } from "@/lib/i18n";

/** Peças soltas que flutuam ao redor do bloco principal. */
const FLOATING: Array<{
  tips: [number, number, number] | null;
  tone: "cream" | "red" | "blue" | "yellow" | "graphite";
  className: string;
  delay: string;
}> = [
  { tips: [0, 3, 5], tone: "blue", className: "-top-6 -left-4", delay: "0ms" },
  { tips: [2, 2, 4], tone: "yellow", className: "top-24 -left-10", delay: "700ms" },
  { tips: [1, 4, 4], tone: "graphite", className: "-bottom-4 left-2", delay: "1400ms" },
  { tips: [4, 5, 5], tone: "red", className: "-top-2 -right-8", delay: "400ms" },
  { tips: [1, 1, 3], tone: "cream", className: "bottom-10 -right-12", delay: "1100ms" },
];

export function Hero() {
  const { dict } = useI18n();
  const { hero } = dict;

  const stats = [
    { n: "59", l: hero.statPieces },
    { n: "3", l: hero.statTips },
    { n: "0–5", l: hero.statNumbers },
  ];

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-[var(--header-h)]"
    >
      <div aria-hidden="true" className="triangle-mesh absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-32 -z-10 size-[34rem] rounded-full bg-crimson/12 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 top-40 -z-10 size-[30rem] rounded-full bg-cobalt/12 blur-[100px]"
      />

      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-6">{hero.eyebrow}</p>

            <h1
              id="hero-title"
              className="font-display text-[clamp(3rem,11vw,7rem)] leading-[0.9] font-bold tracking-tight text-graphite-900"
            >
              <span className="text-crimson">{hero.title}</span>
            </h1>

            <p className="font-display mt-4 max-w-[18ch] text-[clamp(1.35rem,3.4vw,2.1rem)] leading-tight font-semibold text-graphite-700">
              {hero.tagline}
            </p>

            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-graphite-600">
              {hero.body}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/regulamento" className="btn-primary">
                {hero.ctaPrimary}
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <a href="#pecas" className="btn-secondary">
                {hero.ctaSecondary}
              </a>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t-2 border-cream-300 pt-8">
              {stats.map((stat) => (
                <div key={stat.l}>
                  <dt className="sr-only">{stat.l}</dt>
                  <dd>
                    <span className="numeral block text-3xl font-bold text-crimson sm:text-4xl">
                      {stat.n}
                    </span>
                    <span className="mt-1 block text-xs leading-snug text-graphite-500">
                      {stat.l}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Composição de peças: o triângulo do jogo virado compositivo. */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-square">
              <svg
                viewBox="0 0 200 200"
                aria-hidden="true"
                className="absolute inset-0 size-full text-cobalt/20"
              >
                <polygon
                  points="100,8 188,168 12,168"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="7 9"
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-1">
                  <TriminoPiece tips={[4, 2, 5]} tone="red" size="lg" />
                  <TriminoPiece tips={[0, 1, 4]} tone="cream" size="lg" />
                  <TriminoPiece tips={[2, 3, 3]} tone="blue" size="lg" />
                  <TriminoPiece tips={[5, 5, 1]} tone="yellow" size="lg" />
                </div>
              </div>

              {FLOATING.map((piece, index) => (
                <div
                  key={index}
                  className={`absolute ${piece.className}`}
                  style={{
                    animation: `float 7s ease-in-out ${piece.delay} infinite`,
                  }}
                >
                  <TriminoPiece
                    tips={piece.tips}
                    tone={piece.tone}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a
        href="#sobre"
        className="absolute inset-x-0 bottom-6 mx-auto hidden w-max flex-col items-center gap-2 text-graphite-400 transition-colors hover:text-crimson sm:flex"
      >
        <span className="text-[0.65rem] tracking-[0.25em] uppercase">
          {dict.common.scroll}
        </span>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
          <path
            d="M12 4v14M6 13l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  );
}