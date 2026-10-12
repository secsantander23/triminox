"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/#projeto", label: "O projeto" },
  { href: "/#valores", label: "Valores" },
  { href: "/manual#regras", label: "Como jogar" },
  { href: "/manual#catalogo", label: "Catálogo" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        setScrolled(y > 24);

        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(y / max, 1) : 0);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Fecha o menu móvel ao voltar para desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-travertine-300/12 bg-ink-950/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[var(--header-h)] w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-md py-1"
          aria-label="Triminox — início"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-7 shrink-0 text-aureum-400 transition-transform duration-500 ease-out-quint group-hover:-rotate-12"
          >
            <rect
              x="6.5"
              y="1.5"
              width="11"
              height="21"
              rx="2.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1="6.5"
              y1="12"
              x2="17.5"
              y2="12"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x="12"
              y="9.6"
              textAnchor="middle"
              fontFamily="Cinzel, serif"
              fontSize="6"
              fill="currentColor"
            >
              VI
            </text>
            <text
              x="12"
              y="20"
              textAnchor="middle"
              fontFamily="Cinzel, serif"
              fontSize="6"
              fill="currentColor"
            >
              III
            </text>
          </svg>
          <span className="font-display text-lg font-semibold tracking-[0.2em] text-travertine-100">
            TRIMINOX
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-md px-3.5 text-sm text-travertine-300 transition-colors hover:text-aureum-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="ml-2">
              <Link
                href="/#pedido"
                className="inline-flex min-h-11 items-center rounded-md bg-aureum-500 px-5 text-sm font-semibold text-ink-950 transition-transform duration-200 hover:bg-aureum-300 active:scale-[0.97]"
              >
                Fazer pedido
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="inline-flex size-11 items-center justify-center rounded-md border border-travertine-300/20 text-travertine-100 transition-colors hover:border-aureum-400/60 md:hidden"
        >
          <span className="sr-only">
            {open ? "Fechar menu" : "Abrir menu"}
          </span>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={`size-5 transition-transform duration-300 ${
              open ? "rotate-90" : ""
            }`}
          >
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3.5 7h17M3.5 12h17M3.5 17h17"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div
          id="menu-mobile"
          className="border-t border-travertine-300/12 bg-ink-950/97 backdrop-blur-md md:hidden"
        >
          <nav aria-label="Navegação móvel" className="px-5 py-4">
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center border-b border-travertine-300/10 text-travertine-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Link
                  href="/#pedido"
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center justify-center rounded-md bg-aureum-500 font-semibold text-ink-950"
                >
                  Fazer pedido
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}

      {/* Indicador de progresso de leitura */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-porphyry-500 via-aureum-400 to-aureum-300 transition-transform duration-150 ease-out will-change-transform"
        style={{ transform: `scaleX(${progress})` }}
      />
    </header>
  );
}