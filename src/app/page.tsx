"use client";

import Link from "next/link";
import { EffectCard } from "@/components/effect-card";
import { Gallery } from "@/components/gallery";
import { Hexagon } from "@/components/hexagon";
import { Hero } from "@/components/hero";
import { MatchDemo } from "@/components/match-demo";
import { PieceCatalog } from "@/components/piece-catalog";
import { ScrollReveal } from "@/components/scroll-reveal";
import { StatCounters } from "@/components/stat-counters";
import { TriminoPiece } from "@/components/trimino-piece";
import { useI18n } from "@/lib/i18n";
import { CARD_IDS, PIECES, WILDCARD_COUNT } from "@/lib/trimino";

/** Títulos de seção numerados, no mesmo estilo do site anterior. */
const SECTION_NUMERALS = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
] as const;

function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  id,
  centered = true,
}: {
  index: number;
  eyebrow: string;
  title: string;
  lede?: string;
  id?: string;
  centered?: boolean;
}) {
  return (
    <div
      data-reveal
      className={`reveal ${centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}`}
    >
      <p className="eyebrow mb-4">
        {SECTION_NUMERALS[index]} · {eyebrow}
      </p>
      <h2
        id={id}
        className="font-display text-[clamp(2rem,5.2vw,3.4rem)] leading-[1.05] font-bold text-graphite-900"
      >
        {title}
      </h2>
      {lede ? (
        <p className="mt-5 text-lg leading-relaxed text-graphite-600">
          {lede}
        </p>
      ) : null}
    </div>
  );
}

