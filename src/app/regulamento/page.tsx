"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TriminoPiece } from "@/components/trimino-piece";
import { useI18n } from "@/lib/i18n";
import { PIECES, WILDCARD_COUNT } from "@/lib/trimino";

/**
 * Página do regulamento oficial.
 *
 * O texto das regras é escrito por outro integrante do grupo e entra no bloco
 * `REGULAMENTO — TEXTO OFICIAL` abaixo. Nada aqui tenta substituir ou adivinhar
 * esse conteúdo: enquanto ele não chega, a página mostra um aviso e as
 * instruções de preenchimento.
 */

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
        <div aria-hidden="true" className="triangle-mesh absolute inset-0 -z-10" />
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

      {/* ── Aviso de status ──────────────────────────────────── */}
      <section aria-labelledby="status-title" className="pb-6">
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
          <div
            data-reveal
            className="reveal rounded-3xl border-2 border-dashed border-cobalt bg-cobalt-50 p-8 sm:p-10"
          >
            <span className="font-display inline-block rounded-full bg-cobalt px-4 py-1.5 text-xs font-semibold tracking-[0.12em] text-cream-50 uppercase">
              {regulamento.statusBadge}
            </span>
            <h2
              id="status-title"
              className="font-display mt-5 text-2xl font-bold text-graphite-900"
            >
              {regulamento.statusTitle}
            </h2>
            <p className="mt-3 max-w-[64ch] leading-relaxed text-graphite-600">
              {regulamento.statusBody}
            </p>
          </div>
        </div>
      </section>

      {/* ── Como preencher ───────────────────────────────────── */}
      <section aria-labelledby="howto-title" className="py-8">
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
          <div data-reveal className="reveal card-soft p-8 sm:p-10">
            <h2
              id="howto-title"
              className="font-display text-xl font-bold text-graphite-900"
            >
              {regulamento.howToFill}
            </h2>
            <ol className="mt-6 space-y-4">
              {regulamento.howToFillSteps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="numeral flex size-8 shrink-0 items-center justify-center rounded-full bg-crimson text-sm font-bold text-cream-50"
                  >
                    {index + 1}
                  </span>
                  <span className="leading-relaxed text-graphite-600">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── REGULAMENTO — TEXTO OFICIAL ──────────────────────── */}
      {/*
        Substitua este bloco pelo regulamento final. Use <h2> para as seções
        principais e <h3> para as subseções, e mantenha o wrapper
        `prose`-style com a mesma tipografia do resto do site.
      */}
      <section aria-labelledby="conteudo-title" className="py-10">
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
          <div
            data-reveal
            className="reveal card-soft p-8 sm:p-12"
            // Placeholder visível enquanto o texto oficial não chega.
            data-placeholder="regulamento"
          >
            <h2
              id="conteudo-title"
              className="font-display text-2xl font-bold text-graphite-900"
            >
              {regulamento.placeholderHeading}
            </h2>
            <p className="mt-4 leading-relaxed text-graphite-600">
              {regulamento.placeholderBody}
            </p>

            <div className="mt-8 space-y-3" aria-hidden="true">
              {[100, 92, 96, 78, 88, 94, 60].map((width, index) => (
                <div
                  key={index}
                  className="h-3 rounded-full bg-cream-200"
                  style={{ width: `${width}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PDF oficial ──────────────────────────────────────── */}
      <section aria-labelledby="pdf-title" className="py-10">
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
          <div data-reveal className="reveal card-soft p-8 sm:p-10">
            <h2
              id="pdf-title"
              className="font-display text-xl font-bold text-graphite-900"
            >
              {regulamento.pdfTitle}
            </h2>
            {/*
              Quando houver PDF, troque o parágrafo abaixo por um embed:

              <object data="/regulamento.pdf" type="application/pdf"
                      className="mt-6 h-[70vh] w-full rounded-2xl border-2
                                 border-cream-300" aria-label={...} />
            */}
            <p className="mt-4 rounded-2xl bg-cream-200 px-5 py-4 leading-relaxed text-graphite-600">
              <strong className="font-semibold text-graphite-800">
                {regulamento.pdfSlotLabel}:
              </strong>{" "}
              {regulamento.pdfSlotHint}
              <br />
              <span className="text-sm text-graphite-500">
                {regulamento.pdfSlotFile}
              </span>
            </p>
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