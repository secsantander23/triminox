"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useI18n } from "@/lib/i18n";

/** Marca do jogo: um triângulo com as três pontas em destaque. */
function LogoMark() {
  return (
    <svg viewBox="0 0 40 36" aria-hidden="true" className="size-8 shrink-0">
      <path
        d="M20 4 L36 32 L4 32 Z"
        fill="var(--color-crimson)"
        stroke="var(--color-crimson-700)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="15" r="2.6" fill="var(--color-cream-50)" />
      <circle cx="13.5" cy="26" r="2.6" fill="var(--color-cream-50)" />
      <circle cx="26.5" cy="26" r="2.6" fill="var(--color-cream-50)" />
    </svg>
  );
}

export function Header() {
  const { dict } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const nav = [
    { href: "/#sobre", label: dict.nav.about },
    { href: "/#pecas", label: dict.nav.pieces },
    { href: "/#cartas", label: dict.nav.cards },
    { href: "/#como-funciona", label: dict.nav.how },
    { href: "/#galeria", label: dict.nav.gallery },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-b-2 border-cream-300 bg-cream/90 shadow-sm backdrop-blur-md"
          : "border-b-2 border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[var(--header-h)] w-full max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${dict.hero.title} — ${dict.nav.home}`}
        >
          <LogoMark />
          <span className="font-display text-lg font-semibold tracking-[0.12em] text-graphite-900">
            {dict.hero.title.toUpperCase()}
          </span>
        </Link>

        <nav aria-label={dict.common.primaryNav} className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-full px-3.5 font-display text-sm font-medium text-graphite-600 transition-colors hover:bg-cream-200 hover:text-crimson"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden sm:block">
            <LanguageSwitcher />
          </span>
          <Link
            href="/regulamento"
            className="font-display hidden min-h-11 items-center rounded-full bg-crimson px-5 text-sm font-semibold text-cream-50 transition-colors duration-200 hover:bg-crimson-600 md:inline-flex"
          >
            {dict.nav.rules}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? dict.common.closeMenu : dict.common.openMenu}
            className="inline-flex size-11 items-center justify-center rounded-full border-2 border-graphite-200 text-graphite-700 transition-colors hover:border-crimson hover:text-crimson lg:hidden"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3.5 7h17M3.5 12h17M3.5 17h17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="menu-mobile"
          className="border-t-2 border-cream-300 bg-cream/97 backdrop-blur-md lg:hidden"
        >
          <nav aria-label={dict.common.mobileNav} className="px-5 py-4">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center border-b border-cream-300 font-display text-graphite-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/regulamento"
                onClick={() => setOpen(false)}
                className="font-display inline-flex min-h-12 items-center justify-center rounded-full bg-crimson font-semibold text-cream-50"
              >
                {dict.nav.rules}
              </Link>
              <div className="flex justify-center">
                <LanguageSwitcher />
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}