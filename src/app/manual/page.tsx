import type { Metadata } from "next";
import Link from "next/link";
import { DominoTile } from "@/components/domino-tile";
import { VideoPlayer } from "@/components/video-player";
import { ScrollReveal } from "@/components/scroll-reveal";
import { FAQ, PILLARS, RULES } from "@/lib/content";
import { TILE_SET, TILE_LORE, toRoman } from "@/lib/roman";

export const metadata: Metadata = {
  title: "Manual de regras",
  description:
    "Como se joga Triminox: as seis regras do dominó duplo-seis com algarismos romanos, vídeo de como jogar e catálogo das 28 peças do baralho.",
  alternates: { canonical: "/manual" },
  openGraph: {
    title: "Manual de regras | Triminox",
    description:
      "As seis regras do dominó duplo-seis com algarismos romanos, vídeo e catálogo das 28 peças.",
    url: "/manual",
  },
};

export default function ManualPage() {
  return (
    <>
      <ScrollReveal />

      {/* ── Cabeçalho ──────────────────────────────────────── */}
      <section
        aria-labelledby="manual-title"
        className="surface-travertine relative isolate overflow-hidden pt-[calc(var(--header-h)_+_3.5rem)]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 texture-stone opacity-60"
        />
        <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pb-24">
          <nav aria-label="Trilha de navegação" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-travertine-400">
              <li>
                <Link href="/" className="rounded hover:text-aureum-300">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-travertine-200">Manual</li>
            </ol>
          </nav>

          <p className="eyebrow mb-5">Manual · Duplo-seis</p>
          <h1
            id="manual-title"
            className="max-w-3xl font-display text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[0.98] text-travertine-50"
          >
            Como se joga <span className="text-aureum-400">Triminox</span>
          </h1>
          <p className="mt-7 max-w-[58ch] font-serif text-xl leading-relaxed text-travertine-200 sm:text-2xl">
            As mesmas regras do dominó de sempre, em seis passos. Nenhuma delas
            precisa de tradutor — só de alguém que já jogou. E se ninguém da
            mesa souber, o manual resolve.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#regras"
              className="inline-flex min-h-13 items-center rounded-md bg-aureum-500 px-7 font-semibold text-ink-950 transition-colors hover:bg-aureum-300"
            >
              Ler as regras
            </a>
            <a
              href="#catalogo"
              className="inline-flex min-h-13 items-center rounded-md border border-travertine-300/25 px-7 text-travertine-100 transition-colors hover:border-aureum-400/70"
            >
              Ver as 28 peças
            </a>
          </div>
        </div>
      </section>

      {/* ── Vídeo ──────────────────────────────────────────── */}
      <section aria-labelledby="video-title" className="py-20 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div data-reveal className="reveal mb-10">
            <p className="eyebrow mb-4">Tutorial</p>
            <h2
              id="video-title"
              className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold text-travertine-50"
            >
              Assista em 4 minutos
            </h2>
          </div>
          <div data-reveal className="reveal">
            <VideoPlayer />
          </div>
        </div>
      </section>

      {/* ── Regras ─────────────────────────────────────────── */}
      <section
        id="regras"
        aria-labelledby="regras-title"
        className="scroll-mt-28 py-20 sm:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div data-reveal className="reveal mx-auto mb-16 max-w-2xl text-center">
            <p className="eyebrow mb-5">As seis regras</p>
            <h2
              id="regras-title"
              className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.05] text-travertine-50"
            >
              Do embaralhamento à mão fechada
            </h2>
            <p className="mt-6 text-lg text-travertine-300">
              Em dupla. Uma dupla contra outra. Se sobrar peça no fim, conta o
              menor número.
            </p>
          </div>

          <ol className="relative grid gap-6 lg:grid-cols-2 lg:gap-x-8">
            {RULES.map((rule, i) => (
              <li
                key={rule.numeral}
                data-reveal
                className="reveal relative flex gap-6 rounded-lg border border-travertine-300/12 bg-ink-900/45 p-7 transition-colors duration-300 hover:border-aureum-500/40"
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              >
                <div className="flex flex-col items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="numeral flex size-14 shrink-0 items-center justify-center rounded-full border border-aureum-500/45 font-display text-lg font-bold text-aureum-400"
                  >
                    {rule.numeral}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold text-travertine-50">
                    {rule.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-travertine-300">
                    {rule.body}
                  </p>
                  <p className="mt-4 inline-block rounded bg-porphyry-900/40 px-3 py-1.5 text-xs text-aureum-300">
                    {rule.hint}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Dica de iniciante ──────────────────────────────── */}
      <section aria-labelledby="dica-title" className="py-20 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div
            data-reveal
            className="reveal relative overflow-hidden rounded-lg border border-porphyry-500/40 bg-porphyry-900/25 p-9 sm:p-12"
          >
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-10 size-56 rounded-full bg-porphyry-500/20 blur-3xl"
            />
            <div className="relative grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
              <div className="flex gap-3">
                <DominoTile a={6} b={6} size="sm" />
                <DominoTile a={0} b={0} size="sm" />
              </div>
              <div>
                <h2
                  id="dica-title"
                  className="font-display text-xl font-semibold text-travertine-50 sm:text-2xl"
                >
                  Se é sua primeira vez
                </h2>
                <p className="mt-3 max-w-[62ch] leading-relaxed text-travertine-200">
                  Jogue com as faces viradas para cima. Deixe o par mais velho da
                  mesa dar a primeira jogada — em duas ou três rodadas você já
                  está pensando em virar tudo para baixo sem ajuda de ninguém.
                  Esse é o momento exato em que o jogo foi inventado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Catálogo ───────────────────────────────────────── */}
      <section
        id="catalogo"
        aria-labelledby="catalogo-title"
        className="scroll-mt-28 py-20 sm:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div data-reveal className="reveal mx-auto mb-16 max-w-2xl text-center">
            <p className="eyebrow mb-5">Catálogo</p>
            <h2
              id="catalogo-title"
              className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.05] text-travertine-50"
            >
              As 28 peças
            </h2>
            <p className="mt-6 text-lg text-travertine-300">
              Toda combinação de I a VI aparece exatamente uma vez. Estas são
              todas elas — a face vazia é o zero do baralho.
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {TILE_SET.map(({ a, b }, i) => {
              const lore = TILE_LORE[`${a}-${b}`];
              return (
                <li
                  key={`${a}-${b}`}
                  data-reveal
                  className="reveal flex flex-col items-center gap-3 rounded-lg border border-travertine-300/12 bg-ink-900/45 p-4 text-center transition-colors duration-300 hover:border-aureum-500/45"
                  style={{ "--reveal-delay": `${(i % 14) * 45}ms` } as React.CSSProperties}
                >
                  <DominoTile a={a} b={b} size="sm" />
                  <p className="numeral text-sm font-semibold text-aureum-400">
                    {toRoman(a)} · {toRoman(b)}
                  </p>
                  {lore ? (
                    <p className="text-[0.7rem] leading-snug text-travertine-400">
                      {lore}
                    </p>
                  ) : (
                    <p className="text-[0.7rem] leading-snug text-travertine-400/50">
                      peça {i + 1} de 28
                    </p>
                  )}
                </li>
              );
            })}
          </ul>

          <div
            data-reveal
            className="reveal mt-14 grid gap-6 sm:grid-cols-3"
          >
            {PILLARS.map((p) => (
              <div
                key={p.numeral}
                className="rounded-lg border border-travertine-300/12 bg-ink-900/45 p-6"
              >
                <h3 className="font-display text-lg font-semibold text-travertine-50">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm text-aureum-400">{p.spec}</p>
                <p className="mt-3 text-sm leading-relaxed text-travertine-300">
                  {p.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ do manual ──────────────────────────────────── */}
      <section aria-labelledby="manual-faq-title" className="py-20 sm:py-24">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          <h2
            id="manual-faq-title"
            className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold text-travertine-50"
          >
            Ainda com dúvida
          </h2>

          <div className="mt-10 space-y-3">
            {FAQ.map((item, i) => (
              <details
                key={item.q}
                data-reveal
                className="reveal group rounded-lg border border-travertine-300/12 bg-ink-900/45 transition-colors duration-300 open:border-aureum-500/40 [&_summary::-webkit-details-marker]:hidden"
                style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
              >
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-medium text-travertine-50 transition-colors hover:text-aureum-300">
                  {item.q}
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-5 shrink-0 text-aureum-400 transition-transform duration-300 group-open:rotate-45"
                  >
                    <path
                      d="M12 5v14M5 12h14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </summary>
                <div className="border-t border-travertine-300/12 px-6 py-5 leading-relaxed text-travertine-300">
                  {item.a}
                </div>
              </details>
            ))}
          </div>

          <div
            data-reveal
            className="reveal mt-16 flex flex-col items-center gap-5 rounded-lg border border-aureum-500/30 bg-porphyry-900/25 p-9 text-center"
          >
            <h3 className="font-display text-2xl font-semibold text-travertine-50">
              Pronto para jogar?
            </h3>
            <p className="max-w-[46ch] text-travertine-300">
              O kit traz o manual impresso — mas você já tem o essencial aqui.
            </p>
            <Link
              href="/#pedido"
              className="inline-flex min-h-13 items-center justify-center rounded-md bg-aureum-500 px-8 font-semibold text-ink-950 transition-colors hover:bg-aureum-300"
            >
              Pedir o meu baralho
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}