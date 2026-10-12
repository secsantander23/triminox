"use client";

import { useEffect, useRef, useState } from "react";

type RevealItem = {
  numeral: string;
  title: string;
  body: string;
};

type Props = {
  items: readonly RevealItem[];
  contentClassName?: string;
};

/**
 * Sticky Scroll Reveal.
 *
 * Coluna esquerda: painel `sticky` que permanece fixo enquanto a coluna
 * direita rola. O painel troca de conteúdo conforme o bloco mais próximo
 * do centro da viewport entra em cena.
 *
 * Implementação só com CSS `position: sticky` + IntersectionObserver —
 * sem framer-motion, sem dependência nova.
 *
 * Mobile (<1024px): sem sticky, o painel é renderizado dentro de cada
 * bloco, empilhado. Nada de conteúdo some para leitor de tela.
 */
export function StickyScrollReveal({ items, contentClassName = "" }: Props) {
  const [active, setActive] = useState(0);
  const blockRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const nodes = blockRefs.current.filter(Boolean) as HTMLElement[];

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number(
            (entry.target as HTMLElement).dataset.revealIndex ?? 0,
          );
          setActive((prev) => (prev === index ? prev : index));
        }
      },
      // Faixa estreita no meio da tela: só o bloco centralizado fica ativo.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [items.length]);

  const current = items[active] ?? items[0];

  const Panel = (
    <>
      <p className="eyebrow mb-6">Valor {current.numeral}</p>

      <p
        key={current.numeral}
        aria-hidden="true"
        className="numeral font-display text-[clamp(5rem,16vw,9rem)] font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_var(--color-aureum-500)]"
      >
        {current.numeral}
      </p>

      <div className="mt-8 h-px w-full rule-gold" aria-hidden="true" />

      <h3 className="mt-8 font-display text-2xl font-semibold text-travertine-50 sm:text-3xl">
        {current.title}
      </h3>

      {/* Texto duplicado em sr-only no bloco correspondente garante que o
          leitor de tela leia o par título+descrição junto ao numeral. */}
      <p className="mt-5 max-w-[38ch] font-serif text-xl leading-relaxed text-travertine-200">
        {current.body}
      </p>
    </>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
      {/* Coluna sticky — apenas no desktop */}
      <div className="hidden lg:block">
        <div className="sticky top-[calc(var(--header-h)_+_2rem)] flex h-[calc(100svh_-_var(--header-h)_-_4rem)] items-center">
          <div
            className={`relative w-full overflow-hidden rounded-lg border border-travertine-300/12 bg-ink-900/55 p-10 backdrop-blur-sm xl:p-14 ${contentClassName}`}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 texture-stone opacity-70"
            />
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 size-64 rounded-full bg-porphyry-600/25 blur-3xl"
            />
            <div
              key={`panel-${current.numeral}`}
              className="relative animate-[fadeSlide_600ms_var(--ease-enter)_both]"
            >
              {Panel}
            </div>
          </div>
        </div>
      </div>

      {/* Coluna rolante */}
      <div>
        {items.map((item, i) => (
          <section
            key={item.numeral}
            ref={(el) => {
              blockRefs.current[i] = el;
            }}
            data-reveal-index={i}
            aria-label={`${item.numeral}. ${item.title}`}
            className="flex min-h-[70svh] flex-col justify-center border-t border-travertine-300/12 py-16 first:border-t-0 lg:min-h-[72svh]"
          >
            <div
              className={`transition-opacity duration-500 ${
                active === i ? "opacity-100" : "opacity-45"
              }`}
            >
              <span
                aria-hidden="true"
                className="numeral font-display text-3xl font-bold text-aureum-500/50"
              >
                {item.numeral}
              </span>

              {/* No mobile o painel aparece aqui, dentro do próprio bloco. */}
              <div className="mt-5 lg:hidden">
                <h3 className="font-display text-2xl font-semibold text-travertine-50">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-travertine-200">
                  {item.body}
                </p>
              </div>

              {/* No desktop o texto vive dentro do painel sticky; aqui fica
                  apenas o rótulo acessível da seção. */}
              <div className="hidden lg:block">
                <h3 className="font-display text-2xl font-semibold text-travertine-50">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-travertine-300">
                  {item.body}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}