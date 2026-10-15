"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TriminoPiece } from "@/components/trimino-piece";
import { useI18n } from "@/lib/i18n";
import { PIECES, WILDCARD_COUNT } from "@/lib/trimino";

export default function RegulamentoPage() {
  const { dict } = useI18n();
  const { regulamento } = dict;

  return (
    <>
      <ScrollReveal />

      {/* ── Cabeçalho ───────────────────────────────────────── */}
      <section
        aria-labelledby="regulamento-title"
        className="relative isolate overflow-hidden pt-[calc(var(--header-h)+3rem)]"
      >
        <div
          aria-hidden="true"
          className="triangle-mesh absolute inset-0 -z-10"
        />
        <div className="mx-auto w-full max-w-4xl px-5 pb-14 sm:px-8 sm:pb-20">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-graphite-500">
              <li>
                <Link
                  href="/"
                  className="font-medium transition-colors hover:text-crimson"
                >
                  {dict.common.breadcrumbHome}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-graphite-700">{regulamento.eyebrow}</li>
            </ol>
          </nav>

          <Link
            href="/"
            className="font-display mb-8 inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-cream-300 bg-cream-50 px-5 text-sm font-semibold text-graphite-700 transition-colors hover:border-crimson hover:text-crimson"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
              <path
                d="M19 12H5M11 6l-6 6 6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {regulamento.backCta}
          </Link>

          <h1
            id="regulamento-title"
            className="font-display text-[clamp(2.4rem,7vw,4.4rem)] leading-[0.98] font-bold text-graphite-900"
          >
            {regulamento.title}
          </h1>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-graphite-600 sm:text-xl">
            {regulamento.lede}
          </p>

          <div className="mt-10 flex flex-wrap items-end gap-3" aria-hidden="true">
            <TriminoPiece tips={[4, 2, 5]} tone="red" size="sm" />
            <TriminoPiece tips={[0, 3, 3]} tone="cream" size="sm" />
            <TriminoPiece tips={[1, 2, 5]} tone="blue" size="sm" />
            <TriminoPiece tips={null} tone="yellow" size="sm" />
            <span className="numeral ml-2 text-sm text-graphite-500">
              {PIECES.length} + {WILDCARD_COUNT} peças
            </span>
          </div>
        </div>
      </section>

      {/* ── Aviso de revisão ─────────────────────────────────── */}
      <section className="pb-4">
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
          <div
            data-reveal
            className="reveal rounded-3xl border-2 border-dashed border-cobalt bg-cobalt-50 p-7 sm:p-8"
          >
            <p className="font-display mb-2 text-xs font-semibold tracking-[0.14em] text-cobalt uppercase">
              {regulamento.reviewTitle}
            </p>
            <p className="leading-relaxed text-graphite-600">
              {regulamento.reviewBody}
            </p>
          </div>
        </div>
      </section>

      {/* ── Sumário ─────────────────────────────────────────── */}
      <section aria-labelledby="sumario-title" className="py-8">
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
          <h2 id="sumario-title" className="sr-only">
            {regulamento.tocTitle}
          </h2>
          <nav aria-labelledby="sumario-title">
            <ol className="grid gap-2 sm:grid-cols-2">
              {regulamento.sections.map((section) => (
                <li key={section.numeral}>
                  <a
                    href={`#secao-${section.numeral.toLowerCase()}`}
                    className="card-soft flex min-h-14 items-center gap-3 px-5 py-3 transition-colors hover:border-crimson"
                  >
                    <span
                      aria-hidden="true"
                      className="numeral flex size-8 shrink-0 items-center justify-center rounded-full bg-crimson text-xs font-bold text-cream-50"
                    >
                      {section.numeral}
                    </span>
                    <span className="font-display font-semibold text-graphite-800">
                      {section.title}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* ── Seções do regulamento ───────────────────────────── */}
      <section aria-label={regulamento.tocTitle} className="py-10">
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
          <div className="space-y-6">
            {regulamento.sections.map((section) => (
              <article
                key={section.numeral}
                id={`secao-${section.numeral.toLowerCase()}`}
                data-reveal
                className="reveal card-soft scroll-mt-28 p-8 sm:p-10"
              >
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="numeral flex size-11 shrink-0 items-center justify-center rounded-full bg-crimson font-bold text-cream-50"
                  >
                    {section.numeral}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-graphite-900">
                    {section.title}
                  </h2>
                </div>

                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="mt-5 text-lg leading-relaxed text-graphite-600"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.list ? (
                  <ul className="mt-5 space-y-3">
                    {section.list.map((item, index) => (
                      <li key={index} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-crimson"
                        />
                        <span className="leading-relaxed text-graphite-600">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.note ? (
                  <p className="mt-5 rounded-2xl bg-cream-200 px-5 py-4 leading-relaxed font-medium text-graphite-700">
                    {section.note}
                  </p>
                ) : null}

                {section.paragraphsAfter?.map((paragraph, index) => (
                  <p
                    key={index}
                    className="mt-5 text-lg leading-relaxed text-graphite-600"
                  >
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pontos a definir ─────────────────────────────────── */}
      <section aria-labelledby="pendente-title" className="py-10">
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
          <div
            data-reveal
            className="reveal rounded-3xl border-2 border-solar bg-solar-50 p-8 sm:p-10"
          >
            <h2
              id="pendente-title"
              className="font-display text-2xl font-bold text-graphite-900"
            >
              {regulamento.pendingTitle}
            </h2>
            <p className="mt-3 leading-relaxed text-graphite-600">
              {regulamento.pendingIntro}
            </p>
            <ol className="mt-6 space-y-3">
              {regulamento.pending.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="numeral mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-solar text-xs font-bold text-graphite-900"
                  >
                    {index + 1}
                  </span>
                  <span className="leading-relaxed text-graphite-700">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Documento oficial em PDF ─────────────────────────── */}
      <section aria-labelledby="pdf-title" className="py-10 sm:py-14">
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
          <div data-reveal className="reveal">
            <h2
              id="pdf-title"
              className="font-display text-2xl font-bold text-graphite-900"
            >
              {regulamento.pdfTitle}
            </h2>
            <p className="mt-3 max-w-[60ch] leading-relaxed text-graphite-600">
              {regulamento.pdfDescription}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={regulamento.pdfFile}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                {regulamento.pdfOpen}
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
              </a>
              <a
                href={regulamento.pdfFile}
                download
                className="btn-secondary"
              >
                {regulamento.pdfDownload}
              </a>
            </div>

            <object
              data={regulamento.pdfFile}
              type="application/pdf"
              aria-label={regulamento.pdfEmbedLabel}
              className="mt-8 h-[70vh] min-h-96 w-full rounded-3xl border-2 border-cream-300 bg-cream-100"
            >
              {/* Mostrado por navegadores que não embutem PDF. */}
              <p className="p-8 text-center text-graphite-600">
                {regulamento.pdfDescription}{" "}
                <a
                  href={regulamento.pdfFile}
                  className="font-semibold text-crimson underline underline-offset-4"
                >
                  {regulamento.pdfOpen}
                </a>
              </p>
            </object>
          </div>
        </div>
      </section>

      {/* ── Voltar ───────────────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto w-full max-w-4xl px-5 text-center sm:px-8">
          <Link href="/" className="btn-primary">
            {regulamento.backCta}
          </Link>
        </div>
      </section>
    </>
  );
}