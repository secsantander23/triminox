import Link from "next/link";
import { HeroParallax } from "@/components/hero";
import { DominoTile } from "@/components/domino-tile";
import { TileExplorer } from "@/components/tile-explorer";
import { OrderForm } from "@/components/order-form";
import { StatCounters } from "@/components/stat-counters";
import { ScrollReveal } from "@/components/scroll-reveal";
import ScrollExpand from "@/components/ScrollExpand";
import { StickyScrollReveal } from "@/components/sticky-scroll-reveal";
import { FAQ, KIT_OPTIONS, PILLARS, STATS, VALUES } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <ScrollReveal />
      <HeroParallax />

      {/* ── O projeto ──────────────────────────────────────── */}
      <section
        id="projeto"
        aria-labelledby="projeto-title"
        className="relative py-24 sm:py-32"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div data-reveal className="reveal">
              <p className="eyebrow mb-5">I · O projeto</p>
              <h2
                id="projeto-title"
                className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.05] text-travertine-50"
              >
                Um jogo antigo com
                <span className="text-aureum-400"> nome novo</span>
              </h2>

              <div className="mt-8 space-y-5 text-lg leading-relaxed text-travertine-200">
                <p>
                  O Triminox nasceu de uma pergunta simples: e se o dominó
                  contasse em latim? A resposta virou um baralho de 28 peças,
                  com os mesmos números, a mesma estratégia e a mesma mesa —
                  só que gravados em algarismos romanos.
                </p>
                <p>
                  É um jogo conhecido por qualquer pessoa que já pegou na mão
                  as cartas, e desconhecido por todo mundo na hora de ler. Essa
                  tensão é o ponto.
                </p>
              </div>

              <div className="mt-10 border-l-2 border-aureum-500/60 pl-6">
                <p className="font-serif text-2xl leading-snug text-travertine-100">
                  <span className="not-italic text-aureum-400">
                    “Multiplicando por XI, a cidade cresce. Multiplicando por
                    XI, a cidade cai.”
                  </span>
                </p>
                <p className="mt-3 text-sm text-travertine-400">
                  Plínio, o Velho — sobre a República
                </p>
              </div>
            </div>

            <div data-reveal className="reveal">
              <div className="relative rounded-lg border border-travertine-300/12 bg-ink-900/50 p-8 backdrop-blur-sm sm:p-10">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-lg texture-stone opacity-50"
                />
                <div className="relative">
                  <h3 className="font-display text-lg font-semibold tracking-wide text-travertine-50">
                    No papel
                  </h3>
                  <div className="mt-8 grid gap-8 border-t border-travertine-300/12 pt-8">
                    <StatCounters stats={STATS} />
                  </div>

                  <div className="mt-10 flex flex-wrap items-end justify-center gap-4 border-t border-travertine-300/12 pt-10">
                    <DominoTile a={6} b={6} size="sm" />
                    <DominoTile a={0} b={0} size="sm" />
                    <DominoTile a={6} b={0} size="sm" />
                    <DominoTile a={3} b={6} size="sm" />
                    <DominoTile a={5} b={5} dark size="sm" />
                  </div>
                  <p className="mt-5 text-center text-xs text-travertine-400">
                    Todas as combinações de I a VI, sem repetir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Manifesto: o quadro se abre com o scroll ──────── */}
      <section aria-label="Manifesto" className="relative bg-ink-950">
        <ScrollExpand
          src="/mosaico.svg"
          alt="Mosaico romano de tesselas de porfiro com medalhão central em ouro, uma peça de dominó e a sigla SPQR"
          useWindowScroll
          startWidth={44}
          startHeight={62}
          startRadius={28}
          endRadius={0}
          mediaZoom={1.22}
          scrollDistance={0.9}
          holdDistance={0.25}
          smoothing={0.12}
          overlayScrim={0.55}
          title="SPQR"
          scrollHint="Deslize para abrir o mosaico"
        >
          <p className="eyebrow mb-6">Manifesto</p>
          <h2 className="max-w-[18ch] font-display text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-[1.02] text-travertine-50">
            Roma caiu. A mesa continua.
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-travertine-200">
            Um império de mil anos deixou colunas, leis e uma língua. O que
            ele nos deixa hoje é uma mesa, sete peças na mão e a conversa
            que só acontece jogando.
          </p>
        </ScrollExpand>
      </section>

      {/* ── O que vem na caixa ─────────────────────────────── */}
      <section aria-labelledby="peca-title" className="relative py-24 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div data-reveal className="reveal mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-5">II · Anatomy</p>
            <h2
              id="peca-title"
              className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.05] text-travertine-50"
            >
              O que vem na caixa
            </h2>
            <p className="mt-6 text-lg text-travertine-300">
              Três partes, desenhadas para durar mais que a última partida.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <article
                key={p.numeral}
                data-reveal
                className="reveal group relative flex flex-col rounded-lg border border-travertine-300/12 bg-ink-900/45 p-8 transition-colors duration-300 hover:border-aureum-500/45"
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <span className="numeral font-display text-4xl font-bold text-aureum-500/35 transition-colors duration-300 group-hover:text-aureum-400">
                  {p.numeral}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-travertine-50">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm text-aureum-400">{p.spec}</p>
                <p className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-travertine-300">
                  {p.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Valores ────────────────────────────────────────── */}
      <section
        id="valores"
        aria-labelledby="valores-title"
        className="relative py-24 sm:py-32"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(91,26,43,0.55),transparent_70%)]"
        />
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div data-reveal className="reveal mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-5">III · Valores</p>
            <h2
              id="valores-title"
              className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.05] text-travertine-50"
            >
              Por que isso existe
            </h2>
            <p className="mt-6 text-lg text-travertine-300">
              Um jogo precisa justificar o preço que cobra — e dizer por
              que ele existe.
            </p>
          </div>

          <div data-reveal className="reveal mt-16">
            <StickyScrollReveal items={VALUES} />
          </div>
        </div>
      </section>

      {/* ── Explorador do baralho ──────────────────────────── */}
      <section
        id="baralho"
        aria-labelledby="baralho-title"
        className="relative py-24 sm:py-32"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div data-reveal className="reveal mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-5">IV · O baralho</p>
            <h2
              id="baralho-title"
              className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.05] text-travertine-50"
            >
              Toque para conhecer as peças
            </h2>
            <p className="mt-6 text-lg text-travertine-300">
              São 28 combinações de I a VI. Clique numa peça para inspecioná-la
              — ou na peça grande para girá-la.
            </p>
          </div>

          <div data-reveal className="reveal mt-16">
            <TileExplorer />
          </div>
        </div>
      </section>

      {/* ── Kits ───────────────────────────────────────────── */}
      <section aria-labelledby="kits-title" className="relative py-24 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div data-reveal className="reveal mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-5">V · Kits</p>
            <h2
              id="kits-title"
              className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.05] text-travertine-50"
            >
              Escolha sua legião
            </h2>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {KIT_OPTIONS.map((k, i) => (
              <article
                key={k.id}
                data-reveal
                className={`reveal relative flex flex-col rounded-lg border p-8 transition-colors duration-300 ${
                  k.featured
                    ? "border-aureum-500/60 bg-porphyry-900/25 shadow-xl shadow-black/30"
                    : "border-travertine-300/12 bg-ink-900/45 hover:border-travertine-300/35"
                }`}
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                {k.featured ? (
                  <span className="absolute -top-3 left-8 rounded-full bg-aureum-500 px-3.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-950">
                    Mais escolhido
                  </span>
                ) : null}

                <h3 className="font-display text-2xl font-semibold text-travertine-50">
                  {k.name}
                </h3>
                <p className="numeral mt-3 text-4xl font-bold text-aureum-400">
                  {k.price}
                </p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-travertine-300">
                  {k.description}
                </p>

                <ul className="mt-7 flex-1 space-y-3 border-t border-travertine-300/12 pt-7">
                  {k.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-travertine-200">
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-aureum-400"
                      >
                        <path
                          d="M4 12.5l5 5L20 6.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="#pedido"
                  className={`mt-8 inline-flex min-h-13 items-center justify-center rounded-md px-6 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                    k.featured
                      ? "bg-aureum-500 text-ink-950 hover:bg-aureum-300"
                      : "border border-travertine-300/25 text-travertine-100 hover:border-aureum-400/70"
                  }`}
                >
                  Pedir o {k.name}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pedido ─────────────────────────────────────────── */}
      <section
        id="pedido"
        aria-labelledby="pedido-title"
        className="relative scroll-mt-28 overflow-hidden py-24 sm:py-32"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(65%_55%_at_50%_10%,rgba(91,26,43,0.5),transparent_72%)]"
        />
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div data-reveal className="reveal">
              <p className="eyebrow mb-5">VI · Pedido</p>
              <h2
                id="pedido-title"
                className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.05] text-travertine-50"
              >
                Peça o seu baralho
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-travertine-300">
                Sem pagamento no site e sem pegadinha: enviamos o resumo do seu
                pedido por e-mail, acertamos o frete e combinamos o pagamento por
                Pix ou transferência.
              </p>

              <ul className="mt-10 space-y-4 border-t border-travertine-300/12 pt-8">
                {[
                  "Resposta em até 2 dias úteis",
                  "Frete calculado pela sua cidade",
                  "Cada lote nomeia quem o perdeu na oficina",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-travertine-200">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-aureum-400"
                    >
                      <path
                        d="M4 12.5l5 5L20 6.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-reveal
              className="reveal rounded-lg border border-travertine-300/14 bg-ink-900/60 p-6 backdrop-blur-sm sm:p-10"
            >
              <OrderForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section aria-labelledby="faq-title" className="relative py-24 sm:py-28">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          <div data-reveal className="reveal mb-14 text-center">
            <p className="eyebrow mb-5">VII · Perguntas</p>
            <h2
              id="faq-title"
              className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.05] text-travertine-50"
            >
              Dúvidas frequentes
            </h2>
          </div>

          <div className="space-y-3">
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

          <p data-reveal className="reveal mt-12 text-center text-travertine-400">
            Ainda com dúvida?{" "}
            <a
              href="mailto:oficina@triminox.com.br"
              className="rounded text-aureum-300 underline underline-offset-4 hover:text-aureum-200"
            >
              Escreva para a oficina
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}