export default function HomePage() {
  const { dict, format } = useI18n();

  /* ── 2 · Sobre ──────────────────────────────────────────── */
  const breakdown = [
    {
      title: dict.pieces.numberedTitle,
      body: dict.pieces.numberedBody,
      art: (
        <div className="flex gap-2">
          <TriminoPiece tips={[4, 2, 5]} tone="cream" size="sm" />
          <TriminoPiece tips={[1, 3, 3]} tone="cream" size="sm" />
          <TriminoPiece tips={[0, 5, 5]} tone="cream" size="sm" />
        </div>
      ),
    },
    {
      title: dict.pieces.wildcardTitle,
      body: dict.pieces.wildcardBody,
      art: (
        <div className="flex gap-2">
          <TriminoPiece tips={null} tone="yellow" size="sm" />
          <TriminoPiece tips={null} tone="yellow" size="sm" />
          <TriminoPiece tips={null} tone="yellow" size="sm" />
        </div>
      ),
    },
    {
      title: dict.pieces.numbersTitle,
      body: dict.pieces.numbersBody,
      art: (
        <div className="flex gap-2">
          <TriminoPiece tips={[2, 3, 5]} tone="blue" size="sm" />
          <TriminoPiece tips={[1, 1, 5]} tone="blue" size="sm" />
        </div>
      ),
    },
  ];

  return (
    <>
      <ScrollReveal />

      {/* ── 1 · Abertura ─────────────────────────────────────── */}
      <Hero />

      {/* ── 2 · Conheça o Triminó ─────────────────────────────── */}
      <section
        id="sobre"
        aria-labelledby="sobre-title"
        className="scroll-mt-28 py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div data-reveal className="reveal">
              <p className="eyebrow mb-4">{SECTION_NUMERALS[1]} · {dict.about.eyebrow}</p>
              <h2
                id="sobre-title"
                className="font-display text-[clamp(2rem,5.2vw,3.4rem)] leading-[1.05] font-bold text-graphite-900"
              >
                {dict.about.title}
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-graphite-600">
                <p>{dict.about.body1}</p>
                <p>{dict.about.body2}</p>
              </div>
              <p className="font-display mt-8 border-l-4 border-crimson pl-6 text-xl leading-snug font-semibold text-graphite-800">
                {dict.about.highlight}
              </p>
            </div>

            <div data-reveal className="reveal">
              <div className="card-soft relative overflow-hidden p-8">
                <div
                  aria-hidden="true"
                  className="triangle-mesh absolute inset-0 opacity-70"
                />
                <div className="relative">
                  <h3 className="font-display text-lg font-semibold text-graphite-900">
                    {dict.about.countersCaption}
                  </h3>
                  <div className="mt-8 border-t-2 border-cream-300 pt-8">
                    <StatCounters
                      stats={dict.about.stats.map((stat) => ({
                        value: stat.value,
                        suffix: "",
                        label: stat.label,
                      }))}
                    />
                  </div>

                  <div className="mt-10 flex flex-wrap items-end justify-center gap-3 border-t-2 border-cream-300 pt-8">
                    <TriminoPiece tips={[0, 0, 0]} tone="red" size="md" />
                    <TriminoPiece tips={[4, 2, 5]} tone="cream" size="md" />
                    <TriminoPiece tips={[0, 0, 3]} tone="cream" size="md" />
                    <TriminoPiece tips={[5, 3, 5]} tone="blue" size="md" />
                    <TriminoPiece tips={[1, 2, 2]} tone="yellow" size="md" />
                  </div>
                  <p className="numeral mt-5 text-center text-xs text-graphite-500">
                    {PIECES.length} + {WILDCARD_COUNT} = {PIECES.length + WILDCARD_COUNT}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 · As peças ─────────────────────────────────────── */}
      <section
        id="pecas"
        aria-labelledby="pecas-title"
        className="scroll-mt-28 border-y-2 border-cream-300 bg-cream-50 py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            index={2}
            eyebrow={dict.pieces.eyebrow}
            title={dict.pieces.title}
            lede={dict.pieces.lede}
            id="pecas-title"
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {breakdown.map((item, index) => (
              <article
                key={item.title}
                data-reveal
                className="reveal card-soft flex flex-col gap-5 p-8"
                style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
              >
                <div className="flex h-24 items-center">{item.art}</div>
                <h3 className="font-display text-xl font-semibold text-graphite-900">
                  {item.title}
                </h3>
                <p className="flex-1 leading-relaxed text-graphite-600">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <div data-reveal className="reveal mt-16">
            <h3 className="font-display mb-8 text-center text-2xl font-semibold text-graphite-900">
              {dict.pieces.catalogTitle}
            </h3>
            <PieceCatalog />
          </div>
        </div>
      </section>

      {/* ── 4 · Cartas de efeito ─────────────────────────────── */}
      <section
        id="cartas"
        aria-labelledby="cartas-title"
        className="scroll-mt-28 py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            index={3}
            eyebrow={dict.cards.eyebrow}
            title={dict.cards.title}
            lede={dict.cards.lede}
            id="cartas-title"
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {CARD_IDS.map((id, index) => {
              const card = dict.cards.items[id];
              return (
                <div
                  key={id}
                  data-reveal
                  className="reveal"
                  style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                >
                  <EffectCard
                    id={id}
                    name={card.name}
                    body={card.body}
                    position={index + 1}
                    label={`${card.name} — ${card.body}`}
                  />
                </div>
              );
            })}
          </div>

          <p
            data-reveal
            className="reveal mx-auto mt-10 max-w-2xl rounded-full bg-solar-100 px-6 py-4 text-center leading-relaxed font-medium text-graphite-700"
          >
            {dict.cards.keepNote}
          </p>
        </div>
      </section>

      {/* ── 5 · Como funciona ────────────────────────────────── */}
      <section
        id="como-funciona"
        aria-labelledby="como-title"
        className="scroll-mt-28 border-y-2 border-cream-300 bg-cream-50 py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            index={4}
            eyebrow={dict.how.eyebrow}
            title={dict.how.title}
            lede={dict.how.lede}
            id="como-title"
          />

          {/* Regra da soma + exercício */}
          <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
            <div data-reveal className="reveal">
              <h3 className="font-display text-2xl font-semibold text-graphite-900">
                {dict.how.matchTitle}
              </h3>
              <p className="mt-4 leading-relaxed text-graphite-600">
                {dict.how.matchBody}
              </p>

              <div className="card-soft mt-8 p-7">
                <h4 className="font-display text-lg font-semibold text-graphite-900">
                  {dict.how.setupTitle}
                </h4>
                <p className="mt-2 leading-relaxed text-graphite-600">
                  {dict.how.setupBody}
                </p>
              </div>
            </div>

            <div data-reveal className="reveal">
              <MatchDemo />
            </div>
          </div>

          {/* Hexágono */}
          <div className="mt-20 grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div data-reveal className="reveal order-2 lg:order-1">
              <Hexagon
                label={dict.how.hexagonCaption}
                joinSummary={format(dict.how.hexagonMatches, { value: 4 })}
                className="mx-auto"
              />
              <p className="mt-5 text-center text-sm text-graphite-500">
                {dict.how.hexagonCaption}
              </p>
            </div>

            <div data-reveal className="reveal order-1 lg:order-2">
              <h3 className="font-display text-2xl font-semibold text-graphite-900">
                {dict.how.hexagonTitle}
              </h3>
              <p className="mt-4 leading-relaxed text-graphite-600">
                {dict.how.hexagonBody}
              </p>

              <h4 className="font-display mt-10 text-lg font-semibold text-graphite-900">
                {dict.how.rulesListTitle}
              </h4>
              <ol className="mt-5 space-y-3">
                {dict.how.rulesList.map((rule, index) => (
                  <li key={rule} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="numeral mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-crimson text-xs font-bold text-cream-50"
                    >
                      {index + 1}
                    </span>
                    <span className="leading-relaxed text-graphite-600">
                      {rule}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6 · Galeria ──────────────────────────────────────── */}
      <section
        id="galeria"
        aria-labelledby="galeria-title"
        className="scroll-mt-28 py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            index={5}
            eyebrow={dict.gallery.eyebrow}
            title={dict.gallery.title}
            lede={dict.gallery.lede}
            id="galeria-title"
          />
          <div data-reveal className="reveal mt-14">
            <Gallery />
          </div>
        </div>
      </section>

      {/* ── 7 · Regulamento ──────────────────────────────────── */}
      <section
        aria-labelledby="regulamento-cta-title"
        className="relative overflow-hidden border-y-2 border-crimson bg-crimson py-20 sm:py-28"
      >
        <div
          aria-hidden="true"
          className="triangle-mesh absolute inset-0 opacity-30"
        />
        <div className="relative mx-auto w-full max-w-4xl px-5 text-center sm:px-8">
          <div data-reveal className="reveal">
            <p className="font-display mb-4 text-sm font-semibold tracking-[0.2em] text-cream-50/80 uppercase">
              {SECTION_NUMERALS[6]} · {dict.rules.eyebrow}
            </p>
            <h2
              id="regulamento-cta-title"
              className="font-display text-[clamp(2rem,5.2vw,3.4rem)] leading-[1.05] font-bold text-cream-50"
            >
              {dict.rules.title}
            </h2>
            <p className="mx-auto mt-5 max-w-[56ch] text-lg leading-relaxed text-cream-50/90">
              {dict.rules.body}
            </p>
            <div className="mt-9 flex flex-col items-center gap-4">
              <Link
                href="/regulamento"
                className="font-display inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-cream-50 px-9 text-base font-semibold text-crimson transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                {dict.rules.cta}
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
              <p className="max-w-[48ch] text-sm text-cream-50/75">
                {dict.rules.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8 · Perguntas ───────────────────────────────────── */}
      <section
        id="perguntas"
        aria-labelledby="perguntas-title"
        className="border-t-2 border-cream-300 bg-cream-50 py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          <SectionHeading
            index={7}
            eyebrow={dict.faq.eyebrow}
            title={dict.faq.title}
            id="perguntas-title"
          />

          <div className="mt-14 space-y-3">
            {dict.faq.items.map((item, index) => (
              <details
                key={item.q}
                data-reveal
                className="card-soft reveal group px-6 py-1 [&_summary::-webkit-details-marker]:hidden"
                style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}
              >
                <summary className="font-display flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium text-graphite-900 transition-colors hover:text-crimson">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="text-2xl font-bold text-crimson transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="border-t border-cream-300 py-5 leading-relaxed text-graphite-600">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}